//	El principal objetivo de este desafío es fortalecer tus habilidades en lógica de programación.
//	Aquí deberás desarrollar la lógica para resolver el problema.

let listNombres= [];
let nAmigos = 0;
let frames = 0;
let pick = -1;

let counter = 0;
let element;
let on = 0;
let onSpeed = 0;

let win = false;
let rerrolExists = false;

function agregarAmigo() {
	let name = document.getElementById("amigo");

	if (name.value == "") {

		alert("Campo vacío");

	} else {
		//let newName = document.createElement("li");
		let newNameDiv = document.createElement("div");
		let newNameLi = document.createElement("li");

		newNameDiv.setAttribute("class", "button-container");
		newNameDiv.setAttribute("id", "nombreAmigo");
		newNameLi.innerHTML = name.value;

		newNameDiv.appendChild(newNameLi);

		let block = document.getElementById("listaAmigos");
		block.appendChild(newNameDiv);
		// amigos.push(block);

		resetBox();
		if (!rerrolExists) {
			crearBotonRedo();
			rerrolExists = true;
		}
	}
}

function sortearAmigo() {
	listaAmigos = document.querySelectorAll("#nombreAmigo");
	if (listaAmigos.length == 0) {
		return;
	}

	resetGame();
	element = document.getElementById("botonSort");
	requestAnimationFrame(rollWheel);
}

function rollWheel(){
	if (counter > 0) {
		requestAnimationFrame((t) => rollWheel(t));
		counter-= 2;
	} else{
		winner();
		return;
	}

	on++;
	if (on == parseInt(onSpeed)) {
		pickAmigo();
		on = 0;
		onSpeed*=1.1;
	}
}

function pickAmigo() {
	let elementPicked;

	if (pick == -1)	{
		pick=0;
	} else if (listaAmigos[pick+1] == null)	{
		listaAmigos[pick].children[0].removeAttribute("picked");	
		pick=0;
	} else	{
		listaAmigos[pick].children[0].removeAttribute("picked");
		pick++;
	}

	listaAmigos[pick].children[0].setAttribute("picked", true);
}

function resetBox() {
	document.getElementById("amigo").value = "";
}

function resetGame() {
	counter = Math.pow(Math.random()+1, 2)*100;
	on = 1;
	onSpeed = 2.1;
	pick = -1;
	win = false;

	for (const v of listaAmigos) {
		v.children[0].removeAttribute("picked");
		v.children[0].removeAttribute("winner");
	}
}

function crearBotonRedo(){
	let b = document.createElement("button");
	b.setAttribute("id", "botonRedo");
	b.setAttribute("onclick", "limpiarNombres()")
	b.innerHTML= "Limpiar lista";

	document.getElementById("botonSort").parentElement.appendChild(b);
}

function limpiarNombres() {
	let listaN = document.querySelectorAll("#nombreAmigo");

	for (const v of document.querySelectorAll("#nombreAmigo")) {
		document.getElementById("listaAmigos").removeChild(v);
	}

	document.getElementById("botonRedo").remove();
	rerrolExists = false;
}

function winner() {
	let w = document.querySelector("li[picked]");
	w.setAttribute("winner", true);
	w.removeAttribute("picked");
	win = false;
}
