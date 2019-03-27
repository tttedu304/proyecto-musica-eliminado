/*
   # Pausa la reproduccion
 */
module.exports.pausar = async (client, message) => {
	if (!client - music[message.guild.id] || !client.music[message.guild.id].rep)
		throw new Error('El bot no esta reproduciendo musica en el servidor.')
	if (client.music[message.guild.id].dispatcher.paused)
		throw new Error('La cancion actual ya esta pausada')
	if (
		!message.member.voiceChannel ||
		message.member.voiceChannel !== message.guild.me.voiceChannel
	)
		throw new Error('El bot y el usuario no estan en el mismo canal')
	if (
		!client.music[message.guild.id].dispatcher.paused &&
		client.music[message.guild.id].rep
	) {
		client.music[message.guild.id].dispatcher.pause()
	}
}
