import { useState } from 'react';
import Button from '../Button/Button';
import './JournalForm.css';

function JournalForm({ onSubmit }) {
  const [formValidState, setFormValidState] = useState({
    title: true,
    text: true,
    date: true,
  });
  const addJournalItem = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const formProps = Object.fromEntries(formData); // вытаскиваем значения
    let isFormValid = true; // изначально считаем, что форма валидна
    if (!formProps.title?.trim().length) {
      setFormValidState((state) => ({ ...state, title: false }));
      isFormValid = false;
    } else {
      setFormValidState((state) => ({ ...state, title: true }));
    }
    if (!formProps.text?.trim().length) {
      setFormValidState((state) => ({ ...state, text: false }));
      isFormValid = false;
    } else {
      setFormValidState((state) => ({ ...state, text: true }));
    }
    if (!formProps.date) {
      // date должны проверить на undefined
      setFormValidState((state) => ({ ...state, date: false }));
      isFormValid = false;
    } else {
      setFormValidState((state) => ({ ...state, date: true }));
    }
    if (!isFormValid) {
      return;
      // если форма не валидна, то return
    }
    onSubmit(formProps);
  };

  return (
    <form className="journal-form" onSubmit={addJournalItem}>
      <input
        type="text"
        name="title"
        className={`input ${formValidState.title ? '' : 'invalid'}`}
      />
      <input
        type="date"
        name="date"
        className={`input ${formValidState.date ? '' : 'invalid'}`}
      />
      <input type="text" name="tag" />
      <textarea
        name="text"
        className={`input ${formValidState.text ? '' : 'invalid'}`}
      ></textarea>
      <Button text="Сохранить"></Button>
    </form>
  );
}

export default JournalForm;
