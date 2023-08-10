$("document").ready(function () {
    getListProduct(-1);
});

function getListProduct(id) {
    var data = {
        CateID:id
    }
    $.ajax({
        url: '/getListProduct',
        type: 'POST',
        dataType: 'json',
        data, data,
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

                var productNameCell = document.createElement("td");
                productNameCell.textContent = item.ProductName;
                row.appendChild(productNameCell);

                var formattedPrice = item.ProductPrice.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });

                var productPriceCell = document.createElement("td");
                productPriceCell.textContent = formattedPrice;
                row.appendChild(productPriceCell);

                var productUnitCell = document.createElement("td");
                productUnitCell.textContent = item.ProductUnit;
                row.appendChild(productUnitCell);


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
                    detailProduct(item.ProductID, item.ProductName, item.ProductPrice, item.ProductUnit, item.CateID);
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
                    if (confirm("Bạn có chắc chắn muốn xóa món " + item.ProductName + " ?")) {
                        // Nếu người dùng chọn "OK" trong hộp thoại confirm, thực hiện xóa người dùng
                        deleteProduct(item.ProductID);
                    }
                });
                actionCell.appendChild(deleteButton);




                row.appendChild(actionCell);

                // Thêm hàng vào bảng
                tableBody.appendChild(row);
            });
        },
        error: function () {
            console.log('Không thể lấy dữ liệu từ API.');
        }
    });
}

function createProduct() {
    const temmon = document.getElementById('productName').value
    const nhomid = document.getElementById('inputGroupSelect01').value
    const giaFormatted = document.getElementById('productPrice').value;
    const gia = parseFloat(giaFormatted.replace(/,/g, ''))
    const donvi = document.getElementById('productUnit').value

    const data = {
        CateID: nhomid,
        ProductName: temmon,
        ProductPrice: gia,
        ProductUnit: donvi
    }
    $.ajax({
        url: '/createProduct',
        type: 'POST',
        dataType: 'json',
        data: data,
        success: function (data) {
            if (data == true) {
                getListProduct(-1)
            }
        },
        error: function () {
            // Xử lý lỗi nếu có
            console.log('Không thể lấy dữ liệu từ API.');
        }
    });
}

function updateProduct() {

    const id = document.getElementById('productID').value
    const temmon = document.getElementById('productName').value
    const nhomid = document.getElementById('inputGroupSelect01').value
    const giaFormatted = document.getElementById('productPrice').value;
    const gia = giaFormatted.indexOf(',') > 0 ? giaFormatted.replace(',', '')  :giaFormatted.replace('.', '') ;
    const gia1 = gia.replace(/[^\d]/g, '');
    console.log(gia1)
    const donvi = document.getElementById('productUnit').value

    const data = {
        ProductID: id,
        CateID: nhomid,
        ProductName: temmon,
        ProductPrice: gia1,
        ProductUnit: donvi,
    }

    $.ajax({
        url: '/updateProduct',
        type: 'POST',
        dataType: 'json',
        data: data,
        success: function (data) {
            if (data == true) {
                getListProduct(-1)
            }
        },
        error: function () {
            // Xử lý lỗi nếu có
            console.log('Không thể lấy dữ liệu từ API.');
        }
    });
}

function detailProduct(stt, tenmon, gia, donvi, nhom) {
    document.getElementById("productID").value = stt;
    document.getElementById("productName").value = tenmon;
    var formattedPrice = gia.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
    document.getElementById("productPrice").value = formattedPrice;
    document.getElementById("productUnit").value = donvi;

    document.getElementById("inputGroupSelect01").value = nhom;


    document.getElementById("save").style.display = 'none'
    document.getElementById("update").style.display = 'block'
}

function formatCurrency(input) {
    var start = input.selectionStart;
    var value = input.value;
    value = value.replace(/[^\d.-]/g, '');
    var parts = value.split('.');
    if (parts.length > 1) {
        parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        parts[1] = parts[1].substring(0, 2);
    } else {
        parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }
    input.value = parts.join('.') + ' đ';
    input.setSelectionRange(start, start);
}

function deleteProduct(id) {
    const data = {
        ProductID: id,
    }

    $.ajax({
        url: '/deleteProduct',
        type: 'POST',
        dataType: 'json',
        data: data,
        success: function (data) {
            if (data == true) {
                getListProduct(-1)
            }
        },
        error: function () {
            // Xử lý lỗi nếu có
            console.log('Không thể lấy dữ liệu từ API.');
        }
    });
}

$('input[name="user-status"]').on('change', function () {
    var selectedValue = $('input[name="user-status"]:checked').val();
    var containerDiv = $('.row-cols-lg-3');
    containerDiv.empty(); // Xóa hết nội dung trong containerDiv
    getListProduct(selectedValue)
});

document.getElementById("userformmodal").addEventListener("show.bs.modal", function () {
    document.getElementById("productID").value = "";
    document.getElementById("productName").value = "";
    document.getElementById("productPrice").value = "";
    document.getElementById("productUnit").value = "";

    document.getElementById("inputGroupSelect01").value = "1";
});


document.getElementById("addNewButton").addEventListener("click", function () {

    document.getElementById("productID").value = "";
    document.getElementById("productName").value = "";
    document.getElementById("productPrice").value = "";
    document.getElementById("productUnit").value = "";

    document.getElementById("inputGroupSelect01").value = "1";

    document.getElementById("save").style.display = 'block'
    document.getElementById("update").style.display = 'none'
});