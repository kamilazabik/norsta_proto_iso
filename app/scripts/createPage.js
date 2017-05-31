function createPage(numberClass, isNextLoad) {
  var numberOfChildMainPanel = (isoObject['A'].children).split(',')
    , nameOfChildMainPanel = (isoObject['A'].childrenNames).split('.')
    , childDegreeMainPanel = (isoObject['A'].childrenMaxDegree).split(',')
    , content = $('#content')
    , mainPanel = $('.content-main-panel')
    , panels = $('.panel.panel-default.allPanels')
    , row = $('.row.mainPagePanels')
    // , titleClaim = $('[data-title = \'' + numberClass + '\']')
    , titlePanel = $('.title-claim')
    , label = $('.label-claim')
    , panelContent = $('<div class="row content-panels"></div>')
    , paddingContent = $('<div class="panels-list"></div>');

  mainPanel.remove();
  panels.remove();
  row.remove();
  content.prepend(makeMainPanel());


  $('.sliderRightPanel').empty();

  if (numberClass == 'A') {

    var paddingContentExisted = $('.panels-list')
      , panelContentExisted = $('.content-panels');

  if(paddingContentExisted.length == 0 || panelContentExisted == 0){

    panelContent.append(paddingContent);
    content.append(panelContent);
  }

    $('.panels-list').append(makeFirstPartOfMainPage());

    for (var j = 1; j <= numberOfChildMainPanel.length; j++) {
      $('.panel-content').append(makeSecondPartOfMainPage(numberOfChildMainPanel,nameOfChildMainPanel,childDegreeMainPanel,j))
    }

    loadPage(isNextLoad);
    onLoadPage();


  }else{

    var oneTitle = panelTitle[numberClass]
      , parentTitle = isoObject[numberClass].name;

    if (numberClass != 'A' && isoObject[numberClass].children && isoObject[numberClass].children != '') {
      makePanelsTitle(numberClass, parentTitle);

      var numberOfChildren = (isoObject[numberClass].children).split(',')
        , nameOfChildren = (isoObject[numberClass].childrenNames).split('.')
        , childrenDegree = (isoObject[numberClass].childrenMaxDegree).split(',')
        , numberClassWithDots = addDotsForLabels(numberClass);

      for (var i = 1; i <= numberOfChildren.length; i++) {
        $('.allPanels__panel-content').append(makeBodyPanel(numberOfChildren, nameOfChildren, childrenDegree, i, numberClass))
      }
    }


    titlePanel.text(isoObject[numberClass].name);
    label.text(numberClassWithDots);

    addComments (numberClass);
    loadDescription(numberClass);
    loadPage(isNextLoad);
    onLoadPage();
    searchText();

  }
}//createPage

function loadPage(isNextLoad){

  var links = $('[data-label]')
    , allTitles = $('[data-title]');


  links.each(function(i) {
      var className = $(this)
        , numberClass = className.attr('data-label')
        , allRangeSlider = $('.slider')
        , clickedButton = $('[data-label = \'' + numberClass + '\']')
        , clickedPanel = $('[data-panel = \'' + numberClass + '\']')
        , clickedPanelNotAllChildren = clickedPanel.children().slice(0, -2)

      allTitles.each(function (index, value) {
        if (!panelTitle) {
          panelTitle = {};
        }

        // index = value.className;
        index = value.attributes['data-title'].value;
        panelTitle[index] = value.textContent
      });

      allRangeSlider.each(function (index, value) {
        if (!sliderTitle) {
          sliderTitle = {};
        }
        index = value.name;
        sliderTitle[index] = value
      });

      if (isNextLoad) {
        // clickedButton.on('click', function (e) {
        //     e.preventDefault();
        //     createPage(numberClass, true)
        //   });

        clickedPanelNotAllChildren.on('dblclick', function (e) {
            e.preventDefault();
            createPage(numberClass, true)
          });

        clickedButton.on('click', function (e) {
            if(notSavedAssessment && !SzybkaOcena){

              $('#myModal').modal('show');

              $('#saveAssessAlert').on('click', function () {
                createPage(numberClass, true)
              });

              $('#removeAssessAlert').on('click', function () {
                createPage(numberClass, true)
              });

            }else {
              e.preventDefault();
              createPage(numberClass, true)
            }
          });
      } else {
        clickedButton.on('click', function (e) {
          e.preventDefault();
          createPage(numberClass, true)
        });
        clickedPanelNotAllChildren.on('dblclick', function (e) {
          e.preventDefault();
          createPage(numberClass, true)
        })
      }
    },
  $(window).scrollTop(0)
  );
}//loadPage

function onLoadPage() {

  loadTitle();
  SetSelectAssessmentField();
  loadRightPanel();
  setFilter();
  markClickedSidebar();
  $('.slider').rangeslider();

}//onLoadPage

function loadRightPanel() {
  var twoRightPanels = $('.right-panel');
  if(twoRightPanels.length == 0){
    $('.content-panels').append(  makeRightPanel());
    // $('#panel-content').append(rightPanels);
  }
}

function loadDescription(numberClass){
  var labelDescription = $('.right-panel-body__title--description')
    , arrayDescription = isoObject[numberClass].description;

  labelDescription.html(arrayDescription);


}//loadDescription

function goToProjectList(){
 var closeProjectMenu = $('.close-project')
   , nav = $('nav');

  closeProjectMenu.on('click', function () {

    nav.load('./jade/includes/nav-top-folders.html');

    $('#content').load('./jade/pages/project-list.html', function() {
      // $('#content').append('<div id="panel-content" />');
      $('#scriptAdded').append('<script type="text/javascript" src="scripts/tree.js"></script>');
      changeViewOfFolderList();
      moveSidebar();
      openProject();
    })
  })
}//goToProjectList

function searchTextTags() {
  $('.search-panel .dropdown-menu').find('a').click(function(e) {
    e.preventDefault();
    var param = $(this).attr("href").replace("#","")
      , concept = $(this).text()
      , option = $(this).parent().parent().prev().first().text();

    $('.search-panel span#search_concept').text(concept);
    $('.input-group #search_param').val(param);
    $('.search-panel .dropdown-menu').find('a').text(option)
  });
}//searchTextTags

function searchText() {
  var allTextH4 = $('.allPanels .title h4')
    , allTextH5 = $('.allPanels .title h5')
    , pageText
    , searchedText
    , theRegEx
    , newHtml;

  function markText(index, value) {
    pageText = value.innerText.replace("<span>","").replace("</span>");
    theRegEx = new RegExp("("+searchedText+")", "igm");
    newHtml = pageText.replace(theRegEx ,"<span>$1</span>");
    value.innerHTML = newHtml;
  }

  $('#searchfor').keyup(function(){
    searchedText = $('#searchfor').val();
    allTextH4.each(markText);
    allTextH5.each(markText);
  });
}//searchText

function moveRightPanel() {
  var firstPanel = $('.right-panel-first__panel .right-panel-heading__row')
    , mql = window.matchMedia("(max-width: 1200px)");

  $(window).scroll(function() {
    var windowScroll = $(window).scrollTop()
      , paddingContent = $('.panels-list').offset();

    if (windowScroll > 20) {
      $('.right-panel--fixed-panel').css('top', '60px')
    }else {
      $('.right-panel--fixed-panel').css('top', paddingContent.top)
    }
  });
  if (mql.matches) {
      firstPanel.on('click', function () {
        $('.right-panel-first').toggleClass('right-panel-panel--margin-added', 1000, "ease");
      });
  }

}//moveRightPanel

function changeViewOfFolderList(){
  var buttonSimpleList = $('.simple-list')
    , buttonTreeList = $('.tree-list')
    , buttonProjectList = $('.projects-list')
    , nav = $('.nav.navbar-nav')
    , foldersTree = $('.tree')
    , foldersSimple = $('.panel-list--simple')
    , projectList = $('.view-project-list');

  buttonSimpleList.on('click', function (e) {
    foldersSimple.removeClass('display');
    foldersTree.addClass('display')
    projectList.addClass('display')
  });

  buttonProjectList.on('click', function (e) {
    projectList.removeClass('display');
    foldersTree.addClass('display')
    foldersSimple.addClass('display')
  });

  buttonTreeList.on('click', function (e) {
    foldersTree.removeClass('display');
    foldersSimple.addClass('display')
    projectList.addClass('display')
  })
}//changeViewOfFolderList


