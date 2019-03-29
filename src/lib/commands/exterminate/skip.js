/*
   # Comando skip, no al c&p ;)
   # Modo de uso:
   if(command === "skip"){
   	let music = require("mybot-music");
   	await music.skip(client, message);
  }
*/
module.exports.skip = (client, message) => {
	if (!client) throw new Error('Client no ha sido especificado')
	if (!message) throw new Error('Message no ha sido especificado')
	let music = client.music[message.guild.id]
	if (!music || !music.rep)
		throw new Error('El bot no esta reproduciendo musica en el servidor.')
	if (
		!message.member.voiceChannel ||
		message.member.voiceChannel !== message.guild.me.voiceChannel
	)
		throw new Error('El bot y el usuario no estan en el mismo canal')
	if (message.author.id !== music.queue[0].cid) {
		let userCount = message.member.voiceChannel.members.size
		let required = Math.ceil(userCount / 2)
		if (music.skips.length === 0) music.skips = []
		if (music.skips.includes(message.author.id))
			throw new Error('El usuario ya ha votado para saltar esta cancion')
		music.skips.push(message.author.id)
		if (music.skips.length >= required) {
			return music.dispatcher.end()
		}
		message.channel.send(
			`Ya has votado para saltar esta canción! ${
				music.skips.length
			}/${required} votos requeridos`
		)
	} else if (message.author.id === music.queue[0].cid) {
		return music.dispatcher.end()
	}
}
