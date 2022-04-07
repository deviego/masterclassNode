const http = require('http')//requisição do modulo de HTTP 
const data = require('./urls.json')
const URL = require('url')


http.createServer((req, res) => { // estratégia de subir um server   
    const {name, url, del} = URL.parse(req.url, true).query
   //all resources 
   if(!name || !url)
        return res.end(JSON.stringify(data))

    
    if(del)
       data.urls = data.urls.filter(item => item.url !== url)

    return res.end('create')

}).listen(3000, () => console.log("API is runing")// callback informando que o servidor está rodando
)//estratégia de setar ouvindo o sevidor 