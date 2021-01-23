$(document).ready(function () {
    var emplpoyee = new EmployeeJS();
    var selectDepartment = $('select[index-2]');
    emplpoyee.comboBox(selectDepartment);
    var selectPosition = $('select[index-3]');
    emplpoyee.comboBox(selectPosition);


    $(".m-dialog").hide();//Sự kiện ẩn dialog
    $(".popup").hide();//Sự kiện ẩn popup xóa
    $("#txtSalary").focus(function(){
        $(".salary").addClass('border-green');
    })
    $("#txtSalary").blur(function () {
        $(".salary").removeClass('border-green');
    })

    $("#txtSearchEmployee").focus(function (){
        $('.search-box').addClass('border-green');
    })
    $("#txtSearchEmployee").blur(function (){
        $('.search-box').removeClass('border-green');
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

    setObject() {
        this.object = "Employee";
    }

    setApiRouter() {
        this.apiRouter = "/api/v1/employees";
    }

}
