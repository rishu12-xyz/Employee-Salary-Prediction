
document.getElementById("salaryForm").addEventListener("submit", async function (e) {
  e.preventDefault();
  const form = e.target;
  const formData = {
    age: form.age.value,
    education: form.education.value,
    occupation: form.occupation.value,
    "hours-per-week": form["hours-per-week"].value,
    experience: form.experience.value,
  };
  // Update this URL to your deployed Flask backend endpoint
  // Example: const apiUrl = "https://your-flask-app.onrender.com/predict";
  const apiUrl = "https://your-flask-app.onrender.com/predict"; // <-- Replace with your actual deployed Flask URL
  try {
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });
    if (!response.ok) {
      throw new Error("Server error: " + response.status);
    }
    const result = await response.json();
    document.getElementById("result").textContent = `Prediction: ${result.prediction}`;
  } catch (error) {
    document.getElementById("result").textContent = `Error: ${error.message}`;
  }
});
