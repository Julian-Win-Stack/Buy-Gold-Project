import fs from 'node:fs/promises'
import path from 'node:path'
import fsPromises from 'node:fs/promises'

export async function addPurchase(id, timeStamp, parsedDataInvestMoney, goldPrice, goldAmt, basedir){
    try{
        const filePath = path.join(basedir, 'purchaseData', 'purchaseData.txt')
    
        const content = `ID: ${id}, Timestamp: ${timeStamp}, amount paid: £${parsedDataInvestMoney}, price per Oz: £${goldPrice}, gold sold: ${goldAmt} Oz\n`
        await fsPromises.mkdir(path.dirname(filePath), {recursive: true })
        await fs.appendFile(filePath, content, 'utf8')
    } catch(err){
        throw new Error(err)
    }
    
}