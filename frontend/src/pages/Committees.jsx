import React, { useState, useEffect, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { User, Users, Award, Briefcase, Globe, Monitor, Code, Megaphone } from 'lucide-react';

import { useSocketRefresh } from '../hooks/useSocketRefresh';
import { useYear } from '../context/YearContext';

// v2.0 - Fully database-driven committees (cache-bust: 2026-02-06)
const Committees = () => {

    const { search } = useLocation();
    const { selectedYear } = useYear();
    const [activeTab, setActiveTab] = useState('advisory');
    const [committees, setCommittees] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchCommittees = useCallback(async (skipLoadingState = false) => {
        try {
            if (!skipLoadingState) {
                setLoading(true);
            }
            console.log('Fetching committees from API...');
            const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/admin/committees?year=${selectedYear}`);
            console.log(`Received ${response.data.length} committee members`);
            setCommittees(response.data);
        } catch (error) {
            console.error('Error fetching committees:', error);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchCommittees();
    }, [fetchCommittees, selectedYear]);

    useSocketRefresh(() => {
        console.log('Committees: Socket refresh triggered - refetching data...');
        fetchCommittees(true); // Skip loading state for smoother refresh
    });

    useEffect(() => {
        const query = new URLSearchParams(search);
        const tab = query.get('tab');
        if (tab) {
            setActiveTab(tab);
        }
    }, [search]);

    // Metadata mapping for database types to tabs and icons
    const sectionMeta = {
        'Advisory Committee': { icon: <Globe className="w-5 h-5" />, tab: 'advisory' },
        'Honorary Chairs': { icon: <Award className="w-5 h-5" />, tab: 'conference-chairs' },
        'General Chairs': { icon: <User className="w-5 h-5" />, tab: 'conference-chairs' },
        'Program Chairs': { icon: <Code className="w-5 h-5" />, tab: 'conference-chairs' },
        'Technical Program Chairs': { icon: <Monitor className="w-5 h-5" />, tab: 'conference-chairs' },
        'Track Chairs': { icon: <Users className="w-5 h-5" />, tab: 'conference-chairs' },
        'Organizing Chairs': { icon: <Briefcase className="w-5 h-5" />, tab: 'conference-chairs' },
        'Organizing Committee': { icon: <Users className="w-5 h-5" />, tab: 'organizing' },
        'Industry/University Connect Chair': { icon: <Globe className="w-5 h-5" />, tab: 'conference-chairs' },
        'Website Chairs': { icon: <Monitor className="w-5 h-5" />, tab: 'conference-chairs' },
        'Publicity Chair': { icon: <Megaphone className="w-5 h-5" />, tab: 'conference-chairs' },
        'Technical Program Committee Members': { icon: <Users className="w-5 h-5" />, tab: 'technical-program' }
    };

    // Helper function to get metadata for any type
    const getMetaForType = (type) => {
        if (sectionMeta[type]) {
            return sectionMeta[type];
        }
        // For custom types, create a tab with the same name (normalized)
        const tabId = type.toLowerCase().replace(/\s+/g, '-');
        return { icon: <Users className="w-5 h-5" />, tab: tabId };
    };

    const groupedData = committees.reduce((acc, member) => {
        const type = member.type || 'Other';
        if (!acc[type]) {
            acc[type] = {
                members: [],
                sectionOrder: member.sectionOrder || 99,
                meta: getMetaForType(type)
            };
        }
        acc[type].members.push(member);
        return acc;
    }, {});

    const renderDataSection = (type, group) => {
        const isLongList = group.members.length > 6;
        const icon = group.meta.icon;

        return (
            <div key={type} className={`bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-all ${isLongList ? 'md:col-span-2' : ''}`}>
                <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-3 pb-3 border-b border-gray-100 italic">
                    <div className="p-1.5 bg-blue-50 text-blue-600 rounded-lg">
                        {icon}
                    </div>
                    {type}
                </h3>
                <div className={isLongList ? "grid md:grid-cols-2 gap-x-8 gap-y-3" : "space-y-3"}>
                    {group.members
                        .sort((a, b) => (a.order || 0) - (b.order || 0))
                        .map((member, mIdx) => (
                            <div key={mIdx} className="flex items-start gap-3 group">
                                <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5 flex-shrink-0 group-hover:scale-125 transition-transform shadow-[0_0_8px_rgba(59,130,246,0.4)]"></div>
                                <div>
                                    <div className="font-bold text-gray-800 text-sm group-hover:text-blue-600 transition-colors">
                                        {member.name}
                                    </div>
                                    <div className="text-xs text-gray-500 mt-0.5 leading-relaxed">
                                        {member.designation}
                                        {member.organization && `, ${member.organization}`}
                                    </div>
                                </div>
                            </div>
                        ))}
                </div>
            </div>
        );
    };

    return (
        <div className="bg-gray-50 min-h-screen pt-28 pb-12">
            <div className="container mx-auto px-6">
                <div className="mb-12 text-center">
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 animate-fade-in-up">
                        Committees
                    </h1>
                    <div className="w-24 h-1 bg-blue-600 mx-auto rounded-full mt-6"></div>
                </div>

                <div className="max-w-6xl mx-auto">
                    {/* Dynamically generate tabs */}
                    {(() => {
                        // Standard tabs
                        const standardTabs = [
                            { id: 'advisory', label: 'Advisory Committee', icon: <Globe size={16} /> },
                            { id: 'conference-chairs', label: 'Conference Chairs', icon: <Award size={16} /> },
                            { id: 'technical-program', label: 'Technical Program', icon: <Monitor size={16} /> },
                            { id: 'organizing', label: 'Organizing', icon: <Briefcase size={16} /> }
                        ];

                        // Get unique tab IDs from grouped data
                        const customTabIds = [...new Set(Object.values(groupedData).map(g => g.meta.tab))];

                        // Filter out standard tab IDs to get only custom ones
                        const customTabs = customTabIds
                            .filter(tabId => !standardTabs.some(st => st.id === tabId))
                            .map(tabId => {
                                // Find the first section with this tab ID to get its display name
                                const sectionEntry = Object.entries(groupedData).find(([_, g]) => g.meta.tab === tabId);
                                const sectionName = sectionEntry ? sectionEntry[0] : tabId;
                                return {
                                    id: tabId,
                                    label: sectionName,
                                    icon: <Users size={16} />
                                };
                            });

                        const allTabs = [...standardTabs, ...customTabs];

                        return (
                            <div className="flex flex-wrap justify-center gap-2 mb-10">
                                {allTabs.map((tab) => (
                                    <button
                                        key={tab.id}
                                        onClick={() => setActiveTab(tab.id)}
                                        className={`px-5 py-2.5 rounded-full text-sm font-bold flex items-center gap-2.5 transition-all duration-300 shadow-sm border ${activeTab === tab.id
                                            ? 'bg-blue-600 text-white border-blue-600 shadow-blue-200 scale-105'
                                            : 'bg-white text-gray-600 border-gray-100 hover:border-blue-200 hover:text-blue-600 hover:bg-blue-50/30'
                                            }`}
                                    >
                                        {tab.icon}
                                        {tab.label}
                                    </button>
                                ))}
                            </div>
                        );
                    })()}

                    <div className="w-full">
                        {loading ? (
                            <div className="flex justify-center items-center h-64">
                                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                            </div>
                        ) : (
                            <div className="grid md:grid-cols-2 gap-6 animate-fade-in-up">
                                {Object.entries(groupedData)
                                    .filter(([_, group]) => group.meta.tab === activeTab)
                                    .sort((a, b) => (a[1].sectionOrder || 0) - (b[1].sectionOrder || 0))
                                    .map(([type, group]) => renderDataSection(type, group))}

                                {Object.entries(groupedData).filter(([_, group]) => group.meta.tab === activeTab).length === 0 && (
                                    <div className="md:col-span-2 text-center py-20 bg-white rounded-2xl border border-dashed border-gray-200">
                                        <p className="text-gray-400 italic">No members found for this section.</p>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Committees;
