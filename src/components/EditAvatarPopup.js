import React from "react";
import PopupWithForm from "./PopupWithForm";

const EditAvatarPopup = ({ isOpen, onClose, onUpdateAvatar, isValid, onChange }) => {

    const avatarPopupRef = React.useRef();
    const spanMessage = React.useRef();



    function handleSubmit(e) {
        e.preventDefault();
        onUpdateAvatar({
            avatar: avatarPopupRef.current.value
        });

    };

    function handleChange() {
        const avatarValidity = avatarPopupRef.current.validity.valid;
        avatarValidity ? onChange(true) : onChange(false)
        avatarValidity ? spanMessage.current.textContent = '' : spanMessage.current.textContent = avatarPopupRef.current.validationMessage
    }

    return (
        <PopupWithForm type='edit-avatar' name='editAvatarForm' title='Обновить аватар' button='Сохранить' isOpen={isOpen} onClose={onClose} isValid={isValid} onSubmit={handleSubmit}>
            <div className="popup__section">
                <input type="url" ref={avatarPopupRef} className="popup__input popup__input_type_link" name="linkInput" required
                    placeholder="Ссылка на картинку" onChange={handleChange} />
                {isValid ? <span className="popup__input-error" ref={spanMessage}></span> : <span className="popup__input-error popup__input-error_active" ref={spanMessage}></span>}
            </div>
        </PopupWithForm>
    )
}

export default EditAvatarPopup;