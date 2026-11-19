// Konfigurasi Firebase untuk proyek Gradient Adventure.
// Web config ini digunakan oleh aplikasi frontend; keamanan tetap bergantung pada
// Firebase Authentication dan Realtime Database Security Rules.
export const firebaseConfig = {
  apiKey: "AIzaSyCs4egevpf9x_zDdDmNekiN2THlB2kf2Klo",
  authDomain: "gradient-adventure.firebaseapp.com",
  databaseURL: "https://gradient-adventure-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "gradient-adventure",
  storageBucket: "gradient-adventure.firebasestorage.app",
  messagingSenderId: "811000302765",
  appId: "1:811000302765:web:ade42009772fa643f90a24"
};

export const isFirebaseConfigured =
  Boolean(firebaseConfig.apiKey) &&
  firebaseConfig.projectId === "gradient-adventure" &&
  (firebaseConfig.databaseURL.includes("firebasedatabase.app") ||
   firebaseConfig.databaseURL.includes("firebaseio.com"));
