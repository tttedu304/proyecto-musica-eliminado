/*
   # Comando play
 */
module.exports.play = class {
    constructor(idServidor, idUsuario, busqueda, client) {
        const ytdl = require("ytdl-core");
        const ytsh = require("yt-search");
        const youtube = require("youtube-dl");
        this.idServidor = idServidor;
        this.idUsuario = idUsuario;
        this.busqueda = busqueda;
        if (!client.music[this.idServidor]) {
            client.music[this.idServidor] = {
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

        if (client.music[this.idServidor].rep) {
            if (!this.busqueda[0]) return;
            if (this.busqueda[0].match(/^(http(s)?:\/\/)?((w){3}.)?youtu(be|.be)?(\.com)?\/.+/i)) {
                youtube.getInfo(this.busqueda[0], async (err, vi) => {
                    ytsh(vi.title.normalize("NFD").replace(/[\u0300-\u036f]/g, ""), async (err, v) => {
                        if (err) {
                            console.log(err)
                        }
                        let song = {
                            "vid": v.videos[0].videoId,
                            "tmp": v.videos[0].timestamp,
                            "tit": v.videos[0].title,
                            "sec": v.videos[0].seconds,
                            "cid": this.idUsuario,
                            "addedAs": v.videos[0].title,
                        };
                        client.music[this.idServidor].queue.push(song);
                        client.music[this.idServidor].cur = song;
                    })
                })
            } else {
                ytsh(this.busqueda.join(" ").normalize("NFD").replace(/[\u0300-\u036f]/g, ""), async (err, v) => {
                    if (err) {
                        console.log(err)
                    }
                    let song = {
                        "vid": v.videos[0].videoId,
                        "tmp": v.videos[0].timestamp,
                        "tit": v.videos[0].title,
                        "sec": v.videos[0].seconds,
                        "cid": message.author.id,
                        "addedAs": args.join(" "),
                    };
                    client.music[this.idServidor].queue.push(song);
                    client.music[this.idServidor].cur = song;
                })
            }
        }
        async function rep(con) {
            var dispatcher = con.playStream(ytdl("https://www.youtube.com/watch?v=" + client.music[this.idServidor].queue[0].vid, {
                "filter": "audioonly",
                "quality": "highestaudio"

            }));
            client.music[this.idServidor].dispatcher = dispatcher;
            client.music[this.idServidor].actu = client.music[message.guild.id].queue[1];
            client.music[this.idServidor].rep = true;
            client.music[this.idServidor].dispatcher.setVolume(client.music[this.idServidor].volume);
            dispatcher.on("end", async () => {
                if (!client.music[this.idServidor]) return;
                if (!client.music[this.idServidor].repeat) {
                    client.music[this.idServidor].queue.shift();
                    client.music[this.idServidor].rep = false;
                    client.music[this.idServidor].actu = null;
                    client.music[this.idServidor].dispatcher = null;
                    if (client.music[this.idServidor].queue[0]) return rep(con);
                    if (!message.guild.voiceConnection) return;
                    if (message.guild.voiceConnection && !client.music[this.idServidor].queue[0] && !client.music[this.idServidor].rep)
                        return message.member.voiceChannel.leave()
                } else if (client.music[this.idServidor].repeat) {
                    let again = client.music[this.idServidor].queue.shift();
                    client.music[this.idServidor].queue.push(again);
                    return rep(con);
                }
            });
        }
    }
};

/*
exports.run = async (client, message, args) => {
    const Discord = require("discord.js");
    const ytdl = require("ytdl-core");
    const ytsh = require("yt-search");
    const youtube = require("youtube-dl");
    if (!message.member.voiceChannel) return message.channel.send("You are not in a voice channel :(");
    if (!args[0] && !client.music[message.guild.id]) return message.channel.send("No song given");
    else if(!args[0] && client.music[message.guild.id].rep) return message.channel.send("No song given");
    if (client.music[message.guild.id] && client.music[message.guild.id].rep && client.music[message.guild.id].dispatcher.paused && !args[0] && message.member.voiceChannel) {
        if (message.member.voiceChannel !== message.guild.me.voiceChannel) return message.channel.send("We are not in the same voice channel");
        client.music[message.guild.id].dispatcher.resume();
        message.channel.send("Song has been resumed")
    }
    if (!client.music[message.guild.id]) {
        client.music[message.guild.id] = {
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
    if (client.music[message.guild.id].rep) {
        if (!args[0]) return;
        if (args[0].match(/^(http(s)?:\/\/)?((w){3}.)?youtu(be|.be)?(\.com)?\/.+/i)) {
            youtube.getInfo(args[0], async (err, vi) => {
                ytsh(vi.title.normalize("NFD").replace(/[\u0300-\u036f]/g, ""), async (err, v) => {
                    if (err) {
                        message.channel.send("An error occurred");
                        console.log(err)
                    }
                    let song = {
                        "vid": v.videos[0].videoId,
                        "tmp": v.videos[0].timestamp,
                        "tit": v.videos[0].title,
                        "sec": v.videos[0].seconds,
                        "cid": message.author.id,
                        "addedAs": v.videos[0].title,
                    };
                    client.music[message.guild.id].queue.push(song);
                    client.music[message.guild.id].cur = song;
                    let addEmbed2 = new Discord.RichEmbed()
                        .setAuthor(client.users.get(song.cid).tag, client.users.get(song.cid).avatarURL)
                        .setTitle("\nSong Added To Playlist!\n")
                        .setDescription(`[${song.tit}](https://www.youtube.com/watch?v=${song.vid})\n\nDuration: **${song.tmp}**\n\nAdded By: \`${client.users.get(song.cid).tag}\``)
                        .setFooter(`Songs before yours: ${client.music[message.guild.id].queue.length}`)
                        .setThumbnail(`https://img.youtube.com/vi/${song.vid}/hqdefault.jpg`);
                    message.channel.send(addEmbed2)
                })
            })
        } else {
            ytsh(args.join(" ").normalize("NFD").replace(/[\u0300-\u036f]/g, ""), async (err, v) => {
                if (err) {
                    message.channel.send("An error occurred");
                    console.log(err)
                }
                let song = {
                    "vid": v.videos[0].videoId,
                    "tmp": v.videos[0].timestamp,
                    "tit": v.videos[0].title,
                    "sec": v.videos[0].seconds,
                    "cid": message.author.id,
                    "addedAs": args.join(" "),
                };
                client.music[message.guild.id].queue.push(song);
                client.music[message.guild.id].cur = song;
                let addEmbed2 = new Discord.RichEmbed()
                    .setAuthor(client.users.get(song.cid).tag, client.users.get(song.cid).avatarURL)
                    .setTitle("\nSong Added To Playlist!\n")
                    .setDescription(`[${song.tit}](https://www.youtube.com/watch?v=${song.vid})\n\nDuration: **${song.tmp}**\n\nAdded By: \`${client.users.get(song.cid).tag}\``)
                    .setFooter(`Songs before yours: ${client.music[message.guild.id].queue.length}`)
                    .setThumbnail(`https://img.youtube.com/vi/${song.vid}/hqdefault.jpg`);
                message.channel.send(addEmbed2)
            })
        }
    } else {
        if (args[0].match(/^https?:\/\/(www.youtube.com|youtube.com)\/playlist(.*)$/)) {
            youtube.getInfo(args[0], async (err, v) => {
                if (err) {
                    message.channel.send("An error occurred");
                    console.log(err);
                }
                for (const video of v) {
                    let song = {
                        "vid": video.id,
                        "tmp": video.duration,
                        "tit": video.title,
                        "cid": message.author.id,
                        "sec": video.seconds,
                        "addedAs": video.title,
                    };
                    client.music[message.guild.id].queue.push(song);
                    client.music[message.guild.id].cur = song;
                }
                let connection = await message.member.voiceChannel.join();
                rep(connection)
            })
        } else {
            if (args[0].match(/^(http(s)?:\/\/)?((w){3}.)?youtu(be|.be)?(\.com)?\/.+/i)) {
                youtube.getInfo(args[0], async (err, vi) => {
                    ytsh(vi.title.normalize("NFD").replace(/[\u0300-\u036f]/g, ""), async (err, v) => {
                        if (err) {
                            message.channel.send("An error occurred");
                            console.log(err)
                        }

                        let song = {
                            "vid": v.videos[0].videoId,
                            "tmp": v.videos[0].timestamp,
                            "tit": v.videos[0].title,
                            "cid": message.author.id,
                            "addedAs": v.videos[0].title,
                            "sec": v.videos[0].seconds,
                        };
                        let connection = await message.member.voiceChannel.join();
                        client.music[message.guild.id].queue.push(song);
                        client.music[message.guild.id].cur = song;
                        rep(connection)
                    })
                })
            } else {
                ytsh(args.join(" ").normalize("NFD").replace(/[\u0300-\u036f]/g, ""), async (err, v) => {
                    if (err) {
                        message.channel.send("An error occurred");
                        console.log(err)
                    }

                    let song = {
                        "vid": v.videos[0].videoId,
                        "tmp": v.videos[0].timestamp,
                        "tit": v.videos[0].title,
                        "cid": message.author.id,
                        "addedAs": args.join(" "),
                        "sec": v.videos[0].seconds,
                    };
                    let connection = await message.member.voiceChannel.join();
                    client.music[message.guild.id].queue.push(song);
                    client.music[message.guild.id].cur = song;
                    rep(connection)
                })
            }
        }
    }
    async function rep(con) {
        var dispatcher = con.playStream(ytdl("https://www.youtube.com/watch?v=" + client.music[message.guild.id].queue[0].vid, {
            "filter": "audioonly",
            "quality": "highestaudio"

        }));
        client.music[message.guild.id].dispatcher = dispatcher;
        client.music[message.guild.id].actu = client.music[message.guild.id].queue[1];
        client.music[message.guild.id].rep = true;
        client.music[message.guild.id].dispatcher.setVolume(client.music[message.guild.id].volume);
        if (!client.music[message.guild.id].repeat) {
            let npEmbed = new Discord.RichEmbed()
                .setAuthor(client.users.get(client.music[message.guild.id].queue[0].cid).tag, client.users.get(client.music[message.guild.id].queue[0].cid).avatarURL)
                .setDescription(`\n[${client.music[message.guild.id].queue[0].tit}](https://www.youtube.com/watch?v=${client.music[message.guild.id].queue[0].vid})\n\nDuration: **${client.music[message.guild.id].queue[0].tmp}**\n\nAdded By: \`${client.users.get(client.music[message.guild.id].queue[0].cid).tag}\``)
                .setFooter(`Song is the first in queue`)
                .setThumbnail(`https://img.youtube.com/vi/${client.music[message.guild.id].queue[0].vid}/hqdefault.jpg`);
            message.channel.send(npEmbed);
        }
        dispatcher.on("end", async () => {
            if (!client.music[message.guild.id]) return;
            if (!client.music[message.guild.id].repeat) {
                client.music[message.guild.id].queue.shift();
                client.music[message.guild.id].rep = false;
                client.music[message.guild.id].actu = null;
                client.music[message.guild.id].dispatcher = null;
                if (client.music[message.guild.id].queue[0]) return rep(con);
                if (!message.guild.voiceConnection) return;
                if (message.guild.voiceConnection && !client.music[message.guild.id].queue[0] && !client.music[message.guild.id].rep)
                    return message.member.voiceChannel.leave()
            } else if (client.music[message.guild.id].repeat) {
                let again = client.music[message.guild.id].queue.shift();
                client.music[message.guild.id].queue.push(again);
                return rep(con);
            }
        });
    }
};*/
