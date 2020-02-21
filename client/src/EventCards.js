import React from 'react';

class EventCards extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      event: '',
    }
  };
  
  render() {
    return (
      <div>
        {
            
          this.props.artistEvents.map((event,index) => {
              this._eventDoesExist(event)
            return (
              <div>
                  <img src={event.image.medium.url}/>
                  <ul>
                    <li>{event.title}</li>
                    <li>{event.venue_name}</li>
                    <li>{event.venue_address}</li>
                    <a href={event.url}>View Show Link</a>
                  </ul>
              </div>
            )
          })
        }
      </div>
    );
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