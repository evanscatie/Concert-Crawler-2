import React from 'react';

class SavedEvents extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      currentArtist: '',
    }
  };
  
  render() {
    return (
    <div className='container-fluid ml-4 mt-5'>
      <div className='row saved-events-row flex-row flex-nowrap overflow-auto'>
        {
          this.props.savedEvents.map((event,index) => {
            return (
                event.image ?
                <div className='col-4 d-flex align-items-stretch'>
                    <div className='card saved-event-card card-block'>
                    <div className='justify-content-center mt-3'> 
                        <img className='event-card-img justify-self-center' src={event.image.medium.url } />
                    </div>
                        <div className='card-body'>
                            <h5 className='card-title'>{event.title}</h5>
                            <hr className='event-hr'/>
                            <p className='card-text'>Venue: {event.venue_name}</p>
                            <p className='card-text'>Address: {event.venue_address}</p>
                            <p className='card-text'>Date: {event.start_time.slice(0,9)}</p>
                        </div>
                        <div>
                            <a className='btn save-event-btn btn-outline-light mb-3' href={event.url}>Visit Event Page</a>        

                        </div>
                    </div>
                </div>
                :
                <div className='col-4 d-flex align-items-stretch'>
                <div className='card saved-event-card card-block'>
                <div className='justify-content-center mt-3'> 
                    <img className='event-card-img justify-self-center' src='/logo(2).png' />
                </div>
                <div className='card-body'>
                    <h5 className='card-title'>{event.title}</h5>
                    <hr className='event-hr'/>
                    <p className='card-text'>Venue: {event.venue_name}</p>
                    <p className='card-text'>Address: {event.venue_address}</p>
                    <p className='card-text'>Date: {event.start_time.slice(0,10)}</p>
                </div>
                <div>
                    <a className='btn save-event-btn btn-outline-light mb-3' href={event.url}>Visit Event Page</a>        

                </div>
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

  

export default SavedEvents;