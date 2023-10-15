// 
// URL API
const apiUrl = "http://172.27.0.154:8000/api/radius/onlineuser";

// Select the table body
const tableBody = document.querySelector("#onlineusersTable tbody");

// Fetch data from the API
fetch(apiUrl)
  .then((response) => response.json())
  .then(async (data) => {
    var rowNum = 1;
    // Loop through the data and create rows in the table
    for (const onlineuser of data.message) {
      // Ubah format tanggal dan waktu
      const alertClass =
        onlineuser.status === "Online" ? "alert-success" : "alert-danger";

      // Buat baris tabel
      const row = document.createElement("tr");
      row.innerHTML = `
                        <td>${rowNum}</td>
                        <td>${onlineuser.acctsessionid}</td>
                        <td>${onlineuser.username}</td>
                        <td><div class="alert ${alertClass}" role="alert" style="font-size: 16px; padding: 0.25rem 0.5rem;">${onlineuser.status}</div></td>
                        <td>${onlineuser.ipaddress}</td>
                        <td>${onlineuser.nasportid}</td>
                        <td>${onlineuser.nasipaddress}</td>
                        <td>${onlineuser.nasname}</td>
                        <td>${onlineuser.acctstarttime}</td>
                        <td>${onlineuser.durasi}</td>
                        <td>${onlineuser.total_download}</td>
                        <td>${onlineuser.total_upload}</td>

                        <td>
                            <button type="button" class="btn btn-sm btn-warning btn-disconnect" data-bs-toggle="modal" data-bs-target="#ModalDisconnect">
                                <i class="fa fa-plug me-1"></i>Disconnect
                            </button>
                        </td>
                    `;
      tableBody.appendChild(row);
      rowNum++;
      // Mendapatkan tombol "disconnect" dalam baris ini
      const disconnectButton = row.querySelector(".btn-disconnect");
      // Tambahkan event listener ke tombol "Delete" di dalam baris ini
      disconnectButton.addEventListener("click", () => {
        const confirmationMessage = `Apakah Anda yakin akan disconnect  ${onlineuser.username}?`;
        const modalConfirmationMessage = document.querySelector(
          "#ModalDisconnect h3"
        );
        modalConfirmationMessage.textContent = confirmationMessage;
        // console.log(confirmationMessage);
        // Ambil elemen tombol "Delete" di dalam modal
        const disconnectButtonmodal = document.querySelector(
          "#ModalDisconnect .btn-danger"
        );
        // Tambahkan event listener ke tombol "disconnect" di dalam modal
        disconnectButtonmodal.addEventListener("click", (event) => {
          // Mendapatkan ID pengguna dari tombol yang diklik
          const disconnectUserUrl = `http://172.27.0.154:8000/api/disconnect?username=${onlineuser.username}`;
          // Konfigurasi permintaan DELETE
          const requestOptions = {
            method: "GET",
          };

          // Kirim permintaan DELETE
          fetch(disconnectUserUrl, requestOptions)
            .then((response) => {
              if (response.status === 200) {
                // Jika kode status HTTP adalah 200, maka pengguna berhasil dihapus
                alert(`User ${onlineuser.username}  berhasil disconnect.`);
                // Lakukan pengalihan (reload) halaman atau tindakan lain yang sesuai
                location.reload(); // Reload halaman jika diperlukan
              } else {
                // Tangani respons jika kode status HTTP bukan 200
                response.json().then((data) => {
                  alert(
                    `error disconnect user ${onlineuser.username}, karena ${data.message} .`
                  );
                  console.error("Error disconnect users:", data);
                  location.reload();
                });
              }
            })
            .catch((error) => {
              // Tangani kesalahan jika ada
              console.error("Error disconnect users:", error);
            });

          // Tutup modal konfirmasi secara manual jika diperlukan
          $("#ModalDisconnect").modal("hide");
        });
      });
    }
  })
  .catch((error) => {
    console.error("Error fetching data:", error);
  });

const searchUsergroupsForm = document.getElementById("searchOnlineusersForm");
const searchInput = document.getElementById("searchInput");

// Tambahkan event listener ke input pencarian untuk mendeteksi perubahan input
searchInput.addEventListener("input", () => {
  const searchValue = searchInput.value.trim(); // Dapatkan nilai pencarian

  // Lakukan tindakan pencarian di sini
  // Misalnya, Anda dapat memfilter baris tabel berdasarkan nilai pencarian

  // Contoh: Jika Anda ingin mencari pengguna berdasarkan username
  const tableRows = document.querySelectorAll("#onlineusersTable tbody tr");
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
// document.addEventListener("DOMContentLoaded", function () {
//   const table = document.getElementById("onlineusersTable");
//   const rowsPerPage = 10; // You can change the number of rows per page
//   let currentPage = 1;

//   function showPage(page) {
//     const start = (page - 1) * rowsPerPage;
//     const end = start + rowsPerPage;
//     const rows = Array.from(table.querySelectorAll("tbody tr"));

//     rows.forEach((row, index) => {
//       if (index >= start && index < end) {
//         row.style.display = "table-row";
//       } else {
//         row.style.display = "none";
//       }
//     });
//   }

//   function handlePaginationClick(event) {
//     const page = parseInt(event.target.dataset.page);
//     if (!isNaN(page) && page !== currentPage) {
//       currentPage = page;
//       showPage(currentPage);
//       createPaginationLinks(); // Update the pagination links
//     }
//   }

//   function createPaginationLinks() {
//     const rowCount = table.querySelectorAll("tbody tr").length;
//     const pageCount = Math.ceil(rowCount / rowsPerPage);
//     const paginationContainer = document.getElementById("pagination");

//     // Remove existing pagination links
//     while (paginationContainer.firstChild) {
//       paginationContainer.removeChild(paginationContainer.firstChild);
//     }

//     paginationContainer.appendChild(createPaginationLink("Previous", currentPage - 1));
//     for (let i = 1; i <= pageCount; i++) {
//       paginationContainer.appendChild(createPaginationLink(i.toString(), i));
//     }
//     paginationContainer.appendChild(createPaginationLink("Next", currentPage + 1));
//   }

//   function createPaginationLink(text, page) {
//     const li = document.createElement("li");
//     li.classList.add("page-item");
//     const a = document.createElement("a");
//     a.classList.add("page-link");
//     a.href = "#";
//     a.dataset.page = page; // Use the 'data-page' attribute to store the page number
//     a.innerText = text;
//     a.addEventListener("click", handlePaginationClick);
//     li.appendChild(a);
//     return li;
//   }

//   showPage(currentPage); // Show the first page immediately
//   createPaginationLinks();
// });
