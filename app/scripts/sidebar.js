// $(document).ready(function(){

function createSidebar(numberClass, className){
  var numberOfChildren = (isoObject[numberClass].children).split(',');
  var numberOfChildrenName = (isoObject[numberClass].childrenNames).split('.')
    , ulNode = $('<ul class="nav-pills nav-stacked"></ul>')
    , liNode = $('<li></li>')
    , spanNode = $('<span></span>')
    , iNode = $('<i class="glyphicon glyphicon-chevron-down"></i>')
    , aNode = $('<a data-sidebar=\'' + numberClass+ '\'></a>').text(className);

    spanNode.append(iNode);
    liNode.append(spanNode, aNode);
    ulNode.append(liNode);

  var children = isoObject[numberClass].children;

  if(children){
    $.each(children.split(','), function (idx, childId) {
      aNode.append(createSidebar(childId, isoObject[childId].name))
  });
  }

  return ulNode
}

function loadSidebar() {
  var numberOfChildren = (isoObject['A'].children).split(',')
  var nameOfChildren = (isoObject['A'].children.name)
  var ul = $('<ul class="sidebar-nav nav-pills nav-stacked"></ul>')
    , li = $('<li></li>')
    , span = $('<span class="title"></span>')
    , icon = $('<i class="glyphicon glyphicon-chevron-down">NOR-STA</i>')

  span.append(icon);
  li.append(span);
  ul.append(li);
  $(' #sidebar-wrapper').append(ul);
    span.append(createSidebar('A', isoObject['A'].name));

  collapsSidebar()
}


function moveSidebar(){
  $('#menu-toggle').click(function(e) {
    e.preventDefault();
    $('#wrapper').toggleClass('toggled');
    // $('#wrapper').toggleClass('toggled');
  });

  $('#menu-toggle-2').click(function(e) {
    e.preventDefault();
    var widthOfContent = $('#content').width();
    $('#wrapper').toggleClass('toggled-2');
    console.log(parseInt($('#page-content-wrapper').css('margin-left')));
  });
}

function collapsSidebar(){
  $('div#sidebar-wrapper li:has(ul)').addClass('parent_li').find(' > span').attr('title', 'Collapse this branch');
  // console.log($('div#sidebar-wrapper li ul > li'))
  // var t = $('#sidebar-wrapper > li').find('li.parent_li');
  var t = $('div#sidebar-wrapper ul ul ul ul li').hide();
  // console.log(t);

  $('div#sidebar-wrapper li.parent_li > span').on('click', function (e) {
    var children = $(this).parent('.parent_li').find(' > ul > li');
    console.log($(this));
    console.log(children);
    if (children.is(':visible')) {
      children.hide('fast');
      $(this).attr('title', 'Expand this branch').find(' > i').toggleClass('glyphicon-chevron-down glyphicon-chevron-right');
      // console.log($(this));
    } else {
      children.show('fast');
      $(this).attr('title', 'Collapse this branch').find(' > i').toggleClass('glyphicon-chevron-right glyphicon-chevron-down');
    }
    e.stopPropagation();
  });
}

// });


