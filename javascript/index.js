$(function(){
    load_data();

    $('.show_team').click(function(e){
        e.preventDefault();
        chrome.tabs.executeScript(null, { code: "show_members()" });
    });

    $('.refresh').click(function(e){
        e.preventDefault();
        chrome.tabs.executeScript(null, { code: "reloads()" });
    });

});

function load_data(){

}
function teams_td(team, members){
   return '<td class="teams-name"><a href="#" class="show_team" data-members="'+members+'">'+team+'</a></td>'
}
function members_td(members){
   return '<td class="team-members">'+members+'</td>'
}