import { createContext, useState } from 'react'
import jsTPS from '../common/jsTPS'
import api from '../api'

// OUR TRANSACTIONS
import AddSong_Transaction from '../transactions/AddSong_Transaction';
import DeleteSong_Transaction from '../transactions/DeleteSong_Transaction';
import MoveSong_Transaction from '../transactions/MoveSong_Transaction';
import EditSong_Transaction from '../transactions/EditSong_Transaction';



export const GlobalStoreContext = createContext({});
/*
    This is our global data store. Note that it uses the Flux design pattern,
    which makes use of things like actions and reducers. 
    
    @author McKilla Gorilla
*/



// THESE ARE ALL THE TYPES OF UPDATES TO OUR GLOBAL
// DATA STORE STATE THAT CAN BE PROCESSED
export const GlobalStoreActionType = {
    CHANGE_LIST_NAME: "CHANGE_LIST_NAME",
    CLOSE_CURRENT_LIST: "CLOSE_CURRENT_LIST",
    CREATE_NEW_LIST: "CREATE_NEW_LIST",
    LOAD_ID_NAME_PAIRS: "LOAD_ID_NAME_PAIRS",
    SET_CURRENT_LIST: "SET_CURRENT_LIST",
    SET_LIST_NAME_EDIT_ACTIVE: "SET_LIST_NAME_EDIT_ACTIVE",
    CREATE_NEW_SONG : "CREATE_NEW_SONG",
    SET_SONGS: "SET_SONGS",
    MARK_LIST_FOR_DELETION: "MARK_LIST_FOR_DELETION",
    DELETE_LIST: "DELETE_LIST",
    MARK_SONG_FOR_DELETION: "MARK_SONG_FOR_DELETION",
    UNMARK_SONG: "UNMARK_SONG",
    MARK_SONG_FOR_EDIT: "MARK_SONG_FOR_EDIT"
}

// WE'LL NEED THIS TO PROCESS TRANSACTIONS
const tps = new jsTPS();

// WITH THIS WE'RE MAKING OUR GLOBAL DATA STORE
// AVAILABLE TO THE REST OF THE APPLICATION
export const useGlobalStore = () => {
    // THESE ARE ALL THE THINGS OUR DATA STORE WILL MANAGE
    const [store, setStore] = useState({
        idNamePairs: [],
        currentList: null,
        newListCounter: 0,
        listNameActive: false,
        songForDeletion: null,
        modalActive: false
    });

    // HERE'S THE DATA STORE'S REDUCER, IT MUST
    // HANDLE EVERY TYPE OF STATE CHANGE
    const storeReducer = (action) => {
        const { type, payload } = action;
        switch (type) {
            // LIST UPDATE OF ITS NAME
            case GlobalStoreActionType.CHANGE_LIST_NAME: {
                return setStore({
                    idNamePairs: payload.idNamePairs,
                    currentList: null,
                    newListCounter: store.newListCounter,
                    listNameActive: false,
                    songForDeletion: null,
                    modalActive: false
                });
            }
            // STOP EDITING THE CURRENT LIST
            case GlobalStoreActionType.CLOSE_CURRENT_LIST: {
                return setStore({
                    idNamePairs: store.idNamePairs,
                    currentList: null,
                    newListCounter: store.newListCounter,
                    listNameActive: false,
                    songForDeletion: null,
                    modalActive: false
                })
            }
            // CREATE A NEW LIST
            case GlobalStoreActionType.CREATE_NEW_LIST: {
                console.log("Trying to create new list")
                return setStore({
                    idNamePairs: store.idNamePairs,
                    currentList: payload,
                    newListCounter: store.newListCounter + 1,
                    listNameActive: false,
                    songForDeletion: null,
                    modalActive: false
                })
            }
            case GlobalStoreActionType.DELETE_LIST: {
                store.idNamePairs = store.idNamePairs.filter((i) => i._id !== payload)
                return setStore({
                    idNamePairs: store.idNamePairs,
                    currentList: null,
                    newListCounter: store.newListCounter - 1,
                    listNameActive: false,
                    songForDeletion: null,
                    modalActive: false
                })
            }
            case GlobalStoreActionType.MARK_LIST_FOR_EDIT: {
                return setStore({
                    idNamePairs: store.idNamePairs,
                    currentList: store.currentList,
                    newListCounter: store.newListCounter,
                    listNameActive: false,
                    songForDeletion: payload,
                    modalActive: false
                })
            }
            case GlobalStoreActionType.EDIT_LIST: {
                return setStore({
                    idNamePairs: store.idNamePairs,
                    currentList: payload,
                    newListCounter: store.newListCounter,
                    listNameActive: false,
                    songForDeletion: null,
                    modalActive: false
                })
            }
            case GlobalStoreActionType.CREATE_NEW_SONG: {
                return setStore({
                    idNamePairs: store.idNamePairs,
                    currentList: payload,
                    newListCounter: store.newListCounter,
                    listNameActive: false,
                    songForDeletion: null,
                    modalActive: false
                })
            }
            case GlobalStoreActionType.SET_SONGS: {
                return setStore({
                    idNamePairs: store.idNamePairs,
                    currentList: payload,
                    newListCounter: store.newListCounter,
                    listNameActive: false,
                    songForDeletion: null,
                    modalActive: false
                })
            }
            // GET ALL THE LISTS SO WE CAN PRESENT THEM
            case GlobalStoreActionType.LOAD_ID_NAME_PAIRS: {
                return setStore({
                    idNamePairs: payload,
                    currentList: null,
                    newListCounter: store.newListCounter,
                    listNameActive: false,
                    songForDeletion: null,
                    modalActive: false
                });
            }
            // PREPARE TO DELETE A LIST
            case GlobalStoreActionType.MARK_LIST_FOR_DELETION: {
                return setStore({
                    idNamePairs: store.idNamePairs,
                    currentList: payload,
                    newListCounter: store.newListCounter,
                    listNameActive: false,
                    modalActive: true
                });
            }
            // UPDATE A LIST
            case GlobalStoreActionType.SET_CURRENT_LIST: {
                return setStore({
                    idNamePairs: store.idNamePairs,
                    currentList: payload,
                    newListCounter: store.newListCounter,
                    listNameActive: false,
                    songForDeletion: null,
                    modalActive: false
                });
            }
            // START EDITING A LIST NAME
            case GlobalStoreActionType.SET_LIST_NAME_EDIT_ACTIVE: {
                return setStore({
                    idNamePairs: store.idNamePairs,
                    currentList: payload,
                    newListCounter: store.newListCounter,
                    listNameActive: true,
                    songForDeletion: null,
                    modalActive: false
                });
            }
            case GlobalStoreActionType.MARK_SONG_FOR_DELETION: {
                return setStore({
                    idNamePairs: store.idNamePairs,
                    currentList: store.currentList,
                    newListCounter: store.newListCounter,
                    listNameActive: false,
                    songForDeletion: payload,
                    modalActive: true
                })
            }
            case GlobalStoreActionType.MARK_SONG_FOR_EDIT: {
                return setStore({
                    idNamePairs: store.idNamePairs,
                    currentList: store.currentList,
                    newListCounter: store.newListCounter,
                    listNameActive: false,
                    songForDeletion: payload,
                    modalActive: true
                })
            }
            case GlobalStoreActionType.UNMARK_SONG: {
                return setStore({
                    idNamePairs: store.idNamePairs,
                    currentList: store.currentList,
                    newListCounter: store.newListCounter,
                    listNameActive: false,
                    songForDeletion: null,
                    modalActive: false
                })
            }
            default:
                return store;
        }
    }
    // THESE ARE THE FUNCTIONS THAT WILL UPDATE OUR STORE AND
    // DRIVE THE STATE OF THE APPLICATION. WE'LL CALL THESE IN 
    // RESPONSE TO EVENTS INSIDE OUR COMPONENTS.

    // THIS FUNCTION PROCESSES CHANGING A LIST NAME
    store.changeListName = function (id, newName) {
        // GET THE LIST
        async function asyncChangeListName(id) {
            let response = await api.getPlaylistById(id);
            if (response.data.success) {
                let playlist = response.data.playlist;
                playlist.name = newName;
                async function updateList(playlist) {
                    response = await api.updatePlaylistById(playlist._id, playlist);
                    if (response.data.success) {
                        async function getListPairs(playlist) {
                            response = await api.getPlaylistPairs();
                            if (response.data.success) {
                                let pairsArray = response.data.idNamePairs;
                                storeReducer({
                                    type: GlobalStoreActionType.CHANGE_LIST_NAME,
                                    payload: {
                                        idNamePairs: pairsArray,
                                        playlist: playlist
                                    }
                                });
                            }
                        }
                        getListPairs(playlist);
                    }
                }
                updateList(playlist);
            }
        }
        if(newName)
            asyncChangeListName(id);
    }

    // THIS FUNCTION PROCESSES CLOSING THE CURRENTLY LOADED LIST
    store.closeCurrentList = function () {
        storeReducer({
            type: GlobalStoreActionType.CLOSE_CURRENT_LIST,
            payload: {}
        });
        tps.clearAllTransactions();
        document.getElementById("undo-button").setAttribute("class", "playlister-button-disabled")
        document.getElementById("redo-button").setAttribute("class", "playlister-button-disabled")
    }

    store.createNewList = function (newList) {
        async function asyncCreateNewList(newList){
            storeReducer({
                type: GlobalStoreActionType.CREATE_NEW_LIST,
                payload: {...newList}
            })
            let response = await api.postPlaylist({"name": "Untitled Playlist", "songs": []});
            console.log("ID = " + response.data.playlist._id)
            store.setCurrentList(response.data.playlist._id)
        }
        asyncCreateNewList(newList);
    }

    store.createAddSongTransaction = function () {
        //let transaction = new AddSong_Transaction(store.currentList._id, store.currentList.songs.length, songInfo);
        let transaction = new AddSong_Transaction(store.currentList, store);
        tps.addTransaction(transaction);    
    }

    store.createDeleteSongTransaction = function () {
        let transaction = new DeleteSong_Transaction(store.currentList, store, store.songForDeletion)
        tps.addTransaction(transaction);

        store.hideDeleteSongModal();
    }

    store.createMoveSongTransaction = function (sourceId, targetId) {
        let transaction = new MoveSong_Transaction(store.currentList, sourceId, targetId, store);
        tps.addTransaction(transaction)
    }

    store.setSongs = function (newList) {
        async function asyncSetSong(id, newList){
            let response = await api.postSong(id, newList.songs)
            if(response.status === 200){
                console.log(response.data)
            }
        }
        
        asyncSetSong(store.currentList._id, newList);
        console.log("Setting current list to " + JSON.stringify(newList))
        console.log("Newlists.songs = " + newList.songs)
        storeReducer({
            type: GlobalStoreActionType.SET_SONGS,
            payload: {...newList}
        }) 
    }

    store.showDeleteListModal = function (id) {
        document.getElementById("undo-button").setAttribute("class", "playlister-button-disabled")
        document.getElementById("redo-button").setAttribute("class", "playlister-button-disabled")
        async function asyncMarkList(id) {
            let response = await api.getPlaylistById(id);
            if (response.data.success) {
                let playlist = response.data.playlist;

                if (response.data.success) {
                    storeReducer({
                        type: GlobalStoreActionType.MARK_LIST_FOR_DELETION,
                        payload: playlist
                    });
                }
                let modal = document.getElementById("delete-list-modal");
                modal.classList.add("is-visible");
            }
        }
        asyncMarkList(id);
    }

    store.refreshUndoRedo = function(){
        if(tps.hasTransactionToRedo())
            document.getElementById("redo-button").setAttribute("class", "playlister-button")
        else{
            document.getElementById("redo-button").setAttribute("class", "playlister-button-disabled")
        }
        if(tps.hasTransactionToUndo())
            document.getElementById("undo-button").setAttribute("class", "playlister-button")
        else{
            document.getElementById("undo-button").setAttribute("class", "playlister-button-disabled")
        }
    }
    
    store.hideDeleteListModal= function () {
        store.refreshUndoRedo();
        let modal = document.getElementById("delete-list-modal");
        modal.classList.remove("is-visible");
        storeReducer({
            type: GlobalStoreActionType.CLOSE_CURRENT_LIST,
        });
    }


    store.deleteList = function () {
        // MAY NEED TO USE STORE REDUCER HERE TO REFRESH THE PAGE
        async function asyncDeleteList(id){
            let response = await api.deletePlaylist(id)
            console.log(`Success = ${response.data.success}`)
            storeReducer({
                type: GlobalStoreActionType.DELETE_LIST,
                payload: id
            });
        }
        asyncDeleteList(store.currentList._id)
        store.hideDeleteListModal()
    }


    store.showDeleteSongModal = function (id) {
        document.getElementById("undo-button").setAttribute("class", "playlister-button-disabled")
        document.getElementById("redo-button").setAttribute("class", "playlister-button-disabled")
        console.log("ID = " + id)
        storeReducer({
            type: GlobalStoreActionType.MARK_SONG_FOR_DELETION,
            payload: id
        });
        let modal = document.getElementById("delete-song-modal");
        modal.classList.add("is-visible");
    }

    store.hideDeleteSongModal = function() {
        store.refreshUndoRedo();
        let modal = document.getElementById("delete-song-modal");
        modal.classList.remove("is-visible");
        storeReducer({
            type: GlobalStoreActionType.UNMARK_SONG,
        });
    }

    
    store.showEditSongModal = function(id) {
        document.getElementById("undo-button").setAttribute("class", "playlister-button-disabled")
        document.getElementById("redo-button").setAttribute("class", "playlister-button-disabled")
        storeReducer({
            type: GlobalStoreActionType.MARK_SONG_FOR_EDIT,
            payload: id
        });

        document.getElementById("title").value=store.currentList.songs[id].title;
        document.getElementById("artist").value=store.currentList.songs[id].artist;
        document.getElementById("url").value=store.currentList.songs[id].youTubeId;

        let modal = document.getElementById("edit-song-modal");
        modal.classList.add("is-visible");
    }

    store.hideEditSongModal = function() {
        store.refreshUndoRedo();
        let modal = document.getElementById("edit-song-modal");
        modal.classList.remove("is-visible");
        storeReducer({
            type: GlobalStoreActionType.UNMARK_SONG,
        });
    }

    store.createEditSongTransaction = function(newSong) {
        let transaction = new EditSong_Transaction(store.currentList, store, store.songForDeletion, newSong)
        tps.addTransaction(transaction);

        store.hideEditSongModal();
    }

    // THIS FUNCTION LOADS ALL THE ID, NAME PAIRS SO WE CAN LIST ALL THE LISTS
    store.loadIdNamePairs = function () {
        async function asyncLoadIdNamePairs() {
            const response = await api.getPlaylistPairs();
            if (response.data.success) {
                let pairsArray = response.data.idNamePairs;
                storeReducer({
                    type: GlobalStoreActionType.LOAD_ID_NAME_PAIRS,
                    payload: pairsArray
                });
            }
            else {
                console.log("API FAILED TO GET THE LIST PAIRS");
            }
        }
        asyncLoadIdNamePairs();
    }

    store.setCurrentList = function (id) {
        async function asyncSetCurrentList(id) {
            let response = await api.getPlaylistById(id);
            if (response.data.success) {
                let playlist = response.data.playlist;

                if (response.data.success) {
                    storeReducer({
                        type: GlobalStoreActionType.SET_CURRENT_LIST,
                        payload: playlist
                    });
                    store.history.push("/playlist/" + playlist._id);
                }
            }
        }
        asyncSetCurrentList(id);
    }

    store.setIsListNameEditActive = function() {
        storeReducer({
            type: GlobalStoreActionType.SET_LIST_NAME_EDIT_ACTIVE
        });
    }

    store.getPlaylistSize = function() {
        return store.currentList.songs.length;
    }
    store.undo = function () {
        tps.undoTransaction();
    }
    store.redo = function () {
        tps.doTransaction();
    }

    // THIS FUNCTION ENABLES THE PROCESS OF EDITING A LIST NAME
    store.setlistNameActive = function () {
        storeReducer({
            type: GlobalStoreActionType.SET_LIST_NAME_EDIT_ACTIVE,
            payload: null
        });
    }

    // THIS GIVES OUR STORE AND ITS REDUCER TO ANY COMPONENT THAT NEEDS IT
    return { store, storeReducer };
}