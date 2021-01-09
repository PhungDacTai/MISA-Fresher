class BaseJS {
    constructor() {
        this.host = "http://api.manhnv.net";
        this.apiRouter = null;
        this.setApiRouter();
        this.loadData();
        this.initEvents();
        this.contextMenu();

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
        $('#btnAdd').on('click', me.btnAddOnClick.bind(me));

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
        $('#btnSave').on('click', me.btnSaveOnClick.bind(me));

        //Hiển thị thông tin chi tiết khi đúp chuột chọn một bản ghi trên danh sách dữ liệu===============================================================
        $('table tbody').on('dblclick', 'tr', me.doubleClickEvent.bind(me));

        /**
         * validated bắt buộc nhập
         * CreatedBy: PDTAI (1/1/2021)
         * */
        $('.input-required').blur(me.validateInput);


        /**
        * validated email đúng định dạng
        * CreatedBy: PDTAI (1/1/2021)
        * */
        $('input[type="email"]').blur(me.validateEmail);


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
    btnAddOnClick() {
        try {
            $('input[type="text"]').val('');
            $('input[type="email"]').val('');
            $('input[type="tel"]').val('');
            $('input[type="date"]').val('');
            var me = this;
            me.FormMode = 'Add';
            // Hiển thị dialog thông tin chi tiết
            $(".m-dialog").show();
            // Load dữ liệu cho combobox
            var select = $('select[fieldName]');
            select.empty();
            $.each(select, function (index, value) {
                // Lấy dữ liệu nhóm khách hàng
                var api = $(select).attr('api');
                var fieldName = $(select).attr('fieldName');
                var fieldValue = $(select).attr('fieldValue');
                $('.loading').show();
                $.ajax({
                    url: me.host + api,
                    method: "GET"
                }).done(function (res) {
                    try {
                        if (res) {
                            $.each(res, function (index, obj) {
                                var option = $(`<option value="${obj[fieldValue]}">${obj[fieldName]}</option>`);
                                select.append(option);
                            })
                            console.log(select);
                        }
                    } catch (e) {
                        console.log(e);
                    }

                    $('.loading').hide();
                }).fail(function (res) {
                    $('.loading').hide();
                })
            })
        } catch (e) {
            console.log(e);
        }

    }

    /**
    * Sửa, lưu dữ liệu
    * CreatedBy: PTTAI (28/12/2020)
    * */
    btnSaveOnClick() {
        // Validated dữ liệu
        var me = this;
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
            if (propertyName == "DateOfBirth") {
                value = formatDate2(value);
            }
            //Check với trường hợp input là radio, thì chỉ lấy value có thuộc tính  checked
            if ($(this).attr('type') == "radio") {
                if (this.checked) {
                    entity[propertyName] = value;
                }

            } else {
                entity[propertyName] = value;
            }
            debugger;
        })
        var method = "POST";
        if (me.FormMode == 'Edit') {
            method = "PUT";
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
            //==========================================================================================================
        }).fail(function (res) {
            // Get the snackbar DIV
            var x = document.getElementById("snackbar_fail");

            // Add the "show" class to DIV
            x.className = "show";

            // After 3 seconds, remove the show class from DIV
            setTimeout(function () { x.className = x.className.replace("show", ""); }, 3000);
            // - Ẩn dialog chi tiết
        })

    }


    /**
     * 
     * */
    doubleClickEvent(e) {
        var me = this;
        $('input[type="text"]').val('');
        $('input[type="email"]').val('');
        $('input[type="tel"]').val('');
        $('tr').find('td').removeClass('selected');
        $(e.currentTarget).find('td').addClass('selected');
        me.FormMode = 'Edit';
        // Load form
        // Lấy dữ liệu nhóm khách hàng
        var select = $('select[fieldName]');
        select.empty();
        $.each(select, function (index, value) {
            // Lấy dữ liệu nhóm khách hàng
            var api = $(select).attr('api');
            var fieldName = $(select).attr('fieldName');
            var fieldValue = $(select).attr('fieldValue');
            $('.loading').show();
            $.ajax({
                url: me.host + api,
                method: "GET"
            }).done(function (res) {
                try {
                    if (res) {
                        $.each(res, function (index, obj) {
                            var option = $(`<option value="${obj[fieldValue]}">${obj[fieldName]}</option>`);
                            select.append(option);
                            console.log(res[fieldName]);
                        })
                        console.log(select);
                    }
                } catch (e) {
                    console.log(e);
                }

                $('.loading').hide();
            }).fail(function (res) {
                $('.loading').hide();
            })
        })
        // Lấy khóa chính bản ghi
        var recordId = $(e.currentTarget).data('recordId');// Che giấu code dễ hơn
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
                //console.log(value);
                //Check nhóm
                if (propertyName == "CustomerGroupName") {
                    var value1 = res[propertyName];
                    console.log(value1);
                    var select = $('select[fieldName]');
                    $.each(select, function (index, value) {
                        // Lấy dữ liệu nhóm khách hàng
                        var fieldName = $(select).attr('fieldName');
                        console.log(fieldName);
                        if (fieldName = value1) {
                            
                            $(this).attr('selected', 'selected');
                            console.log(this);
                        }
                    })
                }
                //Check ngày sinh
                if (propertyName == "DateOfBirth") {
                    value = formatDate2(value);
                    $(this).attr('value', value);
                }
                //Check với trường hợp input là radio, thì chỉ lấy value có thuộc tính  checked
                if (propertyName == "Gender") {
                    if (res[propertyName] == "0") {
                        $('input[id="female"]').prop('checked', true);
                        $('input[id="male"]').prop('checked', false);
                        $('input[id="other"]').prop('checked', false);

                    }
                    if (res[propertyName] == "1") {
                        $('input[id="female"]').prop('checked', false);
                        $('input[id="other"]').prop('checked', false);
                        $('input[id="male"]').prop('checked', true);
                    }
                    if (res[propertyName] == "2") {
                        $('input[id="female"]').prop('checked', false);
                        $('input[id="female"]').prop('checked', false);
                        $('input[id="other"]').prop('checked', true);
                    }
                }
                $(this).val(value);
                $("#male").val("1");
                $("#female").val("0");
                $("#other").val("2");

            })

        }).fail(function (res) {

        })

        // Hiển thị dialog thông tin chi tiết
        $(".m-dialog").show();
    }


    /**
     * 
     * */
    validateInput() {
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

    }


    /**
     * 
     * */
    validateEmail() {
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
    }



    /**
     * Context menu kích chuột phải chọn một dòng tr
     * CreatedBy: PDTAI (05/01/2021)
     * */
    contextMenu() {
        var me = this;
        var $contextMenu = $("#contextMenu");

        $("body").on("contextmenu", "table tr", function (e) {
            var me2 = this;
            $('tr').addClass('remove');
            console.log(me2);
            $contextMenu.css({
                display: "block",
                left: e.pageX,
                top: e.pageY
            })
            
            var recordId = $(e.currentTarget).data('recordId');// Che giấu code dễ hơn
            me.recordId = recordId;
            console.log(recordId);
            console.log(me);
            $('#btnDelete').on('click', function () {
                $.ajax({
                    url: me.host + me.apiRouter + `/${recordId}`,
                    method: "DELETE"
                }).done(function (res) {
                    me.loadData();
                }).fail(function (res) {

                })
            })
            return false;
        });

        $('html').click(function () {
            $contextMenu.hide();
        });

        $("#contextMenu").click(function (e) {
            var f = $(this);
        });
    }


}