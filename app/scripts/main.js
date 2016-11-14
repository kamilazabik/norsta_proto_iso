var xmlDataArr = {};

// console.log("main.js");

$(document).ready( function(){

/* $.ajax({
    type: 'GET',
    url: '../iso.xml',
    dataType: 'xml',
    success: xmlParser
  });*/

  // function xmlParser(xml) {
  //   $(xml).find('node').each(function () {
  //
  //     var arrXml = {}
  //       ,maxDegree = 'maxDegree'
  //       ,parent = 'parent'
  //       ,children = 'children'
  //       ,childrenDegree = 'childrenDegree'
  //       ,name = 'name'
  //       ,nameElement3 = $(this).find('name').html()
  //       ,degree = $(this).find('decision').attr('maxDegree')
  //       ,labelChildren = $(this).children('nodes').children('node').children('label').text( ).split(/(?=[A-Z])/).join(',').split('.').join('')
  //       ,lastChildrenDegree =  $(this).children('nodes').children('node').children('label').siblings('assessment').children('decision')
  //       ,labelParent =  labelChildren.split(',')[0]
  //       ,labelParent1 =  labelChildren.split(',')
  //       ,labelParentLength = labelParent.length-1
  //       ,labelParent2 = labelParent.substring(0, labelParentLength)
  //       ,labelParent2Length = labelParent2.length-1
  //       // ,nameElement =  $(this).children('nodes').children('node[type="claim"]').children('name').text()
  //       ,nameElement = $(this).children('nodes').children('node').children('name').text().replace('PBI', 'PBI: ').replace('SZBI', 'SZBI. ').replace(/([a-z-ń0-9])([A-Z])/g, '$1. $2')
  //     // .split('.')
  //     // ,nameElementLength = nameElement.length
  //     // ,nameElement2 = nameElement.substring(0, nameElementLength)
  //       ,parents = labelParent2.substring(0, labelParent2Length)
  //       ,parents1 = labelParent2.substring(1, 3);
  //
  //     // console.log(labelParent2)
  //     // console.log(labelChildren)
  //
  //     if(labelParentLength == 3 && (parents1 >=11 && parents1 <= 18)){
  //       parents = labelParent2.substring(0, labelParent2Length-1);
  //     }else{
  //       parents = labelParent2.substring(0, labelParent2Length);
  //     }
  //
  //
  //     var t=[];
  //     var y = [];
  //
  //    $.each(lastChildrenDegree, function (index, value) {
  //      t.push(value.outerHTML.split('"'));
  //      // console.log(t)
  //
  //    });
  //
  //     $.each(t, function (i,v) {
  //       y.push(v[3])
  //
  //     });
  //
  //     y.shift();
  //
  //     arrXml[maxDegree] = degree;
  //     arrXml[name] = nameElement;
  //     arrXml[children] = labelChildren;
  //     arrXml[childrenDegree] = y.join(',');
  //     arrXml[parent] = parents;
  //
  //     if(labelParent2.length>0  )  {
  //       xmlDataArr[labelParent2] = arrXml
  //     }
  //
  //       // console.log(labelParent1[0] == "")
  //       // xmlDataArr[labelParent1[0]] = arrXml
  //     // && labelParent1.length >= 1
  //   });
  //
  //   // console.log(xmlDataArr);
  //   // console.log(JSON.stringify(xmlDataArr));
  // }

  console.log(isoObject)

    $('#logo').click(function(e) {
      e.preventDefault();
      $('#content').load('./jade/main-page.html');
    });


  function loadTitle(){
    var links = $('[class*=\'title-hseq\']')
      , allElement = $('[class*=\'panel-hseq\']')

    links.each(function(){
      var className = $(this);
      var numberClass = className.attr('class').split(' ')[0].replace('title-hseq','').split('-');

      $(className).on('click', function (e) {

       allElement.removeClass('panel-shadow');
        // console.log(numberClass)
        var link = $(this).text();
        var title = $('.title-claim');
        var label = $('.label-claim');
        e.preventDefault();
        title.text(link);
        label.text(numberClass.join('.'));
        var panel = $('.panel-hseq' + numberClass.join('-'));
        panel.addClass('panel-shadow')
      })
    });
  }



  $(function loadPage(loadPageVal, isNextLoad){
    var links = $('[class*=\'claim\']')
      , allTitles = $('[class^=\'title-hseq\']')
      , content = $('#content')
      , src = $('#script');

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


        function createPage() {
          var content = $('#content')
            , panelContent = $('#panel-content')
            , mainPanel = $('#main-panel')
            , panels = $('.panel.panel-default');

          // content.empty()
          mainPanel.remove();
          panels.remove();
          // panelContent.empty();
          // $('#content').load('./jade/main-panel.html')
          content.prepend(makeMainPanel());
          // content.append($('<div id="panel-content"></div>'))

          if (numberClass == 'A') {

            console.log("X1");

            // $('#panel-content').append(panelContentText);
            $('.col-md-9.col-sm-12.col-xs-12.pull-left.padding-content').append(panelContentText);

            loadPage(null,true);
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

            var titleClaim = $('.title-hseq' + numberClass);
            var titlePanel = $('.title-claim');
            var label = $('.label-claim');
            titlePanel.text(titleClaim.text());
            label.text(numberClass.split('-').join('.'));

            //onLoadPage();
            console.log("X2");
            loadPage(null,true);
            onLoadPage();

          }
        }

        // console.log("onClick");
        // console.log(numberClass)
        // $(className).on('click', function (e) {
      console.log('isNextLoad');
      console.log(isNextLoad);
        if (isNextLoad) {
          console.log("Click! 2");
          $('#panel-content .claim-hseq' + numberClass).on('click', function (e) {
            // console.log('arr');
            // console.log(arr.length);
            e.preventDefault();
            createPage()
          })
        }
        else {
          console.log("Click! 1");
          $('.claim-hseq' + numberClass).on('click', function (e) {
            // console.log('arr');
            // console.log(arr.length);
            e.preventDefault();
            createPage()
          })
        }
      }
    );
  });

  function onLoadPage()
  {
    console.log("onLoadPage!");
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
  }
  onLoadPage();

});//END of document.READY

var filterValueMemo;
// console.log('filterValueMemo')
// console.log(filterValueMemo)

function setFilter() {
  var filterSelect = $('.filter-select');

  if (filterValueMemo) {
    filterSelect.each(function () {
      var filterGroup = $('.filter-group');
      // console.log(filterGroup)
      applyFilter(filterGroup, $(this).data('filter-name'), filterValueMemo);
      filterSelect.val(filterValueMemo)
    })
  }
    filterSelect.on('change', function (e) {
    var filterGroup = $('.filter-group');
    filterGroup.find('.hseq').removeClass('hide');
      filterSelect.each(function () {
      applyFilter(filterGroup, $(this).data('filter-name'), $(this).val());
    })
  })
}


function applyFilter(filterGroup, filterName, filterValue) {
  // console.log(filterValue);
  filterValueMemo = filterValue
  filterGroup.find('.hseq').each(function (index, element) {
    var testValue = $(element).data(filterName).toString();
    if (filterValue !== 'All' && testValue !== filterValue) {
      $(element).addClass('hide');
    }
  })
}




var panelTitle;
var panelTitleSidebar;
var arr = [];
var arr1 = [];
console.log(arr.length)

var sliderTitle;
// console.log(sliderTitle)
// var arrXml;




var slidersMemo;

// console.log(relationships)
// console.log('slidersMemo')
// console.log(slidersMemo)


// console.log(slidersMemo)

function sliderSum(theSlider) {
  var childrenIds = theSlider.data('children')
  ,   result = 0;
// console.log("childrenIds: " + childrenIds)
  if(childrenIds)
  {
    $.each(childrenIds.split(','), function(idx, val) {
      if(slidersMemo) {
          var childValue = slidersMemo[val];

        // console.log(childValue);
          if(childValue)
          {
            result = result + parseInt(childValue);
            // console.log("RESULT: " + result);
            // console.log(result)
          }
      }
    });
  }
  return result;
}

function sliderSumForTop(sliderName) {
  var sliderValue, result = 0;
// console.log(sliderName)
  if(!isoObject[sliderName])
  {
    sliderValue = slidersMemo[sliderName];
    if (sliderValue) {
      result = parseInt(sliderValue);
    }
    return result;
  }

  var childrenIds = isoObject[sliderName].children;
  // console.log('childrenIds')
  // console.log(childrenIds)

  if(slidersMemo) {

    if (childrenIds) {
      $.each(childrenIds.split(','), function (idx, childId) {
          result = result + sliderSumForTop(childId);
      });
    }
    else {
      sliderValue = slidersMemo[sliderName];
      if (sliderValue) {
        result = parseInt(sliderValue);
      }
    }
  }
  return result;
}

function updateTopSlider() {

    var topValue = sliderSumForTop('A'),
        topSlider = $('input[name=A]');

    if (topValue >= 0) {
      topSlider.val(topValue);
      updateSlider(topSlider, null);
    }
}

$.fn.rangeslider = function (options) {
    var obj = this;
    var defautValue = obj.attr('value');
    obj.wrap('<span class=\'range-slider\'></span>');
    obj.after('<span class=\'slider-container\'>' +
      '<span class=\'bar\'>' +
      '<span class=\'pasek1\'></span>' +
      '<span class =\'pasek\'></span>' +
      '</span><span class=\'bar-btn\'>' +
      // "<span>0</span>" +
      '</span></span>');
    obj.attr('oninput', 'updateSlider(this)');
    updateSlider(this, slidersMemo);

    return obj;
};

function updateSlider(passObj, memo) {

  var obj = $(passObj);
  // console.log(obj);
  var value = obj.val();
  // console.log("value: " + value);
  var min = obj.attr('min');
  var max = obj.attr('max');
  var t = 100/max;

  var range = Math.round(max - min);
  var percentage = ((value - min) * 100 / range).toFixed(2);

  var nextObj = obj.next();
  nextObj.find('span.bar-btn').css('left', percentage + '%');
  nextObj.find('span.bar > span.pasek1').css('width', percentage + '%');
  nextObj.find('span.bar > span.pasek').css('width', max * t - percentage + '%' );

  if(!obj[0])
  {
    return;
  }
  var nn = obj[0].name.replace('rangeslider','');
  // console.log('nn ' + nn);
  // var nn1 = obj[0].name.replace("allRating","");



  if(memo){ //Inicjalizacja slidera
    // console.log(passObj);

      $.each(passObj, function (idx, val) {
        var initVal;
        if($(obj[idx]).attr('data-children') != null){
          initVal = sliderSum($(obj[idx]));
        }
        else
        {
          initVal = memo[obj[idx].name];
        }
        if(!initVal)
        {
          initVal=0;
        }
        $(passObj[idx]).val(initVal);
        // console.log($(passObj[idx]).name);
        updateSlider(passObj[idx], null);


      });
      return;
  } else {
    //ruch myszką
    if(!slidersMemo)
    {
      slidersMemo={};
    }

    slidersMemo[obj[0].name] = value;


    // console.log(obj)

    if(obj.attr('data-parent') != null){
      var parentSlider = $('input[name='+obj.attr('data-parent') +']')
        , parentVal = sliderSum(parentSlider);
      // console.log(parentSlider.val())
      // console.log(parentSlider)

      if(parentVal>=0)
      {
        parentSlider.val(parentVal);
        updateSlider(parentSlider, null);
        if(parentSlider.attr('name')) {
          updateTopSlider();
        }
      }
    }
  }

  $('.numberValue'+nn).text(Math.round(percentage / t) + '/' + max);
  $('.numberValue-per'+nn).text(percentage + '%' );

  // $('.numberValue'+ nn1).text(Math.round(percentage / t) + "/" + max);
  // $('.numberValue-per'+ nn1).text(percentage + '%');

  function $$(selector, context) {
    context = context || document;
    var elements = context.querySelectorAll(selector);
    return Array.prototype.slice.call(elements);
  }


  $$('.pie').forEach(function(pie) {
    // console.log('pie)
    // console.log(obj)
    // console.log(obj.name)
    for (var i = 0; i < obj.length; i++) {
      if(obj[i].name == pie.getAttribute('data-name') ||
        obj.name == pie.getAttribute('data-name')) {
        // console.log(obj[i].name)
        var p = percentage;
        // console.log('p: ' + p);
        var NS = 'http://www.w3.org/2000/svg';
        var svg = document.createElementNS(NS, 'svg');
        var circle = document.createElementNS(NS, 'circle')
        // $(circle).addClass('numberValue-per-4-1-1');
        var title = document.createElementNS(NS, 'title');
        circle.setAttribute('r', 16);
        circle.setAttribute('cx', 16);
        circle.setAttribute('cy', 16);
        circle.setAttribute('stroke-dasharray', p + ' 100');
        svg.setAttribute('viewBox', '0 0 32 32');
        // console.log(pie.textContent);
        title.textContent = pie.textContent;
        pie.textContent = '';
        svg.appendChild(title);
        svg.appendChild(circle);
        pie.appendChild(svg);
        // console.log(pie)

        if(value > 0 ){
          circle.classList.add('circle')
        }
      }
    }
  });

}

