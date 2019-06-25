import React, { Component } from 'react';
import { Consumer } from '../../context'

const API_KEY = 'f7dee72b6598e1a4a35f452d35a9ecfa'

class Search extends Component {
    state = { 
        trackTitle: ''
    }

    onChange(event) {
        this.setState({
            trackTitle: event.target.value
        })
    }

    findTrack = async(dispatch, event) => {
        event.preventDefault()
        const url = `
        https://cors-anywhere.herokuapp.com/http://api.musixmatch.com/ws/1.1/track.search?q_track=${this.state.trackTitle}&page_size=10&page=1&s_track_rating=desc
        &apikey=${API_KEY}`
        const call_api = await fetch(url)
        const data = await call_api.json()
        dispatch(
            {
                type: 'SEARCH_TRACKS',
                payload: data.message.body.track_list
            }
        )
        this.setState({
            trackTitle: ''
        })
    }

    render() { 
        return (
            <Consumer>
                { value => {
                    const { dispatch } = value
                    return (
                        <div className='card card-body mb-4 p-4'>
                            <h1 className='display-4 text-center'>
                                <i className='fas fa-music'/> Search for a song
                            </h1>
                            <p className='lead text-center'>
                                Get the lyrics for any song
                            </p>
                            <form onSubmit={this.findTrack.bind(this, dispatch)}>
                                <div className='form-group'>
                                    <input type='text' 
                                        className='form-control form-control-lg'
                                        placeholder='Song title...'
                                        name='trackTilte'
                                        value={this.state.trackTitle}
                                        onChange={this.onChange.bind(this)}
                                    />
                                <button className='btn btn-primary btn-lg btn-block mb-5' type='submit'>
                                    Get Track Lyrics
                                </button>
                                </div>
                            </form>
                        </div>
                    )
                }}
            </Consumer>
        );
    }
}
 
export default Search;