import React from 'react';
import './App.css';
import axios from 'axios';
import SpotifyWebApi from 'spotify-web-api-js';
import ArtistCards from './ArtistCards';
import EventCards from './EventCards';
// import UpcomingShow from './UpcomingShows';
// import {
//   BrowserRouter as Router, 
//   Switch, 
//   Route,
//   Link
// } from "react-router-dom"


// EVENT AUTHORIZATION
const spotifyApi = new SpotifyWebApi() // Spotify API Library
function eventfulApiCall(artist) {
  let settings = {
    "headers": {
      "Accept": "application/json",
      "Content-Type": "application/json",
      "Authorization": "Bearer BQDCqShyDaeXc6p-5IWaW_H_ksdC2enSp18Y9H2jaAUz4m_gYNFzd-sV0HprYcI-a_FvyKUWygRYfogkBe2MDyIzk8OF8KQcChFBW0jxV_wU2D6QQilhuveqGhWR-q9L6yQCdTLM82JE00zAcYYuKQ_V6TlX-asmTR9_wRZjB-e_ZQYnoiUc7WJE0CjYow",
    }
  }
  const eventfulEndpoint = 'http://api.eventful.com/json/events/search?...&keywords=' // Eventful URL
  const appKey = 'CXHGMvbQBshRwpqL'
  const eventfulAddress = {url: `https://cors-anywhere.herokuapp.com/${eventfulEndpoint}${encodeURI(artist)}&app_key=${appKey}&date=future`, ...settings}
  return eventfulAddress
}


class App extends React.Component {
  constructor(props){
    super(props);
    // SPOTIFY AUTHORIZATION  
    const params = this._getHashParams(); // Token Object (access_token: & refresh_token:)
    const token = params.access_token; // Access Token
    const setAccessToken = this._setAccessToken(token); //Assigns Access Token to be used
    this.state = {
      loggedIn: token ? true : false, // Logged In Condition
      topTenArtist: [],
      artistEvents: []
    }
    console.log(token)
  }

  render() { 
    return (
      // <Router>
        <div className="App">
          <a href='http://localhost:8888' > Login to Spotify </a>
          {/* <li><Link to="/">Home</Link></li> */}
            <button onClick={this._getArtistEvents()}>Show artist events</button>
            <ArtistCards topTenArtist={this.state.topTenArtist}/>
            {/* <EventCards artistEvents={this.state.artistEvents} />
          */}
        </div>
        /* <Switch>
          <Route exact path='/'>
            <Home/>
          </Route>
        </Switch>
      </Router>  */
    );
  }

  componentDidMount() {
    this._getTopTenArtist()
 
  }
  

  _getTopTenArtist = () =>  {
    spotifyApi.getMyTopArtists()
      .then(response => {
        console.log(response)
        const topTenArtist = response.items.slice(0,10);
        this.setState({
          topTenArtist: topTenArtist
        })
      })
  }

  _getArtistEvents = () => {
    this.state.topTenArtist.map((artist) => {
      let artistName = artist.name
      console.log(artistName)
      console.log(eventfulApiCall(artistName))
      axios(eventfulApiCall(artistName)) 
      .then(response => {
        try {
          console.log(response)
          console.log(response.data.events.event)
          const artistEvents = response.data.events.event
          // this.setState({
          //   artistEvents: artistEvents
          // })
          console.log(this.state.artistEvents)
        }catch(e){
          console.log(e)
        }
      })
    })
  }

  // Sets the Access Token to be Used
  _setAccessToken(token) {
    if (token) {
      spotifyApi.setAccessToken(token);
    }
  }

  // Saves Access Token
  _getHashParams() {
    var hashParams = {};
    var e, r = /([^&;=]+)=?([^&;]*)/g,
        q = window.location.hash.substring(1);
    e = r.exec(q)
    while (e) {
       hashParams[e[1]] = decodeURIComponent(e[2]);
       e = r.exec(q);
    }
    return hashParams;
  }




}

export default App;
