function loadTitle(){
  var links = $('[class*=\'title-hseq\']')
    , allElement = $('[class*=\'panel-hseq\']')
    , title = $('.title-claim')
    , label = $('.label-claim')
    , allInputs = $('.allPanels input')
    , slider = $('.sliderRightPanel input.slider');


  console.log(slidersMemo);

  allElement.each(function(){
    var className = $(this)
    // var numberClass = className.attr('class').split(' ')[0].replace('title-hseq','').split('-');
      , numberClass = className.attr('class').split(' ')[1].replace('panel-hseq','').split('-')
      , panel = $('.panel-hseq' + numberClass.join('-'));


    clickOnClassName(numberClass, className,panel)

    if(isoObject[numberClass]['numberOfEvidence'] != undefined){
      var numberOfEvid = isoObject[numberClass]['numberOfEvidence'];
      var z;
      // console.log( $('#collapseExample'+ numberClass +' .well table tbody'))

      for(z = numberOfEvid  ; z >= 0; z--){
        $('#collapseExample'+ numberClass +' .well table tbody').prepend(makeTr(numberClass, z + 1 ));
//
        // makeTr(numberClass, z+1 )
      }
    }
  });

  function clickOnClassName(numberClass,className,panel) {
    $(className).on('click',  function (e) {
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

      // allElement.removeClass('panel-shadow');
      e.preventDefault();
      title.text(link);
      label.text(numberClassWithDots);

      addComments (classNameText);
      loadDescription(numberClass);


      // panel.addClass('panel-shadow');
      panel.children(':first').addClass('labelColor')
      panel.addClass('titleColor')
      // panel.children().not(':first').not(':last').addClass('labelColor')
     $('.right-panel .panel-title').addClass('labelColor')

      addClassNotCollapsed(classNameText);
      addEvidence(classNameText);
      console.log(slidersMemo)

      if(!isoObject[numberClass].children && !SzybkaOcena){

        allInputs.each(function (v,i) {
          var input = $(this);
          input.attr('disabled', 'disabled')
        });
        var clickedInput = $('input[name='+classNameText +']');
        clickedInput.removeAttr('disabled' )
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

function SetSelectAssessmentField(){
  var selectAssessmentValue = $('#selectAssessment');
    if(selectAssessmentMemo){
      selectAssessmentValue.val(selectAssessmentMemo)
    }

  selectAssessmentValue.on('change', function(){
    var allInputs = $('.allPanels input');
    selectAssessmentMemo = $('#selectAssessment').val();
    console.log(selectAssessmentMemo);

    $('#selectAssessment option').each(function() {
      var selectId = $(this).attr('id');
      if (selectId == "normalAssess" && $(this).is(':selected')) {
        SzybkaOcena = false;
      }else if (selectId == "fastAssess" && $(this).is(':selected')){
        SzybkaOcena = true;
        allInputs.each(function (v,i) {
          var input = $(this);
          input.removeAttr('disabled')
        });
      }else if(selectId == "noAssessment" && $(this).is(':selected')){
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
    console.log(input)
    slidersMemo[tempAssessmentObject.sliderName] = tempAssessmentObject.value;
    console.log(tempAssessmentObject)
    updateTopSlider();
    updateSlider(input, slidersMemo);
    notSavedAssessment=false;
    $('#myModal').modal('hide');

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
  var clickedPanel = $('.panel-hseq' + classNameText+' div.number');
  var clickedPanelButton = $('.panel-hseq' + classNameText+' div.button-expand')
    , clickedButton =$('.panel-hseq' + classNameText+' div.button-expand button i')
    , collapseElement = $('#collapseExample' + classNameText).attr('aria-expanded');

  clickedPanel.removeClass('number-not-collapsed');
  clickedPanelButton.removeClass('button-expand-not-collapsed');
  // console.log($('button[target = #collapseExample + classNameText]'))

  if(collapseElement == 'false' || collapseElement == undefined){
    clickedPanel.addClass('number-not-collapsed');
    clickedPanelButton.addClass('button-expand-not-collapsed')
    clickedButton.removeClass('fa-arrow-down')
    clickedButton.addClass('fa-arrow-up')
  }else{
    clickedButton.removeClass('fa-arrow-up')
    clickedButton.addClass('fa-arrow-down')

  }
}//addClassNotCollapsed

function addEvidence(classNameText){
  $('.btn.btn-primary.add').on('click', function(){
    var dataEvidence = $(this).attr('data-evidence')
      , modalEvidence = $('#modalEvidence')
      , buttonSave = $('.save-new-evid.btn.btn-primary');

    buttonSave.removeAttr('data-evidence');
    modalEvidence.removeAttr('data-name');
    modalEvidence.modal('show').attr('data-name', classNameText);
    buttonSave.attr('data-evidence', dataEvidence)
  })
}//addEvidence

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
    event.preventDefault();
    var modalEvidenceWindow = $('#modalEvidence')
      ,className = modalEvidenceWindow.attr('data-name')
      , nameOfFile = $('.form-control.name-evid').val()
      , nameOfEvidence = $('#textareaNameEvid').val()
      , rowCount = $('#' + className +' tbody').find('tr').length + 1
      , dataEvidence = $(this).attr('data-evidence');

    if(dataEvidence == undefined){
      isoObject[className]['nameDocument' + rowCount]= nameOfFile;
      isoObject[className]['nameEvidence' + rowCount]= nameOfEvidence;
      isoObject[className]['numberOfEvidence']= rowCount - 1;

      $('#collapseExample'+ className +' .well table tbody').append(makeTr(className,rowCount));
    }else if($('#collapseExample'+ className +' .well table tbody').find('tr.' + dataEvidence))
    {
      var replacedTr = $('#collapseExample'+ className +' .well table tbody').find('tr.' + dataEvidence);

      isoObject[className]['nameDocument' + dataEvidence]= nameOfFile;
      isoObject[className]['nameEvidence' + dataEvidence]= nameOfEvidence;
      isoObject[className]['numberOfEvidence']= rowCount - 2;
      replacedTr.replaceWith(makeTr(className,dataEvidence))
    }
    modalEvidenceWindow.modal('hide');

  });
}//attachEvidence

function makeTr(className, rowCount){
  var evidenceTr3 = $('<tr class=\'' + rowCount +'\'></tr>')
    , evidenceTr3Td1 = $('<th></th>').text(rowCount)
    , evidenceTr3Td2 = $('<td></td>').text(isoObject[className]['nameEvidence' + rowCount])

    , evidenceTr3Td3 = $('<td></td>')
    , evidenceTr3Td4 = $('<td></td>').text( isoObject[className]['nameDocument' + rowCount])
    , evidenceTr3Td5 = $('<td class="buttons"></td>')
    , buttonTr3OpenEvidence = $('<button type=\'button\' class=\'btn btn-primary open\' ></button>').append('<i class="fa fa-folder-open" data-toggle=\'tooltip\' data-placement=\'top\' title=\'Otwórz dowód\' aria-hidden="true"></i>')
    , buttonTr3AddEvidence = $('<button type=\'button\' class=\'btn btn-primary add\' data-evidence=\''+ rowCount+ '\' data-toggle=\'tooltip\' data-placement=\'top\' title=\'Edytuj dowód\'></button>').append ('<i class="fa fa-pencil" aria-hidden="true"></i>');

    evidenceTr3Td5.append(buttonTr3OpenEvidence,buttonTr3AddEvidence);
    evidenceTr3.append(evidenceTr3Td1,evidenceTr3Td2,evidenceTr3Td3,
    evidenceTr3Td4,evidenceTr3Td5);

  return evidenceTr3;

}//makeTr







