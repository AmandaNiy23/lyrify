
var express = require('express');
var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var cors = require('cors');
const fetch = require('isomorphic-fetch')
const axios = require("axios");

var mxm = require('./mxmScraper');

scraperRouter = express.Router();

scraperRouter.use(cors());

scraperRouter.get('/', (req, res, next) => {
  const songName = req.query.songName
  const artistName = req.query.artistName
  var lyrics


  mxm(songName, artistName, function(err, result){
    if(err){

      res.status(200).send({lyrics: 'No lyrics were found for this song'});
      return console.log(err);
    }

    lyrics = result.lyrics.split('\n')
    res.status(200).send({lyrics: lyrics});
  })

});


module.exports = scraperRouter;
