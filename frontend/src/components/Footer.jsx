import React from 'react';

const Footer = () => {
    return (
        <footer className="bg-primary text-gray-400 py-12">
            <div className="container mx-auto px-6 grid md:grid-cols-4 gap-8">
                <div>
                    <h2 className="text-2xl font-bold text-white mb-4">COMS2-2026</h2>
                    <p className="mb-4">International Conference on Computing Communication Security.</p>
                    <p className="mt-4">Ganpat University, Gujarat, India</p>
                </div>

                <div>
                    <h3 className="text-white font-bold mb-4">Quick Links</h3>
                    <ul className="space-y-2">
                        <li><a href="/" className="hover:text-accent transition-colors">Home</a></li>
                        <li><a href="/call-for-papers" className="hover:text-accent transition-colors">Call for Papers</a></li>
                        <li><a href="/authors" className="hover:text-accent transition-colors">For Authors</a></li>
                        <li><a href="https://link.springer.com/book/10.1007/978-3-031-75170-7" className="hover:text-accent transition-colors">Proceedings</a></li>
                    </ul>
                </div>

                <div>
                    <h3 className="text-white font-bold mb-4">Contact</h3>
                    <p className="mb-2">Ganpat University</p>
                    <p className="mb-2">Mehsana-Gozaria Highway</p>
                    <p>North Gujarat - 384012</p>
                </div>

                <div>
                    <h3 className="text-white font-bold mb-4">Legal</h3>
                    <ul className="space-y-2">
                        <li><a href="#" className="hover:text-accent transition-colors">Privacy Policy</a></li>
                        <li><a href="#" className="hover:text-accent transition-colors">Terms of Service</a></li>
                    </ul>
                </div>
            </div>
            <div className="border-t border-gray-800 mt-12 pt-8 text-center text-sm">
                &copy; 2026 COMS2. All rights reserved.
            </div>
        </footer>
    );
};

export default Footer;
