
if(document.getElementsByClassName("tree")[0]) {
	var s = document.getElementsByClassName("tree")[0];

	s.onclick = function(event) {
		var target = event.target;

		if(target.children[0].tagName == "UL") {
			target.children[0].hidden = !target.children[0].hidden;
		}
	}
}

function doc(id) {
	return document.getElementById(id);
}

var previousElementG;

function galley(event) {
	var target = event.target;

	function colors(node) {
	  if (previousElementG) {
	    previousElementG.style.border = "2px solid #ccc";
	  }
	  previousElementG = node;
	  previousElementG.style.border = "2px solid #1E90FF";
	}

	while(target != this) {
		if(target.tagName == "A") {
			event.preventDefault();
			colors(target);
			doc("largeImg").src = target.getAttribute("href");
			return false;
		}
		target = target.parentElement
	}
} doc("thumbs").addEventListener("click", galley, true);