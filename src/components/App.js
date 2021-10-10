import React from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import ImagePopup from './ImagePopup';
import api from '../utils/api';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import DeletePlacePopup from './DeletePlacePopup';

function App() {

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isDeletePopupOpen, setIsDeletePopupOpen] = React.useState(false)
  const [isImagePopupOpen, setIsImagePopupOpen] = React.useState(false)
  const [selectedCard, setSelectedCard] = React.useState({ cardLink: '', cardName: '' })
  const [currentUser, setCurrentUser] = React.useState({})
  const [initialCards, setCards] = React.useState([]);
  const [deletingCard, setDeletingCard] = React.useState('');
  const [isInputsValid, setIsInputsValid] = React.useState(false)

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
    setIsInputsValid(false)
  };

  function toggleValidity(validity) {
    setIsInputsValid(validity);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
    setIsInputsValid(true)
  };

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
    setIsInputsValid(false);
  };

  function handleDeleteCardClick(id) {
    setIsDeletePopupOpen(true);
    setDeletingCard(id);
  };

  function handleCardClick(card) {
    setIsImagePopupOpen(true);
    setSelectedCard({ cardLink: card.cardLink, cardName: card.cardName });
  };

  function handleUpdateUser(userData) {
    api.setUserInfo(userData).then(() => {
      userData.avatar = currentUser.avatar;
      setCurrentUser(userData);
      setIsEditProfilePopupOpen(false);
    }).catch(err => console.log(err));
  };

  function handleUpdateAvatar(userData) {
    api.setAvatar(userData.avatar).then(() => {
      userData.name = currentUser.name;
      userData.about = currentUser.about;
      setCurrentUser(userData);
      setIsEditAvatarPopupOpen(false);
    }).catch(err => console.log(err));
  };

  function handleAddPlaceSubmit(newCard) {
    api.addNewCard(newCard).then((data) => {
      newCard._id = data._id;
      newCard.owner = data.owner;
      newCard.likes = data.likes;
      setCards([newCard, ...initialCards]);
      setIsAddPlacePopupOpen(false);
    }).catch(err => console.log(err));
  };

  function handleCardLike({ likes, id }) {
    const isLiked = likes.some((user) => user._id === currentUser._id);
    api.changeLikeCardStatus(id, isLiked).then((newCard) => {
      setCards((state) => state.map((c) => c._id === id ? newCard : c));
    }).catch(err => console.log(err));
  };

  function handleCardDeleting(id) {
    api.deleteCard(id).then(() => {
      const updatedCards = initialCards.filter((card) => {
        return card._id !== id
      });
      setCards(updatedCards);
      setIsDeletePopupOpen(false);
      setDeletingCard('');
    }).catch(err => console.log(err));
  };

  function closeAllPopups() {
    setIsAddPlacePopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsDeletePopupOpen(false);
    setIsImagePopupOpen(false);
    setSelectedCard({ cardLink: '', cardName: '' })
  };

  React.useEffect(() => {
    Promise.all([api.getUserInfo(), api.getInitialCards()])
      .then(([data, initialCards]) => {
        setCurrentUser(data)
        setCards(initialCards);
      }).catch(err => console.log(err));
  }, [])

  return (
    <div className="page">
      <CurrentUserContext.Provider value={currentUser}>
        <Header />
        <Main onEditProfile={handleEditProfileClick} onAddPlace={handleAddPlaceClick} onEditAvatar={handleEditAvatarClick} onDeleteCard={handleDeleteCardClick} onCardClick={handleCardClick} initialCards={initialCards} onCardLike={handleCardLike} />
        <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} isValid={isInputsValid} onChange={toggleValidity} />
        <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar} isValid={isInputsValid} onChange={toggleValidity} />
        <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddPlace={handleAddPlaceSubmit} isValid={isInputsValid} onChange={toggleValidity} />
        <DeletePlacePopup isOpen={isDeletePopupOpen} onClose={closeAllPopups} onCardDeleting={handleCardDeleting} deletingCard={deletingCard} />
        <ImagePopup card={selectedCard} isOpen={isImagePopupOpen} onClose={closeAllPopups} />
        <Footer />
      </CurrentUserContext.Provider>

    </div>
  );
}

export default App;
