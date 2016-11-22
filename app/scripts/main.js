$(document).ready( function(){
  /* MAIN CODE */
  /*
  $('#logo').click(function(e) {
    e.preventDefault();
    $('#content').load('./jade/main-page.html');
  });
  // */console.log(isoObject)
  console.log(slidersMemo)
  createPage('A', false);
});//END of document.READY



function createPage(numberClass, isNextLoad) {
  var numberOfChildMainPanel = (isoObject['A'].children).split(',')
    , nameOfChildMainPanel = (isoObject['A'].name).split('.')
    , childDegreeMainPanel = (isoObject['A'].childrenDegree).split(',')
    , content = $('#content');

  // var panelContent = $('#panel-content')
  var mainPanel = $('#main-panel')
    , panels = $('.panel.panel-default')
    , row = $('.row.mainPagePanels');

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
        , nameOfChildren = (isoObject[numberClass].name).split('.')
        , childrenDegree = (isoObject[numberClass].childrenDegree).split(',');

      for (var i = 1; i <= numberOfChildren.length; i++) {
        $('.col-md-12.filter-group').append(makeBodyPanel(numberOfChildren, nameOfChildren, childrenDegree, i, numberClass))
      }
    }

    // $('#panel-content').append(makeRightPanel())

    var description = isoObject[numberClass].description.split('^');
    var titleClaim = $('.title-hseq' + numberClass);
    var titlePanel = $('.title-claim');
    var label = $('.label-claim');
    var slider;

    titlePanel.text(titleClaim.text());
    label.text(numberClass.split('-').join('.'));

    makeSlider(numberClass, maxDegree);

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
  var labelDescription = $('.description');
  // console.log("numberClass1");
  // console.log(numberClass);
  var numberClassText = numberClass.toString()
    , input = $('input[name='+numberClass +']')
    , inputParent = input.attr('data-parent')
    , arrayChildren = isoObject[inputParent].children.split(',')
    , arrayDescription = isoObject[inputParent].description.split('$');
  arrayDescription.shift();
  var positionOfChildren = arrayChildren.indexOf(numberClassText);

  labelDescription.html(arrayDescription[positionOfChildren]);
}//loadDescription



function loadTitle(){
  var links = $('[class*=\'title-hseq\']')
    , allElement = $('[class*=\'panel-hseq\']')
    , title = $('.title-claim')
    , label = $('.label-claim')
    , allInputs = $('input')
  var slider = $('.sliderRightPanel input.slider')
    // , className

// console.log(slider)

  allElement.each(function(){
    var className = $(this)
    // console.log(className)
    // var numberClass = className.attr('class').split(' ')[0].replace('title-hseq','').split('-');
      var numberClass = className.attr('class').split(' ')[1].replace('panel-hseq','').split('-')
      var panel = $('.panel-hseq' + numberClass.join('-'));
    // var classNameText1 = numberClass.join('.')

    clickOnClassName(numberClass, className,panel)

  });


  function clickOnClassName(numberClass,className,panel) {
    $(className).on('click', function (e) {

      var classNameText = numberClass.join('.')
        // , link = $(this).text();
        , link = $('.title-hseq' + classNameText).text();

      allElement.removeClass('panel-shadow');
      e.preventDefault();
      title.text(link);
      label.text(numberClass.join('.'));

      changeSlider(classNameText);

      loadDescription(numberClass);

      panel.addClass('panel-shadow');

      if(isoObject[numberClass] == undefined){
        allInputs.each(function () {
          $('input').attr('disabled', 'disabled')
        });

        var clickedInput = $('input[name='+classNameText +']');
        clickedInput.removeAttr('disabled' );
      }

    });

    $('.sliderRightPanel').on('click', function (e) {

      var classNameText = numberClass.join('.')

      var input = $('input[name='+numberClass +']')
      console.log(input)

      // changeSlider(classNameText);
      // updateSlider(input, null);

    })
  }
}//loadTitle
