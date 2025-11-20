
import React, { useRef } from 'react';
import {
     Box,
     Heading,
     Text,
     Accordion,
     AccordionItem,
     AccordionButton,
     AccordionPanel,
     AccordionIcon,
     Button,
     Stack,
     useColorModeValue,
     SimpleGrid,
     Divider,
} from '@chakra-ui/react';
import VoicePlayer from './VoicePlayer';
import ImageModal from './ImageModal';

export default function PlanViewer({ plan }) {
     const ref = useRef();

     if (!plan) return null;

     const downloadJSON = () => {
          if (!plan) return alert('Data not loaded yet!');
          const jsonStr = JSON.stringify(plan, null, 2);
          const blob = new Blob([jsonStr], { type: 'application/json' });
          const url = URL.createObjectURL(blob);

          const a = document.createElement('a');
          a.href = url;
          a.download = 'fitness-plan.json';
          a.click();

          URL.revokeObjectURL(url);
     };

     const panelBg = useColorModeValue('gray.50', 'gray.800');

     return (
          <Box
               mt={6}
               p={{ base: 3, md: 5 }}
               bg={useColorModeValue('gray.50', 'gray.700')}
               borderRadius="md"
               w="full"
               boxShadow="sm"
          >
               <div ref={ref}>
                    {/* SUMMARY */}
                    <Heading size="md" mb={2}>
                         Summary
                    </Heading>
                    <Text mb={4}>{plan?.summary || ''}</Text>

                    {/* WORKOUT PLAN */}
                    <Heading mt={2} size="md" mb={2}>
                         Workout Plan
                    </Heading>

                    <Accordion allowMultiple>
                         {(plan.workout_plan || []).map((day, idx) => (
                              <AccordionItem key={idx} border="none" mb={2}>
                                   <AccordionButton _expanded={{ bg: panelBg, borderRadius: 'md' }}>
                                        <Box flex="1" textAlign="left">
                                             {day.day || `Day ${idx + 1}`}
                                        </Box>
                                        <AccordionIcon />
                                   </AccordionButton>

                                   <AccordionPanel bg={panelBg} p={{ base: 3, md: 4 }} borderRadius="md">
                                        <Stack spacing={2}>
                                             <Text fontSize="lg" fontWeight="semibold">
                                                  Exercise: {day?.exercise}
                                             </Text>

                                             <Text>
                                                  <strong>Duration:</strong>{' '}
                                                  <span style={{ fontWeight: 600 }}>{day?.duration || '—'}</span>
                                             </Text>

                                             <Text>
                                                  <strong>Details:</strong>{' '}
                                                  <span style={{ fontWeight: 600 }}>{day?.details || '—'}</span>
                                             </Text>

                                             <Text fontStyle="italic">
                                                  <strong>Tips / Cool down:</strong> {day?.cool_down || '—'}
                                             </Text>
                                        </Stack>
                                   </AccordionPanel>
                              </AccordionItem>
                         ))}
                    </Accordion>

                    {/* DIET PLAN */}
                    <Heading mt={4} size="md" mb={2}>
                         Diet Plan
                    </Heading>

                    <SimpleGrid columns={{ base: 1, md: 2 }} spacing={3}>
                         {(plan.diet_plan || []).map((meal, i) => (
                              <Box key={i} p={3} borderRadius="md" bg={panelBg}>
                                   <Text fontWeight="bold">{meal.meal}</Text>
                                   <Text mt={1} mb={2}>
                                        {meal.details}
                                   </Text>
                                   <ImageModal />
                              </Box>
                         ))}
                    </SimpleGrid>

                    <Divider my={4} />

                    {/* TIPS */}
                    <Heading mt={2} size="md" mb={2}>
                         Tips & Motivation
                    </Heading>
                    <Stack spacing={1} mb={4}>
                         {(plan.tips || []).map((t, i) => (
                              <Text key={i}>• {t}</Text>
                         ))}
                    </Stack>

                    <Stack direction={{ base: 'column', md: 'row' }} spacing={3}>
                         <VoicePlayer text={`${plan.summary || ''} ${(plan.workout_plan || []).map(w => w.exercise).join(' , ')} ${(plan.tips || []).join('. ')}`} />
                         <Button onClick={downloadJSON}>Download</Button>
                    </Stack>
               </div>
          </Box>
     );
}
