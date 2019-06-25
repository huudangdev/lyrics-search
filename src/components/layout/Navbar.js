import React, { Component } from 'react';

class Navbar extends Component {
    state = {  }
    render() { 
        return ( 
            <nav className='navbar navbar-dark bg-dark'>
                <span className='navbar-brand mb-0 h1 mx-auto'>
                    Lyrics Finder
                </span>
            </nav>
        );
    }
}
 
export default Navbar;