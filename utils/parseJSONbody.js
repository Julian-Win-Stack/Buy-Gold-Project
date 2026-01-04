export async function parseJSONbody(req) {
    try{
        let body = ''
    
        for await(const chunk of req){
            body += chunk
        }
        return JSON.parse(body)
    } catch(err){
        throw new Error(err)
    }
}