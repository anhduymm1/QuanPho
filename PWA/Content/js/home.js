$("document").ready(function () {
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
                    class: 'card border-hover-primary hover-scale'
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
                    }
                    else {
                        ModalOrder.show();
                        getListProduct('-1')
                        $("#searchInput").on("input", function () {
                            var searchText = $(this).val().toLowerCase();
                            filterProducts(searchText);
                        });
                    }
                    detailTable(item.TableName)

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

function detailTable(tenban) {
    var tableName = document.getElementById("tenban")
    var tableName1 = document.getElementById("tenban1")
    tableName.innerText = tenban
    tableName1.innerText = tenban
    tableName.style.color = 'blue'
    tableName1.style.color = 'blue'
    document.getElementById("save").style.display = 'none'
    document.getElementById("update").style.display = 'block'
}


$('input[name="table-status"]').on('change', function () {
    var selectedValue = $('input[name="table-status"]:checked').val();
    var containerDiv = $('.content');
    containerDiv.empty(); // Xóa hết nội dung trong containerDiv
    getListDeskByWhere(selectedValue)
});

document.getElementById("userformmodal").addEventListener("show.bs.modal", function () {
    // Clear the form fields when the modal is shown
});

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
                    class: 'col-6 col-lg-3'
                });

                var card = $('<div>', {
                    class: 'mb-3',
                    style: 'height: 100%'
                });

                // Tạo một thẻ input checkbox
                var checkboxInput = $('<input>', {
                    type: 'radio',
                    class: 'btn-check',
                    name: "btnradio",
                    id: 'btnradio' + item.ProductID,
                    autocomplete: 'off'
                });

                // Tạo một thẻ label kết hợp với input checkbox
                var checkboxLabel = $('<label>', {
                    class: 'btn btn-outline-primary productname',
                    for: 'btnradio' + item.ProductID,
                    style: 'width:100%; height:80%;display: flex;align-items: center;justify-content: center;',
                    text: item.ProductName
                });

                // Gắn thẻ input checkbox và label vào thẻ card
                card.append(checkboxInput);
                card.append(checkboxLabel);

                // Gắn thẻ card vào thẻ cardDiv
                cardDiv.append(card);
                containerDiv.append(cardDiv);
            });
        },
        error: function () {
            console.log('Không thể lấy dữ liệu từ API.');
        }
    });
}

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
            $(this).closest(".col-6.col-lg-3").show();
        } else {
            $(this).closest(".col-6.col-lg-3").hide();
        }
    });
}














