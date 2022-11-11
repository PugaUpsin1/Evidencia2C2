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




  //---------------------------------------ADMINISTRAR------------------------------

 // variables

 var id = "";
 var nom = "";
 var precio = "";
 var desc = "";
 var est = "";
 var Sec = "";
 var urlimg = "";
 var nomimg = "";

 //botones

 var btnIn = document.getElementById('btnInsertar');
 var btnBus = document.getElementById('btnBuscar');
 var btnAc = document.getElementById('btnActualizar');
 var btnEsta = document.getElementById('btnEsta');
 var btnLim = document.getElementById('btnLimpiar');
 var imgSe = document.getElementById('selecimg');
 var Most = document.getElementById('Mostrar');
 var Soft = document.getElementById('softw');
 var hard = document.getElementById('hardw');
 var btncargar = document.getElementById('cargar');


function leerInputs(){
   id = document.getElementById('id-prod').value;
   nom = document.getElementById('nom-prod').value;
   precio = document.getElementById('pre-prod').value;
   desc = document.getElementById('desc-prd').value;
   est = document.getElementById('Estatus').value;
   Sec = document.getElementById('SeccionProducto').value;
   urlimg = document.getElementById('url').value;


   console.log(id,nom,precio,desc,est,Sec,urlimg);
}

function Insertar(){
  leerInputs()
  set(ref(db,'prouctos/'+ id),{
    nom : nom,
    precio : precio,
    desc : desc,
    est : est,
    Sec : Sec,
    urlimg : urlimg
  }).then((response) => {
    alert("Se Agrego Producto");
  }).catch((error)=> {
    alert("Surgio un error" + error);
  })
}

function subirimg() {
  const file = event.target.files[0];
  const name = event.target.files[0].name;
  document.getElementById('dirimg').value = name
  let id = document.getElementById('id-prod').value;

  const storage = getStorage();
  const storageRef = refS(storage,'imagenes/' + id);

  uploadBytes(storageRef, file).then((snapshot)=>{
  })
  setTimeout(Downloadimg,1400);

}



function Downloadimg(){
  let id = document.getElementById('id-prod').value;
  const storageRef = refS(storage, 'imagenes/' + id);

  getDownloadURL(storageRef).then((url)=> {
    document.getElementById('url').value = url;
    document.getElementById('verimg').src = url
  }).catch((error) => {
    switch (error.code) {
        case 'storage/object-not-found':
        console.log('No existe la imagen');
        break;
        case 'storage/unauthorized':
        console.log('No cuenta con permisos');
        break;
        case 'storage/canceled':
        console.log('No hay Conexion');
        break;
        case 'storage/unknown':
        console.log('Hubo un error');
        break;
    }
    });
    
}

function RellenarInputs(){

document.getElementById('id-prod').value =id;
document.getElementById('nom-prod').value = nom;
document.getElementById('pre-prod').value = precio;
document.getElementById('desc-prd').value = desc;
document.getElementById('Estatus').value = est;
document.getElementById('SeccionProducto').value = Sec;
document.getElementById('url').url = urlimg;
}

function searchProd(){
  leerInputs();
  const dbref = ref(db);

  get(child(dbref, 'prouctos/' + id)).then((snapshot) => {
    if(snapshot.exists()){
      nom = snapshot.val().nom,
      precio = snapshot.val().precio,
      desc = snapshot.val().desc,
      est = snapshot.val().est,
      Sec = snapshot.val().Sec,
      urlimg = snapshot.val().urlimg
      Downloadimg();
      RellenarInputs();
    }else{
      alert("No existe el Producto");
    }
  }).catch((error) => {
    alert("Hubo un error" + error);
  })
}

function limpiar(){
  id = "";
  nom = "";
  precio = "";
  desc = "";
  est = "";
  Sec = "";
  const storageRef = refS(storage, 'gs://proyectofinal-bbacf.appspot.com/caja.png');
  getDownloadURL(storageRef).then((url)=> {
    document.getElementById('verimg').src = url
  }).catch((error) => {
      alert("No se encontro" + error);
    });
  RellenarInputs()
  document.getElementById('url').value = "";
  document.getElementById('dirimg').value ="";  
}


function updatProd(){
  leerInputs()
  update(ref(db,'prouctos/'+ id),{
    nom : nom,
    precio : precio,
    desc : desc,
    est : est,
    Sec : Sec,
    urlimg : urlimg
  }).then(() => {
    alert("Producto Actualizado");
  }).catch((error)=> {
    alert("Surgio un error" + error);
  });
}


function desbilitar(){
  leerInputs();
  if(est == 0){
    update(ref(db,'prouctos/'+ id),{
      est : 1
    }).then(() => {
      alert("Producto Desabilitado");
      searchProd();
      RellenarInputs();
      mostrarP();
      window.location.reload();
    }).catch((error)=> {
      alert("Surgio un error" + error);
    });
  }
  if(est == 1){
    update(ref(db,'prouctos/'+ id),{
      est : 0
    }).then(() => {
      alert("Producto Habilitado");
      searchProd();
      RellenarInputs();
      mostrarP();
      window.location.reload();
    }).catch((error)=> {
      alert("Surgio un error" + error);
    });
  }

}

function mostrarP(){
  const dbref = ref(db, 'prouctos/');
  onValue(dbref, (snapshot)=> {
    snapshot.forEach(childSnapshot => {
      const childKey = childSnapshot.key;
      const childData = childSnapshot.val();
      if(childData.Sec == 1){
        if(Soft){
          if(childData.est == 0){
          Soft.innerHTML = Soft.innerHTML + "<div id='prod'><img id='img-prod' src='"+childData.urlimg+"' alt=''><label for='' id='nomProd'>"
           +childData.nom+"</label><p id='descr-prod'>"
           +childData.desc+"</p><div id='barraprod'><label for='' id='precio-prod'>$" 
           +childData.precio+"</label><a href='http://' id='btnComprar'>Comprar</a></div></div>"
          }
        }
      }
      if(childData.Sec == 2){
        if(hard){
          if(childData.est == 0){
            hard.innerHTML = hard.innerHTML + "<div id='prod'><img id='img-prod' src='"+childData.urlimg+"' alt=''><label for='' id='nomProd'>"
           +childData.nom+"</label><p id='descr-prod'>"
           +childData.desc+"</p><div id='barraprod'><label for='' id='precio-prod'>$" 
           +childData.precio+"</label><a href='http://' id='btnComprar'>Comprar</a></div></div>"
          }
        }
      }
    });
  },{
    onlyOnce: true
  });
}

function preview(){
  const dbref = ref(db, 'prouctos/');
  onValue(dbref, (snapshot)=> {
    snapshot.forEach(childSnapshot => {
      const childKey = childSnapshot.key;
      const childData = childSnapshot.val();
      if(Most){
        if(childData.est == 0 ){
        if(childData.est == 0){var vest = "Habilitado";}
        if(childData.est == 1){var vest = "Deshabilitado";}
        if(childData.Sec == 1){var vSec = "Software";}
        if(childData.Sec == 2){var vSec = "Hardware";}
        Most.innerHTML = Most.innerHTML + "<div id='pm'><img id='img-pm' src='"+childData.urlimg+"' alt=''>"
        +"<div class='r1'><div class='id'><h3>ID</h3><label for=''>"
        +childKey+"</label></div>"
        +"<div class='n'><h3>Nombre</h3><label for=''>"+childData.nom+"</label></div>"
        +"<div class='p'><h3>Precio</h3><label for=''>"+childData.precio+"</label></div></div>"
        +"<div class='r2'><div class='E'><h3>Estatus</h3><label for=''>"+vest+"</label>"
        +"</div><div class='S'><h3>Seccion</h3><label for=''>"+vSec+"</label>"
        +"</div></div></div>"
        }
        if(childData.est == 1 ){
          if(childData.est == 0){var vest = "Habilitado";}
          if(childData.est == 1){var vest = "Deshabilitado";}
          if(childData.Sec == 1){var vSec = "Software";}
          if(childData.Sec == 2){var vSec = "Hardware";}
          Most.innerHTML = Most.innerHTML + "<div id='pm'><img id='img-pm' src='"+childData.urlimg+"' alt=''>"
          +"<div class='r1'><div class='id'><h3>ID</h3><label for=''>"
          +childKey+"</label></div>"
          +"<div class='n'><h3>Nombre</h3><label for=''>"+childData.nom+"</label></div>"
          +"<div class='p'><h3>Precio</h3><label for=''>"+childData.precio+"</label></div></div>"
          +"<div class='r2'><div class='E'><h3>Estatus</h3><label for=''>"+vest+"</label>"
          +"</div><div class='S'><h3>Seccion</h3><label for=''>"+vSec+"</label>"
          +"</div></div></div>"
          }
      }
    });
  },{
    onlyOnce: true
  });
}
window.onload = mostrarP();
window.onload = preview();




//Event Listener
btnIn.addEventListener('click',Insertar);
imgSe.addEventListener('click',subirimg);
btnBus.addEventListener('click',searchProd);
btnLim.addEventListener('click',limpiar);
btnAc.addEventListener('click', updatProd);
btnEsta.addEventListener('click',desbilitar);
btncargar.addEventListener('click',Downloadimg);
 


  