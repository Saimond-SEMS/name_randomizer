//	El principal objetivo de este desafío es fortalecer tus habilidades en lógica de programación.
//	Aquí deberás desarrollar la lógica para resolver el problema.

let pick = -1;
let counter = 0;
let on = 0;
let onSpeed = 0;
let rerrolExists = false;

const regexValidator = /^[a-zA-ZÀ-ÖØ-öø-ÿ-\s]+$/;

function agregarAmigo() {
	let name = document.getElementById("amigo");

	if (name.value == "") {

		alert("Campo vacío");
		return;
	}

	if (validateName(name.value)) {

		//let newName = document.createElement("li");
		let newNameDiv = document.createElement("div");
		let newNameLi = document.createElement("li");

		newNameDiv.setAttribute("class", "button-container");
		newNameDiv.setAttribute("class", "nombreAmigo");
		newNameLi.innerHTML = name.value;

		newNameDiv.appendChild(newNameLi);

		document.getElementById("listaAmigos").appendChild(newNameDiv);

		resetBox();
		if (!rerrolExists) {
			crearBotonRedo();
			rerrolExists = true;
		}
	}
}

function validateName(n) {
	let listaAmigos = document.querySelectorAll(".nombreAmigo");

	if (listaAmigos.length > 0) {

		for (const v of listaAmigos) {
			if (v.children[0].innerHTML == n) {
				alert("Nombre repetido");
				return false;
			}
		}

	}

	if ( !regexValidator.test(n) ){
		console.log(n)
		alert("Invalid simbols")
		return false;
	}

	return true;
}

function sortearAmigo() {
	let listaAmigos = document.querySelectorAll(".nombreAmigo");
	if (listaAmigos.length == 0) {
		return;
	}

	resetGame();
	console.log(listaAmigos);
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
	let listaAmigos = document.querySelectorAll(".nombreAmigo");
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
	let listaAmigos = document.querySelectorAll(".nombreAmigo");
	counter = Math.pow(Math.random()+1, 2)*100;
	on = 1;
	onSpeed = 2.1;
	pick = -1;

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
	let listaAmigos = document.querySelectorAll(".nombreAmigo");

	for (const v of document.querySelectorAll(".nombreAmigo")) {
		document.getElementById("listaAmigos").removeChild(v);
	}

	document.getElementById("botonRedo").remove();
	rerrolExists = false;
}

function winner() {
	let w = document.querySelector("li[picked]");
	w.setAttribute("winner", true);
	w.removeAttribute("picked");
}
