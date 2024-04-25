import axios from 'axios';

function GenerateButton({ endpoint, postData, onNewTrack, buttonText }) {
  const handleGenerate = async () => {
    try {
      const response = await axios.post(`http://127.0.0.1:8000/api/${endpoint}`, postData);
      console.log('Response from server:', response.data);  
      onNewTrack(response.data);
    } catch (error) {
      console.error('Error generating new track:', error);
    }
  };

  return <button onClick={handleGenerate}>{buttonText}</button>;
}

export default GenerateButton