const http = require('http')//requisição do modulo de HTTP 
const fs = require('fs')
const data = require('./urls.json')
const URL = require('url')
const path = require('path')

function writeFile(cb) {
    fs.writeFile(path.join(__dirname, "urls.json"), JSON.stringify(data, null, 2),
        err => {
            if (err) throw err

            cb(JSON.stringify({ message: "OK" }))
        }

    )
}

http.createServer((req, res) => { // estratégia de subir um server   
    const { name, url, del } = URL.parse(req.url, true).query

    res.writeHead(200, {
        'Access-Control-Allow-Origin': '*'
    })
    //all resources 
    if (!name || !url)
        return res.end(JSON.stringify(data))


    if (del) {// estratégia para deletar o conteúdo
        data.urls = data.urls.filter(item => String(item.url) !== String(url))
        return writeFile((message) =>
            res.end(message))
    }

    data.urls.push({name, url})
    return writeFile((message) => res.end(message))

}).listen(3000, () => console.log("API is runing")// callback informando que o servidor está rodando
)//estratégia de setar ouvindo o sevidor 