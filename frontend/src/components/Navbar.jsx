import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Search, ChevronDown, ChevronRight } from 'lucide-react';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [activeDropdown, setActiveDropdown] = useState(null); // For mobile accordion
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const location = useLocation();

    // Check if we are on the home page
    const isHome = location.pathname === '/';

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
                { name: 'Organizing Committee', path: '/committees?tab=organizing' }
            ]
        },
        {
            name: 'Speakers',
            path: '/speakers',
            dropdown: [
                { name: 'Speakers - 2025', path: '/speakers?year=2025' },
                { name: 'Speakers - 2024', path: '/speakers?year=2024' },
                { name: 'Speakers - 2023', path: '/speakers?year=2023' },
                { name: 'Speakers - 2022', path: '/speakers?year=2022' },
                { name: 'Speakers - 2021', path: '/speakers?year=2021' },
                { name: 'Speakers - 2020', path: '/speakers?year=2020' }
            ]
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
        { name: 'Contact', path: '/contact' }
    ];

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 650);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

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
        <nav className={`fixed w-full z-50 transition-all duration-300 ${useSolidStyle ? 'bg-white/80 backdrop-blur-md shadow-md py-4' : 'bg-transparent py-6'}`}>
            <div className="container mx-auto px-6 flex justify-between items-center">
                <Link to="/" className="flex items-center">
                    <img src="/logo.png" alt="Ganpat University Logo" className="h-12 w-auto" />
                </Link>

                {/* Desktop Menu */}
                <div className="hidden md:flex space-x-1 items-center">
                    {navItems.map((item) => (
                        <div key={item.name} className="relative group">
                            {item.isExternal ? (
                                <a
                                    href={item.path}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={`font-medium px-3 py-2 flex items-center gap-1 transition-colors hover:text-blue-600 ${useSolidStyle ? 'text-gray-700' : 'text-white/90'}`}
                                >
                                    {item.name}
                                </a>
                            ) : (
                                <Link
                                    to={item.path}
                                    className={`font-medium px-3 py-2 flex items-center gap-1 transition-colors hover:text-blue-600 ${useSolidStyle ? 'text-gray-700' : 'text-white/90'}`}
                                >
                                    {item.name}
                                    {(item.dropdown || item.hasSub) && <ChevronDown size={14} />}
                                </Link>
                            )}

                            {/* Desktop Dropdown */}
                            {item.dropdown && (
                                <div className="absolute left-0 top-full pt-2 w-56 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                                    <div className="bg-white rounded-lg shadow-xl border border-gray-100 overflow-hidden py-1">
                                        {item.dropdown.map((subItem) => (
                                            <Link
                                                key={subItem.name}
                                                to={subItem.path}
                                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                                            >
                                                {subItem.name}
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}



                    <button
                        onClick={() => setIsSearchOpen(true)}
                        className={`p-2 rounded-full transition-colors ${useSolidStyle ? 'text-gray-600 hover:bg-gray-100' : 'text-white hover:bg-white/10'}`}
                    >
                        <Search size={20} />
                    </button>
                </div>

                {/* Mobile Menu Button */}
                <div className="md:hidden">
                    <button onClick={() => setIsOpen(!isOpen)} className={useSolidStyle ? 'text-gray-700' : 'text-white'}>
                        {isOpen ? <X size={28} /> : <Menu size={28} />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="md:hidden bg-gray-900 absolute top-full left-0 w-full shadow-lg h-screen overflow-y-auto pb-20">
                    <div className="flex flex-col text-white">
                        {navItems.map((item) => (
                            <div key={item.name} className="border-b border-gray-800">
                                <div
                                    className="flex justify-between items-center px-6 py-4 cursor-pointer hover:bg-gray-800 transition-colors"
                                    onClick={() => (item.dropdown || item.hasSub) ? toggleDropdown(item.name) : setIsOpen(false)}
                                >
                                    {item.isExternal ? (
                                        <a href={item.path} target="_blank" rel="noopener noreferrer" className="flex-grow font-medium text-sm tracking-wider uppercase">
                                            {item.name}
                                        </a>
                                    ) : (
                                        <Link
                                            to={item.path}
                                            className="flex-grow font-medium text-sm tracking-wider uppercase"
                                            onClick={(e) => {
                                                if (item.dropdown || item.hasSub) e.preventDefault(); // Prevent navigation if it has submenu, let parent div handle toggle
                                                else setIsOpen(false)
                                            }}
                                        >
                                            {item.name}
                                        </Link>
                                    )}

                                    {(item.dropdown || item.hasSub) && (
                                        <div className={`transition-transform duration-300 ${activeDropdown === item.name ? 'rotate-180' : ''}`}>
                                            {activeDropdown === item.name ? <ChevronDown size={16} className="text-blue-400" /> : <ChevronRight size={16} className="text-gray-500" />}
                                        </div>
                                    )}
                                </div>

                                {/* Mobile Submenu */}
                                {item.dropdown && activeDropdown === item.name && (
                                    <div className="bg-gray-800/50">
                                        {item.dropdown.map((subItem) => (
                                            <Link
                                                key={subItem.name}
                                                to={subItem.path}
                                                onClick={() => setIsOpen(false)}
                                                className={`block px-8 py-3 text-sm border-l-2 border-transparent hover:border-blue-500 hover:bg-white/5 transition-colors ${location.pathname === subItem.path ? 'text-blue-400 border-blue-400 bg-white/5' : 'text-gray-400'}`}
                                            >
                                                {subItem.name}
                                            </Link>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            )}
            {/* Search Overlay */}
            {isSearchOpen && (
                <div className="fixed inset-0 z-[60] flex items-start justify-center pt-24 px-6">
                    <div
                        className="absolute inset-0 bg-gray-900/60 backdrop-blur-sm"
                        onClick={() => setIsSearchOpen(false)}
                    ></div>
                    <div className="relative w-full max-w-2xl animate-fade-in-up">
                        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-100">
                            <div className="flex items-center p-4 border-b">
                                <Search className="text-gray-400 mr-3" size={24} />
                                <input
                                    autoFocus
                                    type="text"
                                    placeholder="Search for topics, authors, sessions..."
                                    className="flex-grow text-lg focus:outline-none text-gray-800"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                                <button
                                    onClick={() => setIsSearchOpen(false)}
                                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors text-gray-500"
                                >
                                    <X size={20} />
                                </button>
                            </div>

                            <div className="max-h-[400px] overflow-y-auto p-2">
                                {searchQuery.trim() === '' ? (
                                    <div className="p-8 text-center text-gray-500">
                                        <div className="mb-2 font-medium">Quick Links</div>
                                        <div className="flex flex-wrap justify-center gap-2">
                                            {['Registration', 'Call for Papers', 'Important Dates', 'Speakers'].map(tag => (
                                                <button
                                                    key={tag}
                                                    onClick={() => setSearchQuery(tag)}
                                                    className="px-3 py-1 bg-gray-100 hover:bg-blue-50 hover:text-blue-600 rounded-full text-xs font-semibold transition-colors"
                                                >
                                                    {tag}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                ) : filteredResults.length > 0 ? (
                                    <div className="py-2">
                                        <div className="px-4 py-2 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Search Results</div>
                                        {filteredResults.map((result, idx) => (
                                            <Link
                                                key={idx}
                                                to={result.path}
                                                onClick={() => {
                                                    setIsSearchOpen(false);
                                                    setSearchQuery('');
                                                }}
                                                className="flex items-center justify-between px-4 py-3 hover:bg-blue-50 rounded-xl group transition-all"
                                            >
                                                <div className="flex flex-col">
                                                    <span className="text-sm font-bold text-gray-700 group-hover:text-blue-600 transition-colors">{result.name}</span>
                                                    <span className="text-[10px] text-gray-400 group-hover:text-blue-400">{result.path}</span>
                                                </div>
                                                <ChevronRight size={16} className="text-gray-300 group-hover:text-blue-400 group-hover:translate-x-1 transition-all" />
                                            </Link>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="p-12 text-center">
                                        <div className="text-gray-400 mb-2 italic">No results found for "{searchQuery}"</div>
                                        <button
                                            onClick={() => setSearchQuery('')}
                                            className="text-blue-600 text-sm font-semibold hover:underline"
                                        >
                                            Clear search
                                        </button>
                                    </div>
                                )}
                            </div>

                            <div className="bg-gray-50 px-4 py-3 flex justify-between items-center border-t border-gray-100">
                                <div className="flex gap-4">
                                    <div className="flex items-center gap-1.5 text-[10px] text-gray-500">
                                        <span className="px-1.5 py-0.5 bg-white border border-gray-200 rounded shadow-sm">ESC</span> Close
                                    </div>
                                    <div className="flex items-center gap-1.5 text-[10px] text-gray-500">
                                        <span className="px-1.5 py-0.5 bg-white border border-gray-200 rounded shadow-sm">↵</span> Select
                                    </div>
                                </div>
                                <div className="text-[10px] text-gray-400 font-medium italic">COMS2 2026 Archive Search</div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
