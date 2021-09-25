import React from "react";
import api from "../utils/api";
import Card from "./Card";

const Main = ({ onEditProfile, onAddPlace, onEditAvatar, onDeleteCard, onCardClick }) => {

    const [userName, setUserName] = React.useState('');
    const [userDescription, setUserDescription] = React.useState('');
    const [userAvatar, setUserAvatar] = React.useState('');
    const [initialCards, setCards] = React.useState([]);

    React.useEffect(() => {
        Promise.all([api.getInitialCards(), api.getUserInfo()]).then(([initialCards, userData]) => {
            setUserName(userData.name);
            setUserDescription(userData.about);
            setUserAvatar(userData.avatar);
            setCards(initialCards);
        }).catch(err => console.log(err));

    }, [])

    return (
        <main className="content">
            <section className="profile">
                <div className="profile__avatar-box" onClick={onEditAvatar}>
                    <img className="profile__avatar" src={userAvatar}
                        alt="Аватар пользователя" />
                </div>
                <div className="profile__info">
                    <div>
                        <h1 className="profile__name">{userName}</h1>
                        <p className="profile__job">{userDescription}</p>
                    </div>
                    <button type="button" aria-label="Изменить" className="profile__edit-btn" onClick={onEditProfile}></button>
                </div>
                <button type="button" aria-label="Добавить" className="profile__add-btn" onClick={onAddPlace}></button>
            </section>
            <section className="cards">
                {initialCards.map(({ _id, link, name, likes }) => (
                    <Card key={_id} link={link} name={name} likes={likes} onDeleteCard={onDeleteCard} onCardClick={onCardClick} />
                ))}
            </section>
        </main>
    );
};

export default Main;