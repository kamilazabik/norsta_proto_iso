function divClicked() {
  var divHtml = $(this).html();
  var editableText = $('<textarea class="edit-comment" data-name="textarea"/>');
  editableText.val(divHtml);
  $(this).replaceWith(editableText);
  editableText.focus();
  // setup the blur event for this new textarea
  editableText.blur(editableTextBlurred);

  function setHeight(e) {
    $(e).css({'height': 'auto', 'overflow-y': 'hidden', 'width' : '100%'}).height(e.scrollHeight);
  }

  $('[data-name="textarea"]').each(function () {
    setHeight(this);
  }).on('input', function () {
    setHeight(this);
  });
}//divClicked

function editableTextBlurred() {
  var numberClass = $('[data-comment]').attr('data-name');
  var html = $(this).val();
  var viewableText = $('<div class="added-comment" data-name="added-comment">');
  viewableText.html(html);

  // setup the click event for this new div
  // var obj = $(this).parent();

  console.log(numberClass);
if(!isoObject[numberClass]){
isoObject[numberClass] = {
    comment: html
};
}else{
  isoObject[numberClass].comment = html;
}
  $(this).replaceWith(viewableText);
  viewableText.click(divClicked);
  console.log(isoObject[numberClass].comment);
  console.log(isoObject[numberClass]);
  console.log(isoObject);
  console.log(numberClass)
}//editableTextBlurred

function moveRightBottomPanelUp(){
  var firstPanelHeading = $('.first-panel .panel-heading');
  var firstPanel = $('.first-panel');

  firstPanelHeading.on('click', function () {
    firstPanel.toggleClass('margin-panel', 5000 );
  })
}//moveRightBottomPanelUp

function eventsOnRightPanels(){
  $('[data-name="editable-text"]').click(divClicked);
  moveRightBottomPanelUp()
}


// function setComment(className) {
//
//   $('.evidences-content-assess__editable-text').on('click', divClicked, function(){
//     isoObject[className].comment = newComment;
//   });
//
// }



  // $(document).ready(function() {
  //   $('.collapse.in').prev('.panel-heading').addClass('active');
  //   $('#bs-collapse')
  //     .on('show.bs.collapse', function(a) {
  //       $(a.target).prev('.panel-heading').addClass('active');
  //     })
  //     .on('hide.bs.collapse', function(a) {
  //       $(a.target).prev('.panel-heading').removeClass('active');
  //     });
  // });
//
//
//
// (function () {
//   // hold onto the drop down menu
//   var dropdownMenu;
//
//   // and when you show it, move it to the body
//   $(window).on('show.bs.dropdown', function (e) {
//
//     // grab the menu
//     dropdownMenu = $(e.target).find('.dropdown-menu.filters');
//
//     // detach it and append it to the body
//     $('body').append(dropdownMenu.detach());
//
//     // grab the new offset position
//     var eOffset = $(e.target).offset();
//
//     // make sure to place it where it would normally go (this could be improved)
//     dropdownMenu.css({
//       'display': 'block',
//       'top': eOffset.top + $(e.target).outerHeight(),
//       'left': eOffset.left - $(e.target).outerWidth()
//     });
//   });
//
//   // and when you hide it, reattach the drop down, and hide it normally
//   $(window).on('hide.bs.dropdown', function (e) {
//     $(e.target).append(dropdownMenu.detach());
//     dropdownMenu.hide();
//   });
//
//   // $(window).on('hide.bs.dropdown', function (e) {
//   //   $(e.target).append(dropdownMenu.detach());
//   //
//   // });
//
// })();


