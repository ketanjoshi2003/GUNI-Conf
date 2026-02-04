import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const location = useLocation();

    // Check if we are on the home page
    const isHome = location.pathname === '/';

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Determine nav style based on scroll state AND page location
    // If not home, we always want the "scrolled" style (solid background, dark text) to ensure visibility
    const useSolidStyle = scrolled || !isHome;

    return (
        <nav className={`fixed w-full z-50 transition-all duration-300 ${useSolidStyle ? 'bg-white/80 backdrop-blur-md shadow-md py-4' : 'bg-transparent py-6'}`}>
            <div className="container mx-auto px-6 flex justify-between items-center">
                <div className="flex items-center gap-4">
                    <img src="/logo.png" alt="Ganpat University Logo" className="h-12 w-auto" />
                    <Link to="/" className={`text-2xl font-bold tracking-tighter ${useSolidStyle ? 'text-primary' : 'text-white'}`}>
                        COMS2<span className="text-accent">-2026</span>
                    </Link>
                </div>

                {/* Desktop Menu */}
                <div className="hidden md:flex space-x-6 items-center">
                    {['Home', 'About', 'Call for Papers', 'Authors', 'Contact'].map((item) => (
                        <Link
                            key={item}
                            to={`/${item === 'Home' ? '' : item.toLowerCase().replace(/ /g, '-')}`}
                            className={`relative font-medium px-2 py-1 bg-gradient-to-r from-blue-800 to-blue-800 bg-[length:0%_100%] bg-no-repeat bg-left hover:bg-[length:100%_100%] transition-[background-size] duration-300 hover:text-white ${useSolidStyle ? 'text-gray-700' : 'text-white/90'}`}
                        >
                            {item}
                        </Link>
                    ))}
                    <a
                        href="https://link.springer.com/book/10.1007/978-3-031-75170-7"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-accent text-white px-6 py-2 rounded-full font-medium hover:bg-blue-600 transition-transform active:scale-95 shadow-lg shadow-blue-500/30"
                    >
                        Proceedings
                    </a>
                    <Link
                        to={localStorage.getItem('userInfo') ?
                            (JSON.parse(localStorage.getItem('userInfo')).role === 'admin' ? '/admin' : '/dashboard')
                            : '/login'}
                        className={`font-semibold transition-colors ${useSolidStyle ? 'text-accent' : 'text-white'} hover:underline`}
                    >
                        {localStorage.getItem('userInfo') ? 'Dashboard' : 'Login'}
                    </Link>
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
                <div className="md:hidden bg-white absolute top-full left-0 w-full shadow-lg py-4 px-6 flex flex-col space-y-4">
                    {['Home', 'About', 'Call for Papers', 'Authors', 'Contact'].map((item) => (
                        <Link
                            key={item}
                            to={`/${item === 'Home' ? '' : item.toLowerCase().replace(/ /g, '-')}`}
                            onClick={() => setIsOpen(false)}
                            className="text-gray-700 font-medium py-2"
                        >
                            {item}
                        </Link>
                    ))}
                </div>
            )}
        </nav>
    );
};

export default Navbar;
