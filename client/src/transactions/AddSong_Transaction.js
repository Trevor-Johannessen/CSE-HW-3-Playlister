import jsTPS_Transaction from "../common/jsTPS.js"
import api from '../api'
import { useContext } from 'react'
import { GlobalStoreContext } from '../store'
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
    
    /*
    constructor(initID, initListLength, initSong, initIndex) {
        super();
        this.listID = initID;
        this.songInfo = initSong;
        this.index = initIndex;
        this.listLength = initListLength;
    }
    */

    constructor(initList, initStore) {
        super();
        this.list = initList;
        this.store = initStore
        //this.store = useContext(GlobalStoreContext);
    }

    // DELETE SONG AT GIVEN INDEX FROM LIST
    doTransaction() {
        this.list.songs.push({"title": "Untitled", "artist": "Unknown", "youTubeId": "yvjvLqfawpk"})
        this.store.setSongs(this.list)
    }
    
    undoTransaction() {
        console.log("UNDOING ADD TRANSACTION")
        this.list.songs.pop()
        console.log(this.list.songs.length)
        this.store.setSongs(this.list);
    }
}