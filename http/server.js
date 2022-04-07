const http = require('http')//requisição do modulo de HTTP 
const fs = require('fs')// modulo de file
const path = require('path')//modulo de path 


http.createServer((req, res) => { // estratégia de subir um server

    const file = req.url === '/' ? "index.html" : req.url
    console.log(file)

    const filePath = path.join(__dirname, 'public', file)

    const allowedFileTypes = ['.html', '.css', '.js']

    const extname = path.extname(filePath)
    const alowed = allowedFileTypes.find(item => item === extname)

    if(!alowed) return 

    fs.readFile(filePath,
            (err, content) => {//estratégia de verificar um erro 
                if(err) throw err;
                return res.end(content)
            }
        )


}).listen(5000, () => console.log("Server is runing")// callback informando que o servidor está rodando
)//estratégia de setar ouvindo o sevidor 