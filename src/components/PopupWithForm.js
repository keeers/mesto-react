import React from "react";

function PopupWithForm(props) {
    return (
        props.isOpen &&
        <div className={`popup popup_type_${props.type} popup_is-opened`}>
            <form className="popup__container" name={props.name} noValidate>
                <button type="button" className="popup__close-btn" aria-label="Закрыть" onClick={props.onClose}></button>
                <h2 className="popup__title">{props.title}</h2>
                {props.children}
            </form>
        </div>
    );
};

export default PopupWithForm;