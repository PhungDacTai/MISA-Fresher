class BaseJS {
    constructor() {
        //this.host = "http://api.manhnv.net";
        this.host = "http://localhost:61201";
        this.apiRouter = null;
        this.setApiRouter();
        this.queryString = '';
        this.loadData();
        this.initEvents();
        this.contextMenu();

    }

    setQueryString() {

    }
    setApiRouter() {

    }


    /**
     * Khởi tạo sự kiện các button
     * CredtedBy: PDTAI (29/12/2020)
     * */
    initEvents() {
        var me = this;
        // Sự kiên click khi nhấn thêm mới =====================================================================
        $('#btnAdd').on('click', me.btnAddOnClick.bind(me));

        // Sự kiên khi click close, hủy đóng dialog, đóng popup ================================================
        $('#btnClose').on('click', function () {
            $(".m-dialog").hide();
        })
        $('#btnCancel').on('click', function () {
            $(".m-dialog").hide();
        })

        $('#btnClose2').on('click', function () {
            $(".popup").hide();
        })
        $('#btnCancel2').on('click', function () {
            $(".popup").hide();
        })


        // Load lại dữ liệu khi nhấn button load ===============================================================
        $('#btnRefresh').on('click', function () {
            me.loadData();
        })

        // Thực hiện lưu dữ liệu khi nhấn button ['Lưu']========================================================
        $('#btnSave').on('click', me.btnSaveOnClick.bind(me));

        //Hiển thị thông tin chi tiết khi đúp chuột chọn một bản ghi trên danh sách dữ liệu=====================
        $('table tbody').on('dblclick', 'tr', me.doubleClickEvent.bind(me));

        //Tô màu bản được chọn khi click chuột
        $('table tbody').on('click', 'tr', me.oneClickEvent.bind(me));

        /**=====================================================================================================
         * validated bắt buộc nhập
         * CreatedBy: PDTAI (1/1/2021)
         * */
        $('.input-required').blur(me.validateInput);


        /**=====================================================================================================
        * validated email đúng định dạng
        * CreatedBy: PDTAI (1/1/2021)
        * */
        $('input[type="email"]').blur(me.validateEmail);
        $('#txtSearchCustomer').focus(function () {
             $('.txtsearch').addClass('border-green');
        })

        $('#txtSearchCustomer').blur(function () {
            var value = $(this).val();
            try {
                if (!value) {
                    $('.txtsearch').removeClass('border-green');
                }
            } catch {

            }
        })
    }

    search() {
        // Kiểm tra dữ liệu đã nhập nếu để trống thì cảnh báo
        var value = $(this).val();
        try {
            if (value) {
                $('.txtsearch').addClass('border-green');
            } else {
            }
        } catch (e) {
            console.log(e);
        }
    }
    /**=========================================================================================================
     * Load dữ liệu
     * CreatedBy: PDTAI (28/12/2020)
     * */
    loadData() {
        var me = this;
        try {
            $('table tbody').empty();
            // Lấy thông tin các cột dữ liệu
            var ths = $('table thead th');
            $('.loading').show();
            // Lấy dữ liệu từ database
            $.ajax({
                url: me.host + me.apiRouter + me.queryString,
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
                                td.addClass("text-center");
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
                                //td.addClass("text-center");
                                //var value = '<input type="checkbox"/>';
                                // 1 là nam , còn lại là nữ
                                // Nếu checkbox là checked thì là nam
                                if (obj[fieldName] == 1) {
                                    //var value = '<input type="checkbox" checked/>';
                                    value = "Nam";
                                } else if (obj[fieldName] == 0) {
                                    value = "Nữ";
                                } else {
                                    value = "Khác";
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
            }).fail(function (res) {
                // Chạy fail
                $('.loading').hide();
            })
        } catch (e) {
            // Ghi log lỗi
            console.log(e);
        }

    }


    /**=======================================================================================================
    * Thêm mới dữ liệu
    * CreatedBy: PTTAI (28/12/2020)
    * */
    btnAddOnClick() {
        var me = this;
        try {
            setEmptyValue();
            $('input[type="date"]').val('');
            $('input[id="male"]').attr("checked");
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

    /**=====================================================================================================================
    * Xử lý nút Save (sửa, lưu) dữ liệu
    * CreatedBy: PTTAI (28/12/2020)
    * */
    btnSaveOnClick() {
        var me = this;
        try {
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
                var propertyName = $(this).attr('fieldName');
                var value = '';
                if (propertyName == "CustomerGroupName") {
                    var propertyName1 = $(this).attr('fieldValue');
                    value = $(this).find(":selected").val();
                    entity[propertyName1] = value;
                } else {
                    value = $(this).val();//Lấy giá trị
                }

                //Format lại ngày tháng
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
            })
            console.log(entity);
            var method = "POST";
            if (me.FormMode == 'Edit') {
                method = "PUT";
                entity.CustomerId = me.recordId;
                var id = `/${entity.CustomerId}`;
            } else {
                id = '';
            }
            console.log(me.apiRouter);
            //Gọi service tương ứng thực hiện dữ liệu
            $.ajax({
                url: me.host + me.apiRouter + id,
                method: method,
                data: JSON.stringify(entity),
                contentType: 'application/json'
            }).done(function (res) {
                // Thông báo sau khi thành công
                toastSuccess();
                // Load lại dữ liệu
                me.loadData();
                // Ẩn dialog chi tiết
                $(".m-dialog").hide();

            }).fail(function (res) {
                // Thông báo fail
                toastFail();
                // Ẩn dialog chi tiết
                $(".m-dialog").hide();
            })

        } catch (e) {
            console.log(e);
        }

    }

    /**==============================================================================================================================
     * Xử lý sự kiện kích vào một bản ghi đổi màu background
     * @param {any} e: Sự kiện được gọi
     * CreatedBy: PTTAI (19/01/2021)
     */
    oneClickEvent(e) {
        if ($(e.currentTarget).find('td').attr('class') == 'selected') {
            $(e.currentTarget).find('td').removeClass('selected');
            console.log(this);
        } else {
            $('tr').find('td').removeClass('selected');
            $(e.currentTarget).find('td').addClass('selected');
        }   
        console.log(e);
    }

    /**===============================================================================================================================
     * Xử lý sự kiện kích đúp chuột vào một bản ghi hiển thị lại thông tin lên dialog
     * @param {any} e: Sự kiện được gọi
     * CreatedBy: PTTAI (28/12/2020)
     * */
    doubleClickEvent(e) {
        var me = this;
        try {
            $('tr').find('td').removeClass('selected');
            $(e.currentTarget).find('td').addClass('selected');
            me.FormMode = 'Edit';
            // Lấy khóa chính bản ghi
            var recordId = $(e.currentTarget).data('recordId');// Che giấu code dễ hơn
            me.recordId = recordId;

            //Gọi service lấy thông tin chi tiết hiển thị lại form qua Id
            $.ajax({
                url: me.host + me.apiRouter + `/${recordId}`,
                method: "GET"
            }).done(function (res) {
                // Binding dữ liệu lên form chi tiết
                console.table(res);
                //Lấy tất cả các control nhập liệu
                var inputs = $('input[fieldName], select[fieldName]');
                var entity = {};
                $.each(inputs, function (index, input) {
                    var propertyName = $(this).attr('fieldName');
                    var value = res[propertyName];
                    console.log(value);
                    //Check nhóm 
                    if (propertyName == "CustomerGroupName") {
                        var fieldValue1 = $(this).attr('fieldValue');
                        var groupId = res[fieldValue1];
                        console.log(groupId);
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
                                            if (obj[fieldValue] == groupId) {
                                                option = $(`<option value="${obj[fieldValue]}" selected = "selected">${obj[fieldName]}</option>`);
                                            } else {
                                                option = $(`<option value="${obj[fieldValue]}">${obj[fieldName]}</option>`);
                                            }
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

                    }
                    //Check ngày sinh
                    if (propertyName == "DateOfBirth") {
                        value = formatDate2(value);
                        $(this).attr('value', value);
                    }
                    //Check với trường hợp input là radio
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
        } catch (e) {
            console.log(e);
        }
    }



    /**===========================================================================================================================
     * Validate các trường bắt buộc nhập
     * CreatedBy: PTTAI (29/12/2020)
     * */
    validateInput() {
        // Kiểm tra dữ liệu đã nhập nếu để trống thì cảnh báo
        var value = $(this).val();
        try {
            if (!value) {
                $(this).addClass('border-red');
                $(this).attr('title', 'Trường này không được phép bỏ trống!');
                $(this).attr('validate', false);
            } else {
                $(this).removeClass('border-red');
                $(this).attr('validate', true);
            }
        } catch (e) {
            console.log(e);
        }
    }

    /**===========================================================================================================================
     * Validate các trường email đúng định dạng
     * CreatedBy: PTTAI (29/12/2020
     * */
    validateEmail() {
        var value = $(this).val();
        var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        try {
            if (!regex.test(value)) {
                $(this).addClass('border-red');
                $(this).attr('title', 'Email không đúng định dạng');
                $(this).attr('validate', false);
            } else {
                $(this).removeClass('border-red');
                $(this).attr('validate', true);
            }
        } catch (e) {
            console.log(e);
        }
    }

    /**=============================================================================================================================
     * Context menu kích chuột phải chọn một dòng tr để xóa bản ghi
     * CreatedBy: PDTAI (05/01/2021)
     * */
    contextMenu() {
        var me = this;
        var $contextMenu = $("#contextMenu");

        $("body").on("contextmenu", "table tr", function (e) {
            var me2 = this;
            console.log(me2);
            $contextMenu.css({
                display: "block",
                left: e.pageX,
                top: e.pageY
            })
            $('tr').find('td').removeClass('selected');
            $(e.currentTarget).find('td').addClass('selected');//Đánh dấu dòng được chọn
            var recordId = $(e.currentTarget).data('recordId');
            me.recordId = recordId;
            $('#btnDelete').on('click', function () {
                $('.popup').show();
                try {
                    $('#btnDelete2').on('click', function () {
                        $.ajax({
                            url: me.host + me.apiRouter + `/${recordId}`,
                            method: "DELETE",
                            async: true,

                        }).done(function (res) {
                            me.loadData();
                            $(".popup").hide();
                            toastSuccess();
                        }).fail(function (res) {
                            toastFail();
                            $(".popup").hide();
                        })
                    })
                } catch (e) {
                    console.log(e);
                }
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


/**=================================================
 * Phương thức xử lý làm trống các trường input
 * CreatedBy: PDTAI (05/01/2021)
 * */
function setEmptyValue() {
    $('input[type="text"]').val('');
    $('input[type="email"]').val('');
}

/**
 * Phương thức hiển thị toast thông báo thành công
 * CreatedBy: PDTAI (05/01/2021)
 * */
function toastSuccess() {
    var x = document.getElementById("snackbar");
    x.className = "show";
    // Gỡ toast sau 3s
    setTimeout(function () { x.className = x.className.replace("show", ""); }, 3000);
}

/**
 * Phương thức hiển thị toast thông báo thất bại
 * CreatedBy: PDTAI (05/01/2021)
 * */
function toastFail() {
    var x = document.getElementById("snackbar_fail");
    x.className = "show";
    // Gỡ toast sau 3s
    setTimeout(function () { x.className = x.className.replace("show", ""); }, 3000);
}