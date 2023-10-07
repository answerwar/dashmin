    document.addEventListener("DOMContentLoaded", function () {
        // Seleksi elemen-elemen HTML
        const emailInput = document.getElementById("floatingInput");
        const passwordInput = document.getElementById("floatingPassword");
        const loginButton = document.querySelector("button[type='submit']");
        const rememberCheckbox = document.getElementById("rememberCheckbox");

        // Tambahkan event listener untuk form submission
        loginButton.addEventListener("click", function (e) {
            e.preventDefault(); // Mencegah pengiriman form default
            login();
        });

        // Tambahkan event listener untuk tombol "Enter" pada input password
        passwordInput.addEventListener("keydown", function (e) {
            if (e.key === "Enter") {
                login();
            }
        });

        // Fungsi untuk melakukan autentikasi
        function login() {
            // Simpan nilai input
            const userEmail = emailInput.value;
            const userPassword = passwordInput.value;

            // Simulasikan autentikasi (gantilah ini dengan logika autentikasi sesungguhnya)
            if (userEmail === "user@example.com" && userPassword === "password") {
                // Jika autentikasi berhasil, cek apakah kotak "Remember Me" dicentang

                    // Jika dicentang, set cookie yang berisi informasi login
                    const loginData = { email: userEmail, password: userPassword };
                    document.cookie = `loginData=${JSON.stringify(loginData)}; expires=Thu, 31 Dec 2099 23:59:59 UTC; path=/`;


                // Arahkan pengguna ke halaman home.html
                window.location.href = "home.html";
            } else {
                // Jika autentikasi gagal, tampilkan pesan kesalahan
                alert("Login failed. Please check your email and password.");
            }
        }
    });