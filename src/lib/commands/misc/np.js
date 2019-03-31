/*
   # Comando para ver lo que se esta reproduciendo actualmente
*/
module.exports.np = async(client, message) => {
	if(!client.music[message.guild.id]) throw new Error("No se esta reproduciendo nada en el servidor")
	if(!client.music[message.guild.id].rep) throw new Error("No se esta reproduciendo nada en el servidor")
	let music = client.music[message.guild.id]
	return music.queue[0]
}