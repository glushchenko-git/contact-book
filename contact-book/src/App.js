import React, { useState } from 'react';
import './App.css';

function App() {
  // Состояние для хранения списка контактов
  const [contacts, setContacts] = useState([]);
  // Состояние для полей ввода новой формы
  const [newContact, setNewContact] = useState({ name: '', phone: '' });

  // Обработчик изменения полей ввода
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewContact({ ...newContact, [name]: value });
  };

  // Обработчик добавления нового контакта
  const handleAddContact = () => {
    // Базовая валидация
    if (newContact.name.trim() === '' || newContact.phone.trim() === '') {
      alert('Пожалуйста, заполните все поля.');
      return;
    }

    // Добавляем контакт в список
    setContacts([...contacts, { ...newContact, id: Date.now() }]); // Используем timestamp как уникальный id
    // Очищаем поля ввода
    setNewContact({ name: '', phone: '' });
  };

  // Обработчик удаления контакта
  const handleDeleteContact = (id) => {
    setContacts(contacts.filter(contact => contact.id !== id));
  };

  return (
    <div className="app">
      <h1>📒 Книга контактов</h1>

      {/* Форма для добавления нового контакта */}
      <div className="contact-form">
        <input
          type="text"
          name="name"
          placeholder="Введите имя"
          value={newContact.name}
          onChange={handleInputChange}
        />
        <input
          type="tel"
          name="phone"
          placeholder="Введите номер телефона"
          value={newContact.phone}
          onChange={handleInputChange}
        />
        <button onClick={handleAddContact}>Добавить контакт</button>
      </div>

      {/* Список контактов */}
      <div className="contacts-list">
        <h2>Мои контакты ({contacts.length})</h2>
        {contacts.length === 0 ? (
          <p>Список контактов пуст.</p>
        ) : (
          <ul>
            {contacts.map(contact => (
              <li key={contact.id} className="contact-item">
                <div className="contact-info">
                  <strong>{contact.name}</strong>
                  <span>{contact.phone}</span>
                </div>
                <button
                  onClick={() => handleDeleteContact(contact.id)}
                  className="delete-btn"
                >
                  Удалить
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default App;