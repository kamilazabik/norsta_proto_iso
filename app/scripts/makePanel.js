function makeMainPanel(){
  var mainPanel = $('<div id="main-panel"></div>')
    , col = $('<div class="col-md-12 col-sm-12 col-xs-12"></div>')
    , col1 = $('<div class="col-md-12 col-sm-12 col-xs-12"></div>')
    , col1row = $('<div class="row fixedPos box-header"></div>')
    , col1rowTitleMain = $('<div class="col-lg-6 col-md-3 col-sm-3 col-xs-2 pull-left title-main"></div>')
    , col1rowTitleMainH3 = $('<h3 class="title-hseqA0"></h3>').text('Ocena zgodności Systemu Zarządzania Bezpieczeństwem Informacji z wymaganiami ISO 27001:2014')

    , col1rowAssess = $('<div class="col-lg-1 col-md-1 col-sm-1 col-xs-2 assessment pull-left"></div>')
    , col1rowAssessPie = $('<div class="pie pull-left" data-name="A"></div>')

    , col1rowAssess1 = $('<div class="col-lg-1 col-md-2 col-sm-2 col-xs-2 pull-left assessment"></div>')
    , col1rowAssess1numVal = $('<h4 class="text-left numberValueA"></h4>')
    , col1rowAssess1numValPer = $('<h4 class="text-left numberValue-perA"></h4>')

    , col1rowBar = $('<div class="col-lg-2 col-md-2 col-xs-2 bar"></div>')
    , col1rowBarSpan = $('<span class="numberValueA numberValue"></span>')
    , col1rowBarInput = $('<input class="slider" value="0" min="0" max="1500" step="1" name="A" data-children="A5,A6,A7,A8,A9,A10,A11,A12,A13,A14,A15,A16,A17,A18" type="range" disabled>')

  // data-parent="null"

    , col1rowButtons = $('<div class="col-lg-2 col-md-3 col-sm-3 col-xs-3 pull-left filter"></div>')
    // , col1rowButtonsGroup = $('<div class="btn-group" data-toggle="buttons"></div>')
    // , col1rowButtonsGroupLabel1 = $('<label id="fastAssess" class="btn btn-primary active"></label>')
    // , col1rowButtonsGroupLabel2 = $('<label id="normalAssess" class="btn btn-primary"></label>')
    // , col1rowButtonsGroupLabelInput1 = '<input type="radio" name="options" id="option1" autocomplete="off" checked> Szybka ocena '
    // , col1rowButtonsGroupLabelInput2 = '<input type="radio" name="options" id="option2" class="normalAsses" autocomplete="off"> Normalna ocena'

    ,col1rowButtonsSelect = $('<select id="selectAssessment" class="form-control" ></select>')
    ,col1rowButtonsSelectOption1 = $('<option id="normalAssess">Normalna ocena</option>')
    ,col1rowButtonsSelectOption2 = $('<option id="fastAssess">Szybka ocena</option>')
    ,col1rowButtonsSelectOption3 = $('<option id="noAssessment">Brak oceny</option>')




  col1rowButtonsSelect.append(col1rowButtonsSelectOption1,col1rowButtonsSelectOption2,     col1rowButtonsSelectOption3)
  // col1rowButtonsGroupLabel1.append(col1rowButtonsGroupLabelInput1);
  // col1rowButtonsGroupLabel2.append(col1rowButtonsGroupLabelInput2);
  // col1rowButtonsGroup.append(col1rowButtonsGroupLabel1, col1rowButtonsGroupLabel2);
  col1rowButtons.append(col1rowButtonsSelect);
  col1rowTitleMain.append(col1rowTitleMainH3);
  col1rowAssess.append(col1rowAssessPie);
  col1rowAssess1.append(col1rowAssess1numVal,col1rowAssess1numValPer);
  col1rowBar.append(col1rowBarSpan,col1rowBarInput);
  col1row.append(col1rowTitleMain,col1rowAssess,col1rowAssess1,col1rowBar,col1rowButtons);
  col1.append(col1row);
  col.append(col1);
  mainPanel.append(col);

  return mainPanel;

}//makeMainPanel

function makePanelsTitle(numberClass, oneTitle){

  var numberClassWithDots = addDotsForLabels(numberClass)
    ,paddingContent = $('.col-md-9.col-sm-12.col-xs-12.pull-left.padding-content')
    ,panelTitle= $('<div class="panel panel-default panels-title"></div>')
    ,panelHeading = $('<div class="panel-heading"></div>')
    ,rowPanel = $('<div class="row panel-hseq' + numberClass+' panels box-under-header"></div>')
    ,colNumber = $('<div class="col-md-1 pull-left number"></div>')
    ,colNumberH4 = $('<h4 class="lab-hseq"></h4>')
    ,colTitle = $('<div class="col-md-6 col-sm-5 pull-left title"></div>')
    ,colTitleH4 = $('<h4 class="title-hseq'+numberClass+'"></h4>').text(oneTitle)
    ,colAssess = $('<div class="col-md-2 assessment"></div>')
    ,colAssesstRow = $('<div class="row"></div>')
    ,colAssessRowCol1 = $('<div class="col-md-6"></div>')
    ,colAssessRowCol2 = $('<div class="col-md-6"></div>')
    ,colAssessRowColPie = $('<div class="pie pull-left"></div>')
    ,colAssessRowColNumValue = $('<h5 class="text-left numberValue'+numberClass+'"></h5>')
    ,colAssessRowColNumValuePer = $('<h5 class="text-left numberValue-per'+numberClass+'"></h5>')
    ,colBar = $('<div class="col-md-2 bar"></div>')
    ,colBarSpan = $('<span class="numberValueBig numberValue'+numberClass+'"></span>')
    ,colButton = $('<span class="col-md-1-2 button-expand-three"></span>')
    ,panelBody = $('<div class="panel-body panel-content panels"></div>')
    ,colFilterGroup = $('<div class="col-md-12 filter-group"></div>');

  colBar.append(colBarSpan);
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
    ,indexOfnumberClass = siblings.indexOf(numberClass)
    ,nextSibling = siblings[indexOfnumberClass + 1]
    ,prevSibling = siblings[indexOfnumberClass - 1];

  var pie = $('.panel-heading .pie').attr('data-name', numberClass)
    , arrowLeft = $('<i class=\'fa fa-angle-double-left\' aria-hidden=\'true\'></i>')
    , arrowRight = $('<i class=\'fa fa-angle-double-right\' aria-hidden=\'true\'></i>')
    , buttonUp = $('<button type=\'button\' class=\'claim-hseq' + isoObject[numberClass].parent + ' btn btn-primary btn-sm custom-btn up\'>Do góry</button>');
  var buttonLeft = $('<button type=\'button\' class=\'claim-hseq' + prevSibling + ' btn btn-primary btn-sm custom-btn arrow\'></button>').append(arrowLeft);
  var buttonRight = $('<button type=\'button\' class=\'claim-hseq' + nextSibling + ' btn btn-primary btn-sm custom-btn arrow\'></button>').append(arrowRight);

  if(prevSibling == undefined) {
    buttonLeft.attr('disabled', 'disabled')
  }
    if(nextSibling == undefined){
    buttonRight.attr('disabled', 'disabled')
  }

  $('.lab-hseq').text(numberClassWithDots);
  $('.panel-heading .col-md-2.bar').append(sliderTitle[numberClass]);
  // console.log(sliderTitle)
  $('.col-md-1-2.button-expand-three').append(buttonUp, buttonLeft, buttonRight);

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
    , col1 = $('<div class=\'col-md-1 col-sm-1 box-under-header-sx pull-left number\'></div>')
    , col1h5 = $('<h5> </h5>').text(numberOfChildrenWithDots[i - 1])
    , col2 = $('<div class=\'col-md-5-3 col-sm-10 box-under-header-sx pull-left title\'></div>')
    , col2a = $('<a></a>').addClass('title-hseq' + numberOfChildren[i - 1]).attr('href', '#')
    , col2h5 = $('<h5></h5>').text(nameOfChildren[i - 1])
    , col3 = $('<div class=\'col-md-1 col-sm-1 box-under-header-sx filter\'></div>')
    , col4 = $('<div class=\'col-md-2 box-under-header-sx assessment-icon\'></div>')
    , col4row = $('<div class=\'row\'></div>')
    , col4rowCol1 = $('<div class=\'col-md-6 col-sm-6\'></div>')
    , col4rowCol2 = $('<div class=\'col-md-6 col-sm-6\'></div>')
    , col4rowCol2pie = $('<div class=\' pie pull-left\'></div>').attr('data-name',numberOfChildren[i - 1])
    , col4rowCol2h6 = $('<h5 class=\'numberValue' + numberOfChildren[i - 1] + '\' ></h5>')
    , col4rowCol2h6per = $('<h5 class=\'numberValue-per' + numberOfChildren[i - 1] + '\' ></h5>')
    ,col5 = $('<div class=\'col-md-2 col-sm-5 box-under-header-sx bar\'></div>')
    ,max = childrenDegree[i-1]
    ,col6 = $('<div class=\'col-md-1-2 col-sm-2 box-under-header-sx button-expand\'></div>')
    ,button = $('<button type=\'button\' class=\'claim-hseq' + numberOfChildren[i - 1] + ' btn btn-primary btn-sm custom-btn\'>Rozwiń</button>')
    ,col5input;


  if (isoObject[numberOfChildren[i - 1]] && isoObject[numberOfChildren[i - 1]].children) {
    var children = isoObject[numberOfChildren[i - 1]].children;
    col5input = $('<input class=\'slider\' type=\'range\' value=\'0\' min=\'0\' max=' + max + ' name=\'' + numberOfChildren[i - 1] + '\' data-parent=\'' + numberClass + '\' data-children=\'' + children + '\' disabled >')
    col6.append(button)
  }else {
    col5input = $('<input class=\'slider\' type=\'range\' value=\'0\' min=\'0\' max=' + max + ' name=\'' + numberOfChildren[i - 1] + '\' data-parent=\'' + numberClass + '\' disabled  >')
  }


  col1.append(col1h5);
  col2a.append(col2h5);
  col2.append(col2a);
  col4rowCol1.append(col4rowCol2pie);
  col4rowCol2.append(col4rowCol2h6, col4rowCol2h6per);
  col4row.append(col4rowCol1, col4rowCol2, col4rowCol2);
  col4.append(col4row);
  col5.append(col5input);
  row.append(col1, col2, col3, col4, col5, col6);

  return row
}

function makeFirstPartOfMainPage(){
  // var paddingContent = $('<div class="col-md-9 col-sm-12 col-xs-12 pull-left padding-content"></div>')
  var panelDefault = $('<div class="panel panel-default"></div>')
    , panelContent = $('<div class="panel-body panel-content panels"></div>')
    , panelCol = $('<div class="col-md-12 col-sm-12 col-sx-12"></div>');

  panelContent.append(panelCol);
  panelDefault.append(panelContent);

  return panelDefault;
}//makeBodyPanel

function makeSecondPartOfMainPage(numberOfChildMainPanel,nameOfChildMainPanel,childDegreeMainPanel,j ){
  var panelRow = $('<div class=\'row panel-hseq'+ numberOfChildMainPanel[j - 1]+' hseq space\'></div>')
    , panelRowCol1 = $('<div class="col-md-1 col-sm-1 col-xs-1 box-under-header pull-left number"></div>')
    , panelRowCol1H4 = $('<h4></h4>').text(numberOfChildMainPanel[j-1])
    , panelRowCol2 = $('<div class="col-md-6-3 col-sm-4 col-xs-8 box-under-header pull-left title"></div>')
    , panelRowCol2A = $('<a></a>').addClass('title-hseq' + numberOfChildMainPanel[j - 1]).attr('href', '#')
    , panelRowCol2AH4 = $('<h4></h4>').text(nameOfChildMainPanel[j])

    , panelRowCol3 = $('<div class="col-xs-3 visible-xs box-under-header button-expand"></div>')
    , panelRowCol3Button = $('<button type=\'button\' class=\'claim-hseq' + numberOfChildMainPanel[j - 1] + ' btn btn-primary btn-sm.custom-btn\'>Rozwiń</button>')

    , panelRowCol4 = $('<div class="col-md-2 col-sm-4 col-xs-6 box-under-header assessment-icon"></div>')
    , panelRowCol4Row = $('<div class="row"></div>')
    , panelRowCol4RowC1 = $('<div class="col-md-6 col-sm-6 col-xs-6"></div>')
    , panelRowCol4RowC1Pie = $('<div class=\'pie pull-left\'></div>').attr('data-name',numberOfChildMainPanel[j - 1])

    , maxPanel = childDegreeMainPanel[j-1]
    , panelRowCol4RowC2 = $('<div class="col-md-6 col-sm-6 col-xs-6"></div>')
    , panelRowCol4RowC2H6 = $('<h5 class=\'numberValue' + numberOfChildMainPanel[j - 1] + '\' ></h5>').text('0/' + maxPanel)
    , panelRowCol4RowC2H6Per = $('<h5 class=\'numberValue-per' +  numberOfChildMainPanel[j - 1] + '\' ></h5>').text('0%')
    , panelRowCol4RowC3 = $('<div class="col-md-4 col-sm-4 col-xs-4"></div>')

    , panelRowCol5 = $('<div class="col-md-2 col-sm-2 col-xs-6 box-under-header bar-header"></div>')
    , panelRowCol5Span = $('<span class=\'numberValueBig' + numberOfChildMainPanel[j - 1] + ' numberValue\' ></span>')

    , panelChildren = isoObject[numberOfChildMainPanel[j - 1]].children
    , panelRowCol5Input = $('<input class=\'slider\' type=\'range\' value=\'0\' min=\'0\' max=' + maxPanel + ' name=\'' + numberOfChildMainPanel[j - 1] + '\' data-parent=\'A\' data-children=\'' + panelChildren + '\' disabled >')

    , panelRowCol6 = $('<div class="col-md-1-1 hidden-xs box-under-header button-expand"></div>')
    , panelRowCol6Button = $('<button type=\'button\' class=\'claim-hseq' + numberOfChildMainPanel[j - 1] + ' btn btn-primary btn-sm custom-btn\'>Rozwiń</button>')

  panelRowCol1.append(panelRowCol1H4);
  panelRowCol2A.append(panelRowCol2AH4);
  panelRowCol2.append(panelRowCol2A);
  panelRowCol3.append(panelRowCol3Button);

  panelRowCol4RowC1.append(panelRowCol4RowC1Pie);
  panelRowCol4RowC2.append(panelRowCol4RowC2H6, panelRowCol4RowC2H6Per);
  panelRowCol4RowC3.append();

  panelRowCol4Row.append(panelRowCol4RowC1, panelRowCol4RowC2,panelRowCol4RowC3);
  panelRowCol4.append(panelRowCol4Row);
  panelRowCol5.append(panelRowCol5Span,panelRowCol5Input );
  panelRowCol6.append(panelRowCol6Button);

  panelRow.append(panelRowCol1, panelRowCol2,panelRowCol3,panelRowCol4,panelRowCol5,panelRowCol6)
  return panelRow;
}//makeSecondPartOfMainPage
//
// function makeSlider(numberClass, maxDegree){
//   var slider;
//   if (isoObject[numberClass].children != undefined) {
//     var children = isoObject[numberClass].children;
//     slider = $('<input class=\'slider\' type=\'range\' value=\'0\' min=\'0\' max=' + maxDegree + ' name=\'' + numberClass + '\' data-parent=\'' + isoObject[numberClass].parent + '\' data-children=\'' + isoObject[numberClass].children + '\' disabled >')
//   }else {
//     slider = $('<input class=\'slider\' type=\'range\' value=\'0\' min=\'0\' max=' + maxDegree + ' name=\'' + numberClass + '\' data-parent=\'' + isoObject[numberClass].parent + '\' >')
//
//   }
//
//   $('.sliderRightPanel').append(slider)
// }

function makeSlider(){
  var slider;
  // if (isoObject[numberClass].children != undefined) {
  //   var children = isoObject[numberClass].children;
    slider = $('<input class=\'slider\' type=\'range\' value=\'0\' min=\'0\' max=\'40\' name=\'A5\' data-parent=\'A\' data-children=\'A511,A512\' disabled >')
  // }else {
  //   slider = $('<input class=\'slider\' type=\'range\' value=\'0\' min=\'0\' max=' + maxDegree + ' name=\'' + numberClass + '\' data-parent=\'' + isoObject[numberClass].parent + '\' >')
  //
  // }

  $('.sliderRightPanel').append(slider)
}//makeSlider

function changeSlider(numberClass){

  var slider = $('.sliderRightPanel input.slider')
  var input = $('input[name='+numberClass +']')
    , inputParent = input.attr('data-parent')
    , inputDegree = input.attr('max');

  updateSlider(input, null);

  slider.attr('max', inputDegree );
  slider.attr('name', numberClass);
  slider.attr('data-parent', inputParent );
  slider.attr('value', slidersMemo[numberClass]);

  // console.log('slider');
  // console.log(slider);
  // console.log('input');
  // console.log(input);

  // updateSlider(slider, null);

  if (isoObject[numberClass]!= undefined) {
    var inputChildren = input.attr('data-children');
    // console.log(inputChildren);
    slider.attr('data-children', inputChildren )
  }else{
    slider.attr('data-children', '' );
    slider.removeAttr('disabled' )

  }

}//changeSlider


// function makePanelContent (){
//   var button1 = $('<button class="claim-hseqA5.btn btn-primary btn-sm custom-btn" type="button">Rozwiń');
//
//   return button1;
// }

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
