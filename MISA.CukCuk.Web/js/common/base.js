class BaseJS {
    constructor() {
        this.host = "http://api.manhnv.net";
        this.apiRouter = null;
        this.setApiRouter();
        this.loadData();
        this.initEvents();

        var input = document.getElementById('txtCustomerCode');
        input.focus();
        input.select();
    }

    setApiRouter() {

    }

    /**
     * Khởi tạo sự kiện các button
     * CredtedBy: PDTAI (29/12/2020)
     * */
    initEvents() {
        var me = this;
        // Sự kiên click khi nhấn thêm mới

        //$('#btnAdd').click(function () {
        //    // Hiển thị dialog thông tin chi tiết
        //    dialog.dialog('open');
        //})
        $('#btnAdd').on('click', function () {
            try {
                me.FormMode = 'Add';
                // Hiển thị dialog thông tin chi tiết
                $(".m-dialog").show();
                // Load dữ liệu cho combobox
                var select = $('select#cbxCustomerGroup');
                select.empty();
                // Lấy dữ liệu nhóm khách hàng
                $('.loading').show();
                $.ajax({
                    url: me.host + "/api/customergroups",
                    method: "GET"
                }).done(function (res) {
                    if (res) {
                        $.each(res, function (index, obj) {
                            var option = $(`<option value="${obj.CustomerGroupId}">${obj.CustomerGroupName}</option>`);
                            select.append(option);
                        })
                    }
                    $('.loading').hide();
                }).fail(function (res) {
                    $('.loading').hide();
                })
            } catch (e) {
                console.log(e);
            }

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

        // Thực hiện lưu dữ liệu khi nhấn button ['Lưu']===========================================================================
        $('#btnSave').on('click', function () {
            // Validated dữ liệu
            var inputValidates = $('.input-required, input[type="email"]');
            $.each(inputValidates, function (index, input) {
                $(input).trigger('blur');// Trigger: Kích  hoạt tự động sự kiện của chính nó
            })
            var inputNotVlidates = $('input[validate="false"]');
            if (inputNotVlidates && inputNotVlidates.length > 0) {
                alert("Dữ liệu không hợp lệ, vui lòng kiểm tra lại!");
                inputNotVlidates[0].focus();
                return;//Dừng chương trình
            }
            // Thu nhập thông tin dữ liệu-> build thành đối tượng

            // Lấy tất cả các control nhập liệu
            var inputs = $('input[fieldName], select[fieldName]');
            var entity = {};
            $.each(inputs, function (index, input) {
                var propertyName = $(this).attr('fieldName');//Lấy giá trị attribute id
                var value = $(this).val();//Lấy giá trị
                //Check với trường hợp input là radio, thì chỉ lấy value có thuộc tính  checked
                if ($(this).attr('type') == "radio") {
                    if (this.checked) {
                        entity[propertyName] = value;
                    }

                } else {
                    entity[propertyName] = value;
                }
            })
            var method = "POST";
            var mes = "Thêm thành công!";
            if (me.FormMode == 'Edit') {
                method = "PUT";
                var mes = "Sửa thành công!";
                entity.CustomerId = me.recordId;
            }
            //Gọi service tương ứng thực hiện dữ liệu
            $.ajax({
                url: me.host + me.apiRouter,
                method: method,
                data: JSON.stringify(entity),
                contentType: 'application/json'
            }).done(function (res) {
                // Sau khi thành công: 
                // - Đưa ra thông báo
                // Get the snackbar DIV
                var x = document.getElementById("snackbar");

                // Add the "show" class to DIV
                x.className = "show";

                // After 3 seconds, remove the show class from DIV
                setTimeout(function () { x.className = x.className.replace("show", ""); }, 3000);
                // - Ẩn dialog chi tiết
                $(".m-dialog").hide();
                // - Load lại dữ  liệu
                me.loadData();
            }).fail(function (res) {
                // Get the snackbar DIV
                var x = document.getElementById("snackbar_fail");

                // Add the "show" class to DIV
                x.className = "show";

                // After 3 seconds, remove the show class from DIV
                setTimeout(function () { x.className = x.className.replace("show", ""); }, 3000);
                // - Ẩn dialog chi tiết
            })
        });

        //Hiển thị thông tin chi tiết khi đúp chuột chọn một bản ghi trên danh sách dữ liệu===============================================================
        $('table tbody').on('dblclick', 'tr', function () {
            $(this).find('td').addClass('selected');
            me.FormMode = 'Edit';
            // Load form
            var select = $('select#cbxCustomerGroup');
            select.empty();
            // Lấy dữ liệu nhóm khách hàng
            $('.loading').show();
            $.ajax({
                url: me.host + "/api/customergroups",
                method: "GET"
            }).done(function (res) {
                if (res) {
                    $.each(res, function (index, obj) {
                        var option = $(`<option value="${obj.CustomerGroupId}">${obj.CustomerGroupName}</option>`);
                        select.append(option);
                    })
                }
                $('.loading').hide();
            }).fail(function (res) {
                $('.loading').hide();
            })
            // Lấy khóa chính bản ghi
            var recordId = $(this).data('recordId');// Che giấu code dễ hơn
            me.recordId = recordId;

            //Gọi service lấy thông tin chi tiết hiển thị lại form qua Id
            $.ajax({
                url: me.host + me.apiRouter + `/${recordId}`,
                method: "GET"
            }).done(function (res) {
                // Binding dữ liệu lên form chi tiết
                console.log(res);
                //Lấy tất cả các control nhập liệu
                var inputs = $('input[fieldName], select[fieldName]');
                var entity = {};
                $.each(inputs, function (index, input) {
                    var propertyName = $(this).attr('fieldName');//Lấy giá trị attribute id
                    var value = res[propertyName];
                    $(this).val(value);
                    //Check với trường hợp input là radio, thì chỉ lấy value có thuộc tính  checked
                    //if ($(this).attr('type') == "radio") {
                    //    if (this.checked) {
                    //        entity[propertyName] = value;
                    //    }

                    //} else {
                    //    entity[propertyName] = value;
                    //}

                })

            }).fail(function (res) {

            })

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
        var me = this;
        try {
            $('table tbody').empty();
            // Lấy thông tin các cột dữ liệu
            var ths = $('table thead th');
            var getDataUrl = this.getDataUrl;
            $('.loading').show();
            // Lấy dữ liệu 
            $.ajax({
                url: me.host + me.apiRouter,
                method: "GET",
                async: true,
            }).done(function (res) {
                // Chạy đúng
                $.each(res, function (index, obj) {
                    var tr = $(`<tr></tr>`);
                    $(tr).data('recordId', obj.CustomerId);
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
                    $('.loading').hide();
                })
                // Binding dl lên table

            }).fail(function (res) {
                // Chạy fail
                $('.loading').hide();
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