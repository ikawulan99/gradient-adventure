import { firebaseReady } from "./app.js";
import { signInAnonymously, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-auth.js";

const button = document.querySelector("#student-continue");
const message = document.querySelector("#student-message");
const codeInput = document.querySelector("#class-code");
const nameInput = document.querySelector("#student-name");

function showMessage(text, isError = false) {
  if (!message) return;
  message.textContent = text;
  message.style.color = isError ? "#b42318" : "#276e9e";
}

function friendlyError(error) {
  const messages = {
    "auth/operation-not-allowed": "Login anonim belum diaktifkan di Firebase Authentication.",
    "auth/network-request-failed": "Koneksi internet bermasalah. Silakan coba kembali.",
    "auth/too-many-requests": "Terlalu banyak percobaan. Tunggu sebentar lalu coba lagi."
  };
  return messages[error.code] || "Login siswa belum berhasil. Periksa pengaturan Firebase lalu coba lagi.";
}

if (button) {
  button.addEventListener("click", async () => {
    const code = codeInput?.value.trim().toUpperCase() || "";
    const name = nameInput?.value.trim() || "";

    if (!code || !name) {
      showMessage("Masukkan kode kelas dan nama tampilan terlebih dahulu.", true);
      return;
    }
    if (name.length > 40 || code.length > 20) {
      showMessage("Nama maksimal 40 karakter dan kode kelas maksimal 20 karakter.", true);
      return;
    }

    button.disabled = true;
    button.textContent = "Menghubungkan…";
    showMessage("Menghubungkan ke layanan autentikasi Firebase…");

    try {
      const { auth } = await firebaseReady;
      const credential = await signInAnonymously(auth);

      // Data ini hanya disimpan lokal untuk melanjutkan alur bergabung pada tahap berikutnya.
      // Penulisan profil dan validasi kode kelas menunggu Database Rules/backend tepercaya.
      sessionStorage.setItem("ga_student_profile", JSON.stringify({
        uid: credential.user.uid,
        displayName: name,
        classCode: code
      }));

      showMessage(`Autentikasi berhasil, ${name}! Identitas sesi siswa sudah dibuat. Proses validasi kode kelas akan dilanjutkan setelah layanan kelas dan aturan database diaktifkan.`);
    } catch (error) {
      console.error("Student sign-in:", error);
      showMessage(friendlyError(error), true);
    } finally {
      button.disabled = false;
      button.textContent = "Lanjutkan";
    }
  });
}

firebaseReady.then(({ auth }) => {
  onAuthStateChanged(auth, (user) => {
    if (user?.isAnonymous && message && !message.textContent) {
      showMessage("Sesi siswa sebelumnya masih aktif. Silakan lanjutkan.");
    }
  });
}).catch(() => {
  showMessage("Firebase belum siap. Periksa konfigurasi Firebase.", true);
});
