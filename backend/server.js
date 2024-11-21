import express from 'express';
const app = express();
const port = 9092;

app.use(express.static('./frontend/public'));

app.get('*', (req, res) => {
    res.sendFile('index.html', { root: './frontend/public' });
});

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
