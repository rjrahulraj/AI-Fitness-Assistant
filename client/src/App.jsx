
import React, { useState, useEffect } from 'react';
import {
  Container,
  Heading,
  VStack,
  Box,
  useToast,
  HStack,
  Spacer,
  Flex,
  useColorModeValue,
} from '@chakra-ui/react';
import UserForm from './components/UserForm';
import PlanViewer from './components/PlanViewer';
import ThemeToggle from './components/ThemeToggle';
import { generatePlanDirect } from './utils/geminiClient';

export default function App() {
  const [plan, setPlan] = useState(null);
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  useEffect(() => {
    const last = localStorage.getItem('lastPlan');
    if (last) setPlan(JSON.parse(last));
  }, []);

  const handleGenerate = async (user) => {
    setLoading(true);
    try {
      const res = await generatePlanDirect(user);
      if (res.ok) {
        setPlan(res.data);
        localStorage.setItem('lastPlan', JSON.stringify(res.data));
      } else {
        toast({ title: 'Generation failed', description: res.error || 'Unknown', status: 'error' });
      }
    } catch (err) {
      toast({ title: 'Error', description: err.message || 'Server error', status: 'error' });
    } finally {
      setLoading(false);
    }
  };

  const bg = useColorModeValue('gray.50', 'gray.900');
  const cardBg = useColorModeValue('white', 'gray.700');

  return (
    <Box minH="100vh" bg={bg} py={{ base: 4, md: 8 }}>
      <Container maxW="container.lg" py={4}>
        <VStack spacing={6} align="stretch">
          <Flex align="center" gap={4}>
            <Heading size={{ base: 'md', md: 'lg' }}>AI Fitness Assistant</Heading>
            <Spacer />
            <ThemeToggle />
          </Flex>

          <Box w="full" bg={cardBg} p={{ base: 3, md: 6 }} borderRadius="md" boxShadow="sm">
            <UserForm onSubmit={handleGenerate} loading={loading} />
          </Box>

          <Box w="full">
            <PlanViewer plan={plan} />
          </Box>
        </VStack>
      </Container>
    </Box>
  );
}
