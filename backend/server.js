import express from 'express';
import {products} from './data/data.js'
import path from "path";
import dotenv from 'dotenv';
dotenv.config({ path: "backend/.env" });

const app = express();
const port = process.env.PORT || 8000;
const router = express.Router();

app.use(express.json());
app.use('/api/products', router);
const __dirname = path.resolve()

if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, '/frontend/dist')))
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, '/frontend/dist/index.html'))
    })
}

router.get('/', (req, res) => {
    res.status(200).json({success: true, data: products});
})

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
})

