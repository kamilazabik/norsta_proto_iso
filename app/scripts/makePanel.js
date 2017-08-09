/**
 * Tworzy panel główny
 *
 */

function makeMainPanel(){
  var mainPanel = $('<div class="content-main-panel"></div>')
    , col1row = $('<div class="panel-header"></div>')
    , col1rowTitleMain = $('<div class="panel-header-title"></div>')
    , col1rowTitleMainH3 = $('<h1></h1>').attr('data-title', 'A0').text('Ocena zgodności Systemu Zarządzania Bezpieczeństwem Informacji z wymaganiami ISO 27001:2014')
    , col1rowAssessIcon = $('<div class="panel-header-assessment-icon"></div>')
    , col1rowAssessIconPie = $('<div class="pie panel-header-assessment-icon__pie" data-name="A"></div>')
    , col1rowAssessText = $('<div class="panel-header-assessment-text"></div>')
    , col1rowAssessTextVal = $('<h1 class="panel-header-assessment__value" data-number ="A"></h1>')
    , col1rowAssessTextValPer = $('<h1 class="panel-header-assessment__percent" data-percent ="A"></h1>')
    , col1rowBar = $('<div class="panel-header-bar-slider"></div>')
    , col1rowBarInput = $('<input class="slider" value="0" min="0" max="1500" step="1" name="A" data-children="A5,A6,A7,A8,A9,A10,A11,A12,A13,A14,A15,A16,A17,A18" type="range" disabled>')
    , col1rowButtons = $('<div class="panel-header-filter"></div>')
    , col1rowButtonsSelect = $('<select id="selectAssessment" class="form-control panel-header-form-control" ></select>')
    , col1rowButtonsSelectOption1 = $('<option id="fastAssess">Szybka ocena</option>')
    , col1rowButtonsSelectOption2 = $('<option id="normalAssess">Normalna ocena</option>')
    , col1rowButtonsSelectOption3 = $('<option id="noAssessment">Brak oceny</option>');

  col1rowButtonsSelect.append(col1rowButtonsSelectOption1,col1rowButtonsSelectOption2,     col1rowButtonsSelectOption3);
  col1rowButtons.append(col1rowButtonsSelect);
  col1rowTitleMain.append(col1rowTitleMainH3);
  col1rowAssessIcon.append(col1rowAssessIconPie);
  col1rowAssessText.append(col1rowAssessTextVal, col1rowAssessTextValPer);
  col1rowBar.append(col1rowBarInput);
  col1row.append(col1rowTitleMain, col1rowAssessIcon, col1rowAssessText, col1rowBar, col1rowButtons);
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
    , paddingContent = $('.panels')
    , panelTitle = $('<div class="panel-list"></div>')
    , panelHeading = $('<div class="panel-list-panel-heading"></div>')
    , rowPanel = $('<div class="panel-title" data-panel="' + numberClass + '"></div>')
    , colNumber = $('<div class="panel-title-number"></div>')
    , colNumberH4 = $('<h2 class="lab-hseq"></h2>')
    , colTitle = $('<div class="panel-title-title"></div>')
    , colTitleH4 = $('<h2 class="panel-title-title__font-color"></h2>').attr('data-title', numberClass).text(oneTitle)
    , colAssessIcon = $('<div class="panel-title-assessment-icon"></div>')
    , colAssessRowColPie = $('<div class="pie panel-title-assessment-icon__pie pull-left"></div>').attr('data-name', numberClass)
    , colAssessText = $('<div class="panel-title-assessment-text"></div>')
    , colAssessTextValue = $('<p class="text-left panel-title-assessment-text__number" data-number ="' + numberClass + '"></p>')
    , colAssessTextValuePer = $('<p class="text-left panel-title-assessment-text__number" data-percent ="' + numberClass + '"></p>')
    , colBar = $('<div class="panel-title-bar-slider"></div>')
    , max = isoObject[numberClass].maxDegree
    , children = isoObject[numberClass].children
    , parent = isoObject[numberClass].parent
    , colBarSlider = $('<input class=\'slider\' type=\'range\' value=\'0\' min=\'0\' max=' + max + ' name=\'' + numberClass + '\' data-parent=\'' + parent + '\' data-children=\'' + children + '\' disabled >')
    , colBarArrowLeft = $('<button type=\'button\' class=\'btn btn-arrow-slider\' disabled><i class=\'glyphicon glyphicon-chevron-left\' aria-hidden=\'true\'></i></button>')
    , colBarArrowRight = $('<button type=\'button\' class=\'btn btn-arrow-slider\' disabled><i class=\'glyphicon glyphicon-chevron-right\' aria-hidden=\'true\'></i></button>')

    , colButton = $('<div class="panel-title-buttons"></div>')
    , colButtonRow1 = $('<div class="panel-title-buttons-row"></div>')
    , colButtonRow1Col1 = $('<div class="panel-title-buttons-body">')
    , colButtonRow2 = $('<div class="panel-title-buttons-row"></div>')
    , colButtonRow2Col1 = $('<div class="panel-title-buttons-body"></div>')
    , panelBody = $('<div class="panel-list-panel-body"></div>')

  colBar.append(colBarArrowLeft)
  colButtonRow1.append(colButtonRow1Col1);
  colButtonRow2.append(colButtonRow2Col1);
  colAssessText.append(colAssessTextValue, colAssessTextValuePer);
  colAssessIcon.append(colAssessRowColPie);
  colNumber.append(colNumberH4);
  colTitle.append(colTitleH4);
  // panelBody.append(colFilterGroup);
  rowPanel.append(colNumber, colTitle, colAssessIcon, colAssessText, colBar, colButton);
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
    , buttonUp = $('<button type=\'button\' class=\'btn btn-sm btn-up\' data-label=\'' + isoObject[numberClass].parent + '\' name=\'' + isoObject[numberClass].parent + '\'>Do góry</button>');
  var buttonLeft = $('<button type=\'button\' class=\'btn btn-sm btn-arrow\' data-label=\'' + prevSibling + '\'></button>').append(arrowLeft);
  var buttonRight = $('<button type=\'button\' class=\'btn btn-sm btn-arrow\' data-label=\'' + nextSibling + '\'></button>').append(arrowRight);

  if(prevSibling == undefined) {
    buttonLeft.attr('disabled', 'disabled')
  }
    if(nextSibling == undefined){
    buttonRight.attr('disabled', 'disabled')
  }

  $('.lab-hseq').text(numberClassWithDots);


  if(sliderTitle[numberClass]){
    colBar.append(sliderTitle[numberClass]);
  }else {
    colBar.append(colBarSlider);
  }

  colBar.append(colBarArrowRight)
  colButtonRow1Col1.append(buttonUp);
  colButtonRow2Col1.append(buttonRight, buttonLeft);
  colButton.append(colButtonRow1, colButtonRow2);

  return paddingContent;
}//makePanelsTitle

/**
 * Funkacja
 *
 */

function makeFirstPartOfMainPage() {
  var panelDefault = $('<div class="panel-list"></div>')
    , panelContent = $('<div class="panel-list-panel-body "></div>')

  panelDefault.append(panelContent);

  return panelDefault;

}//makeFirstPartOfMainPage


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
    , row = $('<div class=\'panel-block\' data-panel=\'' + numberOfChild + '\'></div>')
    , col1 = $('<div class=\'panel-block-number\'></div>')
    , col1h5 = $('<h2> </h2>').text(numberOfChildrenWithDots[i - 1])
    , col2 = $('<div class=\'panel-block-title\'></div>')
    , col2a = $('<a class="panel-block-title__font-color"></a>').attr('href', '#').attr('data-title', numberOfChild)
    , maxPanel = childrenDegree[i - 1]
    , col2h5 = $('<h2 class="panel-block-title__font-color"></h2>').text(nameOfChildren[i - 1])
    , col4 = $('<div class=\'panel-block-assessment-icon\'></div>')
    , col4rowCol2pie = $('<div class=\'pie panel-block-assessment-icon__pie pull-left\'></div>').attr('data-name', numberOfChild)
    , colAssessText = $('<div class=\'panel-block-assessment-text\'></div>')
    , col4rowCol2h6 = $('<p class=\'panel-block-assessment-text__number\' data-number =\'' + numberOfChild + '\'></p>').text('0/' + maxPanel)
    , col4rowCol2h6per = $('<p class=\'panel-block-assessment-text__number\' data-percent =\'' + numberOfChild + '\'></p>').text('0%')
    , col5 = $('<div class=\'panel-block-bar-slider\'></div>')
    , col5BarArrowLeft = $('<button type=\'button\' class=\'btn btn-arrow-slider\'><i class=\'glyphicon glyphicon-chevron-left\' aria-hidden=\'true\'></i></button>')
    , col5BarArrowRight = $('<button type=\'button\' class=\'btn btn-arrow-slider\'><i class=\'glyphicon glyphicon-chevron-right\' aria-hidden=\'true\'></i></button>')
    , col5input
    , max = childrenDegree[i-1]
    , col6
    , col7;


  if (isoObject[numberOfChild].children) {
    var children = isoObject[numberOfChild].children;
    col6 = $('<div class=\'panel-block-buttons ' + numberOfChild + '\'></div>')
    col5input = $('<input class=\'slider\' type=\'range\' value=\'0\' min=\'0\' max=' + max + ' name=\'' + numberOfChild + '\' data-parent=\'' + numberClass + '\' data-children=\'' + children + '\' disabled >');
    col6.append(makeButtonExpand(numberOfChildren, i));
    col5BarArrowLeft.attr('disabled', 'disabled')
    col5BarArrowRight.attr('disabled', 'disabled')
  }else{
    col6 = $('<div class=\'panel-block-buttons panel-block-buttons--xs ' + numberOfChild + '\'></div>')
    col5input = $('<input class=\'slider\' type=\'range\' value=\'0\' min=\'0\' max=' + max + ' name=\'' + numberOfChild + '\' data-parent=\'' + numberClass + '\'  >');
    col5.addClass('panel-block-bar-slider--xs')
  }

  if(isoObject[numberOfChild]['numberOfEvidence'] != undefined) {
    col7 = $('<div id=\'collapsePanelDetails' + numberOfChild + '\' class=\'col-xs-12 collapse panel-block-details\'></div>').append(makeDetailsPanel(numberOfChildren, i));
    col6.append(makeButtonsOpenDetailsAddEvid(numberOfChildren, i,numberOfChild, false));
  }else{
    col7 = $('<div id=\'collapsePanelDetails' + numberOfChild + '\' class=\'hidden-xl hidden-lg col-xs-12 collapse panel-block-details\'></div>').append(makeDetailsPanel(numberOfChildren, i));
    col6.append(makeButtonsOpenDetailsAddEvid(numberOfChildren, i,numberOfChild, true));
  }

  col1.append(col1h5);
  col2a.append(col2h5);
  col2.append(col2a);
  colAssessText.append(col4rowCol2h6, col4rowCol2h6per);
  col4.append(col4rowCol2pie);
  col5.append(col5BarArrowLeft, col5input, col5BarArrowRight);
  row.append(col1, col2, col4, colAssessText, col5, col6, col7);

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
    , evidence = $('<div class="col-xs-12 evidences-panel"></div>')
    , evidenceTable = $('<table id=\'' +  numberOfChilderEvid + '\' class=\'table evidences-table\'></table>')
    , evidenceTableHead = $('<thead class="evidences-table-thead"></thead>')
    , evidenceTableBody = $('<tbody class="evidences-table-tbody"></tbody>')
    , evidenceTableTr = $('<tr></tr>')
    , evidenceTableTh1 = $('<th class="evidences-table-thead__th"></th>')
    , evidenceTableTh2 = $('<th class="evidences-table-thead__th">Nazwa</th>')
    , evidenceTableTh3 = $('<th class="evidences-table-thead__th">Repozytorium</th>')
    , evidenceTableTh4 = $('<th class="evidences-table-thead__th">Nazwa dokumentu</th>')
    , evidenceTableTh5 = $('<th class="evidences-table-thead__th"></th>');

  // evidenceTableTh5.append(evidenceTableTh5AddEvidence );
  evidenceTableTr.append(evidenceTableTh1,evidenceTableTh2,evidenceTableTh3,evidenceTableTh4, evidenceTableTh5);
  evidenceTableHead.append(evidenceTableTr);
  evidenceTable.append(evidenceTableHead, evidenceTableBody);
  evidence.append(evidenceTable);

  return evidence
}


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
  var rightPanel = $('<div class="right-panel"></div>')
    , bsCollapse = $('<div id="bs-collapse" class="panel-group right-panel--fixed-panel"></div>')
    , rightPanelWidth = $('<div class="right-panel-block"></div>')
    , firstPanel = $('<div class="right-panel-first right-panel-first--margin"></div>')
    , firstPanelWrap = $('<div class="panel right-panel-first-panel"></div>')
    , firstPanelWrapHead = $('<div class="panel-heading right-panel-heading"></div>')
    , firstPanelWrapHeadRow = $('<div class="right-panel-heading-row"></div>')

    , firstPanelWrapHeadRowCol1 = $('<div class="right-panel-heading-icon"></div>')
    , firstPanelWrapHeadRowCol1Icon = $('<i class="fa fa-pie-chart" aria-hidden="true"></i>')

    , firstPanelWrapHeadRowCol2 = $('<div class="right-panel-heading-title"></div>')
    , firstPanelWrapHeadRowCol2H4 = $('<h2 class="right-panel-heading-title__title"></h2>').text('Ocena')
    , firstPanelWrapHeadRowCol2AH4 = $('<a class="right-panel-heading-title__link" data-toggle="collapse" data-parent="" href="#two"></a>')

    , firstPanelWrapOne = $('<div  id="two"  class="panel-collapse collapse in right-panel-two" aria-expanded="true"></div>')
    , firstPanelWrapOneBody = $('<div class="panel-body right-panel-body right-panel-body--comment" data-comment="comment"></div>')
    , firstPanelWrapOneBodyRow1 = $('<div class="right-panel-body-row"></div>')
    , firstPanelWrapOneBodyRow1Col1 = $('<div class="right-panel-body-label"></div>')
    , firstPanelWrapOneBodyRow1Col1H5 = $('<h5 class="comment"></h5>').text('Opis')
    , firstPanelWrapOneBodyRow2 = $('<div class="editable-text" data-name="editable-text"></div>')
    , firstPanelWrapOneBodyRow3 = $('<div class="-right-panel-body-row"></div>')
    , firstPanelWrapOneBodyRow3Col = $('<div class="right-panel-body__buttons"></div>')
    , firstPanelWrapOneBodyRow3ColButton = $('<button class="btn btn-sm pull-right" type="button" id="removeAssess"></button>').text('Anuluj ocenę')
    , firstPanelWrapOneBodyRow3ColButton2 = $('<button class="btn btn-sm pull-right" type="button" id="saveAssess"></button>').text('Zapisz ocenę');


  firstPanelWrapHeadRowCol2AH4.append(firstPanelWrapHeadRowCol2H4);
  firstPanelWrapHeadRowCol2.append(firstPanelWrapHeadRowCol2AH4);
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


  var secondPanel = $('<div class="right-panel-second"></div>')
    , secondPanelWrap = $('<div class="panel right-panel-second-panel"></div>')
    , secondPanelWrapHead = $('<div class="panel-heading right-panel-heading"></div>')
    , secondPanelWrapHeadRow = $('<div class="right-panel-heading-row"></div>')
    , secondPanelWrapHeadRowCol1 = $('<div class="right-panel-heading-icon"></div>')
    , secondPanelWrapHeadRowCol1Icon = $('<i class="fa fa-file-text-o" aria-hidden="true"></i>')
    , secondPanelWrapHeadRowCol2 = $('<div class="right-panel-heading-title"></div>')
    , secondPanelWrapHeadRowCol2H4 = $('<h2 class="right-panel-heading-title__title"></h2>').text('Szczegóły')
    , secondPanelWrapHeadRowCol2AH4 = $('<a class="right-panel-heading-title__link" data-toggle="collapse" data-parent="" href="#one" aria-expanded="true"></a>')
    , secondPanelWrapOne = $('<div id="one" class="panel-collapse collapse in right-panel-one" aria-expanded="true"></div>')
    , secondPanelWrapOneBody = $('<div class="panel-body right-panel-body"></div>');


  for (var i = 0; i < 4; i++) {
    secondPanelWrapOneBody.append(($('<div class="row"></div>'))
      .append($('<div class="right-panel-body-label"></div>'), $('<div class="right-panel-body-title"></div>')))
  }

  var secondPanelWrapOneBodyRow1C1H5 = $('<h3></h3>').text('Nazwa:')
    , secondPanelWrapOneBodyRow1C2H5 = $('<p class="title-claim"></p>').text('Ocena zgodności Systemu Zarządzania Bezpieczeństwem Informacji z wymaganiami ISO 27001:2014')
    , secondPanelWrapOneBodyRow2C1H5 = $('<h3></h3>').text('Etykieta:')
    , secondPanelWrapOneBodyRow2C2H5 = $('<p class="label-claim"></p>')
    , secondPanelWrapOneBodyRow3C1H5 = $('<h3></h3>').text('Tagi:')
    , secondPanelWrapOneBodyRow4C1H5 = $('<h3></h3>').text('Opis:')
    , secondPanelWrapOneBodyRow4C2H5 = $('<p class="right-panel-body__title--description"></p>');

  var children = secondPanelWrapOneBody.children().children()

  children.each(function () {
    children[0].appendChild(secondPanelWrapOneBodyRow1C1H5[0]);
    children[2].appendChild(secondPanelWrapOneBodyRow2C1H5[0]);
    children[4].appendChild(secondPanelWrapOneBodyRow3C1H5[0]);
    children[6].appendChild(secondPanelWrapOneBodyRow4C1H5[0]);
    children[1].appendChild(secondPanelWrapOneBodyRow1C2H5[0]);
    children[3].appendChild(secondPanelWrapOneBodyRow2C2H5[0]);
    children[7].appendChild(secondPanelWrapOneBodyRow4C2H5[0]);
  });

  secondPanelWrapOne.append(secondPanelWrapOneBody);

  secondPanelWrapHeadRowCol2AH4.append(secondPanelWrapHeadRowCol2H4);
  secondPanelWrapHeadRowCol2.append(secondPanelWrapHeadRowCol2AH4);
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

