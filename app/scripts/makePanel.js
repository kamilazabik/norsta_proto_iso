/**
 * Tworzy panel główny
 *
 */

function makeMainPanel(){
  var mainPanel = $('<div id="main-panel" class="row"></div>')
    , col = $('<div class="col-xs-12"></div>')
    , col1 = $('<div class="col-xs-12"></div>')
    , col1row = $('<div class="row fixedPos box-header"></div>')
    , col1rowTitleMain = $('<div class="box-header__title"></div>')
    , col1rowTitleMainH3 = $('<h3 class="title-hseqA0"></h3>').text('Ocena zgodności Systemu Zarządzania Bezpieczeństwem Informacji z wymaganiami ISO 27001:2014')
    , col1rowAssess = $('<div class="box-header__assessment"></div>')
    , col1rowAssessPie = $('<div class="pie box-header__pie pull-left" data-name="A"></div>')
    , col1rowAssess1 = $('<div class="box-header__assessment"></div>')
    , col1rowAssess1numVal = $('<h3 class="text-left numberValueA"></h3>')
    , col1rowAssess1numValPer = $('<h3 class="text-left numberValue-perA"></h3>')
    , col1rowBar = $('<div class="box-header__bar-slider"></div>')
    , col1rowBarInput = $('<input class="slider" value="0" min="0" max="1500" step="1" name="A" data-children="A5,A6,A7,A8,A9,A10,A11,A12,A13,A14,A15,A16,A17,A18" type="range" disabled>')
    , col1rowButtons = $('<div class="box-header__filter"></div>')
    , col1rowButtonsSelect = $('<select id="selectAssessment" class="form-control box-header__form-control" ></select>')
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

/**
 * Tworzy tytuł/panel rodzica
 * @param {string} numberClass - etykieta/numer klasy
 * @param {string} oneTitle - tytuł
 *
 */

function makePanelsTitle(numberClass, oneTitle){
  var numberClassWithDots = addDotsForLabels(numberClass)
    , paddingContent = $('.col-lg-9.col-xs-12.pull-left.padding-content')
    , panelTitle= $('<div class="panel panel-default allPanels"></div>')
    , panelHeading = $('<div class="panel-heading panel-heading__panel-heading"></div>')
    , rowPanel = $('<div class="row panel-hseq' + numberClass+'"></div>')
    , colNumber = $('<div class="panel-heading__number"></div>')
    , colNumberH4 = $('<h4 class="lab-hseq"></h4>')
    , colTitle = $('<div class="panel-heading__title"></div>')
    , colTitleH4 = $('<h4 class="title-hseq'+numberClass+'"></h4>').text(oneTitle)
    , colAssess = $('<div class="panel-heading__assessment"></div>')
    , colAssesstRow = $('<div class="row"></div>')
    , colAssessRowCol1 = $('<div class="panel-heading__assess-icon"></div>')
    , colAssessRowCol2 = $('<div class="panel-heading__assess-value"></div>')
    , colAssessRowColPie = $('<div class="pie panel-heading__pie pull-left"></div>')
    , colAssessRowColNumValue = $('<p class="text-left numberValue'+numberClass+'"></p>')
    , colAssessRowColNumValuePer = $('<p class="text-left numberValue-per'+numberClass+'"></p>')
    , colBar = $('<div class="panel-heading__bar-slider"></div>')
    , colButton = $('<div class="panel-heading__button-expand"></div>')
    , colButtonRow1 = $('<div class="row"></div>')
    , colButtonRow1Col1 = $('<div class="panel-heading__buttons-title">')
    , colButtonRow2 = $('<div class="row"></div>')
    , colButtonRow2Col1 = $('<div class="panel-heading__buttons-title"></div>')
    , panelBody = $('<div class="panel-body panel-content panel-heading__panel-content panels"></div>')
    , colFilterGroup = $('<div class="col-md-12 filter-group"></div>');

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
    , prevSibling = siblings[indexOfnumberClass - 1]
    , pie = $('.panel-heading .pie').attr('data-name', numberClass)
    , arrowLeft = $('<i class=\'fa fa-angle-double-left\' aria-hidden=\'true\'></i>')
    , arrowRight = $('<i class=\'fa fa-angle-double-right\' aria-hidden=\'true\'></i>')
    , buttonUp = $('<button type=\'button\' class=\'claim-hseq' + isoObject[numberClass].parent + ' btn btn-sm custom-btn btn-up\' name=\''+ isoObject[numberClass].parent+'\'>Do góry</button>');
  var buttonLeft = $('<button type=\'button\' class=\'claim-hseq' + prevSibling + ' btn btn-sm custom-btn btn-arrow\'></button>').append(arrowLeft);
  var buttonRight = $('<button type=\'button\' class=\'claim-hseq' + nextSibling + ' btn btn-sm custom-btn btn-arrow\'></button>').append(arrowRight);

  if(prevSibling == undefined) {
    buttonLeft.attr('disabled', 'disabled')
  }
    if(nextSibling == undefined){
    buttonRight.attr('disabled', 'disabled')
  }

  $('.lab-hseq').text(numberClassWithDots);
  $('.panel-heading__bar-slider').append(sliderTitle[numberClass]);

  colButtonRow1Col1.append(buttonUp);
  colButtonRow2Col1.append(buttonRight, buttonLeft);
  colButton.append(colButtonRow1, colButtonRow2);

  return paddingContent;
}//makePanelsTitle

/**
 * Tworzy panel pod rodzicem, funkcja wywoływana w pętli
 * @param {object} numberOfChildren - tablica z etykietami/numerami klas dzieci
 * @param {object} nameOfChildren - tablica z nazwami dzieci
 * @param {object} childrenDegree - tablica z maksymalnymi ocenami dzieci
 * @param {number} i - liczba dzieci,
 * @param {string} numberClass - etykieta/numer klasy rodzica
 *
 */

function makeBodyPanel(numberOfChildren, nameOfChildren, childrenDegree,i,numberClass ) {
  var numberOfChild = numberOfChildren[i - 1]
    , numberOfChildrenWithDots = numberOfChildren.map(addDotsForLabels)
    , row = $('<div class=\'row panel-hseq'+ numberOfChild+' space\'></div>')
    , col1 = $('<div class=\'pull-left panel-content__number\'></div>')
    , col1h5 = $('<h5> </h5>').text(numberOfChildrenWithDots[i - 1])
    , col2 = $('<div class=\'panel-content__title\'></div>')
    , col2a = $('<a></a>').addClass('title-hseq' + numberOfChild).attr('href', '#')
    , col2h5 = $('<h5></h5>').text(nameOfChildren[i - 1])
    , col4 = $('<div class=\'panel-content__assessment\'></div>')
    , col4row = $('<div class=\'row\'></div>')
    , col4rowCol1 = $('<div class=\'panel-content__assess-body\'></div>')
    , col4rowCol2 = $('<div class=\'panel-content__assess-body \'></div>')
    , col4rowCol2pie = $('<div class=\' pie panel-content__pie pull-left\'></div>').attr('data-name',numberOfChild)
    , col4rowCol2h6 = $('<p class=\'numberValue' + numberOfChild + '\' ></p>')
    , col4rowCol2h6per = $('<p class=\'numberValue-per' + numberOfChild + '\' ></p>')
    , col5 = $('<div class=\'panel-content__bar-slider\'></div>')
    , col5input
    , max = childrenDegree[i-1]
    , col6
    , col7;


  if (isoObject[numberOfChild].children) {
    var children = isoObject[numberOfChild].children;
    col6 = $('<div class=\'panel-content__button-expand panel-content__button-expand--xs' +numberOfChild +'\'></div>')
    col5input = $('<input class=\'slider\' type=\'range\' value=\'0\' min=\'0\' max=' + max + ' name=\'' + numberOfChild + '\' data-parent=\'' + numberClass + '\' data-children=\'' + children + '\' disabled >');
    col6.append(makeButtonExpand(numberOfChildren, i));
  }else{
   col6 = $('<div class=\'panel-content__button-expand panel-content__button-expand--xs ' +numberOfChild +'\'></div>')
    col5input = $('<input class=\'slider\' type=\'range\' value=\'0\' min=\'0\' max=' + max + ' name=\'' + numberOfChild + '\' data-parent=\'' + numberClass + '\'  >');
  }

  if(isoObject[numberOfChild]['numberOfEvidence'] != undefined) {
    col7 = $('<div id=\'collapsePanelDetails' + numberOfChild + '\' class=\'col-xs-12 collapse evidences\'></div>').append(makeDetailsPanel(numberOfChildren, i));
    col6.append(makeButtonsOpenDetailsAddEvid(numberOfChildren, i,numberOfChild, false));
  }else{
    col7 = $('<div id=\'collapsePanelDetails' + numberOfChild + '\' class=\'hidden-xl hidden-lg col-xs-12 collapse evidences\'></div>').append(makeDetailsPanel(numberOfChildren, i));
    col6.append(makeButtonsOpenDetailsAddEvid(numberOfChildren, i,numberOfChild, true));
  }

  col1.append(col1h5);
  col2a.append(col2h5);
  col2.append(col2a);
  col4rowCol1.append(col4rowCol2pie);
  col4rowCol2.append(col4rowCol2h6, col4rowCol2h6per);
  col4row.append(col4rowCol1, col4rowCol2, col4rowCol2);
  col4.append(col4row);
  col5.append(col5input);
  row.append(col1, col2, col4, col5, col6, col7);

  return row;

}//makeBodyPanel

/**
 * Funkacją dodająca nagłówek tabeli z dowodami
 * @param {object} numberOfChildren - tablica z etykietami/numerami klas dzieci
 * @param {number} i - liczba dzieci,
 *
 */


function addEvidencesToTheList(numberOfChildren,i){
  var numberOfChilderEvid = numberOfChildren[i - 1]
    , evidence = $('<div class="col-xs-12 well"></div>')
    , evidenceTable = $('<table id=\'' +  numberOfChilderEvid + '\' class=\'table\'></table>')
    , evidenceTableHead = $('<thead></thead>')
    , evidenceTableBody = $('<tbody></tbody>')
    , evidenceTableTr = $('<tr></tr>')
    , evidenceTableTh1 = $('<th></th>')
    , evidenceTableTh2 = $('<th>Nazwa</th>')
    , evidenceTableTh3 = $('<th>Repozytorium</th>')
    , evidenceTableTh4 = $('<th>Nazwa dokumentu</th>')
    , evidenceTableTh5 = $('<th></th>');

  // evidenceTableTh5.append(evidenceTableTh5AddEvidence );
  evidenceTableTr.append(evidenceTableTh1,evidenceTableTh2,evidenceTableTh3,evidenceTableTh4, evidenceTableTh5);
  evidenceTableHead.append(evidenceTableTr);
  evidenceTable.append(evidenceTableHead, evidenceTableBody);
  evidence.append(evidenceTable);

  return evidence
}

/**
 * Funkacją
 *
 */

function makeFirstPartOfMainPage(){
  var panelDefault = $('<div class="panel panel-default allPanels"></div>')
    , panelContent = $('<div class="panel-body panel-content"></div>')
    , panelCol = $('<div id="panels" class="col-sx-12 col-sm-12 col-md-12"></div>');

  panelContent.append(panelCol);
  panelDefault.append(panelContent);

  return panelDefault;

}//makeFirstPartOfMainPage

function makeSecondPartOfMainPage(numberOfChildMainPanel,nameOfChildMainPanel,childDegreeMainPanel,j ){
  var numberOfChildMainPan=  numberOfChildMainPanel[j - 1]
    , panelRow = $('<div class=\'row panel-hseq'+ numberOfChildMainPan+' space\'></div>')
    , panelRowCol1 = $('<div class="panel-content__number"></div>')
    , panelRowCol1H4 = $('<h4></h4>').text(numberOfChildMainPanel[j-1])
    , panelRowCol2 = $('<div class="panel-content__title"></div>')
    , panelRowCol2A = $('<a></a>').addClass('title-hseq' + numberOfChildMainPan).attr('href', '#')
    , panelRowCol2AH4 = $('<h4 class="panel-content__title--font-color"></h4>').text(nameOfChildMainPanel[j])
    , panelRowCol4 = $('<div class="panel-content__assessment"></div>')
    , panelRowCol4Row = $('<div class="row"></div>')
    , panelRowCol4RowC1 = $('<div class="panel-content__assess-icon"></div>')
    , panelRowCol4RowC1Pie = $('<div class=\'pie panel-content__pie pull-left\'></div>').attr('data-name',numberOfChildMainPan)
    , maxPanel = childDegreeMainPanel[j-1]
    , panelRowCol4RowC2 = $('<div class="panel-content__assess-value"></div>')
    , panelRowCol4RowC2H6 = $('<p class=\'numberValue' + numberOfChildMainPan + '\' ></p>').text('0/' + maxPanel)
    , panelRowCol4RowC2H6Per = $('<p class=\'numberValue-per' +  numberOfChildMainPan + '\' ></p>').text('0%')
    , panelRowCol5 = $('<div class="panel-content__bar-slider"></div>')
    , panelRowCol5Span = $('<span class=\'numberValueBig' + numberOfChildMainPan + ' numberValue\' ></span>')
    , panelChildren = isoObject[numberOfChildMainPan].children
    , panelRowCol5Input = $('<input class=\'slider\' type=\'range\' value=\'0\' min=\'0\' max=' + maxPanel + ' name=\'' + numberOfChildMainPan + '\' data-parent=\'A\' data-children=\'' + panelChildren + '\' disabled >')
    , panelRowCol6 = $('<div class="panel-content__button-expand"></div>')
    , panelRowCol7;
    // , panelRowCol7 = $('<div id=\'collapsePanelDetails' + numberOfChildMainPan + '\' class=\'hidden-xl hidden-lg col-md-12 col-sm-12 col-xs-12 collapse evidences\'></div>').append(makeDetailsPanel(numberOfChildMainPanel, j))

  panelRowCol1.append(panelRowCol1H4);
  panelRowCol2A.append(panelRowCol2AH4);
  panelRowCol2.append(panelRowCol2A);
  panelRowCol4RowC1.append(panelRowCol4RowC1Pie);
  panelRowCol4RowC2.append(panelRowCol4RowC2H6, panelRowCol4RowC2H6Per);
  panelRowCol4Row.append(panelRowCol4RowC1, panelRowCol4RowC2);
  panelRowCol4.append(panelRowCol4Row);
  panelRowCol5.append(panelRowCol5Span,panelRowCol5Input );

 if(isoObject[numberOfChildMainPan]['numberOfEvidence'] != undefined) {
 panelRowCol7 = $('<div id=\'collapsePanelDetails' + numberOfChildMainPan + '\' class=\'col-xs-12 collapse evidences\'></div>').append(makeDetailsPanel(numberOfChildMainPanel, j));
   panelRowCol6.append(makeButtonExpand(numberOfChildMainPanel, j), makeButtonsOpenDetailsAddEvid(numberOfChildMainPanel, j, numberOfChildMainPan, false));
 }else{
 panelRowCol7 = $('<div id=\'collapsePanelDetails' + numberOfChildMainPan + '\' class=\'hidden-xl hidden-lg col-xs-12 collapse evidences\'></div>').append(makeDetailsPanel(numberOfChildMainPanel, j));
   panelRowCol6.append(makeButtonExpand(numberOfChildMainPanel, j), makeButtonsOpenDetailsAddEvid(numberOfChildMainPanel, j, numberOfChildMainPan, true));
 }

  panelRow.append(panelRowCol1, panelRowCol2,panelRowCol4,panelRowCol5,panelRowCol6, panelRowCol7);
  return panelRow;
}//makeSecondPartOfMainPage



function addDotsForLabels(label){
  if(label[1] == 1 && label.length >= 4){
    label = label.slice(0,3) + '.' + label.charAt(3) + '.' + label.slice(4,6)
  }else if(label[1] == 1 && label.length < 4){
    return label
  } else if(label[1] != 1 && label.length >= 3){
    label = label.slice(0,2) + '.' + label.charAt(2) + '.' + label.slice(3,5)
  }
  return label
}//addDotsForLabels





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
