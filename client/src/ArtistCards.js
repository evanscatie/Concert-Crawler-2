import React from 'react';

class ArtistCards extends React.Component {
  constructor(props){
    super(props);
    // Not needed, since you're only working off of props.
    // this.state = {
      // names: '',
    // }
  };
  
  render() {
    return (
      <div>
        {
          this.props.topTenArtist.map((artist,index) => {
            return (
              <div>
                <img src={artist.images[1].url}/>
                <p key={artist.id}>{artist.name}</p>
              </div>
            )
          })
        }
      </div>
    );
  }  
}

export default ArtistCards;
