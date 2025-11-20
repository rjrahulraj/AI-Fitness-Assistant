import React, { useState } from "react";
import {
     Box,
     Input,
     Select,
     Button,
     VStack,
     Textarea,
     useColorModeValue,
} from "@chakra-ui/react";

export default function UserForm({ onSubmit, loading }) {
     const [form, setForm] = useState({
          name: "",
          age: "",
          gender: "Male",
          height: "",
          weight: "",
          goal: "Weight Loss",
          level: "Beginner",
          location: "Home",
          dietary: "Veg",
          medical: "",
          stress: "Low",
     });

     const update = (k, v) => setForm((prev) => ({ ...prev, [k]: v }));

     const cardBg = useColorModeValue("white", "gray.800");
     const inputBg = useColorModeValue("white", "gray.700");
     const border = useColorModeValue("gray.200", "gray.600");

     return (
          <Box
               p={5}
               shadow="lg"
               borderRadius="lg"
               bg={cardBg}
               w="full"
               borderWidth="1px"
               borderColor={border}
          >
               <VStack spacing={4} w="full">
                    <Input
                         placeholder="Name"
                         bg={inputBg}
                         value={form.name}
                         onChange={(e) => update("name", e.target.value)}
                    />

                    <Input
                         placeholder="Age"
                         type="number"
                         bg={inputBg}
                         value={form.age}
                         onChange={(e) => update("age", e.target.value)}
                    />

                    <Select bg={inputBg} value={form.gender} onChange={(e) => update("gender", e.target.value)}>
                         <option>Male</option>
                         <option>Female</option>
                         <option>Other</option>
                    </Select>

                    <Input
                         placeholder="Height (cm)"
                         type="number"
                         bg={inputBg}
                         value={form.height}
                         onChange={(e) => update("height", e.target.value)}
                    />

                    <Input
                         placeholder="Weight (kg)"
                         type="number"
                         bg={inputBg}
                         value={form.weight}
                         onChange={(e) => update("weight", e.target.value)}
                    />

                    <Select bg={inputBg} value={form.goal} onChange={(e) => update("goal", e.target.value)}>
                         <option>Weight Loss</option>
                         <option>Muscle Gain</option>
                         <option>Maintain</option>
                    </Select>

                    <Select bg={inputBg} value={form.level} onChange={(e) => update("level", e.target.value)}>
                         <option>Beginner</option>
                         <option>Intermediate</option>
                         <option>Advanced</option>
                    </Select>

                    <Select
                         bg={inputBg}
                         value={form.dietary}
                         onChange={(e) => update("dietary", e.target.value)}
                    >
                         <option>Veg</option>
                         <option>Non-Veg</option>
                         <option>Vegan</option>
                         <option>Keto</option>
                    </Select>

                    <Textarea
                         placeholder="Medical history / Notes (optional)"
                         bg={inputBg}
                         value={form.medical}
                         onChange={(e) => update("medical", e.target.value)}
                    />

                    <Button
                         colorScheme="teal"
                         w="full"
                         size="lg"
                         isLoading={loading}
                         onClick={() => onSubmit(form)}
                    >
                         Generate Plan
                    </Button>
               </VStack>
          </Box>
     );
}
