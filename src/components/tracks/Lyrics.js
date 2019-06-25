import React, { Component } from 'react';
import axios from 'axios'
import { Link } from 'react-router-dom'

import Spinner from '../layout/Spinner'

const API_KEY = 'f7dee72b6598e1a4a35f452d35a9ecfa'

class Lyrics extends Component {
    state = { 
        track: {},
        lyrics: {}
    }

    componentDidMount() {
        axios
            .get(
                `https://cors-anywhere.herokuapp.com/https://api.musixmatch.com/ws/1.1/track.lyrics.get?track_id=${this.props.match.params.id}
                &apikey=${
                    API_KEY
                }`)
            .then (res => {
                this.setState({
                    lyrics: res.data.message.body.lyrics
                })
                return axios
                .get(
                    `https://cors-anywhere.herokuapp.com/https://api.musixmatch.com/ws/1.1/track.get?track_id=
                    ${this.props.match.params.id}
                    &apikey=${
                        API_KEY
                    }`)
                .then(res => {
                    this.setState({
                        track: res.data.message.body.track
                    })
                    //console.log(this.state.track)
                })
            })
            .catch(err => {
                console.log(err)
            })
    }

    render() { 
        const { track , lyrics } = this.state
        if (track === undefined ||
            lyrics === undefined ||
            Object.keys(lyrics).length === 0 ||
            Object.keys(track).length === 0) {
            return <Spinner/>
        } else {
            return <>
                <Link to='/' className='btn btn-dark btn-sm mb-4'>Go Home</Link>
                <div className='card'>
                    <h5 className='card-header'>
                        {track.track_name} by  
                        <span className='text-secondary'>
                            {track.artist_name}
                        </span>
                    </h5>
                    <div className='card-body'>
                        <p className='card-text'>
                            {lyrics.lyrics_body}
                        </p>
                    </div>
                </div>
                <ul className='list-group mt-3'>
                    <li className='list-group-item'>
                        <strong>Album ID</strong>: {track.album_id}
                    </li>
                    <li className='list-group-item'>
                        <strong>Explicit Words</strong>: 
                        {track.explicit === 0 ? ' No' : ' Yes'}
                    </li>
                    <li className='list-group-item'>
                        <strong>Release Date</strong>: 
                        {track.updated_time}
                    </li>

                </ul>
            </>
        }
        
    }
}
 
export default Lyrics;