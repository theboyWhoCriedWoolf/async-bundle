import React, { Component } from 'react';
import { func, arrayOf, string, shape } from 'prop-types';

import Shapes from '../../common/Shapes';
import './circles.css';

export default class CirclesView extends Component {
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
            <div className="circles">
                <h1>{title}</h1>
                <Shapes shapes={shapes} type="circle" />
            </div>
        );
    }
}
