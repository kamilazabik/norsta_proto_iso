$(document).ready( function(){
  /* MAIN CODE */
  /*
  $('#logo').click(function(e) {
    e.preventDefault();
    $('#content').load('./jade/main-page.html');
  });
  // */
  console.log(isoObject);

  createPage('A', false);

});//END of document.READY



function createPage(numberClass, isNextLoad) {
  var numberOfChildMainPanel = (isoObject['A'].children).split(',')
    , nameOfChildMainPanel = (isoObject['A'].childrenNames).split('.')
    , childDegreeMainPanel = (isoObject['A'].childrenMaxDegree).split(',')
    , content = $('#content')
    , mainPanel = $('#main-panel')
    , panels = $('.panel.panel-default')
    , row = $('.row.mainPagePanels')
    , description = isoObject[numberClass].description.split('^')
    , titleClaim = $('.title-hseq' + numberClass)
    , titlePanel = $('.title-claim')
    , label = $('.label-claim')
    // , comment = $('.addedCom')
    , slider;


  mainPanel.remove();
  panels.remove();
  row.remove();
  content.prepend(makeMainPanel());

  var maxDegree = isoObject[numberClass].maxDegree;

  // $('input.slider').attr('max', maxDegree)

  // var slider = $('<input class="slider" value="0" min="0" max="40" step="1" name="A5" data-children="A511,A512" type="range" disabled>')

  $('.sliderRightPanel').empty();

  if (numberClass == 'A') {

    // console.log("X1");

    $('.col-md-9.col-sm-12.col-xs-12.pull-left.padding-content').append(makeFirstPartOfMainPage());

    for (var j = 1; j <= numberOfChildMainPanel.length; j++) {
      $('.col-md-12.col-sm-12.col-sx-12').append(makeSecondPartOfMainPage(numberOfChildMainPanel,nameOfChildMainPanel,childDegreeMainPanel,j))
    }

    // $('#panel-content').append(panelContentText);
    // $('.col-md-9.col-sm-12.col-xs-12.pull-left.padding-content').append(panelContentText);

    loadPage(isNextLoad);
    onLoadPage();

  } else {

    var oneTitle = panelTitle['title-hseq' + numberClass];

    makePanelsTitle(numberClass, oneTitle);

    if (numberClass != 'A' && isoObject[numberClass].children) {

      var numberOfChildren = (isoObject[numberClass].children).split(',')
        , nameOfChildren = (isoObject[numberClass].childrenNames).split('.')
        , childrenDegree = (isoObject[numberClass].childrenMaxDegree).split(',')
        , numberClassWithDots = addDotsForLabels(numberClass);

      for (var i = 1; i <= numberOfChildren.length; i++) {
        $('.col-md-12.filter-group').append(makeBodyPanel(numberOfChildren, nameOfChildren, childrenDegree, i, numberClass))
      }
    }

    // $('#panel-content').append(makeRightPanel())

    titlePanel.text(titleClaim.text());
    label.text(numberClassWithDots);



    addComments (numberClass);

    // makeSlider();

    loadDescription(numberClass);

    //onLoadPage();
    // console.log("X2");
    loadPage(isNextLoad);
    onLoadPage();
  }
}//createPage


function loadPage(isNextLoad){
  var links = $('[class*=\'claim\']')
    , allTitles = $('[class^=\'title-hseq\']');

  links.each(function(i) {
      var className = $(this);
      var numberClass = className.attr('class').split(' ')[0].replace('claim-hseq', '');

      allTitles.each(function (index, value) {
        if (!panelTitle) {
          panelTitle = {}
        }
        index = value.className;
        panelTitle[index] = value.textContent
      });

      var allRangeSlider = $('.slider');

      allRangeSlider.each(function (index, value) {
        if (!sliderTitle) {
          sliderTitle = {}
        }
        index = value.name;
        sliderTitle[index] = value
      });


      if (isNextLoad) {
        // console.log("Click! 2");
        $('#panel-content .claim-hseq' + numberClass).on('click', function (e) {
          e.preventDefault();
          createPage(numberClass, true)
        })
      }
      else {
        // console.log("Click! 1");
        $('.claim-hseq' + numberClass).on('click', function (e) {
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
  SetAssessmentField();

  $(function () {
    var linksContent = $('div#content div.col-md-5').find('a');
    var linksSidebar = $('div#sidebar-wrapper ul').find('a');

    $(linksContent).on('click', function (e) {
      // console.log('1');
      $(linksSidebar).removeClass('red');
      var clickedLink = $(this);
      $.each(linksSidebar, function (index, value) {
        // console.log(value);
        if($(value).text().indexOf(clickedLink.text().trim())>=0){
          $(value).addClass('red');
          if($(value).is(':hidden')){
            // var children = $(value).parents();
            // var siblings2 = $(value).parent('li').nextAll().prevAll();
            var siblings = $(value).parents('li').nextAll().prevAll();
            siblings.show('fast');

          }
        }
      });
      e.stopPropagation();
    });

    $('#menu-projects').on('click', function (e) {
      // console.log('2');
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




