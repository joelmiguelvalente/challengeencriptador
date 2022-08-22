const app = document.getElementById("app")
const area = app.querySelector(".area")
const resultado = app.querySelector(".resultado")

// Obtenemos todos los botones
var botones = app.querySelectorAll(".boton");
var values = [].map.call(botones, (boton, index) =>{
	// Creamos el evento click
	boton.addEventListener('click', () => ejecutame(boton.dataset.action))
});

area.querySelector('textarea').addEventListener('keyup', e => {
	// Forzamos a las mayusculas por las minusculas
	nuevovalor = area.querySelector('textarea').value.toLowerCase();
	// Reemplazamos letras con tilde o ñ por letras comunes
	nuevovalor = nuevovalor.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
	// Reemplazamos números/simbolos por vacio
	nuevovalor = nuevovalor.replace(/[^a-z ]/g, "");
	area.querySelector('textarea').value = nuevovalor
	// Ahora ocultamos y mostramos
	resultado.querySelector(".caja-textos").removeAttribute("style")
	resultado.querySelector(".resultado-ver").style.display = "none"
	area.querySelector("textarea").onblur = area.querySelector("textarea").style.border = ''
})


// Objeto
var mapa = { 
	a: "ai", // key: value
	e: "enter", 
	i: "imes", 
	o: "ober", 
	u: "ufat" 
};

function CreateNewObject() {
	// encontrado en: https://es.stackoverflow.com/questions/414029/invertir-clave-valor-en-un-objeto
	let nuevoObjeto = {}; // Creamos un nuevo objeto
	for (const key in mapa) {
		let nuevaKey = mapa[key];
		nuevoObjeto[nuevaKey] = key
	}
	return nuevoObjeto;
}

copiando = () => {
   areaText.value = "";
   resultado.querySelector(".boton").innerHTML = "Copiado...";
   setTimeout(() => resultado.querySelector(".boton").innerHTML = "Copiar", 1500)
}

ejecutame = accion =>  {
	areaText = area.querySelector('textarea');
	resultadoText = resultado.querySelector('textarea');
	// Acción de copiar...
	if(accion === 'copiar') {
		resultadoText.select();
		// https://developer.mozilla.org/en-US/docs/Web/API/Clipboard/writeText
		navigator.clipboard.writeText(resultadoText.value).then(() => copiando(), () => {
			if(document.execCommand("copy")) copiando()
		});
	}
	// Acción de encriptar/desencriptar...
	if(accion === 'encriptar' || accion === 'desencriptar') {
		let texto = areaText.value;
		if(texto === '') {
			resultado.querySelector(".h3").style.display = "block"
			areaText.onfocus = areaText.style.border = '1px solid red'
			return;
		}
	 	var keys = Object.keys(mapa);
	 	var values = Object.values(mapa);

	   // https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/RegExp/toString
	   var tostring = (accion === 'encriptar' ? keys : values).join('|').toString();
	   var newExpresion = new RegExp(tostring, 'img');
		texto = texto.replace(newExpresion, matched => (accion === 'encriptar' ? mapa[matched] : CreateNewObject()[matched]));

		// Mostramos el resultado
		resultadoText.innerHTML = texto;
		// Limpiamos donde escribimos
		areaText.innerHTML = "";
		// Ahora ocultamos y mostramos
		resultado.querySelector(".caja-textos").style.display = "none"
		resultado.querySelector(".resultado-ver").removeAttribute("style")
	}
}