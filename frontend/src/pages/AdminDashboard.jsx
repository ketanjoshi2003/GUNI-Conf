import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
    Users, Calendar, FileText, Tag, BookOpen, Newspaper,
    Plus, Edit2, Trash2, Save, X, LogOut, Pin, Settings
} from 'lucide-react';

const AdminDashboard = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [activeTab, setActiveTab] = useState('settings');

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

    // Form states
    const [editingItem, setEditingItem] = useState(null);
    const [isAdding, setIsAdding] = useState(false);
    const [formData, setFormData] = useState({});

    useEffect(() => {
        const userInfo = JSON.parse(localStorage.getItem('userInfo'));
        if (!userInfo || userInfo.role !== 'admin') {
            navigate('/login');
            return;
        }
        setUser(userInfo);
        loadData(userInfo.token);
    }, [navigate]);

    const getAuthConfig = (token) => {
        const t = token || user?.token;
        return {
            headers: {
                Authorization: `Bearer ${t}`
            }
        };
    };

    const loadData = async (token) => {
        try {
            const config = getAuthConfig(token);
            const [speakersRes, committeesRes, datesRes, topicsRes, editionsRes, feesRes, archivesRes, newsRes, confRes] = await Promise.all([
                axios.get(`${import.meta.env.VITE_API_URL}/api/admin/speakers`, config),
                axios.get(`${import.meta.env.VITE_API_URL}/api/admin/committees`, config),
                axios.get(`${import.meta.env.VITE_API_URL}/api/admin/important-dates`, config),
                axios.get(`${import.meta.env.VITE_API_URL}/api/admin/topics`, config),
                axios.get(`${import.meta.env.VITE_API_URL}/api/admin/previous-editions`, config),
                axios.get(`${import.meta.env.VITE_API_URL}/api/admin/registration-fees`, config),
                axios.get(`${import.meta.env.VITE_API_URL}/api/admin/archive`, config),
                axios.get(`${import.meta.env.VITE_API_URL}/api/admin/news`, config),
                axios.get(`${import.meta.env.VITE_API_URL}/api/admin/conference-info`, config)
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
    };

    const handleLogout = () => {
        localStorage.removeItem('userInfo');
        navigate('/');
    };

    const handleAdd = () => {
        setIsAdding(true);
        setEditingItem(null);
        setFormData({});
    };

    const handleEdit = (item) => {
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
        setEditingItem(null);
        setFormData({});
    };

    const handleSave = async () => {
        try {
            const endpoint = getEndpoint();
            const config = getAuthConfig();

            // Log for debugging
            console.log('Saving to:', endpoint, formData);

            if (activeTab === 'settings') {
                await axios.put(`${import.meta.env.VITE_API_URL}/api/admin/conference-info`, formData, config);
            } else if (isAdding) {
                await axios.post(`${import.meta.env.VITE_API_URL}/api/admin/${endpoint}`, formData, config);
            } else {
                await axios.put(`${import.meta.env.VITE_API_URL}/api/admin/${endpoint}/${editingItem}`, formData, config);
            }
            await loadData();
            handleCancel();
        } catch (error) {
            console.error('Save failed:', error.response?.data || error.message);
            alert(`Failed to save: ${error.response?.data?.message || error.message}`);
        }
    };

    const handleDelete = async (id) => {
        if (!confirm('Are you sure you want to delete this item?')) return;
        try {
            const endpoint = getEndpoint();
            const config = getAuthConfig();
            await axios.delete(`${import.meta.env.VITE_API_URL}/api/admin/${endpoint}/${id}`, config);
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
                            ) : field.type === 'checkbox' ? (
                                <div className="flex items-center gap-2 py-2">
                                    <input
                                        type="checkbox"
                                        checked={formData[field.name] || false}
                                        onChange={(e) => setFormData({ ...formData, [field.name]: e.target.checked })}
                                        className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500"
                                    />
                                    <span className="text-sm text-gray-600">{field.description || 'Enable this option'}</span>
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
                    { name: 'bio', label: 'Bio', type: 'textarea', fullWidth: true },
                    { name: 'image', label: 'Image URL' },
                    { name: 'order', label: 'Display Order', type: 'number' }
                ];
            case 'committees':
                return [
                    { name: 'name', label: 'Name', required: true },
                    { name: 'designation', label: 'Designation', required: true },
                    { name: 'organization', label: 'Organization' },
                    { name: 'email', label: 'Email', type: 'email' },
                    { name: 'type', label: 'Committee Type', type: 'select', options: ['advisory', 'conference-chairs', 'technical-program', 'organizing'] },
                    { name: 'order', label: 'Display Order', type: 'number' }
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

    const renderTable = () => {
        const data = getData();
        const columns = getColumns();

        return (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
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
                                data.map(item => (
                                    <tr key={item._id} className="hover:bg-gray-50">
                                        {columns.map(col => (
                                            <td key={col.key} className="px-4 py-3 text-sm text-gray-800">
                                                {col.render ? col.render(item) : item[col.key]}
                                            </td>
                                        ))}
                                        <td className="px-4 py-3 text-right">
                                            <button onClick={() => handleEdit(item)} className="text-blue-600 hover:text-blue-800 mr-3">
                                                <Edit2 size={16} />
                                            </button>
                                            <button onClick={() => handleDelete(item._id)} className="text-red-600 hover:text-red-800">
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
            {/* Sidebar Navigation */}
            <aside className="w-64 bg-white border-r border-gray-200 flex flex-col fixed inset-y-0 shadow-sm z-10">
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

            {/* Main Content Area */}
            <main className="flex-grow ml-64 p-8">
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
                            className="px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold text-sm hover:bg-blue-700 flex items-center gap-2 transition-colors"
                        >
                            <Plus size={18} />
                            Add New
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
                        {/* Form Component */}
                        {renderForm()}

                        {/* Table Component */}
                        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                            <div className="px-6 py-4 border-b border-gray-100 bg-gray-50/50 flex items-center justify-between">
                                <h3 className="text-sm font-bold text-gray-800">Existing Records</h3>
                                <div className="text-[10px] font-bold text-gray-500 uppercase">
                                    {getData().length} Total
                                </div>
                            </div>
                            {renderTable()}
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
};

export default AdminDashboard;
