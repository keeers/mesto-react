import React from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';

function App() {

  const [isEditProfilePopupOpen, setIsEditProfile] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isDeletePopupOpen, setIsDeletePopupOpen] = React.useState(false)
  const [isImagePopupOpen, setIsImagePopupOpen] = React.useState(false)
  const [selectedCard, setSelectedCard] = React.useState({ cardLink: '', cardName: '' })

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  };

  function handleEditProfileClick() {
    setIsEditProfile(true);
  };

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true)
  };

  function handleDeleteCardClick() {
    setIsDeletePopupOpen(true)
  };

  function handleCardClick(card) {
    setIsImagePopupOpen(true)
    setSelectedCard({ cardLink: card.cardLink, cardName: card.cardName })
  }

  function closeAllPopups() {
    setIsAddPlacePopupOpen(false);
    setIsEditProfile(false);
    setIsEditAvatarPopupOpen(false);
    setIsDeletePopupOpen(false);
    setIsImagePopupOpen(false);
    setSelectedCard({ cardLink: '', cardName: '' })
  }

  return (
    <div className="page">

      <Header />
      <Main onEditProfile={handleEditProfileClick} onAddPlace={handleAddPlaceClick} onEditAvatar={handleEditAvatarClick} onDeleteCard={handleDeleteCardClick} onCardClick={handleCardClick} />
      <PopupWithForm type='edit-profile' name='editForm' title='Редактировать профиль' button='Сохранить' isOpen={isEditProfilePopupOpen} onClose={closeAllPopups}>
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
      </PopupWithForm>
      <PopupWithForm type='add-card' name='addForm' title='Новое место' button='Создать' isOpen={isAddPlacePopupOpen} onClose={closeAllPopups}>
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
      </PopupWithForm>
      <PopupWithForm type='edit-avatar' name='editAvatarForm' title='Обновить аватар' button='Сохранить' isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups}>
        <div className="popup__section">
          <input type="url" className="popup__input popup__input_type_link" name="linkInput" required
            placeholder="Ссылка на картинку" />
          <span className="popup__input-error linkInput-error"></span>
        </div>
      </PopupWithForm>
      <PopupWithForm type='delete-card' name='deleteCardForm' title='Вы уверены?' button='Да' isOpen={isDeletePopupOpen} onClose={closeAllPopups}>
      </PopupWithForm>
      <ImagePopup card={selectedCard} isOpen={isImagePopupOpen} onClose={closeAllPopups} />
      <Footer />

    </div>
  );
}

export default App;
