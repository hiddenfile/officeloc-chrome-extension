$(function(){
    //hot fix form
    $("#timesheet-form").attr('method','GET')
})
function show_members(){
    var members = ['Долгих Максим', 'Дзизенко Иван']
    $('table.items td:first-child').each(function(key,value) {
        if (members.indexOf($(value).html()) < 0){
            $(value).parent('tr').first().remove()
        }
    });
};
function reloads(){
    window.location.reload(true)
};
