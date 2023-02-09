const bodyParser = require('body-parser');
const express = require('express');
const cors = require('cors');
const multipart = require('connect-multiparty')

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

const corsOptions = {
    origin: '*',
    optionsSucessStatus: 200
}
app.use(cors(corsOptions));

const multipartMiddleware = multipart({uploadDir: './media'})
app.post('./upload', multipartMiddleware, (req, res) =>{
    const files = req.files;
    console.log(files);
    res.json({message: files});
});

app.use((err, req, res, next) => res.json({error: err.message}));

app.listen(8000, () => {
    console.log('Servidor porta 8000')
});

app.get('/downloadPdf', (req, res) =>{
    res.download('./media/Curriculo.pdf');
});