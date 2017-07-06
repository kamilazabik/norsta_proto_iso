/**
 * Tworzy panel główny
 *
 */

function makeMainPanel(){
  var mainPanel = $('<div class="content-main-panel"></div>')
    // , col = $('<div class="col-xs-12"></div>')
    // , col1 = $('<div class="col-xs-12"></div>')
    , col1row = $('<div class="panel-header"></div>')
    , col1rowTitleMain = $('<div class="panel-header-title"></div>')
    , col1rowTitleMainH3 = $('<h3></h3>').attr('data-title', 'A0').text('Ocena zgodności Systemu Zarządzania Bezpieczeństwem Informacji z wymaganiami ISO 27001:2014')
    , col1rowAssess = $('<div class="panel-header-assessment"></div>')
    , col1rowAssessPie = $('<div class="pie panel-header-assessment__pie" data-name="A"></div>')
    , col1rowAssess1 = $('<div class="panel-header-assessment"></div>')
    , col1rowAssess1numVal = $('<h3 class="panel-header-assessment__value" data-number ="A"></h3>')
    , col1rowAssess1numValPer = $('<h3 class="panel-header-assessment__percent" data-percent ="A"></h3>')
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
    , panelHeading = $('<div class="panel-heading allPanels-panel-heading"></div>')
    , rowPanel = $('<div class="panel-title" data-panel="' + numberClass + '"></div>')
    , colNumber = $('<div class="panel-title-number"></div>')
    , colNumberH4 = $('<h4 class="lab-hseq"></h4>')
    , colTitle = $('<div class="panel-title-title"></div>')
    , colTitleH4 = $('<h4 class="panel-title-title__font-color"></h4>').attr('data-title', numberClass).text(oneTitle)
    , colAssess = $('<div class="panel-title-assessment"></div>')
    , colAssesstRow = $('<div class="row"></div>')
    , colAssessRowCol1 = $('<div class="panel-title-assessment-icon"></div>')
    , colAssessRowCol2 = $('<div class="panel-title-assessment-value"></div>')
    , colAssessRowColPie = $('<div class="pie panel-title-assessment-icon__pie pull-left"></div>').attr('data-name', numberClass)
    , colAssessRowColNumValue = $('<p class="text-left panel-title-assessment-value__number" data-number ="' + numberClass + '"></p>')
    , colAssessRowColNumValuePer = $('<p class="text-left panel-title-assessment-value__percent" data-percent ="' + numberClass + '"></p>')
    , colBar = $('<div class="panel-title-bar-slider"></div>')
    , colBarTriangle = $('<img class="panel-title-bar-slider__triangle" src="images/triangle.png">')
    , colTriangle = $('<div class="panel-title-triangle"></div>')
    , colTriangleImg = $('<img class="panel-title-triangle__img" src="images/triangle.png">')


    , max = isoObject[numberClass].maxDegree
    , children = isoObject[numberClass].children
    , parent = isoObject[numberClass].parent
    , colBarSlider = $('<input class=\'slider\' type=\'range\' value=\'0\' min=\'0\' max=' + max + ' name=\'' + numberClass + '\' data-parent=\'' + parent + '\' data-children=\'' + children + '\' disabled >')


    , colButton = $('<div class="panel-title-buttons"></div>')
    , colButtonRow1 = $('<div class="row"></div>')
    , colButtonRow1Col1 = $('<div class="panel-title-buttons-body">')
    , colButtonRow2 = $('<div class="row"></div>')
    , colButtonRow2Col1 = $('<div class="panel-title-buttons-body"></div>')

    , panelBody = $('<div class="panel-body allPanels-panel-body"></div>')
    // , colFilterGroup = $('<div class="col-md-12 filter-group"></div>');

  colTriangle.append(colTriangleImg);
  colBar.append(colBarTriangle);
  colButtonRow1.append(colButtonRow1Col1);
  colButtonRow2.append(colButtonRow2Col1);
  colAssessRowCol2.append(colAssessRowColNumValue, colAssessRowColNumValuePer);
  colAssessRowCol1.append(colAssessRowColPie);
  colAssesstRow.append(colAssessRowCol1, colAssessRowCol2);
  colAssess.append(colAssesstRow);
  colNumber.append(colNumberH4);
  colTitle.append(colTitleH4);
  // panelBody.append(colFilterGroup);
  rowPanel.append(colNumber, colTitle, colAssess, colTriangle, colBar, colButton);
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
    $('.panel-title-bar-slider').append(sliderTitle[numberClass]);
  }else {
    $('.panel-title-bar-slider').append(colBarSlider);
  }

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
    , row = $('<div class=\'panel-block\' data-panel=\'' + numberOfChild + '\'></div>')
    , col1 = $('<div class=\'panel-block-number\'></div>')
    , col1h5 = $('<h5> </h5>').text(numberOfChildrenWithDots[i - 1])
    , col2 = $('<div class=\'panel-block-title\'></div>')
    , col2a = $('<a class="panel-block-title__font-color"></a>').attr('href', '#').attr('data-title', numberOfChild)
// class="title-hseq'+numberClass+' panel-title__title--font-color"

    , col2h5 = $('<h5 class="panel-block-title__font-color"></h5>').text(nameOfChildren[i - 1])
    , col4 = $('<div class=\'panel-block-assessment\'></div>')
    , col4row = $('<div class=\'row\'></div>')
    , col4rowCol1 = $('<div class=\'panel-block-assessment-icon\'></div>')
    , col4rowCol2 = $('<div class=\'panel-block-assessment-value \'></div>')
    , col4rowCol2pie = $('<div class=\'pie panel-block-assessment-icon__pie pull-left\'></div>').attr('data-name', numberOfChild)
    , col4rowCol2h6 = $('<p class=\'panel-block-assessment-value__number\' data-number =\'' + numberOfChild + '\'></p>')
    , col4rowCol2h6per = $('<p class=\'panel-block-assessment-value__percent\' data-percent =\'' + numberOfChild + '\'></p>')
    , col5 = $('<div class=\'panel-block-bar-slider\'></div>')
    , colBarTriangle = $('<img class="panel-block-bar-slider__triangle" src="images/triangle.png">')
    , colTriangle = $('<div class="panel-block-triangle"></div>')
    , colTriangleImg = $('<img class="panel-block-triangle__img" src="images/triangle.png">')
    , col5input
    , max = childrenDegree[i-1]
    , col6
    , col7;


  if (isoObject[numberOfChild].children) {
    var children = isoObject[numberOfChild].children;
    col6 = $('<div class=\'panel-block-buttons panel-block-buttons--xs' + numberOfChild + '\'></div>')
    col5input = $('<input class=\'slider\' type=\'range\' value=\'0\' min=\'0\' max=' + max + ' name=\'' + numberOfChild + '\' data-parent=\'' + numberClass + '\' data-children=\'' + children + '\' disabled >');
    col6.append(makeButtonExpand(numberOfChildren, i));
  }else{
    col6 = $('<div class=\'panel-block-buttons panel-block-buttons--xs ' + numberOfChild + '\'></div>')
    col5input = $('<input class=\'slider\' type=\'range\' value=\'0\' min=\'0\' max=' + max + ' name=\'' + numberOfChild + '\' data-parent=\'' + numberClass + '\'  >');
  }

  if(isoObject[numberOfChild]['numberOfEvidence'] != undefined) {
    col7 = $('<div id=\'collapsePanelDetails' + numberOfChild + '\' class=\'col-xs-12 collapse panel-block-details\'></div>').append(makeDetailsPanel(numberOfChildren, i));
    col6.append(makeButtonsOpenDetailsAddEvid(numberOfChildren, i,numberOfChild, false));
  }else{
    col7 = $('<div id=\'collapsePanelDetails' + numberOfChild + '\' class=\'hidden-xl hidden-lg col-xs-12 collapse panel-block-details\'></div>').append(makeDetailsPanel(numberOfChildren, i));
    col6.append(makeButtonsOpenDetailsAddEvid(numberOfChildren, i,numberOfChild, true));
  }


  colTriangle.append(colTriangleImg);
  col1.append(col1h5);
  col2a.append(col2h5);
  col2.append(col2a);
  col4rowCol1.append(col4rowCol2pie);
  col4rowCol2.append(col4rowCol2h6, col4rowCol2h6per);
  col4row.append(col4rowCol1, col4rowCol2, col4rowCol2);
  col4.append(col4row);
  col5.append(colBarTriangle, col5input);
  row.append(col1, col2, col4, colTriangle, col5, col6, col7);

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
    , panelContent = $('<div class="panel-body panel-content allPanels-panel-body "></div>')

  panelDefault.append(panelContent);

  return panelDefault;

}//makeFirstPartOfMainPage

function makeSecondPartOfMainPage(numberOfChildMainPanel,nameOfChildMainPanel,childDegreeMainPanel,j ){
  var numberOfChildMainPan=  numberOfChildMainPanel[j - 1]
    , panelRow = $('<div class=\'panel-block\' data-panel=\'' + numberOfChildMainPan + '\'></div>')
    , panelRowCol1 = $('<div class="panel-block-number"></div>')
    , panelRowCol1H4 = $('<h4></h4>').text(numberOfChildMainPanel[j-1])
    , panelRowCol2 = $('<div class="panel-block-title"></div>')
    , panelRowCol2A = $('<a></a>').attr('href', '#').attr('data-title', numberOfChildMainPan)
    , panelRowCol2AH4 = $('<h4 class="panel-block-title__font-color"></h4>').text(nameOfChildMainPanel[j])
    , panelRowCol4 = $('<div class="panel-block-assessment"></div>')
    , panelRowCol4Row = $('<div class="row"></div>')
    , panelRowCol4RowC1 = $('<div class="panel-block-assessment-icon"></div>')
    , panelRowCol4RowC1Pie = $('<div class=\'pie panel-block-assessment-icon__pie pull-left\'></div>').attr('data-name', numberOfChildMainPan)
    , maxPanel = childDegreeMainPanel[j-1]
    , panelRowCol4RowC2 = $('<div class="panel-block-assessment-value"></div>')
    , panelRowCol4RowC2H6 = $('<p class=\'panel-block-assessment-value__number\' data-number=\'' + numberOfChildMainPan + '\'></p>').text('0/' + maxPanel)
    , panelRowCol4RowC2H6Per = $('<p class=\'panel-block-assessment-value__percent\' data-percent =\'' + numberOfChildMainPan + '\'></p>').text('0%')
    , panelRowCol5 = $('<div class="panel-block-bar-slider"></div>')
    , panelRowCol5Triangle = $('<img class="panel-block-bar-slider__triangle" src="images/triangle.png">')

    , panelRowColTriangle = $('<div class="panel-block-triangle"></div>')
    , panelRowColTriangleImg = $('<img class="panel-block-triangle__img" src="images/triangle.png">')

    , panelRowCol5Span = $('<span class=\'numberValueBig' + numberOfChildMainPan + ' numberValue\' ></span>')
    , panelChildren = isoObject[numberOfChildMainPan].children
    , panelRowCol5Input = $('<input class=\'slider\' type=\'range\' value=\'0\' min=\'0\' max=' + maxPanel + ' name=\'' + numberOfChildMainPan + '\' data-parent=\'A\' data-children=\'' + panelChildren + '\' disabled >')
    , panelRowCol6 = $('<div class="panel-block-buttons"></div>')
    , panelRowCol7;
    // , panelRowCol7 = $('<div id=\'collapsePanelDetails' + numberOfChildMainPan + '\' class=\'hidden-xl hidden-lg col-md-12 col-sm-12 col-xs-12 collapse evidences\'></div>').append(makeDetailsPanel(numberOfChildMainPanel, j))

  panelRowCol1.append(panelRowCol1H4);
  panelRowCol2A.append(panelRowCol2AH4);
  panelRowCol2.append(panelRowCol2A);
  panelRowCol4RowC1.append(panelRowCol4RowC1Pie);
  panelRowCol4RowC2.append(panelRowCol4RowC2H6, panelRowCol4RowC2H6Per);
  panelRowCol4Row.append(panelRowCol4RowC1, panelRowCol4RowC2);
  panelRowCol4.append(panelRowCol4Row);
  panelRowCol5.append(panelRowCol5Triangle, panelRowCol5Span, panelRowCol5Input);

  panelRowColTriangle.append(panelRowColTriangleImg)

 if(isoObject[numberOfChildMainPan]['numberOfEvidence'] != undefined) {
   panelRowCol7 = $('<div id=\'collapsePanelDetails' + numberOfChildMainPan + '\' class=\'col-xs-12 collapse panel-block-details\'></div>').append(makeDetailsPanel(numberOfChildMainPanel, j));
   panelRowCol6.append(makeButtonExpand(numberOfChildMainPanel, j), makeButtonsOpenDetailsAddEvid(numberOfChildMainPanel, j, numberOfChildMainPan, false));
 }else{
   panelRowCol7 = $('<div id=\'collapsePanelDetails' + numberOfChildMainPan + '\' class=\'hidden-xl hidden-lg col-xs-12 collapse panel-block-details\'></div>').append(makeDetailsPanel(numberOfChildMainPanel, j));
   panelRowCol6.append(makeButtonExpand(numberOfChildMainPanel, j), makeButtonsOpenDetailsAddEvid(numberOfChildMainPanel, j, numberOfChildMainPan, true));
 }

  panelRow.append(panelRowCol1, panelRowCol2, panelRowCol4, panelRowColTriangle, panelRowCol5, panelRowCol6, panelRowCol7);
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
    , firstPanelWrapHeadRowCol2H4 = $('<h4 class="right-panel-heading-title__title"></h4>')
    , firstPanelWrapHeadRowCol2H4a = $('<a class="right-panel-heading-title__link" data-toggle="collapse" data-parent="" href="#two"></a>').text('Ocena')

    , firstPanelWrapOne = $('<div  id="two"  class="panel-collapse collapse in right-panel-two" aria-expanded="true"></div>')
    , firstPanelWrapOneBody = $('<div class="panel-body right-panel-body right-panel-body--comment" data-comment="comment"></div>')
    , firstPanelWrapOneBodyRow1 = $('<div class="row"></div>')
    , firstPanelWrapOneBodyRow1Col1 = $('<div class="right-panel-body-label"></div>')
    , firstPanelWrapOneBodyRow1Col1H5 = $('<h5 class="comment"></h5>').text('Opis')
    , firstPanelWrapOneBodyRow2 = $('<div class="editable-text" data-name="editable-text"></div>')
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


  var secondPanel = $('<div class="right-panel-second"></div>')
    , secondPanelWrap = $('<div class="panel right-panel-second-panel"></div>')
    , secondPanelWrapHead = $('<div class="panel-heading right-panel-heading"></div>')
    , secondPanelWrapHeadRow = $('<div class="right-panel-heading-row"></div>')
    , secondPanelWrapHeadRowCol1 = $('<div class="right-panel-heading-icon"></div>')
    , secondPanelWrapHeadRowCol1Icon = $('<i class="fa fa-file-text-o" aria-hidden="true"></i>')

    , secondPanelWrapHeadRowCol2 = $('<div class="right-panel-heading-title"></div>')
    , secondPanelWrapHeadRowCol2H4 = $('<h4 class="right-panel-heading-title__title"></h4>')
    , secondPanelWrapHeadRowCol2H4a = $('<a class="right-panel-heading-title__link" data-toggle="collapse" data-parent="" href="#one" aria-expanded="true"></a>').text('Szczegóły')
    , secondPanelWrapOne = $('<div id="one" class="panel-collapse collapse in right-panel-one" aria-expanded="true"></div>')
    , secondPanelWrapOneBody = $('<div class="panel-body right-panel-body"></div>');


  for (var i = 0; i < 4; i++) {
    secondPanelWrapOneBody.append(($('<div class="row"></div>'))
      .append($('<div class="right-panel-body-label"></div>'), $('<div class="right-panel-body-title"></div>')))
  }

  var secondPanelWrapOneBodyRow1C1H5 = $('<h5></h5>').text('Nazwa:')
    , secondPanelWrapOneBodyRow1C2H5 = $('<h5 class="title-claim"></h5>').text('Ocena zgodności Systemu Zarządzania Bezpieczeństwem Informacji z wymaganiami ISO 27001:2014')
    , secondPanelWrapOneBodyRow2C1H5 = $('<h5></h5>').text('Etykieta:')
    , secondPanelWrapOneBodyRow2C2H5 = $('<h5 class="label-claim"></h5>')
    , secondPanelWrapOneBodyRow3C1H5 = $('<h5></h5>').text('Tagi:')
    , secondPanelWrapOneBodyRow4C1H5 = $('<h5></h5>').text('Opis:')
    , secondPanelWrapOneBodyRow4C2H5 = $('<h5 class="right-panel-body__title--description"></h5>');

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
