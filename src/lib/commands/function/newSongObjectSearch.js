/*
   # Crea un objeto para la reproduccion de musica usando el link como base
 */
module.exports.newSongObjectSearch = class {
	constructor(v, message, busqueda) {
		this.v = v
		this.message = message
		this.busqueda = busqueda
		return {
			vid: this.v.videos[0].videoId,
			tmp: this.v.videos[0].timestamp,
			tit: this.v.videos[0].title,
			sec: this.v.videos[0].seconds,
			cid: this.message.author.id,
			addedAs: this.busqueda.join(' '),
		}
	}
}
