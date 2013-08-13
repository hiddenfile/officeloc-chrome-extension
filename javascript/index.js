$(function(){
    load_data();

    $('.show_team').click(function(e){
        e.preventDefault();
        chrome.tabs.executeScript(null, { code: 'show_members("'+ $(this).html()+'")' });
    });

    $('.refresh').click(function(e){
        e.preventDefault();
        chrome.tabs.executeScript(null, { code: "reloads()" });
    });

});

function load_data(){
    if (get_teams()){
        $.each(get_teams(), function(k,v){
            $('.teams-tbody').append('<tr>'+teams_td(k)+members_td(v)+'</tr>')
        });
    }
}
function teams_td(team){
   return '<td class="teams-name"><a href="#" class="show_team">'+team+'</a></td>'
}
function members_td(members){
   return '<td class="team-members">'+members+'</td>'
}