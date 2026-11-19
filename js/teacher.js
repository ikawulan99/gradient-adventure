import { firebaseReady } from "./app.js";
import {
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.14.1/firebase-auth.js";

const form = document.querySelector("#teacher-login-form");
const loginPanel = document.querySelector("#teacher-login-panel");
const dashboard = document.querySelector("#teacher-dashboard");
const message = document.querySelector("#teacher-message");
const loginButton = document.querySelector("#teacher-login");
const logoutButton = document.querySelector("#teacher-logout");

function showMessage(text, isError = false) {
  if (!message) return;
  message.textContent = text;
  message.style.color = isError ? "#b42318" : "#276e9e";
}

function isTeacherAccount(claims) {
  return claims.role === "teacher" || claims.isTeacher === true || claims.admin === true;
}

function showLogin() {
  if (loginPanel) loginPanel.hidden = false;
  if (dashboard) dashboard.hidden = true;
}

function showDashboard() {
  if (loginPanel) loginPanel.hidden = true;
  if (dashboard) dashboard.hidden = false;
}

form?.addEventListener("submit", async (event) => {
  event.preventDefault();
  const email = document.querySelector("#teacher-email").value.trim();
  const password = document.querySelector("#teacher-password").value;

  if (!email || !password) {
    showMessage("Masukkan email dan password.", true);
    return;
  }

  loginButton.disabled = true;
  loginButton.textContent = "Memeriksa akun…";
  showMessage("Mengautentikasi akun guru…");

  try {
    const { auth } = await firebaseReady;
    const credential = await signInWithEmailAndPassword(auth, email, password);
    const token = await credential.user.getIdTokenResult(true);

    if (!isTeacherAccount(token.claims)) {
      await signOut(auth);
      showLogin();
      showMessage("Akun berhasil dikenali, tetapi belum memiliki hak akses guru. Minta administrator menetapkan custom claim role=teacher.", true);
      return;
    }

    showDashboard();
  } catch (error) {
    console.error("Teacher sign-in:", error);
    const errors = {
      "auth/invalid-credential": "Email atau password tidak sesuai.",
      "auth/user-not-found": "Akun guru tidak ditemukan.",
      "auth/wrong-password": "Password tidak sesuai.",
      "auth/too-many-requests": "Terlalu banyak percobaan. Coba lagi nanti.",
      "auth/operation-not-allowed": "Metode Email/Password belum diaktifkan di Firebase Authentication.",
      "auth/network-request-failed": "Koneksi internet bermasalah."
    };
    showMessage(errors[error.code] || "Login gagal. Periksa data akun dan konfigurasi Firebase.", true);
  } finally {
    loginButton.disabled = false;
    loginButton.textContent = "Masuk";
  }
});

logoutButton?.addEventListener("click", async () => {
  try {
    const { auth } = await firebaseReady;
    await signOut(auth);
    showLogin();
    showMessage("Anda sudah keluar dari dashboard.");
  } catch (error) {
    console.error("Teacher sign-out:", error);
    showMessage("Tidak dapat keluar. Silakan muat ulang halaman.", true);
  }
});

firebaseReady.then(({ auth }) => {
  onAuthStateChanged(auth, async (user) => {
    if (!user || user.isAnonymous) {
      showLogin();
      return;
    }
    try {
      const token = await user.getIdTokenResult();
      if (isTeacherAccount(token.claims)) {
        showDashboard();
      } else {
        await signOut(auth);
        showLogin();
        showMessage("Akun ini belum memiliki hak akses guru.", true);
      }
    } catch (error) {
      console.error("Teacher role verification:", error);
      showLogin();
      showMessage("Hak akses guru belum dapat diverifikasi.", true);
    }
  });
}).catch((error) => {
  console.error(error);
  showMessage("Firebase belum siap. Periksa konfigurasi Firebase.", true);
});
