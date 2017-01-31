function createPage(numberClass, isNextLoad) {
  var numberOfChildMainPanel = (isoObject['A'].children).split(',')
    , nameOfChildMainPanel = (isoObject['A'].childrenNames).split('.')
    , childDegreeMainPanel = (isoObject['A'].childrenMaxDegree).split(',')
    , content = $('#content')
    , mainPanel = $('#main-panel')
    , panels = $('.panel.panel-default.allPanels')
    , row = $('.row.mainPagePanels')
    // , description = isoObject[numberClass].description.split('^')
    , titleClaim = $('.title-hseq' + numberClass)
    , titlePanel = $('.title-claim')
    , label = $('.label-claim');

  mainPanel.remove();
  panels.remove();
  row.remove();
  content.prepend(makeMainPanel());

  $('.sliderRightPanel').empty();

  if (numberClass == 'A') {

    $('.padding-content').append(makeFirstPartOfMainPage());

    for (var j = 1; j <= numberOfChildMainPanel.length; j++) {
      $('.col-md-12.col-sm-12.col-sx-12').append(makeSecondPartOfMainPage(numberOfChildMainPanel,nameOfChildMainPanel,childDegreeMainPanel,j))
    }

    loadPage(isNextLoad);
    onLoadPage();

  }else{

    var oneTitle = panelTitle['title-hseq' + numberClass];



    if (numberClass != 'A' && isoObject[numberClass].children && isoObject[numberClass].children != "") {
      makePanelsTitle(numberClass, oneTitle);

      var numberOfChildren = (isoObject[numberClass].children).split(',')
        , nameOfChildren = (isoObject[numberClass].childrenNames).split('.')
        , childrenDegree = (isoObject[numberClass].childrenMaxDegree).split(',')
        , numberClassWithDots = addDotsForLabels(numberClass);

      for (var i = 1; i <= numberOfChildren.length; i++) {
        $('.col-md-12.filter-group').append(makeBodyPanel(numberOfChildren, nameOfChildren, childrenDegree, i, numberClass))
      }
    }

    titlePanel.text(titleClaim.text());
    label.text(numberClassWithDots);

    addComments (numberClass);
    loadDescription(numberClass);
    loadPage(isNextLoad);
    onLoadPage();
  }
}//createPage


function loadPage(isNextLoad){

  var links = $('[class*=\'claim-h\']')
    , allTitles = $('[class^=\'title-hseq\']');

  links.each(function(i) {
      var className = $(this)
        , numberClass = className.attr('class').split(' ')[0].replace('claim-hseq', '')
        , allRangeSlider = $('.slider');

      allTitles.each(function (index, value) {
        if (!panelTitle) {
          panelTitle = {}
        }
        index = value.className;
        panelTitle[index] = value.textContent
      });

      allRangeSlider.each(function (index, value) {
        if (!sliderTitle) {
          sliderTitle = {}
        }
        index = value.name;
        sliderTitle[index] = value
      });

      if (isNextLoad) {
          $('.panel-body .claim-hseq' + numberClass).on('click', function (e) {
            e.preventDefault();
            createPage(numberClass, true)
          });
          $('.panel-hseq' + numberClass).on('dblclick', function (e) {
            e.preventDefault();
            createPage(numberClass, true)
          });

          $('.panel-heading .claim-hseq' + numberClass).on('click', function (e) {
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
        $('.claim-hseq' + numberClass).on('click', function (e) {
          e.preventDefault();
          createPage(numberClass, true)
        });
        $('.panel-hseq' + numberClass).on('dblclick', function (e) {
          e.preventDefault();
          createPage(numberClass, true)
        })
      }
    }
  );
}//loadPage


function onLoadPage() {

  loadTitle();
  SetSelectAssessmentField();

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

function loadDescription(numberClass){
  var labelDescription = $('.description')
    , arrayDescription = isoObject[numberClass].description;

  labelDescription.html(arrayDescription);

}//loadDescription

