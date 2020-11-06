import React, { useState } from 'react';
import './App.css';
import SearchBar from "../SearchBar/SearchBar";
import SearchResults from "../SearchResults/SearchResults";
import Playlist from "../Playlist/Playlist";
import Spotify from '../../util/Spotify';

function App(props) {
    const [searchResults, setSearchResults] = useState([]);
    const [playlistName, setPlaylistName] = useState();
    const [playlistTracks, setPlaylistTracks] = useState([])

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

    const savePlaylist = async () => {
        const trackURIs = playlistTracks.map(track => track.uri);
        await Spotify.savePlaylist(playlistName, trackURIs);
        setPlaylistName('New Playlist');
        setPlaylistTracks([]);
    }

    const search = async (searchTerm) => {
        const tracks = await Spotify.search(searchTerm);
        setSearchResults(tracks);
    }

    return (
        <div>
            <h1>Ja<span className="highlight">mmm</span>ing</h1>
            <div className="App">
                <SearchBar onSearch={search} />
                <div className="App-playlist">
                    <SearchResults onAdd={addTrack} searchResults={searchResults}/>
                    <Playlist onRemove={removeTrack} onNameChange={updatePlaylistName} onSave={savePlaylist} playlistTracks={playlistTracks} />
                </div>
            </div>
        </div>
    );
}

export default App;