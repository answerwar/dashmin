
    document.addEventListener("DOMContentLoaded", async () => {
        // Mengisi dropdown layanan
        const svrUrl = `http://127.0.0.1:8000/api/radius/service`;
        const svrResponse = await fetch(svrUrl);
        const serviceData = await svrResponse.json();
        const serviceDropdown = document.getElementById("createService");

        // Bersihkan opsi yang ada dalam dropdown
        serviceDropdown.innerHTML = "";

        // Tambahkan opsi default (placeholder)
        const defaultServiceOption = document.createElement("option");
        defaultServiceOption.value = "";
        defaultServiceOption.text = "Pilih Layanan";
        serviceDropdown.appendChild(defaultServiceOption);

        // Loop melalui data layanan dan tambahkan setiap opsi ke dropdown
        serviceData.message.forEach(service => {
            const option = document.createElement("option");
            option.value = service.srvid;
            option.text = service.srvname;
            serviceDropdown.appendChild(option);
        });

        // Mengisi dropdown grup pengguna
        const grpUrl = `http://127.0.0.1:8000/api/radius/usergroups`;
        const grpResponse = await fetch(grpUrl);
        const groupData = await grpResponse.json();
        const groupDropdown = document.getElementById("createGroup");

        // Bersihkan opsi yang ada dalam dropdown
        groupDropdown.innerHTML = "";

        // Tambahkan opsi default (placeholder)
        const defaultGroupOption = document.createElement("option");
        defaultGroupOption.value = "";
        defaultGroupOption.text = "Pilih Grup";
        groupDropdown.appendChild(defaultGroupOption);

        // Loop melalui data grup pengguna dan tambahkan setiap opsi ke dropdown
        groupData.message.forEach(group => {
            const option = document.createElement("option");
            option.value = group.groupid;
            option.text = group.groupname;
            groupDropdown.appendChild(option);
        });
      const createButton = document.querySelector("#ModalCreateUser .btn-success");

    // Tambahkan event listener ke tombol "Created"
    createButton.addEventListener("click", () => {
        // Ambil data dari form modal
        const username = document.getElementById("createUsername").value;
        const password = document.getElementById("createPassword").value;
        const enableuser = document.getElementById("createStatus").value; 
        const svrid = document.getElementById("createService").value;
        const groupid = document.getElementById("createGroup").value; 
        const firstname = document.getElementById("createFirstname").value;
        const address = document.getElementById("createAlamat").value;
        const phone = document.getElementById("createPhone").value;
        const SN = document.getElementById("createSN").value;
        const comment = document.getElementById("createComment").value;
        // Membuat objek payload untuk dikirim sebagai JSON
        const payload = {
            username,
            password,
            enableuser,
            svrid,
            groupid,
            firstname,
            address,
            phone,
            SN,
            comment
        };
        // console.log(payload);
        // URL API untuk membuat pengguna baru
        const createUserUrl = "http://127.0.0.1:8000/api/radius/users";

        // Konfigurasi permintaan POST
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
        };

        // Kirim permintaan POST
 // Kirim permintaan POST
        fetch(createUserUrl, requestOptions)
            .then(response => {
                if (response.status === 201) {
                    // Jika kode status HTTP adalah 201 (Created), tampilkan pesan berhasil
                    alert("Berhasil Membuat user baru");
                    // Lakukan pengalihan (reload) halaman
                    location.reload();
                } else {
                    // Tangani respons jika kode status HTTP bukan 201
                    response.json().then(data => {const message = data.message;
                    // Lakukan sesuatu dengan pesan di sini
                      if (message === "Data already exists"){
                        alert(`Gagal, Data sudah pernah ditambah sebelumnya`);
                      }else{
                         alert(`Gagal, ${message}`);
                      }
                            
                      
                        
                    });
                }
            })
            .catch(error => {
                // Tangani kesalahan jika ada
                console.error("Error creating user:", error);
            });

    });


    });

    // Ambil elemen tombol "Created"
  