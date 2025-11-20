import { generatePlanDirect } from "./geminiClient.js";

const user = {
  age: 30,
  name: "John Doe",
  gender: "Male",
  height: 175,
  weight: 70,
  goal: "Muscle Gain",
  level: "Intermediate",
  location: "Gym",
  dietary: "Non-Veg",
  medical: "None",
  stress: "Medium",
};

export async function testGeneratePlan() {
  let res = await generatePlanDirect(user);

  console.log(typeof res);

  if (res.ok) {
    console.log(" Plan Generated  :::", res.data);
  } else {
    console.error("Error generating plan:", res.error);
  }
}

testGeneratePlan();
