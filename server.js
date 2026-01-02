import http from 'node:http'
import {serveStatic} from './utils/serveStatic.js'
import {sendResponse} from './utils/sendResponse.js'

const PORT = 8000

const __dirname = import.meta.dirname

const server = http.createServer((req,res)=>{
    if (req.url === '/health' && req.method === 'GET'){
        sendResponse(res, 200, 'application/json', JSON.stringify({ok: true}))

    }else if (req.url.startsWith('/') && req.method === 'GET'){
        serveStatic(req, res, __dirname)
    }
})

server.listen(PORT,()=> console.log(`Listening on ${PORT}`))
