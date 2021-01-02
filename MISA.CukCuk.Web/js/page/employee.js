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

    setApiRouter() {
        this.apiRouter = "/api/employees";
    }

}
