// Function to dynamically generate input fields for meals
function generateMealInputs() {
    const mealTypes = ["Breakfast", "Snack", "Lunch", "Snack", "Dinner"];
    const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
    
    let mealInputs = document.getElementById("mealInputs");
    mealInputs.innerHTML = ''; // Clear any previous input fields

    days.forEach(day => {
        let dayDiv = document.createElement('div');
        dayDiv.classList.add('meal-day');
        dayDiv.innerHTML = `<h3>${day}</h3>`;
        
        mealTypes.forEach(meal => {
            let inputField = document.createElement('input');
            inputField.type = 'text';
            inputField.id = `${day}_${meal}`;
            inputField.placeholder = `Enter ${meal} for ${day}`;
            dayDiv.appendChild(inputField);
            dayDiv.appendChild(document.createElement('br'));
        });
        
        mealInputs.appendChild(dayDiv);
    });
}

// Call generateMealInputs on page load to populate the form dynamically
window.onload = generateMealInputs;

function generateMealPlan() {
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const goal = document.getElementById("goal").value;

    // Validate email
    if (!email.includes("@")) {
        alert("Please enter a valid email.");
        return;
    }

    // Collect meals
    let meals = {};
    const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
    const mealTypes = ["Breakfast", "Snack", "Lunch", "Snack", "Dinner"];

    days.forEach(day => {
        meals[day] = {};
        mealTypes.forEach(meal => {
            meals[day][meal] = document.getElementById(`${day}_${meal}`).value.trim();
        });
    });

    // Open new window
    let newWindow = window.open("", "_blank");
    let mealPlanText = `
Weekly Meal Plan for ${name}
Email: ${email}
Goal for the Week: ${goal}

Day         Breakfast   Snack      Lunch       Snack      Dinner
------------------------------------------------------------------
`;

    // Format each line with proper spacing
    days.forEach(day => {
        mealPlanText += day.padEnd(12) +
            meals[day].Breakfast.padEnd(12) +
            meals[day].Snack.padEnd(10) +
            meals[day].Lunch.padEnd(12) +
            meals[day].Snack.padEnd(10) +
            meals[day].Dinner.padEnd(12) + "\n";
    });

    // Write the output using <pre> to preserve layout
    newWindow.document.write(`
        <html>
        <head>
            <title>Meal Plan for ${name}</title>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    padding: 20px;
                    background-color: #f9f9f9;
                }
                pre {
                    font-family: 'Courier New', monospace;
                    background-color: #f4f6f9;
                    padding: 20px;
                    border: 1px solid #ccc;
                    border-radius: 10px;
                    white-space: pre-wrap;
                    overflow-x: auto;
                }
                button {
                    margin-right: 10px;
                    padding: 10px 15px;
                    border-radius: 6px;
                    border: none;
                    background-color: #007BFF;
                    color: white;
                    font-size: 1em;
                    cursor: pointer;
                }
                button:hover {
                    background-color: #0056b3;
                }
            </style>
        </head>
        <body>
            <h1>Weekly Meal Plan for ${name}</h1>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Goal:</strong> ${goal}</p>
            <h3>Meal Plan</h3>
            <pre>${mealPlanText}</pre>
            <button onclick="window.print()">Print this Plan</button>
            <button onclick="downloadPlan()">Download Plan</button>

            <script>
                function downloadPlan() {
                    const blob = new Blob([${JSON.stringify(mealPlanText)}], { type: "text/plain" });
                    const link = document.createElement('a');
                    link.href = URL.createObjectURL(blob);
                    link.download = "${name}_meal_plan.txt";
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                    URL.revokeObjectURL(link.href);
                }
            </script>
        </body>
        </html>
    `);
}


// Function to handle downloading the meal plan as a .txt file
function downloadPlan() {
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const goal = document.getElementById("goal").value;

    // Basic email validation
    if (!email || !email.includes("@")) {
        alert("Please enter a valid email.");
        return;
    }

    let meals = {};
    const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
    const mealTypes = ["Breakfast", "Snack", "Lunch", "Snack", "Dinner"];

    // Collect meal data for each day
    days.forEach(day => {
        meals[day] = {};
        mealTypes.forEach(meal => {
            meals[day][meal] = document.getElementById(`${day}_${meal}`).value.trim();
        });
    });

    // Generate the meal plan text
    let mealPlanText = `Weekly Meal Plan for ${name}\nEmail: ${email}\nGoal for the Week: ${goal}\n\n`;
    mealPlanText += `Day          Breakfast    Snack      Lunch       Snack      Dinner\n`;
    mealPlanText += `---------------------------------------------------------------\n`;

    // Format meal data for each day
    days.forEach(day => {
        mealPlanText += `${day.padEnd(12)}${meals[day].Breakfast.padEnd(12)}${meals[day].Snack.padEnd(10)}${meals[day].Lunch.padEnd(12)}${meals[day].Snack.padEnd(10)}${meals[day].Dinner.padEnd(12)}\n`;
    });

    // Create a Blob from the text data
    const blob = new Blob([mealPlanText], { type: "text/plain" });

    // Create a temporary link element for the download
    const link = document.createElement('a');
    const objectUrl = URL.createObjectURL(blob);
    link.href = objectUrl;
    link.download = `${name}_meal_plan.txt`;  // Filename to be downloaded

    // Append the link to the document body (required for some browsers)
    document.body.appendChild(link);

    // Trigger the click event on the link
    link.click();

    // Clean up by removing the link from the DOM
    document.body.removeChild(link);

    // Optional: Revoke the object URL to free up memory
    URL.revokeObjectURL(objectUrl);
}
