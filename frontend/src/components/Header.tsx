import React from 'react';
import { NavLink } from 'react-router-dom';

const Header: React.FC = () => {
    const navItems = [
        { name: 'Home', path: '/' },
        { name: 'Games', path: '/games' },
        { name: 'Venues', path: '/venues' },
        { name: 'Simulations', path: '/simulations' },
        { name: 'Histogram', path: '/histogram' },
    ];

    return (
        <header className="bg-gray-800 text-white shadow-md">
            <div className="container mx-auto px-4 py-4 flex justify-between items-center">
                <h1 className="text-2xl font-bold">Sports Simulation</h1>
                <nav>
                    <ul className="flex space-x-6">
                        {navItems.map(item => (
                            <li key={item.name}>
                                <NavLink
                                    to={item.path}
                                    className={({ isActive }) =>
                                        `pb-1 transition-colors duration-300 ${
                                            isActive ? 'text-cyan-400 border-b-2 border-cyan-400' : 'text-gray-300 hover:text-white'
                                        }`
                                    }
                                >
                                    {item.name}
                                </NavLink>
                            </li>
                        ))}
                    </ul>
                </nav>
            </div>
        </header>
    );
};

export default Header;