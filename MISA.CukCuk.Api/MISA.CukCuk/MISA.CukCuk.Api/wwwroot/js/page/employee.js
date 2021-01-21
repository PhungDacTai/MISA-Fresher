$(document).ready(function () {
    var emplpoyee = new EmployeeJS();
    //var select2 = $('select[index2]');
    //emplpoyee.comboBox(select2);
    //var select3 = $('select[index3]');
    //emplpoyee.comboBox(select3);
    $(".m-dialog").hide();//Sự kiện ẩn dialog

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
