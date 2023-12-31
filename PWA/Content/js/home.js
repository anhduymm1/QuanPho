﻿$("document").ready(function () {
    getListDeskByWhere(-1);
    statiticDesk();

});

//function getListDesk() {
//    $.ajax({
//        url: '/getListDesk',
//        type: 'POST',
//        dataType: 'json',
//        success: function (data) {
//            var containerDiv = $('.row-cols-lg-3'); // Thay thế bằng selector của container thích hợp

//            data.forEach(function (item, index) {
//                var cardDiv = $('<div>', {
//                    class: 'col my-3'
//                });

//                var card = $('<div>', {
//                    class: 'card border-hover-primary hover-scale'
//                });

//                var cardBody = $('<div>', {
//                    class: 'card-body'
//                });

//                var textPrimary = $('<div>', {
//                    class: 'text-primary mb-5'
//                });

//                var imageDiv = $('<div>', {
//                    style: 'border: 2px solid black; border-radius:50px;'
//                });

//                var image = $('<img>', {
//                    src: './images/lunch-time.png',
//                    style: 'width: 60px; height: 60px;'
//                });

//                var h4 = $('<h4>', {
//                    class: 'font-weight-bold mb-3',
//                    text: item.TableName
//                });
//                var trangthai = ''

//                if (item.TableStatus == '1') {
//                    trangthai = 'Bàn đã đặt'
//                }
//                else {
//                    trangthai = 'Bàn chưa đặt'
//                }

//                var p = $('<p>', {
//                    class: 'text-muted mb-0',
//                    text: trangthai
//                });

//                if (trangthai === "Bàn đã đặt") {
//                    card.css('background-color', '#C8E4B2');
//                }

//                card.on('click', function () {
//                    var userFormModal = new bootstrap.Modal(document.getElementById("userformmodal"));
//                    userFormModal.show();
//                });

//                imageDiv.append(image);
//                textPrimary.append(imageDiv);
//                cardBody.append(textPrimary, h4, p);
//                card.append(cardBody);
//                cardDiv.append(card);

//                containerDiv.append(cardDiv);
//            });
//        },
//        error: function () {
//            // Xử lý lỗi nếu có
//            console.log('Không thể lấy dữ liệu từ API.');
//        }
//    });
//}

function statiticDesk() {
    var all = document.getElementById("static-all")
    var active = document.getElementById("static-active")
    var disable = document.getElementById("static-disable")

    $.ajax({
        url: '/statiticDesk',
        type: 'POST',
        dataType: 'json',
        success: function (data) {
            all.textContent = data.All
            active.textContent = data.Active
            disable.textContent = data.Disable
        },
        error: function () {
            // Xử lý lỗi nếu có
            console.log('Không thể lấy dữ liệu từ API.');
        }
    });

}

function getListDeskByWhere(status) {

    var data = {
        TableStatus: status
    }


    $.ajax({
        url: '/getListDeskByWhere',
        type: 'POST',
        dataType: 'json',
        data: data,
        success: function (data) {
            var containerDiv = $('.content'); // Thay thế bằng selector của container thích hợp

            data.forEach(function (item, index) {
                var cardDiv = $('<div>', {
                    class: 'col my-3'
                });

                var card = $('<div>', {
                    class: 'card border-hover-primary hover-scale shadow-lg p-3 mb-5  rounded'
                });

                var cardBody = $('<div>', {
                    class: 'card-body'
                });

                var textPrimary = $('<div>', {
                    class: 'text-primary mb-5'
                });

                var imageDiv = $('<div>', {
                    style: 'border: 2px solid black; border-radius:50px;'
                });

                var image = $('<img>', {
                    src: './images/lunch-time.png',
                    style: 'width: 60px; height: 60px;'
                });

                var h4 = $('<h4>', {
                    class: 'font-weight-bold mb-3',
                    text: item.TableName
                });
                var trangthai = ''

                if (item.TableStatus == '1') {
                    trangthai = 'Bàn đã đặt'
                }
                else {
                    trangthai = 'Bàn chưa đặt'
                }

                var p = $('<p>', {
                    class: 'text-muted mb-0',
                    text: trangthai
                });

                if (trangthai === "Bàn đã đặt") {
                    card.css('background-color', '#C8E4B2');
                }

                card.on('click', function () {
                    var userFormModal = new bootstrap.Modal(document.getElementById("userformmodal"));
                    var ModalOrder = new bootstrap.Modal(document.getElementById("modalorder"));
                    if (item.TableStatus == '1') {
                        userFormModal.show();
                        getListOrder(item.TableID)
                        var containerDiv = $('.detailOrder');
                        containerDiv.empty();
                    }
                    else {
                        ModalOrder.show();
                        showProduct()
                    }
                    detailTable(item.TableName, item.TableID)

                });

                imageDiv.append(image);
                textPrimary.append(imageDiv);
                cardBody.append(textPrimary, h4, p);
                card.append(cardBody);
                cardDiv.append(card);

                containerDiv.append(cardDiv);
            });
        },
        error: function () {
            // Xử lý lỗi nếu có
            console.log('Không thể lấy dữ liệu từ API.');
        }
    });
}

function showProduct() {
    var containerDiv = $('.listproduct');
    containerDiv.empty();
    getListProduct('-1')
    $("#searchInput").on("input", function () {
        var searchText = $(this).val().toLowerCase();
        filterProducts(searchText);
    });
}

function detailTable(tenban, id) {
    var tableName = document.getElementById("tenban")
    var tableName1 = document.getElementById("tenban1")
    var tableId = document.getElementById("idban")
    tableName.innerText = tenban
    tableName1.innerText = tenban
    tableId.innerText = id
    tableName.style.color = 'blue'
    tableName1.style.color = 'blue'
    //document.getElementById("save").style.display = 'none'
    //document.getElementById("update").style.display = 'block'
}


$('input[name="table-status"]').on('change', function () {
    var selectedValue = $('input[name="table-status"]:checked').val();
    var containerDiv = $('.content');
    containerDiv.empty(); // Xóa hết nội dung trong containerDiv
    getListDeskByWhere(selectedValue)
});

$('#addProductOrder').on('click', function () {

    var ModalOrder = new bootstrap.Modal(document.getElementById("modalorder"));
    ModalOrder.show();
    showProduct()
})

document.getElementById("userformmodal").addEventListener("show.bs.modal", function () {
    // Clear the form fields when the modal is shown
});
var selectedProducts = [];
var selectedProductOrders = [];



function removeVietnameseDiacritics(str) {
    return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}

function filterProducts(searchText) {
    var normalizedSearchText = removeVietnameseDiacritics(searchText.toLowerCase());
   var productLabels = $(".productname");

    productLabels.each(function () {
        var productName = $(this).text();
        var normalizedProductName = removeVietnameseDiacritics(productName.toLowerCase());

        if (normalizedProductName.indexOf(normalizedSearchText) !== -1) {
            $(this).closest(".searchitem").show();
        } else {
            $(this).closest(".searchitem").hide();
        }
    });
}

function addOrder() {
    var data = selectedProducts
    if (selectedProducts.length > 0) {
        $.ajax({
            url: '/addOrderTable',
            type: 'POST',
            dataType: 'json',
            contentType: "application/json",
            data: JSON.stringify(data),
            success: function (data) {
                if (data == true) {
                    var containerDiv = $('.content');
                    containerDiv.empty();
                    getListDeskByWhere(-1)
                    selectedProducts = []
                    var userFormModal = new bootstrap.Modal(document.getElementById("modalorder"));
                    userFormModal.hide();
                }
            },
            error: function () {
                console.log('Không thể lấy dữ liệu từ API.');
            }
        });
    }
    //console.log(selectedProducts)
   
}

function getListOrder(tableID) {
    var data = {
        TableID: tableID
    }
    $.ajax({
        url: '/tableOrderDetail',
        type: 'POST',
        dataType: 'json',
        data: data,
        success: function (data) {
            var containerDiv = $('.detailOrder');
            data.forEach(function (item, index) {
                var cardDiv = $('<div>', {
                    class: 'col-12 col-lg-6'
                });

                var checkboxInput = $('<input>', {
                    type: 'checkbox',
                    class: 'btn-check',
                    autocomplete: "off",
                    id: "btncheck-order" + item.ProductID
                });

                // Tạo phần tử <div> bên trong nút
                var innerDiv = $('<div>', {
                    class: 'col shadow p-3 mb-5 rounded btn btn-outline-primary',
                    id: 'hop-order' + item.ProductID,
                    style: 'width: 100%; border: none'
                });

                var divRow1 = $('<div>', {
                    class: 'row',
                });

                var divRow2 = $('<div>', {
                    class: 'row',
                });


                // Tạo phần tử <img>
                var image = $('<img>', {
                    src: './images/pho.png',
                    class: 'col-3',
                    style: 'width:70px'
                });

                // Tạo phần tử <label> cho tên sản phẩm
                var nameLabel = $('<label>', {
                    class: 'col-8 productname',
                    for: "btncheck-order" + item.ProductID,
                    style: 'display:flex; align-items:center; justify-content:flex-start;text-align: left;',
                    text: item.ProductName
                });

                var formattedPrice = item.OTPrice.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });

                // Tạo phần tử <label> cho giá sản phẩm
                var priceLabel = $('<label>', {
                    class: 'col-8',
                    style: 'display:flex; align-items:center; justify-content:flex-start;',
                    id: 'gia-order' + item.ProductID,
                    text: formattedPrice
                });

                // Tạo phần tử <input> cho số lượng
                var quantityInput = $('<input>', {
                    type: 'number',
                    class: 'col-2',
                    id: 'qtyinput-order' + item.ProductID,
                    value: item.OTQuantity,
                    //change: function () {
                    //    var newValue = $(this).val();
                    //    var productID = $(this).attr('id').replace('qtyinput', ''); // Lấy mã sản phẩm từ ID input
                    //    var selectedProduct = selectedProducts.find(function (product) {
                    //        return product.ProductID === productID;
                    //    });

                    //    if (selectedProduct) {
                    //        selectedProduct.OTQuantity = newValue;
                    //    }
                    //}
                });


                checkboxInput.change(function () {
                    var checkboxId = $(this).attr('id'); // Lấy ID của checkbox đã thay đổi
                    var isChecked = $(this).is(':checked'); // Kiểm tra trạng thái của checkbox
                    var productID = checkboxId.replace('btncheck-order', ''); // Lấy mã sản phẩm từ ID checkbox
                    var productPrice = document.getElementById("gia-order" + productID).innerText
                    var productQtyInput1 = document.getElementById("qtyinput-order" + productID).value
                    var hopElement = $('#hop-order' + checkboxId); // Tìm phần tử tương ứng theo ID
                    console.log(hopElement)
                    var userID = document.getElementById('userIDOrder').value;
                    if (isChecked) {
                        hopElement.css('background-color', 'green'); // Đặt màu nền thành xanh khi isChecked là true

                        // Tạo đối tượng món được chọn và thêm vào mảng
                        var selectedProduct = {
                            ProductID: productID,
                            OTPrice: productPrice.replace(/[^0-9]/g, ''),
                            OTQuantity: productQtyInput1,
                            TableID: document.getElementById("idban").innerText,
                            UserID: userID
                            // Các thông tin khác về sản phẩm bạn có thể thêm vào đây
                        };
                        selectedProducts.push(selectedProduct);
                    } else {
                        hopElement.css('background-color', '#F8F0E5'); // Đặt màu nền thành mặc định khi isChecked là false

                        // Xoá đối tượng món khỏi mảng dựa trên productID
                        selectedProducts = selectedProducts.filter(function (product) {
                            return product.ProductID !== productID;
                        });
                    }
                });

                divRow1.append(image)
                divRow1.append(nameLabel)

                divRow2.append(priceLabel)
                divRow2.append(quantityInput)

                innerDiv.append(divRow1)
                innerDiv.append(divRow2)

                cardDiv.append(checkboxInput);
                cardDiv.append(innerDiv);

                // Gắn thẻ card vào thẻ cardDiv
                containerDiv.append(cardDiv);
            });
        },
        error: function () {
            console.log('Không thể lấy dữ liệu từ API.');
        }
    });
}

function getListProduct(id) {
    var data = {
        CateID: id
    }
    $.ajax({
        url: '/getListProduct',
        type: 'POST',
        dataType: 'json',
        data, data,
        success: function (data) {
            var containerDiv = $('.listproduct');
            data.forEach(function (item, index) {
                var cardDiv = $('<div>', {
                    class: 'col-12 col-lg-3 col-md-6 searchitem'
                });



                // Tạo một thẻ input checkbox
                var checkboxInput = $('<input>', {
                    type: 'checkbox',
                    class: 'btn-check',
                    autocomplete: "off",
                    id: "btncheck" + item.ProductID
                });

                //// Tạo phần tử <div> chứa nút
                //var outerDiv = $('<div>', {
                //    class: 'btn btn-outline-primary row',
                //    style: 'width:100%; border:none;'
                //});

                // Tạo phần tử <div> bên trong nút
                var innerDiv = $('<div>', {
                    class: 'col shadow p-3 mb-5 rounded btn btn-outline-primary',
                    id: 'hopbtncheck' + item.ProductID,
                    style: 'background: #F8F0E5;width: 100%; border: none'
                });

                var divRow1 = $('<div>', {
                    class: 'row',
                });

                var divRow2 = $('<div>', {
                    class: 'row',
                });


                // Tạo phần tử <img>
                var image = $('<img>', {
                    src: './images/pho.png',
                    class: 'col-3',
                    style: 'width:100px'
                });

                // Tạo phần tử <label> cho tên sản phẩm
                var nameLabel = $('<label>', {
                    class: 'col-8 productname',
                    for: "btncheck" + item.ProductID,
                    style: 'display:flex; align-items:center; justify-content:flex-start;text-align: left;',
                    text: item.ProductName
                });

                var formattedPrice = item.ProductPrice.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });

                // Tạo phần tử <label> cho giá sản phẩm
                var priceLabel = $('<label>', {
                    class: 'col-8',
                    style: 'display:flex; align-items:center; justify-content:flex-start;',
                    id: 'gia' + item.ProductID,
                    text: formattedPrice
                });

                // Tạo phần tử <input> cho số lượng
                var quantityInput = $('<input>', {
                    type: 'number',
                    class: 'col-2',
                    id: 'qtyinput' + item.ProductID,
                    value: 1,
                    change: function () {
                        var newValue = $(this).val();
                        var productID = $(this).attr('id').replace('qtyinput', ''); // Lấy mã sản phẩm từ ID input
                        var selectedProduct = selectedProducts.find(function (product) {
                            return product.ProductID === productID;
                        });

                        if (selectedProduct) {
                            selectedProduct.OTQuantity = newValue;
                        }
                    }
                });


                checkboxInput.change(function () {
                    var checkboxId = $(this).attr('id'); // Lấy ID của checkbox đã thay đổi
                    var isChecked = $(this).is(':checked'); // Kiểm tra trạng thái của checkbox
                    var productID = checkboxId.replace('btncheck', ''); // Lấy mã sản phẩm từ ID checkbox
                    var productPrice = document.getElementById("gia" + productID).innerText
                    var productQtyInput1 = document.getElementById("qtyinput" + productID).value
                    var hopElement = $('#hop' + checkboxId); // Tìm phần tử tương ứng theo ID
                    var userID = document.getElementById('userID').value;
                    if (isChecked) {
                        hopElement.css('background-color', 'green'); // Đặt màu nền thành xanh khi isChecked là true

                        // Tạo đối tượng món được chọn và thêm vào mảng
                        var selectedProduct = {
                            ProductID: productID,
                            OTPrice: productPrice.replace(/[^0-9]/g, ''),
                            OTQuantity: productQtyInput1,
                            TableID: document.getElementById("idban").innerText,
                            UserID: userID
                            // Các thông tin khác về sản phẩm bạn có thể thêm vào đây
                        };
                        selectedProducts.push(selectedProduct);
                    } else {
                        hopElement.css('background-color', '#F8F0E5'); // Đặt màu nền thành mặc định khi isChecked là false

                        // Xoá đối tượng món khỏi mảng dựa trên productID
                        selectedProducts = selectedProducts.filter(function (product) {
                            return product.ProductID !== productID;
                        });
                    }
                });

                divRow1.append(image)
                divRow1.append(nameLabel)

                divRow2.append(priceLabel)
                divRow2.append(quantityInput)

                innerDiv.append(divRow1)
                innerDiv.append(divRow2)

                /* outerDiv.append(innerDiv)*/
                // Gắn thẻ input checkbox và label vào thẻ card
                cardDiv.append(checkboxInput);
                cardDiv.append(innerDiv);

                // Gắn thẻ card vào thẻ cardDiv
                containerDiv.append(cardDiv);
            });
        },
        error: function () {
            console.log('Không thể lấy dữ liệu từ API.');
        }
    });
}


 


















