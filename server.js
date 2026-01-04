import http from 'node:http'
import {serveStatic} from './utils/serveStatic.js'
import {sendResponse} from './utils/sendResponse.js'
import {getGoldPrice} from './utils/getGoldPrice.js'
import {parseJSONbody} from './utils/parseJSONbody.js'
import {addPurchase} from './utils/addPurchase.js'
import {generateReceiptPdf} from './utils/generateReceiptPdf.js'
import {sendEmail} from './utils/sendEmail.js'

const PORT = 8000

const __dirname = import.meta.dirname
let goldPrice = getGoldPrice()
let id = ''

const server = http.createServer(async(req,res)=>{
    if (req.url === '/gold/live'){
        res.statusCode = 200
        res.setHeader('Content-Type', 'text/event-stream')
        res.setHeader('Cache-Control', 'no-cache')
        res.setHeader('Connection', 'keep-alive')

        setInterval(() => {
            goldPrice = getGoldPrice()
            res.write(
                `data: ${JSON.stringify({price: goldPrice})}\n\n`
            )
        }, 10000);
        return

    }
    if (req.url === '/health' && req.method === 'GET'){
        sendResponse(res, 200, 'application/json', JSON.stringify({ok: true}))

    }else if (req.url === '/purchase' && req.method === 'POST'){
        const parsedData = await parseJSONbody(req)
        const parsedDataInvestMoney = parsedData.investMoney
        const goldAmt = Number((parsedDataInvestMoney / goldPrice).toFixed(3))
        const timeStamp = new Date().toISOString()
        id = Date.now()
        addPurchase(id, timeStamp, parsedDataInvestMoney, goldPrice, goldAmt, __dirname)
        await generateReceiptPdf(id, timeStamp, parsedDataInvestMoney, goldPrice, goldAmt, __dirname)
        sendResponse(res, 200, 'text/html', `${timeStamp}, amount paid: £${parsedDataInvestMoney}, price per Oz: £${goldPrice}, gold sold: ${goldAmt} Oz`)

    } else if (req.url === '/sendemail' && req.method === 'POST'){
        const toEmail = await parseJSONbody(req)
        const attachmentPath = `./receipts/Receipt ${id}.pdf`
        await sendEmail(toEmail.email, attachmentPath)
        sendResponse(res, 200, 'text/html', `Email sent to ${JSON.stringify(toEmail)}`)


    }else if (req.url.startsWith('/') && req.method === 'GET'){
        serveStatic(req, res, __dirname)
    }

})

server.listen(PORT,()=> console.log(`Listening on ${PORT}`))
