import fs from 'node:fs/promises'
import path from 'node:path'

export async function addPurchase(timeStamp, parsedDataInvestMoney, goldPrice, goldAmt, basedir){
    const filePath = path.join(basedir, 'purchaseData', 'purchaseData.txt')

    const content = `${timeStamp}, amount paid: £${parsedDataInvestMoney}, price per Oz: £${goldPrice}, gold sold: ${goldAmt} Oz\n`

    await fs.appendFile(filePath, content, 'utf8')
    
}