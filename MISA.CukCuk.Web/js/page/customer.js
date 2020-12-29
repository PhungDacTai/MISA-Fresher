$(document).ready(function () {
    new CustomerJS();
})

/**
 * Class kế thừa class BaseJS
 * CreatedBy: PDTAI (28/12/2020)
 * */
class CustomerJS extends BaseJS {
    constructor() {
        super();
    }

    /**
     * Set đường dẫn lấy database
     * CreatedBy: PDTAI (28/12/2020)
     * */
    setDataUrl() {
        this.getDataUrl = "http://api.manhnv.net/api/customers";
    }
}
