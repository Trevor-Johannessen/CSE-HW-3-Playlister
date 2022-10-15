import { useContext, useCallback, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import SongCard from './SongCard.js'
import { GlobalStoreContext } from '../store'
/*
    This React component lets us edit a loaded list, which only
    happens when we are on the proper route.
    
    @author McKilla Gorilla
*/
function PlaylistCards() {
    const { store } = useContext(GlobalStoreContext);
    store.history = useHistory();


    useEffect(() => {
        document.addEventListener("keydown", handleKeyDown)
        //document.addEventListener("keydown", handleKeyDown)
        
        return () => {
            document.removeEventListener("keydown", handleKeyDown)
        };
    }, [store]);
    

    const handleKeyDown = useCallback((event) => {
        if(!store.modalActive){
            if(event.ctrlKey && (event.key === "z" || event.key ==="Z")){
                console.log("Undoing")
                store.undo()
            }else if (event.ctrlKey && (event.key === "y" || event.key ==="Y")){
                console.log("Redoing")
                store.redo()
            }
        }
    }, []);
    
    if(!store.currentList){
        store.history.push("/")
        return null;
    }

    return (
        <div id="playlist-cards">
        {
            store.currentList.songs.map((song, index) => (
                <SongCard
                    id={'playlist-song-' + (index)}
                    key={'playlist-song-' + (index)}
                    index={index}
                    song={song}
                />
            ))
        }
        </div>
    )
}

export default PlaylistCards;