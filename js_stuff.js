const wheel = document.getElementById("wheel");
const spinBtn = document.getElementById("spinBtn");
const result = document.getElementById("result");
const segments = [1, 5, 10, 20, 50, 100, 250, 1000000];
let spinning = false;

spinBtn.addEventListener("click", () => {
  if (spinning) return;
  
  spinning = true;
  spinBtn.disabled = true;
  result.textContent = "";

  // Reset wheel to 0 without animation
  wheel.style.transition = "none";
  wheel.style.transform = "rotate(0deg)";
  
  // Force reflow
  wheel.offsetHeight;

  const randomIndex = Math.floor(Math.random() * segments.length);
  const rotationPerSegment = 360 / segments.length;
  
  // Random rotation between 720 and 1080 degrees (2-3 full spins)
  const baseRotation = 720 + Math.random() * 360;
  
  // Calculate target segment position
  const targetRotation = (segments.length - randomIndex - 1) * rotationPerSegment + rotationPerSegment / 2;
  
  const finalRotation = baseRotation + targetRotation;

  // Apply spin with 10 second duration
  wheel.style.transition = "transform 10s cubic-bezier(0.17, 0.67, 0.12, 0.99)";
  wheel.style.transform = `rotate(${finalRotation}deg)`;

  setTimeout(() => {
    const value = segments[randomIndex];
    result.textContent = `🎉 Suggested donation: $${value.toLocaleString()}!`;
    spinning = false;
    spinBtn.disabled = false;
  }, 10000);
});
