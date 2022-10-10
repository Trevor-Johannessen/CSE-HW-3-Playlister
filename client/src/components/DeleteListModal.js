import { useContext } from 'react'
import { GlobalStoreContext } from '../store';
import { useHistory } from 'react-router-dom'

function DeleteListModal() {

    const { store } = useContext(GlobalStoreContext);
    const history = useHistory();


    return (
        <div 
            className="modal" 
            id="delete-list-modal" 
            data-animation="slideInOutLeft">
                <div class="modal-root" id='verify-delete-list-root'>
                    <div class="modal-north">
                        Delete playlist?
                    </div>
                    <div class="modal-center">
                        <div class="modal-center-content" id="delete-modal-text">
                            Are you sure you wish to permanently delete the {store.currentList ? store.currentList.name : ""} playlist?
                        </div>
                    </div>
                    <div class="modal-south">
                        <input type="button" 
                            id="delete-list-confirm-button" 
                            className="modal-button" 
                            onClick={store.deleteList}
                            value='Confirm' />
                        <input type="button" 
                            id="delete-list-cancel-button" 
                            className="modal-button" 
                            onClick={store.hideDeleteListModal}
                            value='Cancel' />
                    </div>
                </div>
        </div>
    );
}

export default DeleteListModal;