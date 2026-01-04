import nodemailer from 'nodemailer'
import 'dotenv/config'

export async function sendEmail(toEmail, attachmentPath) {
    try{
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        })
    
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: toEmail,
            subject: 'Gold Purchase Receipt',
            html: '<b>The attached file is the receipt for your recent gold purchase</b>'
        }
    
        if (attachmentPath){
            mailOptions.attachments = [
                {
                    path: attachmentPath
                }
            ]
        }
        
        await transporter.sendMail(mailOptions)
    } catch(err){
        throw new Error(err)
    }

    
}