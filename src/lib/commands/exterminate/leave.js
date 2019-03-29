/*
   # Comando para terminar la reproduccion de musica
*/
module.exports.leave = async (client, message) => {
	let music = client.music[message.guild.id]
	if (!message.member.voiceChannel || !message.guild.me.voiceChannel)
		throw new Error('El usuario o el bot no estan en un canal de voz')
	if (message.member.voiceChannel !== message.guild.me.voiceChannel)
		throw new Error('El bot y el usuario no estan en el mismo canal de voz')
	if (!music) {
		message.member.voiceChannel.leave()
	}
	if (music) {
		message.guild.me.voiceChannel.leave()
		delete music
	}
}
