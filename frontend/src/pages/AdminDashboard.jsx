import React, { useEffect, useState, useCallback, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../utils/api';
import axios from 'axios';
import { Edit2, Trash2, Plus, Save, X, LogOut, Layout, Users, Calendar, Award, Briefcase, Globe, Monitor, Code, Megaphone, MapPin, ChevronDown, ChevronUp, ExternalLink, FileText, Tag, BookOpen, Newspaper, Pin, Settings, PlusCircle, Menu } from 'lucide-react';
import { advisoryCommitteeData, chairs } from '../data/committeeData';
import { useSocketRefresh } from '../hooks/useSocketRefresh';


const AdminDashboard = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [activeTab, setActiveTab] = useState('settings');
    const inlineFormRef = useRef(null);

    // Data states
    const [speakers, setSpeakers] = useState([]);
    const [committees, setCommittees] = useState([]);
    const [dates, setDates] = useState([]);
    const [topics, setTopics] = useState([]);
    const [editions, setEditions] = useState([]);
    const [fees, setFees] = useState([]);
    const [archives, setArchives] = useState([]);
    const [news, setNews] = useState([]);
    const [conferenceInfo, setConferenceInfo] = useState(null);
    const [expandedTypes, setExpandedTypes] = useState({});
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);


    // Form states
    const [editingItem, setEditingItem] = useState(null);
    const [isAdding, setIsAdding] = useState(false);
    const [isCreatingSection, setIsCreatingSection] = useState(false);
    const [formData, setFormData] = useState({});

    const loadData = useCallback(async () => {
        try {
            const [speakersRes, committeesRes, datesRes, topicsRes, editionsRes, feesRes, archivesRes, newsRes, confRes] = await Promise.all([
                api.get('/api/admin/speakers'),
                api.get('/api/admin/committees'),
                api.get('/api/admin/important-dates'),
                api.get('/api/admin/topics'),
                api.get('/api/admin/previous-editions'),
                api.get('/api/admin/registration-fees'),
                api.get('/api/admin/archive'),
                api.get('/api/admin/news'),
                api.get('/api/admin/conference-info')
            ]);
            setSpeakers(speakersRes.data);
            setCommittees(committeesRes.data);
            setDates(datesRes.data);
            setTopics(topicsRes.data);
            setEditions(editionsRes.data);
            setFees(feesRes.data);
            setArchives(archivesRes.data);
            setNews(newsRes.data);
            setConferenceInfo(confRes.data);
        } catch (error) {
            console.error('Error loading data:', error);
        }
    }, [user?.token]);

    useSocketRefresh(() => {
        console.log('Admin Dashboard: Refreshing data...');
        loadData();
    });


    const handleLogout = async () => {
        try {
            const userInfo = JSON.parse(localStorage.getItem('userInfo'));
            if (userInfo?.refreshToken) {
                await api.post('/api/auth/logout', { refreshToken: userInfo.refreshToken });
            }
        } catch (error) {
            console.error('Logout error:', error);
        }
        localStorage.removeItem('userInfo');
        navigate('/');
    };

    const handleAdd = () => {
        setIsAdding(true);
        setEditingItem(null);
        setFormData({});
        if (activeTab === 'committees') setIsCreatingSection(true);
    };

    const handleEdit = (item) => {
        setIsCreatingSection(false);
        setEditingItem(item._id);

        // Format dates for <input type="date"> using UTC to avoid off-by-one errors
        const processedItem = { ...item };
        ['date', 'start_date', 'end_date'].forEach(field => {
            if (item[field]) {
                const d = new Date(item[field]);
                const y = d.getUTCFullYear();
                const m = String(d.getUTCMonth() + 1).padStart(2, '0');
                const day = String(d.getUTCDate()).padStart(2, '0');
                processedItem[field] = `${y}-${m}-${day}`;
            }
        });

        setFormData(processedItem);
        setIsAdding(false);
    };

    const handleCancel = () => {
        setIsAdding(false);
        setIsCreatingSection(false);
        setEditingItem(null);
        setFormData({});
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (activeTab !== 'committees') return;

            const isInsideGrid = event.target.closest('.committee-container');
            const isInlineMemberActive = !isCreatingSection && (isAdding || editingItem);

            if (!isInsideGrid) {
                if (isInlineMemberActive) handleCancel();
                if (Object.keys(expandedTypes).length > 0) setExpandedTypes({});
            } else if (isInlineMemberActive && inlineFormRef.current && !inlineFormRef.current.contains(event.target)) {
                const isTriggerButton = event.target.closest('button')?.getAttribute('title')?.includes('Edit') ||
                    event.target.closest('button')?.getAttribute('title')?.includes('Promote') ||
                    event.target.closest('button')?.innerText?.toUpperCase().includes('ADD MEMBER');

                if (!isTriggerButton) {
                    handleCancel();
                }
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [activeTab, isCreatingSection, isAdding, editingItem, handleCancel, expandedTypes]);

    useEffect(() => {
        const userInfo = JSON.parse(localStorage.getItem('userInfo'));
        if (!userInfo || userInfo.role !== 'admin') {
            navigate('/login');
            return;
        }
        setUser(userInfo);
        loadData();
    }, [navigate, loadData]);

    const handleSave = async () => {
        try {
            const endpoint = getEndpoint();

            console.log('--- SAVE INITIATED ---');
            console.log('Action:', isAdding ? 'Adding' : 'Editing');
            console.log('Data to send:', formData);

            let res;
            if (activeTab === 'settings') {
                res = await api.put('/api/admin/conference-info', formData);
            } else if (isAdding) {
                res = await api.post(`/api/admin/${endpoint}`, formData);
            } else {
                res = await api.put(`/api/admin/${endpoint}/${editingItem}`, formData);
            }

            console.log('Save response received:', res.data);
            await loadData();
            handleCancel();
        } catch (error) {
            console.error('--- SAVE FAILED ---');
            console.error('Error info:', error.response?.data || error.message);
            alert(`Failed to save: ${error.response?.data?.message || error.message}`);
        }
    };

    const handleDelete = async (id) => {
        if (!confirm('Are you sure you want to delete this item?')) return;
        try {
            const endpoint = getEndpoint();
            await api.delete(`/api/admin/${endpoint}/${id}`);
            await loadData();
        } catch (error) {
            console.error('Error deleting:', error);
            alert('Failed to delete');
        }
    };

    const getEndpoint = () => {
        const map = {
            'speakers': 'speakers',
            'committees': 'committees',
            'dates': 'important-dates',
            'topics': 'topics',
            'editions': 'previous-editions',
            'fees': 'registration-fees',
            'archives': 'archive',
            'news': 'news'
        };
        return map[activeTab];
    };

    const tabs = [
        { id: 'settings', label: 'Hero Settings', icon: Settings },
        { id: 'speakers', label: 'Speakers', icon: Users },
        { id: 'committees', label: 'Committees', icon: Users },
        { id: 'dates', label: 'Important Dates', icon: Calendar },
        { id: 'topics', label: 'Topics', icon: Tag },
        { id: 'editions', label: 'Previous Editions', icon: BookOpen },
        { id: 'fees', label: 'Registration Fees', icon: FileText },
        { id: 'archives', label: 'Archives', icon: BookOpen },
        { id: 'news', label: 'Latest News', icon: Newspaper }
    ];

    const renderForm = () => {
        if (!isAdding && !editingItem) return null;

        const fields = getFormFields();

        return (
            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm mb-8">
                <h3 className="text-base font-bold text-gray-900 mb-6">
                    {isAdding ? 'Add' : 'Edit'} {tabs.find(t => t.id === activeTab)?.label}
                </h3>
                <div className="grid md:grid-cols-2 gap-4">
                    {fields.map(field => (
                        <div key={field.name} className={field.fullWidth ? 'md:col-span-2' : ''}>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                {field.label}
                            </label>
                            {field.type === 'textarea' ? (
                                <textarea
                                    value={formData[field.name] || ''}
                                    onChange={(e) => setFormData({ ...formData, [field.name]: e.target.value })}
                                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                                    rows={3}
                                />
                            ) : field.type === 'select' ? (
                                <select
                                    value={formData[field.name] || ''}
                                    onChange={(e) => setFormData({ ...formData, [field.name]: e.target.value })}
                                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                                >
                                    <option value="">Select...</option>
                                    {field.options.map(opt => (
                                        <option key={opt} value={opt}>{opt}</option>
                                    ))}
                                </select>
                            ) : field.type === 'links' ? (
                                <div className="space-y-2 border p-3 rounded-lg bg-gray-50">
                                    {(formData.links || []).map((link, idx) => (
                                        <div key={idx} className="flex gap-2 items-center">
                                            <input
                                                placeholder="Link Name (e.g. Website)"
                                                value={link.name || ''}
                                                onChange={(e) => {
                                                    const newLinks = [...(formData.links || [])];
                                                    newLinks[idx].name = e.target.value;
                                                    setFormData({ ...formData, links: newLinks });
                                                }}
                                                className="flex-1 px-3 py-1 text-sm border rounded focus:ring-1 focus:ring-blue-500"
                                            />
                                            <input
                                                placeholder="URL"
                                                value={link.url || ''}
                                                onChange={(e) => {
                                                    const newLinks = [...(formData.links || [])];
                                                    newLinks[idx].url = e.target.value;
                                                    setFormData({ ...formData, links: newLinks });
                                                }}
                                                className="flex-[2] px-3 py-1 text-sm border rounded focus:ring-1 focus:ring-blue-500"
                                            />
                                            <button
                                                onClick={() => {
                                                    const newLinks = formData.links.filter((_, i) => i !== idx);
                                                    setFormData({ ...formData, links: newLinks });
                                                }}
                                                className="text-red-500 hover:text-red-700 p-1"
                                            >
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
                                    ))}
                                    <button
                                        onClick={() => {
                                            const newLinks = [...(formData.links || []), { name: '', url: '' }];
                                            setFormData({ ...formData, links: newLinks });
                                        }}
                                        className="text-xs flex items-center gap-1 text-blue-600 font-bold mt-2 hover:text-blue-800"
                                    >
                                        <PlusCircle size={14} /> Add Link
                                    </button>
                                </div>
                            ) : (
                                <input
                                    type={field.type || 'text'}
                                    value={formData[field.name] || ''}
                                    onChange={(e) => setFormData({ ...formData, [field.name]: e.target.value })}
                                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                                />
                            )}
                        </div>
                    ))}
                </div>
                <div className="flex gap-2 mt-4">
                    <button onClick={handleSave} className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center gap-2">
                        <Save size={16} /> Save
                    </button>
                    <button onClick={handleCancel} className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 flex items-center gap-2">
                        <X size={16} /> Cancel
                    </button>
                </div>
            </div>
        );
    };

    const getFormFields = () => {
        switch (activeTab) {
            case 'speakers':
                return [
                    { name: 'name', label: 'Name', required: true },
                    { name: 'designation', label: 'Designation', required: true },
                    { name: 'organization', label: 'Organization', required: true },
                    { name: 'year', label: 'Year', type: 'number', required: true },
                    { name: 'sessionTitle', label: 'Session Title (e.g. Plenary Session Talk 1)', fullWidth: true },
                    { name: 'date', label: 'Session Date (e.g. 12th Sept 2025)' },
                    { name: 'time', label: 'Session Time (e.g. 09:30 A.M. IST)' },
                    { name: 'topic', label: 'Talk Topic', fullWidth: true },
                    { name: 'topicDescription', label: 'Topic Description', type: 'textarea', fullWidth: true },
                    { name: 'links', label: 'Speaker Links', type: 'links', fullWidth: true },
                    { name: 'bio', label: 'Bio', type: 'textarea', fullWidth: true },
                    { name: 'image', label: 'Image URL' },
                    { name: 'order', label: 'Display Order', type: 'number' }
                ];
            case 'committees':
                if (isCreatingSection && !editingItem) {
                    return [
                        { name: 'type', label: 'Section Title (e.g. Technical Program Committee)', required: true, fullWidth: true },
                        { name: 'sectionOrder', label: 'Section Display Order', type: 'number' }
                    ];
                }
                return [
                    { name: 'type', label: 'Section Title / Type', required: true, fullWidth: true, disabled: true },
                    { name: 'sectionOrder', label: 'Section Order', type: 'number' },
                    { name: 'name', label: 'Member Name', required: true },
                    { name: 'designation', label: 'Designation', required: true },
                    { name: 'organization', label: 'Organization' },
                    { name: 'order', label: 'Member Order in Section', type: 'number' }
                ];
            case 'dates':
                return [
                    { name: 'event', label: 'Event', required: true },
                    { name: 'date', label: 'Date', type: 'date', required: true },
                    { name: 'description', label: 'Description', type: 'textarea', fullWidth: true },
                    { name: 'isPinned', label: 'Pin for Countdown', type: 'checkbox', description: 'Show this date in the website countdown' },
                    { name: 'order', label: 'Display Order', type: 'number' }
                ];
            case 'topics':
                return [
                    { name: 'title', label: 'Topic Title', required: true, fullWidth: true },
                    { name: 'track', label: 'Track', type: 'select', options: ['computing', 'communication', 'security', 'general'] },
                    { name: 'order', label: 'Display Order', type: 'number' }
                ];
            case 'editions':
                return [
                    { name: 'year', label: 'Year', type: 'number', required: true },
                    { name: 'title', label: 'Title', required: true, fullWidth: true },
                    { name: 'link', label: 'Proceedings Link' },
                    { name: 'publisher', label: 'Publisher' }
                ];
            case 'fees':
                return [
                    { name: 'type', label: 'Registration Type', required: true, fullWidth: true },
                    { name: 'indian', label: 'Indian Fees (INR)', required: true },
                    { name: 'foreign', label: 'Foreign Fees (USD)', required: true },
                    { name: 'order', label: 'Order', type: 'number' }
                ];
            case 'archives':
                return [
                    { name: 'title', label: 'Title', required: true, fullWidth: true },
                    { name: 'year', label: 'Year', type: 'number' },
                    { name: 'type', label: 'Archive Type', type: 'select', options: ['media-coverage', 'glimpses'] },
                    { name: 'image', label: 'Image URL' },
                    { name: 'link', label: 'External Link' },
                    { name: 'order', label: 'Display Order', type: 'number' }
                ];
            case 'news':
                return [
                    { name: 'title', label: 'News Title', required: true, fullWidth: true },
                    { name: 'link', label: 'Link (Optional)', fullWidth: true },
                    { name: 'date', label: 'Display Date', type: 'date' }
                ];
            case 'settings':
                return [
                    { name: 'short_name', label: 'Short Name (e.g. COMS2)' },
                    { name: 'year', label: 'Year (e.g. 2026)' },
                    { name: 'edition', label: 'Edition Label (e.g. 7th Edition)' },
                    { name: 'mode', label: 'Mode (e.g. Hybrid Mode)' },
                    { name: 'name', label: 'Full Conference Title', fullWidth: true },
                    { name: 'description', label: 'Welcome/Intro Description', type: 'textarea', fullWidth: true },
                    { name: 'theme', label: 'Sub-theme/Tagline', fullWidth: true },
                    { name: 'venue', label: 'Venue/University' },
                    { name: 'country', label: 'Location/Country' },
                    { name: 'start_date', label: 'Start Date', type: 'date' },
                    { name: 'end_date', label: 'End Date', type: 'date' }
                ];
            default:
                return [];
        }
    };


    const renderCommitteeGrid = () => {
        // Prepare static advisory members
        const staticAdvisory = Object.values(advisoryCommitteeData).flatMap(sec =>
            sec.members.map((m, idx) => {
                const [name, ...rest] = m.split(',');
                return {
                    name: name.trim(),
                    designation: rest.join(',').trim(),
                    type: 'Advisory Committee',
                    isStatic: true,
                    sectionOrder: 1,
                    _id: `static-adv-${idx}`
                };
            })
        );

        // Prepare static chairs
        const staticChairs = Object.values(chairs).flatMap(sec =>
            sec.members.map((m, idx) => {
                const [name, ...rest] = m.split(',');
                return {
                    name: name.trim(),
                    designation: rest.join(',').trim(),
                    type: sec.title,
                    isStatic: true,
                    sectionOrder: 2,
                    _id: `static-chair-${sec.title}-${idx}`
                };
            })
        );

        const allMembers = [...committees, ...staticAdvisory, ...staticChairs];

        const grouped = allMembers.reduce((acc, member) => {
            const type = member.type || 'Uncategorized';
            if (!acc[type]) {
                acc[type] = { members: [], sectionOrder: member.sectionOrder || 0 };
            }
            acc[type].members.push(member);
            // If we find a non-zero sectionOrder, use it
            if (member.sectionOrder && member.sectionOrder !== 0) {
                acc[type].sectionOrder = member.sectionOrder;
            }
            return acc;
        }, {});

        // Sort sections by sectionOrder
        const sortedGroups = Object.entries(grouped).sort((a, b) => (a[1].sectionOrder || 0) - (b[1].sectionOrder || 0));

        const toggleType = (type) => {
            setExpandedTypes(prev => ({ ...prev, [type]: !prev[type] }));
        };

        const handleEditCombined = (item) => {
            if (item.isStatic) {
                setFormData({
                    name: item.name,
                    designation: item.designation,
                    type: item.type,
                    sectionOrder: item.sectionOrder,
                    order: 0
                });
                setEditingItem(null);
                setIsAdding(true);
                setIsCreatingSection(false);
                setExpandedTypes(prev => ({ ...prev, [item.type]: true }));
            } else {
                handleEdit(item);
                setExpandedTypes(prev => ({ ...prev, [item.type]: true }));
            }
        };

        const handleDeleteSection = async (type) => {
            if (!window.confirm(`Are you sure you want to delete the entire "${type}" section and all its members? This action cannot be undone.`)) return;
            try {
                await api.delete(`/api/admin/committees/section/${encodeURIComponent(type)}`);
                loadData();
            } catch (error) {
                console.error('Error deleting section:', error);
                const message = error.response?.data?.message || error.message || 'Unknown error';
                alert(`Failed to delete section: ${message}`);
            }
        };

        const handleAddMemberToType = (type, sectionOrder) => {
            setFormData({ type, sectionOrder, order: (grouped[type]?.members.filter(m => m.name).length || 0) + 1 });
            setIsAdding(true);
            setIsCreatingSection(false);
            setEditingItem(null);
            setExpandedTypes(prev => ({ ...prev, [type]: true }));
        };

        // Split sortedGroups into two columns
        const leftColumn = sortedGroups.filter((_, idx) => idx % 2 === 0);
        const rightColumn = sortedGroups.filter((_, idx) => idx % 2 !== 0);

        const renderSection = ([type, group]) => {
            const isExpanded = expandedTypes[type];
            const isAddingHere = isAdding && formData.type === type && !isCreatingSection;
            const editingMemberInThisSection = editingItem && formData.type === type && !isCreatingSection;
            const showInlineForm = isAddingHere || editingMemberInThisSection;

            const allTypeMembers = group.members.sort((a, b) => {
                if (a.isStatic && !b.isStatic) return 1;
                if (!a.isStatic && b.isStatic) return -1;
                return (a.order || 0) - (b.order || 0);
            });

            // Filter out metadata-only members (sections with no names) for display
            const members = allTypeMembers.filter(m => m.name);
            const hasMetadataOnly = allTypeMembers.some(m => !m.name);

            return (
                <div
                    key={type}
                    className="bg-white rounded-xl border border-gray-100 shadow-sm mb-4 overflow-hidden transition-all duration-300 hover:shadow-md animate-fade-in-up"
                >
                    <button
                        className="w-full px-5 py-4 flex justify-between items-center bg-gradient-to-r from-gray-50 to-white hover:from-blue-50 hover:to-blue-50/30 transition-all group border-b border-gray-100"
                        onClick={() => toggleType(type)}
                    >
                        <div className="flex items-center gap-3">
                            <div className={`p-1.5 rounded-lg transition-all duration-300 ${isExpanded ? 'bg-blue-600 text-white rotate-180' : 'bg-blue-50 text-blue-600 group-hover:bg-blue-600 group-hover:text-white rotate-0'}`}>
                                <ChevronDown size={16} className="transition-transform duration-300" />
                            </div>
                            <div>
                                <h4 className="text-sm font-bold text-gray-900 uppercase tracking-wider">{type}</h4>
                                <p className="text-[10px] text-gray-500 font-bold uppercase tracking-tighter mt-0.5">
                                    {group.sectionOrder > 0 && `Order: ${group.sectionOrder} • `}{members.length} {members.length === 1 ? 'Member' : 'Members'}
                                </p>
                            </div>
                        </div>
                        <div className="flex items-center gap-1">
                            {hasMetadataOnly && (
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        const meta = allTypeMembers.find(m => !m.name);
                                        if (meta) handleEdit(meta);
                                        setIsCreatingSection(true);
                                        window.scrollTo({ top: 0, behavior: 'smooth' });
                                    }}
                                    className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-white rounded-lg transition-all duration-200 hover:scale-110"
                                    title="Section Settings"
                                >
                                    <Settings size={14} />
                                </button>
                            )}
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleDeleteSection(type);
                                }}
                                className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-white rounded-lg transition-all duration-200 hover:scale-110"
                                title="Delete Entire Section"
                            >
                                <Trash2 size={14} />
                            </button>
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleAddMemberToType(type, group.sectionOrder);
                                }}
                                className={`ml-1 p-2 rounded-lg border transition-all duration-200 shadow-sm flex items-center gap-1.5 text-[10px] font-bold uppercase hover:scale-105 ${isAddingHere ? 'bg-blue-600 text-white border-blue-600' : 'text-blue-600 bg-white border-transparent hover:border-blue-100'}`}
                            >
                                <Plus size={14} /> Add Member
                            </button>
                        </div>
                    </button>

                    <div
                        className={`overflow-hidden transition-all duration-500 ease-in-out ${isExpanded ? 'max-h-[5000px] opacity-100' : 'max-h-0 opacity-0'
                            }`}
                    >
                        <div className="border-t border-gray-100">
                            {showInlineForm && (
                                <div
                                    ref={inlineFormRef}
                                    className="p-5 bg-blue-50/50 border-b border-blue-100 animate-slide-in"
                                >
                                    <div className="flex items-center gap-2 mb-4">
                                        <div className="w-1.5 h-1.5 bg-blue-600 rounded-full animate-pulse" />
                                        <p className="text-[10px] font-bold text-blue-800 uppercase tracking-widest">
                                            {isAddingHere ? 'Add New Member' : 'Edit Member Details'}
                                        </p>
                                    </div>
                                    <div className="grid md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1">Name</label>
                                            <input
                                                value={formData.name || ''}
                                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                                className="w-full px-3 py-2 bg-white border border-blue-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                                                placeholder="e.g. Dr. Jane Smith"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1">Designation</label>
                                            <input
                                                value={formData.designation || ''}
                                                onChange={(e) => setFormData({ ...formData, designation: e.target.value })}
                                                className="w-full px-3 py-2 bg-white border border-blue-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                                                placeholder="e.g. Professor, GUNI"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1">Organization</label>
                                            <input
                                                value={formData.organization || ''}
                                                onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                                                className="w-full px-3 py-2 bg-white border border-blue-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                                                placeholder="e.g. Ganpat University"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1">Display Order</label>
                                            <input
                                                type="number"
                                                value={formData.order || ''}
                                                onChange={(e) => setFormData({ ...formData, order: e.target.value })}
                                                className="w-full px-3 py-2 bg-white border border-blue-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                                            />
                                        </div>
                                    </div>
                                    <div className="flex gap-2 mt-5 pt-4 border-t border-blue-100">
                                        <button
                                            onClick={handleSave}
                                            className="px-4 py-2 bg-blue-600 text-white rounded-lg text-xs font-bold uppercase tracking-wider hover:bg-blue-700 transition-all flex items-center gap-2 shadow-sm"
                                        >
                                            <Save size={14} /> Save Member
                                        </button>
                                        <button
                                            onClick={handleCancel}
                                            className="px-4 py-2 bg-white text-gray-600 border border-gray-200 rounded-lg text-xs font-bold uppercase tracking-wider hover:bg-gray-50 transition-all shadow-sm"
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                </div>
                            )}

                            {members.length > 0 && (
                                <table className="w-full text-left">
                                    <tbody className="divide-y divide-gray-100">
                                        {members.map(member => (
                                            <tr key={member._id} className={`hover:bg-blue-50/30 transition-colors ${member.isStatic ? 'bg-gray-50/30' : ''}`}>
                                                <td className="px-5 py-3">
                                                    <div className="flex items-center gap-2">
                                                        <div className="text-sm font-bold text-gray-800">{member.name}</div>
                                                        {member.isStatic ? (
                                                            <span className="text-[8px] font-bold bg-gray-200 text-gray-500 px-1 rounded uppercase tracking-tighter">Code Only</span>
                                                        ) : (
                                                            <span className="text-[10px] font-mono text-gray-400 bg-gray-100 px-1.5 rounded">{member.order}</span>
                                                        )}
                                                    </div>
                                                    <div className="text-xs text-gray-500">{member.designation}</div>
                                                </td>
                                                <td className="px-5 py-3 text-right whitespace-nowrap">
                                                    <div className="flex items-center justify-end gap-1.5">
                                                        <button
                                                            onClick={() => handleEditCombined(member)}
                                                            className={`p-1.5 rounded-lg transition-colors ${editingItem === member._id ? 'bg-blue-600 text-white' : 'text-blue-600 hover:bg-blue-100'}`}
                                                            title={member.isStatic ? "Promote to Database" : "Edit"}
                                                        >
                                                            <Edit2 size={14} />
                                                        </button>
                                                        {!member.isStatic && (
                                                            <button
                                                                onClick={() => handleDelete(member._id)}
                                                                className="p-1.5 text-red-600 hover:bg-red-100 rounded-lg transition-colors"
                                                                title="Delete"
                                                            >
                                                                <Trash2 size={14} />
                                                            </button>
                                                        )}
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            )}

                            {!showInlineForm && members.length === 0 && (
                                <div className="p-8 text-center bg-gray-50/30">
                                    <p className="text-sm text-gray-400 font-medium">No members added to this section yet.</p>
                                    <button
                                        onClick={() => handleAddMemberToType(type, group.sectionOrder)}
                                        className="mt-3 text-xs font-bold text-blue-600 hover:text-blue-700 uppercase tracking-widest"
                                    >
                                        Add First Member
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            );
        };

        return (
            <div className="p-6 committee-container">
                <div className="grid md:grid-cols-2 gap-6">
                    <div className="flex flex-col">
                        {leftColumn.map(renderSection)}
                    </div>
                    <div className="flex flex-col">
                        {rightColumn.map(renderSection)}
                    </div>
                </div>
            </div>
        );
    };

    const renderTable = () => {
        const data = getData();
        const columns = getColumns();

        return (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden animate-fade-in">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50 border-b">
                            <tr>
                                {columns.map(col => (
                                    <th key={col.key} className="px-4 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                                        {col.label}
                                    </th>
                                ))}
                                <th className="px-4 py-3 text-right text-xs font-bold text-gray-700 uppercase">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {data.length === 0 ? (
                                <tr>
                                    <td colSpan={columns.length + 1} className="px-4 py-8 text-center text-gray-500 italic">
                                        No data available. Click "Add New" to create your first entry.
                                    </td>
                                </tr>
                            ) : (
                                data.map((item, index) => (
                                    <tr
                                        key={item._id}
                                        className="hover:bg-blue-50 transition-all duration-200 animate-fade-in-up hover:shadow-sm"
                                        style={{ animationDelay: `${index * 50}ms` }}
                                    >
                                        {columns.map(col => (
                                            <td key={col.key} className="px-4 py-3 text-sm text-gray-800">
                                                {col.render ? col.render(item) : item[col.key]}
                                            </td>
                                        ))}
                                        <td className="px-4 py-3 text-right">
                                            <button
                                                onClick={() => handleEdit(item)}
                                                className="text-blue-600 hover:text-blue-800 mr-3 transition-all duration-200 hover:scale-110 inline-block"
                                            >
                                                <Edit2 size={16} />
                                            </button>
                                            <button
                                                onClick={() => handleDelete(item._id)}
                                                className="text-red-600 hover:text-red-800 transition-all duration-200 hover:scale-110 inline-block"
                                            >
                                                <Trash2 size={16} />
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    };

    const getData = () => {
        switch (activeTab) {
            case 'speakers': return speakers;
            case 'committees': return committees;
            case 'dates': return dates;
            case 'topics': return topics;
            case 'editions': return editions;
            case 'fees': return fees;
            case 'archives': return archives;
            case 'news': return news;
            default: return [];
        }
    };

    const getColumns = () => {
        switch (activeTab) {
            case 'speakers':
                return [
                    { key: 'name', label: 'Name' },
                    { key: 'designation', label: 'Designation' },
                    { key: 'organization', label: 'Organization' },
                    { key: 'year', label: 'Year' }
                ];
            case 'committees':
                return [
                    { key: 'name', label: 'Name' },
                    { key: 'designation', label: 'Designation' },
                    { key: 'organization', label: 'Organization' },
                    { key: 'type', label: 'Type' }
                ];
            case 'dates':
                return [
                    { key: 'event', label: 'Event' },
                    { key: 'date', label: 'Date', render: (item) => new Date(item.date).toLocaleDateString() },
                    {
                        key: 'isPinned',
                        label: 'Countdown',
                        render: (item) => (
                            <div className="flex items-center">
                                {item.isPinned ? (
                                    <span className="px-2 py-1 bg-yellow-100 text-yellow-700 text-[10px] font-bold rounded-lg flex items-center gap-1 uppercase">
                                        <Pin size={10} fill="currentColor" /> Pinned
                                    </span>
                                ) : (
                                    <span className="text-gray-300"><Pin size={14} /></span>
                                )}
                            </div>
                        )
                    }
                ];
            case 'topics':
                return [
                    { key: 'title', label: 'Topic' },
                    { key: 'track', label: 'Track' }
                ];
            case 'editions':
                return [
                    { key: 'year', label: 'Year' },
                    { key: 'title', label: 'Title' },
                    { key: 'publisher', label: 'Publisher' }
                ];
            case 'fees':
                return [
                    { key: 'type', label: 'Registration Type' },
                    { key: 'indian', label: 'Indian (INR)' },
                    { key: 'foreign', label: 'Foreign (USD)' },
                    { key: 'order', label: 'Order' }
                ];
            case 'archives':
                return [
                    { key: 'title', label: 'Title' },
                    { key: 'year', label: 'Year' },
                    { key: 'type', label: 'Type' },
                    { key: 'order', label: 'Order' }
                ];
            case 'news':
                return [
                    { key: 'title', label: 'News' },
                    { key: 'date', label: 'Date', render: (item) => item.date ? new Date(item.date).toLocaleDateString() : 'N/A' },
                    { key: 'link', label: 'Link' }
                ];
            default:
                return [];
        }
    };

    if (!user) return null;

    return (
        <div className="flex min-h-screen bg-gray-50">
            {/* Mobile Menu Button */}
            <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-white rounded-lg shadow-lg border border-gray-200"
            >
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            {/* Sidebar Navigation */}
            <aside className={`w-64 bg-white border-r border-gray-200 flex flex-col fixed inset-y-0 shadow-sm z-40 transition-transform duration-300 lg:translate-x-0 ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
                }`}>
                <div className="p-6 border-b border-gray-50">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white">
                            <FileText size={16} />
                        </div>
                        <h1 className="text-lg font-bold text-gray-900 tracking-tight">Admin</h1>
                    </div>
                </div>

                <nav className="flex-grow p-4 space-y-1 overflow-y-auto">
                    {tabs.map(tab => {
                        const Icon = tab.icon;
                        const isActive = activeTab === tab.id;
                        return (
                            <button
                                key={tab.id}
                                onClick={() => {
                                    setActiveTab(tab.id);
                                    handleCancel();
                                    setIsMobileMenuOpen(false); // Close menu on mobile after selection
                                }}
                                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${isActive
                                    ? 'bg-blue-50 text-blue-700 font-semibold'
                                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                                    }`}
                            >
                                <Icon size={18} className={isActive ? 'text-blue-700' : 'text-gray-400'} />
                                <span>{tab.label}</span>
                            </button>
                        );
                    })}
                </nav>

                <div className="p-4 border-t border-gray-100">
                    <button
                        onClick={handleLogout}
                        className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-gray-50 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-100 transition-colors border border-gray-200"
                    >
                        <LogOut size={16} /> Logout
                    </button>
                </div>
            </aside>

            {/* Overlay for mobile */}
            {isMobileMenuOpen && (
                <div
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="lg:hidden fixed inset-0 bg-black/50 z-30"
                ></div>
            )}

            {/* Main Content Area */}
            <main className="flex-grow lg:ml-64 p-4 sm:p-6 lg:p-8 pt-16 lg:pt-8">
                <header className="flex justify-between items-center mb-8">
                    <div>
                        <h2 className="text-2xl font-bold text-gray-900">
                            {tabs.find(t => t.id === activeTab)?.label}
                        </h2>
                        <p className="text-sm text-gray-500 mt-1">Manage {tabs.find(t => t.id === activeTab)?.label.toLowerCase()}</p>
                    </div>

                    {!isAdding && !editingItem && (
                        <button
                            onClick={handleAdd}
                            className="px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold text-sm hover:bg-blue-700 flex items-center gap-2 transition-all duration-200 hover:scale-105 hover:shadow-lg shadow-md"
                        >
                            <Plus size={18} />
                            {activeTab === 'committees' ? 'Add New Section' : 'Add New'}
                        </button>
                    )}
                </header>

                {/* Content */}

                {activeTab === 'settings' ? (
                    <div className="space-y-6">
                        {!isAdding && !editingItem && (
                            <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
                                <div className="flex justify-between items-start mb-6 border-b border-gray-50 pb-4">
                                    <div>
                                        <h3 className="text-lg font-bold text-gray-900">Live Hero Content</h3>
                                        <p className="text-gray-500 text-xs">Current configuration for the website header</p>
                                    </div>
                                    <button
                                        onClick={() => {
                                            setFormData(conferenceInfo);
                                            setEditingItem('settings');
                                        }}
                                        className="flex items-center gap-2 px-3 py-1.5 text-blue-600 border border-blue-200 rounded-lg text-sm font-semibold hover:bg-blue-50 transition-all"
                                    >
                                        <Edit2 size={14} /> Update Settings
                                    </button>
                                </div>

                                <div className="grid md:grid-cols-2 gap-x-12 gap-y-6">
                                    <div className="space-y-4">
                                        <div>
                                            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Banner Text</p>
                                            <p className="text-sm font-medium text-gray-800">{conferenceInfo?.edition || '7th Edition'} • {conferenceInfo?.mode || 'Hybrid Mode'}</p>
                                        </div>
                                        <div>
                                            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Title</p>
                                            <p className="text-xl font-bold text-gray-900">{conferenceInfo?.short_name || 'COMS2'} {conferenceInfo?.year || '2026'}</p>
                                        </div>
                                        <div>
                                            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Full Name</p>
                                            <p className="text-sm text-gray-600 leading-snug">{conferenceInfo?.name || 'International Conference on Computing, Communication and Security'}</p>
                                        </div>
                                    </div>
                                    <div className="space-y-4">
                                        <div>
                                            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Dates</p>
                                            <p className="text-sm font-medium text-gray-800">
                                                {(() => {
                                                    if (!conferenceInfo?.start_date || !conferenceInfo?.end_date) return 'Sept 10-11, 2026';
                                                    const s = new Date(conferenceInfo.start_date);
                                                    const e = new Date(conferenceInfo.end_date);
                                                    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
                                                    const month = months[s.getUTCMonth()];
                                                    const sDay = s.getUTCDate();
                                                    const eDay = e.getUTCDate();
                                                    const year = e.getUTCFullYear();

                                                    if (sDay === eDay) return `${month} ${sDay}, ${year}`;
                                                    return `${month} ${sDay}-${eDay}, ${year}`;
                                                })()}
                                            </p>
                                        </div>
                                        <div>
                                            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Location</p>
                                            <p className="text-sm font-medium text-gray-800">{conferenceInfo?.venue || 'Ganpat University'}, {conferenceInfo?.country || 'India'}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                        {editingItem === 'settings' && renderForm()}
                    </div>
                ) : (
                    <div className="space-y-8 animate-fade-in-up">
                        {/* Form Component - Hidden for committee members because they use inline forms */}
                        {!(activeTab === 'committees' && !isCreatingSection && (isAdding || editingItem)) && renderForm()}

                        {/* Table Component */}
                        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                            <div className="px-6 py-4 border-b border-gray-100 bg-gray-50/50 flex items-center justify-between">
                                <h3 className="text-sm font-bold text-gray-800">Existing Records</h3>
                                <div className="text-[10px] font-bold text-gray-500 uppercase">
                                    {activeTab === 'committees' ? (
                                        `${[...new Set([...committees.map(c => c.type || 'Uncategorized'), 'Advisory Committee', ...Object.values(chairs).map(s => s.title)])].length} Sections`
                                    ) : (
                                        `${getData().length} Total`
                                    )}
                                </div>
                            </div>
                            {activeTab === 'committees' ? renderCommitteeGrid() : renderTable()}
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
};

export default AdminDashboard;
