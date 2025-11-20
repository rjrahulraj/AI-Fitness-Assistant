// src/components/VoicePlayer.jsx
import React, { useState, useRef } from 'react';
import { Button } from '@chakra-ui/react';

const ELEVEN_KEY = import.meta.env.VITE_ELEVENLABS_API_KEY; // set this in .env.local
const VOICE_ID = import.meta.env.VITE_ELEVEN_VOICE_ID || '21m00Tcm4TlvDq8ikWAM';

export default function VoicePlayer({ text }) {
     const [loading, setLoading] = useState(false);
     const [isPlaying, setIsPlaying] = useState(false);
     const audioRef = useRef(null);

     const handlePlay = async () => {
          if (isPlaying) {
               if (audioRef.current) {
                    audioRef.current.pause();
                    audioRef.current.currentTime = 0;
                    setIsPlaying(false);
               }
               return;
          }

          if (!ELEVEN_KEY) {
               alert('VITE_ELEVENLABS_API_KEY missing in .env.local');
               return;
          }

          setLoading(true);

          try {
               const resp = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${VOICE_ID}`, {
                    method: 'POST',
                    headers: {
                         'xi-api-key': ELEVEN_KEY,
                         'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ text }),
               });

               if (!resp.ok) {
                    const err = await resp.text();
                    throw new Error(err || 'ElevenLabs error');
               }

               const arrayBuffer = await resp.arrayBuffer();
               const blob = new Blob([arrayBuffer], { type: 'audio/mpeg' });
               const url = URL.createObjectURL(blob);

               const audio = new Audio(url);
               audioRef.current = audio;

               audio.play();
               setIsPlaying(true);

               audio.onended = () => {
                    setIsPlaying(false);
               };
          } catch (e) {
               console.error(e);
               alert('TTS failed: ' + e.message);
          } finally {
               setLoading(false);
          }
     };

     return (
          <Button onClick={handlePlay} isLoading={loading}>
               {isPlaying ? 'Stop' : 'Read My Plan'}
          </Button>
     );
}
