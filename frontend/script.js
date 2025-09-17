// ================== MODAL FUNCTIONS ==================
function showRegister() {
  document.getElementById("authModal").style.display = "flex";
  document.getElementById("registerForm").style.display = "block";
  document.getElementById("loginForm").style.display = "none";
}

function showLogin() {
  document.getElementById("authModal").style.display = "flex";
  document.getElementById("registerForm").style.display = "none";
  document.getElementById("loginForm").style.display = "block";
}

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

  form.classList.add("opacity-50", "pointer-events-none");

  try {
    const res = await fetch("https://pleasant-enchantment.onrender.com/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, email, password })
    });

    const data = await res.json();
    alert(data.message);

    if (data.success) {
      usernameInput.value = "";
      emailInput.value = "";
      passwordInput.value = "";
      closeModal();
      showLogin();
    }
  } catch (err) {
    alert("Error: " + err.message);
  } finally {
    form.classList.remove("opacity-50", "pointer-events-none");
  }
});

// ================== LOGIN ==================
document.getElementById("loginForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const username = document.getElementById("loginUsername").value;
  const password = document.getElementById("loginPassword").value;

  try {
    const res = await fetch("https://pleasant-enchantment.onrender.com/login", {
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
    const res = await fetch("https://pleasant-enchantment.onrender.com/ask-chef", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, recipe })
    });

    const data = await res.json();
    alert(data.message);

    if (data.success) {
      document.getElementById("chefForm").reset();
    }
  } catch (err) {
    alert("Error: " + err.message);
  }
});

// ================== FOOD FACTS BUTTON ==================
document.addEventListener("DOMContentLoaded", () => {
  const factsBtn = document.getElementById("factsBtn");
  const factsContainer = document.getElementById("factsContainer");

  if (factsBtn && factsContainer) {
    factsBtn.addEventListener("click", async () => {
      try {
        const res = await fetch("https://pleasant-enchantment.onrender.com/food-facts");
        const data = await res.json();

        if (data.success && data.data && data.data.length > 0) {
          // Pick a random fact
          const randomFact = data.data[Math.floor(Math.random() * data.data.length)];
          factsContainer.textContent = randomFact.fact_text;
        } else {
          factsContainer.textContent = "No facts available.";
        }
      } catch (err) {
        factsContainer.textContent = "Error fetching fact: " + err.message;
      }
    });
  }
});
