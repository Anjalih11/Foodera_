// ================== AUTH MODAL HANDLING ==================

// Show Register form
function showRegister() {
  document.getElementById("authModal").style.display = "flex";
  document.getElementById("registerForm").style.display = "block";
  document.getElementById("loginForm").style.display = "none";
}

// Show Login form
function showLogin() {
  document.getElementById("authModal").style.display = "flex";
  document.getElementById("registerForm").style.display = "none";
  document.getElementById("loginForm").style.display = "block";
}

// Close modal
function closeModal() {
  document.getElementById("authModal").style.display = "none";
}

// ================== REGISTER ==================
document.getElementById("registerForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const form = document.getElementById("registerForm");
  const usernameInput = document.getElementById("regUsername");
  const emailInput = document.getElementById("regEmail");
  const passwordInput = document.getElementById("regPassword");

  const username = usernameInput.value;
  const email = emailInput.value;
  const password = passwordInput.value;

  // Disable form while fetching
  form.classList.add("opacity-50", "pointer-events-none");

  try {
    const res = await fetch("http://localhost:3000/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, email, password })
    });

    const data = await res.json();
    alert(data.message);  // Popup message

    if (data.success) {
      // Clear input fields after successful registration
      usernameInput.value = "";
      emailInput.value = "";
      passwordInput.value = "";

      closeModal();
      showLogin(); // After register, ask user to login
    }
  } catch (err) {
    alert("Error: " + err.message);
  } finally {
    // Re-enable form
    form.classList.remove("opacity-50", "pointer-events-none");
  }
});

// ================== LOGIN ==================
document.getElementById("loginForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const username = document.getElementById("loginUsername").value;
  const password = document.getElementById("loginPassword").value;

  try {
    const res = await fetch("http://localhost:3000/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password })
    });

    const data = await res.json();
    alert(data.message);

    if (data.success) {
      document.getElementById("loginBtn").style.display = "none";
      document.getElementById("registerBtn").style.display = "none";
      closeModal();
    }
  } catch (err) {
    alert("Error: " + err.message);
  }
});

// ================== RECIPE FORM ==================
document.getElementById("chefForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const name = document.getElementById("chefName").value;
  const recipe = document.getElementById("chefRecipe").value;

  try {
    const res = await fetch("http://localhost:3000/ask-chef", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, recipe })
    });

    const data = await res.json();
    alert(data.message); // Popup confirmation
    if (data.success) {
      document.getElementById("chefForm").reset(); // clear form
    }
  } catch (err) {
    alert("Error: " + err.message);
  }
});
 

// Food Facts button click
document.addEventListener("DOMContentLoaded", () => {
  const factsBtn = document.getElementById("factsBtn");
  const factsContainer = document.getElementById("factsContainer");

  if (factsBtn && factsContainer) {
    factsBtn.addEventListener("click", async () => {
      try {
        const res = await fetch("http://localhost:3000/food-facts");
        const data = await res.json();

        if (data.success && data.data && data.data.fact_text) {
          factsContainer.textContent = data.data.fact_text; // show the random fact
        } else {
          factsContainer.textContent = "No facts available.";
        }
      } catch (err) {
        factsContainer.textContent = "Error fetching fact: " + err.message;
      }
    });
  }
});
