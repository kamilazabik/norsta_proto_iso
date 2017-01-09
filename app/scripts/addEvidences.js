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
