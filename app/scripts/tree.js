$(function () {
// function showFolders(){

  $('.panel-list--tree li').hide();
  $('.panel-list--tree > ul > li').show();
  $('.panel-list--tree li:has(ul)').addClass('parent_li').find(' > span').attr('title', 'Collapse this branch');


  var parents = $('.parent-padding')
    // [0].style.paddingLeft = '20px';


  for(var i = 0; i <= parents.length - 1; i++ ){
    parents[i].style.paddingLeft = '20px';
  }

  $('.panel-list--tree li.parent_li > span a').on('click', function (e) {
    console.log($(this).parent());

    var children = $(this).parent().parent('li.parent_li').find(' > ul > li')
      , childrenSpan = $(this).parent().parent('li.parent_li').find('> ul > li > span')
      , paddingOfParent = ($(this)[0].parentNode.style.paddingLeft).replace('px', '');



    if (children.is(":visible")) {
      console.log($(this));
      children.hide('fast');
      $(this).parent().find(' > i').addClass('fa-folder-o').removeClass('fa-folder-open-o').attr('aria-hidden', 'true');
    } else {
      children.show('fast');
      for(var i = 0; i <= childrenSpan.length-1; i++) {
        if(!paddingOfParent){
          childrenSpan[i].style.paddingLeft = 20 + 'px';
        }else {
          childrenSpan[i].style.paddingLeft = parseInt(paddingOfParent) + 20 + 'px';
        }
      }
      $(this).parent().find(' > i').addClass('fa-folder-open-o').removeClass('fa-folder-o').attr('aria-hidden', 'true');
    }
    e.stopPropagation();
  });
});


// showFolders();
