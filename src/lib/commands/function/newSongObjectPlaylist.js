/*
   # Crea un objeto para la reproduccion de musica usando una playlist como base
 */
module.exports.newSongObjectPlaylist = class {
	constructor(video, message) {
		this.v = video
		this.message = message
		return {
			vid: this.v.id,
			tmp: this.v.duration,
			tit: this.v.title,
			sec: this.v.seconds,
			cid: this.message.author.id,
			addedAs: this.v.title,
		}
	}
}
