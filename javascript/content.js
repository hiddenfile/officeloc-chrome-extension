$(function () {
    //hot fix form
    $("#timesheet-form").attr('method', 'GET')
})
function show_members(team) {
    chrome.extension.sendRequest({method: "get_team", id: team}, function (response) {

        $('table.items tr').show()
        $('table.items tr.odd td:first-child').each(function (key, value) {
            if (response.data.indexOf($(value).html()) < 0) {
                $(value).parent('tr').first().hide()
            }
        });
        add_total_tr().show();
        calculate_time($('.items tr td.total:nth-child(3n+3):visible'),1);
        calculate_time($('.items tr td.total:nth-child(3n+2):visible'),0);
        calculate_time($('.items tr td.total:nth-child(3n+1):visible'),2);
    });
    return true
};
function reloads() {
    window.location.reload(true)
};

function sum_time(times_array) {
    var sec = 0
    $.each(times_array, function (i,v) {
        var parts = v.split(':');
        sec += (+parts[0]) * 60 * 60 + (+parts[1]) * 60;
    });
    var sec_num = parseInt(sec, 10);
    var hours = Math.floor(sec_num / 3600);
    var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
    var seconds = sec_num - (hours * 3600) - (minutes * 60);

    if (hours < 10) {
        hours = "0" + hours;
    }
    if (minutes < 10) {
        minutes = "0" + minutes;
    }
    if (seconds < 10) {
        seconds = "0" + seconds;
    }
    var time = hours + ':' + minutes;
    return time;
}

function add_total_tr(){
    $(".plugin-total").remove()
    var tr = $('.items tbody tr').last().clone();
    $(tr).find('td').html('')
    $(tr).find('td:not(.total)').removeClass();
    $(tr).find('td').first().html('Total:')
    $(tr).addClass("plugin-total")
    $(tr).removeClass("odd")
    var local_timer = $($(tr).find('td.total')[0])
    var global_timer = $($(tr).find('td.total')[1])
    var total_timer = $($(tr).find('td.total')[2])
    local_timer.css('color','white');
    global_timer.css('color','white');
    total_timer.css('color','white');
    local_timer.css('background-color','red')
    global_timer.css('background-color','green')
    total_timer.css('background-color','blue')
    $('.items tbody').append(tr)
    return tr
}

function calculate_time(objs,cell){
    var times_array =[];
    $.each(objs,function(i,v){
        if (v.innerHTML == undefined || v.innerHTML == 0 || v.innerHTML == ''){
            times_array.push('00:00')
        }else{
            times_array.push(v.innerHTML)
        }

    })
    $($(".plugin-total .total")[cell]).html(sum_time(times_array));

}