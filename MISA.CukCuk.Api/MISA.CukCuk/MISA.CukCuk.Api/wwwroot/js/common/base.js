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
        this.object = null;
        this.setObject();
        this.propertyCode = '';
        this.setPropertyCode();
    }
    /**
     * Hàm set câu truy vấn để lọc dữ liệu
     * CreatedBy: PDTAI (22/01/2021)
     * */
    setQueryString() {

    }

    /**
    * Hàm lấy địa chỉ router
    * CreatedBy: PDTAI (18/01/2021)
    * */
    setApiRouter() {

    }

    /**
    * Hàm set thuộc tính mã để so sánh trùng lặp
    * CreatedBy: PDTAI (24/01/2021)
    * */
    setPropertyCode() {

    }

    /**
    * Hàm lấy ra đối tượng thực thi (Employee, Customer)
    * CreatedBy: PDTAI (22/01/2021)
    * */
    setObject() {

    }

    /**
     * Khởi tạo sự kiện các button
     * CredtedBy: PDTAI (29/12/2020)
     * */
    initEvents() {
        var me = this;
        // Sự kiên click khi nhấn thêm mới ===========================================================================================
        $('#btnAddCustomer').on('click', me.btnAddOnClick.bind(me));
        $('#btnAddEmployee').on('click', me.btnAddOnClick.bind(me));

        // Các sự kiện click để đóng form, popup======================================================================================
        // Sự kiên khi click close, hủy để hiển thị popup cảnh báo đóng form thông tin 
        $('#btnCloseDialog').on('click', function () {
            $("#popup-promt").show();
        })
        $('#btnCancelDialog').on('click', function () {
            $("#popup-promt").show();

        })
        // Enter vào nút hủy
        $('#btnCancelDialog').keypress(function (event) {
            var keycode = (event.keyCode ? event.keyCode : event.which);
            if (keycode == '13') {
                $("#popup-promt").show();
            }
        })

        //Sự kiện click để đóng popup cảnh báo đóng form thông tin
        $('#btnClosePromt').on('click', function () {
            $("#popup-promt").hide();
        })
        $('#btnCancelPromt').on('click', function () {
            $("#popup-promt").hide();
        })

        //Sự kiên click đóng popup cảnh báo xóa
        $('#btnClosePopupDelete').on('click', function () {
            $("#popup").hide();
        })
        $('#btnCancelPopupDelete').on('click', function () {
            $("#popup").hide();

        })

        // Sự kiện click nút "Đóng" đóng popup cảnh cáo và dialog
        $('#btnClosePromtDialog').on('click', function () {
            $("#popup-promt").hide();
            $(".m-dialog").hide();
        })

        //Sự kiện đóng popup dạng list
        $('#btnCloseRefuse-2').on('click', function () {
            $("#popup-refuse").hide();
        })
        $('#btnCloseRefuse').on('click', function () {
            $("#popup-refuse").hide();
        })



        // Load lại dữ liệu khi nhấn button load =====================================================================================
        $('#btnRefresh').on('click', function () {
            me.loadData();
        })

        // Thực hiện lưu dữ liệu khi nhấn button ['Lưu']hoặc nhấn enter ==============================================================
        $('#btnSaveDialog').on('click', me.btnSaveOnClick.bind(me));

        $('#btnSaveDialog').keypress(function (event) {
            var keycode = (event.keyCode ? event.keyCode : event.which);
            if (keycode == '13') {
                me.btnSaveOnClick();
            }

        })

        //Hiển thị thông tin chi tiết khi đúp chuột chọn một bản ghi trên danh sách dữ liệu===========================================
        $('table tbody').on('dblclick', 'tr', me.doubleClickEvent.bind(me));


        //Tô màu bản ghi được chọn khi click chuột====================================================================================
        $('table tbody').on('click', 'tr', me.oneClickEvent.bind(me));


        /**===========================================================================================================================
         * validated bắt buộc nhập
         * CreatedBy: PDTAI (01/01/2021)
         * */
        $('.input-required').blur(me.validateInput);


        /**===========================================================================================================================
        * validated email đúng định dạng
        * CreatedBy: PDTAI (01/01/2021)
        * */
        $('input[type="email"]').blur(me.validateEmail);

    }

    /**===============================================================================================================================
     * Kiểm tra thẻ input tìm kiếm có giá trị thì đổ màu border
     * CreatedBy: PDTAI(20/02/2021)
     * */
    search() {
        var value = $(this).val();
        try {
            if (value) {
                $('.search-text').addClass('border-green');
            } else {
            }
        } catch (e) {
            console.log(e);
        }
    }
    /**===============================================================================================================================
     * Xử lý load dữ liệu
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
                  // ajax Chạy đúng
                if (res.length == 0) {
                    $('.loading').hide();
                    $(".not-find").show();//Hiển thị nội dung không tìm thấy bản ghi nào
                } else {
                    $(".not-find").hide();
                }

                $.each(res, function (index, obj) {
                    var tr = $(`<tr></tr>`);
                    if (me.object == "Customer")
                        $(tr).data('recordId', obj.CustomerId);
                    else
                        $(tr).data('recordId', obj.EmployeeId);
                    //Lấy thông tin dữ liệu sẽ map tương ứng với các cột
                    $.each(ths, function (index, th) {
                        var td = $(`<td><div><span></span></div></td>`);
                        var fieldName = $(th).attr('fieldName');//Lấy giá trị attribute fieldname
                        var value = obj[fieldName];//Lấy giá trị của đối tượng
                        var formatType = $(th).attr('formatType');//Lấy giá trị attribute formatType
                        // Định dạng các trường
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
                                // 1 là nam , 0 là nữ, còn lại là khác
                                if (obj[fieldName] == 1) {
                                    //var value = '<input type="checkbox" checked/>';
                                    value = "Nam";
                                } else if (obj[fieldName] == 0) {
                                    value = "Nữ";
                                } else {
                                    value = "Khác";
                                }
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
                // ajax chạy fail
                $('.loading').hide();
            })
        } catch (e) {
            // Ghi log lỗi
            console.log(e);
        }

    }


    /**===============================================================================================================================
    * Xử khi khi bấm nút thêm
    * CreatedBy: PTTAI (28/12/2020)
    * */
    btnAddOnClick() {
        var me = this;
        $(".check-email").hide();
        $(".not-find").hide();
        try {
            setEmptyValue();
            $('input[type="date"]').val('');
            $('input[id="male"]').attr("checked");
            me.FormMode = 'Add';
            //Lấy mã lớn nhất
            $.ajax({
                url: me.host + me.apiRouter + "/getcode",
                method: "GET",
                async: true,
            }).done(function (res) {
                var objectCode = me.object + "Code";//Lấy mã của đối tượng
                var txtInput = "txt" + objectCode;
                objectCode = res[objectCode];
                var objectFirt = objectCode.slice(0, 2);//Tách mã thành chữ và số
                objectCode = objectCode.slice(2);
                objectCode = parseInt(objectCode) + 1;
                objectCode = objectFirt + objectCode;
                $('input[id=\"' + txtInput + '\"]').val(objectCode);//Gán mã cho thẻ input mã
            }).fail(function (res) {

            })
            // Hiển thị dialog thông tin chi tiết
            $(".m-dialog").show();
            // Load dữ liệu cho combobox
            var selectPosition = $('select[index]');
            selectPosition.empty();
            me.comboBox(selectPosition);
            var selectDepartment = $('select[index-1]');
            selectDepartment.empty();
            me.comboBox(selectDepartment);

        } catch (e) {
            console.log(e);
        }

    }

    /**===============================================================================================================================
    * Xử lý nút Save (sửa, lưu) dữ liệu
    * CreatedBy: PTTAI (28/12/2020)
    * */
    btnSaveOnClick() {
        var me = this;
        try {
            // Validated dữ liệu
            $(".check-email").hide();
            $("#refuseStatus div").remove();
            var inputValidates = $('.input-required, input[type="email"]');
            $.each(inputValidates, function (index, input) {
                $(input).trigger('blur');// Trigger: Thực hiện tất cả các xử lý và đính kèm các loại sự kiện nhất định tới thành phần được chọn
            })

            var inputNotVlidates = $('input[validate="false"]');
            if (inputNotVlidates && inputNotVlidates.length > 0) {
                var messenger = $(``);
                if ($('#txtFullName').val() == '') {
                    messenger = $(`<div><i class="fas fa-exclamation-triangle"></i> &nbsp;&nbsp;&nbsp;<label>Họ và tên không được để trống</div>`);
                    $("#refuseStatus").append(messenger);
                }
                if ($('#txtIdentifyCardNumber').val() == '') {
                    messenger = $(`<div><i class="fas fa-exclamation-triangle"></i> &nbsp;&nbsp;&nbsp;<label>Số CMTND/ Căn cước không được để trống</div>`);
                    $("#refuseStatus").append(messenger);
                }
                if ($('#txtEmployeeEmail').val() == '') {
                    messenger = $(`<div><i class="fas fa-exclamation-triangle"></i> &nbsp;&nbsp;&nbsp;<label>Email không được để trống</div>`);
                    $("#refuseStatus").append(messenger);
                }
                if ($('#txtPhoneNumber').val() == '') {
                    messenger = $(`<div><i class="fas fa-exclamation-triangle"></i> &nbsp;&nbsp;&nbsp;<label>Số điện thoại không được để trống</div>`);
                    $("#refuseStatus").append(messenger);
                }

                //alert("Các trường có dấu (*) không được để trống hoặc dữ liệu không hợp lệ, vui lòng kiểm tra lại!");
                $("#popup-refuse").show();
                toastFail();
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
                // Lấy giá trị được chọn trong selectbox
                if (propertyName == "CustomerGroupName" || propertyName == "PositionName" || propertyName == "DepartmentName") {
                    var propertyName1 = $(this).attr('fieldValue');
                    value = $(this).find(":selected").val();
                    entity[propertyName1] = value;
                } else {
                    value = $(this).val();//Lấy giá trị
                }

                //Chuyển tiền tệ sang số
                if (propertyName == "Salary") {
                    value = value.split(',').join('');
                    value = value.split('.').join('');
                    value = parseInt(value);
                }

                //Format lại ngày tháng
                if (propertyName == "DateOfBirth" || propertyName == "DateOfJoin" || propertyName == "IssuedDate") {
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
            var method = "POST";
            if (me.FormMode == 'Edit') {
                method = "PUT";
                // Lấy đối tượng thực thi
                if (me.object == "Customer") {
                    entity.CustomerId = me.recordId;
                    var id = `/${entity.CustomerId}`;
                }
                else {
                    //Đối tượng Employee
                    entity.EmployeeId = me.recordId;
                    var id = `/${entity.EmployeeId}`;
                }
            } else {
                id = '';
            }

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
                // Thông báo khi fail
                var messenger = res.responseText.split(',');
                messenger = messenger[0].slice(10, messenger[0].length - 2);
                var value = res.responseJSON.ObjectName;
                switch (value) {
                    case me.propertyCode:
                        $(".check-infor").show();
                        toastFail();
                        $("#txtEmployeeCode").focus();
                        break;
                    case "Email":
                        $(".check-email").show();
                        toastFail();
                        $("#txtEmployeeEmail").focus();
                        break;
                    case "Số điện thoại":
                        $(".check-phone").show();
                        toastFail();
                        $("#txtPhoneNumber").focus();
                        break;
                    case "Số CMTND/ Căn cước":
                        $(".check-identify-card").show();
                        toastFail();
                        $("#txtIdentifyCardNumber").focus();
                        break;
                    default:
                        //Ẩn dialog chi tiết
                        $(".m-dialog").hide();
                        toastFail();
                        break;
                }
            })

        } catch (e) {
            console.log(e);
        }

    }

    /**===============================================================================================================================
     * Xử lý sự kiện kích vào một bản ghi đổi màu background
     * @param {any} e: Sự kiện được gọi
     * CreatedBy: PTTAI (19/01/2021)
     */
    oneClickEvent(e) {
        if ($(e.currentTarget).find('td').attr('class') == 'selected') {
            $(e.currentTarget).find('td').removeClass('selected');
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
        $(".check-email").hide();
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
                //Lấy tất cả các control nhập liệu
                var inputs = $('input[fieldName], select[fieldName]');
                var entity = {};
                $.each(inputs, function (index, input) {
                    var propertyName = $(this).attr('fieldName');
                    var value = res[propertyName];
                    console.log(value);
                    //Check nhóm (các combobox)
                    var select = $('');
                    switch (propertyName) {
                        case "CustomerGroupName": case "PositionName":
                            select = $('select[index]');
                            break;
                        case "DepartmentName":
                            select = $('select[index-1]');
                            break;
                        default:

                    }
                    var fieldValue1 = $(this).attr('fieldValue');
                    var groupId = res[fieldValue1];
                    select.empty();
                    $.each(select, function (index, value) {
                        // Lấy dữ liệu nhóm khách hàng, hiển thị lại giá trị lên combobox
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
                                        var option = $(``);
                                        if (obj[fieldValue] == groupId) {
                                            option = $(`<option value="${obj[fieldValue]}" selected = "selected">${obj[fieldName]}</option>`);
                                        } else {
                                            option = $(`<option value="${obj[fieldValue]}">${obj[fieldName]}</option>`);
                                        }
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


                    // Check tiền tệ
                    if (propertyName == "Salary") {
                        value = formatMoney(value);
                        $(this).attr('value', value);
                    }

                    //Check ngày tháng
                    if (propertyName == "DateOfBirth" || propertyName == "DateOfJoin" || propertyName == "IssuedDate") {
                        value = formatDate2(value);
                        $(this).attr('value', value);
                    }
                    //Check với trường hợp input là radio, check giới tính
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



    /**===============================================================================================================================
     * Validate các trường bắt buộc nhập
     * CreatedBy: PTTAI (29/12/2020)
     * */
    validateInput() {
        // Kiểm tra dữ liệu đã nhập nếu để trống thì cảnh báo
        var value = $(this).val();
        try {
            if (!value) {
                $(this).addClass('border-red');
                $(this).attr('title', 'Trường này không được phép để trống');
                $(this).attr('validate', false);
            } else {
                $(this).removeClass('border-red');
                $(this).attr('validate', true);
            }

        } catch (e) {
            console.log(e);
        }
    }

    /**===============================================================================================================================
     * Validate các trường email đúng định dạng
     * CreatedBy: PTTAI (29/12/2020
     * */
    validateEmail() {
        var value = $(this).val();
        var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        try {
            if (!regex.test(value)) {
                $(this).addClass('border-red');
                $(".check-email").show();
                $(".check-email").focus();
                $(this).attr('validate', false);
            } else {
                $(this).removeClass('border-red');
                $(this).attr('validate', true);
            }
        } catch (e) {
            console.log(e);
        }
    }

    /**===============================================================================================================================
     * Context menu kích chuột phải chọn một dòng tr để xóa bản ghi
     * CreatedBy: PDTAI (05/01/2021)
     * */
    contextMenu() {
        var me = this;
        var $contextMenu = $("#contextMenu");
        var objectCode = '';
        var messenger = '';
        $('#question-delete').empty();
        $("body").on("contextmenu", "table tr", function (e) {
            $contextMenu.css({
                display: "block",
                left: e.pageX,
                top: e.pageY
            })
            $('tr').find('td').removeClass('selected');
            $(e.currentTarget).find('td').addClass('selected');//Đánh dấu dòng được chọn
            var recordId = $(e.currentTarget).data('recordId');
            me.recordId = recordId;
            $.ajax({
                url: me.host + me.apiRouter + `/${recordId}`,
                method: "GET",
                async: true,

            }).done(function (res) {
                $('#question-delete').empty();
                objectCode = me.object + "Code";
                objectCode = res[objectCode];
            }).fail(function (res) {

            })
            $('#btnDelete').on('click', function () {
                messenger = $(`<label>Bạn có chắc chắn muốn xóa nhân viên ${objectCode} không?</label>`);
                $('#question-delete').append(messenger);
                $('#popup').show();
                try {
                    $('#btnDeleteYes').on('click', function () {
                        $.ajax({
                            url: me.host + me.apiRouter + `/${recordId}`,
                            method: "DELETE",
                            async: true,

                        }).done(function (res) {
                            me.loadData();
                            $('#question-delete').remove(messenger);
                            $("#popup").hide();

                            toastSuccess();
                        }).fail(function (res) {
                            toastFail();
                            $("#popup").hide();
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

    /**
     * xử lý đổ dữ liệu lên các combobox =============================================================================================
     * @param {any} select thể select truyền vào
     * CreatedBy: PDTAI(20/02/2021)
     */
    comboBox(select) {
        var me = this;
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
                            var option = $(`<option height="40px" value="${obj[fieldValue]}">${obj[fieldName]}</option>`);
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
    }
}



