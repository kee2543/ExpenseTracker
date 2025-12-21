import React from 'react';
import { NavLink } from 'react-router-dom';

const Navigation = () => {
    return (
        <nav className="nav-bar">
            <NavLink to="/" className={({ isActive }) => isActive ? 'active' : ''}>
                <span style={{ fontSize: '20px' }}>📊</span>
                <span>Dashboard</span>
            </NavLink>
            <NavLink to="/reports" className={({ isActive }) => isActive ? 'active' : ''}>
                <span style={{ fontSize: '20px' }}>📈</span>
                <span>Reports</span>
            </NavLink>
            <NavLink to="/settings" className={({ isActive }) => isActive ? 'active' : ''}>
                <span style={{ fontSize: '20px' }}>⚙️</span>
                <span>Settings</span>
            </NavLink>
        </nav>
    );
};

export default Navigation;
