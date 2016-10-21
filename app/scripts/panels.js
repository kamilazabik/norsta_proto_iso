function divClicked() {
  console.log('THIS')
  console.log($(this))
  var divHtml = $(this).html();

  console.log('aaaaaaaaaaaaaaaaaaaa')

  if(inputMemo){
    // divHtml = inputMemo.name


    console.log(inputMemo)
    // editableText.val(divHtml);
  }



  var editableText = $('<textarea />')
  editableText.val(divHtml);
  console.log('divHtml')
  console.log(divHtml)
  $(this).replaceWith(editableText);
  editableText.focus();
  // setup the blur event for this new textarea
  editableText.blur(editableTextBlurred);




  function setHeight(e) {
    $(e).css({'height':'auto','overflow-y':'hidden'}).height(e.scrollHeight);
  }
  $('textarea').each(function () {
    setHeight(this);
  }).on('input', function () {
    setHeight(this);
  });

}

var inputMemo;



function editableTextBlurred() {
  console.log('THIS')
  console.log($(this))
  var html = $(this).val();
  var viewableText = $('<div>')
  viewableText.html(html);

  // setup the click event for this new div



  var obj = $(this).parent()
  console.log(obj)
  console.log(obj.attr('data-name'))

  if(!inputMemo)
  {
    inputMemo={};
  }

  inputMemo[obj.attr('data-name')] = html;

  console.log('html');
  console.log(html);

  // }

  $(this).replaceWith(viewableText);
  viewableText.click(divClicked);
}




$(document).ready(function() {
  $('.editable_text').click(divClicked);
});
//



(function () {
  // hold onto the drop down menu
  var dropdownMenu;

  // and when you show it, move it to the body
  $(window).on('show.bs.dropdown', function (e) {

    // grab the menu
    dropdownMenu = $(e.target).find('.dropdown-menu');

    // detach it and append it to the body
    $('body').append(dropdownMenu.detach());

    // grab the new offset position
    var eOffset = $(e.target).offset();

    // make sure to place it where it would normally go (this could be improved)
    dropdownMenu.css({
      'display': 'block',
      'top': eOffset.top + $(e.target).outerHeight(),
      'left': eOffset.left - $(e.target).outerWidth()
    });
  });

  // and when you hide it, reattach the drop down, and hide it normally
  $(window).on('hide.bs.dropdown', function (e) {
    $(e.target).append(dropdownMenu.detach());
    dropdownMenu.hide();
  });

  // $(window).on('hide.bs.dropdown', function (e) {
  //   $(e.target).append(dropdownMenu.detach());
  //
  // });

})();


