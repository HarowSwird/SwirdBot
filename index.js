const Discord = require("discord.js");

const Client = new Discord.Client;

const prefix = "%";

Client.on("ready", () => {
    console.log("bot");

    Client.guilds.cache.find(guild => guild.id === "780135592804876318").channels.cache.find(channel => channel.id === "902893305380085760").fetch("903213962479419392").then(message => {
       console.log("message ajouté à la mémoire : " + message.content);
    }).catch(err => {
        console.log("impossible d'ajoute le message en mémoire : " + err);
    });
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
    if(message.author.bot) return;
    if(message.content === prefix + "embed"){
        var embed = new Discord.MessageEmbed()
            .setColor("#FF0000")
            .setTitle("**Quels camps ?**")
            .setAuthor("Orion", "https://i.imgur.com/6SyNMmT.png")
            .setThumbnail("https://i.imgur.com/6SyNMmT.png")
            .setDescription("Vous avez la possibilité de choisir un camp entre les Jedi et les Sith")
            .addField("**Les Jedi** 🔵", "Les gentils", false)
            .addField("**Les Sith** 🔴", "Les méchants", false)
            .setImage("https://i.imgur.com/6SyNMmT.png")
            .setFooter("By Harow", "https://i.imgur.com/ddgKMx7.jpg")


        message.channel.send(embed);
    }
}); 

Client.on("messageReactionAdd", (reaction, user) => {
    if(user.bot) return;

    console.log("reaction ajouté" + user.username + "\nNom de l'émoji " + reaction.emoji.name + " c'est la " + reaction.count + "e reaction");

    if(reaction.message.id === "903217956064997387"){
        if(reaction.emoji.name === "red_circle"){
            var member = reaction.message.guild.members.cache.find(member => member.id === user.id);
            member.roles.add("902877798841065482").then(mbr => {
                console.log("Rôle attribué avec succès pour " + mbr.displayName);
            }).catch(err => {
                console.log("Le rôle n'a pu être attribué : " + err);
            });
        }
    }
});

Client.on("messageReactionRemove", (reaction, user) => {
    if(user.bot) return;

    console.log("reaction retiré");
});

Client.login('ODQyNjY3NjQwNDc2MTM5NTIx.YJ4pZQ.6o_dUP3fm9sbfpZ3KDDPOmZNf_A');
