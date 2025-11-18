let container = document.querySelector(".container");
let btn = document.getElementById("spin");
let number = 0;

let clicks = 0;
let active = false;

const degreeTable = [
  { section: 1, start: 337.5, end: 22.5 },
  { section: 2, start: 22.5,  end: 67.5 },
  { section: 3, start: 67.5,  end: 112.5 },
  { section: 4, start: 112.5, end: 157.5 },
  { section: 5, start: 157.5, end: 202.5 },
  { section: 6, start: 202.5, end: 247.5 },
  { section: 7, start: 247.5, end: 292.5 },
  { section: 8, start: 292.5, end: 337.5 },
];

function getSection(spinDegree) {
  const normalized = spinDegree % 360;

  for (let i = 0; i < degreeTable.length; i++) {
    const { section, start, end } = degreeTable[i];

    if (start > end) {
      // Wrap-around case (section 1)
      if (normalized >= start || normalized < end) return section;
    } else {
      if (normalized >= start && normalized < end) return section;
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
