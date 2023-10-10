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
const apiUrl = "http://127.0.0.1:8000/api/radius/service";

// Select the table body
const tableBody = document.querySelector("#serviceTable tbody");

// Fetch data from the API
fetch(apiUrl)
  .then((response) => response.json())
  .then(async (data) => {
    const createServiceButton = document.querySelector(
      "#ModalCreateServices .btn-success"
    );

    // Tambahkan event listener ke tombol "Created"
    createServiceButton.addEventListener("click", () => {
      // Ambil data dari form modal
      const CreateName = document.getElementById("createName").value;
      const CreateAttribute = document.getElementById("createAttribute").value;
      const CreateHarga = document.getElementById("createHarga").value;
      const Createdescription =
        document.getElementById("createDescription").value;
      // Membuat objek payload untuk dikirim sebagai JSON
      const payload = {
        srvname: CreateName,
        custattr: CreateAttribute,
        unitprice: CreateHarga,
        descr: Createdescription,
      };
      // URL API untuk membuat pengguna baru
      const createUsergroupUrl = "http://127.0.0.1:8000/api/radius/service";

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
            alert("Berhasil Membuat Service baru");
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
    var rowNum = 1;
    // Loop through the data and create rows in the table
    for (const services of data.message) {
      // Ubah format tanggal dan waktu
      console.log(services);
      services.created_at = formatDateTimeToJakartaTime(services.created_at);
      services.updated_at = formatDateTimeToJakartaTime(services.updated_at);
      // Buat baris tabel
      const row = document.createElement("tr");
      row.innerHTML = `
                        <td>${rowNum}</td>
                        <td>${services.srvid}</td>
                        <td>${services.srvname}</td>
                        <td>${services.custattr}</td>
                        <td>${services.unitprice}</td>
                        <td>${services.descr}</td>
                        <td>${services.created_at}</td>
                        <td>${services.updated_at}</td>
                        <td>
                            <button type="button" class="btn btn-sm btn-primary btn-edit-services" data-bs-toggle="modal" data-bs-target="#ModalEditServices"
                                 data-id="${services.srvid}">
                                <i class="fa fa-edit me-1"></i>Edit
                            </button>
                            <button
                              type="button"
                              class="btn btn-sm btn-danger btn-delete-services"
                              data-bs-toggle="modal"
                              data-bs-target="#ModalDeleteServices"
                              data-id="${services.srvid}">
                              <i class="fa fa-trash me-1"></i>Delete
                            </button>
                        </td>
                    `;
      tableBody.appendChild(row);
      rowNum++;
      // Mendapatkan tombol "Delete" dalam baris ini
      const deleteButton = row.querySelector(".btn-delete-services");
      // Tambahkan event listener ke tombol "Delete" di dalam baris ini

      deleteButton.addEventListener("click", () => {
        const confirmationMessage = `Apakah Anda yakin akan menghapus Service  ${services.srvname}?`;
        const modalConfirmationMessage = document.querySelector(
          "#ModalDeleteServices h3"
        );

        modalConfirmationMessage.textContent = confirmationMessage;

        // Ambil elemen tombol "Delete" di dalam modal
        const deleteButtonmodal = document.querySelector(
          "#ModalDeleteServices .btn-danger"
        );
        // Tambahkan event listener ke tombol "Delete" di dalam modal
        deleteButtonmodal.addEventListener("click", (event) => {
          // Mendapatkan ID pengguna dari tombol yang diklik
          const deleteUserUrl = `http://127.0.0.1:8000/api/radius/service/${services.srvid}`;
          // Konfigurasi permintaan DELETE
          const requestOptions = {
            method: "DELETE",
          };

          // Kirim permintaan DELETE
          fetch(deleteUserUrl, requestOptions)
            .then((response) => {
              if (response.status === 200) {
                // Jika kode status HTTP adalah 200, maka pengguna berhasil dihapus
                alert(`Service  ${services.srvname} berhasil dihapus.`);
                // Lakukan pengalihan (reload) halaman atau tindakan lain yang sesuai
                location.reload(); // Reload halaman jika diperlukan
              } else {
                // Tangani respons jika kode status HTTP bukan 200
                response.json().then((data) => {
                  console.error(
                    `Error deleting NAS ${nas.shortname} ${nas.nasname}`,
                    data
                  );
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
      const editButton = row.querySelector(".btn-edit-services");
      // Tambahkan event listener ke tombol "edit" di dalam baris ini
      editButton.addEventListener("click", () => {
        // Membuat objek payload untuk dikirim sebagai JSON
        // Mengisi field-field dalam modal edit dengan data usergroups
        // Tempatkan kode Anda di sini setelah dokumen selesai dimuat
        const EditName = document.getElementById("editName");
        const EditAttribute = document.getElementById("editAttribute");
        const EditHarga = document.getElementById("editHarga");
        const Editdescription = document.getElementById("editDescription");

        EditName.value = services.srvname;
        EditAttribute.value = services.custattr;
        EditHarga.value = services.unitprice;
        Editdescription.value = services.descr;
        // Mendapatkan tombol "Update" dalam modal edit
        const updateButton = document.querySelector(
          "#ModalEditServices .btn-primary"
        );

        // Tambahkan event listener ke tombol "Update"
        updateButton.addEventListener("click", () => {
          // Mengambil nilai-nilai dari field-field dalam modal edit
          const editedData = {
            srvname: EditName.value,
            custattr: EditAttribute.value,
            unitprice: EditHarga.value,
            descr: Editdescription.value,
          };
          console.log(editedData);
          // Konfigurasi permintaan PUT
          const putUserUrl = `http://127.0.0.1:8000/api/radius/service/${services.srvid}`;
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
                alert("Data Service berhasil diperbarui.");
                // Tutup modal edit
                $("#ModalEditServices").modal("hide");
                // Lakukan pengalihan (reload) halaman atau tindakan lain yang sesuai
                location.reload(); // Reload halaman jika diperlukan
              } else {
                // Jika ada kesalahan, tangani respons dengan menampilkan pesan kesalahan
                response.json().then((data) => {
                  console.error("Error updating Service:", data);
                  alert("Terjadi kesalahan saat memperbarui Service.");
                });
              }
            })
            .catch((error) => {
              // Tangani kesalahan jika ada
              console.error("Error updating Service:", error);
              alert("Terjadi kesalahan saat memperbarui Service.");
            });
        });
        // Menampilkan modal edit
        $("#ModalEditServices").modal("show");
      });
    }
  })
  .catch((error) => {
    console.error("Error fetching data:", error);
  });

  searchInput.addEventListener("keyup", () => {
    // Menggunakan event "keyup" bukan "input"
    const searchValue = searchInput.value.trim(); // Dapatkan nilai pencarian

    // Lakukan tindakan pencarian di sini
    // Misalnya, Anda dapat memfilter baris tabel berdasarkan nilai pencarian

    // Contoh: Jika Anda ingin mencari pengguna berdasarkan username
    const tableRows = document.querySelectorAll("#serviceTable tbody tr");
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
