import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
    Users, Calendar, FileText, Tag, BookOpen, Newspaper,
    Plus, Edit2, Trash2, Save, X, LogOut
} from 'lucide-react';

const AdminDashboard = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [activeTab, setActiveTab] = useState('speakers');

    // Data states
    const [speakers, setSpeakers] = useState([]);
    const [committees, setCommittees] = useState([]);
    const [dates, setDates] = useState([]);
    const [topics, setTopics] = useState([]);
    const [editions, setEditions] = useState([]);
    const [fees, setFees] = useState([]);
    const [archives, setArchives] = useState([]);
    const [news, setNews] = useState([]);

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
            const [speakersRes, committeesRes, datesRes, topicsRes, editionsRes, feesRes, archivesRes, newsRes] = await Promise.all([
                axios.get(`${import.meta.env.VITE_API_URL}/api/admin/speakers`, config),
                axios.get(`${import.meta.env.VITE_API_URL}/api/admin/committees`, config),
                axios.get(`${import.meta.env.VITE_API_URL}/api/admin/important-dates`, config),
                axios.get(`${import.meta.env.VITE_API_URL}/api/admin/topics`, config),
                axios.get(`${import.meta.env.VITE_API_URL}/api/admin/previous-editions`, config),
                axios.get(`${import.meta.env.VITE_API_URL}/api/admin/registration-fees`, config),
                axios.get(`${import.meta.env.VITE_API_URL}/api/admin/archive`, config),
                axios.get(`${import.meta.env.VITE_API_URL}/api/admin/news`, config)
            ]);
            setSpeakers(speakersRes.data);
            setCommittees(committeesRes.data);
            setDates(datesRes.data);
            setTopics(topicsRes.data);
            setEditions(editionsRes.data);
            setFees(feesRes.data);
            setArchives(archivesRes.data);
            setNews(newsRes.data);
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
        setFormData(item);
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
            if (isAdding) {
                await axios.post(`${import.meta.env.VITE_API_URL}/api/admin/${endpoint}`, formData, config);
            } else {
                await axios.put(`${import.meta.env.VITE_API_URL}/api/admin/${endpoint}/${editingItem}`, formData, config);
            }
            await loadData();
            handleCancel();
        } catch (error) {
            console.error('Error saving:', error);
            alert('Failed to save');
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
            <div className="bg-blue-50 p-6 rounded-xl border-2 border-blue-200 mb-6">
                <h3 className="text-lg font-bold text-gray-800 mb-4">
                    {isAdding ? 'Add New' : 'Edit'} {tabs.find(t => t.id === activeTab)?.label}
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
                    { key: 'date', label: 'Date', render: (item) => new Date(item.date).toLocaleDateString() }
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
        <div className="pt-8 pb-20 bg-gray-50 min-h-screen">
            <div className="container mx-auto px-6">
                {/* Header */}
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
                        <p className="text-gray-600 mt-1">Manage your conference website content</p>
                    </div>
                    <button
                        onClick={handleLogout}
                        className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 flex items-center gap-2"
                    >
                        <LogOut size={16} /> Logout
                    </button>
                </div>

                {/* Tabs */}
                <div className="mb-6 border-b border-gray-200">
                    <div className="flex gap-2 overflow-x-auto">
                        {tabs.map(tab => {
                            const Icon = tab.icon;
                            return (
                                <button
                                    key={tab.id}
                                    onClick={() => {
                                        setActiveTab(tab.id);
                                        handleCancel();
                                    }}
                                    className={`flex items-center gap-2 px-4 py-3 font-medium border-b-2 transition-colors whitespace-nowrap ${activeTab === tab.id
                                        ? 'border-blue-600 text-blue-600'
                                        : 'border-transparent text-gray-600 hover:text-gray-900'
                                        }`}
                                >
                                    <Icon size={18} />
                                    {tab.label}
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* Add Button */}
                {!isAdding && !editingItem && (
                    <div className="mb-6">
                        <button
                            onClick={handleAdd}
                            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2"
                        >
                            <Plus size={18} /> Add New {tabs.find(t => t.id === activeTab)?.label}
                        </button>
                    </div>
                )}

                {/* Form */}
                {renderForm()}

                {/* Table */}
                {renderTable()}
            </div>
        </div>
    );
};

export default AdminDashboard;
