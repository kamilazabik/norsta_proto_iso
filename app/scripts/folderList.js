function clickFolder(){
  var bodyTable = $('.table.table-hover tbody')

  bodyTable.on('click', function () {

  })

}



function changeFolderList(){

  var bodyTable = $('.table.table-hover tbody')


}


function openProject() {
  var buttonOpen = $('.mainPagePanels .expand')
    , content = $('#content')
  console.log($('#panel-content'));

  buttonOpen.on('click', function () {

      // var panelContent = '<div id="panel-content" class="row"></div>'
      // content.append(panelContent)

    $('#panel-content').load('./jade/pages/A-panel-content.html', function() {
      // var panelContent = '<div id="panel-content" class="row"></div>'
      // content.append(panelContent)

      createPage('A', false);

      // $('#content').append('<div id="panel-content" />');
    });
    $('#panel-content').load('./jade/right-panels.html', function() {

    })

  })

}
