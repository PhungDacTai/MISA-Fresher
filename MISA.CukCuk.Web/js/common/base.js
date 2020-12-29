class BaseJS {
    constructor() {
        this.getDataUrl = null;
        this.setDataUrl();
        this.loadData();
    }

    /**
     * Set đường dẫn database
     * */
    setDataUrl() {

    }
    /**
     * Load dữ liệu
     * CreatedBy: PDTAI (28/12/2020)
     * */
    loadData() {

        try {
            //Lấy thông tin các cột dữ liệu
            var ths = $('table thead th');
            var getDataUrl = this.getDataUrl;

            //lấy dữ liệu 
            $.ajax({
                url: getDataUrl,
                method: "GET",
            }).done(function (res) {
                //chạy đúng
                $.each(res, function (index, obj) {
                    var tr = $(`<tr></tr>`);
                    //Lấy thông tin dữ liệu sẽ map tương ứng với các cột
                    $.each(ths, function (index, th) {
                        var td = $(`<td><div><span></span></div></td>`);
                        var fieldName = $(th).attr('fieldname');
                        var value = obj[fieldName];//Lấy giá trị của đối tượng
                        var formatType = $(th).attr('formatType');
                        switch (formatType) {
                            case "ddmmyy":
                                td.addClass("text-center");
                                value = formatDate(value);
                                break;
                            case "Money":
                                td.addClass("text-right");
                                value = formatMoney(value);
                                break;
                            default:
                                break;
                        }

                        td.append(value);
                        $(tr).append(td);
                    })


                    $('table tbody').append(tr);
                })
                // binding dl lên table

            }).fail(function (res) {
                //chạy fail
            })
        } catch (e) {
            //Ghi log lỗi
            console.log(e);
        }

    }


    /**
    * Thêm mới dữ liệu
    * CreatedBy: PTTAI (28/12/2020)
    * */
    add() {

    }

    /**
    * Sửa dữ liệu
    * CreatedBy: PTTAI (28/12/2020)
    * */
    edit() {

    }

}