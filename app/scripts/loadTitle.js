function loadTitle(){
  var links = $('[class*=\'title-hseq\']')
    , allElement = $('[class*=\'panel-hseq\']')
    , title = $('.title-claim')
    , label = $('.label-claim')
    , allInputs = $('.allPanels input')
    , slider = $('.sliderRightPanel input.slider');


  allElement.each(function(){
    var className = $(this)
    // var numberClass = className.attr('class').split(' ')[0].replace('title-hseq','').split('-');
      , numberClass = className.attr('class').split(' ')[1].replace('panel-hseq','').split('-')
      , panel = $('.panel-hseq' + numberClass.join('-'));


    clickOnClassName(numberClass, className,panel)

  });

  function clickOnClassName(numberClass,className,panel) {
    $(className).on('click', function (e) {
      var classNameText = numberClass.join('.')
        , link = $('.title-hseq' + classNameText).text()
        , inputs =$(this).children().find('input')
        , inputName = inputs.attr('name')
        , numberClassWithDots = addDotsForLabels(numberClass.join(''));

      $('.addedComment').attr('data-name', classNameText);
      $('.editable_text').on('click', divClicked);

      // $('.number').removeClass('labelColor')
      // panel.removeClass('labelColor')
      $('.panel-title').removeClass('labelColor');
      // allElement.removeClass('labelColor');

      allElement.children().removeClass('labelColor');


      // console.log(numberClassWithDots)

      // allElement.removeClass('panel-shadow');
      e.preventDefault();
      title.text(link);
      label.text(numberClassWithDots);

      addComments (classNameText);
      loadDescription(numberClass);


      // panel.addClass('panel-shadow');
      panel.children(':first').addClass('labelColor')
      // panel.children().not(':first').not(':last').addClass('labelColor')
     $('.right-panel .panel-title').addClass('labelColor')
      // console.log(panel.children(":first"))

      addClassNotCollapsed(classNameText);
      addEvidence();


      if(!isoObject[numberClass].children){

        allInputs.each(function (v,i) {
          var input = $(this)
          input.attr('disabled', 'disabled')
        });
        var clickedInput = $('input[name='+classNameText +']');
        clickedInput.removeAttr('disabled' );
      }

      if(notSavedAssessment && !SzybkaOcena) {

          $('#myModal').modal('show');

        //TODO:
        //Alert ze nie zapisana ocena z wyborem zapisz/anuluj
        // SaveAssessment();
        // CancelAssessment();
      }
    });
  }
}//loadTitle


function addComments (classNameText){
  var comment = $('.addedCom');

  if(!isoObject[classNameText] ||!isoObject[classNameText].comment ){
    comment.text('');
  }else{
    comment.text(isoObject[classNameText].comment);
  }
}//addComments

// function SetSelectAssessmentField() {
//     $('#normalAssess').click(function () {
//       SzybkaOcena = false;
//     });
//
//     $('#fastAssess').click(function () {
//         SzybkaOcena = true;
//     });
// }//SetSelectAssessmentField

function SetSelectAssessmentField(){

  $('#selectAssessment').on('change', function(){
    $('#selectAssessment option').each(function() {
      var selectId = $(this).attr('id')
      if (selectId == "normalAssess" && $(this).is(':selected')) {
        console.log("normalAssess");
        SzybkaOcena = false;
      }else if (selectId == "fastAssess" && $(this).is(':selected')){
        console.log("fastAssess");
        SzybkaOcena = true;
      }else if(selectId == "noAssessment" && $(this).is(':selected')){
        console.log("no");
      }
    })
  })
}////SetSelectAssessmentField


function SetAssessmentField() {
  $('#saveAssessAlert').on('click', function () {
      SaveAssessment();
  });

  $('#removeAssessAlert').on('click', function () {
      CancelAssessment();
  });

  $('#saveAssess').on('click', function () {
    SaveAssessment();
  });

  $('#removeAssess').on('click', function () {
    CancelAssessment();
  })
}//SetAssessmentField

function SaveAssessment() {
  if(tempAssessmentObject && tempAssessmentObject.sliderName)
  {
    var input = $('input[name=' + tempAssessmentObject.sliderName + ']');
    slidersMemo[tempAssessmentObject.sliderName] = tempAssessmentObject.value;
    updateTopSlider();
    updateSlider(input, slidersMemo);
    notSavedAssessment=false;
    console.log(tempAssessmentObject)
    $('#myModal').modal('hide')
  }
}//SaveAssessment

function CancelAssessment() {
  if(tempAssessmentObject && tempAssessmentObject.sliderName)
  {
    var input = $('input[name=' + tempAssessmentObject.sliderName + ']');
    updateSlider(input, slidersMemo);
    notSavedAssessment=false;
    $('#myModal').modal('hide')
  }
}//CancelAssessment

function addClassNotCollapsed(classNameText){
  var clickedPanel = $('.panel-hseq' + classNameText+' div.number')
  var clickedPanelButton = $('.panel-hseq' + classNameText+' div.button-expand')
    , collapseElement = $('#collapseExample' + classNameText).attr('aria-expanded');

  clickedPanel.removeClass('number-not-collapsed')
  clickedPanelButton.removeClass('button-expand-not-collapsed')

  if(collapseElement == 'false' || collapseElement == undefined){
    clickedPanel.addClass('number-not-collapsed')
    clickedPanelButton.addClass('button-expand-not-collapsed')
  }

}

function addEvidence(){
  $('.fa.fa-plus').on('click', function(){
    $('#modalEvidence').modal('show');

  })
}

function attachEvidence() {
  $(document).on('click', '.browse', function(){
    var file = $(this).parent().parent().parent().find('.file');
    event.preventDefault();
    file.trigger('click');
  });
  $(document).on('change', '.file', function(){
    $(this).parent().find('.form-control').val($(this).val().replace(/C:\\fakepath\\/i, ''));
  });

  $(document).on('click','.save-new-evid', function( event ) {
    console.log($(this))
    event.preventDefault();
    var nameOfFile = $('.form-control.name-evid').val()
      , nameOfEvidence = $('#textareaNameEvid').val()
    evidences['a'] = {nameDocument:nameOfFile, nameEvidence: nameOfEvidence }

    console.log(evidences)

    makeTr(nameOfFile, nameOfEvidence)
    $('#modalEvidence').modal('hide');

  });
}

function makeTr(nameOfFile, nameOfEvidence){

  var evidenceTr3 = $('<tr></tr>')
    , evidenceTr3Td1 = $('<th>1</th>')
    , evidenceTr3Td2 = $('<td></td>').text(nameOfEvidence)
    , evidenceTr3Td3 = $('<td></td>')
    , evidenceTr3Td4 = $('<td></td>').text(nameOfFile)
    , evidenceTr3Td5 = $('<td class="buttons"></td>')
    , buttonTr3OpenEvidence = $('<button type=\'button\' class=\'btn btn-primary\' ></button>').append('<i class="fa fa-folder-open" aria-hidden="true"></i>')
    , buttonTr3AddEvidence = $('<button type=\'button\' class=\'btn btn-primary\' ></button>').append ('<i class="fa fa-plus" aria-hidden="true"></i>');


    evidenceTr3Td5.append(buttonTr3OpenEvidence,buttonTr3AddEvidence);
    evidenceTr3.append(evidenceTr3Td1,evidenceTr3Td2,evidenceTr3Td3,
    evidenceTr3Td4,evidenceTr3Td5);

  $('.first').remove()
  $('.well table tbody').append(evidenceTr3);




}







