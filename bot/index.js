const logger = require('morgan')
const http = require('http')
const bodyParser = require('body-parser')
const express = require('express')
const request = require('request')
const { default: axios } = require('axios')
const mongo = require('mongoose')
const fs = require('fs')
require('dotenv').config()


const commandsList = new Map
const app = express()
const uploadAttachments = require('./uploadAttachments.js')


// Create Server
app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.listen(process.env.PORT || 3000)

app.get('/', (req, res) => {
    res.send("Hello World")
})

app.get('/webhook', function(req, res) {
    if (req.query['hub.verify_token'] === process.env.VERIFY) {
        console.log('Webhook verified!')
        res.status(200).send(req.query['hub.challenge'])
    } else {
        console.log('Verification failed!')
        res.sendStatus(403)
    }  
})

//Add Commands
const addCommand = () => {
    fs.readdir(`./commands`, (error, files) => {
        if(error) {
            console.error(error.message)
        }

        const jsfile = files.filter(file => file.split('.').pop() === 'js')

        if(jsfile.length === 0) {
            console.error('Chua lenh nao duoc add!')
        }

        jsfile.forEach((file) => {
            const module = require(`./commands/${file}`)
            commandsList.set(module.name,module)
        })
    })
}

addCommand()

// Connect
const connectDB = async () => {
    try {
        await mongo.connect(`mongodb+srv://rsbot:${process.env.PASSDB}@cluster0.kfvei.mongodb.net/members?retryWrites=true&w=majority`,
        {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        console.log('DB Connected Successfully!')
    } catch (err) {
        if(err) {
            console.log(err.message)
            process.exit(1)
        }
    }
}

connectDB()


//Send Message

const sendMessage = async (psid, content) => {
    await axios.post('https://graph.facebook.com/v2.6/me/messages',{
        recipient: {id: psid},
        message: {text: content},
    },{
        params: {
            access_token: process.env.TOKEN
        }
    })
}

const sendMessageAttachments = async (psid, content, attachments) => {
    await axios.post('https://graph.facebook.com/v2.6/me/messages',{
        recipient: {id: psid},
        message: {
            text: content,
            attachments
        },
    },{
        params: {
            access_token: process.env.TOKEN
        }
    })
}

const sendMessageTag = async (psid, content, attachments) => {
    await axios.post('https://graph.facebook.com/v13.0/me/messages',{
        recipient: {id: psid},
        message: {
            text: content,
            attachments
        },
        messaging_type: "MESSAGE_TAG",
        tag: "CONFIRMED_EVENT_UPDATE"
    },{
        params: {
            access_token: process.env.TOKEN
        }
    })
}

//Main
app.post('/webhook', async (req, res) => {
    for(const entry of req.body.entry) {
        for(const message of entry.messaging) {

            const senderId = message.sender.id
            
            if(senderId === '100102829117400') continue
            if(!message.message) continue 
            // console.log(message.message)
            const attachments=message.message.attachments
            if(attachments) {
                await uploadAttachments({sendMessage,senderId,attachments})
                continue
            }
            if(!message.message.text) continue
            const msg = message.message.text.toLowerCase()

            const S = msg.split(' ')
            let args = []

            for (const i of S) {
                if(i !== '') args.push(i)
            }

            if(args.length===0) continue

            const content = args[0]
            
            // console.log(`senderId: ${senderId} + content: ${content}`)

            if(!commandsList.has(content)) {
                await sendMessage(senderId,`Lệnh không tồn tại, sử dụng lệnh help để có danh sách lệnh!`)
            } else {
                const execute = commandsList.get(content)
                try {
                    await execute.run({sendMessage,sendMessageAttachments,sendMessageTag,senderId,args})
                } catch(err) {
                    console.log(err)
                    sendMessage(senderId,`Đã xảy ra lỗi trong quá trình thực thi lệnh! Vui lòng thử lại!`)
                }
            }
        }
    }
    res.status(200).send("OK")
})

