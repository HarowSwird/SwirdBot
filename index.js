const Discord = require("discord.js");
const ytdl = require("ytdl-core");

const Client = new Discord.Client;

const prefix = "%";

Client.on("ready", () => {
    console.log("bot");
});

Client.on("guildMemberAdd", member => {
    console.log("Un nouveau membre est arrivé");
    //member.guild.channels.cache.find(channel => channel.id == "829401020617719818").send(member.displayName + "est arrivé !\nNous sommes désormais **" + member.guild.memberCount + "**sur le serveur");
    member.roles.add("820336550105448458").then(mbr => {
        console.log("Rôle attribué avec succès pour " + member.displayName);
    }).catch(() => {
        console.log("Le rôle n'a pas pu être attribué");
    });
});

Client.on("guildMemberRemove", member => {
    console.log("Un membre nous a quitté");
    member.guild.channels.cache.find(channel => channel.id == "830081172779958312").send(member.displayName + " nous a quité !\nNous sommes désormais plus que **" + member.guild.memberCount + "** sur le serveur");
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

Client.on("message", message => {
    if(message.content.startsWith(prefix + "play")){
        if(message.member.voice.channel){
            message.member.voice.channel.join().then(connection => {
                let args = message.content.split(" ");

                if(!args[1]){
                    message.reply("Lien de la vidéo non ou mal mentionné.");
                    connection.disconnect();
                }
                else {
                    let dispatcher = connection.play(ytdl(args[1], { quality: "highestaudio" }));

                    dispatcher.on("finish", () => {
                        dispatcher.destroy();
                        connection.disconnect();
                    });

                    dispatcher.on("error", err => {
                        console.log("errer de dispatcher : " + err);
                    });
                }
            }).catch(err => {
                message.reply("Erreur lors de la connexion : " + err);
            });
        }
        else {
            message.reply("Vous n'êtes pas connecté en vocal");
        }
    }
});

Client.login(process.env.TOKEN);

//process.env.TOKEN