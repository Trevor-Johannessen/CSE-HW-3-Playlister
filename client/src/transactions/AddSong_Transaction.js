import jsTPS_Transaction from "../common/jsTPS.js"
import api from '../api'
/**
 * DeleteSong_Transaction
 * 
 * This class represents a transaction that works with deleting a song. 
 * It will be managed by the transaction stack.
 * 
 * @author McKilla Gorilla
 * @author ?
 */
export default class AddSong_Transaction extends jsTPS_Transaction {
    
    constructor(initID, initSong, initIndex) {
        super();
        this.listID = initID 
        this.songInfo = initSong
        this.index = initIndex
    }

    // DELETE SONG AT GIVEN INDEX FROM LIST
    doTransaction() {
        async function asyncCreateNewSong(id, songInfo){
            if(!songInfo){songInfo = {"title": "Untitled", "artist": "Unknown", "youTubeId": "yvjvLqfawpk"}} 
            let response = await api.postSong(id, songInfo)
            console.log(response)
        }
        asyncCreateNewSong(this.listID, this.songInfo);
    }
    
    // RESTORE DELETED SONG AT LAST KNOWN INDEX
    undoTransaction() {
        console.log("UNDOING ADD TRANSACTION")
        //this.app.deleteSong(this.app.state.currentList.songs.length-1)
    }
}