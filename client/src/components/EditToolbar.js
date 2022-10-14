import { useContext } from 'react'
import { GlobalStoreContext } from '../store'
import { useHistory } from 'react-router-dom'
/*
    This toolbar is a functional React component that
    manages the undo/redo/close buttons.
    
    @author McKilla Gorilla
*/
function EditToolbar() {
    const { store } = useContext(GlobalStoreContext);
    const history = useHistory();

    let enabledButtonClass = "playlister-button";

    function handleUndo() {
        store.undo();
    }
    function handleRedo() {
        store.redo();
    }
    function handleClose() {
        console.log("Handle Close Print Statement")
        history.push("/");
        store.closeCurrentList();
    }
    function handleAdd() {
        if(!store.currentList){ // LOGIC FOR ADDING NEW LIST
            store.createNewList();
        }else{ // LOGIC FOR ADDING NEW SONG
            store.createAddSongTransaction();
        }

    }
    let editStatus = false;
    if (store.isListNameEditActive) {
        editStatus = true;
    }

    let addButton = "playlister-button"
    let closeButton = "playlister-button"
    if(!store.currentList || store.modalActive){
        closeButton += "-disabled"
    }
    if(store.modalActive){
        addButton += "-disabled"
    }

    return (
        <span id="edit-toolbar">
            <input
                type="button"
                id='add-song-button'
                disabled={editStatus}
                value="+"
                className={addButton}
                onClick={handleAdd}
            />
            <input
                type="button"
                id='undo-button'
                disabled={editStatus}
                className="playlister-button-disabled"
                value="⟲"
                //className={enabledButtonClass}
                onClick={handleUndo}
            />
            <input
                type="button"
                id='redo-button'
                disabled={editStatus}
                className="playlister-button-disabled"
                value="⟳"
                //className={enabledButtonClass}
                onClick={handleRedo}
            />
            <input
                type="button"
                id='close-button'
                disabled={editStatus}
                value="&#x2715;"
                className={closeButton}
                onClick={handleClose}
            />
        </span>);
}

export default EditToolbar;