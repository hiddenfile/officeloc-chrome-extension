$(function(){
    load_settings();

    $('.save_teams').click(function(e){
        var hash = {}
        $.each($('.members-form').serializeArray(), function(index,value){
          if(hash[value['name']]){
              hash[value['name']].push(value['value'].trim());
          }else{
              hash[value['name']] =[];
              hash[value['name']].push(value['value'].trim());
          }
        });
        set_teams(hash)
        flash_message('success','Options saved!')
        e.preventDefault();
    });
    $('.add-new-team').click(function(e){
        $('.members-form').append(add_team(''))
        e.preventDefault();
    })

    $('.members-form').on('click','.add-new-member', function(e){
        var team_name = $(this).parents(".span4").find('.team').first().data('name')
        if (team_name == ''){
            flash_message('error','Team should have name')
        }else{
            $(this).parents(".span4").first().next().append(add_member('',team_name));
        }
        e.preventDefault();
    });

    $('.members-form').on('click','.remove-member,.remove-team', function(e){
        $(this).parents(".row").first().prev().remove();
        $(this).parents(".row").first().remove();
        e.preventDefault();
    })

    $('.members-form').on('keydown','input.team',function(e){
        if ($(this).parents(".span4").first().next().children().length > 0){
            flash_message('error','You cannot change team name if it is contain members')
            e.preventDefault();
        }
    })
    $('.members-form').on('keyup','input.team',function(e){
      $(this).data('name',$(this).val());
    })
});
function add_team(val){
    return '</br><div class="row"><div class="span4"><input class ="team" data-name="'+val+'" type="text" placeholder="Team name" value = "'+val+'">&nbsp;&nbsp;<a class="btn btn-mini btn-success add-new-member" href="#"><i class="icon-plus"></i></a>&nbsp;&nbsp;<a class="btn btn-mini btn-danger remove-team" href="#"><i class="icon-remove"></i></a></div><div class="row members-div"></div>'
}

function add_member(val,team){
    return '</br><div class="row"><div class="span4 offset1"><input style="margin-left: 30px" class ="member" name="'+team+'" type="text" placeholder="Member name" value = "'+val+'">&nbsp;&nbsp;<a class="btn btn-mini btn-danger remove-member" href="#"><i class="icon-remove"></i></a></div></div>'
}

function flash_message(type,message){
    $('.status').html('<div class="alert alert-'+type+'"><button type="button" class="close" data-dismiss="alert">&times;</button>'+message+'</div>')
    setTimeout(function() {
        $(".status").html("")
    }, 1000);
}

function load_settings(){
  if (get_teams()){
      $.each(get_teams(), function(k,v){
          $('.members-form').append(add_team(k))
          $.each(v, function(index, value){
              $('.members-div').last().append(add_member(value,k));
          })
      });
  }
}