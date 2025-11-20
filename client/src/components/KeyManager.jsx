import React, { useState, useEffect } from 'react';
import { Box, Input, Button, HStack, Text } from '@chakra-ui/react';

export default function KeyManager() {
     const [openai, setOpenai] = useState('');
     const [eleven, setEleven] = useState('');

     useEffect(() => {
          setOpenai(localStorage.getItem('OPENAI_API_KEY') || '');
          setEleven(localStorage.getItem('ELEVENLABS_API_KEY') || '');
     }, []);

     const save = () => {
          localStorage.setItem('OPENAI_API_KEY', openai.trim());
          localStorage.setItem('ELEVENLABS_API_KEY', eleven.trim());
          alert('Keys saved to localStorage. They never leave your browser (unless you share them).');
     };

     const clear = () => {
          localStorage.removeItem('OPENAI_API_KEY');
          localStorage.removeItem('ELEVENLABS_API_KEY');
          setOpenai(''); setEleven('');
          alert('Keys cleared from localStorage.');
     };

     return (
          <Box w="full" p={3} bg="white" borderRadius="md" shadow="sm">
               <Text mb={2} fontSize="sm">Paste your own API keys (do NOT paste someone else's secret key). Keys are stored only in your browser localStorage.</Text>
               <HStack spacing={3}>
                    <Input placeholder="OpenAI API Key (sk-...)" value={openai} onChange={e => setOpenai(e.target.value)} />
                    <Input placeholder="ElevenLabs API Key" value={eleven} onChange={e => setEleven(e.target.value)} />
                    <Button colorScheme="teal" onClick={save}>Save</Button>
                    <Button onClick={clear}>Clear</Button>
               </HStack>
          </Box>
     );
}
