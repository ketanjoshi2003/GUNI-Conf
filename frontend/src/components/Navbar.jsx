import React, { useState, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { Link, useLocation } from 'react-router-dom';
import axios from 'axios';
import { Menu, X, Search, ChevronDown, ChevronRight, ExternalLink, FileText } from 'lucide-react';
import { useSocketRefresh } from '../hooks/useSocketRefresh';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [activeDropdown, setActiveDropdown] = useState(null);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const location = useLocation();

    // Check if we are on the home page
    const isHome = location.pathname === '/';

    const [speakerYears, setSpeakerYears] = useState(['2026', '2025', '2024', '2023', '2022', '2021', '2020']);
    const [customCommitteeSections, setCustomCommitteeSections] = useState([]);

    const fetchSpeakerYears = useCallback(async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/admin/speakers`);
            const years = response.data.map(s => String(s.year));
            const uniqueYears = [...new Set([...years, '2026', '2025', '2024', '2023', '2022', '2021', '2020'])].sort((a, b) => b - a);
            setSpeakerYears(uniqueYears);
        } catch (error) {
            console.error('Error fetching speaker years:', error);
        }
    }, []);

    const fetchCustomCommittees = useCallback(async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/admin/committees`);

            // Standard committee types that should NOT appear in dropdown
            const standardTypes = [
                'Advisory Committee',
                'Honorary Chairs',
                'General Chairs',
                'Program Chairs',
                'Technical Program Chairs',
                'Track Chairs',
                'Organizing Chairs',
                'Organizing Committee',
                'Industry/University Connect Chair',
                'Website Chairs',
                'Publicity Chair',
                'Technical Program Committee Members'
            ];

            // Get unique custom types
            const customTypes = [...new Set(response.data.map(c => c.type))]
                .filter(type => type && !standardTypes.includes(type))
                .map(type => ({
                    name: type,
                    path: `/committees?tab=${type.toLowerCase().replace(/\s+/g, '-')}`
                }));

            setCustomCommitteeSections(customTypes);
        } catch (error) {
            console.error('Error fetching custom committees:', error);
        }
    }, []);

    useEffect(() => {
        fetchSpeakerYears();
        fetchCustomCommittees();
    }, [fetchSpeakerYears, fetchCustomCommittees]);

    useSocketRefresh(() => {
        console.log('Navbar: Refreshing dynamic content...');
        fetchSpeakerYears();
        fetchCustomCommittees();
    });

    const navItems = [
        { name: 'Home', path: '/' },
        {
            name: 'Authors',
            path: '/for-authors',
            dropdown: [
                { name: 'Call For Papers', path: '/call-for-papers' },
                { name: 'Paper Submission', path: '/paper-submission' },
                { name: 'Paper Publications', path: '/paper-publications' },
                { name: 'Accepted Papers', path: '/accepted-papers' },
                { name: 'Best Paper Award', path: '/best-paper-award' },
                { name: 'Important Dates', path: '/important-dates' },
                { name: 'Visa Information', path: '/visa-information' },
                { name: 'Accommodation', path: '/accommodation' },
                { name: 'Tourist Places', path: '/tourist-places' },
            ]
        },
        {
            name: 'Committees',
            path: '/committees',
            dropdown: [
                { name: 'Advisory Committee', path: '/committees?tab=advisory' },
                { name: 'Conference Chairs', path: '/committees?tab=conference-chairs' },
                { name: 'Technical Program Committee', path: '/committees?tab=technical-program' },
                { name: 'Organizing Committee', path: '/committees?tab=organizing' },
                ...customCommitteeSections
            ]
        },
        {
            name: 'Speakers',
            path: '/speakers',
            dropdown: speakerYears.map(year => ({
                name: `Speakers - ${year}`,
                path: `/speakers?year=${year}`
            }))
        },
        { name: 'Registration', path: '/registration' },
        { name: 'Proceedings', path: 'https://link.springer.com/book/10.1007/978-3-031-75170-7', isExternal: true },
        { name: 'Sponsors', path: '/sponsors' },
        {
            name: 'Archive',
            path: '/archive',
            dropdown: [
                { name: 'Media Coverage', path: '/archive?tab=media-coverage' },
                { name: 'Glimpses', path: '/archive?tab=glimpses' }
            ]
        },
        { name: 'Contact', path: '/contact' },
    ];

    useEffect(() => {
        const handleScroll = () => {
            // Navbar is ~80px tall. Transitions when bottom edge touches white content.
            // Mobile hero: 600px, Desktop hero: 700px.
            const threshold = isHome ? (window.innerWidth < 768 ? 520 : 620) : 20;
            setScrolled(window.scrollY > threshold);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [isHome]);

    useEffect(() => {
        const handleEsc = (e) => {
            if (e.key === 'Escape') setIsSearchOpen(false);
        };
        window.addEventListener('keydown', handleEsc);
        return () => window.removeEventListener('keydown', handleEsc);
    }, []);

    // Flatten nav items for searching
    const allSearchableItems = [];
    navItems.forEach(item => {
        allSearchableItems.push({ name: item.name, path: item.path });
        if (item.dropdown) {
            item.dropdown.forEach(sub => {
                allSearchableItems.push({ name: `${item.name} > ${sub.name}`, path: sub.path });
            });
        }
    });

    const filteredResults = searchQuery.trim() === ''
        ? []
        : allSearchableItems.filter(item =>
            item.name.toLowerCase().includes(searchQuery.toLowerCase())
        ).slice(0, 8);

    const useSolidStyle = scrolled || !isHome;

    const toggleDropdown = (name) => {
        if (activeDropdown === name) {
            setActiveDropdown(null);
        } else {
            setActiveDropdown(name);
        }
    };

    return (
        <nav className={`fixed w-full z-50 transition-all duration-500 py-4 ${useSolidStyle ? 'bg-white/90 backdrop-blur-xl shadow-lg border-b border-gray-100' : 'bg-transparent'}`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
                {/* Logo Section */}
                <Link to="/" className="relative group transition-transform duration-300 hover:scale-105 flex-shrink-0">
                    <img
                        src="/logo.png"
                        alt="Ganpat University Logo"
                        className={`h-12 w-auto transition-all duration-300 ${!useSolidStyle ? 'brightness-0 invert' : 'brightness-0'}`}
                    />
                </Link>

                {/* Desktop Navigation */}
                <div className="hidden lg:flex items-center gap-1 xl:gap-2 lg:ml-12">
                    {navItems.map((item) => {
                        const isActive = location.pathname === item.path ||
                            (item.dropdown && item.dropdown.some(sub => location.pathname === sub.path.split('?')[0]));

                        return (
                            <div key={item.name} className="relative group/nav">
                                {item.isExternal ? (
                                    <a
                                        href={item.path}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className={`relative px-3 py-2 flex items-center gap-1 text-sm font-semibold transition-all duration-300 overflow-hidden rounded-lg group hover:bg-gray-100/10 ${useSolidStyle ? 'text-gray-700 hover:text-blue-600' : 'text-white/90 hover:text-white'}`}
                                    >
                                        <span className="relative z-10">{item.name}</span>
                                        <ExternalLink size={12} className="opacity-50 group-hover:opacity-100 transition-opacity" />
                                        <span className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-600 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></span>
                                    </a>
                                ) : (
                                    <Link
                                        to={item.path}
                                        className={`relative px-3 py-2 flex items-center gap-1 text-sm font-semibold transition-all duration-300 rounded-lg group hover:bg-gray-100/10 ${isActive
                                            ? (useSolidStyle ? 'text-blue-600 bg-blue-50/50' : 'text-white bg-white/20')
                                            : (useSolidStyle ? 'text-gray-700 hover:text-blue-600' : 'text-white/90 hover:text-white')
                                            }`}
                                    >
                                        <span className="relative z-10">{item.name}</span>
                                        {item.dropdown && <ChevronDown size={14} className={`transition-transform duration-300 ${activeDropdown === item.name ? 'rotate-180' : 'group-hover/nav:rotate-180'}`} />}
                                        <span className={`absolute bottom-0 left-1/2 h-0.5 bg-blue-600 transform -translate-x-1/2 transition-all duration-300 ${isActive ? 'w-2/3' : 'w-0 group-hover:w-2/3'}`}></span>
                                    </Link>
                                )}

                                {/* Dropdown Menu */}
                                {item.dropdown && (
                                    <div className="absolute left-1/2 -translate-x-1/2 top-full pt-3 w-64 opacity-0 invisible group-hover/nav:opacity-100 group-hover/nav:visible transition-all duration-300 transform translate-y-4 group-hover/nav:translate-y-0">
                                        <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden py-2 backdrop-blur-xl">
                                            {item.dropdown.map((subItem) => (
                                                <Link
                                                    key={subItem.name}
                                                    to={subItem.path}
                                                    className="block px-6 py-2.5 text-sm font-medium text-gray-600 hover:bg-blue-50 hover:text-blue-700 transition-all duration-200 border-l-4 border-transparent hover:border-blue-600"
                                                >
                                                    {subItem.name}
                                                </Link>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        );
                    })}

                    <div className="h-6 w-px bg-gray-300/30 mx-2"></div>

                    {/* Search Button */}
                    <button
                        onClick={() => setIsSearchOpen(true)}
                        className={`ml-2 p-2.5 rounded-full transition-all duration-300 hover:scale-110 ${useSolidStyle ? 'text-gray-600 hover:bg-gray-100' : 'text-white hover:bg-white/20'}`}
                        aria-label="Search"
                    >
                        <Search size={20} />
                    </button>
                </div>

                {/* Mobile Menu Button */}
                <div className="lg:hidden flex items-center gap-3">
                    <button
                        onClick={() => setIsSearchOpen(true)}
                        className={`p-2 rounded-full transition-colors ${useSolidStyle ? 'text-gray-600 hover:bg-gray-100' : 'text-white hover:bg-white/10'}`}
                    >
                        <Search size={22} />
                    </button>
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className={`p-2 rounded-xl transition-colors ${useSolidStyle ? 'text-gray-700 hover:bg-gray-100' : 'text-white hover:bg-white/10'}`}
                    >
                        {isOpen ? <X size={28} /> : <Menu size={28} />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu Overlay */}
            {isOpen && createPortal(
                <div className="lg:hidden fixed inset-0 z-50 bg-gray-950/95 backdrop-blur-2xl animate-fade-in overflow-y-auto w-full h-full">
                    <div className="p-6 flex flex-col min-h-screen">
                        <div className="flex justify-between items-center mb-10 pb-6 border-b border-white/10">
                            <Link to="/" onClick={() => setIsOpen(false)}>
                                <img src="/logo.png" alt="Logo" className="h-10 w-auto brightness-0 invert" />
                            </Link>
                            <button onClick={() => setIsOpen(false)} className="p-2.5 text-white/70 hover:text-white bg-white/5 rounded-full transition-all">
                                <X size={24} />
                            </button>
                        </div>

                        <div className="flex flex-col gap-2">
                            {navItems.map((item) => (
                                <div key={item.name} className="relative">
                                    <div
                                        className={`flex justify-between items-center px-5 py-4 rounded-2xl transition-all duration-300 ${activeDropdown === item.name ? 'bg-blue-600 text-white shadow-xl shadow-blue-900/40' : 'text-white/80 hover:bg-white/5'}`}
                                        onClick={() => (item.dropdown) ? toggleDropdown(item.name) : setIsOpen(false)}
                                    >
                                        {item.isExternal ? (
                                            <a href={item.path} target="_blank" rel="noopener noreferrer" className="flex-grow font-bold text-base">
                                                {item.name}
                                            </a>
                                        ) : (
                                            <Link
                                                to={item.path}
                                                className="flex-grow font-bold text-base"
                                                onClick={(e) => {
                                                    if (item.dropdown) e.preventDefault();
                                                    else setIsOpen(false)
                                                }}
                                            >
                                                {item.name}
                                            </Link>
                                        )}

                                        {item.dropdown && (
                                            <div className={`transition-transform duration-500 ${activeDropdown === item.name ? 'rotate-180' : ''}`}>
                                                <ChevronDown size={20} />
                                            </div>
                                        )}
                                    </div>

                                    {/* Mobile Submenu */}
                                    <div className={`overflow-hidden transition-all duration-500 ease-in-out ${activeDropdown === item.name ? 'max-h-[600px] mt-2 mb-4' : 'max-h-0'}`}>
                                        <div className="grid grid-cols-1 gap-1 ml-4 pl-4 border-l-2 border-blue-500/50">
                                            {item.dropdown?.map((subItem) => (
                                                <Link
                                                    key={subItem.name}
                                                    to={subItem.path}
                                                    onClick={() => setIsOpen(false)}
                                                    className={`block px-5 py-3.5 text-sm rounded-xl transition-all duration-200 ${location.pathname === subItem.path ? 'bg-blue-600/20 text-blue-400 font-bold' : 'text-gray-400 hover:text-white hover:bg-white/10'}`}
                                                >
                                                    {subItem.name}
                                                </Link>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            ))}

                        </div>

                        {/* Search Button in Mobile Menu */}
                        <button
                            onClick={() => {
                                setIsOpen(false);
                                setIsSearchOpen(true);
                            }}
                            className="mt-4 flex items-center justify-center gap-3 w-full p-5 rounded-2xl bg-white/5 border border-white/10 text-white font-bold hover:bg-white/10 transition-all"
                        >
                            <Search size={20} />
                            <span>Quick Search</span>
                        </button>
                    </div>
                </div>,
                document.body
            )}

            {/* Search Overlay */}
            {isSearchOpen && createPortal(
                <div className="fixed inset-0 z-[100] flex items-start justify-center pt-24 px-6">
                    <div
                        className="absolute inset-0 bg-slate-900/60 backdrop-blur-md animate-fade-in"
                        onClick={() => setIsSearchOpen(false)}
                    ></div>
                    <div className="relative w-full max-w-lg animate-fade-in-up">
                        <div className="bg-white/95 backdrop-blur-2xl rounded-2xl shadow-[0_30px_80px_-20px_rgba(0,0,0,0.3)] overflow-hidden border border-white/50">
                            {/* Input Field */}
                            <div className="flex items-center px-5 py-4">
                                <Search className="text-blue-500 mr-3.5 opacity-70" size={20} />
                                <input
                                    autoFocus
                                    type="text"
                                    placeholder="Search..."
                                    className="flex-grow text-base focus:outline-none text-slate-800 placeholder-slate-400 font-semibold bg-transparent"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                                <button
                                    onClick={() => setIsSearchOpen(false)}
                                    className="p-1.5 hover:bg-slate-100/80 rounded-lg transition-all text-slate-400 group"
                                >
                                    <X size={16} className="group-hover:rotate-90 transition-transform duration-300" />
                                </button>
                            </div>

                            {/* Results Area */}
                            <div className="max-h-[45vh] overflow-y-auto px-2 pb-2">
                                {searchQuery.trim() === '' ? (
                                    <div className="px-3 py-3">
                                        <div className="flex items-center gap-3 mb-3 px-1">
                                            <span className="text-[8px] font-bold text-slate-400 uppercase tracking-[0.15em] whitespace-nowrap">Suggested</span>
                                            <div className="h-[1px] flex-grow bg-slate-100"></div>
                                        </div>
                                        <div className="grid grid-cols-2 gap-2">
                                            {['Registration', 'Dates', 'Speakers', 'Sponsors'].map(tag => (
                                                <button
                                                    key={tag}
                                                    onClick={() => setSearchQuery(tag)}
                                                    className="flex items-center gap-2 px-3.5 py-2.5 bg-slate-50/50 border border-slate-100 hover:border-blue-200 hover:bg-white hover:text-blue-700 rounded-lg text-[11px] font-bold transition-all group"
                                                >
                                                    <Search size={10} className="text-slate-400 group-hover:text-blue-500" />
                                                    {tag}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                ) : filteredResults.length > 0 ? (
                                    <div className="py-1">
                                        <div className="px-3 py-2 text-[8px] font-bold text-slate-400 uppercase tracking-wider">Results</div>
                                        <div className="space-y-1">
                                            {filteredResults.map((result, idx) => (
                                                <Link
                                                    key={idx}
                                                    to={result.path}
                                                    onClick={() => {
                                                        setIsSearchOpen(false);
                                                        setSearchQuery('');
                                                    }}
                                                    className="flex items-center justify-between p-2.5 hover:bg-blue-600 rounded-lg group transition-all duration-200"
                                                >
                                                    <div className="flex items-center gap-3">
                                                        <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center text-blue-600 shadow-sm group-hover:bg-white/20 group-hover:text-white transition-colors">
                                                            <FileText size={14} />
                                                        </div>
                                                        <div className="flex flex-col">
                                                            <span className="text-[13px] font-bold text-slate-700 group-hover:text-white transition-colors leading-none mb-1">{result.name}</span>
                                                            <span className="text-[9px] font-medium text-slate-400 group-hover:text-blue-100 transition-colors uppercase tracking-tight">{result.path}</span>
                                                        </div>
                                                    </div>
                                                    <ChevronRight size={12} className="text-slate-300 group-hover:text-white group-hover:translate-x-1 transition-all" />
                                                </Link>
                                            ))}
                                        </div>
                                    </div>
                                ) : (
                                    <div className="py-8 text-center">
                                        <p className="text-slate-500 text-xs font-medium">No results found</p>
                                    </div>
                                )}
                            </div>

                            {/* Footer / Shortcuts */}
                            <div className="px-5 py-3 flex justify-between items-center bg-slate-50/50 backdrop-blur-sm border-t border-slate-100">
                                <div className="flex gap-3">
                                    <div className="flex items-center gap-1.5 text-[8px] font-bold text-slate-400 uppercase tracking-tight">
                                        <kbd className="px-1.5 py-0.5 bg-white border border-slate-200 rounded-md text-slate-400 font-sans">ESC</kbd>
                                        <span>Close</span>
                                    </div>
                                    <div className="flex items-center gap-1.5 text-[8px] font-bold text-slate-400 uppercase tracking-tight">
                                        <kbd className="px-1.5 py-0.5 bg-white border border-slate-200 rounded-md text-slate-400 font-sans">↵</kbd>
                                        <span>Go</span>
                                    </div>
                                </div>
                                <span className="text-[8px] font-black text-blue-500/30 uppercase tracking-[0.2em]">COMS2</span>
                            </div>
                        </div>
                    </div>
                </div>,
                document.body
            )}
        </nav>
    );
};

export default Navbar;
