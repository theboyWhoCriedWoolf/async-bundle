import React from 'react';
import { arrayOf, string, shape } from 'prop-types';

import Shape from '../Shape';
import './shapes.css';

Shapes.propTypes = {
    shapes: arrayOf(shape({})),
    type: string
};


function Shapes({ shapes = [], type }) {
    const comps = shapes.map(el => (
        <Shape
            key={`shape-${el.id}`}
            className={type}
            size={el.size}
            colour={el.colour}
            duration={Math.random() * 2000}
            x={(Math.random() - 0.3) * window.innerWidth}
            y={Math.random() * (window.innerHeight)}
        />
    ));
    return (
        <div className="shapes__wrapper">
            {comps}
        </div>
    );
}


export default Shapes;
