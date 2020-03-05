import React from 'react';

class EventCards extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      imgExists: '',
      event:''
    }
  };
  
  render() {
    return (
      <div>
           <div className="modal pl-0 pr-0 fade" id="exampleModal" tabndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog pl-0 pr-0" role="document">
              <div className="modal-content pl-0 pr-0">
                <div className="modal-header">
                  <h5 className="modal-title" id="exampleModalLabel">{this.props.currentArtist}</h5>
                  <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div className="container text-center p-0 m-0">
                  {
                    this.props.currentArtistEvents.map((event,index) => {
                        return (
                           
                            event.image ?
                                <div className='row justify-content-center m-1 p-1 '>
                                        <div className='card event-card mt-3 mb-3 container text-center' >
                                        <div className='justify-content-center mt-3'> 
                                            <img className='event-card-img justify-self-center' src={event.image.medium.url } />

                                        </div>
                                            <div className='card-body'>
                                                <h5 className='card-title'>{event.title}</h5>
                                                <hr className='event-hr'/>
                                                <p className='card-text'>Venue: {event.venue_name}</p>
                                                <p className='card-text'>Address: {event.venue_address}</p>
                                                <p className='card-text'>Date: {event.start_time.slice(0,9)}</p>
                                                <div className='row'>
                                                    <div className='col-6'>
                                                        <button onClick={() => this.props.saveEvent(event)} className='btn save-event-btn btn-outline-light mt-3'>Save Event</button>
                                                    </div>
                                                    <div className='col-6'>
                                                        <a className='btn save-event-btn btn-outline-light mt-3' href={event.url}>Visit Event Page</a>
                                            
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                </div>
                            :
                            <div className='row justify-content-center m-1 p-1 '>
                                        <div className='card event-card mt-3 mb-3 ml-0 mr-0' >
                                        <div className='justify-content-center mt-3'> 
                                          <img className='event-card-img justify-self-center' src='/logo(2).png' />

                                        </div>
                                            <div className='card-body'>
                                                <h5 className='card-title'>{event.title}</h5>
                                                <hr className='event-hr'/>
                                                <p className='card-text'>Venue: {event.venue_name}</p>
                                                <p className='card-text'>Address: {event.venue_address}</p>
                                                <p className='card-text'>Date: {event.start_time.slice(0,9)}</p>
                                                <div className='row'>
                                                    <div className='col-6'>
                                                        <button onClick={() => this.props.saveEvent(event)} className='btn save-event-btn btn-outline-light mt-3'>Save Event</button>
                                                    </div>
                                                    <div className='col-6'>
                                                        <a className='btn save-event-btn btn-outline-light mt-3' href={event.url}>Visit Event Page</a>
                                            
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                </div>
                        )
                    })
                }
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                </div>
              </div>
            </div>
          </div>
      </div>
    );
}  

    _imgDoesExist(event) {
        if(event.image.medium.url) {
            this.setState({
                imgExists: true
            })
        }
    }
    _eventDoesExist(event) {
        if(this.state.event) {
            this.setState({
                event: event
            })
        }
    }
}

export default EventCards;