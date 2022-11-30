const formulario = document.getElementById('formulario');
const inputs = document.querySelectorAll('#formulario input');

const expresiones = {
	nombre: /^[a-zA-Z0-9\_\-]{4,16}$/, 
	apellido: /^[a-zA-ZÀ-ÿ\s]{1,20}$/, 
	correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
	telefono: /^[9]\d{0,8}$/, 
    password: /^[a-zA-Z0-9\_\-]{6,12}$/,
	password1: /^[a-zA-Z0-9\_\-]{6,12}$/,
    
}

const campos = {
	nombre: false,
	apellido: false,
	correo: false,
	telefono: false,
    password:false,
	
	


}

const validarFormulario = (e) => {
	switch (e.target.name) {
		case "nombre":
			validarCampo(expresiones.nombre, e.target, 'nombre');
			console.log('funciona.')
		break;
		case "apellido":
			validarCampo(expresiones.apellido, e.target, 'apellido');
		break;
		case "correo":
			validarCampo(expresiones.correo, e.target, 'correo');
		break;
		case "telefono":
			validarCampo(expresiones.telefono, e.target, 'telefono');
		break;
        case "password":
			validarCampo(expresiones.password, e.target, 'password');
			validarPassword1()
		break;
        case "password1":
			validarPassword1()
			//validarCampo(expresiones.password1, e.target,'password1');
		break;
	}
}

const validarCampo = (expresion, input, campo) => {
	if(expresion.test(input.value)){
		document.getElementById(`grupo__${campo}`).classList.remove('formulario__grupo-incorrecto');
		document.getElementById(`grupo__${campo}`).classList.add('formulario__grupo-correcto');
		document.querySelector(`#grupo__${campo} i`).classList.add('fa-check-circle');
		document.querySelector(`#grupo__${campo} i`).classList.remove('fa-times-circle');
		document.querySelector(`#grupo__${campo} .formulario__input-error`).classList.remove('formulario__input-error-activo');
		campos[campo] = true;
	} else {
		document.getElementById(`grupo__${campo}`).classList.add('formulario__grupo-incorrecto');
		document.getElementById(`grupo__${campo}`).classList.remove('formulario__grupo-correcto');
		document.querySelector(`#grupo__${campo} i`).classList.add('fa-times-circle');
		document.querySelector(`#grupo__${campo} i`).classList.remove('fa-check-circle');
		document.querySelector(`#grupo__${campo} .formulario__input-error`).classList.add('formulario__input-error-activo');
		campos[campo] = false;
	}
}

const validarPassword1 = () => {
	const inputPassword1 = document.getElementById('password');
	const inputPassword2 = document.getElementById('password1');

	if(inputPassword1.value !== inputPassword2.value){
		document.getElementById(`grupo__password1`).classList.add('formulario__grupo-incorrecto');
		document.getElementById(`grupo__password1`).classList.remove('formulario__grupo-correcto');
		document.querySelector(`#grupo__password1 i`).classList.add('fa-times-circle');
		document.querySelector(`#grupo__password1 i`).classList.remove('fa-check-circle');
		document.querySelector(`#grupo__password1 .formulario__input-error`).classList.add('formulario__input-error-activo');
		campos['password'] = false;
	} else {
		document.getElementById(`grupo__password1`).classList.remove('formulario__grupo-incorrecto');
		document.getElementById(`grupo__password1`).classList.add('formulario__grupo-correcto');
		document.querySelector(`#grupo__password1 i`).classList.remove('fa-times-circle');
		document.querySelector(`#grupo__password1 i`).classList.add('fa-check-circle');
		document.querySelector(`#grupo__password1 .formulario__input-error`).classList.remove('formulario__input-error-activo');
		campos['password'] = true;
	}
}


inputs.forEach((input) => {
	input.addEventListener('keyup', validarFormulario);
	input.addEventListener('blur', validarFormulario);
});

formulario.addEventListener('submit', (e) => {
	e.preventDefault();

	const terminos = document.getElementById('terminos');
	if(campos.nombre && campos.apellido && campos.correo && campos.telefono && campos.password  && terminos.checked ){
		formulario.reset();

		document.getElementById('formulario__mensaje-exito').classList.add('formulario__mensaje-exito-activo');
		setTimeout(() => {
			document.getElementById('formulario__mensaje-exito').classList.remove('formulario__mensaje-exito-activo');
		}, 5000);

		document.querySelectorAll('.formulario__grupo-correcto').forEach((icono) => {
			icono.classList.remove('formulario__grupo-correcto');
		});
	} else {
		document.getElementById('formulario__mensaje').classList.add('formulario__mensaje-activo');
	}
});