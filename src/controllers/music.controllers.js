const musicmodel = require('../models/music.model');
const jwt = require('jsonwebtoken');
const { uploadFile } = require('../services/storage.services');
const albumModel = require('../models/album.model');

async function createMusic(req, res) {


  const { title } = req.body;
  const file = req.file;

  if (!title) {
    return res.status(400).json({ message: "title is required" });
  }

  if (!file || !file.buffer) {
    return res.status(400).json({ message: "music file is required" });
  }

  const result = await uploadFile(file);

  const music = await musicmodel.create({
    uri: result.url,
    title,
    artist: req.user.id
  });
  console.log(result);
  res.status(201).json({
    message: "Music created successfully",
    music: {
      id: music._id,
      uri: music.uri,
      title: music.title,
      artist: music.artist
    }
  });
}

async function addMusicToAlbum(req, res) {
  
    const { title, musics } = req.body;

    const album = await albumModel.create({
      title,
      artist: req.user.id,
      musics: musics
    });
    res.status(201).json({
      message: "Music added to album successfully",
      album: {
        id: album._id,
        title: album.title,
        artist: album.artist,
        musics: album.musics
      }
    });
  }

async function getMusic(req, res) {
  const music = await musicmodel
  .find()
  .skip(1)
  .limit(2)
  .populate('artist', 'username');
  res.status(200).json({
    message: "Music fetched successfully",
    music: music
  });
}

async function getAlbums(req, res) {
  const albums = await albumModel.find().select('title artist').populate('artist', 'username');
  res.status(200).json({
    message: "Albums fetched successfully",
    albums: albums
  });
}

async function getAlbumById(req, res) {
  const { id } = req.params;
  const album = await albumModel.findById(id).populate('artist', 'username').populate('musics');
  return res.status(200).json({
    message: "Album fetched successfully",
    album: album
  });
}


module.exports = { createMusic, addMusicToAlbum, getMusic, getAlbums, getAlbumById };