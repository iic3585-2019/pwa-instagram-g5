// Give the service worker access to Firebase Messaging.
// Note that you can only use Firebase Messaging here, other Firebase libraries
// are not available in the service worker.
importScripts('https://www.gstatic.com/firebasejs/4.8.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/4.8.1/firebase-messaging.js');
//  // Initialize the Firebase app in the service worker by passing in the
//  messagingSenderId.
firebase.initializeApp({
  apiKey: "AIzaSyC6y5E8L2XXjcT9C9ypMb_yNn1XnedQN_c",
  authDomain: "pwa-instagram.firebaseapp.com",
  databaseURL: "https://pwa-instagram.firebaseio.com",
  projectId: "pwa-instagram",
  storageBucket: "pwa-instagram.appspot.com",
  messagingSenderId: "723544637426"
});
// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
const messaging = firebase.messaging();