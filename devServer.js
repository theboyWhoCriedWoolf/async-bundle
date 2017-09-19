import path from 'path';
import webpack from 'webpack';
import Express from 'express';
import webpackDevMiddleware from 'webpack-dev-middleware';

import config from './webpack.config';

const app = new Express();
const port = 9000;

app.use(Express.static('test'));

const compiler = webpack(config);
app.use(webpackDevMiddleware(compiler, {
    noInfo: false,
    publicPath: config.output.publicPath
}));

const getShapes = () => {
    const colours = ['#C4B492', '#917A5B', '#D0B383', '#624B41', '#E2C87C', '#715B55', '#6D635A'];
    const response = [];
    for (let i = 0; i < 100; i += 1) {
        response[response.length] = {
            colour: colours[i % colours.length],
            size: Math.random() * 100,
            id: i
        };
    }
    return response;
};

/**
 * Routes
 */
app.get('/api/shapes', (req, res) => {
    res.status(200).json(getShapes());
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'examlpes', 'index.html'));
});

app.listen(port, (error) => {
    /* eslint-disable no-console */
    if (error) {
        console.error(error);
    } else {
        console.info(
            '🌎 Listening on port %s. Open up http://localhost:%s/ in your browser.',
            port,
            port
        );
    }
    /* eslint-enable no-console */
});
