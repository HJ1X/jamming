import React, { useState } from 'react';
import './App.css';
import SearchBar from "../SearchBar/SearchBar";
import SearchResults from "../SearchResults/SearchResults";
import Playlist from "../Playlist/Playlist";

function App(props) {
    const [searchResults, setSearchResults] = useState([
        {
            name: 'Ek Tarfa-Reprise',
            artist: 'Darshan Raval',
            album: 'Ek Tarfa',
            id: 'bla'
        },
        {
            name: 'Ek Tarfa',
            artist: 'Darshan Raval',
            album: 'Ek Tarfa',
            id: 'bla-bla'
        }
    ]);
    const [playlistName, setPlaylistName] = useState('HJ');
    const [playlistTracks, setPlaylistTracks] = useState([
        {
            name: 'Ek Tarfa-Reprise',
            artist: 'Darshan Raval',
            album: 'Ek Tarfa',
            id: 'bla'
        },
        {
            name: 'Ek Tarfa HJ',
            artist: 'Darshan Raval',
            album: 'Ek Tarfa',
            id: 'bla-bla'
        }
    ])

    return (
        <div>
            <h1>Ja<span className="highlight">mmm</span>ing</h1>
            <div className="App">
                <SearchBar />
                <div className="App-playlist">
                    <SearchResults searchResults={searchResults}/>
                    <Playlist playlistName={playlistName} playlistTracks={playlistTracks} />
                </div>
            </div>
        </div>
    );
}

export default App;