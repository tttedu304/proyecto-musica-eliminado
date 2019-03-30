/*
   # Crea un objeto para la reproduccion de musica usando el link como base
 */
module.exports.newSongObjectSearch = ([video], message, busqueda) => {
	const { videoId, timestamp, title, seconds } = video
	return {
		vid: videoId,
		tmp: timestamp,
		tit: title,
		sec: seconds,
		addedAs: busqueda.join(' '),
		message,
		cid: message.author.id
	}
}
