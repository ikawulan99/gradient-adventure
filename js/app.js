import { firebaseConfig, isFirebaseConfigured } from "./firebase-config.js";
import { initializeApp, getApps, getApp } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-app.js";
import {
  getAuth,
  setPersistence,
  browserLocalPersistence,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.14.1/firebase-auth.js";
import {
  getDatabase,
  ref,
  onValue
} from "https://www.gstatic.com/firebasejs/10.14.1/firebase-database.js";

export let app = null;
export let auth = null;
export let db = null;

export const firebaseReady = (async () => {
  if (!isFirebaseConfigured) {
    throw new Error("Konfigurasi Firebase belum lengkap.");
  }

  app = getApps().length ? getApp() : initializeApp(firebaseConfig);
  auth = getAuth(app);
  db = getDatabase(app);

  try {
    await setPersistence(auth, browserLocalPersistence);
  } catch (error) {
    console.warn("Persistensi sesi tidak dapat diatur:", error);
  }

  return { app, auth, db };
})();

function setConnectionStatus(message, connected = null) {
  const status = document.querySelector("#firebase-status");
  const dot = document.querySelector("#status-dot");
  if (status) status.textContent = message;
  if (dot) {
    dot.style.background =
      connected === true ? "#19a66a" :
      connected === false ? "#d94b4b" : "#e3a52f";
  }
}

firebaseReady.then(({ db: database }) => {
  const connectedRef = ref(database, ".info/connected");
  onValue(connectedRef, (snapshot) => {
    const connected = snapshot.val() === true;
    setConnectionStatus(
      connected
        ? "Terhubung ke Firebase Realtime Database."
        : "Firebase siap; menunggu koneksi database…",
      connected
    );
  }, (error) => {
    setConnectionStatus("Tidak dapat membaca status koneksi database. Periksa konfigurasi dan aturan Firebase.", false);
    console.error("Realtime Database:", error);
  });
}).catch((error) => {
  setConnectionStatus("Firebase belum siap. Periksa js/firebase-config.js.", false);
  console.error(error);
});

export { onAuthStateChanged };
