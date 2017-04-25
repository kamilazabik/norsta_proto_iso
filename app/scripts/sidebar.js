function createSidebar(numberClass, className){
    var ulNode = $('<ul class="nav-pills nav-stacked"></ul>')
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

  collapseSidebar();
  markClickedSidebar()
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

function collapseSidebar(){
  $('div#sidebar-wrapper li:has(ul)').addClass('parent_li').find(' > span').attr('title', 'Collapse this branch');
  // console.log($('div#sidebar-wrapper li ul > li'))
  // var t = $('#sidebar-wrapper > li').find('li.parent_li');
  var t = $('div#sidebar-wrapper ul ul ul ul li').hide();
  // console.log(t);

  $('div#sidebar-wrapper li.parent_li > span').on('click', function (e) {

    // var children = $(this).parent('.parent_li').find(' > ul > li');

    var children = $(this).parent('.parent_li').children().next().children().children();
    console.log($(this));
    console.log($(this).parent('.parent_li').find('ul li'));
    console.log($(this).parent('.parent_li').children().next().children().children());
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

function markClickedSidebar() {
    var linksContent = $('a[data-title]')
      , linksSidebar = $('a[data-sidebar]');

    $(linksContent).on('click', function (e) {
      var _this = $(this).attr('data-title');

      $(linksSidebar).removeClass('red');

      $.each(linksSidebar, function (index, value) {
        // var valueOfSidebarAttr = value.attributes['data-sidebar'].value;
        var valueOfSidebarAttr = $(value)[0].attributes[0].value;

        if(_this == valueOfSidebarAttr){

          $(value).addClass('red');

          if($(value).is(':hidden')){

            // var siblings = $(value).parents('li').nextAll().prevAll();
            var clickedNode = $(value).parents('li');
            var siblings = $($(value).parents('li').parents('ul')[0].parentNode.childNodes);


            for(var i = 1; i < siblings.length; i++){
              siblings[i].childNodes[0].style.display = 'inline-block'
            }
            clickedNode.show();
          }
        }

        // console.log($(value))
        // if($(value).text().indexOf(clickedLink.text().trim())>=0){
        //   $(value).addClass('red');
        //   if($(value).is(':hidden')){
        //     var siblings = $(value).parents('li').nextAll().prevAll();
        //     siblings.show('fast');
        //   }
        // }
      });
      e.stopPropagation();
    });









    $('#menu-projects').on('click', function (e) {
      $(linksSidebar).removeClass('red');
      e.stopPropagation();
    });

    $(linksSidebar).on('click', function (e) {
      $(linksSidebar).removeClass('red');
      $(this).addClass('red');
      e.stopPropagation();
    })
}

function createPageAfterClickSidebar() {
  var linksSidebar = $('a[data-sidebar]');
  linksSidebar.on('click', function () {
    var _this = $(this).attr('data-sidebar');
    console.log(_this)
    createPage(_this, false);
  })
}
