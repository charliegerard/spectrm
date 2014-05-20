            
var sizeValue;
//Gives back the id of the list in the dropdown
var listName;

$(document).ready(function(){

  $('#saveSettings').click(function(event){
    event.preventDefault();
    sizeValue = parseInt($('#sizeInput').val());
    listName = ($('.lists')[0].value);
   console.log(sizeValue, listName)
    $.ajax({
      url: '/settings',
      type: 'POST',
      dataType: 'json',
      data: {setting: {name: listName, details: {size: sizeValue}}}
    })

    .done(function(data){
      console.log(data)
      //debugger;
      //var option = $('option[data-id="' + data[0].id + '"]')
      var option = $('option[value="' + data.name + '"]')
      //New size
      option.data().size = data.details.size
      $('#sizeInput').val(option.data().size);
    })

    .fail(function(){
      console.log("failed")
    })
  });


  loadSettings = function(){ 
      $.ajax({
        url: '/settings/load',
        type: 'GET',
        dataType: 'json'
      }).done(function(savedSettings){
        console.log(savedSettings)
        var list = $('.lists');
        $.each(savedSettings, function(index, setting){
          var newOption = ('<option data-size="' + setting.details.size + '" data-id= "' + setting.id +'" value="' + setting.name + '">' + setting.name + '</option>')
          list.append(newOption);
        });
        
      })

      // if ajax is fails, do the usual
      .fail(function(){
        console.log("Didn't load the settings");
      }); 
  }

  loadSettings();

 $('.deleteList').click(function(){
    sizeValue = parseInt($('input').val());
    listName = ($('.lists')[0].value);
    var list = $('.lists');
    $.ajax({
      url: 'settings/destroy',
      type: 'DELETE',
      dataType: 'json',
      //data: {name: listName}
      data: {setting: {name: listName, details: {size: sizeValue}}}
    }).done(function(data){
     //debugger
      console.log('list deleted')
      var singleList = $('option[value="' + data[0].name + '"]')
      list.find(singleList).remove();
    })
  });

//Clicking on the new button to add a new list to the dropdown.
  // $('#newList').click(function(){
  //   $('#newListSettings').fadeIn();
  //   //Removing the popup when clicking on cancel.
  // });
  $('#cancelSettings').click(function(event){
     event.preventDefault();
     $('#newListSettings').fadeOut();
 });

 $('.newList').click(function(){
     $('#newListSettings').fadeIn();
  });

  $('#addList').click(function(){
    var list = $('.lists');
    // debugger
    var newList = $('#list_name').val();
    list.append('<option value=' + newList + '>' + newList + '</option>')
    $('#newListSettings').fadeOut();
  });

  $('.lists').bind('change',function(){
    console.log('hello')
    var size = $(this).find(':selected').data('size')
    $('#sizeInput').val(size);
  });

  var close = false;

  $('#closeControls').click(function(){
    if(close === false){
      close = true
      $('#closeControls').html('Open controls');
    }else if(close === true){
      close = false
      $('#closeControls').html('Close controls');
    }
    $('#inner_panel').slideToggle('slow', function(){
    });
  });

});

