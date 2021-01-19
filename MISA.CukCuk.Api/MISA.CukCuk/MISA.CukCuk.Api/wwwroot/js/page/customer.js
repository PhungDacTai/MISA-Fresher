﻿$(document).ready(function () {
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
    $(".popup").hide();//Sự kiện ẩn popup xóa



})

/**
 * Class kế thừa class BaseJS
 * CreatedBy: PDTAI (28/12/2020)
 * */
class CustomerJS extends BaseJS {
    constructor() {
        super();
    }

    initEvents() {
        var me = this;
        super.initEvents();

        $('#txtSearchCustomer').keypress(function (event) {
            var keycode = (event.keyCode ? event.keyCode : event.which);
            if (keycode == '13') {
                me.setQueryString();
                me.loadData();
                debugger;
            }
        })
    }

    setQueryString() {
        // Lấy thông tin ở input tìm kiếm
        var inputText = $('#txtSearchCustomer').val().trim();
        if (inputText != '') {
            this.queryString = "/filter?specs=" + inputText;
        } else {
            this.queryString = '';
        }

    }

    setApiRouter() {
        //this.apiRouter = "/api/customers";
        this.apiRouter = "/api/v1/customers";
    }
}
