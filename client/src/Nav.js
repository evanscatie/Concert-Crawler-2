import React from 'react';


class Nav extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            isOpen: true,
        };

    }
    
    render() {
        return (
            this.state.isOpen ?
                <div className='list-group'>
                    <nav class="navbar navbar-sticky-top navbar-expand-lg navbar-light bg-transparent">
			            <a class="navbar-brand" href="/profile">
                            <img
                                className='logo'
                                height="50"
                                width="50"
                                src="/logo(2).png"
                            />
			            </a>
                        <button
                            class="navbar-toggler"
                            type="button"
                            data-toggle="collapse"
                            data-target="#navbarNav"
                            aria-controls="navbarNav"
                            aria-expanded="false"
                            aria-label="Toggle navigation"
                        >
                            <span class="navbar-toggler-icon"></span>
                        </button>
                        <div class="collapse navbar-collapse justify-content-end">
                            <ul class="navbar-nav">
                                {
                                    this.props.links.map((link, index) => {
                                        return (
                                            <li onClick={this._toggleMenu} className='nav-item list-group-item m-2 bg-transparent' key={index}>
                                                {link}
                                            </li>
                                        )
                                    })
                                }
                            </ul>
                        </div>
                    </nav>
                   
                </div>
                :
                <a onClick={this._toggleMenu}>test</a>
        

        );
    }
}


export default Nav;