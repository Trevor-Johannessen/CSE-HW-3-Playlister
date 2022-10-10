import React, { useContext, useState } from 'react'
import { GlobalStoreContext } from '../store'



function SongCard(props) {
    const { store } = useContext(GlobalStoreContext);

    const { song, index } = props;

    let handleDelete = () => {
        store.showDeleteSongModal(index)
        //store.createDeleteSongTransaction(index);
    }

    let handleDragStart = (event) => {
        console.log("Drag Start")
        event.dataTransfer.setData("song", event.target.id);
    }
    let handleDrop = (event) => {
        console.log("Hit Drop")
        event.preventDefault();
        let target = event.target;
        let targetId = target.id;
        targetId = targetId.substring(target.id.indexOf("-") + 1);
        let sourceId = event.dataTransfer.getData("song");
        sourceId = sourceId.substring(sourceId.indexOf("-") + 1);

        console.log(`IDs:\nTargetID = ${targetId}\nSourceID = ${sourceId}`)

        // ASK THE MODEL TO MOVE THE DATA
        if(sourceId !== targetId)
            store.createMoveSongTransaction(Number(sourceId[0]), Number(targetId[0])) // id: 2-song -> 2
    }

    let cardClass = "list-card unselected-list-card";
    return (
        <div
            key={index}
            id={'song-' + index + '-card'}
            className={cardClass}
            onDragStart={handleDragStart}
            onDragOver={(e) => {
                e.stopPropagation();
                e.preventDefault();
            }}
            onDrop={handleDrop}
            draggable="true"
        >
            {index + 1}.
            <a
                id={'song-' + index + '-link'}
                className="song-link"
                href={"https://www.youtube.com/watch?v=" + song.youTubeId}>
                {song.title} by {song.artist}
            </a>
            <input
                type="button"
                id={"remove-song-" + index}
                className="list-card-button"
                onClick={handleDelete}
                value={"\u2715"}
            />
        </div>
    );
}

export default SongCard;