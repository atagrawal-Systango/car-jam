
const firebaseConfig = {
  apiKey: "AIzaSyBjUiOBZbSlTmqL2SxIab5KBaQdihkHcyI",
  authDomain: "login-page-6431a.firebaseapp.com",
  databaseURL: "https://login-page-6431a-default-rtdb.firebaseio.com",
  projectId: "login-page-6431a",
  storageBucket: "login-page-6431a.appspot.com",
  messagingSenderId: "534588316511",
  appId: "1:534588316511:web:fa8755876986a4a271f4ea"
};
 

  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  const auth =  firebase.auth();
  signOut();


  //signup function
  function signUp(){
    var email = document.getElementById("email");
    var password = document.getElementById("password");

    const promise = auth.createUserWithEmailAndPassword(email.value,password.value);
    //
    promise.catch(e=>alert(e.message));
    set(ref(database,'users/'*user.uid))
    {
        username: username,
        email=email
    } 


    alert("SignUp Successfully");
  }

  let signInBtn= document.getElementById("signIn");
  if(signInBtn != null)
  {
    signInBtn.addEventListener("click",signIn);

  }
  //signIN function
  function  signIn(){
    var email = document.getElementById("email");
    var password  = document.getElementById("password");
    const promise = auth.signInWithEmailAndPassword(email.value,password.value);
    
    // promise.catch(e=>alert(e.message));
    let error = document.querySelector("#myerror");
    if(error!=null)
    {
      promise.catch((e)=>{
        error.innerHTML= e.message;
      })
    }
    
    // alert("SignIn Successfully");
   
    
  }
  // function signIn(){
  //   auth.signIn();
  //   alert("SignIn Successfully from System");
  // }
  


  //signOut

  function signOut(){
    auth.signOut();
    console.log("SignOut Successfully from System");
  }

  //active user to homepage
  firebase.auth().onAuthStateChanged((user)=>{
    if(user){
      var email = user.email;
      console.log("Active user "+email);
      
      location.replace("main.html");

    }else{
      console.log("No Active user Found")
    }
  }) 


  
  
///----------------------------------------------------------
const notificationButton = document.getElementById("signIn");
let swRegistration = null;



  initialize();


function initialize() {
  if ("serviceWorker" in navigator && "PushManager" in window) {
    console.log("Service Worker and Push is supported");

    //Register the service worker
    navigator.serviceWorker
      .register("serviceWorker.js")
      .then(swReg => {
        // console.log("Service Worker is registered", swReg);

        swRegistration = swReg;
        initializeUi();
      })
      .catch(error => {
        // console.error("Service Worker Error", error);
      });
  } else {
    console.warn("Push messaging is not supported");
    notificationButton.textContent = "Push Not Supported";
  }
}

function initializeUi() {
  notificationButton.addEventListener("click", () => {
    console.log("asbkacbcsdlhn");
    displayNotification();
  });
}

function displayNotification() {
  if (window.Notification && Notification.permission === "granted") {
    notification();
  }
  // If the user hasn't told if he wants to be notified or not
  // Note: because of Chrome, we are not sure the permission property
  // is set, therefore it's unsafe to check for the "default" value.
  else if (window.Notification && Notification.permission !== "denied") {
    Notification.requestPermission(status => {
      if (status === "granted") {
        notification();
      } else {
        alert("You denied or dismissed permissions to notifications.");
      }
    });
  } else {
    // If the user refuses to get notified
    alert(
      "You denied permissions to notifications. Please go to your browser or phone setting to allow notifications."
    );
  }
}

function notification() {
  const options = {
    body: "Welcome to Parking Jam!!!"
  };
  swRegistration.showNotification("PWA Notification!", options);
}


  