import React, { Component } from 'react';
import axios from 'axios'

const Context = React.createContext()

const reducer = (state, action) => {
    switch(action.type) {
        case 'SEARCH_TRACKS':
            return {
                ...state,
                track_list: action.payload,
                heading: 'Search Results'
            };
        default:
            return state
    }
}

const API_KEY = 'f7dee72b6598e1a4a35f452d35a9ecfa'

export class Provider extends Component {
    state = { 
        track_list: [],
        heading: 'Top 10 Tracks',
        dispatch: action => this.setState(state => reducer(state, action))
    }

    // getTracks = async(event) => {
    //      event.preventDefault()

    //      const api_call = await fetch(`
    //      https://cors-anywhere.herokuapp.com/https://api.musixmatch.com/ws/1.1/chart.tracks.get?chart_name=top&page=1&page_size=10&country=vi&f_has_lyrics=1&apikey=${process.env.API_KEY}
    //      `)
    //      const data = await api_call.json()
    //      this.setState({
    //          track_list: data
    //      })
    //      console.log(this.state.track_list)
    // }

    componentDidMount() {
        axios
            .get(
                `https://cors-anywhere.herokuapp.com/https://api.musixmatch.com/ws/1.1/chart.tracks.get?chart_name=top&page=1&page_size=10&country=vi&f_has_lyrics=1&apikey=${
                    API_KEY
                }`)
            .then (res => {
                this.setState({
                    track_list: res.data.message.body.track_list
                })
            })
            .catch(err => {
                console.log(err)
            })
    }

    render() { 
        return ( 
            <Context.Provider value={this.state} >
                {this.props.children}
            </Context.Provider>
        );
    }
}
 
export const Consumer = Context.Consumer