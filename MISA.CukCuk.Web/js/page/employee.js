$(document).ready(function () {
    new EmployeeJS();
})

class EmployeeJS extends BaseJS {
    constructor() {
        //this.loadData();
        super();
    }

    setDataUrl() {
        this.getDataUrl = "http://api.manhnv.net/api/employees";
    }
    /**
     * Load dữ liệu
     * CreatedBy: PDTAI (28/12/2020)
     * */
    //loadData() {
        //Lấy dữ liệu 
        //$.ajax({
        //    url: "http://api.manhnv.net/api/employees",
        //    method: "GET",
        //}).done(function (res) {
        //    //Chạy đúng
        //    var data = res;
        //    $.each(data, function (index, item) {
        //        var dateOfBirth = item['DateOfBirth'];
        //        dateOfBirth = formatDate(dateOfBirth);
        //        var salary = item['Salary'];
        //        salary = formatMoney(salary);
        //        var checkbox = '<input type="checkbox"/>';
        //        if (item.Gender > 0) {
        //            var checkbox = '<input type="checkbox" checked/>';
        //        }
        //        // Binding dl lên tabl
        //        var tr = $(`<tr>
        //                    <td>`+ item.EmployeeCode + `</td>
        //                    <td>`+ item['FullName'] + `</td>
        //                    <td><div class="text-center">`+ checkbox + `</div></td>
        //                    <td><div class="text-center">`+ dateOfBirth + `</div></td>
        //                    <td>`+ item['PhoneNumber'] + `</td>
        //                    <td>`+ item['Email'] + `</td>
        //                    <td>`+ item['PositionName'] + `</td>
        //                    <td>`+ item['Departmentname'] + `</td>
        //                    <td><div class="text-right">`+ salary + `</div></td>
        //                    <td style="max-width:215px" title="`+ item['Address'] + `"><span style="width:215px">` + item['Address'] + `</span></td>
        //                    <td>`+ item['WorkStatusName'] + `</td>
        //                </tr>`);
        //        $('table tbody').append(tr);
        //        debugger;
        //    })


        //}).fail(function (res) {
        //    //Chạy fail
        //})
    //}

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
