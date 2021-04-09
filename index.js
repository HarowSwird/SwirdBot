const Discord = require("discord.js");

const Client = new Discord.Client;

const prefix = "%";

Client.on("ready", () =>{
    console.log("bot");
});

Client.on("message", message => {
    if(message.member.permissions.has("MANAGE_MESSAGES")){
        if(message.content.startsWith(prefix + "clear")){
            let args = message.content.split(" ");

            if(args[1] == undefined){
                message.reply("Nombre de message non ou mal défini");
            }
            else {
                let number = parseInt(args[1]);
                
                if(isNaN(number)){
                    message.reply("Nombre de message non ou mal défini");
                }
                else {
                    message.channel.bulkDelete(number).then(messages => {
                        console.log("Supression de " + messages.size + "messages réussi !")
                    }).catch(err => {
                        console.log("Erreur de clear :" + err);
                    });
                }
            }
        }
    }       
});

Client.on("message", message => {
    if(message.author.bot) return;
    if(message.channel.type == "dm") return;
          
    if(message.member.hasPermission("MANAGE_MESSAGES")){ 
        if(message.content.startsWith(prefix + "mute")){
            let mention = message.mentions.members.first();

            if(mention == undefined){
                message.reply("Membre mal ou non mentionné");
            }
            else {
                mention.roles.add("830042980056039424");
                message.channel.send(mention.displayName + " mute avec succès");
            }
        }
        else if(message.content.startsWith(prefix + "unmute")){
            let mention = message.mentions.members.first();
            
            if(mention == undefined){
                message.reply("Membre mal ou non mentionné");
            }
            else {
                mention.roles.remove("830042980056039424");
                message.channel.send(mention.displayName + " unmute avec succès"); 
            }
        }
        else if(message.content.startsWith(prefix + "tempmute")){
            let mention = message.mentions.members.first();
            
            if(mention == undefined){
                message.reply("Membre non ou mal mentionné");
            }
            else {
                let args = message.content.split(" ");

                mention.roles.add("830042980056039424");
                setTimeout(function() {
                    mention.roles.remove("830042980056039424");
                    message.channel.send("<@" + mention.id + "> tu peux désormais parler de nouveau !");
                }, args[2] * 1000);
            }
        }
    }
});

Client.login(process.env.TOKEN);