let Weez = require('weez')
/*
   # Comando lyrics usando la API de Weez, no al c&p, si a weez
   # Modo de uso:
  if(command === "lyrics"){
  let music = require("mybot-music");
  if(!args[0]) return message.channel.send("No se proporciono ningun elemento para buscar")
   	try{
   		let song = await music.lyrics("llave de acceso Weez", args);
    }catch(err){
    //que hacer si no encuentra la canción
    }
  }
*/
module.exports.lyrics = async (key, busqueda) => {
	if (!key) throw new Error('La llave de acceso a Weez no ha sido especificada')
	if (!busqueda)
		throw new Error("No se ha proporcionado el parametro 'busqueda'")
	if (!busqueda[0])
		throw new Error('No se proporciono ningun elemento para buscar')
	let weez = new Weez.WeezAPI(key)
	let song = await weez.letra(busqueda.join(' '))
	if (song.mensaje) throw new Error('No se encontro la canción proporcionada')
	return song
}
