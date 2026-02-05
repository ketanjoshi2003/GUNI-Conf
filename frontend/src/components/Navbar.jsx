import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Search, ChevronDown, ChevronRight } from 'lucide-react';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [activeDropdown, setActiveDropdown] = useState(null); // For mobile accordion
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
                { name: 'Previous Speakers', path: '/archive?tab=previous-speakers' },
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

                    <Link
                        to={localStorage.getItem('userInfo') ?
                            (JSON.parse(localStorage.getItem('userInfo')).role === 'admin' ? '/admin' : '/dashboard')
                            : '/login'}
                        className={`font-semibold ml-4 transition-colors ${useSolidStyle ? 'text-accent' : 'text-white'} hover:underline`}
                    >
                        {localStorage.getItem('userInfo') ? 'Dashboard' : 'Login'}
                    </Link>
                    <button className={`p-2 rounded-full transition-colors ${useSolidStyle ? 'text-gray-600 hover:bg-gray-100' : 'text-white hover:bg-white/10'}`}>
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
                        <Link
                            to="/login"
                            onClick={() => setIsOpen(false)}
                            className="px-6 py-4 font-medium text-sm tracking-wider uppercase border-b border-gray-800 hover:bg-gray-800 transition-colors"
                        >
                            Login / Dashboard
                        </Link>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
