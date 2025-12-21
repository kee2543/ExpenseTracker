import React from 'react';
import { NavLink } from 'react-router-dom';

const Navigation = () => {
    return (
        <nav className="nav-bar">
            <NavLink to="/" className={({ isActive }) => isActive ? 'active' : ''}>
                <span>📊</span>
            </NavLink>
            <NavLink to="/reports" className={({ isActive }) => isActive ? 'active' : ''}>
                <span>📈</span>
            </NavLink>
            <NavLink to="/settings" className={({ isActive }) => isActive ? 'active' : ''}>
                <span>⚙️</span>
            </NavLink>
        </nav>
    );
};

export default Navigation;
