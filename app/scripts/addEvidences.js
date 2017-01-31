function addAttrToEvidenceWindow(classNameText){
  var buttonSubmit = $('button.save-new-evid')
    , textOfName = $('#textareaNameEvid')

    $('.btn.btn-primary.add.'+classNameText).on('click', function(){
      var dataEvidence = $(this).attr('data-evidence')
        , modalEvidence = $('#modalEvidence')
        , buttonSave = $('.save-new-evid.btn.btn-primary');

      buttonSave.removeAttr('data-evidence');
      modalEvidence.removeAttr('data-name');
      modalEvidence.modal('show').attr('data-name', classNameText);
      buttonSave.attr('data-evidence', dataEvidence);
      buttonSubmit.attr('disabled', 'disabled')

    if(dataEvidence){
      var nameOfFile = $('#'+ classNameText  + ' tr.' + dataEvidence + ' .nameDocument').text()
        , nameOfEvidence = $('#'+ classNameText  + ' tr.' + dataEvidence + ' .nameEvidence').text();

      $('.form-control.name-evid').val(nameOfFile);
      textOfName.val(nameOfEvidence);
      buttonSubmit.removeAttr('disabled')
    }else{
      $('.form-control.name-evid').val('');
      textOfName.val('');
      textOfName.attr('placeholder','Wpisz nazwę')
    }
  });
}//addEvidence

function addNewEvidence() {
  var buttonSubmit = $('button.save-new-evid');

  $(document).on('click', '.browse', function(event){
    var file = $(this).parent().parent().parent().find('.file');
    event.preventDefault();
    file.trigger('click');
    buttonSubmit.removeAttr('disabled');
    existingEvidence = false;
  });
  $(document).on('change', '.file', function(event){
    $(this).parent().find('.form-control').val($(this).val().replace(/C:\\fakepath\\/i, ''));
    existingEvidence = false;
  });

  var evidenceFromList;
  $(document).on('click', '.modal-tabel-evidences td', function(){
    $('tr').removeClass('clicked-tr');
    evidenceFromList = $(this);
    var clickedTr = evidenceFromList.parent();
    buttonSubmit.removeAttr('disabled');
    existingEvidence = true;
    clickedTr.addClass('clicked-tr');
  });

  $(document).on('click','.save-new-evid', function( event ) {
    var dataEvidence = $(this).attr('data-evidence');
    saveEvidence(evidenceFromList, dataEvidence)
  });
}//attachEvidence

function saveEvidence(evidenceFromList, dataEvidence){
  var modalEvidenceWindow = $('#modalEvidence')
    , className = modalEvidenceWindow.attr('data-name')
    , nameOfFile = $('.form-control.name-evid').val()
    , nameOfEvidence = $('#textareaNameEvid').val()
    , rowCount = $('#' + className +' tbody').find('tr').length + 1
    , buttonExpandAdded = $('.btn.btn-primary.expand.'+className)
    , rowInEvidenceWindow = $('#modalEvidence tbody')
    , rowCountInEvidenceWindow = rowInEvidenceWindow.find('tr').length + 1
    , nameOfEvidenceFromList
    , nameOfFileFromList
    , clickedPanel = $('.panel-hseq' + className+' div.number')
    , clickedPanelButton = $('.panel-hseq' + className+' div.button-expand')
    , buttonOpenDetails = $('button.expand.'+ className)
    , collapsePanelClass = $('#collapsePanelDetails' + className)

  $('tr').removeClass('clicked-tr');

  if(evidenceFromList){
    nameOfFileFromList = evidenceFromList.parent().children().eq(1).text();
    nameOfEvidenceFromList = evidenceFromList.parent().children().eq(2).text();
  }

  if(dataEvidence == undefined){

    if(existingEvidence && !nameOfFile)  {

      isoObject[className]['nameDocument' + rowCount]= nameOfFileFromList;
      isoObject[className]['nameEvidence' + rowCount]= nameOfEvidenceFromList;
      isoObject[className]['numberOfEvidence']= rowCount - 1;
      $('#collapsePanelDetails'+ className +' .well table tbody').append(makeTr(className,rowCount));
      existingEvidence = false;

    }else if(!existingEvidence && nameOfFile){
      isoObject[className]['nameDocument' + rowCount]= nameOfFile;
      isoObject[className]['nameEvidence' + rowCount]= nameOfEvidence;
      isoObject[className]['numberOfEvidence']= rowCount - 1;

      $('#collapsePanelDetails'+ className +' .well table tbody').append(makeTr(className,rowCount));
      rowInEvidenceWindow.append(makeTrInEvidencesWidnow(className,rowCount, rowCountInEvidenceWindow));
    }

  }else if($('#collapsePanelDetails'+ className +' .well table tbody').find('tr.' + dataEvidence))
  {
    var replacedTr = $('#collapsePanelDetails'+ className +' .well table tbody').find('tr.' + dataEvidence);

    if(existingEvidence){
      isoObject[className]['nameDocument' + dataEvidence]= nameOfFileFromList;
      isoObject[className]['nameEvidence' + dataEvidence]= nameOfEvidenceFromList;
      isoObject[className]['numberOfEvidence']= rowCount - 2;
      replacedTr.replaceWith(makeTr(className,dataEvidence));
      existingEvidence = false;
    }else{
      isoObject[className]['nameDocument' + dataEvidence]= nameOfFile;
      isoObject[className]['nameEvidence' + dataEvidence]= nameOfEvidence;
      isoObject[className]['numberOfEvidence']= rowCount - 2;
      replacedTr.replaceWith(makeTr(className,dataEvidence));
    }
  }


  modalEvidenceWindow.modal('hide');
  collapsePanelClass.removeClass('hidden-xl hidden-lg');
  buttonExpandAdded.attr('aria-expanded', true).removeClass('collapsed');
  $('.button-expand i').removeClass('fa-arrow-down').addClass('fa-arrow-up');
  buttonOpenDetails.removeClass('hidden-lg').removeClass('hidden-xl');
  clickedPanel.addClass('number-not-collapsed');
  clickedPanelButton.addClass('button-expand-not-collapsed');
  collapsePanelClass.attr('aria-expanded', true).addClass('in').addClass('collapse').css('height', '100%');

}


function makeTr(className, rowCount ){
  var evidenceTr3 = $('<tr class=\'' + rowCount +'\'></tr>')
    , evidenceTr3Td1 = $('<th></th>').text(rowCount)
    , evidenceTr3Td2 = $('<td class="nameEvidence"></td>').text(isoObject[className]['nameEvidence' + rowCount])

    , evidenceTr3Td3 = $('<td></td>')
    , evidenceTr3Td4 = $('<td class="nameDocument"></td>').text( isoObject[className]['nameDocument' + rowCount])
    , evidenceTr3Td5 = $('<td class="buttons"></td>')
    , buttonTr3OpenEvidence = $('<button type=\'button\' class=\'btn btn-primary open\' ></button>').append('<i class="fa fa-folder-open" data-toggle=\'tooltip\' data-placement=\'top\' title=\'Otwórz dowód\' aria-hidden="true"></i>')
    , buttonTr3EditEvidence = $('<button type=\'button\' class=\'btn btn-primary add ' +className+ '\' data-evidence=\''+ rowCount+ '\' data-toggle=\'tooltip\' data-placement=\'top\' title=\'Edytuj dowód\'></button>').append ('<i class="fa fa-pencil" aria-hidden="true"></i>');

  buttonTr3EditEvidence.on('click', function () {
    addAttrToEvidenceWindow(className)
  });

  evidenceTr3Td5.append(buttonTr3OpenEvidence,buttonTr3EditEvidence);
  evidenceTr3.append(evidenceTr3Td1,evidenceTr3Td2,evidenceTr3Td3,
  evidenceTr3Td4,evidenceTr3Td5);

  return evidenceTr3;

}//makeTr


function makeTrInEvidencesWidnow(className, rowCount,rowCountInEvidenceWindow){
  var evidenceTr3 = $('<tr class=\'' + rowCountInEvidenceWindow +'\'></tr>')
    , evidenceTr3Td1 = $('<th></th>').text(rowCountInEvidenceWindow)
    , evidenceTr3Td2 = $('<td class="hidden"></td>').text(isoObject[className]['nameEvidence' + rowCount])
    , evidenceTr3Td3 = $('<td></td>')
    , evidenceTr3Td4 = $('<td></td>').text( isoObject[className]['nameDocument' + rowCount])
    , evidenceTr3Td5 = $('<td class="buttons"></td>')
    , buttonTr3SeeEvidence = $('<button type=\'button\' class=\'btn btn-primary btn-sm\' ></button>').text('Podgląd');

  evidenceTr3Td5.append(buttonTr3SeeEvidence);
  evidenceTr3.append(evidenceTr3Td1,evidenceTr3Td4,evidenceTr3Td2,evidenceTr3Td3,evidenceTr3Td5);

  return evidenceTr3;

}//
