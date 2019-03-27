/*
   # Consigan la informacion de los videos para asi poder crear mensajes de que busco/encontro el bot, no al c&p ;)
 */
module.exports.getVideoData = () => {
	return new Promise((resolve, reject) => {
		getData((err, v) => {
			if (err) {
				return reject(err)
			}
			return resolve(v)
		})
	})
}
