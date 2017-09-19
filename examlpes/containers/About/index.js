import React from 'react';
import { string } from 'prop-types';

import './about.css';

AboutPage.propTypes = {
    littleMessage: string
};

export default function AboutPage({ littleMessage }) {
    return (
        <div className="about">
            <h2>About Page</h2>
            <p>{littleMessage}</p>
        </div>
    );
}
