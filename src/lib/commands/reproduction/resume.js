/*
   # Comando para resumir las canciones
*/
module.exports.resume = async (client, message) => {
	if (!client.music[message.guild.id])
		throw new Error('No existe un objeto music en el servidor')
	let music = music
	if (!music.rep) throw new Error('No se esta reproduciendo nada')
	if (!music.dispatcher.paused)
		return message.channel.send('The song is already playing')
	if (music.dispatcher.paused && music.rep) {
		music.dispatcher.resume()
	}
}
