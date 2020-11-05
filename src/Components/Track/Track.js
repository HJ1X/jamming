import React from 'react';
import './Track.css';

class Track extends React.Component {
    renderAction() {
        return isRemoval ? '-' : '+';
    }

    render() {
        return (
            <div className="Track">
                <div className="Track-information">
                    <h3>Ek Tarfa</h3>
                    <p>Darshan Raval | Ek Tarfa</p>
                </div>
                <button className="Track-action">+</button>
            </div>
        )
    }
}

export default Track;