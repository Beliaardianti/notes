import React, { useState } from 'react';
import { FaEdit, FaTrash, FaSave } from "react-icons/fa";

function Notes() {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState("");
  const [charLeft, setCharLeft] = useState(50);
  const [editIndex, setEditIndex] = useState(null);

  // Tambah catatan baru
  const addNote = () => {
    if (title.trim() && content.trim()) {
      setNotes([...notes, { title, content, date: new Date().toLocaleDateString() }]);
      setTitle("");
      setContent("");
      setCharLeft(50);
    }
  };

  // Hapus catatan
  const deleteNote = (index) => {
    const filteredNotes = notes.filter((_, i) => i !== index);
    setNotes(filteredNotes);
  };

  // Mulai edit
  const startEditing = (index) => {
    const updatedNotes = [...notes];
    updatedNotes[index].tempTitle = updatedNotes[index].title;
    updatedNotes[index].tempContent = updatedNotes[index].content;
    setNotes(updatedNotes);
    setEditIndex(index);
  };

  // Simpan edit
  const saveEdit = (index) => {
    const updatedNotes = [...notes];
    updatedNotes[index].title = updatedNotes[index].tempTitle;
    updatedNotes[index].content = updatedNotes[index].tempContent;
    delete updatedNotes[index].tempTitle;
    delete updatedNotes[index].tempContent;
    setNotes(updatedNotes);
    setEditIndex(null);
  };

  // Hitung karakter tersisa
  const handleContentChange = (e) => {
    const value = e.target.value;
    setContent(value);
    setCharLeft(50 - value.length);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-800 to-gray-300">
      <div className="max-w-xl mx-auto">
        <h2 className="text-white text-3xl font-bold text-center py-20">Notes</h2>
        <div className="text-right mb-2 text-white font-bold">Character left: {charLeft}</div>
        <div className="p-5">
          <input
            type="text"
            placeholder="Input Title..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-5 py-5 mb-3 border border-gray-600 rounded-lg focus:outline-none bg-gray-700 text-white"
          />
          <textarea
            placeholder="Masukan pesan"
            value={content}
            onChange={handleContentChange}
            maxLength="50"
            className="w-full px-5 py-5 mt-5 border border-gray-600 rounded-lg focus:outline-none bg-gray-600 text-white"
          />
          <button
            onClick={addNote}
            className="w-full py-8 mt-5 bg-gray-800 text-white rounded-lg font-semibold hover:bg-opacity-90 transition-colors"
          >
            Create 
          </button>
        </div>

        <h3 className="text-white">All Notes</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {notes.map((note, index) => (
            <div key={index} className="bg-gray-700 p-4 rounded-lg shadow-md relative">
              {editIndex === index ? (
                <>
                  <input
                    type="text"
                    value={note.tempTitle || note.title}
                    onChange={(e) => {
                      const updatedNotes = [...notes];
                      updatedNotes[index].tempTitle = e.target.value;
                      setNotes(updatedNotes);
                    }}
                    className="w-full px-3 py-2 mb-3 border border-gray-600 rounded-lg focus:outline-none bg-gray-700 text-white"
                  />
                  <textarea
                    value={note.tempContent || note.content}
                    onChange={(e) => {
                      const updatedNotes = [...notes];
                      updatedNotes[index].tempContent = e.target.value;
                      setNotes(updatedNotes);
                    }}
                    className="w-full px-3 py-2 mb-3 border border-gray-600 rounded-lg focus:outline-none bg-gray-700 text-white"
                  />
                  <button
                    onClick={() => saveEdit(index)}
                    className="w-full bg-green-500 py-2 rounded-lg font-semibold hover:bg-green-600 transition-colors flex items-center justify-center space-x-2 text-white"
                  >
                    <FaSave /> <span>Save</span>
                  </button>
                </>
              ) : (
                <>
                  <h4 className="font-bold mb-5 text-white">{note.title}</h4>
                  <p className="text-sm text-gray-400">{note.date}</p>
                  <p className="mt-2 text-gray-200">{note.content}</p>
                  <div className="mt-2 flex justify-end space-x-2">
                    <button
                      onClick={() => startEditing(index)}
                      className="text-yellow-400 hover:text-yellow-500 flex items-center space-x-1"
                    >
                      <FaEdit /> <span>Edit</span>
                    </button>
                    <button
                      onClick={() => deleteNote(index)}
                      className="text-red-400 hover:text-red-500 flex items-center space-x-1"
                    >
                      <FaTrash /> <span>Delete</span>
                    </button>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Notes;
