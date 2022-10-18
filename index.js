const Discord = require('discord.js');
const mineflayer = require ('mineflayer');
const {
    Client,
    Intents
  } = require('discord.js')
  // Create Discord intentions, required in v13
  const intents = new Intents(['GUILDS', 'GUILD_MESSAGES'])
  // Create Discord client
  const client = new Client({
    intents: intents
  })
client.login('') \\ discord token here  

let bot
let fredbotConn = false
let prefix = '-'

const mineflayerWrapper = () => {
    bot = mineflayer.createBot({
        host: '' , \\server host 
        port: 25565,       
        username: '',  \\ email  
	password: '',  \\password
        version: false,                 
        auth: 'Microsoft'      
      })
    

    bot.on('login', () => {
        fredbotConn = true
        console.log('Ingame Bot Onlne')
    })

    
    
    bot.on('chat', (username, message) => {
        console.log(username,message)
        let channel = client.channels.cache.get('') \\ discord channel to send messeges to from minecraft
        if (!channel) return;
        channel.send(` **${username}** _${message}_`)
	
      })

    bot.on('end', () => {
        fredbotConn = false
        console.log('failed to connect, reconecting in 5 minutes')
     
        setTimeout(mineflayerWrapper, 5 * 60 * 1000)
    })
}

mineflayerWrapper()

client.on('ready', () => {
    console.log('Bot Onlne')
})
    
client.on('messageCreate', async (message) => {
    if (!fredbotConn) return

    const author = message.author
    
    if (author.id == client.user.id) return
    
    const channel = message.channel
    
    try {
        const guildAuthor = message.member
    
        if (channel.id == '') { \\ channel that the bot will send the messeges from
            bot.chat(`${message.content}`)
            
        }
    } catch(err) {
        console.log(err)
    }
})
   