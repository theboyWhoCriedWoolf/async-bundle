import React, { Component } from 'react';
import { func, arrayOf, string, shape } from 'prop-types';

import Shapes from '../../common/Shapes';
import './squares.css';

export default class HomePage extends Component {
    static propTypes = {
        fetchPageData: func,
        title: string,
        shapes: arrayOf(shape({}))
    };

    componentDidMount() {
        // make api call
        this.props.fetchPageData();
    }

    render() {
        const { title, shapes = [] } = this.props;
        return (
            <div className="squares">
                <h1>{title}</h1>
                <Shapes shapes={shapes} type="square" />
            </div>
        );
    }
}
