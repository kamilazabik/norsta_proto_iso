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
        , numberClassWithDots = addDotsForLabels(numberClass.join(''));

      $('.addedComment').attr('data-name', classNameText);
      $('.editable_text').on('click', divClicked);

      allElement.removeClass('panel-shadow');
      e.preventDefault();
      title.text(link);
      label.text(numberClassWithDots);

      addComments (classNameText);
      loadDescription(numberClass);

      panel.addClass('panel-shadow');

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

function SetSelectAssessmentField() {
    $('#normalAssess').click(function () {
      SzybkaOcena = false;
      console.log('NormalnaOcena')
    });

    $('#fastAssess').click(function () {
        SzybkaOcena = true;
      console.log('SzybkaOcena')
    });
}//SetSelectAssessmentField

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
    slidersMemo[tempAssessmentObject.sliderName] = tempAssessmentObject.value;
    updateTopSlider();
    notSavedAssessment=false;
    // console.log(notSavedAssessment)
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



