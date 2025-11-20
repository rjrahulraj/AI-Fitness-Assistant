import React from "react";

const PrintablePlan = React.forwardRef(({ data }, ref) => {
     return (
          <div ref={ref} style={{ padding: "20px" }}>
               <h1>Fitness Plan</h1>

               <h2>Summary</h2>
               <p>{data.summary}</p>

               <h2>Workout Plan</h2>
               <ul>
                    {data.workout_plan.map((day, index) => (
                         <li key={index}>
                              <strong>{day.day}</strong>
                              <pre>{JSON.stringify(day.exercises, null, 2)}</pre>
                         </li>
                    ))}
               </ul>

               <h2>Diet Plan</h2>
               <ul>
                    {data.diet_plan.map((meal, index) => (
                         <li key={index}>
                              <strong>{meal.meal}</strong>: {meal.food}
                         </li>
                    ))}
               </ul>

               <h2>Tips</h2>
               <ul>
                    {data.tips.map((tip, i) => <li key={i}>{tip}</li>)}
               </ul>
          </div>
     );
});

export default PrintablePlan;
