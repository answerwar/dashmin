
    document.addEventListener("DOMContentLoaded", function () {
        // Cek apakah data login tersimpan di cookies
        const cookies = document.cookie.split(';').map(cookie => cookie.trim());
        let loginData = null;

        for (const cookie of cookies) {
            if (cookie.startsWith("loginData=")) {
                loginData = JSON.parse(cookie.substring("loginData=".length));
                break;
            }
        }
        
        if (!loginData || !loginData.email || !loginData.password) {
            // Jika tidak ada data login, atau data tidak lengkap, arahkan pengguna ke index.html
            window.location.href = "index.html";
        }

    });

    const footerContainer = document.getElementById('footerContainer');
    const includefooter = async () => {
        const response = await fetch('include/footer.html');
        const footerHtml = await response.text();
        footerContainer.innerHTML = footerHtml;
    };

    includefooter(); // Panggil fungsi untuk menyertakan navbar.html
