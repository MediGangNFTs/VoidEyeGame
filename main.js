document.getElementById("connectBtn").onclick = async () => {
  // Simulate wallet connect (placeholder)
  alert("Wallet connected (simulated)");
  document.getElementById("connectBtn").style.display = "none";
  document.getElementById("usernamePrompt").style.display = "flex";
};

document.getElementById("startGameBtn").onclick = () => {
  const username = document.getElementById("usernameInput").value;
  if (!username) return alert("Please enter a username.");
  localStorage.setItem("voidUsername", username);
  document.getElementById("intro").style.display = "none";
  document.getElementById("gameCanvas").style.display = "block";
};
