import { firebaseConfig, isFirebaseConfigured } from "./firebase-config.js";

const status = document.querySelector("#firebase-status");
const dot = document.querySelector("#status-dot");

if (!isFirebaseConfigured) {
  status.textContent = "Belum dikonfigurasi. Isi js/firebase-config.js setelah membuat Firebase Project.";
  dot.style.background = "#e3a52f";
} else {
  try {
    const { initializeApp } = await import("https://www.gstatic.com/firebasejs/10.14.1/firebase-app.js");
    const { getDatabase, ref, onValue } = await import("https://www.gstatic.com/firebasejs/10.14.1/firebase-database.js");
    const app = initializeApp(firebaseConfig);
    const db = getDatabase(app);
    onValue(ref(db, ".info/connected"), (snapshot) => {
      const connected = snapshot.val() === true;
      status.textContent = connected ? "Terhubung ke Firebase Realtime Database." : "Menghubungkan ke Firebase…";
      dot.style.background = connected ? "#19a66a" : "#e3a52f";
    });
  } catch (error) {
    status.textContent = "Inisialisasi gagal. Periksa konfigurasi Firebase dan koneksi internet.";
    dot.style.background = "#d94b4b";
    console.error(error);
  }
}
