import compress from 'compression';
import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import path from 'path';

import services from './services';

const app = express();

app.use(compress());
app.use(cors());

const root = path.join(__dirname, '../../');
app.use('/', express.static(path.join(root, 'dist/client')));
app.use('/uploads', express.static(path.join(root, 'uploads')));
app.get('/', (req, res) => {
    res.sendFile(path.join(root, '/dist/client/index.html'));
});

app.use(helmet());
app.use(helmet.contentSecurityPolicy({
    directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'", "'unsafe-inline'"],
        styleSrc: ["'self'", "'unsafe-inline'"],
        // imgSrc: ["'self'", "data:", "*.amazonaws.com"] // I will not use AWS.
    }
}));
app.use(helmet.referrerPolicy({ policy: 'same-origin' }));

const serviceNames = Object.keys(services);
for (let i = 0; i < serviceNames.length; i += 1) {
    const name = serviceNames[i];
    if (name === 'graphql') {
        (async () => {
            await services[name].start();
            services[name].applyMiddleware({ app });
        })();
    } else {
        app.use('/${name}', services[name]);
    }
}

app.listen(8000, () => console.log('Listening on port 8000!'));