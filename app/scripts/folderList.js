function openProject() {
  var buttonOpen = $('.mainPagePanels .expand')
    , content = $('#content')
    , nav = $('nav');
  console.log($('#panel-content'));

  buttonOpen.on('click', function () {
    nav.load('./jade/includes/nav-top.html', function () {
      createPage('A', false);
      // goToProjectList();
      moveSidebar();
    });

  })
}
