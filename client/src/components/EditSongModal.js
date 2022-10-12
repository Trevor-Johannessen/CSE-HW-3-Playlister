import { useContext } from 'react'
import { GlobalStoreContext } from '../store';
import { useHistory } from 'react-router-dom'

function EditSongModal(){
    const { store } = useContext(GlobalStoreContext);
    const history = useHistory();
        return (
            <div 
                className={"modal"} 
                id="edit-song-modal" 
                data-animation="slideInOutLeft">
                    <div class="modal-root" id='verify-edit-song-root'>
                        <div class="modal-north">
                            Edit song?
                        </div>
                        <div class="modal-center">
                            <div id='edit-modal-body' class="modal-center-content">
                                
                                <label class="edit-label">Title:</label>
                                <input type="text" id="title" class="textbox"></input>
                                <label class="edit-label">Artist:</label>
                                <input type="text" id="artist" class="textbox"></input>
                                <label class="edit-label">Url:</label>
                                <input type="text" id="url" class="textbox"></input>

                            </div>
                        </div>
                        <div class="modal-south">
                            <input type="button" 
                                id="edit-song-confirm-button" 
                                class="modal-button" 
                                onClick={() => store.createEditSongTransaction({"title": document.getElementById("title").value, "artist": document.getElementById("artist").value, "youTubeId": document.getElementById("url").value})}
                                value='Confirm' />
                            <input type="button" 
                                id="edit-song-cancel-button" 
                                class="modal-button" 
                                onClick={store.hideEditSongModal}
                                value='Cancel' />
                        </div>
                    </div>
            </div>
        );
    }

export default EditSongModal;