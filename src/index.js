// Inicializacion
const { session } = require('./lib/inicialization/newSession.js')

//Reproduccion
const { Rep } = require('./lib/commands/function/basicPlayFunction')
const { play } = require('./lib/commands/reproduction/play.js')
const { resume } = require('./lib/commands/reproduction/resume.js')

//Exterminio
const { pausar } = require('./lib/commands/exterminate/pausar.js')
const { skip } = require('./lib/commands/exterminate/skip.js')
const { leave } = require('./lib/commands/exterminate/leave.js')

// Otros
const { lyrics } = require('./lib/commands/misc/lyrics.js')
module.exports = { session, Rep, pausar, skip, lyrics, play, leave, resume }
