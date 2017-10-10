
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyA2AplNuJVYIHh3YXfvILIoGRBZGYCW270",
    authDomain: "fir-testing-4910b.firebaseapp.com",
    databaseURL: "https://fir-testing-4910b.firebaseio.com",
    projectId: "fir-testing-4910b",
    storageBucket: "",
    messagingSenderId: "615773359241"
  };
  firebase.initializeApp(config);


    firebase.auth().onAuthStateChanged(function(user) {
      window.user = user;
      // Step 1:
      //  If no user, sign in anonymously with firebase.auth().signInAnonymously()
      //  If there is a user, log out out user details for debugging purposes.
    });

  
   
    document.querySelector('#sign-in').addEventListener('click', function(e) {
      e.preventDefault();
      e.stopPropagation();
      var email = document.querySelector('#email').value;
      var password = document.querySelector('#password').value
      var credential = firebase.auth.EmailAuthProvider.credential(email, password);
      var auth = firebase.auth();
      var currentUser = auth.currentUser;
      
      // Step 2
      //  Get a credential with firebase.auth.emailAuthProvider.credential(emailInput.value, passwordInput.value)
      //  If there is no current user, log in with auth.signInWithCredential(credential)
      //  If there is a current user an it's anonymous, atttempt to link the new user with firebase.auth().currentUser.link(credential) 
      //  The user link will fail if the user has already been created, so catch the error and sign in.
    });
    
    document.querySelector('#sign-out').addEventListener('click', function(e) {
      e.preventDefault();
      e.stopPropagation();
      firebase.auth().signOut();
    });

    var messagesRef = new Firebase('https://fir-testing-4910b.firebaseio.com/users');
var userId = 0;

// For user authentication
function authHandler(error, authData) {
  if (error) {
    console.log('Login Failed!', error);
  } else {
    // Set the gravatar
    document.getElementById('gravatar').src = authData.password.profileImageURL;
  }
}

// Log the user in with an email combination
messagesRef.authWithPassword({
  email    : email,
  password : password
}, authHandler);

messagesRef.onAuth(function(authData) {
   userId = authData.uid;
});

var messageField = document.getElementById('messageInput');
var messageResults = document.getElementById('results');

// Save data to firebase
function savedata(){
  var message = messageField.value;

  messagesRef.child('users').child(userId).push(
  {
  fieldName:'messageField', 
  text:message
  });
  messageField.value = '';
}

// Update results when data is added
messagesRef.child('users').child(userId).limitToLast(10).on('child_added', function (snapshot) {
    var data = snapshot.val();
  var message = data.text;

    if (message != undefined)
    {
      messageResults.value += '\n' + message;
    }
});