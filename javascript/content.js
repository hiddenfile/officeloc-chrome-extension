$(function(){
    //hot fix form
    $("#timesheet-form").attr('method','GET')
})
function show_members(team){
    chrome.extension.sendRequest({method: "get_team", id: team}, function(response) {
        $('table.items td:first-child').each(function(key,value) {
            if (response.data.indexOf($(value).html()) < 0){
                $(value).parent('tr').first().remove()
            }
        });
    });
    return true
};
function reloads(){
    window.location.reload(true)
};
