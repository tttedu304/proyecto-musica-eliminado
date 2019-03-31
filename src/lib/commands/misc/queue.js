/*
   # Comando para mostrar la cola de canciones en el servidor
*/
module.exports.queue = async(client, message) => {
	if(!client.music[message.guild.id]) throw new Error("No se esta reproduciendo música en el servidor");
	if(!client.music[message.guild.id].rep) throw new Error("No se esta reproduciendo música");
	let music = await client.music[message.guild.id];
	return music.queue;
}