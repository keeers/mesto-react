import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import PopupWithForm from "./PopupWithForm";

const EditProfilePopup = ({ isOpen, onClose, onUpdateUser, isValid, onChange }) => {

    const [name, setName] = React.useState('');
    const [description, setDescription] = React.useState('');
    const currentUser = React.useContext(CurrentUserContext);

    // Рефы использованы для валидации, основное задание выполнено через управляемые компоненты //
    const nameRef = React.useRef();
    const descriptionRef = React.useRef();
    const nameMessage = React.useRef();
    const descriptionMessage = React.useRef();

    function handleSubmit(e) {
        e.preventDefault();
        onUpdateUser({
            name,
            about: description,
        });
    };

    function handleNameChange(e) {
        setName(e.target.value);
        const nameValidity = nameRef.current.validity.valid;
        const descriptionValidity = descriptionRef.current.validity.valid;
        nameValidity && descriptionValidity ? onChange(true) : onChange(false);
        nameValidity ? nameMessage.current.textContent = '' : nameMessage.current.textContent = e.target.validationMessage
    };

    function handleDescriptionChange(e) {
        setDescription(e.target.value);
        const nameValidity = nameRef.current.validity.valid;
        const descriptionValidity = descriptionRef.current.validity.valid;
        descriptionValidity && nameValidity ? onChange(true) : onChange(false);
        descriptionValidity ? descriptionMessage.current.textContent = '' : descriptionMessage.current.textContent = e.target.validationMessage
    };

    React.useEffect(() => {
        setName(currentUser.name);
        setDescription(currentUser.about);
    }, [currentUser]);

    return (
        <PopupWithForm type='edit-profile' name='editForm' title='Редактировать профиль' button='Сохранить' isOpen={isOpen} onClose={onClose} onSubmit={handleSubmit} isValid={isValid}>
            <div className="popup__section">
                <input type="text" className="popup__input popup__input_type_name" name="nameInput" placeholder="Имя"
                    required minLength="2" maxLength="40" value={name} ref={nameRef} onChange={handleNameChange} />
                {isValid ? <span className="popup__input-error" ref={nameMessage}></span> : <span className="popup__input-error popup__input-error_active" ref={nameMessage}></span>}
            </div>
            <div className="popup__section">
                <input type="text" className="popup__input popup__input_type_job" name="jobInput" ref={descriptionRef}
                    placeholder="Вид деятельности" required minLength="2" maxLength="200" value={description} onChange={handleDescriptionChange} />
                {isValid ? <span className="popup__input-error" ref={descriptionMessage}></span> : <span className="popup__input-error popup__input-error_active" ref={descriptionMessage}></span>}
            </div>
        </PopupWithForm>
    )
};

export default EditProfilePopup;