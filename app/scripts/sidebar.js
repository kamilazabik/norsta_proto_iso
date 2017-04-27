function createSidebar(numberClass, className){
    var ulNode = $('<ul class="nav-pills nav-stacked"></ul>')
    , liNode = $('<li></li>')
    , spanNode = $('<span class="sidebar-icon"></span>')
    , iNode = $('<i class="glyphicon glyphicon-chevron-down"></i>')
    , aNode = $('<a data-sidebar=\'' + numberClass+ '\' ></a>')
    , aSpan = $('<span></span>').text(function () {
        return addDotsForLabels(numberClass) + ' ' + className;
      });

    aNode.append(aSpan);
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
}//createSidebar

function loadSidebar() {
  var numberOfChildren = (isoObject['A'].children).split(',');
  var nameOfChildren = (isoObject['A'].children.name);
  var ul = $('<ul class="sidebar-nav nav-pills nav-stacked"></ul>')
    , li = $('<li></li>')
    , span = $('<span class="title"></span>')
    , icon = $('<i class="glyphicon glyphicon-chevron-down">NOR-STA</i>');

  span.append(icon);
  li.append(span);
  ul.append(li);
  $(' #sidebar-wrapper').append(ul);
    span.append(createSidebar('A', isoObject['A'].name));

  collapseSidebar();
  markClickedSidebar()
}//loadSidebar


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
    // console.log(parseInt($('#page-content-wrapper').css('margin-left')));
  });
}//moveSidebar

function collapseSidebar(){
  $('div#sidebar-wrapper li:has(ul)').addClass('parent_li').find(' > span').attr('title', 'Collapse this branch');
  // console.log($('div#sidebar-wrapper li ul > li'))
  // var t = $('#sidebar-wrapper > li').find('li.parent_li');
  var t = $('div#sidebar-wrapper ul ul ul ul li').hide();

  $('div#sidebar-wrapper li.parent_li > span').on('click', function (e) {

    // var children = $(this).parent('.parent_li').find(' > ul > li');

    var children = $(this).parent('.parent_li').children().next().children().children();

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
}//collapseSidebar

function markClickedSidebar() {
    var linksContent = $('[data-panel]')
      , linksSidebar = $('a[data-sidebar]')
      , linksLabel = $('[data-label]')

  markClickedSidebarRed(linksSidebar,linksContent,'data-panel');
  markClickedSidebarRed(linksSidebar, linksLabel,'data-label');
}//markClickedSidebar

function addColorForSidebar() {
  var linksSidebar = $('a[data-sidebar]');
  $(linksSidebar).on('click', function (e) {
    $(linksSidebar.children('span.red')).removeClass('red');
    $(this).children('span').addClass('red');
    e.stopPropagation();
  })
}//addColorForSidebar

function createPageAfterClickSidebar() {
  var linksSidebar = $('a[data-sidebar]');
  linksSidebar.on('click', function () {
    var _this = $(this).attr('data-sidebar');
    if(isoObject[_this].children){
      createPage(_this, true);
    }
  })
}//createPageAfterClickSidebar


function markClickedSidebarRed(sidebar,links,dataAttr) {
  $(links).on('click', function (e) {
    var _this = $(this).attr(dataAttr);
    var _thisClass = $(this).hasClass('btn-up');

    $(sidebar.children('span.red')).removeClass('red');

    $.each(sidebar, function (index, value) {
      var valueOfSidebarAttr = $(value)[0].attributes[0].value;

      if(_this == valueOfSidebarAttr){
        var clickedNode = $(value).parents('li')
          , siblings = $($(value).parents('li').parents('ul')[0].parentNode.childNodes);

        $(value.childNodes[0]).addClass('red');

        if(_thisClass && _this != 'A'){
          $(this).children().slice(1).hide();
        }else{
          if($(value).is(':hidden')){
            // var siblings = $(value).parents('li').nextAll().prevAll();

            for(var i = 1; i < siblings.length; i++){
              siblings[i].childNodes[0].style.display = 'inline-block'
            }
            clickedNode.show();
          }
        }
      }
    });
    // e.stopPropagation();
  })
}//markClickedSidebarRed
