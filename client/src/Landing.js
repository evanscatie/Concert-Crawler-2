import React from 'react';

class Landing extends React.Component {
  constructor(props){
    super(props);
    this.state = {
    }
  };
  
  render() {
    return (
        <div class="container-fluid home-main-container">
            <div class="row home-main-content col-12">  
                <div class="col-12">
                    <h1 class="display-4">
                        See concerts by the artists you love!
                    </h1>
                </div>
                <div class="col-12">
                    <p class="lead">
                    Login with Spotify to see performances scheduled for your top artist.
                    </p>
                </div>
                <div class="col-12">
                    <a href='http://localhost:8888/login' class="btn btn-outline-light upcoming-shows-btn">
                        LOGIN WITH SPOTIFY
                    </a>
                </div>
            </div>
        </div>
    
    );
  }
}

  

export default Landing;