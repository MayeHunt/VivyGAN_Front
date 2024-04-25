import React, { useRef, useEffect } from 'react';

function AudioPlayer({ src, key }) {
  const audioRef = useRef(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.load();
    }
  }, [src, key]);

  return (
    <div>
      <audio controls ref={audioRef} src={src}>
        Your browser does not support the audio element.
      </audio>
    </div>
  );
}

export default AudioPlayer;