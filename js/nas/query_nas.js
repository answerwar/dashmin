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
const apiUrl = "http://172.27.0.153:8000/api/radius/nas";

// Select the table body
const tableBody = document.querySelector("#nasTable tbody");

// Fetch data from the API
fetch(apiUrl)
  .then((response) => response.json())
  .then(async (data) => {
    console.log(data.message);
      const createNasButton = document.querySelector(
        "#ModalCreateNas .btn-success"
      );

      // Tambahkan event listener ke tombol "Created"
      createNasButton.addEventListener("click", () => {
        // Ambil data dari form modal
        const Createnasname =
          document.getElementById("createRouter").value;
        const Createshortname = document.getElementById("createName").value;
        const CreateType = document.getElementById("createType").value;
        const CreatePort = document.getElementById("createPort").value;
        const Createsecret = document.getElementById("createSecret").value;
        const Createdescription= document.getElementById("createDescription").value;
        // Membuat objek payload untuk dikirim sebagai JSON
        const payload = {
          nasname: Createnasname,
          shortname: Createshortname,
          type: CreateType,
          port: CreatePort,
          secret: Createsecret,
          description: Createdescription,
        };
        // URL API untuk membuat pengguna baru
        const createUsergroupUrl =
          "http://172.27.0.153:8000/api/radius/nas";

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
              alert("Berhasil Membuat NAS baru");
              // Lakukan pengalihan (reload) halaman
              location.reload();
            } else {
              // Tangani respons jika kode status HTTP bukan 201
              response.json().then((create) => {
                const message = create.message;
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
    // console.log(serviceMap)
    var rowNum = 1;
    // Loop through the data and create rows in the table
    for (const nas of data.message) {
      // Ubah format tanggal dan waktu

      nas.created_at = formatDateTimeToJakartaTime(nas.created_at);
      nas.updated_at = formatDateTimeToJakartaTime(nas.updated_at);
      // Buat baris tabel
      const row = document.createElement("tr");
      row.innerHTML = `
                        <td>${rowNum}</td>
                        <td>${nas.id}</td>
                        <td>${nas.nasname}</td>
                        <td>${nas.shortname}</td>
                        <td>${nas.type}</td>
                        <td>${nas.ports}</td>
                        <td>${nas.secret}</td>
                        <td>${nas.description}</td>
                        <td>${nas.created_at}</td>
                        <td>${nas.updated_at}</td>
                        <td>
                            <button type="button" class="btn btn-sm btn-primary btn-edit-nas" data-bs-toggle="modal" data-bs-target="#ModalEditNas"
                                 data-id="${nas.id}">
                                <i class="fa fa-edit me-1"></i>Edit
                            </button>
                            <button
                              type="button"
                              class="btn btn-sm btn-danger btn-delete-nas"
                              data-bs-toggle="modal"
                              data-bs-target="#ModalDeleteNas"
                              data-id="${nas.id}">
                              <i class="fa fa-trash me-1"></i>Delete
                            </button>
                        </td>
                    `;
      tableBody.appendChild(row);
      rowNum++;
      // Mendapatkan tombol "Delete" dalam baris ini
      const deleteButton = row.querySelector(".btn-delete-nas");
      // Tambahkan event listener ke tombol "Delete" di dalam baris ini
      
      deleteButton.addEventListener("click", () => {
        const confirmationMessage = `Apakah Anda yakin akan menghapus Nas  ${nas.shortname} ${nas.nasname}?`;
        const modalConfirmationMessage =
          document.querySelector("#ModalDeleteNas h3");
         
        modalConfirmationMessage.textContent = confirmationMessage;
        // Ambil elemen tombol "Delete" di dalam modal
        const deleteButtonmodal = document.querySelector(
          "#ModalDeleteNas .btn-danger"
        );
        // Tambahkan event listener ke tombol "Delete" di dalam modal
        deleteButtonmodal.addEventListener("click", (event) => {
          // Mendapatkan ID pengguna dari tombol yang diklik
          const deleteUserUrl = `http://172.27.0.153:8000/api/radius/nas/${nas.id}`;
          // Konfigurasi permintaan DELETE
          const requestOptions = {
            method: "DELETE",
          };

          // Kirim permintaan DELETE
          fetch(deleteUserUrl, requestOptions)
            .then((response) => {
              if (response.status === 200) {
                // Jika kode status HTTP adalah 200, maka pengguna berhasil dihapus
                alert(`NAS  ${nas.shortname} ${nas.nasname} berhasil dihapus.`);
                // Lakukan pengalihan (reload) halaman atau tindakan lain yang sesuai
                location.reload(); // Reload halaman jika diperlukan
              } else {
                // Tangani respons jika kode status HTTP bukan 200
                response.json().then((data) => {
                  console.error(`Error deleting NAS ${nas.shortname} ${nas.nasname}`, data);
                });
              }
            })
            .catch((error) => {
              // Tangani kesalahan jika ada
              console.error(
                `Error deleting NAS ${nas.shortname} ${nas.nasname}:`,
                error
              );
            });

          // Tutup modal konfirmasi secara manual jika diperlukan
          $("#ModalDeleteUsergroups").modal("hide");
        });
      });

      // Mendapatkan tombol "edit" dalam baris ini
      const editButton = row.querySelector(".btn-edit-nas");

      // Tambahkan event listener ke tombol "edit" di dalam baris ini
      editButton.addEventListener("click", () => {
        // Mengisi field-field dalam modal edit dengan data usergroups
        // Tempatkan kode Anda di sini setelah dokumen selesai dimuat
        const Editnasname = document.getElementById("editRouter");
        const Editshortname = document.getElementById("editName");
        const EditType = document.getElementById("editType");
        const EditPort = document.getElementById("editPort");
        const Editsecret = document.getElementById("editSecret");
        const Editdescription = document.getElementById("editDescription");

        Editnasname.value = nas.nasname;
        Editshortname.value = nas.shortname;
        EditType.value = nas.type;
        EditPort.value = nas.ports;
        Editsecret.value = nas.secret;
        Editdescription.value = nas.description;
        // Mendapatkan tombol "Update" dalam modal edit
        const updateButton = document.querySelector(
          "#ModalEditNas .btn-primary"
        );

        // Tambahkan event listener ke tombol "Update"
        updateButton.addEventListener("click", () => {
          // Mengambil nilai-nilai dari field-field dalam modal edit
          const editedData = {
            nasname: Editnasname.value,
            shortname: Editshortname.value,
            type: EditType.value,
            ports: EditPort.value,
            secret: Editsecret.value,
            Editdescription: nas.description,
          };
          console.log(editedData);
          // Konfigurasi permintaan PUT
          const putUserUrl = `http://172.27.0.153:8000/api/radius/nas/${nas.id}`;
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
                alert("Data NAS berhasil diperbarui.");
                // Tutup modal edit
                $("#ModalEditNas").modal("hide");
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

  const searchUsergroupsForm = document.getElementById("searchNasForm");
  const searchInput = document.getElementById("searchInput");

  // Tambahkan event listener ke input pencarian untuk mendeteksi perubahan input
  searchInput.addEventListener("input", () => {
    const searchValue = searchInput.value.trim(); // Dapatkan nilai pencarian

    // Lakukan tindakan pencarian di sini
    // Misalnya, Anda dapat memfilter baris tabel berdasarkan nilai pencarian

    // Contoh: Jika Anda ingin mencari pengguna berdasarkan username
    const tableRows = document.querySelectorAll("#nasTable tbody tr");
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


