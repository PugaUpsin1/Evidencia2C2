import { initializeApp } from "https://www.gstatic.com/firebasejs/9.13.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.13.0/firebase-auth.js";


const firebaseConfig = {
    apiKey: "AIzaSyARai-CVNpSP04qwEMs6e4LTJe1Pnvp1tE",
    authDomain: "proyectofinal-bbacf.firebaseapp.com",
    projectId: "proyectofinal-bbacf",
    storageBucket: "proyectofinal-bbacf.appspot.com",
    messagingSenderId: "691116682271",
    appId: "1:691116682271:web:80a48fb5cac47ba732b92a"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const auth = getAuth();
 //variables.
  var email ="";
  var password = "";

  //Botones
  var btningres = document.getElementById('ingresar-lg');
  var btnlimp = document.getElementById('limpiar');


  //Funciones
  function leerusuario(){
    email = document.getElementById('Correo-lg').value;
    password = document.getElementById('Contra-lg').value;
    console.log(email,password);
   
  }


  function iniciarSesion(){
    leerusuario();
    signInWithEmailAndPassword(auth,email,password)
    .then((userCredencial)=>{
        const user = userCredencial.user
        alert("Se Inicio Sesion");
        window.close.href= "/html/login.html";
        window.location.href="/html/Admin.html";
    }).catch((error) => {
        if(error.code == 'auth/invalid-email' || error.code == 'auth/wrong-password' ){
            alert('Usuario o contraseña incorrectos')
        }else{
            alert("Error " + error);
        }
    });
  }

  function clean(){
    document.getElementById('Correo-lg').value = "";
    document.getElementById('Contra-lg').value = "";
  }
  //eventListener
 btningres.addEventListener('click',iniciarSesion);
 btnlimp.addEventListener('click',clean);