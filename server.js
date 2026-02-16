import express from 'express';
import path from 'node:path';

import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();

app.use('/', express.static(path.join(__dirname, 'dist'), { index: false }));

app.get(/.*/, (req, res) => {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'), err => {
        if (err) {
            console.error(err, 'Ошибка при отдаче HTML');
            res.status(500).send('Internal Server Error: HTML file not found');
        }
    });
})

app.listen(80)