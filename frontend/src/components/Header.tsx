import React from 'react';

interface HeaderProps {
    activePage: string;
    setActivePage: (page: string) => void;
}
const Header: React.FC<HeaderProps> = ({ activePage, setActivePage }) => (
    <header className="bg-gray-800 text-white shadow-md">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
            <h1 className="text-2xl font-bold">Sports Simulation</h1>
            <nav>
                <ul className="flex space-x-6">
                    {['Home', 'Games', 'Venues', 'Simulations', 'Histogram'].map(page => (
                        <li key={page}>
                            <button
                                onClick={() => setActivePage(page)}
                                className={`pb-1 transition-colors duration-300 ${activePage.startsWith(page) ? 'text-cyan-400 border-b-2 border-cyan-400' : 'text-gray-300 hover:text-white'}`}
                            >
                                {page}
                            </button>
                        </li>
                    ))}
                </ul>
            </nav>
        </div>
    </header>
);

export default Header;