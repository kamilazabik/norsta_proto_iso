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
    , nav = $('nav');
  console.log($('#panel-content'));

  buttonOpen.on('click', function () {
    nav.load('./jade/includes/nav-top.html', function () {
      createPage('A', false);
      goToProjectList();
      moveSidebar();
    });

  })
}
