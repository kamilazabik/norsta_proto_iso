function loadTitle(){
  var links = $('[class*=\'title-hseq\']')
    , allElement = $('[class*=\'panel-hseq\']')
    , title = $('.title-claim')
    , label = $('.label-claim')
    , allInputs = $('.allPanels input')
    , slider = $('.sliderRightPanel input.slider');
  // console.log(slidersMemo);

  allElement.each(function(){
    var className = $(this)
      , numberClass = className.attr('class').split(' ')[1].replace('panel-hseq','').split('-')
      , panel = $('.panel-hseq' + numberClass.join('-'))

    clickOnClassName(numberClass, className,panel)
    addEvidence(numberClass);

    if(isoObject[numberClass]['numberOfEvidence'] != undefined){
      var numberOfEvid = isoObject[numberClass]['numberOfEvidence'];
      var z;
      for(z = numberOfEvid  ; z >= 0; z--){
        $('#collapseEvidence'+ numberClass +' .well table tbody').prepend(makeTr(numberClass, z + 1 ));
      }
    }
  });

  function clickOnClassName(numberClass,className,panel) {

    className.on('click', function (e) {
      e.preventDefault();

      var classNameText = numberClass.join('.')
        , link = $('.title-hseq' + classNameText).text()
        , inputs =$(this).children().find('input')
        , inputName = inputs.attr('name')
        , numberClassWithDots = addDotsForLabels(numberClass.join(''))
        , panel = $('.panel-hseq' + classNameText);

      $('.hseq.space').removeClass('cursor');
      panel.addClass('cursor');
      $('.addedComment').attr('data-name', classNameText);
      $('.editable_text').on('click', divClicked);
      $('.panel-title').removeClass('labelColor');
      allElement.children().removeClass('labelColor');
      allElement.removeClass('titleColor');

      title.text(link);
      label.text(numberClassWithDots);

      addComments (classNameText);
      loadDescription(numberClass);

      panel.children(':first').addClass('labelColor');
      panel.addClass('titleColor');
     $('.right-panel .panel-title').addClass('labelColor');



      if(!isoObject[numberClass].children && !SzybkaOcena){
        allInputs.each(function (v,i) {
          var input = $(this);
          input.attr('disabled', 'disabled')
        });
        var clickedInput = $('input[name='+classNameText +']');
        clickedInput.removeAttr('disabled' )
      }

      // if(!SzybkaOcena){
      //   $('.button-expand-three div div button').on('click', function (e) {
      //     notSavedAssessment=true;
      //     $('#myModal').modal('show');
      //     // e.stopPropagation()
      //   })
      // }
      // if(notSavedAssessment && !SzybkaOcena) {
      //     $('#myModal').modal('show');
      //   //TODO:
      //   //Alert ze nie zapisana ocena z wyborem zapisz/anuluj
      //   // SaveAssessment();
      //   // CancelAssessment();
      // }
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

function SetSelectAssessmentField(){
  var selectAssessmentValue = $('#selectAssessment');
    if(selectAssessmentMemo){
      selectAssessmentValue.val(selectAssessmentMemo)
    }

  selectAssessmentValue.on('change', function(){
    var allInputs = $('.allPanels input');
    selectAssessmentMemo = $('#selectAssessment').val();


    $('#selectAssessment option').each(function() {
      var selectId = $(this).attr('id');
      if (selectId == "normalAssess" && $(this).is(':selected')) {
        SzybkaOcena = false;
      }else if (selectId == "fastAssess" && $(this).is(':selected')){
        SzybkaOcena = true;

        allInputs.each(function (v,i) {
          var input = $(this);
          if(!input.attr('data-children')){
            input.removeAttr('disabled')
          }
        });
      }else if(selectId == "noAssessment" && $(this).is(':selected')){

      }
    })
  })
}//SetSelectAssessmentField


function SetAssessmentField(buttonClass) {
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
  if(tempAssessmentObject)
  {
    var sliderName;
    $.each(tempAssessmentObject, function (i, v) {
      var input = $('input[name=' + i + ']');
      slidersMemo[i] = v;
      sliderName = i;
    });
    notSavedAssessment=false;
    tempAssessmentObject = {};

    //Refresh parents
    savingAssessment=true;
    updateSlider($('input[name=' + sliderName + ']'), null);
    savingAssessment=false;
  }
  // if(tempAssessmentObject && tempAssessmentObject.sliderName)
  // {
  //   var input = $('input[name=' + tempAssessmentObject.sliderName + ']');
  //   // slidersMemo[tempAssessmentObject.sliderName] = tempAssessmentObject.value;
  //   slidersMemo[tempAssessmentObject.sliderName] = tempAssessmentObject.value;
  //   console.log(tempAssessmentObject);
  //   updateTopSlider();
  //   updateSlider(input, slidersMemo);
  //   notSavedAssessment=false;
  //   $('#myModal').modal('hide');
  // }
  $('#myModal').modal('hide');
}//SaveAssessment

function CancelAssessment() {
  if(tempAssessmentObject)
  {
    {
      $.each(tempAssessmentObject, function (i, v) {
        var input = $('input[name=' + i + ']');
        updateSlider(input, slidersMemo);
      });
    notSavedAssessment=false;
  }

  // if(tempAssessmentObject && tempAssessmentObject.sliderName)
  // {
  //   var input = $('input[name=' + tempAssessmentObject.sliderName + ']');
  //   // updateSlider(input, slidersMemo);
  //   console.log(input)
  //   updateSlider(input, slidersMemo);
  //   notSavedAssessment=false;
  //   $('#myModal').modal('hide')
  }
  $('#myModal').modal('hide');
}//CancelAssessment

function addClassNotCollapsed(classNameText){
  var clickedPanel = $('.panel-hseq' + classNameText+' div.number')
    , clickedPanelButton = $('.panel-hseq' + classNameText+' div.button-expand')
    , clickedButton =$('.panel-hseq' + classNameText+' div.button-expand button.btn.btn-primary.expand')
    , clickedButtonIcon =$('.panel-hseq' + classNameText+' div.button-expand button i')
    , collapseElement = $('#collapseEvidence' + classNameText).attr('aria-expanded');

  clickedPanel.removeClass('number-not-collapsed');
  clickedPanelButton.removeClass('button-expand-not-collapsed');

  $('.panel-body').off('click');

    if(collapseElement == 'false' || collapseElement == undefined){
      clickedPanel.addClass('number-not-collapsed');
      clickedPanelButton.addClass('button-expand-not-collapsed');
      clickedButtonIcon.removeClass('fa-arrow-down');
      clickedButtonIcon.addClass('fa-arrow-up');
      clickedButton.attr('title','Zwiń dowody');
    }else{
      clickedButtonIcon.removeClass('fa-arrow-up');
      clickedButtonIcon.addClass('fa-arrow-down');
      clickedButton.attr('title', 'Rozwiń dowody');
    }
}//addClassNotCollapsed

//
// function openProfile(){
//
//   $('#profile').on('click', function (e) {
//     $('footer').css('visibility', 'hidden')
//     console.log($('#profile'))
//   })
//
// }






