import React, { Component } from 'react';
import {Consumer} from '../../context'
import Spinner from '../layout/Spinner'
import Track from '../tracks/Track'


class Tracks extends Component {
    render() { 
        return (  
            <Consumer>
                {value => {
                    if (value.track_list === undefined 
                        || value.track_list.length === 0) {
                        return <Spinner />
                    } else {
                        return (
                            <>
                                <h3 className='text-center mb-4'>{value.heading}</h3>
                                <div className='row'>
                                    {value.track_list.map((item) => (
                                        <Track key={item.track.track_id} track={item.track} />
                                    ))}
                                </div>
                            </>
                        )
                    }
                }}
            </Consumer>
        );
    }
}
 
export default Tracks;