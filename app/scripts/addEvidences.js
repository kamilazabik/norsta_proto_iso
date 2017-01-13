function addEvidence(classNameText){
    $('.btn.btn-primary.add.'+classNameText).on('click', function(){
      var dataEvidence = $(this).attr('data-evidence')
        , modalEvidence = $('#modalEvidence')
        , buttonSave = $('.save-new-evid.btn.btn-primary');

      buttonSave.removeAttr('data-evidence');
      modalEvidence.removeAttr('data-name');
      modalEvidence.modal('show').attr('data-name', classNameText);
      buttonSave.attr('data-evidence', dataEvidence)
      console.log( $('.btn.btn-primary.add.'+classNameText))
    });

// var clickedButton = $('.panel-hseq' + classNameText+' div.button-expand button');
//
//   clickedButton.on('click', function (e) {
//     addClassNotCollapsed(classNameText);
//   });

}//addEvidence

function saveEvidence() {
  var modalEvidenceWindow1 = $('#modalEvidence')
  var className1 = modalEvidenceWindow1.attr('data-name')
  console.log(className1)

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
      , className = modalEvidenceWindow.attr('data-name')
      , nameOfFile = $('.form-control.name-evid').val()
      , nameOfEvidence = $('#textareaNameEvid').val()
      , rowCount = $('#' + className +' tbody').find('tr').length + 1
      , dataEvidence = $(this).attr('data-evidence')
      , placeForButtonEvidence = $('.col-xl-1-2.col-lg-1-2.col-md-1-6.col-sm-1-4.col-xs-2.box-under-header-sx.button-expand.' + className)
      , buttonExpandEvidences = $('<button type=\'button\' class=\'btn btn-primary expand ' + className + '\' data-toggle=\'collapse\' aria-expanded=\'true\'  name=\'search\' data-target=\'#collapseExample' + className + '\' aria-controls=\'collapseExample' + className + '\' title=\'Zwiń dowody\'></button>')
      , buttonEvidencesIcon = $('<i class=\'fa fa-arrow-up\' aria-hidden=\'true\'></i>')
      , buttonExpandAdded = $('.btn.btn-primary.expand.'+className)
      , rowInEvidenceWindow = $('#modalEvidence tbody')
      , rowCountInEvidenceWindow = rowInEvidenceWindow.find('tr').length + 1;

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


    //
    // var buttonTr3EditEvidence = $('.btn.btn-primary add ' +className')
    // buttonTr3EditEvidence.on('click', function () {
    //   addEvidence(className)
    // });
    //

    rowInEvidenceWindow.append(makeTrInEvidencesWidnow(className,rowCount, rowCountInEvidenceWindow));

    modalEvidenceWindow.modal('hide');

    if(buttonExpandAdded.length == 0){
      buttonExpandEvidences.append(buttonEvidencesIcon)
      placeForButtonEvidence.append(buttonExpandEvidences)
    }else {
      buttonExpandAdded.attr('aria-expanded', true).removeClass('collapsed')
      $('.button-expand i').removeClass('fa-arrow-down').addClass('fa-arrow-up')
    }
    buttonExpandEvidences.on('click', function (e) {
      addClassNotCollapsed(className);
    });
    $('#collapseExample'+ className).attr('aria-expanded', true).addClass('in').addClass('collapse').css('height', '100%')
  });
}//attachEvidence





function makeTr(className, rowCount ){
  var evidenceTr3 = $('<tr class=\'' + rowCount +'\'></tr>')
    , evidenceTr3Td1 = $('<th></th>').text(rowCount)
    , evidenceTr3Td2 = $('<td></td>').text(isoObject[className]['nameEvidence' + rowCount])

    , evidenceTr3Td3 = $('<td></td>')
    , evidenceTr3Td4 = $('<td></td>').text( isoObject[className]['nameDocument' + rowCount])
    , evidenceTr3Td5 = $('<td class="buttons"></td>')
    , buttonTr3OpenEvidence = $('<button type=\'button\' class=\'btn btn-primary open\' ></button>').append('<i class="fa fa-folder-open" data-toggle=\'tooltip\' data-placement=\'top\' title=\'Otwórz dowód\' aria-hidden="true"></i>')
    , buttonTr3EditEvidence = $('<button type=\'button\' class=\'btn btn-primary add ' +className+ '\' data-evidence=\''+ rowCount+ '\' data-toggle=\'tooltip\' data-placement=\'top\' title=\'Edytuj dowód\'></button>').append ('<i class="fa fa-pencil" aria-hidden="true"></i>');

  buttonTr3EditEvidence.on('click', function () {
    addEvidence(className)
  });


  evidenceTr3Td5.append(buttonTr3OpenEvidence,buttonTr3EditEvidence);
  evidenceTr3.append(evidenceTr3Td1,evidenceTr3Td2,evidenceTr3Td3,
  evidenceTr3Td4,evidenceTr3Td5);


  return evidenceTr3;

}//makeTr


function makeTrInEvidencesWidnow(className, rowCount,rowCountInEvidenceWindow){
  var evidenceTr3 = $('<tr class=\'' + rowCountInEvidenceWindow +'\'></tr>')
    , evidenceTr3Td1 = $('<th></th>').text(rowCountInEvidenceWindow)
    // , evidenceTr3Td2 = $('<td></td>').text(isoObject[className]['nameEvidence' + rowCount])
    , evidenceTr3Td3 = $('<td></td>')
    , evidenceTr3Td4 = $('<td></td>').text( isoObject[className]['nameDocument' + rowCount])
    , evidenceTr3Td5 = $('<td class="buttons"></td>')
    , buttonTr3SeeEvidence = $('<button type=\'button\' class=\'btn btn-primary btn-sm\' ></button>').text('Podgląd')

  evidenceTr3Td5.append(buttonTr3SeeEvidence);
  evidenceTr3.append(evidenceTr3Td1,evidenceTr3Td4,evidenceTr3Td3,evidenceTr3Td5);

  return evidenceTr3;

}//
