import React from "react";
import PopupWithForm from "./PopupWithForm";

const AddPlacePopup = ({ isOpen, onClose, onAddPlace, isValid, onChange }) => {

    const nameRef = React.useRef();
    const linkRef = React.useRef();
    const nameMessage = React.useRef();
    const linkMessage = React.useRef();

    function handleSubmit(e) {
        e.preventDefault();
        onAddPlace({ name: nameRef.current.value, link: linkRef.current.value });
    };

    function handleChange() {
        const nameValidity = nameRef.current.validity.valid;
        const linkValidity = linkRef.current.validity.valid;
        nameValidity && linkValidity ? onChange(true) : onChange(false)
        nameValidity ? nameMessage.current.textContent = '' : nameMessage.current.textContent = nameRef.current.validationMessage
        linkValidity ? linkMessage.current.textContent = '' : linkMessage.current.textContent = linkRef.current.validationMessage
    }

    return (
        <PopupWithForm type='add-card' name='addForm' title='Новое место' button='Создать' isOpen={isOpen} onClose={onClose} onSubmit={handleSubmit} isValid={isValid}>
            <div className="popup__section">
                <input type="text" className="popup__input popup__input_type_title" name="titleInput"
                    placeholder="Название" required minLength="2" maxLength="30" ref={nameRef} onChange={handleChange} />
                {isValid ? <span className="popup__input-error" ref={nameMessage}></span> : <span className="popup__input-error popup__input-error_active" ref={nameMessage}></span>}
            </div>
            <div className="popup__section">
                <input type="url" className="popup__input popup__input_type_link" name="linkInput" required
                    placeholder="Ссылка на картинку" ref={linkRef} onChange={handleChange} />
                {isValid ? <span className="popup__input-error" ref={linkMessage}></span> : <span className="popup__input-error popup__input-error_active" ref={linkMessage}></span>}
            </div>
        </PopupWithForm>
    )
}

export default AddPlacePopup;