import React from 'react';
import './App.css';
import axios from 'axios';
import SpotifyWebApi from 'spotify-web-api-js';
import ArtistCards from './ArtistCards';
import EventCards from './EventCards';
import SavedEvents from './SavedEvents';
import Nav from './Nav';
import Landing from './Landing'

import {
  BrowserRouter as Router, 

  Switch, 
  Route,
  Link
} from "react-router-dom"


// EVENT AUTHORIZATION

function eventfulApiCall(artist) {
  let settings = {
    "headers": {
      "Accept": "application/json",
      "Content-Type": "application/json",
      "Authorization": "Bearer BQDCqShyDaeXc6p-5IWaW_H_ksdC2enSp18Y9H2jaAUz4m_gYNFzd-sV0HprYcI-a_FvyKUWygRYfogkBe2MDyIzk8OF8KQcChFBW0jxV_wU2D6QQilhuveqGhWR-q9L6yQCdTLM82JE00zAcYYuKQ_V6TlX-asmTR9_wRZjB-e_ZQYnoiUc7WJE0CjYow",
    }
  }
  const eventfulEndpoint = 'http://api.eventful.com/json/events/search?...&keywords=' // Eventful URL
  const appKey = 'cBZcx4Cp3XN4MsBc'
  const eventfulAddress = {url: `https://cors-anywhere.herokuapp.com/${eventfulEndpoint}${encodeURI(artist)}&app_key=${appKey}&date=future`, ...settings}
  return eventfulAddress
}

const spotifyApi = new SpotifyWebApi() // Spotify API Library



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
      currentArtist: '',
      currentArtistEvents: [],
      isLoaded: '',
      savedEvents: []
    }
    console.log(token)
  }

  render() { 
    return (
          this.state. loggedIn ?
            <Router>
              <div className="App">
                <Nav links={['Home','Profile','Contact']}/>
                <div className='container'>
                  <h1 className='page-header m-4 mb-0 ml-0 pl-0  pb-0 text-left'>YOUR TOP ARTIST</h1>
                  <hr className="hr mb-4"/>
                </div>
                  <ArtistCards topTenArtist={this.state.topTenArtist} artistEvents={this._getArtistEvents}/>
                  <EventCards currentArtist={this.state.currentArtist} currentArtistEvents={this.state.currentArtistEvents} isLoaded={this.state.isLoaded} saveEvent={this._saveEvent}/>
                <div className='container'>
                  <h1 className='page-header m-4 mb-0 mt-4 ml-0 pl-0 pb-0 text-left'>EVENTS YOU'VE LIKED</h1>
                  <hr className="hr mb-4"/>
                </div>
                <div className="default-saved-events">
                    <SavedEvents savedEvents={this.state.savedEvents}/>
                </div>
              </div>
            </Router>  
            :
            <div className='image-wrapper'>
              <Nav links={['Home','Profile','Contact']}/>
              <Landing/>
            </div>
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

  _getArtistEvents = (artist) => {
    let artistName = artist.name
    this.setState({
      currentArtist: artistName,
      currentArtistEvents: []
    }, () => {
      console.log(this.state.currentArtist)
      axios(eventfulApiCall(artistName)) 
      .then(response => {
        try {
          console.log(response)
          console.log(response.data.events.event)
          let currentArtistEvents = response.data.events.event.slice(0,5);
          this.setState({
            ...this.state,
            isLoaded: true,
            currentArtistEvents: currentArtistEvents
          }, () => {
            console.log(this.state.currentArtistEvents)
          })
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

  _saveEvent = (event) => {
    const savedEvents = this.state.savedEvents;
    this.setState({
      savedEvents: savedEvents.concat(event)
    }, () => {
      console.log(this.state.savedEvents)
    })
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