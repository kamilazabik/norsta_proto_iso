  function divClicked() {
    var divHtml = $(this).html();
    var editableText = $('<textarea />');
    editableText.val(divHtml);
    $(this).replaceWith(editableText);
    editableText.focus();
    // setup the blur event for this new textarea
    editableText.blur(editableTextBlurred);

    function setHeight(e) {
      $(e).css({'height': 'auto', 'overflow-y': 'hidden', 'width' : '100%'}).height(e.scrollHeight);
    }

    $('textarea').each(function () {
      setHeight(this);
    }).on('input', function () {
      setHeight(this);
    });
  }

  function editableTextBlurred() {
    var numberClass = $('.addedComment').attr('data-name');
    var html = $(this).val();
    var viewableText = $('<div class="addedCom">')
    viewableText.html(html);

    // setup the click event for this new div
    var obj = $(this).parent();


  if(!isoObject[numberClass]){
  isoObject[numberClass] = {
      comment: html
  };
  }else{
    isoObject[numberClass].comment = html;
  }
    $(this).replaceWith(viewableText);
    viewableText.click(divClicked);
  }


// function setComment(className) {
//
//   $('.editable_text').on('click', divClicked, function(){
//     console.log(className);
//     isoObject[className].comment = newComment;
//     console.log(isoObject[className]);
//   });
//
//
// }


// $(document).ready(function() {
//   $('.editable_text').click(divClicked);
// });


(function () {
  // hold onto the drop down menu
  var dropdownMenu;

  // and when you show it, move it to the body
  $(window).on('show.bs.dropdown', function (e) {

    // grab the menu
    dropdownMenu = $(e.target).find('.dropdown-menu.filters');

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


