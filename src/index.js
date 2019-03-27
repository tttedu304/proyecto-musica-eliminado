let { session } = require('./lib/inicialization/newSession.js')
let { rep } = require('./lib/commands/function/basicPlayFunction')
let { pausar } = require('./lib/commands/exterminate/pausar.js')
let { skip } = require('./lib/commands/exterminate/skip.js')
let { lyrics } = require("./lib/commands/misc/lyrics.js")
module.exports = { session, rep, pausar, skip, lyrics }
