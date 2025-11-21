let container = document.querySelector(".container");
let btn = document.getElementById("spin");
let number = 0;

let clicks = 0;
let active = false;

const degreeTable = [
  { Amount: 1000000, start: 337.5, end: 22.5 },
  { Amount: 5, start: 22.5,  end: 67.5 },
  { Amount: 20, start: 67.5,  end: 112.5 },
  { Amount: 10, start: 112.5, end: 157.5 },
  { Amount: 100, start: 157.5, end: 202.5 },
  { Amount: 10, start: 202.5, end: 247.5 },
  { Amount: 20, start: 247.5, end: 292.5 },
  { Amount: 5, start: 292.5, end: 337.5 },
];

function getSection(spinDegree) {
  const normalized = spinDegree % 360;

  for (let i = 0; i < degreeTable.length; i++) {
    const { Amount, start, end } = degreeTable[i];

    if (start > end) {
      // Wrap-around case (section 1)
      if (normalized >= start || normalized < end) return Amount;
    } else {
      if (normalized >= start && normalized < end) return Amount;
    }
  }
  return null; // should never happen
}

function getCorrection(remainder) {
	// Already in the allowed region
	if (remainder >= 337.5 || remainder < 22.5) {
		return 0;
	}

	// If between 22.5 and 337.5, snap to nearest valid boundary

	if (remainder < 337.5) {
		// Go up to 337.5 region
		return 337.5 - remainder;
	}

	// Should never reach here, but fallback:
	return (360 - remainder);
}

btn.onclick = function () {
  clicks += 1;

	if(active){
		return;
	}
	active = true;
	let rotation = 720;
	if (clicks % 2 == 0) {
		let remainder = number % 360;
		let correction = getCorrection(remainder);
		number += rotation + correction;
		container.style.transform = "rotate(" + number + "deg)";
	} else {
		number += Math.ceil(Math.random() * 1500) + 720;
		container.style.transform = "rotate(" + number + "deg)";
	}

}

container.addEventListener("transitionend", function () {
	active = false; // allow next spin

	console.log(getSection(number));
	showPopup(getSection(number));
});

// POPUP

// popup helpers
const popup = document.getElementById('popup');
const popupText = document.getElementById('popup-text');
const popupClose = document.getElementById('popup-close');
const popupOk = document.getElementById('popup-ok');

// show popup with a numeric or string amount
function showPopup(amount) {
  // format amount (if it's a number)
  let display = amount;
  if (typeof amount === 'number') {
    // show with commas
    display = amount.toLocaleString();
  }
  popupText.textContent = display + "$";
  popup.setAttribute('aria-hidden', 'false');
  popup.style.display = 'flex';
  // optionally add an attribute so clicking overlay closes
  // popup.dataset.outside = "true";
}

// close/hide popup
function hidePopup() {
  popup.style.display = 'none';
  popup.setAttribute('aria-hidden', 'true');
}

// close button
popupClose.addEventListener('click', hidePopup);
popupOk.addEventListener('click', hidePopup);

// optional: clicking the dark overlay (outside the box) closes popup
popup.addEventListener('click', function (e) {
  if (e.target === popup) { // clicked directly on overlay
    hidePopup();
  }
});
