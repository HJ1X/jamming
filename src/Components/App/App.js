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

    const addTrack = track => {
        if (playlistTracks.find(savedTracks => savedTracks.id === track.id)) {
            return;
        }
        setPlaylistTracks(prevtracks => [...prevtracks, track]);
    }

    const removeTrack = track => {
        let newPlayList = playlistTracks.filter(savedtrack => savedtrack.id !== track.id);
        setPlaylistTracks(newPlayList);
    }

    const updatePlaylistName = name => {
        setPlaylistName(name);
    }

    const savePlaylist = () => {
        const trackURIs = playlistTracks.map(track => track.uri);
    }

    return (
        <div>
            <h1>Ja<span className="highlight">mmm</span>ing</h1>
            <div className="App">
                <SearchBar />
                <div className="App-playlist">
                    <SearchResults onAdd={addTrack} searchResults={searchResults}/>
                    <Playlist onRemove={removeTrack} onNameChange={updatePlaylistName} onSave={savePlaylist} playlistTracks={playlistTracks} />
                </div>
            </div>
        </div>
    );
}

export default App;