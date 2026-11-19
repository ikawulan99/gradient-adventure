const button = document.querySelector("#student-continue");
const message = document.querySelector("#student-message");
button?.addEventListener("click", () => {
  const code = document.querySelector("#class-code").value.trim();
  const name = document.querySelector("#student-name").value.trim();
  if (!code || !name) {
    message.textContent = "Masukkan kode kelas dan nama tampilan terlebih dahulu.";
    return;
  }
  message.textContent = "Formulir terisi. Integrasi autentikasi dan validasi kode kelas dibuat pada Tahap 2.";
});
