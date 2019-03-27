/*
   # Comando skip, no al c&p ;)
*/
module.exports.skip = (client, message) => {
	if (!client - music[message.guild.id] || !client.music[message.guild.id].rep)
		throw new Error('El bot no esta reproduciendo musica en el servidor.')
	if (client.music[message.guild.id].dispatcher.paused)
		throw new Error('La cancion actual ya esta pausada')
	if (
		!message.member.voiceChannel ||
		message.member.voiceChannel !== message.guild.me.voiceChannel
	)
		throw new Error('El bot y el usuario no estan en el mismo canal')
	if (message.author.id !== client.music[message.guild.id].queue[0].cid) {
		let userCount = message.member.voiceChannel.members.size
		let required = Math.ceil(userCount / 2)
		if (client.music[message.guild.id].skips.length === 0)
			client.music[message.guild.id].skips = []
		if (client.music[message.guild.id].skips.includes(message.author.id))
			throw new Error('El usuario ya ha votado para saltar esta cancion')
		client.music[message.guild.id].skips.push(message.author.id)
		if (client.music[message.guild.id].skips.length >= required) {
			message.channel.send('La canción esta siendo saltada por votación')
			return client.music[message.guild.id].dispatcher.end()
		}
		message.channel.send(
			`Ya has votado para saltar esta canción! ${
				client.music[message.guild.id].skips.length
			}/${required} votos requeridos`
		)
	} else if (
		message.author.id === client.music[message.guild.id].queue[0].cid
	) {
		message.channel.send('La canción fue saltada por el usuario que la agrego')
		return client.music[message.guild.id].dispatcher.end()
	}
}
