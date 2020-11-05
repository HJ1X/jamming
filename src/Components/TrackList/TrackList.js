import React from 'react';
import Track from '../Track/Track';
import './TrackList.css';

class TrackList extends React.Component {
    render() {
        return (
            <div className="TrackList">
                <ul>
                {this.props.tracks.map(track => {
                    return (
                        <li key={track.id}>
                            <Track onAdd={this.props.onAdd} track={track} />
                        </li>
                    )
                })}
                </ul>
            </div>
        )
    }
}

export default TrackList