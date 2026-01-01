import http from 'node:http'

const PORT = 8000

const server = http.createServer((req,res)=>{
    
    res.end('Server running')
})

server.listen(PORT,()=> console.log(`Listening on ${PORT}`))
