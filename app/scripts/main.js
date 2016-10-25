$(document).ready( function(){


  // var xml = "../iso.xml";

    // var xmlDoc = $.parseXML('../iso.xml');
    // var $xml = $(xmlDoc);
    // var $id = $xml.find("node");
    //
    // // get value
    // console.log($id.text());
    //
    // // set value
    // // $title.text("XML Title");
    //
  var n;


  $.ajax({
    type: "GET",
    url: "../iso.xml",
    dataType: "xml",
    success: xmlParser
  });


  var gg = []

  function xmlParser(xml) {
    $(xml).find("node").each(function (index, value) {

      var arrXml = {};
      var maxDegree = "maxDegree"
      var lab = "label"
      index = $(this).find("decision").attr('maxDegree')
      value = $(this).find("label").html()
      var name = 'name'
      var nameElement = $(this).find("name").html()
      // console.log(index)
      // console.log(value)
      // console.log(name)
      if(value){
        arrXml[maxDegree] = value.split('.').join("");
        arrXml[lab] = index
        arrXml[name] = nameElement
        // console.log(arrXml)
        gg.push(arrXml)
      }

    });

    // n = function() {
      return gg
    // };
  }

// var n = xmlParser(xml);

  // console.log(n);
  console.log(gg);

  //
  // var data = {},
  //   cats_array=[];
  //
  // // function xmlParser(xml) {
  //   var oXML = $(xml).find('node');
  //
  //   oXML.each(function(){
  //
  //     var stepID = $(this).attr('id#3543504092');
  //     data[stepID] = {};
  //     $(this).find('node')
  //       // var categoryID = jQuery(this).attr('id');
  //       var categoryID = $(this).find('name');
  //       // console.log(categoryID)
  //       /* add category to array if doesn't already exist*/
  //       if( $.inArray( categoryID, cats_array) ==-1){
  //         cats_array.push( categoryID);
  //       }
  //       data[stepID][categoryID] = 'is available';
  //       console.log(cats_array)
  //
  //
  //   });
  //
  //   $.each(data, function(){
  //     for( var i=0;i< cats_array.length; i++){
  //       if( ! this[cats_array[i]] ){
  //         this[cats_array[i]] ="not available";
  //       }
  //     }
  //   })

  // }

 // console.log(JSON.stringify(data, null, ' '))





    $('#logo').click(function(e) {
      e.preventDefault();
      $('#content').load('./jade/main-page.html');
    });


  function loadTitle(){
    var links = $('[class*=\'title-hseq\']');
    var allElement = $('[class*=\'panel-hseq\']');

    links.each(function(){
      var className = $(this);
      // console.log(className)
      var numberClass = className.attr('class').split(' ')[0].replace('title-hseq','').split('-');

      $(className).on('click', function (e) {

       allElement.removeClass('panel-shadow')
        // console.log(numberClass)
        var link = $(this).text();
        var title = $('.title-claim');
        var label = $('.label-claim');
        e.preventDefault();
        title.text(link);
        label.text('A' + numberClass.join('.'));
        var panel = $('.panel-hseq' + numberClass.join('-'));
        // console.log(panel)
        panel.addClass('panel-shadow')
      })
    });
  }

  var arr = [];

  $(function loadPage(){
    var links = $('[class^=\'claim\']');


    links.each(function(i){
      var className = $(this);
      var numberClass = className.attr('class').split(' ')[0].replace('claim-hseq','');

      $(className).on('click', function (e) {
        console.log($(this).parent());

        var allTitles = $('[class^=\'title-hseq\']');

        allTitles.each(function(index,value){
          if(!panelTitle) {
            panelTitle = {}
          }
          index  = value.className;
          panelTitle[index] = value.textContent
        });

        var allRangeSlider = $('.slider')
        console.log(allRangeSlider)

        allRangeSlider.each(function(index,value){
          if(!sliderTitle) {
            sliderTitle = {}
          }
          index  = value.name;
          sliderTitle[index] = value
        });

        console.log(sliderTitle)



        e.preventDefault();
        $('#content').load('./jade/main-panel.html', function(){
          $('#content').append('<div id="panel-content" />');
          $('#panel-content').load('./jade/pages/' + numberClass + '-panel-content.html', function(){

            var src = $('#script');
            if(arr.length == 0){
              $('#scriptAdded' ).html('<script type=\'text/javascript\' src=\'scripts/main.js\'></script>');
              $(src ).attr('src','');
              // $('#script' ).replaceWith('<script ></script>');
              arr.push(src);
            }

console.log(numberClass);

            if(numberClass > 0){
              var oneTitle = panelTitle['title-hseq' + numberClass];
              console.log(oneTitle)
            }

            var pie = $('.panel-heading .pie').attr('data-name','rangeslider' + numberClass);
            console.log(pie);
            $('.panel-hseq').removeClass('panel-hseq').addClass('panel-hseq' + numberClass);
            $('.title-hseq').removeClass('title-hseq').addClass('title-hseq' + numberClass).text(oneTitle);
            $('h6.numberValue').removeClass('numberValue').addClass('numberValue' + numberClass);
            $('span.numberValueBig').removeClass('numberValue').addClass('numberValue' + numberClass);
            $('.numberValue-per').removeClass('numberValue-per').addClass('numberValue-per' + numberClass);
            $('.lab-hseq').text('A' + numberClass)
            $('.panel-heading .col-md-2.bar').append(sliderTitle['rangeslider' + numberClass])

            // var classNamePanels = $('[class*=\'panel-hseq\']');
            // console.log(classNamePanels);

            console.log(sliderTitle['rangeslider' + numberClass])

            if (relationships['rangeslider' + numberClass].children){
              console.log($('.row.panel-hseq4-1.hseq.space'))

            }


            // $('.panel-body.panel-content.panels').append( _panel-content.jade)


            loadTitle();
            var titleClaim = $('.title-hseq' + numberClass);
            console.log(titleClaim.text());
            var titlePanel = $('.title-claim');
            var label = $('.label-claim');
            titlePanel.text(titleClaim.text());
            label.text(numberClass.split('-').join('.'));
          });
        });

      })
    });
  });


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

});

var filterValueMemo;
console.log('filterValueMemo')
console.log(filterValueMemo)

function setFilter() {
  var filterSelect = $('.filter-select');

  if (filterValueMemo) {
    filterSelect.each(function () {
      var filterGroup = $('.filter-group');
      console.log(filterGroup)
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
  console.log(filterValue);
  filterValueMemo = filterValue
  filterGroup.find('.hseq').each(function (index, element) {
    var testValue = $(element).data(filterName).toString();
    if (filterValue !== 'All' && testValue !== filterValue) {
      $(element).addClass('hide');
    }
  })
}



var panelTitle;
var sliderTitle;
// var arrXml;




var slidersMemo;
var relationships = {};
relationships['rangeslider0'] = {parent: '', children: '5,6,7,8,9,10,11,12,13,14,15,16,17,18'};
relationships['rangeslider4'] = {parent: '0', children: '41,42,43,44,45,46,47,48'};
relationships['rangeslider5'] = {parent: '0', children: '51,52'};
relationships['rangeslider41'] = {parent: '4', children: '411,412,413,414,415,416,417,418,419'};
relationships['rangeslider42'] = {parent: '4'};
relationships['rangeslider43'] = {parent: '4'};
relationships['rangeslider44'] = {parent: '4'};
relationships['rangeslider45'] = {parent: '4'};
relationships['rangeslider411'] = {parent: '41', children: '4111,4112,4113,4114'};
relationships['rangeslider4113'] = {parent: '411', children: '4113-HS,4113-E,4113-Q'};
relationships['rangeslider3'] = {parent: '0', children: '31,32,33,34,35,36,37'};

console.log(slidersMemo)

function sliderSum(theSlider) {
  var childrenIds = theSlider.data('children')
  ,   result = 0;
// console.log("childrenIds: " + childrenIds)
  if(childrenIds)
  {
    $.each(childrenIds.split(','), function(idx, val) {
      if(slidersMemo) {
          var childValue = slidersMemo['rangeslider'+val];
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

  if(!relationships['rangeslider'+sliderName])
  {
    sliderValue = slidersMemo['rangeslider' + sliderName];
    if (sliderValue) {
      result = parseInt(sliderValue);
    }
    return result;
  }

  var childrenIds = relationships['rangeslider'+sliderName].children;

  if(slidersMemo) {

    if (childrenIds) {
      $.each(childrenIds.split(','), function (idx, childId) {
          result = result + sliderSumForTop(childId);
      });
    }
    else {
      sliderValue = slidersMemo['rangeslider' + sliderName];
      if (sliderValue) {
        result = parseInt(sliderValue);
      }
    }
  }
  return result;
}

function updateTopSlider() {

    var topValue = sliderSumForTop('0'),
        topSlider = $('input[name=rangeslider0]');

    if (topValue >= 0) {
      topSlider.val(topValue);
      updateSlider(topSlider, null);
    }
}

$.fn.rangeslider = function(options) {
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
      var parentSlider = $('input[name=rangeslider'+obj.attr('data-parent') +']')
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

