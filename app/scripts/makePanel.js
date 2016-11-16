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
    , col1rowBarInput = $('<input class="slider" value="0" min="0" max="1500" step="1" name="A" data-children="A5,A6,A7,A8,A9,A10,A11,A12,A13,A14,A15,A16,A17,A18" type="range" disabled>')

  // data-parent="null"

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

  // console.log(numberClass);


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
    col5input = $('<input class=\'slider\' type=\'range\' value=\'0\' min=\'0\' max=' + max + ' name=\'' + numberOfChildren[i - 1] + '\' data-parent=\'' + numberClass + '\' data-children=\'' + children + '\' disabled >')
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

function makeFirstPartOfMainPage(){
  var panelDefault = $('<div class="panel panel-default"></div>')
    , panelContent = $('<div class="panel-body panel-content panels"></div>')
    , panelCol = $('<div class="col-md-12 col-sm-12 col-sx-12"></div>');

  panelContent.append(panelCol);
  panelDefault.append(panelContent);

  return panelDefault;
}

function makeSecondPartOfMainPage(numberOfChildMainPanel,nameOfChildMainPanel,childDegreeMainPanel,j ){
  var panelRow = $('<div class=\'row panel-hseq'+ numberOfChildMainPanel[j - 1]+' hseq space\'></div>')
    , panelRowCol1 = $('<div class="col-md-1 col-sm-1 col-xs-1 box-under-header pull-left number"></div>')
    , panelRowCol1H4 = $('<h4></h4>').text(numberOfChildMainPanel[j-1])
    , panelRowCol2 = $('<div class="col-md-5-3 col-sm-4 col-xs-8 box-under-header pull-left title"></div>')
    , panelRowCol2A = $('<a></a>').addClass('title-hseq' + numberOfChildMainPanel[j - 1]).attr('href', '#')
    , panelRowCol2AH4 = $('<h4></h4>').text(nameOfChildMainPanel[j])

    , panelRowCol3 = $('<div class="col-xs-3 visible-xs box-under-header button-expand"></div>')
    , panelRowCol3Button = $('<button type=\'button\' class=\'claim-hseq' + numberOfChildMainPanel[j - 1] + ' btn btn-primary btn-sm.custom-btn\'>Rozwiń</button>')

    , panelRowCol4 = $('<div class="col-md-3 col-sm-4 col-xs-6 box-under-header assessment-icon"></div>')
    , panelRowCol4Row = $('<div class="row"></div>')
    , panelRowCol4RowC1 = $('<div class="col-md-4 col-sm-4 col-xs-4"></div>')
    , panelRowCol4RowC1Pie = $('<div class=\'pie pull-left\'></div>').attr('data-name',numberOfChildMainPanel[j - 1])

    , maxPanel = childDegreeMainPanel[j-1]
    , panelRowCol4RowC2 = $('<div class="col-md-4 col-sm-4 col-xs-4"></div>')
    , panelRowCol4RowC2H6 = $('<h6 class=\'numberValue' + numberOfChildMainPanel[j - 1] + '\' ></h6>').text('0/' + maxPanel)
    , panelRowCol4RowC2H6Per = $('<h6 class=\'numberValue-per' +  numberOfChildMainPanel[j - 1] + '\' ></h6>').text('0%')
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

  panelRowCol4RowC1.append(panelRowCol4RowC1Pie)
  panelRowCol4RowC2.append(panelRowCol4RowC2H6, panelRowCol4RowC2H6Per)
  panelRowCol4RowC3.append()

  panelRowCol4Row.append(panelRowCol4RowC1, panelRowCol4RowC2,panelRowCol4RowC3);
  panelRowCol4.append(panelRowCol4Row);
  panelRowCol5.append(panelRowCol5Span,panelRowCol5Input );
  panelRowCol6.append(panelRowCol6Button);

  panelRow.append(panelRowCol1, panelRowCol2,panelRowCol3,panelRowCol4,panelRowCol5,panelRowCol6)
  return panelRow;
}
