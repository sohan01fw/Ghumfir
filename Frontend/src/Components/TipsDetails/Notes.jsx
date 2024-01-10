import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faTrash, faAngleUp, faAngleDown } from '@fortawesome/free-solid-svg-icons';
import './Notes.css';

const Notes = () => {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(true); 

  const handleInputChange = (e) => {
    setNewNote(e.target.value);
  };

  const handleAddNote = () => {
    if (newNote.trim() !== '') {
      const newNoteInfo = {
        id: Date.now(),
        text: newNote,
      };

      setNotes([...notes, newNoteInfo]);
      setNewNote('');
    }
  };

  const handleDeleteNote = (id) => {
    setNotes(notes.filter((note) => note.id !== id));
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div className={`notes ${isDropdownOpen ? 'open' : ''}`} id='notes'>
      <div className="dropdown-header" onClick={toggleDropdown}>
        <h2>Notes</h2>
        <FontAwesomeIcon icon={isDropdownOpen ? faAngleUp : faAngleDown} />
      </div>
      <div className="dropdown-content">
        <div className="add-note-section">
          <div className="input-section">
            <input
              type="text"
              placeholder="Add a note"
              value={newNote}
              onChange={handleInputChange}
            />
            <button onClick={handleAddNote}>
              <FontAwesomeIcon icon={faPlus} />
            </button>
          </div>
        </div>
        <ul className="notes-list">
          {notes.map((note) => (
            <li key={note.id}>
              <span>{note.text}</span>
              <button onClick={() => handleDeleteNote(note.id)}>
                <FontAwesomeIcon icon={faTrash} />
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Notes;
