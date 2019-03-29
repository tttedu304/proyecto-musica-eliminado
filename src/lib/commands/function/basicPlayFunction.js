const ytdl = require('ytdl-core')
/*
   # Funcion para reproducir música con tu bot
 */
module.exports.Rep = class {
	constructor(client, userID, serverID) {
		this.client = client
		this.userID = userID
		this.music = this.client.music[serverID]
	}

	async rep(connection, message) {
		if (!this.music) {
			return
		}

		const stream = ytdl(
			`https://www.youtube.com/watch?v=${this.music.queue[0].vid}`,
			{
				filter: 'audioonly',
				quality: 'highestaudio',
			}
		)
		const dispatcher = connection.playStream(stream)
		this.music.dispatcher = dispatcher
		this.music.actu = this.music.queue[1]
		this.music.rep = true
		this.music.dispatcher.setVolume(this.music.volume)

		dispatcher.on('end', this.onDispatcherEnd(message, connection))
	}

	onDispatcherEnd(message, connection) {
		return () => {
			if (!this.music) {
				return
			}
			if (!this.music.repeat) {
				this.music.queue.shift()
				this.music.rep = false
				this.music.actu = null
				this.music.dispatcher = null
				if (this.music.queue[0]) {
					return rep(connection)
				}
				if (!message.guild.voiceConnection) {
					return
				}
				if (
					message.guild.voiceConnection &&
					!this.music.queue[0] &&
					!this.music.rep
				) {
					return message.member.voiceChannel.leave()
				}
			} else if (this.music.repeat) {
				const again = this.music.queue.shift()
				this.music.queue.push(again)
				return rep(connection)
			}
		}
	}
}
