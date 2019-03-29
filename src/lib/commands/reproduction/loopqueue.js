/*
   # Comando para hacer la queue de canciones infinita, no al c&p ;)
*/
module.exports.loop = async (client, message) => {
	let music = client.music[message.guild.id]
	if (!music)
		throw new Error(
			'No hay canciones reproduciendose en este servidor actualmente'
		)
	music.repeat = !music.repeat
}
