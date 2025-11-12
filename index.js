let container = document.querySelector(".container");
let btn = document.getElementById("spin");
let number = Math.ceil(Math.random() * 1000);

let clicks = 0;
let active = false;
btn.onclick = function () {
  clicks += 1;

	if(active){
		return;
	}
	active = true;
	container.style.transform = "rotate(" + number + "deg)";
	number += Math.ceil(Math.random() * 1000);
}

container.addEventListener("transitionend", function () {
	active = false; // allow next spin
});
