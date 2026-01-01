import path from 'node:path'
import fs from 'node:fs/promises'
import {sendResponse} from './sendResponse.js'
import { getContentType } from './getContentType.js'

export async function serveStatic(req, res, baseDir){
    try {
        const publicDir = path.join(baseDir, 'public')
        const filePath = path.join(publicDir, 
            req.url === '/' ? 'index.html' : req.url
        )
    
        const content = await fs.readFile(filePath)
    
        const exe = path.extname(filePath)
    
        const contentType = getContentType(exe)
    
        sendResponse(res, 200, contentType, content)
    } catch (err){
        sendResponse(res, 404, 'text/html', '404.html')
    }

}