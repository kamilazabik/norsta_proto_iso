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
    console.log(className)

    $(className).on('click', function (e) {

      var t = $(this).children().find('input').attr('name')

      console.log(t)

      var classNameText = numberClass.join('.')
        , link = $('.title-hseq' + classNameText).text()
        , inputs =$(this).children().find('input')
        , inputName = inputs.attr('name')

      $('.addedComment').attr('data-name', classNameText);
      $('.editable_text').on('click', divClicked);


      allElement.removeClass('panel-shadow');
      e.preventDefault();
      title.text(link);
      label.text(numberClass.join('.'));

      addComments (classNameText)

      // changeSlider(classNameText);

      loadDescription(numberClass);


      panel.addClass('panel-shadow');

      if(!isoObject[numberClass] || !isoObject[numberClass].children){
        console.log(inputs);
        console.log(classNameText);
        // removeAssess(classNameText,slider);

        allInputs.each(function () {
          $('input').attr('disabled', 'disabled')
        });
        var clickedInput = $('input[name='+classNameText +']');
        clickedInput.removeAttr('disabled' );

      }

      if(notSavedAssessment && !SzybkaOcena)
      {
        //TODO:
        $('#myModal').modal('show')
        //Alert ze nie zapisana ocena z wyborem zapisz/anuluj
        //SaveAssessment();
        //CancelAssessment();
      }
    });

    // $('.sliderRightPanel').on('click', function (e) {
    //
    //   var classNameText = numberClass.join('.');
    //
    //   var input = $('input[name='+numberClass +']');
    //   // console.log(input);
    //
    //   // changeSlider(classNameText);
    //   updateSlider(input, slidersMemo);
    // })
  }
}//loadTitle


function addComments (classNameText){
  var comment = $('.addedCom');

  if(!isoObject[classNameText] ||!isoObject[classNameText].comment ){
    comment.text('');
  }else{
    comment.text(isoObject[classNameText].comment);
  }
}


function SetSelectAssessmentField()
{
    $('#normalAsses').click(function () {
      SzybkaOcena = false;
      console.log(SzybkaOcena)
    });

    $('#fastAsses').click(function () {
        SzybkaOcena = true;
        console.log(SzybkaOcena)
    });
}

function SetAssessmentField()
{
  $('#saveAssess').on('click', function () {
      SaveAssessment();
  });

  $('#removeAssess').on('click', function () {
      CancelAssessment();
  })
}

function SaveAssessment()
{
  if(tempAssessmentObject && tempAssessmentObject.sliderName)
  {
    slidersMemo[tempAssessmentObject.sliderName] = tempAssessmentObject.value;
    updateTopSlider();
    notSavedAssessment=false;
    $('#myModal').modal('hide')
  }
}

function CancelAssessment()
{
  if(tempAssessmentObject && tempAssessmentObject.sliderName)
  {
    var input = $('input[name=' + tempAssessmentObject.sliderName + ']');
    updateSlider(input, slidersMemo);
    notSavedAssessment=false;
    $('#myModal').modal('hide')
  }
}
