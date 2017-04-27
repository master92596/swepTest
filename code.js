

// window.scrollBy(x,y); прокрутка относительно текущих координат, window.scrollTo(x,y); относительно документа,
//this.scrollIntoView() чтобы кнопка стала в верху flase чтобы в низу
//.getBoundingClientRect(); координаты элемента в обьекте
//document.elementFromPoint(x,y); возрощает элемент относительно окна
//.add/removeEventListener();
// события клика нажатая mousedown при отпускание mouseup, сам клик click, focus фокус на элемент к примеру на элемент type="text"
//event.currentTarget в данный момент событие на нём выполняется
//отключает всплытие и другие события event.stopImmediatePropagation()
//отмена встроенного действия браузером event.preventDefault()

var s = document.getElementById("test");

s.onfocus = function() {
	this.value = "focus на мне";
}

var pole = document.getElementById("field");
var ball = document.getElementById("ball");

function gamePole(event) {
	console.log("target: "+event.target.tagName);
	var coordPole = pole.getBoundingClientRect(pole);

	var coordBall = {
		top: event.clientY - coordPole.top + pole.clientTop - ball.clientHeight / 2,
		left: event.clientX - coordPole.left + pole.clientLeft - ball.clientWidth / 2
	};

	if (coordBall.top < ball.clientHeight/2) coordBall.top = 0+ball.clientHeight/2;
	if (coordBall.left < ball.clientHeight/2) coordBall.left = 0+ball.clientWidth/2;
	if (coordBall.top > pole.clientHeight-ball.clientHeight/2)
		coordBall.top = pole.clientHeight-ball.clientHeight/2;
	if (coordBall.left > pole.clientWidth-ball.clientWidth/2)
		coordBall.left = pole.clientWidth-ball.clientWidth/2;

	ball.style.left = coordBall.left + "px";
	ball.style.top = coordBall.top + "px";
	event.stopPropagation();
} pole.addEventListener("click", gamePole); pole.addEventListener("mousedown ", function() {return false;});

function doc(id) {
	return document.getElementById(id);
}

function coordsAndHelp(event) {
	doc("x").value = event.clientX;
	doc("y").value = event.clientY;

	if(event.target.hasAttribute("data-help")) {
		if(document.getElementsByClassName("help")[0]) return;
		var helpElem = document.createElement("div");
		helpElem.className = "help";
		helpElem.textContent = event.target.getAttribute("data-help");
		event.target.parentElement.appendChild(helpElem);
		var coords = event.target.getBoundingClientRect();
		helpElem.style.top = Math.max(coords.top - helpElem.offsetHeight - 2,0) + "px";
		helpElem.style.left = Math.max(coords.left + (event.target.offsetWidth - helpElem.offsetWidth)/2,0) + "px";
	}
} document.body.addEventListener("mousemove", coordsAndHelp);

function HelpsExit() {
	if(event.target.hasAttribute("data-help")) {
		event.target.parentElement.removeChild(document.getElementsByClassName("help")[0]);
	}
} document.body.addEventListener("mouseout", HelpsExit);

doc("s2").onclick = function(event) {
	if(event.target.tagName == "button".toUpperCase()) {
		event.target.parentElement.hidden = true;
	}
}

function count(event) {
	if(event.target.hasAttribute("data-count")) event.target.value++;
} document.body.addEventListener("click", count);

function hiddenForms(event) {
    var id = event.target.getAttribute('data-toggle-id');
    if (!id) return;
    var elem = document.getElementById(id);
	elem.hidden = !elem.hidden;
} document.body.addEventListener("click", hiddenForms);

function hrefS(event) {

	var target = event.target;

	while(target != this) {

		if(target.tagName == "A") {
			var s = confirm("Вы действительно хотите уйти на другую страницу?");
			if(!s) event.preventDefault();
			return false;
		}

		target = target.parentElement;
	}
} doc("s").addEventListener("click", hrefS);


