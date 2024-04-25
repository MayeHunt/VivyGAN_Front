import React, { useState } from 'react';
import axios from 'axios';

function VariationsForm({ onNewTrack }) {
  const [file, setFile] = useState(null);
  const [batchSize, setBatchSize] = useState(6);

  const handleFileChange = event => {
    setFile(event.target.files[0]); 
  };

  const handleBatchSizeChange = event => {
    setBatchSize(event.target.value); 
  };

  const handleSubmit = async () => {
    if (file && batchSize) {
      const formData = new FormData();
      formData.append('file', file);  
      formData.append('batch_size', batchSize);

      try {
        const response = await axios.post('http://127.0.0.1:8000/api/generate_variations', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
        onNewTrack(response.data);
      } catch (error) {
        console.error('Error generating variations:', error);
        alert('Error: ' + error.message);
      }
    } else {
      alert('Please select a file and set the batch size.');
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} accept=".mid,.midi,.wav,.png,.npz,.npy" />
      <input type="number" value={batchSize} onChange={handleBatchSizeChange} min="1" />
      <button onClick={handleSubmit}>Generate Variations</button>
    </div>
  );
}

export default VariationsForm;
