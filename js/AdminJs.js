  // Import the functions you need from the SDKs you need
  
  import { initializeApp } from "https://www.gstatic.com/firebasejs/9.13.0/firebase-app.js";
  import { getDatabase, onValue,ref,set,child,get,update,remove } from "https://www.gstatic.com/firebasejs/9.13.0/firebase-database.js";
  import { getStorage, ref as refS, uploadBytes, getDownloadURL, deleteObject } from "https://www.gstatic.com/firebasejs/9.13.0/firebase-storage.js";
  import { getAuth, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.13.0/firebase-auth.js";
 
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
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
  const db = getDatabase();
  const auth = getAuth();
  const storage = getStorage();

  //------------------------------LOGIN--------------------------------

  //variables.
  var email ="";
  var password = "";

  //Botones
  var btningres = document.getElementById('ingresar-lg');
  var btnlimp = document.getElementById('');


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
        alert("Ocurrio un error")
    });
  }

  //eventListener
  btningres.addEventListener('click',iniciarSesion);


  //---------------------------------------ADMINISTRAR------------------------------

 // variables

 var id = "";
 var nom = "";
 var precio = "";
 var desc = "";
 var est = "";
 var Sec = "";
 


  