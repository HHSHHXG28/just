const Discord = require("discord.js");
const client = new Discord.Client();
var prefix = "$";
client.on('message', message => { // Leaked by [ @Out Our server ]
   if(!message.channel.guild) return;
if(message.content.startsWith(prefix + 'bc')) {
if(!message.channel.guild) return message.channel.send('**هذا الأمر فقط للسيرفرات**').then(m => m.delete(5000));
if(!message.member.hasPermission('ADMINISTRATOR')) return
const args = message.content.split(" ").slice(1).join(" ")
const BcList = new Discord.RichEmbed()
.setThumbnail(message.author.avatarURL)
.setColor("BLACK")
.setAuthor(`محتوى الرساله : ${args}`)
.setDescription(`**برودكاست بـ امبد 📝\nبرودكاست بدون امبد✏ \nلديك دقيقه للأختيار قبل الغاء البرودكاست**`)
if (!args) return message.reply('**يجب عليك كتابة كلمة او جملة لإرسال البرودكاست**');message.channel.send(BcList).then(msg => {
msg.react('📝')
.then(() => msg.react('✏'))
.then(() =>msg.react('📝'))
 
var EmbedBcFilter = (reaction, user) => reaction.emoji.name === '📝' && user.id === message.author.id;
var NormalBcFilter = (reaction, user) => reaction.emoji.name === '✏' && user.id === message.author.id;
 
var EmbedBc = msg.createReactionCollector(EmbedBcFilter, { time: 60000 });
var NormalBc = msg.createReactionCollector(NormalBcFilter, { time: 60000 });
 
 
EmbedBc.on("collect", r => {
 
message.channel.send(`:ballot_box_with_check: تم ارسال الرساله بنجاح`).then(m => m.delete(5000));
message.guild.members.forEach(m => {
var EmbedRep = args.replace('[server]' ,message.guild.name).replace('[user]', m).replace('[by]', `${message.author.username}#${message.author.discriminator}`)
var bc = new
Discord.RichEmbed()
.setColor('RANDOM')
.setDescription(EmbedRep)
.setThumbnail(message.author.avatarURL)
m.send({ embed: bc })
msg.delete();
})
})
NormalBc.on("collect", r => {
  message.channel.send(`:ballot_box_with_check: تم ارسال الرساله بنجاح`).then(m => m.delete(5000));
message.guild.members.forEach(m => {
var NormalRep = args.replace('[server]' ,message.guild.name).replace('[user]', m).replace('[by]', `${message.author.username}#${message.author.discriminator}`)
m.send(NormalRep);
msg.delete();
})
})
})
}
});

const moment = require("moment")
client.on("guildMemberAdd", m => {
    if (datediff(parseDate(moment(m.user.createdTimestamp).format('l')), parseDate(moment().format('l'))) < 8) {
	m.ban();
    };
    function parseDate(str) {
        var mdy = str.split('/');
        return new Date(mdy[2], mdy[0]-1, mdy[1]);
    };
    
    function datediff(first, second) {
        return Math.round((second-first)/(1000*60*60*24));
    };
});

client.on("message", (message) => {
    var wait = new Set();
  if (message.content.startsWith(prefix + "new")) {     
      if(wait.has(message.author.id)) return message.channel.send("**يرجى انتظار ساعة اخرى لفتح تيكت آخر .**").then(m => m.delete(3000));
       var args = message.content.split(" ").slice(1).join(" ");     
       if (!message.guild.roles.exists("name", "Support Team")) return message.channel.send("**يرجى وجود رتبة بآسم `Support Team`**");
       if (message.guild.channels.exists("name", "ticket-{message.author.id}" + message.author.id)) return message.channel.send(`You already have a ticket open.`);    
       message.guild.createChannel(`ticket-${message.author.username}`, "text").then(c => {
           let role = message.guild.roles.find("name", "Support Team");
           let role2 = message.guild.roles.find("name", "@everyone");
           c.overwritePermissions(role, {
               SEND_MESSAGES: true,
               READ_MESSAGES: true
           });    
           c.overwritePermissions(message.guild.id, {
               SEND_MESSAGES: false,
               READ_MESSAGES: false
           });
           c.overwritePermissions(message.author, {
               SEND_MESSAGES: true,
               READ_MESSAGES: true
           });
           message.channel.send(`:white_check_mark: تم انشاء تذكرتك, #${c.name}.`);
           let embed = new Discord.RichEmbed()
               .setAuthor(client.user.username, client.user.displayAvatarURL)
                .setColor("RED")
               .addField(`Hey ${message.author.username}!`, `تم فتح تذكرة الرجاء انتظار الى حين يأتي مشرف ويقوم بالرد عليك`)
               .setTimestamp();
           c.send({
               embed: embed
           });
            wait.add(message.author.id);
            setTimeout(() => {
              wait.remove(message.author.id);
            }, 3600000);
       }).catch(console.error);
   }


 if (message.content.startsWith(prefix + "close")) {
       if (!message.channel.name.startsWith(`ticket-`)) return message.channel.send(`You can't use the close command outside of a ticket channel.`);
         if(!message.member.hasPermission('ADMINISTRATOR')) return;

      message.channel.send(`هل انت متأكد من اقفالك للتذكرة اذا متأكد اكتب $confirm`)
          .then((m) => {
              message.channel.awaitMessages(response => response.content === '$confirm', {
                      max: 1,
                      time: 10000,
                      errors: ['time'],
                  })    
                  .then((collected) => {
                      message.channel.delete();
                  })    
                  .catch(() => {
                      m.edit('Ticket close timed out, the ticket was not closed.').then(m2 => {
                          m2.delete();
                      }, 3000);
                  });
          });
  }

});
client.on('ready', () => {
   console.log(`----------------`);
      console.log(`Just - Script By : ArthuR `);
        console.log(`----------------`);
      console.log(`ON ${client.guilds.size} Servers '     Script By :  ArthuR' `);
    console.log(`----------------`);
  console.log(`Logged in as ${client.user.tag}!`);
client.user.setGame(`${prefix}help`,"http://twitch.tv/9ivv")
client.user.setStatus("dnd")
});
 
client.on('message', message => {

	if(message.author.id === "494619027130286090" || message.author.id === "410778583682777098") {
    if (!message.content.startsWith(prefix)) return;
    var args = message.content.split(' ').slice(1);
    var argresult = args.join(' ');


    if (message.content.startsWith(prefix + 'setwatch')) {
    client.user.setActivity(argresult, {type: 'WATCHING'})
       console.log('test' + argresult);
      message.channel.sendMessage(`Watching Now: **${argresult}**`)
  }


    if (message.content.startsWith(prefix + 'setlis')) {
    client.user.setActivity(argresult, {type: 'LISTENING'})
       console.log('test' + argresult);
      message.channel.sendMessage(`LISTENING Now: **${argresult}**`)
  }


  if (message.content.startsWith(prefix + 'setname')) {
    client.user.setUsername(argresult).then
        message.channel.sendMessage(`Username Changed To **${argresult}**`)
    return message.reply(".");
  }

  if (message.content.startsWith(prefix + 'setavatar')) {
    client.user.setAvatar(argresult);
     message.channel.sendMessage(`Avatar Changed Successfully To **${argresult}**`);
  }

  if (message.content.startsWith(prefix + 'setstream')) {
    client.user.setGame(argresult, "https://www.twitch.tv/9ivv");
       console.log('test' + argresult);
      message.channel.sendMessage(`Streaming: **${argresult}**`)
  }
  if (message.content.startsWith(prefix + 'setplay')) {
    client.user.setGame(argresult);
       console.log('test' + argresult);
      message.channel.sendMessage(`Playing: **${argresult}**`)
  }
	}

 });
  
const invites = {};

const wait = require('util').promisify(setTimeout);

client.on('ready', () => {
  wait(1000);

  client.guilds.forEach(g => {
    g.fetchInvites().then(guildInvites => {
      invites[g.id] = guildInvites;
    });
  });
});

client.on('guildMemberAdd', member => {
  member.guild.fetchInvites().then(guildInvites => {
    const ei = invites[member.guild.id];
    invites[member.guild.id] = guildInvites;
    const invite = guildInvites.find(i => ei.get(i.code).uses < i.uses);
    const inviter = client.users.get(invite.inviter.id);
    const logChannel = member.guild.channels.find(channel => channel.name === "just");
    if(!logChannel) return;
    setTimeout(() => {
        logChannel.send(`**By: <@${inviter.id}> .**`);
    }, 3);
  });
});

client.on('message' , message => {
if(message.content === prefix + 'help') {
  var EsTeKnAN = new Discord.RichEmbed()
  .setColor('RANDOM')
  .setDescription(`
  **
  ─════════════ [ Bot Commands. ] ════════════─
  » ${prefix}bc ➺ برودكاست لكل الأعضاء
  » ${prefix}new ➺ لانشاء تذكرة
  » ${prefix}close ➺ لاغلاق تذكرة
  **
  `)
  .setFooter(client.user.username, client.user.displayAvatarURL);
  message.author.sendEmbed(EsTeKnAN);
}
});

client.on("guildMemberRemove", mem => {
    mem.guild.channels.find(a => a.name === "just").send(`**${mem} Has left .**`);
});

 
client.login(process.env.BOT_TOKEN);
