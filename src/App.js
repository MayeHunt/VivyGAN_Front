import React, { useState } from 'react';
import './App.css';
import GenerateButton from './components/GenerateButton';
import AudioPlayer from './components/AudioPlayer';
import DownloadButton from './components/DownloadButton';
import ScaleForm from './components/ScaleForm';
import VariationsForm from './components/VariationsForm';

function App() {
  const [audioUrls, setAudioUrls] = useState([]);
  const [imageUrls, setImageUrls] = useState([]);
  const [note, setNote] = useState('C');
  const [mode, setMode] = useState('Major');
  const [octave, setOctave] = useState(4);

  const handleNewTrack = (data) => {
    const newAudioUrls = Array.isArray(data.audio_urls) ? data.audio_urls : [data.audio_url];
    const newImageUrls = Array.isArray(data.image_urls) ? data.image_urls : [data.image_url];
    setAudioUrls(newAudioUrls.map(url => `${url}?t=${new Date().getTime()}`));
    setImageUrls(newImageUrls.map(url => `${url}?t=${new Date().getTime()}`));
  };


  return (
    <div className="App">
      <h1>VivyGAN</h1>
      <div className="ButtonsRow">
        <GenerateButton endpoint="generate" onNewTrack={handleNewTrack} buttonText="Generate Piano Roll" />
        <GenerateButton endpoint="generate_random" onNewTrack={handleNewTrack} buttonText="Generate Random" />
        <GenerateButton endpoint="generate_equal_weights" onNewTrack={handleNewTrack} buttonText="Generate Equal Weights" />
      </div>
      <div className="ButtonsRow">
        <GenerateButton endpoint="generate_low_dissonance" onNewTrack={handleNewTrack} buttonText="Generate Low Dissonance" />
        <GenerateButton endpoint="generate_60_percent" onNewTrack={handleNewTrack} buttonText="Generate 60% Cut" />
      </div>
      <div className="ButtonsRow">
        <ScaleForm 
          onSubmit={handleNewTrack}
          note={note} setNote={setNote}
          mode={mode} setMode={setMode}
          octave={octave} setOctave={setOctave}
        />
      </div>
      <div className="ButtonsRow">
        <VariationsForm onNewTrack={handleNewTrack} />
      </div>
      <div className="mediaControls">
        {audioUrls.map((url, index) => (
          <div key={index} className="AudioImagePair">
            <div className="AudioDownloadGroup">
              <AudioPlayer src={url} />
              <DownloadButton url={url} />
            </div>
            <img src={imageUrls[index]} alt={`Generated Piano Roll ${index + 1}`} />
          </div>
        ))}
      </div>
      <footer className="AppBanner">
        <div className="AppBannerLinks">
          <a href="https://github.com/MayeHunt/VivyGAN" target="_blank" rel="noopener noreferrer"> VivyGAN Testing & Training </a>
          <span className="AppBannerSeparator">|</span>
          <a href="https://github.com/MayeHunt/VivyGAN_API" target="_blank" rel="noopener noreferrer"> VivyGAN API </a>
          <span className="AppBannerSeparator">|</span>
          <a href="https://github.com/MayeHunt/VivyGAN_Front" target="_blank" rel="noopener noreferrer"> VivyGAN Front-End </a>
        </div>
      </footer>
    </div>
  );
}

export default App;
