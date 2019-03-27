/*
   # Comando lyrics usando la API de Weez, no al c&p, si a weez
   # Modo de uso: new Music.lyrics("clave de weez", args);
*/
module.exports.lyrics = class {
	constructor(key, busqueda) {
		this.key = key;
		this.busqueda = busqueda;
		async function getLyrics(){
			if (!busqueda[0]) throw new Error("No se proporciono ningun elemento para buscar")
			let Weez = require("weez");
			let weez = new Weez.WeezAPI(this.key);
			let song = await weez.letra(this.busqueda.join(" "));
			if (song.mensaje) throw new Error("No se encontro la canción proporcionada")
			return song.letra;
		}
	}
}