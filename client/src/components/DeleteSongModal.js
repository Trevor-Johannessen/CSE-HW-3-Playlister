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
                            Are you sure you wish to permanently delete {(store.currentList && store.songForDeletion != null && store.songForDeletion>=0) ? store.currentList.songs[store.songForDeletion].title : ""}
                        </div>
                    </div>
                    <div class="modal-south">
                        <input type="button" 
                            id="delete-song-confirm-button" 
                            class="modal-button" 
                            onClick={store.createDeleteSongTransaction}
                            value='Confirm' />
                        <input type="button" 
                            id="delete-song-cancel-button" 
                            class="modal-button" 
                            onClick={store.hideDeleteSongModal}
                            value='Cancel' />
                    </div>
                </div>
        </div>
    );
}
export default DeleteSongModal;