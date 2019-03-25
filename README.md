# MyBot Music

Un npm enfocado directamente a la comunidad de MyBot, para que los usuarios puedan crear un sistema de música de una manera muy sencilla, disfruten, por parte de su amigo tttedu304#7823

## COMO USAR?

##### DEFINIR PACKAGE
```javascript
let DiscordDj = require("mybot-music");
let Discord = require("discord.js");
let client = new Discord.Client();
```

##### USANDO EL PACKAGE

```javascript
/* Dentro del evento ready */
client.music = new DiscordDj.session();
```

### COMANDOS
##### Play
```javascript
/* DENTRO DEL EVENTO MESSAGE */
if(message.content.startsWith("/play")){
    new DiscordDj.play(message.guild.id, message.author.id, args.join(" "), client);
}
```
##### Pause
```javascript
/* DENTRO DEL EVENTO MESSAGE */
if(message.content.startsWith("/pause")){
    new DiscordDj.pause(message.guild.id, message.author.id, client);
}
```
##### Skip
```javascript
/* DENTRO DEL EVENTO MESSAGE */
if(message.content.startsWith("/pause")){
    new DiscordDj.skip(message.guild.id, message.author.id, client);
}
```

