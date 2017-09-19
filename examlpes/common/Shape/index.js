import React from 'react';
import { number, string } from 'prop-types';

import './shape.css';

Shape.propTypes = {
    size: number,
    x: number,
    y: number,
    duration: number,
    colour: string,
    className: string
};

export default function Shape({ size, colour, className, x, y, duration }) {
    const styles = {
        width: size,
        height: size,
        backgroundColor: colour,
        transform: `translate3d(${x}px, ${y}px, ${Math.random(1000)}px)`,
        // transform: `translate3d(${x}px, ${y}px, ${Math.random(1000)}px)`,
        animationDelay: `${-duration * 2}ms`
    };

    return (
        <div className={`shape ${className}`} style={styles} />
    );
}
