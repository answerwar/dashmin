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
const apiUrl = "http://172.27.0.153:8000/api/radius/users";
const grpUrl = `http://172.27.0.153:8000/api/radius/usergroups`;
const svrUrl = `http://172.27.0.153:8000/api/radius/service`;

// Select the table body
const tableBody = document.querySelector("#userTable tbody");

// Fetch data from the API
fetch(apiUrl)
  .then((response) => response.json())
  .then(async (data) => {
    const svrResponse = await fetch(svrUrl);
    const serviceData = await svrResponse.json();
    const serviceMap = new Map(
      serviceData.message.map((item) => [item.srvid, item.srvname])
    );

    const grpResponse = await fetch(grpUrl);
    const groupData = await grpResponse.json();
    const groupMap = new Map(
      groupData.message.map((item) => [item.groupid, item.groupname])
    );

    var rowNum = 1;

    //create users

    
    // console.log(serviceMap)
    // Loop through the data and create rows in the table
    for (const user of data.message) {
      // Ubah format tanggal dan waktu
      user.created_at = formatDateTimeToJakartaTime(user.created_at);
      user.updated_at = formatDateTimeToJakartaTime(user.updated_at);

      const statusText = user.enableuser === 1 ? "Enable" : "Disable";
      const alertClass =
        user.enableuser === 1 ? "alert-success" : "alert-danger";

      const srvname = serviceMap.get(user.svrid);
      const groupname = groupMap.get(user.groupid);

      // Buat baris tabel
      const row = document.createElement("tr");
      row.innerHTML = `
                        <td>${rowNum}</td>
                        <td>${user.id}</td>
                        <td>${user.username}</td>
                        <td>${user.password}</td>
                        <td><div class="alert ${alertClass}" role="alert" style="font-size: 16px; padding: 0.25rem 0.5rem;">${statusText}</div></td>
                        <td>${srvname}</td>
                        <td>${groupname}</td> <!-- Menampilkan groupname -->
                        <td>${user.firstname}</td>
                        <td>${user.address}</td>
                        <td>${user.phone}</td>
                        <td>${user.SN}</td>
                        <td>${user.comment}</td>
                        <td>${user.created_at}</td>
                        <td>${user.updated_at}</td>
                        <td>
                            <button type="button" class="btn btn-sm btn-primary btn-edit-user" data-bs-toggle="modal" data-bs-target="#ModalEditUser"
                                data-text="Edit" data-userid="${user.id}">
                                <i class="fa fa-edit me-1"></i>Edit
                            </button>
                            <button
                                type="button"
                                class="btn btn-sm btn-danger btn-delete-user"
                                data-bs-toggle="modal"
                                data-bs-target="#ModalDeleteUser"
                                data-userid="${user.id}">
                                <i class="fa fa-trash me-1"></i>Delete
                            </button>
                            <button
                                type="button"
                                class="btn btn-sm btn-secondary btn-more">
                                More
                            </button>
                            <!-- Container untuk tombol tambahan -->
                            <div class="additional-buttons" style="display: none;">
                                <!-- Button "Change Service" -->
                                <button
                                    type="button"
                                    class="btn btn-sm btn-success btn-change-service"
                                    data-bs-target="#ModalChangeServiceUser"
                                    data-userid="${user.id}"
                                >
                                    Change Service
                                </button>

                                <button
                                    type="button"
                                    class="btn btn-sm btn-warning btn-disable-enable"
                                    data-bs-target="#ModalDisableEnableUser"
                                    data-userid="${user.id}"
                                >
                                    Change Status
                                </button>
                            </div>
                        </td>
                    `;
      tableBody.appendChild(row);
      rowNum++;

      // Temukan tombol "More" yang berada dalam baris saat ini
      const moreButton = row.querySelector(".btn-more");
      const additionalButtons = row.querySelector(".additional-buttons");

      moreButton.addEventListener("click", () => {
        // Tampilkan atau sembunyikan tombol tambahan saat tombol "More" ditekan
        if (additionalButtons.style.display === "none") {
          additionalButtons.style.display = "block";
        } else {
          additionalButtons.style.display = "none";
        }
      });

      // Mendapatkan tombol "Delete" dalam baris ini
      const deleteButton = row.querySelector(".btn-delete-user");
      // Tambahkan event listener ke tombol "Delete" di dalam baris ini
      deleteButton.addEventListener("click", () => {
        const userId = user.id;
        const confirmationMessage = `Apakah Anda yakin akan menghapus Username ${user.username}?`;
        const modalConfirmationMessage = document.querySelector(
          "#ModalDeleteUser h3"
        );
        modalConfirmationMessage.textContent = confirmationMessage;
        // Ambil elemen tombol "Delete" di dalam modal
        const deleteButtonmodal = document.querySelector(
          "#ModalDeleteUser .btn-danger"
        );
        // Tambahkan event listener ke tombol "Delete" di dalam modal
        deleteButtonmodal.addEventListener("click", (event) => {
          // Mendapatkan ID pengguna dari tombol yang diklik
          const deleteUserUrl = `http://172.27.0.153:8000/api/radius/users/${userId}`; // Menggunakan userId
          // Konfigurasi permintaan DELETE
          const requestOptions = {
            method: "DELETE",
          };

          // Kirim permintaan DELETE
          fetch(deleteUserUrl, requestOptions)
            .then((response) => {
              if (response.status === 200) {
                // Jika kode status HTTP adalah 200, maka pengguna berhasil dihapus
                alert("Pengguna berhasil dihapus.");
                // Lakukan pengalihan (reload) halaman atau tindakan lain yang sesuai
                location.reload(); // Reload halaman jika diperlukan
              } else {
                // Tangani respons jika kode status HTTP bukan 200
                response.json().then((data) => {
                  console.error("Error deleting user:", data);
                });
              }
            })
            .catch((error) => {
              // Tangani kesalahan jika ada
              console.error("Error deleting user:", error);
            });

          // Tutup modal konfirmasi secara manual jika diperlukan
          $("#ModalDeleteUser").modal("hide");
        });
      });
      // Mendapatkan tombol "edit" dalam baris ini
      const editButton = row.querySelector(".btn-edit-user");

      // Tambahkan event listener ke tombol "edit" di dalam baris ini
      editButton.addEventListener("click", () => {
        const userId = user.id;
        const editUsernameInput = document.getElementById("editUsername");
        const editPasswordInput = document.getElementById("editPassword");
        // const editStatusInput = document.getElementById("editStatus");
        const editServiceInput = document.getElementById("editService");
        const editGroupInput = document.getElementById("editGroup");
        const editFirstnameInput = document.getElementById("editFirstname");
        const editPhoneInput = document.getElementById("editPhone");
        const editAlamatInput = document.getElementById("editAlamat");
        const editSNInput = document.getElementById("editSN");
        const editCommentInput = document.getElementById("editComment");
        editUsernameInput.value = user.username;
        editPasswordInput.value = user.password;
        editGroupInput.value = user.groupid;
        editFirstnameInput.value = user.firstname;
        editPhoneInput.value = user.phone;
        editAlamatInput.value = user.address;
        editSNInput.value = user.SN;
        editCommentInput.value = user.comment;

        const defaultServiceOption = document.createElement("option");
        defaultServiceOption.value = user.svrid;
        defaultServiceOption.text = srvname;
        editServiceInput.appendChild(defaultServiceOption);
        // Loop melalui data layanan dan tambahkan setiap opsi ke dropdown
        serviceData.message.forEach((service) => {
          const option = document.createElement("option");
          option.value = service.srvid;
          option.text = service.srvname;
          editServiceInput.appendChild(option);
        });

        const defaultGroupOption = document.createElement("option");
        defaultGroupOption.value = user.groupid;
        defaultGroupOption.text = groupname;
        editGroupInput.appendChild(defaultGroupOption);

        // Loop melalui data grup pengguna dan tambahkan setiap opsi ke dropdown
        groupData.message.forEach((group) => {
          const option = document.createElement("option");
          option.value = group.groupid;
          option.text = group.groupname;
          editGroupInput.appendChild(option);
        });

        const currentStatus = user.enableuser;
        const editStatusInput = document.getElementById("editStatus");
        // Loop melalui semua option dalam dropdown "Status"
        for (let i = 0; i < editStatusInput.options.length; i++) {
          const option = editStatusInput.options[i];

          // Bandingkan nilai option dengan currentStatus
          if (option.value == currentStatus) {
            // Jika nilainya cocok, atur selectedIndex untuk memilih option tersebut
            editStatusInput.selectedIndex = i;
            break; // Keluar dari loop setelah menemukan kecocokan
          }
        }
        // Mendapatkan tombol "Update" dalam modal edit
        const updateButton = document.querySelector(
          "#ModalEditUser .btn-primary"
        );

        // Tambahkan event listener ke tombol "Update"
        updateButton.addEventListener("click", () => {
          // Mengambil nilai-nilai dari field-field dalam modal edit
          const editedData = {
            username: editUsernameInput.value,
            password: editPasswordInput.value,
            enableuser: editStatusInput.value,
            svrid: editServiceInput.value,
            groupid: editGroupInput.value,
            firstname: editFirstnameInput.value,
            phone: editPhoneInput.value,
            alamat: editAlamatInput.value,
            SN: editSNInput.value,
            comment: editCommentInput.value,
          };
          // Konfigurasi permintaan PUT
          const putUserUrl = `http://172.27.0.153:8000/api/radius/users/${userId}`;
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
                alert("Data pengguna berhasil diperbarui.");
                // Tutup modal edit
                $("#ModalEditUser").modal("hide");
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
        $("#ModalEditUser").modal("show");
      });

      //disable enable user
      const DisableEnableButton = row.querySelector(".btn-disable-enable");

      // Tambahkan event listener ke tombol "edit" di dalam baris ini
      DisableEnableButton.addEventListener("click", () => {
        const DEUsernameInput = document.getElementById("DEUsername");
        const DEServiceInput = document.getElementById("DEService");
        const DEFirstnameInput = document.getElementById("DEFirstname");
        const DECommentInput = document.getElementById("DEComment");
        DEUsernameInput.value = user.username;
        DEFirstnameInput.value = user.firstname;
        DECommentInput.value = user.comment;

        const defaultServiceOption = document.createElement("option");
        defaultServiceOption.value = user.svrid;
        defaultServiceOption.text = srvname;
        DEServiceInput.appendChild(defaultServiceOption);
        // Loop melalui data layanan dan tambahkan setiap opsi ke dropdown
        serviceData.message.forEach((service) => {
          const option = document.createElement("option");
          option.value = service.srvid;
          option.text = service.srvname;
          DEServiceInput.appendChild(option);
        });

        const currentStatus = user.enableuser;
        const DEStatusInput = document.getElementById("DEStatus");
        // Loop melalui semua option dalam dropdown "Status"
        for (let i = 0; i < DEStatusInput.options.length; i++) {
          const option = DEStatusInput.options[i];

          // Bandingkan nilai option dengan currentStatus
          if (option.value == currentStatus) {
            // Jika nilainya cocok, atur selectedIndex untuk memilih option tersebut
            DEStatusInput.selectedIndex = i;
            break; // Keluar dari loop setelah menemukan kecocokan
          }
        }
        console.log(DEStatusInput.value);
        // Mendapatkan tombol "Update" dalam modal edit
        const DisableEnableButton = document.querySelector(
          "#ModalDisableEnableUser .btn-primary"
        );

        // Tambahkan event listener ke tombol "Update"
        DisableEnableButton.addEventListener("click", () => {
          // Mengambil nilai-nilai dari field-field dalam modal edit
          // Mendapatkan elemen input status

          // Mengecek jika nilai DEStatusInput adalah 1
          if (DEStatusInput.value === "1") {
            // Membangun URL dengan parameter username jika status adalah 1
            var url = "enable?username=" + DEUsernameInput.value;
          } else {
            // Membangun URL dengan parameter username jika status bukan 1
            var url = "isolir?username=" + DEUsernameInput.value;
          }
          const requestOptions = {
            method: "GET",
          };
          // Menggabungkan URL dengan baseUrl
          var baseUrl = "http://172.27.0.153:8000/api/radius/" + url;
          // Anda dapat menggunakan baseUrl sesuai kebutuhan Anda, misalnya, mengirim permintaan HTTP ke URL tersebut atau menggunakan URL dalam cara lain.
          console.log(baseUrl);

          // Kirim permintaan PUT
          fetch(baseUrl, requestOptions)
            .then((response) => {
              if (response.status === 200) {
                // Jika berhasil, tampilkan pesan sukses atau lakukan tindakan lain yang sesuai
                alert(`Data pengguna berhasil diperbarui. `);
                // Tutup modal edit
                $("#ModalDisableEnableUser").modal("hide");
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
        $("#ModalDisableEnableUser").modal("show");
      });

      //change_service
      const ChangeServiceButton = row.querySelector(".btn-change-service");

      // Tambahkan event listener ke tombol "edit" di dalam baris ini
      ChangeServiceButton.addEventListener("click", () => {
        const CSUsernameInput = document.getElementById("CSUsername");
        const CSServiceInput = document.getElementById("CSService");
        const CSFirstnameInput = document.getElementById("CSFirstname");
        const CSCommentInput = document.getElementById("CSComment");
        CSUsernameInput.value = user.username;
        CSFirstnameInput.value = user.firstname;
        CSCommentInput.value = user.comment;

        const defaultServiceOption = document.createElement("option");
        defaultServiceOption.value = user.svrid;
        defaultServiceOption.text = srvname;
        CSServiceInput.appendChild(defaultServiceOption);
        // Loop melalui data layanan dan tambahkan setiap opsi ke dropdown
        serviceData.message.forEach((service) => {
          const option = document.createElement("option");
          option.value = service.srvid;
          option.text = service.srvname;
          CSServiceInput.appendChild(option);
        });

        const currentStatus = user.enableuser;
        const CSStatusInput = document.getElementById("DEStatus");
        // Loop melalui semua option dalam dropdown "Status"
        for (let i = 0; i < CSStatusInput.options.length; i++) {
          const option = CSStatusInput.options[i];

          // Bandingkan nilai option dengan currentStatus
          if (option.value == currentStatus) {
            // Jika nilainya cocok, atur selectedIndex untuk memilih option tersebut
            CSStatusInput.selectedIndex = i;
            break; // Keluar dari loop setelah menemukan kecocokan
          }
        }
        // Mendapatkan tombol "Update" dalam modal edit
        const DisableEnableButton = document.querySelector(
          "#ModalChangeServiceUser .btn-primary"
        );
        // Tambahkan event listener ke tombol "Update"
        DisableEnableButton.addEventListener("click", () => {
          // Mengambil nilai-nilai dari field-field dalam modal edit
          // Mendapatkan elemen input status

          // Menggabungkan URL dengan baseUrl
          var baseUrl =
            "http://172.27.0.153:8000/api/radius/change_service?" +
            "username=" +
            CSUsernameInput.value +
            "&srvid=" +
            CSServiceInput.value;
          // Anda dapat menggunakan baseUrl sesuai kebutuhan Anda, misalnya, mengirim permintaan HTTP ke URL tersebut atau menggunakan URL dalam cara lain.
          console.log(baseUrl);


          // Kirim permintaan GET
                    const requestOptions = {
                      method: "GET",
                    };

          fetch(baseUrl, requestOptions)
            .then((response) => {
              if (response.status === 200) {
                // Jika berhasil, tampilkan pesan sukses atau lakukan tindakan lain yang sesuai
                alert(`Pergantin service berhasil, Data User pengguna berhasil diperbarui. `);
                // Tutup modal edit
                $("#ModalChangeServiceUser").modal("hide");
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
        $("#ModalChangeServiceUser").modal("show");
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
  const tableRows = document.querySelectorAll("#userTable tbody tr");
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
