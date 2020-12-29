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
            // Lấy thông tin các cột dữ liệu
            var ths = $('table thead th');
            var getDataUrl = this.getDataUrl;

            // Lấy dữ liệu 
            $.ajax({
                url: getDataUrl,
                method: "GET",
            }).done(function (res) {
                // Chạy đúng
                //td.attr('title',obj[fieldName]);
                $.each(res, function (index, obj) {
                    var tr = $(`<tr></tr>`);
                    //Lấy thông tin dữ liệu sẽ map tương ứng với các cột
                    $.each(ths, function (index, th) {

                        var td = $(`<td><div><span></span></div></td>`);
                        var fieldName = $(th).attr('fieldName');//Lấy giá trị attribute fieldname
                        var value = obj[fieldName];//Lấy giá trị của đối tượng

                        var formatType = $(th).attr('formatType');//Lấy giá trị attribute formatType
                        switch (formatType) {
                            case "ddmmyy":
                                td.addClass("text-center");//Add class vào td
                                value = formatDate(value);// Gọi hàm định dạng ngày từ common.js
                                break;
                            case "Money":
                                td.addClass("text-right");
                                value = formatMoney(value);// Gọi hàm định dạng tiền tệ từ common.js
                                break;
                            case "FormatAddress":
                                td.addClass("overflow");
                               
                                break;
                            case "Gender":
                                td.addClass("text-center");
                                var checkbox = '<input type="checkbox"/>';
                                // 1 là nam , còn lại là nữ
                                // Nếu checkbox là checked thì là nam
                                if (obj[fieldName] == 1) { 
                                    var checkbox = '<input type="checkbox" checked/>';
                                }
                                td.append(checkbox);
                                break;
                            default:
                                break;
                        }
                        td.append(value);
                        $(tr).append(td);
                    })


                    $('table tbody').append(tr);
                })
                // Binding dl lên table

            }).fail(function (res) {
                // Chạy fail
            })
        } catch (e) {
            // Ghi log lỗi
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