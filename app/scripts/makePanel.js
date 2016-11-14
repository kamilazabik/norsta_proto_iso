function makePanelsTitle(numberClass, oneTitle){
  var paddingContent = $('.col-md-9.col-sm-12.col-xs-12.pull-left.padding-content')
    ,panelTitle= $('<div class="panel panel-default panels-title"></div>')
    ,panelHeading = $('<div class="panel-heading"></div>')
    ,rowPanel = $('<div class="row panel-hseq panels box-under-header"></div>')
    ,colNumber = $('<div class="col-md-1 pull-left number"></div>')
    ,colNumberH4 = $('<h4 class="lab-hseq"></h4>')
    ,colTitle = $('<div class="col-md-5 col-sm-5 pull-left title"></div>')
    ,colTitleH4 = $('<h4 class="title-hseq"></h4>')
    ,colAssess = $('<div class="col-md-3 assessment"></div>')
    ,colAssesstRow = $('<div class="row"></div>')
    ,colAssessRowCol1 = $('<div class="col-md-4"></div>')
    ,colAssessRowCol2 = $('<div class="col-md-4"></div>')
    ,colAssessRowColPie = $('<div class="pie pull-left"></div>')
    ,colAssessRowColNumValue = $('<h6 class="text-left numberValue"></h6>')
    ,colAssessRowColNumValuePer = $('<h6 class="text-left numberValue-per"></h6>')
    ,colBar = $('<div class="col-md-2 bar"></div>')
    ,colBarSpan = $('<span class="numberValueBig numberValue"></span>')
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

  // $('#panel-content').append(paddingContent);

  console.log(numberClass);


    var siblings = isoObject[isoObject[numberClass].parent].children.split(',')
      ,indexOfnumberClass = siblings.indexOf(numberClass)
      ,nextSibling = siblings[indexOfnumberClass + 1]
      ,prevSibling = siblings[indexOfnumberClass - 1];



  var pie = $('.panel-heading .pie').attr('data-name', numberClass)
    , arrowLeft = $("<i class='fa fa-angle-double-left' aria-hidden='true'></i>")
    , arrowRight = $("<i class='fa fa-angle-double-right' aria-hidden='true'></i>")
    , buttonUp = $('<button type=\'button\' class=\'claim-hseq' + isoObject[numberClass].parent + ' btn btn-primary btn-sm custom-btn up\'>Do góry</button>');
  var buttonLeft = $('<button type=\'button\' class=\'claim-hseq' + prevSibling + ' btn btn-primary btn-sm custom-btn arrow\'></button>').append(arrowLeft);
  var buttonRight = $('<button type=\'button\' class=\'claim-hseq' + nextSibling + ' btn btn-primary btn-sm custom-btn arrow\'></button>').append(arrowRight);


  if(prevSibling == undefined) {
    buttonLeft.attr('disabled', 'disabled')
  }else if(nextSibling == undefined){
    buttonRight.attr('disabled', 'disabled')
  }

  $('.panel-hseq').removeClass('panel-hseq').addClass('panel-hseq' + numberClass);
  $('.title-hseq').removeClass('title-hseq').addClass('title-hseq' + numberClass).text(oneTitle);
  $('h6.numberValue').removeClass('numberValue').addClass('numberValue' + numberClass);
  $('span.numberValueBig').removeClass('numberValue').addClass('numberValue' + numberClass);
  $('.numberValue-per').removeClass('numberValue-per').addClass('numberValue-per' + numberClass);
  $('.lab-hseq').text(numberClass);
  $('.panel-heading .col-md-2.bar').append(sliderTitle[numberClass]);
  $('.col-md-1-2.button-expand-three').append(buttonUp, buttonLeft, buttonRight);

  return paddingContent;
}


function makeBodyPanel(numberOfChildren, nameOfChildren, childrenDegree,i,numberClass ) {

  var row = $('<div class=\'row panel-hseq'+ numberOfChildren[i - 1]+' hseq space\'></div>')
    , col1 = $('<div class=\'col-md-1 col-sm-1 box-under-header-sx pull-left number\'></div>')
    , col1h5 = $('<h5> </h5>').text(numberOfChildren[i - 1])
    , col2 = $('<div class=\'col-md-4-3 col-sm-10 box-under-header-sx pull-left title\'></div>')
    , col2a = $('<a></a>').addClass('title-hseq' + numberOfChildren[i - 1]).attr('href', '#')
    , col2h5 = $('<h5></h5>').text(nameOfChildren[i - 1])
    , col3 = $('<div class=\'col-md-1 col-sm-1 box-under-header-sx filter\'></div>')
    , col4 = $('<div class=\'col-md-3 box-under-header-sx assessment-icon\'></div>')
    , col4row = $('<div class=\'row\'></div>')
    , col4rowCol1 = $('<div class=\'col-md-4 col-sm-4\'></div>')
    , col4rowCol2 = $('<div class=\'col-md-4 col-sm-4\'></div>')
    , col4rowCol2pie = $('<div class=\' pie pull-left\'></div>').attr('data-name',numberOfChildren[i - 1])
    , col4rowCol2h6 = $('<h6 class=\'numberValue' + numberOfChildren[i - 1] + '\' ></h6>')
    , col4rowCol2h6per = $('<h6 class=\'numberValue-per' + numberOfChildren[i - 1] + '\' ></h6>')
    ,col5 = $('<div class=\'col-md-2 col-sm-5 box-under-header-sx bar\'></div>')
    ,max = childrenDegree[i-1]
    ,col6 = $('<div class=\'col-md-1-2 col-sm-2 box-under-header-sx button-expand\'></div>')
    ,button = $('<button type=\'button\' class=\'claim-hseq' + numberOfChildren[i - 1] + ' btn btn-primary btn-sm custom-btn\'>Rozwiń</button>')
    ,col5input;


  if (isoObject[numberOfChildren[i - 1]] != undefined) {
    var children = isoObject[numberOfChildren[i - 1]].children;
    col5input = $('<input class=\'slider\' type=\'range\' value=\'0\' min=\'0\' max=' + max + ' name=\'' + numberOfChildren[i - 1] + '\' data-parent=\'' + numberClass + '\' data-children=\'' + children + '\' disabled >');
    col6.append(button)
  }else {
    col5input = $('<input class=\'slider\' type=\'range\' value=\'0\' min=\'0\' max=' + max + ' name=\'' + numberOfChildren[i - 1] + '\' data-parent=\'' + numberClass + '\' >')
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

function makeMainPanel(){
  var mainPanel = $('<div id="main-panel"></div>')
    , col = $('<div class="col-md-12 col-sm-12 col-xs-12"></div>')
    , col1 = $('<div class="col-md-12 col-sm-12 col-xs-12"></div>')
    , col1row = $('<div class="row fixedPos box-header"></div>')
    , col1rowTitleMain = $('<div class="col-lg-5 col-md-3 col-sm-3 col-xs-2 pull-left title-main"></div>')
    , col1rowTitleMainH3 = $('<h3 class="title-hseqA0"></h3>').text('Ocena zgodności Systemu Zarządzania Bezpieczeństwem Informacji z wymaganiami ISO 27001:2014')

    , col1rowAssess = $('<div class="col-lg-1 col-md-1 col-sm-1 col-xs-2 assessment pull-left"></div>')
    , col1rowAssessPie = $('<div class="pie pull-left" data-name="A"></div>')

    , col1rowAssess1 = $('<div class="col-lg-1 col-md-2 col-sm-2 col-xs-2 pull-left assessment"></div>')
    , col1rowAssess1numVal = $('<h4 class="text-left numberValueA"></h4>')
    , col1rowAssess1numValPer = $('<h4 class="text-left numberValue-perA"></h4>')

    , col1rowBar = $('<div class="col-lg-2 col-md-2 col-xs-2 bar"></div>')
    , col1rowBarSpan = $('<span class="numberValueA numberValue"></span>')
    , col1rowBarInput = $('<input class="slider" value="0" min="0" max="1500" step="1" name="A" data-children="5,A6,A7,A8,A9,10,11,12,13,14,15,16,17,18" type="range" disabled>')

    , col1rowFilter = $('<div class="col-lg-2 col-md-2 col-sm-2 col-xs-2 pull-left filter"></div>')


  col1rowTitleMain.append(col1rowTitleMainH3);
  col1rowAssess.append(col1rowAssessPie);
  col1rowAssess1.append(col1rowAssess1numVal,col1rowAssess1numValPer);
  col1rowBar.append(col1rowBarSpan,col1rowBarInput);
  col1row.append(col1rowTitleMain,col1rowAssess,col1rowAssess1,col1rowBar,col1rowFilter);
  col1.append(col1row);
  col.append(col1);
  mainPanel.append(col);

return mainPanel;

}

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
