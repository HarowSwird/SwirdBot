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

    if(message.member.hasPermission("ADMINISTRATOR")){
        if(message.content.startsWith(prefix + "ban")){
            let mention = message.mentions.members.first();

            if(mention == undefined){
                message.reply("Membre non ou mal mentionné")
            }
            else {
                if(mention.bannable){
                    mention.ban();
                    message.channel.send(mention.displayName + " a été banni du serveur");
                }
                else {
                    message.reply("Impossible de bannir ce membre");
                }
            }
        }  
    }
});

Client.login(process.env.TOKEN);