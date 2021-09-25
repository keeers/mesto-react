import React from "react";

const PopupWithForm = ({ type, name, title, isOpen, onClose, children }) => {
    return (
        isOpen &&
        <div className={`popup popup_type_${type} popup_is-opened`}>
            <form className="popup__container" name={name} noValidate>
                <button type="button" className="popup__close-btn" aria-label="Закрыть" onClick={onClose}></button>
                <h2 className="popup__title">{title}</h2>
                {children}
            </form>
        </div>
    );
};

export default PopupWithForm;