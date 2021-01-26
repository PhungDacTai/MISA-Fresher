$(document).ready(function () {
    var employee = new EmployeeJS();
    $(".m-dialog").hide();//Sự kiện ẩn dialog
    $("#popup").hide();//Sự kiện ẩn popup xóa bản ghi
    $("#popup-promt").hide();//Sự kiện ẩn popup nhắc nhở đóng form
    $(".not-find").hide();// Ẩn thông báo không tìm thấy bản ghi
    $(".check-infor").hide();//Ẩn thông báo trùng mã
    $(".check-email").hide();//Ẩn thông báo trùng email
    $(".check-identify-card").hide();//Ẩn thông báo trùng CMTND/ Căn cước
    $(".check-phone").hide();//Ẩn thông báo trùng số điện thoại
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
    $("#txtSearchEmployee").blur(function () {
        $('.search-box').removeClass('border-green');
    })

    //Ẩn các thông báo validate khi nhấn phím
    $("#txtEmployeeCode").keypress(function () {
        $(".check-infor").hide();
    });
    $("#txtEmployeeEmail").keypress(function () {
        $(".check-email").hide();
    })
    $("#txtPhoneNumber").keypress(function () {
        $(".check-phone").hide();
    })
    $("#txtIdentifyCardNumber").keypress(function () {
        $(".check-identify-card").hide();
    })
    $(".check-email").removeAttr('style');

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

    clickClose() {

    }
}
