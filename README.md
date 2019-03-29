# MyBot Music

Un npm enfocado directamente a la comunidad de MyBot, para que los usuarios puedan crear un sistema de música de una manera muy sencilla, disfruten, por parte de su amigo tttedu304#7823 y Aiden#1326

## COMO USAR?

##### DEFINIR PACKAGE
```javascript
let Music = require("mybot-music");
let Discord = require("discord.js");
let client = new Discord.Client();
```

##### USANDO EL PACKAGE

```javascript
/* Dentro del evento ready */
client.music = new Music.session();
```

### COMANDOS
##### Play
```javascript
/* DENTRO DEL EVENTO MESSAGE */
if(message.content.startsWith("/play")) {
	try {

		await Music.play(client, message, args);

	} catch (err) {
		
		console.log(err)
		message.channel.send("Un error ha ocurrido")
		
	}
}
```
##### Pause
```javascript
/* DENTRO DEL EVENTO MESSAGE */
if(message.content.startsWith("/pause")){
	try{
		await Music.pausar(client, message)
	}catch(err){
		console.log(err)
		message.channel.send("Ocurrio un error")
	}
}

```
##### Skip
```javascript
/* DENTRO DEL EVENTO MESSAGE */
if(message.content.startsWith("/skip")){
	try {
		await Music.skip(client, message)
	}catch(err){
		console.log(err)
		message.channel.send("Ocurrio un error")
	}
}
```
##### Lyrics
```javascript
/* DENTRO DEL EVENTO MESSAGE */
if(message.content.startsWith("/lyrics")){
	try {
		await Music.lyrics(client, args, "Llave de acceso de Weez")
	}catch(err){
		console.log(err)
		message.channel.send("Ocurrio un error")
	}
}
```
##### Leave
```javascript
/* DENTRO DEL EVENTO MESSAGE*/
if(message.content.startsWith("/leave")){
	try {
		await Music.leave(client, message)
	}catch(err){
		console.log(err)
		message.channel.send("Ocurrio un error")
	}
}
```
##### Resume
```javascript
/* DENTRO DEL EVENTO MESSAGE*/
if(message.content.startsWith("/resumir")){
	try {
		await Music.resume(client, message)
	}catch(err){
		console.log(err)
		message.channel.send("Ocurrio un error")
	}
}
```


