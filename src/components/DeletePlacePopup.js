import React from "react";
import PopupWithForm from "./PopupWithForm";

const DeletePlacePopup = ({ isOpen, onClose, onCardDeleting, deletingCard }) => {

    function handleSubmit(e) {
        e.preventDefault();
        onCardDeleting(deletingCard);
    }

    return (
        <PopupWithForm type='delete-card' name='deleteCardForm' title='Вы уверены?' button='Да' isOpen={isOpen} onClose={onClose} onSubmit={handleSubmit}>
        </PopupWithForm>
    )
}

export default DeletePlacePopup;