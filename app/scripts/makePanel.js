function makeMainPanel(){
  var mainPanel = $('<div id="main-panel"></div>')
    , col = $('<div class="col-md-12 col-sm-12 col-xs-12"></div>')
    , col1 = $('<div class="col-md-12 col-sm-12 col-xs-12"></div>')
    , col1row = $('<div class="row fixedPos box-header"></div>')
    , col1rowTitleMain = $('<div class="col-lg-6 col-md-5 col-sm-5 col-xs-12 pull-left title-main"></div>')
    , col1rowTitleMainH3 = $('<h3 class="title-hseqA0"></h3>').text('Ocena zgodności Systemu Zarządzania Bezpieczeństwem Informacji z wymaganiami ISO 27001:2014')

    , col1rowAssess = $('<div class="col-lg-1 col-md-1 col-sm-1 col-xs-2 assessment pull-left"></div>')
    , col1rowAssessPie = $('<div class="pie pull-left" data-name="A"></div>')

    , col1rowAssess1 = $('<div class="col-lg-1 col-md-2 col-sm-2 col-xs-2 pull-left assessment"></div>')
    , col1rowAssess1numVal = $('<h4 class="text-left numberValueA"></h4>')
    , col1rowAssess1numValPer = $('<h4 class="text-left numberValue-perA"></h4>')

    , col1rowBar = $('<div class="col-lg-2 col-md-2 col-sm-2 col-xs-4 bar-slider"></div>')
    , col1rowBarInput = $('<input class="slider" value="0" min="0" max="1500" step="1" name="A" data-children="A5,A6,A7,A8,A9,A10,A11,A12,A13,A14,A15,A16,A17,A18" type="range" disabled>')

    , col1rowButtons = $('<div class="col-lg-2 col-md-2 col-sm-2 col-xs-4 pull-left filter"></div>')
    , col1rowButtonsSelect = $('<select id="selectAssessment" class="form-control" ></select>')
    , col1rowButtonsSelectOption1 = $('<option id="normalAssess">Normalna ocena</option>')
    , col1rowButtonsSelectOption2 = $('<option id="fastAssess">Szybka ocena</option>')
    , col1rowButtonsSelectOption3 = $('<option id="noAssessment">Brak oceny</option>');

  col1rowButtonsSelect.append(col1rowButtonsSelectOption1,col1rowButtonsSelectOption2,     col1rowButtonsSelectOption3);
  col1rowButtons.append(col1rowButtonsSelect);
  col1rowTitleMain.append(col1rowTitleMainH3);
  col1rowAssess.append(col1rowAssessPie);
  col1rowAssess1.append(col1rowAssess1numVal,col1rowAssess1numValPer);
  col1rowBar.append(col1rowBarInput);
  col1row.append(col1rowTitleMain,col1rowAssess,col1rowAssess1,col1rowBar,col1rowButtons);
  col1.append(col1row);
  col.append(col1);
  mainPanel.append(col);

  return mainPanel;

}//makeMainPanel

function makePanelsTitle(numberClass, oneTitle){

  var numberClassWithDots = addDotsForLabels(numberClass)
    , paddingContent = $('.col-xl-9.col-lg-9.col-md-12.col-sm-12.col-xs-12.pull-left.padding-content')
    , panelTitle= $('<div class="panel panel-default panels-title allPanels"></div>')
    , panelHeading = $('<div class="panel-heading"></div>')
    , rowPanel = $('<div class="row panel-hseq' + numberClass+' panels box-under-header"></div>')
    , colNumber = $('<div class="col-xl-0-8 col-lg-1 col-md-1-2 col-sm-1 col-xs-2 pull-left number"></div>')
    , colNumberH4 = $('<h4 class="lab-hseq"></h4>')
    , colTitle = $('<div class="col-xl-5-2 col-lg-5 col-md-4 col-sm-4 col-xs-10 pull-left title"></div>')
    , colTitleH4 = $('<h4 class="title-hseq'+numberClass+'"></h4>').text(oneTitle)
    , colAssess = $('<div class="col-xl-2 col-lg-2 col-md-2-2 col-sm-2-6 col-xs-4 assessment"></div>')
    , colAssesstRow = $('<div class="row"></div>')
    , colAssessRowCol1 = $('<div class="col-lg-6 col-md-6 col-sm-6 col-xs-7"></div>')
    , colAssessRowCol2 = $('<div class="col-lg-6 col-md-6 col-sm-6 col-xs-5"></div>')
    , colAssessRowColPie = $('<div class="pie pull-left"></div>')
    , colAssessRowColNumValue = $('<h5 class="text-left numberValue'+numberClass+'"></h5>')
    , colAssessRowColNumValuePer = $('<h5 class="text-left numberValue-per'+numberClass+'"></h5>')
    , colBar = $('<div class="col-xl-2-8 col-lg-2-6 col-md-3 col-sm-2-8 col-xs-5-2 bar-slider"></div>')
    , colButton = $('<div class="col-xl-1-2 col-lg-1-4 col-md-1-6 col-sm-1-6 col-xs-2-8 button-expand-three"></div>')
    , colButtonRow1 = $('<div class="row"></div>')
    , colButtonRow1Col1 = $('<div class="col-xl-12 col-lg-12 col-md-12">')
    , colButtonRow2 = $('<div class="row"></div>')
    , colButtonRow2Col1 = $('<div class="col-xl-12 col-lg-12 col-md-12"></div>')
    , panelBody = $('<div class="panel-body panel-content panels"></div>')
    , colFilterGroup = $('<div class="col-md-12 filter-group"></div>')




// , buttonExpandEvidences = $('<button type=\'button\' class=\'btn btn-primary expand ' + numberClass + '\' data-toggle=\'collapse\' aria-expanded=\'false\'  name=\'search\' data-target=\'#collapsePanelDetails' + numberClass + '\' aria-controls=\'collapsePanelDetails' + numberClass + '\' title=\'Rozwiń dowody\'></button>')
//     , evidenceID = $('<div id=\'collapsePanelDetails' + numberClass + '\' class=\'col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12 collapse evidences\'></div>')

  colButtonRow1.append(colButtonRow1Col1);
  colButtonRow2.append(colButtonRow2Col1);
  colAssessRowCol2.append(colAssessRowColNumValue, colAssessRowColNumValuePer);
  colAssessRowCol1.append(colAssessRowColPie);
  colAssesstRow.append(colAssessRowCol1, colAssessRowCol2);
  colAssess.append(colAssesstRow);
  colNumber.append(colNumberH4);
  colTitle.append(colTitleH4);
  panelBody.append(colFilterGroup);
  rowPanel.append(colNumber, colTitle,colAssess,colBar, colButton);
  panelHeading.append(rowPanel);
  panelTitle.append(panelHeading).append(panelBody);
  paddingContent.append(panelTitle);

  var siblings = isoObject[isoObject[numberClass].parent].children.split(',')
    , indexOfnumberClass = siblings.indexOf(numberClass)
    , nextSibling = siblings[indexOfnumberClass + 1]
    , prevSibling = siblings[indexOfnumberClass - 1];

  var pie = $('.panel-heading .pie').attr('data-name', numberClass)
    , arrowLeft = $('<i class=\'fa fa-angle-double-left\' aria-hidden=\'true\'></i>')
    , arrowRight = $('<i class=\'fa fa-angle-double-right\' aria-hidden=\'true\'></i>')
    , buttonUp = $('<button type=\'button\' class=\'claim-hseq' + isoObject[numberClass].parent + ' btn btn-primary btn-sm custom-btn up\' name=\''+ isoObject[numberClass].parent+'\'>Do góry</button>');
  var buttonLeft = $('<button type=\'button\' class=\'claim-hseq' + prevSibling + ' btn btn-primary btn-sm custom-btn arrow\'></button>').append(arrowLeft);
  var buttonRight = $('<button type=\'button\' class=\'claim-hseq' + nextSibling + ' btn btn-primary btn-sm custom-btn arrow\'></button>').append(arrowRight);

  if(prevSibling == undefined) {
    buttonLeft.attr('disabled', 'disabled')
  }
    if(nextSibling == undefined){
    buttonRight.attr('disabled', 'disabled')
  }

  $('.lab-hseq').text(numberClassWithDots);
  $('.panel-heading .bar-slider').append(sliderTitle[numberClass]);

  colButtonRow1Col1.append(buttonUp);
  colButtonRow2Col1.append(buttonRight, buttonLeft );
  colButton.append(colButtonRow1, colButtonRow2);

  return paddingContent;
}//makePanelsTitle

function addDotsForLabels(label){
  if(label[1] == 1 && label.length >= 4){
    label = label.slice(0,3) + "." + label.charAt(3) + "." + label.slice(4,6)
  }else if(label[1] == 1 && label.length < 4){
    return label
  } else if(label[1] != 1 && label.length >= 3){
    label = label.slice(0,2) + "." + label.charAt(2) + "." + label.slice(3,5)
  }
  return label
}//addDotsForLabels

function makeBodyPanel(numberOfChildren, nameOfChildren, childrenDegree,i,numberClass ) {
  var numberOfChildrenWithDots = numberOfChildren.map(addDotsForLabels)
    , row = $('<div class=\'row panel-hseq'+ numberOfChildren[i - 1]+' hseq space\'></div>')
    , col1 = $('<div class=\'col-xl-0-8 col-lg-1 col-md-1-2 col-sm-1 col-xs-2 box-under-header-sx pull-left number\'></div>')
    , col1h5 = $('<h5> </h5>').text(numberOfChildrenWithDots[i - 1])
    , col2 = $('<div class=\'col-xl-5-2 col-lg-5 col-md-4 col-sm-4 col-xs-10 box-under-header-sx pull-left title\'></div>')
    , col2a = $('<a></a>').addClass('title-hseq' + numberOfChildren[i - 1]).attr('href', '#')
    , col2h5 = $('<h5></h5>').text(nameOfChildren[i - 1])
    , col4 = $('<div class=\'col-xl-2 col-lg-2 col-md-2-2 col-sm-2-6 col-xs-4 box-under-header-sx assessment-icon\'></div>')
    , col4row = $('<div class=\'row\'></div>')
    , col4rowCol1 = $('<div class=\'col-lg-6 col-md-6 col-sm-6 col-xs-6\'></div>')
    , col4rowCol2 = $('<div class=\'col-lg-6 col-md-6 col-sm-6 col-xs-6 \'></div>')
    , col4rowCol2pie = $('<div class=\' pie pull-left\'></div>').attr('data-name',numberOfChildren[i - 1])
    , col4rowCol2h6 = $('<h5 class=\'numberValue' + numberOfChildren[i - 1] + '\' ></h5>')
    , col4rowCol2h6per = $('<h5 class=\'numberValue-per' + numberOfChildren[i - 1] + '\' ></h5>')
    , col5 = $('<div class=\'col-xl-2-8 col-lg-2-6 col-md-3 col-sm-2-8 col-xs-5-2 box-under-header-sx bar-slider\'></div>')
    , max = childrenDegree[i-1]
    , col6 = $('<div class=\'col-xl-1-2 col-lg-1-4 col-md-1-6 col-sm-1-6 col-xs-2-8 box-under-header-sx button-expand ' +numberOfChildren[i - 1] +'\'></div>')
    , button = $('<button type=\'button\' class=\'claim-hseq' + numberOfChildren[i - 1] + ' btn btn-primary btn-sm custom-btn expand\'>Rozwiń</button>')
    , col5input

    , buttonExpandEvidences = $('<button type=\'button\' class=\'btn btn-primary expand ' + numberOfChildren[i - 1] + '\' data-toggle=\'collapse\' aria-expanded=\'false\'  name=\'search\' data-target=\'#collapseEvidence' + numberOfChildren[i - 1] + '\' aria-controls=\'collapseEvidence' + numberOfChildren[i - 1] + '\' title=\'Rozwiń dowody\'></button>')
    , evidenceID = $('<div id=\'collapseEvidence' + numberOfChildren[i - 1] + '\' class=\'col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12 collapse evidences\'></div>').append(addEvidencesToTheList(numberOfChildren, i))

    , buttonAddFirstEvidence = $('<button type=\'button\' class=\'btn btn-primary add ' + numberOfChildren[i - 1]+' pull-right\' data-toggle=\'tooltip\' data-placement=\'top\' title=\'Dodaj nowy dowód\' name=\'' + numberOfChildren[i - 1] + '\'></button>').append ('<i class="fa fa-plus" aria-hidden="true"></i>')

    , buttonEvidencesIcon = $('<i class=\'fa fa-arrow-down\' aria-hidden=\'true\'></i>')

  if (isoObject[numberOfChildren[i - 1]] && isoObject[numberOfChildren[i - 1]].children) {
    var children = isoObject[numberOfChildren[i - 1]].children;
    col5input = $('<input class=\'slider\' type=\'range\' value=\'0\' min=\'0\' max=' + max + ' name=\'' + numberOfChildren[i - 1] + '\' data-parent=\'' + numberClass + '\' data-children=\'' + children + '\' disabled >');
    col6.append(button)
  }
  // else if(!isoObject[numberOfChildren[i - 1]].children && !SzybkaOcena){
  //   col5input = $('<input class=\'slider\' type=\'range\' value=\'0\' min=\'0\' max=' + max + ' name=\'' + numberOfChildren[i - 1] + '\' data-parent=\'' + numberClass + '\' disabled  >');
  //   col6.append(buttonEvidences)
  // }
  else{
    col5input = $('<input class=\'slider\' type=\'range\' value=\'0\' min=\'0\' max=' + max + ' name=\'' + numberOfChildren[i - 1] + '\' data-parent=\'' + numberClass + '\'  >');

    if(isoObject[numberOfChildren[i - 1]]['numberOfEvidence'] != undefined){
      col6.append(buttonAddFirstEvidence)
      col6.append(buttonExpandEvidences)
      buttonExpandEvidences.on('click', function (e) {
        addClassNotCollapsed(numberOfChildren[i - 1]);
      });
    }else{
      col6.append(buttonAddFirstEvidence)
    }
  }

  buttonExpandEvidences.append(buttonEvidencesIcon);
  col1.append(col1h5);
  col2a.append(col2h5);
  col2.append(col2a);
  col4rowCol1.append(col4rowCol2pie);
  col4rowCol2.append(col4rowCol2h6, col4rowCol2h6per);
  col4row.append(col4rowCol1, col4rowCol2, col4rowCol2);
  col4.append(col4row);
  col5.append(col5input);
  row.append(col1, col2, col4, col5, col6, evidenceID);


  return row;

}//makeBodyPanel


function addEvidencesToTheList(numberOfChildren,i){
  var evidence = $('<div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12 well"></div>')
    , evidenceTable = $('<table id=\'' +  numberOfChildren[i - 1] + '\' class=\'table\'></table>')
    , evidenceTableHead = $('<thead></thead>')
    , evidenceTableBody = $('<tbody></tbody>')
    , evidenceTableTr = $('<tr></tr>')
    , evidenceTableTh1 = $('<th></th>')
    , evidenceTableTh2 = $('<th>Nazwa</th>')
    , evidenceTableTh3 = $('<th>Repozytorium</th>')
    , evidenceTableTh4 = $('<th>Nazwa dokumentu</th>')
    , evidenceTableTh5 = $('<th></th>')
    , evidenceTableTh5AddEvidence = $('<button type=\'button\' class=\'btn btn-primary add pull-right ' + numberOfChildren[i - 1] + '\' data-toggle=\'tooltip\' data-placement=\'top\' title=\'Dodaj nowy dowód\'></button>').append ('<i class="fa fa-plus" aria-hidden="true"></i>')

  evidenceTableTh5.append(evidenceTableTh5AddEvidence );
  evidenceTableTr.append(evidenceTableTh1,evidenceTableTh2,evidenceTableTh3,evidenceTableTh4, evidenceTableTh5);
  evidenceTableHead.append(evidenceTableTr);
  evidenceTable.append(evidenceTableHead, evidenceTableBody);
  evidence.append(evidenceTable);

  return evidence
}

function makeFirstPartOfMainPage(){
  var panelDefault = $('<div class="panel panel-default allPanels"></div>')
    , panelContent = $('<div class="panel-body panel-content panels"></div>')
    , panelCol = $('<div class="col-md-12 col-sm-12 col-sx-12"></div>');

  panelContent.append(panelCol);
  panelDefault.append(panelContent);

  return panelDefault;

}//makeFirstPartOfMainPage

function makeSecondPartOfMainPage(numberOfChildMainPanel,nameOfChildMainPanel,childDegreeMainPanel,j ){
  var panelRow = $('<div class=\'row panel-hseq'+ numberOfChildMainPanel[j - 1]+' hseq space\'></div>')
    , panelRowCol1 = $('<div class="col-xl-0-8 col-lg-1 col-md-1-2 col-sm-1 col-xs-2 box-under-header pull-left number"></div>')
    , panelRowCol1H4 = $('<h4></h4>').text(numberOfChildMainPanel[j-1])
    , panelRowCol2 = $('<div class="col-xl-5-2 col-lg-5 col-md-4 col-sm-4 col-xs-10 box-under-header pull-left title"></div>')
    , panelRowCol2A = $('<a></a>').addClass('title-hseq' + numberOfChildMainPanel[j - 1]).attr('href', '#')
    , panelRowCol2AH4 = $('<h4></h4>').text(nameOfChildMainPanel[j])
    , panelRowCol4 = $('<div class="col-xl-2 col-lg-2 col-md-2-2 col-sm-2-6 col-xs-4 box-under-header assessment-icon"></div>')
    , panelRowCol4Row = $('<div class="row"></div>')
    , panelRowCol4RowC1 = $('<div class="col-lg-6 col-md-6 col-sm-6 col-xs-7"></div>')
    , panelRowCol4RowC1Pie = $('<div class=\'pie pull-left\'></div>').attr('data-name',numberOfChildMainPanel[j - 1])
    , maxPanel = childDegreeMainPanel[j-1]
    , panelRowCol4RowC2 = $('<div class="col-lg-6 col-md-6 col-sm-6 col-xs-5"></div>')
    , panelRowCol4RowC2H6 = $('<h5 class=\'numberValue' + numberOfChildMainPanel[j - 1] + '\' ></h5>').text('0/' + maxPanel)
    , panelRowCol4RowC2H6Per = $('<h5 class=\'numberValue-per' +  numberOfChildMainPanel[j - 1] + '\' ></h5>').text('0%')
    , panelRowCol5 = $('<div class="col-xl-2-8 col-lg-2-6 col-md-3 col-sm-2-8 col-xs-5-2 box-under-header bar-header"></div>')
    , panelRowCol5Span = $('<span class=\'numberValueBig' + numberOfChildMainPanel[j - 1] + ' numberValue\' ></span>')
    , panelChildren = isoObject[numberOfChildMainPanel[j - 1]].children
    , panelRowCol5Input = $('<input class=\'slider\' type=\'range\' value=\'0\' min=\'0\' max=' + maxPanel + ' name=\'' + numberOfChildMainPanel[j - 1] + '\' data-parent=\'A\' data-children=\'' + panelChildren + '\' disabled >')

    , panelRowCol6 = $('<div class="col-xl-1-2 col-lg-1-4 col-md-1-6 col-sm-1-6 col-xs-2-8 box-under-header button-expand"></div>')
    , panelRowCol6Button = $('<button type=\'button\' class=\'claim-hseq' + numberOfChildMainPanel[j - 1] + ' btn btn-primary btn-sm custom-btn expand-main-page\'>Rozwiń</button>')
    , panelRowCol6Row1 = $('<div class="row"></div>')
    , panelRowCol6Row1Col = $('<div class="col-xl-12 col-lg-12 col-md-12"></div>')
    , panelRowCol6Row2 = $('<div class="row"></div>')
    , panelRowCol6Row2Col = $('<div class="col-xl-12 col-lg-12 col-md-12"></div>')


  , buttonExpandPanel = $('<button type=\'button\' class=\'hidden-md- hidden-lg hidden-xl btn btn-primary expand ' + numberOfChildMainPanel[j - 1] + '\' data-toggle=\'collapse\' aria-expanded=\'false\'  name=\'search\' data-target=\'#collapsePanelDetails' + numberOfChildMainPanel[j - 1] + '\' aria-controls=\'collapsePanelDetails' + numberOfChildMainPanel[j - 1] + '\' title=\'Pokaż panel szczegółów\'></button>')
  , buttonIcon = $('<i class="fa fa-arrow-down" aria-hidden="true"></i>')
  , panelRowCol7 = $('<div id=\'collapsePanelDetails' + numberOfChildMainPanel[j - 1] + '\' class=\'col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12 collapse evidences\'></div>').append(makeDetailsPanel(numberOfChildMainPanel, j));


  panelRowCol6Row1Col.append(panelRowCol6Button)
  panelRowCol6Row2Col.append(buttonExpandPanel)
  panelRowCol6Row1.append(panelRowCol6Row1Col)
  panelRowCol6Row2.append(panelRowCol6Row2Col)

  buttonExpandPanel.append(buttonIcon)
  panelRowCol1.append(panelRowCol1H4);
  panelRowCol2A.append(panelRowCol2AH4);
  panelRowCol2.append(panelRowCol2A);
  panelRowCol4RowC1.append(panelRowCol4RowC1Pie);
  panelRowCol4RowC2.append(panelRowCol4RowC2H6, panelRowCol4RowC2H6Per);
  panelRowCol4Row.append(panelRowCol4RowC1, panelRowCol4RowC2);
  panelRowCol4.append(panelRowCol4Row);
  panelRowCol5.append(panelRowCol5Span,panelRowCol5Input );
  panelRowCol6.append(panelRowCol6Row1, panelRowCol6Row2);

  panelRow.append(panelRowCol1, panelRowCol2,panelRowCol4,panelRowCol5,panelRowCol6, panelRowCol7);
  return panelRow;
}//makeSecondPartOfMainPage

function makeDetailsPanel(numberOfChildMainPanel, j){
  var tabPanels = $('<div id =\'tabsPanels' +numberOfChildMainPanel[j - 1]+ '\' class=\'hidden-lg col-sm-12 col-xs-12\'></div>')
    , tabPanelsCol = $('<div class=\'col-md-12 col-sm-12\'></div>')
    , tabPanelsColUl = $('<ul id =\'tabs' +numberOfChildMainPanel[j - 1]+ '\' data-tabs=\'tabs\' class=\'nav nav-pills\'></ul>')
    , tabPanelsColUlLi1 = $('<li class=\'active\'></li>')
    , tabPanelsColUlLi1a = $('<a href=\'#assessment' +numberOfChildMainPanel[j - 1]+ '\' data-toggle=\'tab\'>Ocena</a>')
    , tabPanelsColUlLi2 = $('<li></li>')
    , tabPanelsColUlLi2a = $('<a href=\'#details' +numberOfChildMainPanel[j - 1]+ '\' data-toggle=\'tab\'>Szczegóły</a>')
    , tabPanelsColUlLi3 = $('<li></li>')
    , tabPanelsColUlLi3a = $('<a href=\'#evidences' +numberOfChildMainPanel[j - 1]+ '\' data-toggle=\'tab\'>Dowody</a>')

    , tabContent = $('<div id =\'my-tab-content' +numberOfChildMainPanel[j - 1]+ '\' class=\'tab-content\'></div>')
    , tabContentAssess = $('<div id =\'assessment' +numberOfChildMainPanel[j - 1]+ '\' class=\'tab-pane active\'></div>')
    , tabContentDetails = $('<div id =\'details' +numberOfChildMainPanel[j - 1]+ '\' class=\'tab-pane\'></div>')
    , tabContentEvidence = $('<div id =\'evidences' +numberOfChildMainPanel[j - 1]+ '\' class=\'tab-pane addedComment\'></div>')

    , tabContentAssessRow = $('<div class=\'row\'></div>')
    , tabContentAssessRowCol = $('<div class=\'col-md-12\'></div>')
    , tabContentAssessRowColH = $('<h class=\'comment\'></h>').text('Opis')
    , tabContentAssessRowEditText = $('<div class=\'editable_text\'></div>')

    , tabContentDetailsRow1 = $('<div class=\'row\'></div>')
    , tabContentDetailsRow2 = $('<div class=\'row\'></div>')
    , tabContentDetailsRow3 = $('<div class=\'row\'></div>')
    , tabContentDetailsRow4 = $('<div class=\'row\'></div>')

    , tabContentDetailsRow1Col1 = $('<div class=\'col-xl-2 col-lg-3 col-md-3 col-sm-3\'></div>')
    , tabContentDetailsRow2Col1 = $('<div class=\'col-xl-2 col-lg-3 col-md-3 col-sm-3\'></div>')
    , tabContentDetailsRow3Col1 = $('<div class=\'col-xl-2 col-lg-3 col-md-3 col-sm-3\'></div>')
    , tabContentDetailsRow4Col1 = $('<div class=\'col-xl-2 col-lg-3 col-md-3 col-sm-3\'></div>')

    , tabContentDetailsRow1Col2 = $('<div class=\'col-xl-10 col-lg-9 col-md-9 col-sm-9\'></div>')
    , tabContentDetailsRow2Col2 = $('<div class=\'col-xl-10 col-lg-9 col-md-9 col-sm-9\'></div>')
    , tabContentDetailsRow3Col2 = $('<div class=\'col-xl-10 col-lg-9 col-md-9 col-sm-9\'></div>')
    , tabContentDetailsRow4Col2 = $('<div class=\'col-xl-10 col-lg-9 col-md-9 col-sm-9\'></div>')

    , tabContentDetailsRow1Col1H = $('<h5></h5>').text('Nazwa')
    , tabContentDetailsRow2Col1H = $('<h5></h5>').text('Etykieta')
    , tabContentDetailsRow3Col1H = $('<h5></h5>').text('Tagi')
    , tabContentDetailsRow4Col1H = $('<h5></h5>').text('Opis')

    , tabContentDetailsRow1Col2H = $('<h5 class=\'title-claim\'></h5>')
    , tabContentDetailsRow2Col2H = $('<h5 class=\'label-claim\'></h5>')
    , tabContentDetailsRow3Col2H = $('<h5 class=\'\'></h5>')
    , tabContentDetailsRow4Col2H = $('<h5 class=\'description\'></h5>')


  tabContentDetailsRow1Col2.append(tabContentDetailsRow1Col2H)
  tabContentDetailsRow2Col2.append(tabContentDetailsRow2Col2H)
  tabContentDetailsRow3Col2.append(tabContentDetailsRow3Col2H)
  tabContentDetailsRow4Col2.append(tabContentDetailsRow4Col2H)

  tabContentDetailsRow1Col1.append(tabContentDetailsRow1Col1H)
  tabContentDetailsRow2Col1.append(tabContentDetailsRow2Col1H)
  tabContentDetailsRow3Col1.append(tabContentDetailsRow3Col1H)
  tabContentDetailsRow4Col1.append(tabContentDetailsRow4Col1H)
  tabContentDetailsRow4.append(tabContentDetailsRow4Col1, tabContentDetailsRow4Col2)
  tabContentDetailsRow3.append(tabContentDetailsRow3Col1, tabContentDetailsRow3Col2)
  tabContentDetailsRow2.append(tabContentDetailsRow2Col1, tabContentDetailsRow2Col2)
  tabContentDetailsRow1.append(tabContentDetailsRow1Col1, tabContentDetailsRow1Col2)
  tabContentDetails.append(tabContentDetailsRow1,tabContentDetailsRow2,tabContentDetailsRow3,tabContentDetailsRow4)
  tabContentAssessRowCol.append(tabContentAssessRowColH)
  tabContentAssessRow.append(tabContentAssessRowCol)
  tabContentAssess.append(tabContentAssessRow,tabContentAssessRowEditText )
  tabContent.append(tabContentAssess, tabContentDetails,tabContentEvidence);
  tabPanelsColUlLi1.append(tabPanelsColUlLi1a);
  tabPanelsColUlLi2.append(tabPanelsColUlLi2a);
  tabPanelsColUlLi3.append(tabPanelsColUlLi3a);
  tabPanelsColUl.append(tabPanelsColUlLi1, tabPanelsColUlLi2,tabPanelsColUlLi3);
  tabPanelsCol.append(tabPanelsColUl,tabContent);
  tabPanels.append(tabPanelsCol);
  return tabPanels;
}






// function makeRightPanel(){
//   var rightPanel = $('<div class="col-md-3 col-sm-12 pull-right right-panel"></div>')
//     , bsCollapse = $('<div id="bs-collapse" class="panel-group"></div>')
//     , firstPanel = $('<div class="col-md-12 col-sm-6 first-panel"></div>')
//     , firstPanelWrap = $('<div class="panel wrap"></div>')
//     , firstPanelWrapHead = $('<div class="panel-heading"></div>')
//     , firstPanelWrapHeadH4 = $('<h4 class="panel-title"></h4>')
//     , firstPanelWrapHeadH4a = $('<a data-toggle="collapse" data-parent="" href=#one"></a>').text('Szczegóły')
//     , firstPanelWrapOne = $('<div id="one" class="panel-collapse collapse in"></div>')
//     , firstPanelWrapOneBody = $('<div class="panel-body"></div>')
//     , firstPanelWrapOneBodyRow1 = $('<div class="row"></div>')
//     , firstPanelWrapOneBodyRow1C1 = $('<div class="col-md-2"></div>')
//     , firstPanelWrapOneBodyRow1C1H5 = $('<h5></h5>').text('Nazwa')
//     , firstPanelWrapOneBodyRow1C2 = $('<div class="col-md-9"></div>')
//     , firstPanelWrapOneBodyRow1C2H5 = $('<h5></h5>').text('Ocena zgodności Systemu Zarządzania Bezpieczeństwem Informacji z wymaganiami ISO 27001:2014')
//
//     , firstPanelWrapOneBodyRow2 = $('<div class="row"></div>')
//     , firstPanelWrapOneBodyRow2C1 = $('<div class="col-md-2"></div>')
//     , firstPanelWrapOneBodyRow2C1H5 = $('<h5></h5>').text('Etykieta:')
//     , firstPanelWrapOneBodyRow2C2 = $('<div class="col-md-9"></div>')
//     , firstPanelWrapOneBodyRow2C2H5 = $('<h5 class="label-claim"></h5>')
//
//     , firstPanelWrapOneBodyRow3 = $('<div class="row"></div>')
//     , firstPanelWrapOneBodyRow3C1 = $('<div class="col-md-2"></div>')
//     , firstPanelWrapOneBodyRow3C1H5 = $('<h5></h5>').text('Tagi')
//     , firstPanelWrapOneBodyRow3C2 = $('<div class="col-md-9"></div>')
//
//
//     , lastPanel = $('<div class="col-md-12 col-sm-6 last-panel"></div>')
//     , lastPanelWrap = $('<div class="panel wrap"></div>')
//
//
//     , firstPanelWrapOneBodyText = $('<div data-name="panel1"></div>')
//
//
//   firstPanelWrapOneBodyRow2C1.append(firstPanelWrapOneBodyRow2C1H5);
//   firstPanelWrapOneBodyRow2C2.append(firstPanelWrapOneBodyRow2C2H5);
//   firstPanelWrapOneBodyRow2.append(firstPanelWrapOneBodyRow2C1,firstPanelWrapOneBodyRow2C2 );
//
//   firstPanelWrapOneBodyRow1C2.append(firstPanelWrapOneBodyRow1C2H5);
//   firstPanelWrapOneBodyRow1C1.append(firstPanelWrapOneBodyRow1C1H5);
//   firstPanelWrapOneBodyRow1.append(firstPanelWrapOneBodyRow1C1,firstPanelWrapOneBodyRow1C2);
//   firstPanelWrapOneBody.append(firstPanelWrapOneBodyRow1,firstPanelWrapOneBodyRow2,firstPanelWrapOneBodyRow3);
//   firstPanelWrapOne.append(firstPanelWrapOneBody);
//
//
//   firstPanelWrapHeadH4.append(firstPanelWrapHeadH4a);
//   firstPanelWrapHead.append(firstPanelWrapHeadH4);
//   firstPanelWrap.append(firstPanelWrapHead, firstPanelWrapOne);
//   firstPanel.append(firstPanelWrap);
//   bsCollapse.append(firstPanel);
//   rightPanel.append(bsCollapse);
//
//
//   return rightPanel;
// }
