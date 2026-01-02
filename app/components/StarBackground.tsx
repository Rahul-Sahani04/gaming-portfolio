import React from 'react';
import './StarBackground.css';

const StarBackground = () => {
    return (
        <div className="fixed inset-0 z-[-1] overflow-hidden bg-transparent">
            <div id="stars" />
            <div id="stars2" />
            <div id="stars3" />
        </div>
    );
};

export default StarBackground;
