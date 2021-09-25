import React from "react";

const Card = ({ link, name, likes, onDeleteCard, onCardClick }) => {
    function handleClick() {
        onCardClick({ cardLink: link, cardName: name })
    }
    return (
        <article className="card">
            <img className="card__image" src={link} alt="Фото места" onClick={handleClick} />
            <button type="button" aria-label="Удалить" className="card__delete-btn" onClick={onDeleteCard}></button>
            <div className="card__rectangle">
                <h2 className="card__title">{name}</h2>
                <div className="card__like-section">
                    <button type="button" aria-label="Нравится" className="card__like-btn"></button>
                    <p className="card__like">{likes.length}</p>
                </div>
            </div>
        </article>
    );
};

export default Card;