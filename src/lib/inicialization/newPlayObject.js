/*
   # Crea un nuevo objeto de reproduccion de muscica, no al c&p ;)
 */
module.exports.playobject = class {
	constructor() {
		return {
			queue: [],
			skips: [],
			dispatcher: null,
			cur: null,
			actu: null,
			rep: false,
			repeat: false,
			volume: 0.5,
		}
	}
}