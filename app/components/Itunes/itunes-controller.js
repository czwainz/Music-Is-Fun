import ItunesService from "./itunes-service.js";
import Song from "../../models/Song.js";

//PRIVATE

const itunesService = new ItunesService()

function drawSongs(songs) {
  console.log(songs)
  //YOUR CODING STARTS HERE
  let template = ''
  for (let i = 0; i < songs.length; i++) {
    let song = songs[i];
    template += `
      <div class="card text-center card-width">
        <img src="${song.albumArt}" class="card-img-top"/>
        <h3 class="card-title" style="text-shadow: 0px 0px 3px whitesmoke;"><strong>${song.title}</strong></h3>
        <h4 style="text-shadow: 0px 0px 3px grey;">${song.collection}</h4>
        <audio controls class="audio-width"><source src="${song.preview}" type="audio/ogg"></audio>
      </div>
      `
  }
  document.addEventListener('play', function (event) {
    let audios = document.getElementsByTagName('audio');
    for (let i = 0; i < audios.length; i++) {
      if (audios[i] != event.target) {
        audios[i].pause();
      }
    }
  }, true);
  document.getElementById('songs').innerHTML = template
}


//PUBLIC
class ItunesController {
  //DO NOT MODIFY THIS METHOD
  getMusic(e) {
    e.preventDefault();
    var artist = e.target.artist.value;
    //changes the button to loading while songs load
    $('#get-music-button').text('LOADING...');
    itunesService.getMusicByArtist(artist).then(results => {
      drawSongs(results)
      //changes button back to GET MUSIC once songs are loaded
      $('#get-music-button').text('GET MUSIC');
    })
  }


}


export default ItunesController