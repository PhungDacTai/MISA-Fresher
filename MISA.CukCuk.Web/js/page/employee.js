$(document).ready(function () {
    new EmployeeJS();
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

    /**
    * Set đường dẫn lấy database
    * CreatedBy: PDTAI (28/12/2020)
    * */
    setDataUrl() {
        this.getDataUrl = "http://api.manhnv.net/api/employees";
    }
}
