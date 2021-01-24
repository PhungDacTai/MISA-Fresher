$(document).ready(function () {
    new EmployeeJS();
    $(".m-dialog").hide();//Sự kiện ẩn dialog
    $(".popup").hide();//Sự kiện ẩn popup xóa
    $(".popup-promt").hide();//Sự kiện ẩn popup xóa
    $(".not-find").hide();// Ẩn thông báo không tìm thấy bản ghi
    $(".check-infor").hide();//Ẩn thông báo trùng mã
    $(".check-email").hide();//Ẩn thông báo trùng email
    $(".check-identify-card").hide();//Ẩn thông báo trùng CMTND/ Căn cước
    $(".check-phone").hide();//Ẩn thông báo trùng số điện thoại
    $("#txtSalary").focus(function () {
        $(".salary").addClass('border-green');
    })
    $("#txtSalary").blur(function () {
        $(".salary").removeClass('border-green');
    })

    $("#txtSearchEmployee").focus(function () {
        $('.search-box').addClass('border-green');
    })
    $("#txtSearchEmployee").blur(function () {
        $('.search-box').removeClass('border-green');
    })

    $("#txtEmployeeCode").keypress(function () {
        $(".check-infor").hide();
    });

    $(".check-email").removeAttr('style');

    $("#txtEmployeeEmail").keypress(function () {
        $(".check-email").hide();
    })
    $("#txtPhoneNumber").keypress(function () {
        $(".check-phone").hide();
    })
    $("#txtIdentifyCardNumber").keypress(function () {
        $(".check-identify-card").hide();
    })


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

}
