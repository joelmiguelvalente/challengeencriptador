/**
 * Obtenemos todos los inputs/campos
*/
const mensaje = document.getElementById("input"),
mostrar = document.querySelector(".resultado-ver"),
resultado = document.getElementById("resultado"),
// Botones
boton_encriptar = document.getElementById("encriptar"),
boton_desencriptar = document.getElementById("desencriptar"),
boton_copiar = document.getElementById("copiar");

mensaje.addEventListener('keyup', tecla => {
	mostrar.style.display = 'none'
   //Tecla para borrar y espacio permitidas
   if (tecla.code === 'Backspace' || tecla.code === 'Space') return true;
   // Solo acepta numeros y letras
   return /[A-Za-z0-9]/.test(String.fromCharCode(tecla.keyCode));
})

/**
 * Informacion sobre objetos
 * https://developer.mozilla.org/es/docs/Web/JavaScript/Guide/Working_with_Objects
*/
var mapObjVocal = { a: "ai", e: "enter", i: "imes", o: "ober", u: "ufat" };
var mapObjClave = { ai: "a", enter: "e", imes: "i", ober: "o", ufat: "u" };

var regexV = /a|e|i|o|u/img;
var regexC = /ai|enter|imes|ober|ufat/img;

// Continuamos
var continuar = true;

function generador(accion) {
	var nuevo = [];
   var letra = mensaje.value;
   // https://elcodigoascii.com.ar/
   var espacio = 32, empieza = 97, termina = 122;
   // Volvemos a true
   continuar = true;
   // https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Array/filter
   letra.split('').filter(word => {
   	if((empieza > word.charCodeAt(0) || termina < word.charCodeAt(0)) && word.charCodeAt(0) != espacio) {
   		alert('No permitido: ' + word)
   		continuar = false;
   	}
  	});
  	if(continuar) {
		// Forzamos a minusculas
		letra = letra.toLowerCase()
		// Buscamos y reemplazamos
		letra = letra.replace((accion ? regexV : regexC), matched => (accion ? mapObjVocal[matched] : mapObjClave[matched]));

		resultado.innerHTML = letra;
		mensaje.value = '';
		if(accion) {
			boton_encriptar.classList.add('wait')
			boton_encriptar.innerHTML += ' <span id="load"><i></i> espere...</span>'
		} else {
			boton_desencriptar.classList.add('wait')
			boton_desencriptar.innerHTML += ' <span id="load"><i></i> espere...</span>'
		}
		setTimeout(() => {
			if(accion) {
				boton_encriptar.classList.remove('wait')
				boton_encriptar.removeChild(document.getElementById("load"))
			} else {
				boton_desencriptar.classList.remove('wait')
				boton_desencriptar.removeChild(document.getElementById("load"))
			}
			if(screen.width <= 560) {
				/*
				 * https://developer.mozilla.org/es/docs/Web/API/Element/clientHeight
				*/
				window.scroll({
				  	top: document.querySelector(".area-input").offsetHeight + 20,
				  	behavior: 'smooth'
				})
			}
			mostrar.removeAttribute('style')
		}, 2000) // 2s
	}
}

async function copiar(){
   resultado.removeAttribute("disabled")
   resultado.select();
   // Por alguna razón no me funciona
  	// navigator.clipboard.writeText(resultado.value)
  	if(document.execCommand("copy")) resultado.setAttribute("disabled", "")
}

boton_encriptar.addEventListener('click', () => generador(true))
boton_desencriptar.addEventListener('click', () => generador(false))
boton_copiar.addEventListener('click', () => copiar())
