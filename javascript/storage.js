chrome.extension.onRequest.addListener(function (request, sender, sendResponse) {
    var data = null
    switch (request.method) {
        case 'get_team':
        {
            data = get_teams()[request.id];
            break;
        }
        case 'get_teams':
        {
            data = get_teams()
            break;
        }
        default:
        {
            data = null
        }
    }

    if (data)
        sendResponse({data: data, status: true});
    else
        sendResponse({status: false});

});

function set_teams(data){
    localStorage.teams = JSON.stringify(data);
    return true
}

function get_teams(){
  return JSON.parse(localStorage.teams)
}

