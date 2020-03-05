class ArtistCards extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      currentArtist: '',
    }
  };
  
  render() {
    return (
      <div className='container-fluid ml-4 mb-5'>
       <div className='row artist-row flex-row flex-nowrap overflow-auto'>
        {
          this.props.topTenArtist.map((artist,index) => {
            return (
              <div className='col-4'>
                <div className='card artist-card card-block'>
                  <img className='img-card rounded-circle p-2' src={artist.images[1].url}/>
                  <p className='artist-name' key={artist.id}>{artist.name}</p>
                  <button className='btn btn-outline-light m-3 upcoming-shows-btn' data-toggle="modal" data-target="#exampleModal" onClick={() => this.props.artistEvents(artist)}>View upcoming shows</button>
                </div>
              </div>
        
            )
          })
        }
        </div>
      </div>
    );

  }  
  
}

export default ArtistCards;