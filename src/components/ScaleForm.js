import React from 'react';
import axios from 'axios';

function ScaleForm({ onSubmit, note, setNote, mode, setMode, octave, setOctave }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    const postData = { note, mode, octave };

    axios.post('http://127.0.0.1:8000/api/generate_to_scale', postData)
      .then(response => {
        console.log('Response from server:', response.data);
        onSubmit(response.data);  // Using the passed onSubmit handler
      })
      .catch(error => {
        console.error('Error generating scale:', error);
        alert('Error: ' + error.message);
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Note:
        <select value={note} onChange={e => setNote(e.target.value)}>
          <option value="C">C</option>
          <option value="D">D</option>
          <option value="E">E</option>
          <option value="F">F</option>
          <option value="G">G</option>
          <option value="A">A</option>
          <option value="B">B</option>
        </select>
      </label>

      <label>
        Mode:
        <select value={mode} onChange={e => setMode(e.target.value)}>
          <option value="Major">Major</option>
          <option value="Minor">Minor</option>
        </select>
      </label>

      <label>
        Octave:
        <input type="number" value={octave} onChange={e => setOctave(parseInt(e.target.value, 10))} min="1" max="8" />
      </label>

      <button type="submit">Generate to Scale</button>
    </form>
  );
}

export default ScaleForm;
