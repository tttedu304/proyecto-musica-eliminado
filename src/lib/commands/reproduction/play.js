/* Requiere los paquetes */
const ytdl = require('ytdl-core')
const ytsh = require('yt-search')
const youtube = require('youtube-dl')
/*
   # Comando para reproducir música, no funcionara si haces c&p ;)
 */
module.exports.play = async (client, message, busqueda) => {
	const { playobject } = require('../../inicialization/newPlayObject.js')
	const { newSongObjectUrl } = require('../function/newSongObjectUrl.js')
	const {
		newSongObjectPlaylist,
	} = require('../function/newSongObjectPlaylist.js')
	const { newSongObjectSearch } = require('../function/newSongObjectSearch.js')
	const { Rep } = require('../function/basicPlayFunction.js')
	const { getVideoData } = require('../function/getVideoData.js')
	const userid = message.author.id
	const serverid = message.guild.id
	let songData = {}
	if (!client.music[message.guild.id]) {
		client.music[message.guild.id] = new playobject()
	}
	let music = client.music[message.guild.id]

	if (!message.member.voiceChannel)
		throw new Error(
			'El miembro autor del mensaje no se encuentra actualmente en un canal de voz.'
		)

	if (!busqueda[0] && !music.rep)
		throw new Error(
			'El miembro autor del mensaje no proporciono un termino de busqueda, y actualmente no se esta reproduciendo nada.'
		)
	if (music.rep) {
		if (!busqueda[0] && !music.dispatcher.paused)
			throw new Error(
				'El miembro autor del mensaje no proporciono un termino de busqueda.'
			)
		if (!busqueda[0] && music.dispatcher.paused) {
			music.dispatcher.resume()
		}
		if (
			busqueda[0].match(
				/^(http(s)?:\/\/)?((w){3}.)?youtu(be|.be)?(\.com)?\/.+/i
			)
		) {
			await youtube.getInfo(busqueda[0], async (err, vi) => {
				await ytsh(
					vi.title.normalize('NFD').replace(/[\u0300-\u036f]/g, ''),
					async (err, v) => {
						if (err) {
							throw new Error('Ocurrio un error buscando la cancion: URL')
						}
						let song = new newSongObjectUrl(v, message)
						songData = song
						music.queue.push(song)
						music.cur = song
					}
				)
			})
		} else {
			await ytsh(
				busqueda
					.join(' ')
					.normalize('NFD')
					.replace(/[\u0300-\u036f]/g, ''),
				async (err, v) => {
					if (err) {
						throw new Error('Ocurrio un error buscando la cancion: Nombre')
					}
					let song = new newSongObjectSearch(v, message, busqueda)
					songData = song
					music.queue.push(song)
					music.cur = song
				}
			)
		}
	} else {
		if (
			busqueda[0].match(
				/^https?:\/\/(www.youtube.com|youtube.com)\/playlist(.*)$/
			)
		) {
			await youtube.getInfo(busqueda[0], async (err, v) => {
				if (err) {
					throw new Error('Ocurrio un error buscando la cancion: Nombre')
				}
				for (const video of v) {
					let song = new newSongObjectPlaylist(video, message)
					songData = song
					music.queue.push(song)
					music.cur = song
				}
				let connection = await message.member.voiceChannel.join()
				await Rep(connection, client, message)
			})
		} else {
			if (
				busqueda[0].match(
					/^(http(s)?:\/\/)?((w){3}.)?youtu(be|.be)?(\.com)?\/.+/i
				)
			) {
				await youtube.getInfo(busqueda[0], async (err, vi) => {
					await ytsh(
						vi.title.normalize('NFD').replace(/[\u0300-\u036f]/g, ''),
						async (err, v) => {
							if (err) {
								throw new Error('Ocurrio un error buscando la cancion: URL')
							}

							let song = new newSongObjectUrl(v, message)
							songData = song
							let connection = await message.member.voiceChannel.join()
							music.queue.push(song)
							music.cur = song
							await Rep(connection, client, message)
						}
					)
				})
			} else {
				await ytsh(
					busqueda
						.join(' ')
						.normalize('NFD')
						.replace(/[\u0300-\u036f]/g, ''),
					async (err, v) => {
						if (err) {
							throw new Error('Ocurrio un error buscando la cancion: Nombre')
						}

						let song = new newSongObjectSearch(v, message, busqueda)
						songData = song
						let connection = await message.member.voiceChannel.join()
						music.queue.push(song)
						music.cur = song
						await Rep(connection, client, message)
					}
				)
			}
		}
	}
	return songData
}
