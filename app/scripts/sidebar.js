$(document).ready(function(){

  $('#menu-toggle').click(function(e) {
    e.preventDefault();
    $('#wrapper').toggleClass('toggled');
    // $('#wrapper').toggleClass('toggled');
  });

  $('#menu-toggle-2').click(function(e) {
    e.preventDefault();
    var widthOfContent = $('#content').width();
    $('#wrapper').toggleClass('toggled-2');
    console.log(parseInt($('#page-content-wrapper').css("margin-left")))

    // if(parseInt($('#page-content-wrapper').css("margin-left")) == -315)
    // {
    //   $('#content').addClass('bigClass')
    //   console.log('GGGGGGGGGGGG')
    // } else if(!(parseInt($('#page-content-wrapper').css("margin-left") ===-315) ) || widthOfContent > 1200 )  {
    //   $('#content').removeClass('bigClass');
    //   console.log('fffffffff')
    // }


    if (window.matchMedia('(max-width: 1000px)').matches)
    {
      // do functionality on screens smaller than 768px
      console.log('dsdsdsdsd')
     $ ('#content').toggleClass('bigClass');
    }

  });


    $(function () {
        $('div#sidebar-wrapper li:has(ul)').addClass('parent_li').find(' > span').attr('title', 'Collapse this branch');
      // console.log($('div#sidebar-wrapper li ul > li'))
      // var t = $('#sidebar-wrapper > li').find('li.parent_li');
      var t = $('div#sidebar-wrapper ul ul ul ul li').hide();
      // console.log(t);

        $('div#sidebar-wrapper li.parent_li > span').on('click', function (e) {
            var children = $(this).parent('li.parent_li').find(' > ul > li');
          console.log(children + 'children');
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
    });

});


