/**<3 <3 <3 <3 <3
 * Định dạng dữ liệu ngày tháng sang ngày/tháng /năm
 * @param {any} date tham số dữ liệu ngày tháng/kiểu dữ liệu bất kỳ
 * CreatedBy: PDTAI (25/12/2020)
 */
function formatDate(date) {
    var date = new Date(date);
    if (Number.isNaN(date.getTime())) {
        return "";
    }

    else {
        var day = date.getDate(), month = date.getMonth() + 1, year = date.getFullYear();
        if (day < 10) {
            day = '0' + day;
        }

        //day = day<10?'0' + day:day;
        if (month < 10) {
            month = '0' + month;
        }

        return day + '/' + month + '/' + year;
    }
}

/**
 * Định dạng ngày tháng mm/dd/yy
 * 
 * @param {any} date
 */
function formatDate2(date) {
    var date = new Date(date);
    if (Number.isNaN(date.getTime())) {
        return "";
    }

    else {
        var day = date.getDate(), month = date.getMonth() + 1, year = date.getFullYear();
        if (day < 10) {
            day = '0' + day;
        }

        //day = day<10?'0' + day:day;
        if (month < 10) {
            month = '0' + month;
        }

        return year + '/' + month + '/' + day  ;
    }
}

/**
 * Hàm định  dạng tiền 
 * @param {any} money Số tiền
 * CreatedBy: PDTAI (25/12/2020)
 */
function formatMoney(money) {
    if (money) {
        return money.toFixed(0).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.");
    }
    return "";
}