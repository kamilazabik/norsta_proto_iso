function createPage(numberClass, isNextLoad) {
  var numberOfChildMainPanel = (isoObject['A'].children).split(',')
    , nameOfChildMainPanel = (isoObject['A'].childrenNames).split('.')
    , childDegreeMainPanel = (isoObject['A'].childrenMaxDegree).split(',')
    , content = $('#content')
    , mainPanel = $('#main-panel')
    , panels = $('.panel.panel-default.allPanels')
    , row = $('.row.mainPagePanels')
    // , titleClaim = $('.title-hseq' + numberClass)
    , titleClaim = $('[data-title = \'' + numberClass + '\']')
    , titlePanel = $('.title-claim')
    , label = $('.label-claim')
    , panelContent = $('<div id="panel-content" class="row"></div>')
    , paddingContent = $('<div class="panels-list"></div>');

  mainPanel.remove();
  panels.remove();
  row.remove();
  content.prepend(makeMainPanel());

  // console.log(titleClaim.text())
  // console.log(titleClaim1);

  $('.sliderRightPanel').empty();

  if (numberClass == 'A') {

    var paddingContentExisted = $('.panels-list')
      , panelContentExisted = $('#panel-content');

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

    var oneTitle = panelTitle[numberClass];

    if (numberClass != 'A' && isoObject[numberClass].children && isoObject[numberClass].children != '') {
      makePanelsTitle(numberClass, oneTitle);

      var numberOfChildren = (isoObject[numberClass].children).split(',')
        , nameOfChildren = (isoObject[numberClass].childrenNames).split('.')
        , childrenDegree = (isoObject[numberClass].childrenMaxDegree).split(',')
        , numberClassWithDots = addDotsForLabels(numberClass);

      for (var i = 1; i <= numberOfChildren.length; i++) {
        $('.allPanels__panel-content').append(makeBodyPanel(numberOfChildren, nameOfChildren, childrenDegree, i, numberClass))
      }
    }

    titlePanel.text(titleClaim.text());
    label.text(numberClassWithDots);

    addComments (numberClass);
    loadDescription(numberClass);
    loadPage(isNextLoad);
    onLoadPage();
    searchText();

  }
}//createPage


function loadPage(isNextLoad){

  var links = $('[data-button]')
    , allTitles = $('[data-title]')

  //
  // $('#panel-content').load('jade/right-panels.html')

  links.each(function(i) {
      var className = $(this)
        , numberClass = className.attr('data-button')
        , allRangeSlider = $('.slider')
        , clickedButton = $('[data-button = \'' + numberClass + '\']')
        , clickedPanel = $('[data-panel = \'' + numberClass + '\']');

      allTitles.each(function (index, value) {
        if (!panelTitle) {
          panelTitle = {};
          console.log(panelTitle)
        }

        // index = value.className;
        index = value.attributes['data-title'].value;
        panelTitle[index] = value.textContent
      });

      allRangeSlider.each(function (index, value) {
        if (!sliderTitle) {
          sliderTitle = {};
          console.log(sliderTitle)
        }
        index = value.name;
        sliderTitle[index] = value
      });

      if (isNextLoad) {
        clickedButton.on('click', function (e) {
            e.preventDefault();
            createPage(numberClass, true)
          });

        clickedPanel.on('dblclick', function (e) {
            e.preventDefault();
            createPage(numberClass, true)
          });

        clickedButton.on('click', function (e) {
            // var buttonClass = $(this).attr('name');
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
        clickedPanel.on('dblclick', function (e) {
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

  $(function () {
    var linksContent = $('div#content div.col-md-5').find('a');
    var linksSidebar = $('div#sidebar-wrapper ul').find('a');

    $(linksContent).on('click', function (e) {
      $(linksSidebar).removeClass('red');
      var clickedLink = $(this);
      $.each(linksSidebar, function (index, value) {
        if($(value).text().indexOf(clickedLink.text().trim())>=0){
          $(value).addClass('red');
          if($(value).is(':hidden')){
            var siblings = $(value).parents('li').nextAll().prevAll();
            siblings.show('fast');
          }
        }
      });
      e.stopPropagation();
    });

    $('#menu-projects').on('click', function (e) {
      $(linksSidebar).removeClass('red');
      e.stopPropagation();
    });

    $(linksSidebar).on('click', function (e) {
      $(linksSidebar).removeClass('red');
      $(this).addClass('red');
      e.stopPropagation();
    })

  });

  setFilter();
  $('.slider').rangeslider();

}//onLoadPage

function loadRightPanel() {
  var twoRightPanels = $('.right-panel');
  if(twoRightPanels.length == 0){
    $('#panel-content').append(  makeRightPanel());
    // $('#panel-content').append(rightPanels);
  }
}

function loadDescription(numberClass){
  var labelDescription = $('.description')
    , arrayDescription = isoObject[numberClass].description;

  labelDescription.html(arrayDescription);

}//loadDescription

function goToProjectList(){
 var closeProjectMenu = $('.close-project')
   , navbarFolders = $('.navbar-folders')
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
}

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
}

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
    allTextH4.each(markText) ;
    allTextH5.each(markText);
  });
}

function moveRightPanel() {
  $(window).scroll(function() {
    var windowScroll = $(window).scrollTop()
      , mql = window.matchMedia("(min-width: 768px)")
      , paddingContent = $('.panels-list').offset();

    if(windowScroll > 100) {
      $('.panel-group.fixed-panel').css('top', '60px')
    }else {
      $('.panel-group.fixed-panel').css('top', paddingContent.top)
    }
  });
}

function changeViewOfFolderList(){
  var buttonSimpleList = $('.simple-list')
    , buttonTreeList = $('.tree-list')
    , buttonProjectList = $('.projects-list')
    , nav = $('.nav.navbar-nav')
    , foldersTree = $('.folders.tree')
    , foldersSimple = $('.simple')
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

}


