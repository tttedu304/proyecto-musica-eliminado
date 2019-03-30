/* Requiere los paquetes */
const ytsh = require("yt-search");
const youtube = require("youtube-dl");
const { playobject } = require("../../inicialization/newPlayObject.js");
const { newSongObjectUrl } = require("../function/newSongObjectUrl.js");
const {
  newSongObjectPlaylist
} = require("../function/newSongObjectPlaylist.js");
const { Rep } = require("../function/basicPlayFunction.js");

const getInfo = url =>
  new Promise((resolve, reject) => {
    youtube.getInfo(url, (err, video) => {
      if (err) {
        return reject(err);
      }
      return resolve(video);
    });
  });

const youtubeSearch = search =>
  new Promise((resolve, reject) => {
    ytsh(search, (err, result) => {
      if (err) {
        return reject(err);
      }
      return resolve(result);
    });
  });
/*
   # Comando para reproducir música, no funcionara si haces c&p ;)
 */
module.exports.play = async (client, message, busqueda) => {
  if (!client.music[message.guild.id]) {
    client.music[message.guild.id] = new playobject();
  }
  let music = client.music[message.guild.id];

  if (!message.member.voiceChannel)
    throw new Error(
      "El miembro autor del mensaje no se encuentra actualmente en un canal de voz."
    );

  if (!busqueda[0] && !music.rep)
    throw new Error(
      "El miembro autor del mensaje no proporciono un termino de busqueda, y actualmente no se esta reproduciendo nada."
    );
  if (music.rep) {
    if (!busqueda[0] && !music.dispatcher.paused)
      throw new Error(
        "El miembro autor del mensaje no proporciono un termino de busqueda."
      );
    if (!busqueda[0] && music.dispatcher.paused) {
      music.dispatcher.resume();
    }
    if (
      busqueda[0].match(
        /^(http(s)?:\/\/)?((w){3}.)?youtu(be|.be)?(\.com)?\/.+/i
      )
    ) {
      try {
        const { title } = await youtube.getInfo(busqueda[0]);
        const video = await youtubeSearch(
          title.normalize("NFD").replace(/[\u0300-\u036f]/g, "")
        );
      } catch (err) {
        throw new Error("El formato del video encontrado no cumple los requerimientos para poder reproducirse");
      }
      const song = await newSongObjectUrl(video, message, busqueda);
      music.queue.push(song);
      music.cur = song;
      return song;
    } else {
      try {
        const video = await youtubeSearch(
          busqueda
            .join(" ")
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
        );
      } catch (err) {
        throw new Error("El formato del video encontrado no cumple los requerimientos para poder reproducirse");
      }
      const song = await newSongObjectUrl(video, message, busqueda);
      music.queue.push(song);
      music.cur = song;
      return song;
    }
  } else {
    if (
      busqueda[0].match(
        /^https?:\/\/(www.youtube.com|youtube.com)\/playlist(.*)$/
      )
    ) {
      try {
        const videosInfo = await getInfo(busqueda[0]);
      } catch (err) {
        throw new Error("El formato del video encontrado no cumple los requerimientos para poder reproducirse");
      }
      const connection = await message.member.voiceChannel.join();
      await Rep(connection, client, message);
      return videosInfo.map(async video => {
        const song = await newSongObjectPlaylist(video, message, busqueda);
        music.queue.push(song);
        music.cur = song;
        return song;
      });
    } else {
      if (
        busqueda[0].match(
          /^(http(s)?:\/\/)?((w){3}.)?youtu(be|.be)?(\.com)?\/.+/i
        )
      ) {
        try {
          const { title } = await youtube.getInfo(busqueda[0]);
          const video = await youtubeSearch(
            title.normalize("NFD").replace(/[\u0300-\u036f]/g, "")
          );
        } catch (err) {
          throw new Error("El formato del video encontrado no cumple los requerimientos para poder reproducirse");
        }
        const song = await newSongObjectUrl(video, message, busqueda);
        const connection = await message.member.voiceChannel.join();
        music.queue.push(song);
        music.cur = song;
        await Rep(connection, client, message);
        return song;
      } else {
        try {
          const video = await youtubeSearch(
            busqueda
              .join(" ")
              .normalize("NFD")
              .replace(/[\u0300-\u036f]/g, "")
          );
        } catch (err) {
          throw new Error("El formato del video encontrado no cumple los requerimientos para poder reproducirse");
        }
        const song = await newSongObjectUrl(video, message, busqueda);
        music.queue.push(song);
        music.cur = song;
        music.queue.push(song);
        music.cur = song;
        const connection = await message.member.voiceChannel.join();
        await Rep(connection, client, message);
        return song;
      }
    }
  }
};