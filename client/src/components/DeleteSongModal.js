import { useContext } from 'react'
import { GlobalStoreContext } from '../store';
import { useHistory } from 'react-router-dom'

function DeleteSongModal() {
    const { store } = useContext(GlobalStoreContext);
    const history = useHistory();
    
    //let name = store.currentList.songs;
    let name = ""
    return (
        <div 
            class="modal" 
            id="delete-song-modal" 
            data-animation="slideInOutLeft">
                <div class="modal-root" id='verify-delete-song-root'>
                    <div class="modal-north">
                        Delete song?
                    </div>
                    <div class="modal-center">
                        <div id="delete-song-modal-center" class="modal-center-content">
                            Are you sure you wish to permanently delete {name}?
                        </div>
                    </div>
                    <div class="modal-south">
                        <input type="button" 
                            id="delete-song-confirm-button" 
                            class="modal-button" 
                            onClick={deleteSongCallback}
                            value='Confirm' />
                        <input type="button" 
                            id="delete-song-cancel-button" 
                            class="modal-button" 
                            onClick={hideDeleteSongModalCallback}
                            value='Cancel' />
                    </div>
                </div>
        </div>
    );
}
export default DeleteSongModal;