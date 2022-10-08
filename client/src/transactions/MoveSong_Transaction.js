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
export default class MoveSong_Transaction extends jsTPS_Transaction {

    constructor(initList, initSrc, initDest, initStore) {
        super();
        this.list = initList;
        this.store = initStore
        this.src = initSrc;
        this.dest = initDest;
    }


    // DELETE SONG AT GIVEN INDEX FROM LIST
    doTransaction() {
        let song = this.list.songs[this.src];
        this.list.songs.splice(this.src, 1)
        this.list.songs.splice(this.dest, 0, song)
        this.store.setSongs(this.list)
    }
    
    undoTransaction() {
        let song = this.list.songs[this.dest];
        this.list.songs.splice(this.dest, 1)
        this.list.songs.splice(this.src, 0, song)
        this.store.setSongs(this.list)
    }
}