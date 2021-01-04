$(document).ready(function () {
    new CustomerJS();

    //dialog = $(".m-dialog").dialog({
    //    autoOpen: false,
    //    fluid: true,
    //    minWidth: 700,
    //    resizable: true,
    //    positon: ({ my: "center", at: "center", of: window }),
    //    modal: true,
    //});

    $(".m-dialog").hide();//Sự kiện ẩn dialog


})

/**
 * Class kế thừa class BaseJS
 * CreatedBy: PDTAI (28/12/2020)
 * */
class CustomerJS extends BaseJS {
    constructor() {
        super();
    }

    setApiRouter() {
        this.apiRouter = "/api/customers";
    }
}
