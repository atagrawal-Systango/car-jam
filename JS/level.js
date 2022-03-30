// Your web app's Firebase configuration

const firebaseConfig = {
    apiKey: "AIzaSyBjUiOBZbSlTmqL2SxIab5KBaQdihkHcyI",
    authDomain: "login-page-6431a.firebaseapp.com",
    databaseURL: "https://login-page-6431a-default-rtdb.firebaseio.com",
    projectId: "login-page-6431a",
    storageBucket: "login-page-6431a.appspot.com",
    messagingSenderId: "534588316511",
    appId: "1:534588316511:web:fa8755876986a4a271f4ea"
  };
  
  
  firebase.initializeApp(firebaseConfig);
  const database = firebase.database();
  database.ref('users').orderByChild('moves').once('value')
    .then(function (snapshot) {
  
      var count = 1;
      snapshot.forEach((item) => {
        userName = item.val().username;
        userEmail = item.val().email;
        userScore = item.val().moves;
        document.getElementById('table_body').innerHTML +=
          "<tr><td>" + count + "</td><td>" + userName + "</td><td>" + userEmail + "</td><td>" + userScore + "</td></tr>";
        count++;
      });
    })
    .catch((error) => {
      console.log(error);
      return false;
    });
  