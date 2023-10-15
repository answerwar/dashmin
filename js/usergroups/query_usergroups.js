// URL API

// Fungsi untuk mengubah format tanggal dan waktu
function formatDateTimeToJakartaTime(dateTimeStr) {
  const options = {
    timeZone: "Asia/Jakarta",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  };
  const dateTime = new Date(dateTimeStr);
  return dateTime.toLocaleString("id-ID", options);
}
// URL API
const apiUrl = "http://172.27.0.154:8000/api/radius/usergroups";


// Select the table body
const tableBody = document.querySelector("#usergroupsTable tbody");

// Fetch data from the API
fetch(apiUrl)
  .then((response) => response.json())
  .then(async (data) => {

      const createButton = document.querySelector(
        "#ModalCreateUsergroups .btn-success"
      );

      // Tambahkan event listener ke tombol "Created"
      createButton.addEventListener("click", () => {
        // Ambil data dari form modal
        const Creategroupname =
          document.getElementById("createGroupname").value;
        const Createipaddr = document.getElementById("createIpaddr").value;
        const CreateAlamat = document.getElementById("createAlamat").value;
        // Membuat objek payload untuk dikirim sebagai JSON
        const payload = {
          groupname: Creategroupname,
          ipaddr: Createipaddr,
          alamat: CreateAlamat,
        };
        console.log(payload);
        // URL API untuk membuat pengguna baru
        const createUsergroupUrl =
          "http://172.27.0.154:8000/api/radius/usergroups";

        // Konfigurasi permintaan POST
        const requestOptionsgroup = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        };

        // Kirim permintaan POST
        fetch(createUsergroupUrl, requestOptionsgroup)
          .then((response) => {
            if (response.status === 201) {
              // Jika kode status HTTP adalah 201 (Created), tampilkan pesan berhasil
              alert("Berhasil Membuat group baru");
              // Lakukan pengalihan (reload) halaman
              location.reload();
            } else {
              // Tangani respons jika kode status HTTP bukan 201
              response.json().then((data) => {
                const message = data.message;
                // Lakukan sesuatu dengan pesan di sini
                if (message === "Data already exists") {
                  alert(`Gagal, Data sudah pernah ditambah sebelumnya`);
                } else {
                  alert(`Gagal, ${message}`);
                }
              });
            }
          })
          .catch((error) => {
            // Tangani kesalahan jika ada
            console.error("Error creating user:", error);
          });
      });
    var rowNum = 1;
    // Loop through the data and create rows in the table
    for (const usergroups of data.message) {
      // Ubah format tanggal dan waktu
      usergroups.created_at = formatDateTimeToJakartaTime(
        usergroups.created_at
      );
      usergroups.updated_at = formatDateTimeToJakartaTime(
        usergroups.updated_at
      );
      // Buat baris tabel
      const row = document.createElement("tr");
      row.innerHTML = `
                        <td>${rowNum}</td>
                        <td>${usergroups.groupid}</td>
                        <td>${usergroups.groupname}</td>
                        <td>${usergroups.ipaddr}</td>
                        <td>${usergroups.alamat}</td>
                        <td>${usergroups.created_at}</td>
                        <td>${usergroups.updated_at}</td>
                        <td>
                            <button type="button" class="btn btn-sm btn-primary btn-edit-usergroups" data-bs-toggle="modal" data-bs-target="#ModalEditUsergroups"  data-id="${usergroups.groupid}">
                                <i class="fa fa-edit me-1"></i>Edit
                            </button>
                            <button
                                type="button"
                                class="btn btn-sm btn-danger btn-delete-usergroups"
                                data-bs-toggle="modal"
                                data-bs-target="#ModalDeleteUsergroups"
                                data-id="${usergroups.groupid}">
                                <i class="fa fa-trash me-1"></i>Delete
                            </button>
                        </td>
                    `;
      tableBody.appendChild(row);
      rowNum++;
      // Mendapatkan tombol "Delete" dalam baris ini
      const deleteButton = row.querySelector(".btn-delete-usergroups");
      // Tambahkan event listener ke tombol "Delete" di dalam baris ini
      deleteButton.addEventListener("click", () => {
        const usergroupsId = usergroups.groupid;

        const confirmationMessage = `Apakah Anda yakin akan menghapus Groups ${usergroups.groupname}?`;
        const modalConfirmationMessage = document.querySelector(
          "#ModalDeleteUsergroups h3"
        );
        modalConfirmationMessage.textContent = confirmationMessage;
        // console.log(confirmationMessage);
        // Ambil elemen tombol "Delete" di dalam modal
        const deleteButtonmodal = document.querySelector(
          "#ModalDeleteUsergroups .btn-danger"
        );
        // Tambahkan event listener ke tombol "Delete" di dalam modal
        deleteButtonmodal.addEventListener("click", (event) => {
          // Mendapatkan ID pengguna dari tombol yang diklik
          const deleteUserUrl = `http://172.27.0.154:8000/api/radius/usergroups/${usergroupsId}`;
          // Konfigurasi permintaan DELETE
          const requestOptions = {
            method: "DELETE",
          };

          // Kirim permintaan DELETE
          fetch(deleteUserUrl, requestOptions)
            .then((response) => {
              if (response.status === 200) {
                // Jika kode status HTTP adalah 200, maka pengguna berhasil dihapus
                alert("Groups berhasil dihapus.");
                // Lakukan pengalihan (reload) halaman atau tindakan lain yang sesuai
                location.reload(); // Reload halaman jika diperlukan
              } else {
                // Tangani respons jika kode status HTTP bukan 200
                response.json().then((data) => {
                  console.error("Error deleting Groups:", data);
                });
              }
            })
            .catch((error) => {
              // Tangani kesalahan jika ada
              console.error("Error deleting Groups:", error);
            });

          // Tutup modal konfirmasi secara manual jika diperlukan
          $("#ModalDeleteUsergroups").modal("hide");
        });
      });

      // Mendapatkan tombol "edit" dalam baris ini
      const editButton = row.querySelector(".btn-edit-usergroups");

      // Tambahkan event listener ke tombol "edit" di dalam baris ini
      editButton.addEventListener("click", () => {
        // Mengisi field-field dalam modal edit dengan data usergroups
        const editGroupnameInput = document.getElementById("editGroupname");
        const editIpaddrInput = document.getElementById("editIpaddr");
        const editAlamatInput = document.getElementById("editAlamat");

        editGroupnameInput.value = usergroups.groupname;
        editIpaddrInput.value = usergroups.ipaddr;
        editAlamatInput.value = usergroups.alamat;
        // Mendapatkan tombol "Update" dalam modal edit
        const updateButton = document.querySelector(
          "#ModalEditUsergroups .btn-primary"
        );

        // Tambahkan event listener ke tombol "Update"
        updateButton.addEventListener("click", () => {
          // Mengambil nilai-nilai dari field-field dalam modal edit
          const editedData = {
            groupname: editGroupnameInput.value,
            ipaddr: editIpaddrInput.value,
            alamat: editAlamatInput.value,
          };
          console.log(editedData);
          // Konfigurasi permintaan PUT
          const putUserUrl = `http://172.27.0.154:8000/api/radius/usergroups/${usergroups.groupid}`;
          const requestOptions = {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(editedData),
          };

          // Kirim permintaan PUT
          fetch(putUserUrl, requestOptions)
            .then((response) => {
              if (response.status === 200) {
                // Jika berhasil, tampilkan pesan sukses atau lakukan tindakan lain yang sesuai
                alert("Data Groups berhasil diperbarui.");
                // Tutup modal edit
                $("#ModalEditUsergroups").modal("hide");
                // Lakukan pengalihan (reload) halaman atau tindakan lain yang sesuai
                location.reload(); // Reload halaman jika diperlukan
              } else {
                // Jika ada kesalahan, tangani respons dengan menampilkan pesan kesalahan
                response.json().then((data) => {
                  console.error("Error updating user:", data);
                  alert("Terjadi kesalahan saat memperbarui data pengguna.");
                });
              }
            })
            .catch((error) => {
              // Tangani kesalahan jika ada
              console.error("Error updating user:", error);
              alert("Terjadi kesalahan saat memperbarui data pengguna.");
            });
        });
        // Menampilkan modal edit
        $("#ModalEditUsergroups").modal("show");
      });

    }
  })
  .catch((error) => {
    console.error("Error fetching data:", error);
  });

  const searchUsergroupsForm = document.getElementById("searchUsergrupsForm");
  const searchInput = document.getElementById("searchInput");

  // Tambahkan event listener ke input pencarian untuk mendeteksi perubahan input
  searchInput.addEventListener("input", () => {
    const searchValue = searchInput.value.trim(); // Dapatkan nilai pencarian

    // Lakukan tindakan pencarian di sini
    // Misalnya, Anda dapat memfilter baris tabel berdasarkan nilai pencarian

    // Contoh: Jika Anda ingin mencari pengguna berdasarkan username
    const tableRows = document.querySelectorAll("#usergroupsTable tbody tr");
    tableRows.forEach((row) => {
      const cells = row.querySelectorAll("td"); // Mengambil semua sel dalam baris
      let isRowMatching = false; // Inisialisasi variabel penanda pencocokan baris

      // Iterasi melalui semua sel dalam baris
      cells.forEach((cell) => {
        const cellText = cell.textContent.toLowerCase();

        // Periksa apakah teks dalam sel cocok dengan nilai pencarian
        if (cellText.includes(searchValue.toLowerCase())) {
          isRowMatching = true; // Baris cocok jika salah satu sel cocok
        }
      });

      // Tampilkan atau sembunyikan baris berdasarkan hasil pencarian
      if (isRowMatching) {
        row.style.display = ""; // Tampilkan baris jika cocok
      } else {
        row.style.display = "none"; // Sembunyikan baris jika tidak cocok
      }
    });
  });