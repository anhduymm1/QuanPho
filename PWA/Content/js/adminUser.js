$("document").ready(function () {
    getListUser();
});
function getListUser() {
    $.ajax({
        url: '/getListUser',
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

                var userNameCell = document.createElement("td");
                userNameCell.textContent = item.UserName;
                row.appendChild(userNameCell);

                var fullNameCell = document.createElement("td");
                fullNameCell.textContent = item.FullName;
                row.appendChild(fullNameCell);

                var phoneCell = document.createElement("td");
                phoneCell.textContent = item.Phone;
                row.appendChild(phoneCell);

                var roleCell = document.createElement("td");
                roleCell.textContent = item.Role_ID;
                row.appendChild(roleCell);

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
                    detailUser(item.UserName, item.FullName, item.Phone, item.Role_ID);
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
                    if (confirm("Bạn có chắc chắn muốn xóa người dùng " + item.FullName+" ?")) {
                        // Nếu người dùng chọn "OK" trong hộp thoại confirm, thực hiện xóa người dùng
                        deleteUser(item.UserName);
                    }
                });
                actionCell.appendChild(deleteButton);

                // Reset Password button
                var resetPassButton = document.createElement("button");
                resetPassButton.className = "btn btn-success ms-2";
                resetPassButton.type = "button";
                var resetPassIcon = document.createElement("i");
                resetPassIcon.className = "bi bi-arrow-counterclockwise";
                resetPassButton.appendChild(resetPassIcon);
                resetPassButton.addEventListener("click", function () {
                    if (confirm("Bạn có chắc chắn muốn cập nhật mật khẩu của " + item.FullName + "?")) {
                        resetPassword(item.UserName);
                    }
                });
                actionCell.appendChild(resetPassButton);

                
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

function createUser() {
    const taikhoan = document.getElementById('username').value
    const hoten = document.getElementById('name').value
    const sdt = document.getElementById('phone').value
    const matkhau = document.getElementById('password').value
    const vaitro = document.getElementById('inputGroupSelect01').value

    const data = {
        FullName: hoten,
        UserName: taikhoan,
        Pass: matkhau,
        Phone: sdt,
        Role_ID: vaitro
    }

    $.ajax({
        url: '/createUser',
        type: 'POST',
        dataType: 'json',
        data: data,
        success: function (data) {
            console.log(data)
            if (data == true) {
                getListUser()
            }
        },
        error: function () {
            // Xử lý lỗi nếu có
            console.log('Không thể lấy dữ liệu từ API.');
        }
    });


}

function updateUser() {
    const taikhoan = document.getElementById('username').value
    const hoten = document.getElementById('name').value
    const sdt = document.getElementById('phone').value
    const vaitro = document.getElementById('inputGroupSelect01').value

    const data = {
        FullName: hoten,
        UserName: taikhoan,
        Phone: sdt,
        Role_ID: vaitro
    }

    $.ajax({
        url: '/updateUser',
        type: 'POST',
        dataType: 'json',
        data: data,
        success: function (data) {
            if (data == true) {
                getListUser()

            }
        },
        error: function () {
            // Xử lý lỗi nếu có
            console.log('Không thể lấy dữ liệu từ API.');
        }
    });
}
function deleteUser(taikhoan) {
    const data = {
        UserName: taikhoan,
    }

    $.ajax({
        url: '/deleteUser',
        type: 'POST',
        dataType: 'json',
        data: data,
        success: function (data) {
            if (data == true) {
                getListUser()
            }
        },
        error: function () {
            // Xử lý lỗi nếu có
            console.log('Không thể lấy dữ liệu từ API.');
        }
    });
}

function detailUser(taikhoan, hoten, sdt, vaitro) {
    document.getElementById('username').disabled = true; 
    document.getElementById('username').value = taikhoan
    document.getElementById('name').value = hoten
    document.getElementById('phone').value = sdt
    document.getElementById('group-password').style.display = 'none'

    let roleid=''
    if (vaitro == "Admin") {
        roleid = "1"
    }
    else {
        roleid ="2"
    }
    document.getElementById('inputGroupSelect01').value = roleid
    document.getElementById("save").style.display = 'none'
    document.getElementById("update").style.display = 'block'
}

function resetPassword(taikhoan) {
    const data = {
        UserName: taikhoan,
    }

    $.ajax({
        url: 'resetPassword',
        type: 'POST',
        dataType: 'json',
        data: data,
        success: function (data) {
            console.log(data)
            if (data == true) {
                getListUser()
            }
        },
        error: function () {
            // Xử lý lỗi nếu có
            console.log('Không thể lấy dữ liệu từ API.');
        }
    });
}

document.getElementById("togglePassword").addEventListener("click", function () {
    const passwordInput = document.getElementById("password");
    const type = passwordInput.getAttribute("type") === "password" ? "text" : "password";
    passwordInput.setAttribute("type", type);

    // Change the eye icon based on password visibility
    this.classList.toggle("bi-eye");
    this.classList.toggle("bi-eye-slash");
});

document.getElementById("userformmodal").addEventListener("show.bs.modal", function () {
    // Clear the form fields when the modal is shown
    document.getElementById("username").value = "";
    document.getElementById("name").value = "";
    document.getElementById("phone").value = "";
    document.getElementById("inputGroupSelect01").value = "2"; // Set the default role value (change as needed)
    document.getElementById("password").value = "";
});

document.getElementById("addNewButton").addEventListener("click", function () {

    document.getElementById('username').disabled = false;
    document.getElementById('username').value = ''
    document.getElementById('name').value = ''
    document.getElementById('phone').value = ''
    document.getElementById('group-password').value = ''
    document.getElementById('group-password').style.display = 'block'

    document.getElementById('inputGroupSelect01').value = '2'

    document.getElementById("save").style.display = 'block'
    document.getElementById("update").style.display = 'none'
});









