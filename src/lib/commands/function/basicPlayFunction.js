const ytdl = require('ytdl-core')
/*
   # Funcion para reproducir música con tu bot
 */
module.exports.Rep = async (con, client, message) => {
	let music = client.music[message.guild.id]
	let dispatcher = con.playStream(
		ytdl('https://www.youtube.com/watch?v=' + music.queue[0].vid, {
			filter: 'audioonly',
			quality: 'highestaudio',
		})
	)
	music.dispatcher = dispatcher
	music.actu = music.queue[1]
	music.rep = true
	music.dispatcher.setVolume(music.volume)

	dispatcher.on('end', async () => {
		if (!music) return
		if (!music.repeat) {
			music.queue.shift()
			music.rep = false
			music.actu = null
			music.dispatcher = null
			if (music.queue[0]) return rep(con)
			if (!message.guild.voiceConnection) return
			if (message.guild.voiceConnection && !music.queue[0] && !music.rep)
				return message.member.voiceChannel.leave()
		} else if (music.repeat) {
			let again = music.queue.shift()
			music.queue.push(again)
			return rep(con)
		}
	})
}
