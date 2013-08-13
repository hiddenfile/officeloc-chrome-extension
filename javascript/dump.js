$(function () {
    load_settings();

    $('.save_teams').click(function (e) {
        set_json_teams($('.dump').val());
        flash_message('success', 'Options saved!')
        e.preventDefault();
    });
});
function load_settings() {
    $('.dump').val(get_json_teams());
}

function flash_message(type, message) {
    $('.status').html('<div class="alert alert-' + type + '"><button type="button" class="close" data-dismiss="alert">&times;</button>' + message + '</div>')
    setTimeout(function () {
        $(".status").html("")
    }, 1000);
}