class BaseJS {
    constructor() {
        this.getDataUrl = null;
        this.setDataUrl();
        this.loadData();
        this.initEvent();
    }

    /**
     * Set đường dẫn database
     * */
    setDataUrl() {

    }

    /**
     * Khởi tạo sự kiện các button
     * CredtedBy: PDTAI (29/12/2020)
     * */
    initEvent() {
        var me = this;
        // Sự kiên click khi nhấn thêm mới

        //$('#btnAdd').click(function () {
        //    // Hiển thị dialog thông tin chi tiết
        //    dialog.dialog('open');
        //})
        $('#btnAdd').on('click', function () {
            // Hiển thị dialog thông tin chi tiết
            $(".m-dialog").show();

        })

        // Sự kiên khi click close, hủy
        $('#btnClose').on('click', function () {
            // Ẩn dialog
            $(".m-dialog").hide();
        })

        $('#btnCancel').on('click', function () {
            // Ẩn dialog
            $(".m-dialog").hide();
        })

        // Load lại dữ liệu khi nhấn button nạp
        $('#btnRefresh').on('click', function () {
            me.loadData();
        })

        // Thực hiện lưu dữ liệu khi nhấn button ['Lưu']
        $('#btnSave').on('click', function () {
            // Validated dữ liệu
            var inputValidates = $('.input-required, input[type="email"]');
            $.each(inputValidates, function (index, input) {
                $(input).trigger('blur');// Trigger: Kiích  hoạt tự động sự kiện của chính nó
            })
            var inputNotVlidates = $('input[validate="false"]');
            if (inputNotVlidates && inputNotVlidates.length > 0) {
                alert("Dữ liệu không hợp lệ, vui lòng kiểm tra lại!");
                inputNotVlidates[0].focus();
                return;//Dừng chương trình
            }
            // Thhu nhập thông tin dữ liệu-> build thành đối tượng
            var customer = {
                "CustomerCode": $('#txtCustomerCode').val(),
                "FullName": $('#txtFullName').val(),
                "MemberCardCode": $('#txtMemberCardCode').val(),
                //"CustomerGroupId": "Khách VIP",
                "DateOfBirth": $('#DateOfBirth').val(),
                "Email": $('#txtCustomerEmail').val(),
                "PhoneNumber": $('#txtPhoneNumber').val(),
                "Address": $('#txtAddress').val()
            }
            //Gọi service tương ứng thực hiện dữ liệu
            $.ajax({
                url: 'http://api.manhnv.net/api/customers',
                method: 'POST',
                data: JSON.stringify(customer),
                contentType: 'application/json'
            }).done(function (res) {
                // Sau khi thành công: 
                // - Đưa ra thông báo
                debugger
                alert("Thêm thành công!");
                // - Ẩn dialog chi tiết
                $(".m-dialog").hide();
                // - Load lại dữ  liệu
                me.loadData();
            }).fail(function (res) {
                debugger
            })
        });

        //Hiển thị thông tin chi tiết khi dúp chuột chọn một bản ghi trên danh sách dữ liệu
        $('table tbody').on('dblclick', 'tr', function () {
            // Hiển thị dialog thông tin chi tiết
            $(".m-dialog").show();
        })

        /**
         * validated bắt buộc nhập
         * CreatedBy: PDTAI (1/1/2021)
         * */
        $('.input-required').blur(function () {
            // Kiểm tra dữ liệu đã nhập nếu để trống thì cảnh báo
            //this.classList.add('border-red');
            var value = $(this).val();
            if (!value) {
                $(this).addClass('border-red');
                $(this).attr('title', 'Trường này không được phép bỏ trống!');
                $(this).attr('validate', false);
            } else {
                $(this).removeClass('border-red');
                $(this).attr('validate', true);
            }

        })

        /**
        * validated email đúng định dạng
        * CreatedBy: PDTAI (1/1/2021)
        * */
        $('input[type="email"]').blur(function () {
            var value = $(this).val();
            var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
            if (!regex.test(value)) {
                $(this).addClass('border-red');
                $(this).attr('title', 'Email không đúng định dạng');
                $(this).attr('validate', false);
            } else {
                $(this).removeClass('border-red');
                $(this).attr('validate', true);
            }

        })
    }


    /**
     * Load dữ liệu
     * CreatedBy: PDTAI (28/12/2020)
     * */
    loadData() {
        try {
            $('table tbody').empty();
            // Lấy thông tin các cột dữ liệu
            var ths = $('table thead th');
            var getDataUrl = this.getDataUrl;

            // Lấy dữ liệu 
            $.ajax({
                url: getDataUrl,
                method: "GET",
            }).done(function (res) {
                // Chạy đúng
                $.each(res, function (index, obj) {
                    var tr = $(`<tr></tr>`);
                    //Lấy thông tin dữ liệu sẽ map tương ứng với các cột
                    $.each(ths, function (index, th) {

                        var td = $(`<td><div><span></span></div></td>`);
                        var fieldName = $(th).attr('fieldName');//Lấy giá trị attribute fieldname
                        var value = obj[fieldName];//Lấy giá trị của đối tượng

                        var formatType = $(th).attr('formatType');//Lấy giá trị attribute formatType
                        switch (formatType) {
                            case "ddmmyy":
                                td.addClass("text-center");//Add class vào td
                                value = formatDate(value);// Gọi hàm định dạng ngày từ common.js
                                break;
                            case "Money":
                                td.addClass("text-right");
                                value = formatMoney(value);// Gọi hàm định dạng tiền tệ từ common.js
                                break;
                            case "FormatAddress":
                                td.addClass("overflow");
                                td.attr('title', obj[fieldName]);
                                break;
                            case "Gender":
                                td.addClass("text-center");
                                var value = '<input type="checkbox"/>';
                                // 1 là nam , còn lại là nữ
                                // Nếu checkbox là checked thì là nam
                                if (obj[fieldName] == 1) {
                                    var value = '<input type="checkbox" checked/>';
                                }
                                //td.append(checkbox);
                                break;
                            default:
                                break;
                        }
                        td.append(value);
                        $(tr).append(td);
                    })


                    $('table tbody').append(tr);
                })
                // Binding dl lên table

            }).fail(function (res) {
                // Chạy fail
            })
        } catch (e) {
            // Ghi log lỗi
            console.log(e);
        }

    }


    /**
    * Thêm mới dữ liệu
    * CreatedBy: PTTAI (28/12/2020)
    * */
    add() {

    }

    /**
    * Sửa dữ liệu
    * CreatedBy: PTTAI (28/12/2020)
    * */
    edit() {

    }

}