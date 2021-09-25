import './App.css';
import React from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';

function App() {

  const [isEditProfilePopupOpen, setEditProfile] = React.useState(false);
  const [isAddPlacePopupOpen, setAddPlace] = React.useState(false);
  const [isEditAvatarPopupOpen, setEditAvatar] = React.useState(false);
  const [isDeletePopupOpen, setDeleteCard] = React.useState(false)
  const [isImagePopupOpen, setImagePopup] = React.useState(false)
  const [selectedCard, setSelectedCard] = React.useState({ cardLink: '', cardName: '' })

  function handleEditAvatarClick() {
    setEditAvatar(true);
  };

  function handleEditProfileClick() {
    setEditProfile(true);
  };

  function handleAddPlaceClick() {
    setAddPlace(true)
  };

  function handleDeleteCardClick() {
    setDeleteCard(true)
  };

  function handleCardClick(card) {
    setImagePopup(true)
    setSelectedCard({ cardLink: card.cardLink, cardName: card.cardName })
  }

  function closeAllPopups() {
    document.querySelector('.popup_is-opened').classList.remove('popup_is-opened');
    setAddPlace(false);
    setEditProfile(false);
    setEditAvatar(false);
    setDeleteCard(false);
    setImagePopup(false);
    setSelectedCard({ cardLink: '', cardName: '' })
  }

  return (
    <div className="page">

      <Header />
      <Main onEditProfile={handleEditProfileClick} onAddPlace={handleAddPlaceClick} onEditAvatar={handleEditAvatarClick} onDeleteCard={handleDeleteCardClick} onCardClick={handleCardClick} />
      <PopupWithForm type='edit-profile' name='editForm' title='Редактировать профиль' isOpen={isEditProfilePopupOpen} onClose={closeAllPopups}>
        <div className="popup__section">
          <input type="text" className="popup__input popup__input_type_name" name="nameInput" placeholder="Имя"
            required minLength="2" maxLength="40" />
          <span className="popup__input-error nameInput-error"></span>
        </div>
        <div className="popup__section">
          <input type="text" className="popup__input popup__input_type_job" name="jobInput"
            placeholder="Вид деятельности" required minLength="2" maxLength="200" />
          <span className="popup__input-error jobInput-error"></span>
        </div>
        <button type="submit" className="popup__save-btn popup__save-btn_type_edit">Сохранить</button>
      </PopupWithForm>
      <PopupWithForm type='add-card' name='addForm' title='Новое место' isOpen={isAddPlacePopupOpen} onClose={closeAllPopups}>
        <div className="popup__section">
          <input type="text" className="popup__input popup__input_type_title" name="titleInput"
            placeholder="Название" required minLength="2" maxLength="30" />
          <span className="popup__input-error titleInput-error"></span>
        </div>
        <div className="popup__section">
          <input type="url" className="popup__input popup__input_type_link" name="linkInput" required
            placeholder="Ссылка на картинку" />
          <span className="popup__input-error linkInput-error"></span>
        </div>
        <button type="submit" className="popup__save-btn popup__save-btn_type_add">Создать</button>
      </PopupWithForm>
      <PopupWithForm type='edit-avatar' name='editAvatarForm' title='Обновить аватар' isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups}>
        <div className="popup__section">
          <input type="url" className="popup__input popup__input_type_link" name="linkInput" required
            placeholder="Ссылка на картинку" />
          <span className="popup__input-error linkInput-error"></span>
        </div>
        <button type="submit" className="popup__save-btn popup__save-btn_type_edit-avatar">Сохранить</button>
      </PopupWithForm>
      <PopupWithForm type='delete-card' name='deleteCardForm' title='Вы уверены?' isOpen={isDeletePopupOpen} onClose={closeAllPopups}>
        <button type="submit" className="popup__save-btn popup__save-btn_type_delete-card">Да</button>
      </PopupWithForm>
      <ImagePopup card={selectedCard} isOpen={isImagePopupOpen} onClose={closeAllPopups} />
      <Footer />

    </div>
  );
}

export default App;
