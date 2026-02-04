import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AdminDashboard = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [conference, setConference] = useState({});
    const [editing, setEditing] = useState(false);

    useEffect(() => {
        const userInfo = JSON.parse(localStorage.getItem('userInfo'));
        if (!userInfo || userInfo.role !== 'admin') {
            navigate('/login');
            return;
        }
        setUser(userInfo);

        // Fetch conference data
        axios.get('http://localhost:5000/api/conference/coms2-2026')
            .then(res => setConference(res.data))
            .catch(err => console.error(err));
    }, [navigate]);

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post('http://localhost:5000/api/conference', conference);
            setConference(data);
            setEditing(false);
            alert('Conference details updated!');
        } catch (error) {
            console.error(error);
            alert('Update failed');
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('userInfo');
        navigate('/login');
    };

    if (!user) return null;

    return (
        <div className="pt-32 pb-20 bg-gray-50 min-h-screen">
            <div className="container mx-auto px-6">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
                    <button onClick={handleLogout} className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">Logout</button>
                </div>

                <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-xl font-bold text-gray-800">Conference Details</h2>
                        <button
                            onClick={() => setEditing(!editing)}
                            className="text-accent font-medium hover:underline"
                        >
                            {editing ? 'Cancel' : 'Edit Details'}
                        </button>
                    </div>

                    {editing ? (
                        <form onSubmit={handleUpdate} className="grid md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Conference Name</label>
                                <input
                                    type="text"
                                    value={conference.name || ''}
                                    onChange={(e) => setConference({ ...conference, name: e.target.value })}
                                    className="w-full px-4 py-2 border rounded-lg"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Theme</label>
                                <input
                                    type="text"
                                    value={conference.theme || ''}
                                    onChange={(e) => setConference({ ...conference, theme: e.target.value })}
                                    className="w-full px-4 py-2 border rounded-lg"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Venue</label>
                                <input
                                    type="text"
                                    value={conference.venue || ''}
                                    onChange={(e) => setConference({ ...conference, venue: e.target.value })}
                                    className="w-full px-4 py-2 border rounded-lg"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">State</label>
                                <input
                                    type="text"
                                    value={conference.state || ''}
                                    onChange={(e) => setConference({ ...conference, state: e.target.value })}
                                    className="w-full px-4 py-2 border rounded-lg"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Country</label>
                                <input
                                    type="text"
                                    value={conference.country || ''}
                                    onChange={(e) => setConference({ ...conference, country: e.target.value })}
                                    className="w-full px-4 py-2 border rounded-lg"
                                />
                            </div>
                            <div className="md:col-span-2">
                                <button type="submit" className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
                                    Save Changes
                                </button>
                            </div>
                        </form>
                    ) : (
                        <div className="grid md:grid-cols-2 gap-6 text-gray-700">
                            <p><span className="font-semibold">Name:</span> {conference.name}</p>
                            <p><span className="font-semibold">Theme:</span> {conference.theme}</p>
                            <p><span className="font-semibold">Venue:</span> {conference.venue}</p>
                            <p><span className="font-semibold">Location:</span> {conference.state}, {conference.country}</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
