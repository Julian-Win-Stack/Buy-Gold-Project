import fs from 'node:fs'    
import fsPromises from 'node:fs/promises'         
import path from 'node:path'
import PDFDocument from 'pdfkit'

export async function generateReceiptPdf(id, timeStamp, parsedDataInvestMoney, goldPrice, goldAmt, __dirname){
    try{
        const fileName = `Receipt ${id}.pdf`
    
        const filePath = path.join(__dirname, 'receipts', fileName)
    
        await fsPromises.mkdir(path.dirname(filePath), { recursive: true })
        
        const doc = new PDFDocument()
        doc.pipe(fs.createWriteStream(filePath))
    
    
        doc.fontSize(20).text(`GoldDigger Receipt`, {align: 'center'})
        doc.moveDown()
    
        doc.fontSize(12).text(`ID: ${id}`)
        doc.moveDown()
    
        doc.fontSize(12).text(`TimeStamp: ${timeStamp}`)
        doc.moveDown()
    
        doc.text(`Amount paid: ${parsedDataInvestMoney}`)
        doc.text(`Price per Oz: ${goldPrice}`)
        doc.text(`Amount of gold bought: ${goldAmt}`)
    
        doc.end()
    } catch(err){
        throw new Error(err)
    }

}