import http from 'node:http'
import {serveStatic} from './utils/serveStatic.js'
import {sendResponse} from './utils/sendResponse.js'
import {getGoldPrice} from './utils/getGoldPrice.js'

const PORT = 8000

const __dirname = import.meta.dirname

const server = http.createServer((req,res)=>{
    if (req.url === '/gold/live'){
        console.log('code from server.js')
        res.statusCode = 200
        res.setHeader('Content-Type', 'text/event-stream')
        res.setHeader('Cache-Control', 'no-cache')
        res.setHeader('Connection', 'keep-alive')

        setInterval(() => {
            const goldPrice = getGoldPrice()
            res.write(
                `data: ${JSON.stringify({price: goldPrice})}\n\n`
            )
        }, 5000);
        return

    }
    if (req.url === '/health' && req.method === 'GET'){
        sendResponse(res, 200, 'application/json', JSON.stringify({ok: true}))

    }else if (req.url.startsWith('/') && req.method === 'GET'){
        serveStatic(req, res, __dirname)

    }
})

server.listen(PORT,()=> console.log(`Listening on ${PORT}`))
