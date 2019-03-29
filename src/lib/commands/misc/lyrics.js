let Weez = require('weez')
/*
   # Comando lyrics usando la API de Weez, no al c&p, si a weez
*/
module.exports.lyrics = async (client, busqueda, key) => {
	let music = client.music[message.guild.id]
	if (!key) throw new Error('La llave de acceso a Weez no ha sido especificada')
	if (!busqueda)
		throw new Error("No se ha proporcionado el parametro 'busqueda'")
	if (!busqueda[0] && music) {
		busqueda = music.addedAs
	} else if (!busqueda[0] && !music) {
		throw new Error('No se proporciono ninguna cancion para buscar')
	}
	let weez = new Weez.WeezAPI(key)
	let song = await weez.letra(busqueda.join(' '))
	if (song.mensaje) throw new Error('No se encontro la canción proporcionada')
	return song
}
