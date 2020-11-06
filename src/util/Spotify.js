let accessToken = '';
const clientID = '2f9debe56f334a06b1d87a74a6cda91f';
const redirectURI = "http://localhost:3000/";

const Spotify = {
    getAccessToken() {
        if (accesToken) { 
            return accesToken;
        }
        window.location = `https://accounts.spotify.com/authorize?client_id=${clientID}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectURI}`
        const url = window.location.href;
        const userAccessToken = url.match(/access_token=([^&]*)/);
        const expirationTime = url.match(/expires_in=([^&]*)/);
        if (userAccessToken && expirationTime) {
            accessToken = userAccessToken;
            const expiresIn = expirationTime;
            window.setTimeout(() => {
                accessToken = '';
            }, expiresIn * 1000);
            window.history.pushState('Access Token', null, '/');
        }
    },

    searchOnSuccess(response) {
        return response.items.map(track => {
            return {
                track: track.id,
                name: track.name,
                artist: track.artists[0].name,
                album: track.album.name,
                uri: track.uri
            }
        })
    },

    search(searchTerm) {
        const endpoint = 'https://api.spotify.com/v1/search?type=track&q=' + searchTerm;
        return fetch(endpoint, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        }).then(response => {
            if (response.ok) {
                return response.json();
            }
            throw new Error('Request failed!');
        }, networkError => {
            console.log(networkError.message)
        }).then(jsonResponse => {
            return this.searchOnSuccess(jsonResponse);
        })
    },

    savePlaylist = async (playlistName, trackURIs) => {
        if (!(name && trackURIs)) return;
        const userAccessToken = accessToken;
        const headers = { Authorization: 'Bearer ' + userAccessToken };
        let userID = '';
        let playlistID = '';
        try {
            const responseUserID = await fetch('https://api.spotify.com/v1/me', { headers: headers });
            if (responseUserID.ok) {
                const jsonResponse = await responseUserID.json();
                userID = jsonResponse.id;
            }

            let data = JSON.stringify({ name: playlistName });
            const responsePlaylist = await fetch(`https://api.spotify.com/v1/users/${userID}/playlists`, {
                method: 'POST',
                body: data,
                headers: {
                    Authorization: 'Bearer ' + userAccessToken,
                    'Content-Type': 'application/json'
                }
            });
            if (responsePlaylist.ok) {
                const jsonResponse = await responsePlaylist.json();
                playlistID = jsonResponse.id;
            }

            let tracksdata = JSON.stringify({ uris: trackURIs});
            const responsePlaylistcreated = await fetch(`https://api.spotify.com/v1/playlists/${playlistID}/tracks`, {
                method: 'POST',
                body: tracksdata,
                headers: {
                    Authorization: 'Bearer ' + userAccessToken,
                    'Content-Type': 'application/json'
                }
            });
            if (responsePlaylistcreated.ok) {
                const jsonResponse = await responsePlaylistcreated.json();
                playlistID = jsonResponse.snapshot_id;
            }    
        } catch(error) {
            console.log(error);
        }
    }
}

export default Spotify;