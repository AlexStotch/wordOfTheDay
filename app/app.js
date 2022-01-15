import express from 'express';
import path from 'path';

const app = express();
const router = express.Router();
// eslint-disable-next-line no-underscore-dangle
const dirname = `${path.resolve()}/app`;
console.log(dirname);

router.get('/', (req, res) => {
  res.sendFile(path.join(`${dirname}/index.html`));
// __dirname : It will resolve to your project folder.
});

// add the router
app.use('/', router);
app.listen(3001);

console.log('Running at Port 3001');
