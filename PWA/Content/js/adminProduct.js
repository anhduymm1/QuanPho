$("document").ready(function () {
    getListProduct();
});

function getListProduct() {
    $.ajax({
        url: '/getListProduct',
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

                var productNameCell = document.createElement("td");
                productNameCell.textContent = item.ProductName;
                row.appendChild(productNameCell);

                var productPriceCell = document.createElement("td");
                productPriceCell.textContent = item.ProductPrice;
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
                //editButton.addEventListener("click", function () {
                //    var userFormModal = new bootstrap.Modal(document.getElementById("userformmodal"));
                //    userFormModal.show();
                //    detailUser(item.UserName, item.FullName, item.Phone, item.Role_ID);
                //});
                actionCell.appendChild(editButton);

                // Delete button
                var deleteButton = document.createElement("button");
                deleteButton.className = "btn btn-danger ms-2";
                deleteButton.type = "button";
                var deleteIcon = document.createElement("i");
                deleteIcon.className = "bi bi-trash";
                deleteButton.appendChild(deleteIcon);
                //deleteButton.addEventListener("click", function () {
                //    if (confirm("Bạn có chắc chắn muốn xóa người dùng " + item.FullName + " ?")) {
                //        // Nếu người dùng chọn "OK" trong hộp thoại confirm, thực hiện xóa người dùng
                //        deleteUser(item.UserName);
                //    }
                //});
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