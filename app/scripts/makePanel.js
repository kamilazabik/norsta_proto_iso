/**
 * Tworzy panel główny
 *
 */

function makeMainPanel(){
  var mainPanel = $('<div id="main-panel" class="row"></div>')
    // , col = $('<div class="col-xs-12"></div>')
    // , col1 = $('<div class="col-xs-12"></div>')
    , col1row = $('<div class="row fixedPos panel-header"></div>')
    , col1rowTitleMain = $('<div class="panel-header__title"></div>')
    , col1rowTitleMainH3 = $('<h3></h3>').attr('data-title', 'A0').text('Ocena zgodności Systemu Zarządzania Bezpieczeństwem Informacji z wymaganiami ISO 27001:2014')
    , col1rowAssess = $('<div class="panel-header__assessment"></div>')
    , col1rowAssessPie = $('<div class="pie panel-header__pie pull-left" data-name="A"></div>')
    , col1rowAssess1 = $('<div class="panel-header__assessment"></div>')
    , col1rowAssess1numVal = $('<h3 class="text-left numberValueA"></h3>')
    , col1rowAssess1numValPer = $('<h3 class="text-left numberValue-perA"></h3>')
    , col1rowBar = $('<div class="panel-header__bar-slider"></div>')
    , col1rowBarInput = $('<input class="slider" value="0" min="0" max="1500" step="1" name="A" data-children="A5,A6,A7,A8,A9,A10,A11,A12,A13,A14,A15,A16,A17,A18" type="range" disabled>')
    , col1rowButtons = $('<div class="panel-header__filter"></div>')
    , col1rowButtonsSelect = $('<select id="selectAssessment" class="form-control panel-header__form-control" ></select>')
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
  // col1.append(col1row);
  // col.append(col1);
  mainPanel.append(col1row);

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
    , paddingContent = $('.panels-list')
    , panelTitle= $('<div class="panel panel-default allPanels"></div>')
    , panelHeading = $('<div class="panel-heading allPanels__panel-heading"></div>')
    , rowPanel = $('<div class="row" data-panel="'+numberClass+'"></div>')
    , colNumber = $('<div class="panel-title__number"></div>')
    , colNumberH4 = $('<h4 class="lab-hseq"></h4>')
    , colTitle = $('<div class="panel-title__title"></div>')
    , colTitleH4 = $('<h4 class="panel-title__title--font-color"></h4>').attr('data-title', numberClass).text(oneTitle)
    , colAssess = $('<div class="panel-title__assessment"></div>')
    , colAssesstRow = $('<div class="row"></div>')
    , colAssessRowCol1 = $('<div class="panel-title__assess-icon"></div>')
    , colAssessRowCol2 = $('<div class="panel-title__assess-value"></div>')
    , colAssessRowColPie = $('<div class="pie panel-title__pie pull-left"></div>').attr('data-name',numberClass)
    , colAssessRowColNumValue = $('<p class="text-left numberValue'+numberClass+'"></p>')
    , colAssessRowColNumValuePer = $('<p class="text-left numberValue-per'+numberClass+'"></p>')
    , colBar = $('<div class="panel-title__bar-slider"></div>')


    , max = isoObject[numberClass].maxDegree
    , children = isoObject[numberClass].children
    , parent = isoObject[numberClass].parent
    , colBarSlider = $('<input class=\'slider\' type=\'range\' value=\'0\' min=\'0\' max=' + max + ' name=\'' + numberClass + '\' data-parent=\'' + parent + '\' data-children=\'' + children + '\' disabled >')


    , colButton = $('<div class="panel-title__button-expand"></div>')
    , colButtonRow1 = $('<div class="row"></div>')
    , colButtonRow1Col1 = $('<div class="panel-title__buttons-title">')
    , colButtonRow2 = $('<div class="row"></div>')
    , colButtonRow2Col1 = $('<div class="panel-title__buttons-title"></div>')
    , panelBody = $('<div class="panel-body panel-content allPanels__panel-content panels"></div>')
    // , colFilterGroup = $('<div class="col-md-12 filter-group"></div>');

  colButtonRow1.append(colButtonRow1Col1);
  colButtonRow2.append(colButtonRow2Col1);
  colAssessRowCol2.append(colAssessRowColNumValue, colAssessRowColNumValuePer);
  colAssessRowCol1.append(colAssessRowColPie);
  colAssesstRow.append(colAssessRowCol1, colAssessRowCol2);
  colAssess.append(colAssesstRow);
  colNumber.append(colNumberH4);
  colTitle.append(colTitleH4);
  // panelBody.append(colFilterGroup);
  rowPanel.append(colNumber, colTitle,colAssess,colBar, colButton);
  panelHeading.append(rowPanel);
  panelTitle.append(panelHeading).append(panelBody);
  paddingContent.append(panelTitle);

  var siblings = isoObject[isoObject[numberClass].parent].children.split(',')
    , indexOfnumberClass = siblings.indexOf(numberClass)
    , nextSibling = siblings[indexOfnumberClass + 1]
    , prevSibling = siblings[indexOfnumberClass - 1]
    , pie = $('.panel-title .pie').attr('data-name', numberClass)
    , arrowLeft = $('<i class=\'fa fa-angle-double-left\' aria-hidden=\'true\'></i>')
    , arrowRight = $('<i class=\'fa fa-angle-double-right\' aria-hidden=\'true\'></i>')
    , buttonUp = $('<button type=\'button\' class=\'btn btn-sm custom-btn btn-up\' data-label=\'' + isoObject[numberClass].parent + '\' name=\''+ isoObject[numberClass].parent+'\'>Do góry</button>');
  var buttonLeft = $('<button type=\'button\' class=\'btn btn-sm custom-btn btn-arrow\' data-label=\'' + prevSibling + '\'></button>').append(arrowLeft);
  var buttonRight = $('<button type=\'button\' class=\'btn btn-sm custom-btn btn-arrow\' data-label=\'' + nextSibling + '\'></button>').append(arrowRight);

  if(prevSibling == undefined) {
    buttonLeft.attr('disabled', 'disabled')
  }
    if(nextSibling == undefined){
    buttonRight.attr('disabled', 'disabled')
  }

  $('.lab-hseq').text(numberClassWithDots);
  // $('.panel-title__bar-slider').append(sliderTitle[numberClass]);
  // $('.panel-title__bar-slider').append(colBarSlider);

  if(sliderTitle[numberClass]){
    $('.panel-title__bar-slider').append(sliderTitle[numberClass]);
  }else {
    $('.panel-title__bar-slider').append(colBarSlider);
  }

  console.log(sliderTitle)

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
    , row = $('<div class=\'row panel-block\' data-panel=\''+ numberOfChild+'\'></div>')
    , col1 = $('<div class=\'panel-block__number\'></div>')
    , col1h5 = $('<h5> </h5>').text(numberOfChildrenWithDots[i - 1])
    , col2 = $('<div class=\'panel-block__title\'></div>')
    , col2a = $('<a class="panel-block__title--font-color"></a>').attr('href', '#').attr('data-title', numberOfChild )
// class="title-hseq'+numberClass+' panel-title__title--font-color"

    , col2h5 = $('<h5></h5>').text(nameOfChildren[i - 1])
    , col4 = $('<div class=\'panel-block__assessment\'></div>')
    , col4row = $('<div class=\'row\'></div>')
    , col4rowCol1 = $('<div class=\'panel-block__assess-body\'></div>')
    , col4rowCol2 = $('<div class=\'panel-block__assess-body \'></div>')
    , col4rowCol2pie = $('<div class=\' pie panel-block__pie pull-left\'></div>').attr('data-name',numberOfChild)
    , col4rowCol2h6 = $('<p class=\'numberValue' + numberOfChild + '\' ></p>')
    , col4rowCol2h6per = $('<p class=\'numberValue-per' + numberOfChild + '\' ></p>')
    , col5 = $('<div class=\'panel-block__bar-slider\'></div>')
    , col5input
    , max = childrenDegree[i-1]
    , col6
    , col7;


  if (isoObject[numberOfChild].children) {
    var children = isoObject[numberOfChild].children;
    col6 = $('<div class=\'panel-block__button-expand panel-block__button-expand--xs' +numberOfChild +'\'></div>')
    col5input = $('<input class=\'slider\' type=\'range\' value=\'0\' min=\'0\' max=' + max + ' name=\'' + numberOfChild + '\' data-parent=\'' + numberClass + '\' data-children=\'' + children + '\' disabled >');
    col6.append(makeButtonExpand(numberOfChildren, i));
  }else{
   col6 = $('<div class=\'panel-block__button-expand panel-block__button-expand--xs ' +numberOfChild +'\'></div>')
    col5input = $('<input class=\'slider\' type=\'range\' value=\'0\' min=\'0\' max=' + max + ' name=\'' + numberOfChild + '\' data-parent=\'' + numberClass + '\'  >');
  }

  if(isoObject[numberOfChild]['numberOfEvidence'] != undefined) {
    col7 = $('<div id=\'collapsePanelDetails' + numberOfChild + '\' class=\'col-xs-12 collapse panel-block__evidences\'></div>').append(makeDetailsPanel(numberOfChildren, i));
    col6.append(makeButtonsOpenDetailsAddEvid(numberOfChildren, i,numberOfChild, false));
  }else{
    col7 = $('<div id=\'collapsePanelDetails' + numberOfChild + '\' class=\'hidden-xl hidden-lg col-xs-12 collapse panel-block__evidences\'></div>').append(makeDetailsPanel(numberOfChildren, i));
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
    , evidenceTable = $('<table id=\'' +  numberOfChilderEvid + '\' class=\'table evidences-table\'></table>')
    , evidenceTableHead = $('<thead class="evidences-table__thead"></thead>')
    , evidenceTableBody = $('<tbody class="evidences-table__tbody"></tbody>')
    , evidenceTableTr = $('<tr></tr>')
    , evidenceTableTh1 = $('<th class="evidences-table__thead-th"></th>')
    , evidenceTableTh2 = $('<th class="evidences-table__thead-th">Nazwa</th>')
    , evidenceTableTh3 = $('<th class="evidences-table__thead-th">Repozytorium</th>')
    , evidenceTableTh4 = $('<th class="evidences-table__thead-th">Nazwa dokumentu</th>')
    , evidenceTableTh5 = $('<th class="evidences-table__thead-th"></th>');

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
    , panelContent = $('<div class="panel-body panel-content allPanels__panel-content "></div>')
    // , panelCol = $('<div id="panels" class="col-sx-12 col-sm-12 col-md-12"></div>');

  // panelContent.append(panelCol);
  panelDefault.append(panelContent);

  return panelDefault;

}//makeFirstPartOfMainPage

function makeSecondPartOfMainPage(numberOfChildMainPanel,nameOfChildMainPanel,childDegreeMainPanel,j ){
  var numberOfChildMainPan=  numberOfChildMainPanel[j - 1]
    , panelRow = $('<div class=\'row panel-block\' data-panel=\''+ numberOfChildMainPan+'\'></div>')
    , panelRowCol1 = $('<div class="panel-block__number"></div>')
    , panelRowCol1H4 = $('<h4></h4>').text(numberOfChildMainPanel[j-1])
    , panelRowCol2 = $('<div class="panel-block__title"></div>')
    , panelRowCol2A = $('<a></a>').attr('href', '#').attr('data-title', numberOfChildMainPan)
    , panelRowCol2AH4 = $('<h4 class="panel-block__title--font-color"></h4>').text(nameOfChildMainPanel[j])
    , panelRowCol4 = $('<div class="panel-block__assessment"></div>')
    , panelRowCol4Row = $('<div class="row"></div>')
    , panelRowCol4RowC1 = $('<div class="panel-block__assess-icon"></div>')
    , panelRowCol4RowC1Pie = $('<div class=\'pie panel-block__pie pull-left\'></div>').attr('data-name',numberOfChildMainPan)
    , maxPanel = childDegreeMainPanel[j-1]
    , panelRowCol4RowC2 = $('<div class="panel-block__assess-value"></div>')
    , panelRowCol4RowC2H6 = $('<p class=\'numberValue' + numberOfChildMainPan + '\' ></p>').text('0/' + maxPanel)
    , panelRowCol4RowC2H6Per = $('<p class=\'numberValue-per' +  numberOfChildMainPan + '\' ></p>').text('0%')
    , panelRowCol5 = $('<div class="panel-block__bar-slider"></div>')
    , panelRowCol5Span = $('<span class=\'numberValueBig' + numberOfChildMainPan + ' numberValue\' ></span>')
    , panelChildren = isoObject[numberOfChildMainPan].children
    , panelRowCol5Input = $('<input class=\'slider\' type=\'range\' value=\'0\' min=\'0\' max=' + maxPanel + ' name=\'' + numberOfChildMainPan + '\' data-parent=\'A\' data-children=\'' + panelChildren + '\' disabled >')
    , panelRowCol6 = $('<div class="panel-block__button-expand"></div>')
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
 panelRowCol7 = $('<div id=\'collapsePanelDetails' + numberOfChildMainPan + '\' class=\'col-xs-12 collapse panel-block__evidences\'></div>').append(makeDetailsPanel(numberOfChildMainPanel, j));
   panelRowCol6.append(makeButtonExpand(numberOfChildMainPanel, j), makeButtonsOpenDetailsAddEvid(numberOfChildMainPanel, j, numberOfChildMainPan, false));
 }else{
 panelRowCol7 = $('<div id=\'collapsePanelDetails' + numberOfChildMainPan + '\' class=\'hidden-xl hidden-lg col-xs-12 collapse panel-block__evidences\'></div>').append(makeDetailsPanel(numberOfChildMainPanel, j));
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





function makeRightPanel(){
  var rightPanel = $('<div class="col-lg-3 right-panel"></div>')
    , bsCollapse = $('<div id="bs-collapse" class="panel-group right-panel--fixed-panel"></div>')
    , rightPanelWidth = $('<div class="right-panel-block"></div>')
    , firstPanel = $('<div class="right-first-panel right-first-panel--margin"></div>')
    , firstPanelWrap = $('<div class="panel right-first-panel__panel"></div>')
    , firstPanelWrapHead = $('<div class="panel-heading right-panel-heading"></div>')
    , firstPanelWrapHeadRow = $('<div class="row right-panel-heading__row"></div>')

    , firstPanelWrapHeadRowCol1 = $('<div class="right-panel-heading__icon"></div>')
    , firstPanelWrapHeadRowCol1Icon = $('<i class="fa fa-pie-chart" aria-hidden="true"></i>')

    , firstPanelWrapHeadRowCol2 = $('<div class="right-panel-heading__title"></div>')
    , firstPanelWrapHeadRowCol2H4 = $('<h4 class="right-panel-heading__title--title"></h4>')
    , firstPanelWrapHeadRowCol2H4a = $('<a class="right-panel-heading__title--link" data-toggle="collapse" data-parent="" href="#two"></a>').text('Ocena')

    , firstPanelWrapOne = $('<div  id="two"  class="panel-collapse collapse in right-panel-two" aria-expanded="true"></div>')
    , firstPanelWrapOneBody = $('<div class="panel-body right-panel-body right-panel-body--comment" data-comment="comment"></div>')
    , firstPanelWrapOneBodyRow1 = $('<div class="row"></div>')
    , firstPanelWrapOneBodyRow1Col1 = $('<div class="right-panel-body__label"></div>')
    , firstPanelWrapOneBodyRow1Col1H5 = $('<h5 class="comment"></h5>').text('Opis')
    , firstPanelWrapOneBodyRow2 = $('<div class="evidences-content-assess__editable-text right-panel-body__editable-text" data-name="editable-text"></div>')
    , firstPanelWrapOneBodyRow3 = $('<div class="row"></div>')
    , firstPanelWrapOneBodyRow3Col = $('<div class="right-panel-body__buttons"></div>')
    , firstPanelWrapOneBodyRow3ColButton = $('<button class="btn btn-primary btn-sm pull-right" type="button" id="removeAssess"></button>').text('Anuluj ocenę')
    , firstPanelWrapOneBodyRow3ColButton2 = $('<button class="btn btn-primary btn-sm pull-right" type="button" id="saveAssess"></button>').text('Zapisz ocenę');


  firstPanelWrapHeadRowCol2H4.append(firstPanelWrapHeadRowCol2H4a);
  firstPanelWrapHeadRowCol2.append(firstPanelWrapHeadRowCol2H4);
  firstPanelWrapHeadRowCol1.append(firstPanelWrapHeadRowCol1Icon);
  firstPanelWrapHeadRow.append(firstPanelWrapHeadRowCol1, firstPanelWrapHeadRowCol2);
  firstPanelWrapHead.append(firstPanelWrapHeadRow);

  firstPanelWrapOneBodyRow3Col.append(firstPanelWrapOneBodyRow3ColButton, firstPanelWrapOneBodyRow3ColButton2);
  firstPanelWrapOneBodyRow3.append(firstPanelWrapOneBodyRow3Col);
  firstPanelWrapOneBodyRow1Col1.append(firstPanelWrapOneBodyRow1Col1H5);
  firstPanelWrapOneBodyRow1.append(firstPanelWrapOneBodyRow1Col1);
  firstPanelWrapOneBody.append(firstPanelWrapOneBodyRow1,firstPanelWrapOneBodyRow2,firstPanelWrapOneBodyRow3);
  firstPanelWrapOne.append(firstPanelWrapOneBody);

  firstPanelWrap.append(firstPanelWrapHead, firstPanelWrapOne);
  firstPanel.append(firstPanelWrap);




  var secondPanel = $('<div class="right-second-panel"></div>')
    , secondPanelWrap = $('<div class="panel right-second-panel__panel"></div>')
    , secondPanelWrapHead = $('<div class="panel-heading right-panel-heading"></div>')
    , secondPanelWrapHeadRow = $('<div class="row right-panel-heading__row"></div>')
    , secondPanelWrapHeadRowCol1 = $('<div class="right-panel-heading__icon"></div>')
    , secondPanelWrapHeadRowCol1Icon = $('<i class="fa fa-file-text-o" aria-hidden="true"></i>')

    , secondPanelWrapHeadRowCol2 = $('<div class="right-panel-heading__title"></div>')
    , secondPanelWrapHeadRowCol2H4 = $('<h4 class="right-panel-heading__title--title"></h4>')
    , secondPanelWrapHeadRowCol2H4a = $('<a class="right-panel-heading__title--link" data-toggle="collapse" data-parent="" href="#one" aria-expanded="true"></a>').text('Szczegóły')

    , secondPanelWrapOne = $('<div id="one" class="panel-collapse collapse in right-panel-one" aria-expanded="true"></div>')
    , secondPanelWrapOneBody = $('<div class="panel-body right-panel-body"></div>')

    , secondPanelWrapOneBodyRow1 = $('<div class="row"></div>')
    , secondPanelWrapOneBodyRow1C1 = $('<div class="right-panel-body__label"></div>')
    , secondPanelWrapOneBodyRow1C1H5 = $('<h5></h5>').text('Nazwa')
    , secondPanelWrapOneBodyRow1C2 = $('<div class="right-panel-body__title"></div>')
    , secondPanelWrapOneBodyRow1C2H5 = $('<h5 class="title-claim"></h5>').text('Ocena zgodności Systemu Zarządzania Bezpieczeństwem Informacji z wymaganiami ISO 27001:2014')

    , secondPanelWrapOneBodyRow2 = $('<div class="row"></div>')
    , secondPanelWrapOneBodyRow2C1 = $('<div class="right-panel-body__label "></div>')
    , secondPanelWrapOneBodyRow2C1H5 = $('<h5></h5>').text('Etykieta:')
    , secondPanelWrapOneBodyRow2C2 = $('<div class="right-panel-body__title"></div>')
    , secondPanelWrapOneBodyRow2C2H5 = $('<h5 class="label-claim"></h5>')

    , secondPanelWrapOneBodyRow3 = $('<div class="row"></div>')
    , secondPanelWrapOneBodyRow3C1 = $('<div class="right-panel-body__label "></div>')
    , secondPanelWrapOneBodyRow3C1H5 = $('<h5></h5>').text('Tagi')
    , secondPanelWrapOneBodyRow3C2 = $('<div class="right-panel-body__title"></div>')

    , secondPanelWrapOneBodyRow4 = $('<div class="row"></div>')
    , secondPanelWrapOneBodyRow4C1 = $('<div class="right-panel-body__label"></div>')
    , secondPanelWrapOneBodyRow4C1H5 = $('<h5></h5>').text('Opis')
    , secondPanelWrapOneBodyRow4C2 = $('<div class="right-panel-body__title"></div>')
    , secondPanelWrapOneBodyRow4C2H5 = $('<h5 class="right-panel-body__title--description"></h5>');


  secondPanelWrapOneBodyRow4C2.append(secondPanelWrapOneBodyRow4C2H5);
  secondPanelWrapOneBodyRow4C1.append(secondPanelWrapOneBodyRow4C1H5);
  secondPanelWrapOneBodyRow4.append(secondPanelWrapOneBodyRow4C1, secondPanelWrapOneBodyRow4C2);

  secondPanelWrapOneBodyRow3C1.append(secondPanelWrapOneBodyRow3C1H5);
  secondPanelWrapOneBodyRow3.append(secondPanelWrapOneBodyRow3C1, secondPanelWrapOneBodyRow3C2);

  secondPanelWrapOneBodyRow2C2.append(secondPanelWrapOneBodyRow2C2H5);
  secondPanelWrapOneBodyRow2C1.append(secondPanelWrapOneBodyRow2C1H5);
  secondPanelWrapOneBodyRow2.append(secondPanelWrapOneBodyRow2C1, secondPanelWrapOneBodyRow2C2);

  secondPanelWrapOneBodyRow1C2.append(secondPanelWrapOneBodyRow1C2H5);
  secondPanelWrapOneBodyRow1C1.append(secondPanelWrapOneBodyRow1C1H5);
  secondPanelWrapOneBodyRow1.append(secondPanelWrapOneBodyRow1C1, secondPanelWrapOneBodyRow1C2);
  secondPanelWrapOneBody.append(secondPanelWrapOneBodyRow1, secondPanelWrapOneBodyRow2, secondPanelWrapOneBodyRow3, secondPanelWrapOneBodyRow4 );
  secondPanelWrapOne.append(secondPanelWrapOneBody);

  secondPanelWrapHeadRowCol2H4.append(secondPanelWrapHeadRowCol2H4a);
  secondPanelWrapHeadRowCol2.append(secondPanelWrapHeadRowCol2H4);
  secondPanelWrapHeadRowCol1.append(secondPanelWrapHeadRowCol1Icon);
  secondPanelWrapHeadRow.append(secondPanelWrapHeadRowCol1, secondPanelWrapHeadRowCol2);
  secondPanelWrapHead.append(secondPanelWrapHeadRow);
  secondPanelWrap.append(secondPanelWrapHead, secondPanelWrapOne);
  secondPanel.append(secondPanelWrap);

  rightPanelWidth.append(firstPanel, secondPanel);
  bsCollapse.append(rightPanelWidth);
  rightPanel.append(bsCollapse);


  return rightPanel;
}
