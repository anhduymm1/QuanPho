$("document").ready(function () {
    getListDesk();
});

function getListDesk() {
    $.ajax({
        url: '/getListDesk',
        type: 'POST',
        dataType: 'json',
        success: function (data) {
            var tableBody = document.querySelector(".table-bordered tbody");

            // Xóa hết nội dung bảng cũ trước khi đổ dữ liệu mới
            tableBody.innerHTML = "";

            // Duyệt qua từng đối tượng trong mảng data
            data.forEach(function (item, index) {
                // Tạo một hàng mới trong bảng
                var row = document.createElement("tr");

                // Tạo các ô dữ liệu cho hàng
                var sttCell = document.createElement("td");
                sttCell.textContent = index + 1;
                row.appendChild(sttCell);

                var tableNameCell = document.createElement("td");
                tableNameCell.textContent = item.TableName;
                row.appendChild(tableNameCell);

                var trangthai = "";
                if (item.TableStatus == 1) {
                    trangthai = "Bàn đã đặt"
                }
                else {
                    trangthai ="Bàn chưa đặt"
                }

                var tableStatusCell = document.createElement("td");
                tableStatusCell.textContent = trangthai;
                row.appendChild(tableStatusCell);

                var actionCell = document.createElement("td");
                actionCell.style.display = "flex";
                actionCell.style.justifyContent = "center";
                // Edit button
                var editButton = document.createElement("button");
                editButton.className = "btn btn-info";
                editButton.type = "button";
                var editIcon = document.createElement("i");
                editIcon.className = "bi bi-pencil color-white";
                editButton.appendChild(editIcon);
                editButton.addEventListener("click", function () {
                    var userFormModal = new bootstrap.Modal(document.getElementById("userformmodal"));
                    userFormModal.show();
                    detailDesk(item.TableID, item.TableName, item.TableStatus)
                });
                actionCell.appendChild(editButton);

                // Delete button
                var deleteButton = document.createElement("button");
                deleteButton.className = "btn btn-danger ms-2";
                deleteButton.type = "button";
                var deleteIcon = document.createElement("i");
                deleteIcon.className = "bi bi-trash";
                deleteButton.appendChild(deleteIcon);
                deleteButton.addEventListener("click", function () {
                    if (confirm("Bạn có chắc chắn muốn xóa " + item.TableName + " ?")) {
                        deleteDesk(item.TableID);
                    }
                });
                actionCell.appendChild(deleteButton);
                row.appendChild(actionCell);

                // Thêm hàng vào bảng
                tableBody.appendChild(row);
            });
        },
        error: function () {
            // Xử lý lỗi nếu có
            console.log('Không thể lấy dữ liệu từ API.');
        }
    });
}

function createDesk() {
    const tenban = document.getElementById('tableName').value
    const trangthai = document.getElementById('inputGroupSelect01').value
    const data = {
        TableName: tenban,
        TableStatus: trangthai
    }

    $.ajax({
        url: '/createDesk',
        type: 'POST',
        dataType: 'json',
        data: data,
        success: function (data) {
            if (data == true) {
                getListDesk()
            }
        },
        error: function () {
            // Xử lý lỗi nếu có
            console.log('Không thể lấy dữ liệu từ API.');
        }
    });
}

function detailDesk(stt, tenban, trangthai) {
    document.getElementById('tableID').value = stt
    document.getElementById('tableName').value = tenban
    document.getElementById('inputGroupSelect01').value = trangthai

  
    document.getElementById("save").style.display = 'none'
    document.getElementById("update").style.display = 'block'
}

function updateDesk() {
    const stt = document.getElementById('tableID').value
    const tenban = document.getElementById('tableName').value
    const trangthai = document.getElementById('inputGroupSelect01').value

    const data = {
        TableID: stt,
        TableName: tenban,
        TableStatus: trangthai,
    }

    $.ajax({
        url: '/updateDesk',
        type: 'POST',
        dataType: 'json',
        data: data,
        success: function (data) {
            if (data == true) {
                getListDesk()

            }
        },
        error: function () {
            // Xử lý lỗi nếu có
            console.log('Không thể lấy dữ liệu từ API.');
        }
    });
}

function deleteDesk(id) {
    const data = {
        TableID: id,
    }

    $.ajax({
        url: '/deleteDesk',
        type: 'POST',
        dataType: 'json',
        data: data,
        success: function (data) {
            if (data == true) {
                getListDesk()
            }
        },
        error: function () {
            // Xử lý lỗi nếu có
            console.log('Không thể lấy dữ liệu từ API.');
        }
    });
}
document.getElementById("userformmodal").addEventListener("show.bs.modal", function () {
    // Clear the form fields when the modal is shown
    document.getElementById("tableName").value = "";
    document.getElementById("inputGroupSelect01").value = "0"; // Set the default role value (change as needed)
});

document.getElementById("addNewButton").addEventListener("click", function () {

    document.getElementById("tableName").value = "";


    document.getElementById('inputGroupSelect01').value = '0'

    document.getElementById("save").style.display = 'block'
    document.getElementById("update").style.display = 'none'
});