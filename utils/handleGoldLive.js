import {getGoldPrice} from './getGoldPrice.js'

export function handleGoldLive(req, res, goldPrice){
    res.statusCode = 200
    res.setHeader('Content-Type', 'text/event-stream')
    res.setHeader('Cache-Control', 'no-cache')
    res.setHeader('Connection', 'keep-alive')

    const interval = setInterval(() => {
        goldPrice = getGoldPrice()
        res.write(
            `data: ${JSON.stringify({price: goldPrice})}\n\n`
        )
    }, 10000);

    req.on('close', ()=>{
        clearInterval(interval)
    })
}