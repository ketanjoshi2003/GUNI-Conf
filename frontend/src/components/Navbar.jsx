import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Search, ChevronDown, ChevronRight, ExternalLink } from 'lucide-react';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [activeDropdown, setActiveDropdown] = useState(null);
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
        { name: 'Contact', path: '/contact' },
    ];

    useEffect(() => {
        const handleScroll = () => {
            // Wait until we are past the hero section (which is md:h-[700px])
            const threshold = isHome ? 700 : 20;
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
        <nav className={`fixed w-full z-50 transition-all duration-500 ${useSolidStyle ? 'bg-white/90 backdrop-blur-xl shadow-lg border-b border-gray-100 py-3' : 'bg-transparent py-5'}`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
                {/* Logo Section */}
                <Link to="/" className="relative group transition-transform duration-300 hover:scale-105 flex-shrink-0">
                    <img
                        src="/logo.png"
                        alt="Ganpat University Logo"
                        className={`h-12 w-auto transition-all duration-300 ${!useSolidStyle ? 'brightness-0 invert' : ''}`}
                    />
                </Link>

                {/* Desktop Navigation */}
                <div className="hidden lg:flex items-center gap-1 xl:gap-2 lg:ml-12">
                    {navItems.map((item) => (
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
                                    className={`relative px-3 py-2 flex items-center gap-1 text-sm font-semibold transition-all duration-300 rounded-lg group hover:bg-gray-100/10 ${useSolidStyle ? 'text-gray-700 hover:text-blue-600' : 'text-white/90 hover:text-white'}`}
                                >
                                    <span className="relative z-10">{item.name}</span>
                                    {item.dropdown && <ChevronDown size={14} className="transition-transform group-hover/nav:rotate-180" />}
                                    <span className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-blue-600 transform -translate-x-1/2 group-hover:w-2/3 transition-all duration-300"></span>
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
                    ))}

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
            {isOpen && (
                <div className="lg:hidden fixed inset-0 z-50 bg-gray-950/95 backdrop-blur-2xl animate-fade-in overflow-y-auto">
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
                </div>
            )}

            {/* Search Overlay */}
            {isSearchOpen && createPortal(
                <div className="fixed inset-0 z-[100] flex items-start justify-center pt-24 px-6 scale-in-center">
                    <div
                        className="absolute inset-0 bg-gray-950/80 backdrop-blur-md animate-fade-in"
                        onClick={() => setIsSearchOpen(false)}
                    ></div>
                    <div className="relative w-full max-w-2xl animate-fade-in-up">
                        <div className="bg-white rounded-3xl shadow-[0_32px_64px_-15px_rgba(0,0,0,0.3)] overflow-hidden border border-gray-100">
                            <div className="flex items-center p-6 border-b border-gray-100">
                                <Search className="text-blue-600 mr-4" size={28} />
                                <input
                                    autoFocus
                                    type="text"
                                    placeholder="What are you looking for?"
                                    className="flex-grow text-xl focus:outline-none text-gray-800 placeholder-gray-400 font-medium"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                                <button
                                    onClick={() => setIsSearchOpen(false)}
                                    className="p-2.5 hover:bg-gray-100 rounded-2xl transition-all text-gray-400 hover:text-gray-600"
                                >
                                    <X size={24} />
                                </button>
                            </div>

                            <div className="max-h-[60vh] overflow-y-auto p-3 bg-gray-50/50">
                                {searchQuery.trim() === '' ? (
                                    <div className="p-10 text-center">
                                        <div className="mb-6 text-gray-400 font-bold uppercase tracking-[0.2em] text-[10px]">Popular Searches</div>
                                        <div className="flex flex-wrap justify-center gap-3">
                                            {['Registration', 'Call for Papers', 'Important Dates', 'Speakers', 'Sponsors'].map(tag => (
                                                <button
                                                    key={tag}
                                                    onClick={() => setSearchQuery(tag)}
                                                    className="px-5 py-2.5 bg-white border border-gray-200 hover:border-blue-300 hover:bg-blue-50 hover:text-blue-700 rounded-2xl text-sm font-bold shadow-sm transition-all duration-200"
                                                >
                                                    {tag}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                ) : filteredResults.length > 0 ? (
                                    <div className="py-2 px-2">
                                        <div className="px-4 py-3 text-[10px] font-black text-blue-600 uppercase tracking-[0.2em]">Search Results</div>
                                        <div className="grid gap-2">
                                            {filteredResults.map((result, idx) => (
                                                <Link
                                                    key={idx}
                                                    to={result.path}
                                                    onClick={() => {
                                                        setIsSearchOpen(false);
                                                        setSearchQuery('');
                                                    }}
                                                    className="flex items-center justify-between px-5 py-4 bg-white hover:bg-blue-600 rounded-2xl group transition-all duration-300 shadow-sm hover:shadow-xl hover:shadow-blue-200"
                                                >
                                                    <div className="flex flex-col">
                                                        <span className="text-base font-bold text-gray-700 group-hover:text-white transition-colors">{result.name}</span>
                                                        <span className="text-[10px] uppercase font-bold text-gray-400 group-hover:text-blue-100 transition-colors">{result.path}</span>
                                                    </div>
                                                    <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center group-hover:bg-white/20 transition-colors">
                                                        <ChevronRight size={20} className="text-gray-400 group-hover:text-white group-hover:translate-x-1 transition-all" />
                                                    </div>
                                                </Link>
                                            ))}
                                        </div>
                                    </div>
                                ) : (
                                    <div className="p-16 text-center">
                                        <div className="text-gray-400 mb-4 font-medium italic">We couldn't find anything for "{searchQuery}"</div>
                                        <button
                                            onClick={() => setSearchQuery('')}
                                            className="px-6 py-2 bg-blue-600 text-white rounded-full text-sm font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-200"
                                        >
                                            Try searching something else
                                        </button>
                                    </div>
                                )}
                            </div>

                            <div className="bg-white px-6 py-4 flex justify-between items-center border-t border-gray-100">
                                <div className="flex gap-6">
                                    <div className="flex items-center gap-2 text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                                        <kbd className="px-2 py-1 bg-gray-100 border border-gray-200 rounded-md shadow-sm uppercase font-sans">ESC</kbd>
                                        <span>to close</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                                        <kbd className="px-2 py-1 bg-gray-100 border border-gray-200 rounded-md shadow-sm uppercase font-sans">Enter</kbd>
                                        <span>to select</span>
                                    </div>
                                </div>
                                <div className="text-[10px] text-blue-600 font-black italic tracking-widest uppercase">COMS2 2026</div>
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
