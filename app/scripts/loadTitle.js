function loadTitle(){
  var links = $('[class*=\'title-hseq\']')
    , allElement = $('[class*=\'panel-hseq\']')
    , title = $('.title-claim')
    , label = $('.label-claim')
    , allInputs = $('input')
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
        , numberClassWithDots = addDotsForLabels(numberClass.join(''))

      $('.addedComment').attr('data-name', classNameText);
      $('.editable_text').on('click', divClicked);

      // $('.number').removeClass('labelColor')
      // panel.removeClass('labelColor')
      $('.panel-title').removeClass('labelColor')
      // allElement.removeClass('labelColor');

      allElement.children().removeClass('labelColor')


      // console.log(numberClassWithDots)

      // allElement.removeClass('panel-shadow');
      e.preventDefault();
      title.text(link);
      label.text(numberClassWithDots);

      addComments (classNameText);
      loadDescription(numberClass);

      // panel.addClass('panel-shadow');
      panel.children().not(':first').not(':last').addClass('labelColor')
     $('#two > .panel-body').addClass('labelColor')
      // console.log(panel.children(":first"))

      addClassNotCollapsed(classNameText);
      addEvidence(classNameText);

      if(!isoObject[numberClass].children){

        allInputs.each(function () {
          $('input').attr('disabled', 'disabled')
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

function addEvidence(classNameText){
  var collapseElement = $('#collapseExample' + classNameText).attr('aria-expanded');
  if(collapseElement == 'true'){
    $('#selectActionWithEvidences' + classNameText + '1 option').each(function() {
      var selectId = $(this).attr('id')
      if (selectId == "openDoc" && $(this).is(':selected')) {
        console.log("openDoc");
      }else if (selectId == "addDoc" && $(this).is(':selected')){
        event.stopPropagation();
        console.log("addDoc");
        $('#modalEvidence').modal('show');
        collapseElement = 'false'
      }else if(selectId == "addDoc" && $(this).is(':selected')){
        console.log("addDoc");
      }
    })
  }
}

