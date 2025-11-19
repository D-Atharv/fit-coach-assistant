import { FitnessPlan, UserProfile } from "./types";

export function exportToPDF(plan: FitnessPlan, profile: UserProfile) {
  // Create a printable HTML version
  const printWindow = window.open("", "_blank");
  if (!printWindow) return;

  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <title>Fitness Plan - ${profile.name}</title>
      <style>
        body { font-family: Arial, sans-serif; padding: 20px; max-width: 800px; margin: 0 auto; }
        h1 { color: #2563eb; border-bottom: 3px solid #2563eb; padding-bottom: 10px; }
        h2 { color: #059669; margin-top: 30px; }
        h3 { color: #7c3aed; }
        .section { margin-bottom: 30px; }
        .exercise { background: #f3f4f6; padding: 10px; margin: 10px 0; border-radius: 5px; }
        .meal { background: #ecfdf5; padding: 10px; margin: 10px 0; border-radius: 5px; }
        .tip { margin: 10px 0; padding-left: 20px; }
        .motivation { background: linear-gradient(to right, #2563eb, #7c3aed); color: white; padding: 20px; border-radius: 10px; text-align: center; font-size: 18px; }
        @media print { body { padding: 10px; } }
      </style>
    </head>
    <body>
      <h1>🏋️ Personalized Fitness Plan</h1>
      <div class="section">
        <strong>Name:</strong> ${profile.name}<br>
        <strong>Age:</strong> ${profile.age} | <strong>Gender:</strong> ${
    profile.gender
  }<br>
        <strong>Height:</strong> ${
          profile.height
        }cm | <strong>Weight:</strong> ${profile.weight}kg<br>
        <strong>Goal:</strong> ${profile.fitnessGoal.replace(
          "_",
          " "
        )} | <strong>Level:</strong> ${profile.fitnessLevel}
      </div>

      <div class="motivation">${plan.motivation}</div>

      <h2>🏋️ Workout Plan</h2>
      ${plan.workoutPlan
        .map(
          (day) => `
        <div class="section">
          <h3>${day.day}</h3>
          ${day.exercises
            .map(
              (ex) => `
            <div class="exercise">
              <strong>${ex.name}</strong><br>
              ${ex.sets} sets × ${ex.reps} reps | Rest: ${ex.restTime}
              ${ex.notes ? `<br><em>${ex.notes}</em>` : ""}
            </div>
          `
            )
            .join("")}
        </div>
      `
        )
        .join("")}

      <h2>🥗 Diet Plan</h2>
      ${Object.entries(plan.dietPlan)
        .map(
          ([type, meal]) => `
        <div class="meal">
          <strong>${type.toUpperCase()}</strong><br>
          ${meal.items.join(", ")}<br>
          ${meal.calories ? `<em>${meal.calories} | ${meal.protein}</em>` : ""}
        </div>
      `
        )
        .join("")}

      <h2>💡 Lifestyle Tips</h2>
      ${plan.tips
        .map((tip, idx) => `<div class="tip">${idx + 1}. ${tip}</div>`)
        .join("")}

      <script>
        window.onload = () => {
          window.print();
        };
      </script>
    </body>
    </html>
  `;

  printWindow.document.write(html);
  printWindow.document.close();
}
