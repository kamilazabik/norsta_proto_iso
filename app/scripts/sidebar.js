function createSidebar(numberClass, className){
  var ulNode = $('<ul class="nav-pills nav-stacked wrapper-sidebar-nav__ul"></ul>')
    , liNode = $('<li class="wrapper-sidebar-nav__li"></li>')
    , spanNode = $('<span class="wrapper-sidebar-nav__icon"></span>')
    , iNode = $('<i class="glyphicon glyphicon-chevron-down"></i>')
    , aNode = $('<a data-sidebar=\'' + numberClass+ '\' class="wrapper-sidebar-nav__link"></a>').text(function () {
    return addDotsForLabels(numberClass) + ' ' + className;
  })
    , aSpan = $('<span class="wrapper-sidebar-nav__span"></span>')

  aSpan.append(aNode);
  spanNode.append(iNode);
  liNode.append(spanNode, aSpan);
  ulNode.append(liNode);

  var children = isoObject[numberClass].children;

  if(children){
    $.each(children.split(','), function (idx, childId) {
      liNode.append(createSidebar(childId, isoObject[childId].name))
    });
  }
  return ulNode
}//createSidebar

function loadSidebar() {
  var ul = $('<ul class="nav-pills nav-stacked wrapper-sidebar-nav"></ul>');

  $(' .wrapper-sidebar').append(ul);
  ul.append(createSidebar('A', isoObject['A'].name));

  console.log($('.wrapper-sidebar-nav'))

  $('.wrapper-sidebar-nav ul').first().addClass('wrapper-sidebar-nav--padding')

  collapseSidebar();
  markClickedSidebar()
}//loadSidebar


function moveSidebar(){
  $('#menu-toggle').click(function(e) {
    e.preventDefault();
    $('.wrapper').toggleClass('wrapper--toggled-mobile');
    // $('#wrapper').toggleClass('toggled');
  });

  $('#menu-toggle-2').click(function(e) {
    e.preventDefault();
    var widthOfContent = $('#content').width();
    $('.wrapper').toggleClass('wrapper--toggled-desk');
  });
}//moveSidebar

function collapseSidebar(){
  $('.wrapper-sidebar li:has(ul)').addClass('parent_li').find(' > span').attr('title', 'Collapse this branch');
  // console.log($('div#wrapper-sidebar li ul > li'))
  // var t = $('#wrapper-sidebar > li').find('li.parent_li');
  var t = $('.wrapper-sidebar ul ul ul ul li').hide();

  $('.wrapper-sidebar li.parent_li > span').on('click', function (e) {

    // var children = $(this).parent('.parent_li').find(' > ul > li');

    // var children = $(this).parent('.parent_li').children().next().children().children();
    var children = $(this).parent('.parent_li').find('> ul').children();

    console.log($(this).parent('.parent_li').find('> ul').children())

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
    , linksLabel = $('[data-label]');

  markClickedSidebarRed(linksSidebar,linksContent,'data-panel');
  markClickedSidebarRed(linksSidebar, linksLabel,'data-label');
}//markClickedSidebar

function addColorForSidebar() {
  var linksSidebar = $('a[data-sidebar]');
  $(linksSidebar).on('click', function (e) {
    console.log($(this))

    $(linksSidebar.removeClass('clicked-sidebar'));
    $(this).addClass('clicked-sidebar');
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

    $(sidebar.removeClass('clicked-sidebar'));

    $.each(sidebar, function (index, value) {
      var valueOfSidebarAttr = $(value)[0].attributes[0].value;

      if(_this == valueOfSidebarAttr){
        var clickedNode = $(value).parents('li')
          , siblings = $($(value).parents('li').parents('ul')[0].parentNode.childNodes);

        $(value).addClass('clicked-sidebar');

        if(_thisClass && _this != 'A'){
          // $(this).children().children().css('display', 'none');
          $(this).children().children().hide()
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
