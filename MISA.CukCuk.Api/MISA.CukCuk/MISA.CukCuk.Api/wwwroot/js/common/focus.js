$(document).ready(function () {
    $("#btnAddEmployee").click(function () {
        $("#txtEmployeeCode").focus();
    });

    $('table tbody').on('dblclick', 'tr', function () {
        $("#txtEmployeeCode").focus();
    });
});
