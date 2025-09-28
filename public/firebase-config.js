
// This file initializes your Firebase app and creates references to the
// services (Auth, Firestore, Storage) you will use in your project.

// Step 1: Paste your personal firebaseConfig object here.
// You get this from the Firebase Console when you register a new web app.
  
  const firebaseConfig = {
    apiKey: "AIzaSyDMVzGRGFWiVfKlm80IZb12w2Pl9LRcLQ0",
    authDomain: "oreum-ai.firebaseapp.com",
    projectId: "oreum-ai",
    storageBucket: "oreum-ai.firebasestorage.app",
    messagingSenderId: "235953801285",
    appId: "1:235953801285:web:2492225d529b8c6186fb2c",
    measurementId: "G-4B6CJP0LSQ"
  };

// Step 2: Initialize Firebase using your configuration.
// This must be done before you use any Firebase services.
firebase.initializeApp(firebaseConfig); 

// Step 3: Get references to the services you need.
// These are the objects you will use to interact with Authentication,
// the Database, and Storage in your script.js file.
const auth = firebase.auth();
const db = firebase.firestore();
const storage = firebase.storage();
