$(document).ready(function () {
<<<<<<< HEAD
    var employee = new EmployeeJS();
    $(".m-dialog").hide();//Sự kiện ẩn dialog
    $("#popup").hide();//Sự kiện ẩn popup xóa bản ghi
    $("#popup-promt").hide();//Sự kiện ẩn popup nhắc nhở đóng form
=======
    new EmployeeJS();
    $(".m-dialog").hide();//Sự kiện ẩn dialog
    $(".popup").hide();//Sự kiện ẩn popup xóa
    $(".popup-promt").hide();//Sự kiện ẩn popup xóa
>>>>>>> 7a8b0b39b2c7cb7445f9fa576460bd412f817fbd
    $(".not-find").hide();// Ẩn thông báo không tìm thấy bản ghi
    $(".check-infor").hide();//Ẩn thông báo trùng mã
    $(".check-email").hide();//Ẩn thông báo trùng email
    $(".check-identify-card").hide();//Ẩn thông báo trùng CMTND/ Căn cước
    $(".check-phone").hide();//Ẩn thông báo trùng số điện thoại
<<<<<<< HEAD
    $("#popup-refuse").hide();// Ẩn popup dạng list

    //Add class khi focus
    $("#txtSalary").focus(function () {
        $(".salary").addClass('border-green');
    })
    $("#txtSearchEmployee").focus(function () {
        $('.search-box').addClass('border-green');
    })
    //Remove class khi blur
    $("#txtSalary").blur(function () {
        $(".salary").removeClass('border-green');
    })
=======
    $("#txtSalary").focus(function () {
        $(".salary").addClass('border-green');
    })
    $("#txtSalary").blur(function () {
        $(".salary").removeClass('border-green');
    })

    $("#txtSearchEmployee").focus(function () {
        $('.search-box').addClass('border-green');
    })
>>>>>>> 7a8b0b39b2c7cb7445f9fa576460bd412f817fbd
    $("#txtSearchEmployee").blur(function () {
        $('.search-box').removeClass('border-green');
    })

<<<<<<< HEAD
    //Ẩn các thông báo validate khi nhấn phím
    $("#txtEmployeeCode").keypress(function () {
        $(".check-infor").hide();
    });
=======
    $("#txtEmployeeCode").keypress(function () {
        $(".check-infor").hide();
    });

    $(".check-email").removeAttr('style');

>>>>>>> 7a8b0b39b2c7cb7445f9fa576460bd412f817fbd
    $("#txtEmployeeEmail").keypress(function () {
        $(".check-email").hide();
    })
    $("#txtPhoneNumber").keypress(function () {
        $(".check-phone").hide();
<<<<<<< HEAD
    })
    $("#txtIdentifyCardNumber").keypress(function () {
        $(".check-identify-card").hide();
    })
    $(".check-email").removeAttr('style');
=======
    })
    $("#txtIdentifyCardNumber").keypress(function () {
        $(".check-identify-card").hide();
    })

>>>>>>> 7a8b0b39b2c7cb7445f9fa576460bd412f817fbd

})

/**
 * Class kế thừa class BaseJS
 * CreatedBy: PDTAI (28/12/2020)
 * */
class EmployeeJS extends BaseJS {
    constructor() {
        //this.loadData();
        super();
    }
<<<<<<< HEAD

    initEvents() {

    }
=======

    initEvents() {
        var me = this;
        super.initEvents();
        //Sự kiện bấm enter tìm kiếm
        $('#txtSearchEmployee').keypress(function (event) {
            var keycode = (event.keyCode ? event.keyCode : event.which);
            if (keycode == '13') {
                me.setQueryString();
                me.loadData();
            }

        })
    }

>>>>>>> 7a8b0b39b2c7cb7445f9fa576460bd412f817fbd
    setQueryString() {
        // Lấy thông tin ở input tìm kiếm
        debugger;
        var inputText = $('#txtSearchEmployee').val().trim();
        var departmentId = $('#selectDepartment').find(":selected").val();
        var positionId = $('#selectPosition').find(":selected").val();
        this.queryString = "/filter?specs=" + inputText + "&departmentId=" + departmentId + "&positionId=" + positionId;
    }

    setObject() {
        this.object = "Employee";
    }

    setApiRouter() {
        this.apiRouter = "/api/v1/employees";
    }

    setPropertyCode() {
        this.propertyCode = "Mã nhân viên";
    }

<<<<<<< HEAD
    clickClose() {

    }
=======
>>>>>>> 7a8b0b39b2c7cb7445f9fa576460bd412f817fbd
}
