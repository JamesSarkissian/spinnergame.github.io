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

btn.onclick = function () {
  clicks += 1;

	if(active){
		return;
	}
	active = true;
	number += Math.ceil(Math.random() * 2000) + 720;
	container.style.transform = "rotate(" + number + "deg)";
}

container.addEventListener("transitionend", function () {
	active = false; // allow next spin

	console.log(getSection(number));
});
