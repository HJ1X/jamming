import SearchBar from "../Components/SearchBar/SearchBar";

accessToken = '';
clientID = '2f9debe56f334a06b1d87a74a6cda91f';
redirectURI = "http://localhost:3000/";

Spotify = {
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
                authorization: `Bearer ${accessToken}`
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
    }
}

export default Spotify;