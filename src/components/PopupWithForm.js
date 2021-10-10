import React from "react";

const PopupWithForm = ({ type, name, title, button, isOpen, onClose, onSubmit, isValid, children }) => {
    return (
        isOpen &&
        <div className={`popup popup_type_${type} popup_is-opened`}>
            <form className="popup__container" name={name} noValidate onSubmit={onSubmit}>
                <button type="button" className="popup__close-btn" aria-label="Закрыть" onClick={onClose}></button>
                <h2 className="popup__title">{title}</h2>
                {children}
                {isValid ? <button type="submit" className="popup__save-btn">{button}</button> : <button type="submit" className="popup__save-btn popup__save-btn_disabled" disabled={true}>{button}</button>}
            </form>
        </div>
    );
};

export default PopupWithForm;