function makeButtonExpand(numberOfChildMainPanel, j){
  var panelRowCol6Row1 = $('<div class="panel-block-buttons-row"></div>')
    , panelRowCol6Row1Col = $('<div class="panel-block-buttons-body"></div>')
    ,panelRowCol6Button = $('<button type=\'button\' name=\'expand\' class=\' btn btn-sm custom-btn expand-main-page btn-expand-panel\' data-label=\'' + numberOfChildMainPanel[j - 1] + '\'>Rozwiń</button>');

  panelRowCol6Row1Col.append(panelRowCol6Button);
  panelRowCol6Row1.append(panelRowCol6Row1Col);

 return panelRowCol6Row1;
}


function makeButtonsOpenDetailsAddEvid(numberOfChildMainPanel, j,className, hiddenClass){
  var numberOfChild = numberOfChildMainPanel[j - 1]
    , buttonsBlock = $('.panel-block-buttons--xs')
    , panelRowCol6Row2 = $('<div class="panel-block-buttons-row"></div>')
    , panelRowCol6Row2Col = $('<div class="panel-block-buttons-body"></div>')
    , buttonIcon = $('<i class="fa fa-arrow-down" aria-hidden="true"></i>')
    , buttonExpandPanelHidden = $('<button type=\'button\' class=\' hidden-lg hidden-xl btn btn-expand ' + numberOfChild + '\' data-toggle=\'collapse\' aria-expanded=\'false\'  name=\'openPanelDetails\' data-target=\'#collapsePanelDetails' + numberOfChild + '\' aria-controls=\'collapsePanelDetails' + numberOfChild + '\' title=\'Pokaż panel szczegółów\' data-expand=\''+ numberOfChild+'\'></button>')
    , buttonExpandPanelNotHidden = $('<button type=\'button\' class=\'btn btn-expand ' + numberOfChild + '\' data-toggle=\'collapse\' aria-expanded=\'false\'  name=\'openPanelDetails\' data-target=\'#collapsePanelDetails' + numberOfChild + '\' aria-controls=\'collapsePanelDetails' + numberOfChild + '\' title=\'Pokaż panel szczegółów\'  data-expand=\''+ numberOfChild+'\'></button>')
    , buttonAddFirstEvidence = $('<button type=\'button\' class=\'btn btn-add ' + numberOfChild+' pull-right\' data-toggle=\'tooltip\' data-placement=\'top\' title=\'Dodaj nowy dowód\' name=\'' + numberOfChild + '\'  data-add=\''+ numberOfChild+'\'></button>').append ('<i class="fa fa-plus" aria-hidden="true"></i>');


  if(hiddenClass == true){
    buttonExpandPanelHidden.append(buttonIcon);
    panelRowCol6Row2Col.append(buttonAddFirstEvidence,buttonExpandPanelHidden);
    buttonExpandPanelHidden.on('click', function () {
      addClassNotCollapsed(className);
    });
  }else{
    buttonExpandPanelNotHidden.append(buttonIcon);
    panelRowCol6Row2Col.append(buttonAddFirstEvidence, buttonExpandPanelNotHidden);
    buttonExpandPanelNotHidden.on('click', function () {
      addClassNotCollapsed(className);
    });
  }

  if (isoObject[numberOfChild].children) {
    panelRowCol6Row2.append(panelRowCol6Row2Col);
    return panelRowCol6Row2;
  } else {
    panelRowCol6Row2Col.append(panelRowCol6Row2Col);
    return panelRowCol6Row2Col;
  }


  // panelRowCol6Row2.append(panelRowCol6Row2Col);
  //
  // return panelRowCol6Row2;
}


function makeDetailsPanel(numberOfChildMainPanel, j){
  var tabPanels = $('<div id =\'tabsPanels' + numberOfChildMainPanel[j - 1] + '\' class=\'panel-details\'></div>')
    , tabPanelsCol = $('<div class=\'\'></div>')
    , tabPanelsColUl = $('<ul id =\'tabs' + numberOfChildMainPanel[j - 1] + '\' data-tabs=\'tabs\' class=\'nav nav-pills panel-details-tabs\'></ul>')
    , tabPanelsColUlLi1 = $('<li class=\'hidden-lg\'></li>')
    , tabPanelsColUlLi1a = $('<a class=\'panel-details-tabs__link\' href=\'#assessment' + numberOfChildMainPanel[j - 1] + '\' data-toggle=\'tab\'>Ocena</a>')
    , tabPanelsColUlLi2 = $('<li class=\'hidden-lg\'></li>')
    , tabPanelsColUlLi2a = $('<a class=\'panel-details-tabs__link\' href=\'#details' + numberOfChildMainPanel[j - 1] + '\' data-toggle=\'tab\'>Szczegóły</a>')
    , tabPanelsColUlLi3 = $('<li class=\'active\'></li>')
    , tabPanelsColUlLi3a = $('<a class=\'panel-details-tabs__link\' href=\'#evidences' + numberOfChildMainPanel[j - 1] + '\' data-toggle=\'tab\' aria-expanded=\'true\'>Dowody</a>')
    , tabContent = $('<div id =\'my-tab-content' + numberOfChildMainPanel[j - 1] + '\' class=\'tab-content panel-details-content\'></div>')
    , tabContentAssess = $('<div id =\'assessment' + numberOfChildMainPanel[j - 1] + '\' class=\'tab-pane hidden-lg panel-details-content-assess\'></div>')
    , tabContentDetails = $('<div id =\'details' +numberOfChildMainPanel[j - 1]+ '\' class=\'tab-pane hidden-lg\'></div>')
    , tabContentEvidence = $('<div id =\'evidences' + numberOfChildMainPanel[j - 1] + '\' class=\'active tab-pane\'></div>')

    , tabContentAssessRow = $('<div class=\'row\'></div>')
    , tabContentAssessRowCol = $('<div class=\'col-md-12\'></div>')
    , tabContentAssessRowColH = $('<p class=\'comment\'></p>').text('Opis')
    , tabContentAssessRowEditText = $('<div class=\'editable-text\'></div>')

  for (var i = 0; i < 4; i++) {
    tabContentDetails.append(($('<div class=\'row\'></div>')).append($('<div class=\'col-md-1 col-sm-2 col-xs-3\'></div>'), $('<div class=\'col-md-11 col-sm-10 col-xs-9\'></div>')))
  }

  var tabContentDetailsRow1Col1H = $('<h5 class="hidden-xs"></h5>').text('Nazwa')
    , tabContentDetailsRow1Col1Ha = $('<h5 class="hidden-sm hidden-md hidden-lg hidden-xl"></h5>').text('Nazwa')
    , tabContentDetailsRow2Col1H = $('<h5></h5>').text('Etykieta')
    , tabContentDetailsRow3Col1H = $('<h5></h5>').text('Tagi')
    , tabContentDetailsRow4Col1H = $('<h5></h5>').text('Opis')
    , tabContentDetailsRow1Col2H = $('<p class=\'title-claim\'></p>')
    , tabContentDetailsRow2Col2H = $('<p class=\'label-claim\'></p>')
    , tabContentDetailsRow3Col2H = $('<p class=\'\'></p>')
    , tabContentDetailsRow4Col2H = $('<p class=\'description\'></p>');

  var children = tabContentDetails.children().children();

  children.each(function () {
    children[0].appendChild(tabContentDetailsRow1Col1H[0], tabContentDetailsRow1Col1Ha[0])
    children[2].appendChild(tabContentDetailsRow2Col1H[0]);
    children[4].appendChild(tabContentDetailsRow3Col1H[0]);
    children[6].appendChild(tabContentDetailsRow4Col1H[0]);
    children[1].appendChild(tabContentDetailsRow1Col2H[0]);
    children[3].appendChild(tabContentDetailsRow2Col2H[0]);
    children[5].appendChild(tabContentDetailsRow3Col2H[0]);
    children[7].appendChild(tabContentDetailsRow4Col2H[0])
  });

  tabContentEvidence.append(addEvidencesToTheList(numberOfChildMainPanel, j));

  tabContentAssessRowCol.append(tabContentAssessRowColH);
  tabContentAssessRow.append(tabContentAssessRowCol);
  tabContentAssess.append(tabContentAssessRow,tabContentAssessRowEditText );
  tabContent.append(tabContentAssess, tabContentDetails,tabContentEvidence);
  tabPanelsColUlLi1.append(tabPanelsColUlLi1a);
  tabPanelsColUlLi2.append(tabPanelsColUlLi2a);
  tabPanelsColUlLi3.append(tabPanelsColUlLi3a);
  tabPanelsColUl.append(tabPanelsColUlLi1, tabPanelsColUlLi2,tabPanelsColUlLi3);
  tabPanelsCol.append(tabPanelsColUl,tabContent);
  tabPanels.append(tabPanelsCol);
  return tabPanels;
}
