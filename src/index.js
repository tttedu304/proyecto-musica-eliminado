const { session } = require('./lib/inicialization/newSession.js')
const { rep } = require('./lib/commands/function/basicPlayFunction')
const { pausar } = require('./lib/commands/exterminate/pausar.js')
const { skip } = require('./lib/commands/exterminate/skip.js')
const { lyrics } = require('./lib/commands/misc/lyrics.js')
const { play } = require('./lib/commands/reproduction/play.js')
module.exports = { session, rep, pausar, skip, lyrics, play }
