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
export default class DeleteSong_Transaction extends jsTPS_Transaction {

    constructor(initList, initStore, initIndex) {
        super();
        this.list = initList;
        this.store = initStore
        this.index = initIndex
        this.deletedSong = this.list.songs[this.index]
    }

    // DELETE SONG AT GIVEN INDEX FROM LIST
    doTransaction() {
        this.list.songs.splice(this.index, 1)
        this.store.setSongs(this.list)
    }
    
    undoTransaction() {
        console.log("UNDOING DELETE TRANSACTION")
        this.list.songs.splice(this.index, 0, this.deletedSong)
        this.store.setSongs(this.list);
    }
}