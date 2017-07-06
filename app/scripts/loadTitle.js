function loadTitle(){
  var allElement = $('[data-panel]')
    , label = $('.label-claim')
    , slider = $('.sliderRightPanel input.slider');

  allElement.each(function(){
    var className = $(this)
      , numberClass = className.attr('data-panel')
      , panel = $('[data-button = \'' + numberClass + '\']');

    clickOnClassName(numberClass, className, panel);
    addAttrToEvidenceWindow(numberClass);
    loadPageWithEvidences(numberClass);

  });
}//loadTitle

function loadPageWithEvidences(numberClass){
  if(isoObject[numberClass]['numberOfEvidence'] != undefined){
    var numberOfEvid = isoObject[numberClass]['numberOfEvidence'];
    var z;
    for(z = numberOfEvid  ; z >= 0; z--){
      $('#collapsePanelDetails'+ numberClass +' .well table tbody').prepend(makeTr(numberClass, z + 1 ));
    }
  }
}//loadPageWithEvidences


function clickOnClassName(numberClass,className,panel) {
    var allInputs = $('.allPanels input');


  className.on('click', function (e) {
    e.preventDefault();
    var classNameText = numberClass;
    changeBackgroundToRightPanel(numberClass,classNameText);

    blockInput(numberClass, allInputs);
    addComments (classNameText);
    loadDescription(numberClass);
  });
}//clickOnClassName

function changeBackgroundToRightPanel(numberClass,classNameText) {
    var link = $('[data-title = \'' + classNameText + '\']').text()
      , numberClassWithDots = addDotsForLabels(numberClass)
      , panel = $('[data-panel = \'' + classNameText + '\']')
      , allElement = $('[data-panel]')
      , title = $('.title-claim')
      , label = $('.label-claim')
      , rightPanel = $('.right-panel .panel-heading');


  $('[data-comment]').attr('data-name', classNameText);
  $('.editable_text').on('click', divClicked);
  // $('.panel-title').removeClass('panel-block__number--clicked');

  allElement.children().removeClass('clicked-blue').removeClass('clicked-yellow').removeClass('clicked-blue-title');
  allElement.children('.panel-block-assessment').children().children().removeClass('.clicked-yellow');
  allElement.children('.panel-title-assessment').children().children().removeClass('.clicked-yellow');

  panel.children(':first').addClass('clicked-blue');
  panel.children().slice(1, -3).addClass('clicked-blue-title');
  panel.children().slice(2).addClass('clicked-yellow');
  panel.children('panel-block-assessment').children().children().addClass('clicked-yellow');
  panel.children('panel-title-assessment').children().children().addClass('clicked-yellow');

  title.text(link);
  label.text(numberClassWithDots);
  rightPanel.addClass('.clicked-blue');
}


function blockInput(numberClass, allInputs){
  if(!isoObject[numberClass].children && !SzybkaOcena){
    allInputs.each(function (v,i) {
      var input = $(this);
      input.attr('disabled', 'disabled')
    });
    var clickedInput = $('input[name='+numberClass +']');
    clickedInput.removeAttr('disabled' )
  }
}

function addComments (classNameText){
  var comment = $('.evidences-content-assess__added-comment');


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
      if (selectId == 'normalAssess' && $(this).is(':selected')) {
        SzybkaOcena = false;
      }else if (selectId == 'fastAssess' && $(this).is(':selected')){
        SzybkaOcena = true;

        allInputs.each(function (v,i) {
          var input = $(this);
          if(!input.attr('data-children')){
            input.removeAttr('disabled')
          }
        });
      }else if(selectId == 'noAssessment' && $(this).is(':selected')){

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
  }
  $('#myModal').modal('hide');
}//CancelAssessment

function addClassNotCollapsed(classNameText){
  var clickedPanelNumber = $('[data-panel=\'' + classNameText + '\']' + ' .panel-block-number')
    , clickedPanelButton = $('[data-panel=\'' + classNameText + '\']' + ' .panel-block-buttons')
    , clickedPanelAssessment = $('[data-panel=\'' + classNameText + '\']' + ' .panel-block-assessment')
    , clickedButton = $('[data-panel=\'' + classNameText + '\']' + ' .panel-block-buttons .btn-expand')
    , clickedButtonIcon = $('[data-panel=\'' + classNameText + '\']' + ' .panel-block-buttons .btn-expand i')
    , collapseElement = $('#collapsePanelDetails' + classNameText).attr('aria-expanded');


  console.log(clickedPanelNumber);
  console.log(clickedPanelButton);

  clickedPanelNumber.removeClass('panel-block-number--not-collapsed');
  clickedPanelButton.removeClass('panel-block-buttons--not-collapsed');
  clickedPanelAssessment.removeClass('panel-block-assessment--not-collapsed');

  $('.panel-body').off('click');

    if(collapseElement == 'false' || collapseElement == undefined){
      clickedPanelNumber.addClass('panel-block-number--not-collapsed');
      clickedPanelButton.addClass('panel-block-buttons--not-collapsed');
      clickedPanelAssessment.addClass('panel-block-assessment--not-collapsed');
      clickedButtonIcon.removeClass('fa-arrow-down');
      clickedButtonIcon.addClass('fa-arrow-up');
      clickedButton.attr('title','Zwiń dowody');
    }else{
      clickedButtonIcon.removeClass('fa-arrow-up');
      clickedButtonIcon.addClass('fa-arrow-down');
      clickedButton.attr('title', 'Rozwiń dowody');
    }
}//addClassNotCollapsed






