const config = require("./config.json"); 
const fs = require('fs');
var clipboard = require("./clipboard.json")

const Discord = require('discord.js');
const client = new Discord.Client();

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {
    const pesan = msg.content.toLowerCase()
    var kata = pesan.split(" ")
    if (pesan == config.prefix+'ping') {

        msg.reply('Pong!');
        console.log(clipboard)

    } else if (pesan[0] == config.prefix){

       
        if (kata[0] == config.prefix+config.clip && kata.length == 3){             //Inserting to clipboard
            
            if (kata[1] in clipboard){
                msg.reply("`" + kata[1] + "` is already in my clipboard")
            } else {
                msg.channel.messages.fetch(kata[2])
                .then(message => {

                    var obj = new Object
                    obj[kata[1]] = message.content
                   
                    clipboard[kata[1]] = {pesan: message.content}
                    
                    writeToJSON(clipboard)

                    return clipboard
                })
                .catch(console.error);
                msg.reply("Message ID: `"+kata[2]+"` is successfully clipped")
            }

        } else if (kata[0] == config.prefix+config.delete){     //Deleting from clipboard

            console.log(clipboard[kata[1]])
            if (kata[1] in clipboard){
                delete clipboard[kata[1]]
                msg.reply("`"+kata[1]+"` is successfully deleted")
                writeToJSON(clipboard)

            } else {
                msg.reply("`"+kata[1]+"` is not on clipboard")
            }
            
        
        } else if (kata[1] in clipboard) {                      //replying to key

            let channel = msg.channel
            channel.send(clipboard[kata[1]].pesan).catch(console.error) 

        } else {

            msg.reply("Sorry i don't understand what you mean or "+kata[1]+" is not on clipboard")

        }
    }
});

function writeToJSON(Object){
    var jsonData = JSON.stringify(Object)
    fs.writeFile("clipboard.json", jsonData, function(err) {
        if (err) {
            console.log(err);
        }
    }
    )
}


client.login(config.token);