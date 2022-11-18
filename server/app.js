const express = require('express');
const fileUpload = require('express-fileupload');
const cors=require("cors");

// 
const jsonServer = require("json-server");
const server = jsonServer.create();
const router = jsonServer.router("./db.json");
const middlewares = jsonServer.defaults({
  static: "./build",
});

server.use(middlewares);
server.use(router);
// 

const app = express();

const corsOptions ={
   origin:'*', 
   credentials:true,            //access-control-allow-credentials:true
   optionSuccessStatus:200,
}

app.use(cors(corsOptions))

app.use(
    fileUpload({
        createParentPath: true,
    })
);

app.use(express.static(__dirname + "/public"));

app.post('/upload-img', (req, res) => {
    if (!req.files) {
        return res.status(400).json({ message: 'Нет загруженных изображений' });
    }

    const file = req.files.file;

    if (!file) return res.json({ message: 'Неправильное название имени файла' });

    const newFileName = encodeURI(Date.now() + '-' + file.name);

    file.mv(`${__dirname}/public/${newFileName}`, (err) => {
        if (err) {
            console.log(err);
            return res.status(500).send(err);
        }

        console.log('Файл успешно загружен');

        res.json({
            fileName: file.name,
            filePath: `/${newFileName}`,
        });
    });
});

app.listen(5000, function () {
    console.log('Сервер ожидает подключения...');
});
