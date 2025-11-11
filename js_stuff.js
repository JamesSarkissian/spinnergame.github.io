const wheel = document.getElementById("wheel");
const spinBtn = document.getElementById("spinBtn");
const result = document.getElementById("result");

const segments = [1, 5, 10, 20, 50, 100, 250, 1000000];
let spinning = false;
let currentRotation = 0; // Track current rotation

spinBtn.addEventListener("click", () => {
  if (spinning) return;
  spinning = true;
  result.textContent = "";

  const randomIndex = Math.floor(Math.random() * segments.length);
  const rotationPerSegment = 360 / segments.length;

  // Add 5–10 full spins + random offset
  const spinExtra = 360 * (5 + Math.floor(Math.random() * 5));
  const targetRotation =
    (segments.length - randomIndex - 1) * rotationPerSegment +
    rotationPerSegment / 2;

  const newRotation = currentRotation + spinExtra + targetRotation;
  currentRotation = newRotation % 360; // Keep rotation value small for next time

  wheel.style.transition = "transform 4s cubic-bezier(0.25, 0.1, 0.25, 1)";
  wheel.style.transform = `rotate(${newRotation}deg)`;

  setTimeout(() => {
    const value = segments[randomIndex];
    result.textContent = `🎉 Suggested donation: $${value.toLocaleString()}!`;
    spinning = false;
  }, 4000);
});
