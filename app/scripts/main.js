var xmlDataArr = {};

$(document).ready( function(){

 $.ajax({
    type: "GET",
    url: "../iso.xml",
    dataType: "xml",
    success: xmlParser
  });

  function xmlParser(xml) {
    $(xml).find("node").each(function () {

      var arrXml = {}
        ,maxDegree = "maxDegree"
        ,parent = "parent"
        ,children = "children"
        ,childrenDegree = "childrenDegree"
        ,name = 'name'
        ,nameElement3 = $(this).find("name").html()
        ,degree = $(this).find("decision").attr('maxDegree')
        ,labelChildren = $(this).children('nodes').children('node').children('label').text( ).split(/(?=[A-Z])/).join(',').split('.').join("")
        ,lastChildrenDegree =  $(this).children('nodes').children('node').children('label').siblings('assessment').children('decision')
        ,labelParent =  labelChildren.split(',')[0]
        ,labelParent1 =  labelChildren.split(',')
        ,labelParentLength = labelParent.length-1
        ,labelParent2 = labelParent.substring(0, labelParentLength)
        // ,nameElement =  $(this).children('nodes').children('node[type="claim"]').children('name').text()
        ,nameElement = $(this).children('nodes').children('node').children('name').text().replace('PBI', "PBI: ").replace('SZBI', "SZBI. ").replace(/([a-z-ń0-9])([A-Z])/g, "$1. $2");
      // .split('.')
      // ,nameElementLength = nameElement.length
      // ,nameElement2 = nameElement.substring(0, nameElementLength)

      var t=[]
      var y = []

     $.each(lastChildrenDegree, function (index, value) {
       t.push(value.outerHTML.split('"'))
       // console.log(t)

     })

      $.each(t, function (i,v) {

        // console.log('atatatatatata')
        // console.log(v[3])
        y.push(v[3])

      })

      y.shift()

      arrXml[maxDegree] = degree;
      arrXml[name] = nameElement;
      arrXml[children] = labelChildren;
      arrXml[childrenDegree] = y.join(',');

      if(labelParent2.length>0  )  {
        xmlDataArr[labelParent2] = arrXml
      }

        // console.log(labelParent1[0] == "")
        // xmlDataArr[labelParent1[0]] = arrXml
      // && labelParent1.length >= 1
    });

    console.log(xmlDataArr);
    // console.log(JSON.stringify(xmlDataArr));
  }


    $('#logo').click(function(e) {
      e.preventDefault();
      $('#content').load('./jade/main-page.html');
    });


  function loadTitle(){
    var links = $('[class*=\'title-hseq\']');
    var allElement = $('[class*=\'panel-hseq\']');

    links.each(function(){
      var className = $(this);
      var numberClass = className.attr('class').split(' ')[0].replace('title-hseq','').split('-');

      $(className).on('click', function (e) {

       allElement.removeClass('panel-shadow')
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

  var arr = [];

  $(function loadPage(){
    var links = $('[class^=\'claim\']');
    // console.log(links)

    links.each(function(i){
      var className = $(this);
      var numberClass = className.attr('class').split(' ')[0].replace('claim-hseq','');
      // console.log(numberClass)



      $(className).on('click', function (e) {

        var allTitles = $('[class^=\'title-hseq\']');

        allTitles.each(function(index,value){
          if(!panelTitle) {
            panelTitle = {}
          }
          index  = value.className;
          panelTitle[index] = value.textContent
        });

        var allRangeSlider = $('.slider')
        // console.log(allRangeSlider)

        allRangeSlider.each(function(index,value){
          if(!sliderTitle) {
            sliderTitle = {}
          }
          index  = value.name;
          sliderTitle[index] = value
        });


        e.preventDefault();
        $('#content').load('./jade/main-panel.html', function(){
          $('#content').append('<div id="panel-content" />');
          var src = $('#script');
          if(numberClass == 0){
            $('#panel-content').load('./jade/pages/0-panel-content.html')

            if(arr.length == 0){
              $('#scriptAdded' ).html('<script type=\'text/javascript\' src=\'scripts/main.js\'></script>');
              $(src ).attr('src','');
              // $('#script' ).replaceWith('<script ></script>');
              arr.push(src);
            }

          }else {
            $('#panel-content').load('./jade/pages/6-panel-content.html', function(){

              if(arr.length == 0){
                $('#scriptAdded' ).html('<script type=\'text/javascript\' src=\'scripts/main.js\'></script>');
                $(src ).attr('src','');
                arr.push(src);
              }
              //
              // console.log('numberClass');
              // console.log(numberClass);

              if(numberClass != 'A0'){
                var oneTitle = panelTitle['title-hseq' + numberClass];
              }

              var pie = $('.panel-heading .pie').attr('data-name','rangeslider' + numberClass);
              $('.panel-hseq').removeClass('panel-hseq').addClass('panel-hseq' + numberClass);
              $('.title-hseq').removeClass('title-hseq').addClass('title-hseq' + numberClass).text(oneTitle);
              $('h6.numberValue').removeClass('numberValue').addClass('numberValue' + numberClass);
              $('span.numberValueBig').removeClass('numberValue').addClass('numberValue' + numberClass);
              $('.numberValue-per').removeClass('numberValue-per').addClass('numberValue-per' + numberClass);
              $('.lab-hseq').text('A' + numberClass)
              $('.panel-heading .col-md-2.bar').append(sliderTitle['rangeslider' + numberClass])

              if(numberClass != 'A0'){

                if (numberClass !== 'A0' && isoObject[ numberClass].children){
                  var numberOfChildren = (isoObject[numberClass].children).split(',')
                    , nameOfChildren = (isoObject[numberClass].name).split('.')



                  function makePanel(){
                    // console.log(isoObject[numberOfChildren[i-1]].children)
                    var children = isoObject[numberOfChildren[i-1]].children


                    var row = $("<div class='row panel-hseq4-1 hseq space'></div>")
                      ,col1 = $("<div class='col-md-1 col-sm-1 box-under-header-sx pull-left number'></div>")
                      ,col1h5 =$("<h5> </h5>").text(numberOfChildren[i-1])
                    col1.append(col1h5)

                    var col2 = $("<div class='col-md-4-3 col-sm-10 box-under-header-sx pull-left title'></div>")
                      ,col2a = $("<a></a>").addClass('title-hseq' + numberOfChildren[i-1]).attr('href', '#')
                      ,col2h5 =$("<h5></h5>").text(nameOfChildren[i-1])
                    col2a.append(col2h5)
                    col2.append(col2a)

                    var col3 = $("<div class='col-md-1 col-sm-1 box-under-header-sx filter'></div>")

                      ,col4 = $("<div class='col-md-3 box-under-header-sx assessment-icon'></div>")
                      ,col4row = $("<div class='row'></div>")
                      ,col4rowCol1 = $("<div class='col-md-4 col-sm-4'></div>")
                      // ,col4rowCol2 = $("<div class='col-md-4 col-sm-4'></div>")
                      ,col4rowCol2 = $("<div class='col-md-4 col-sm-4'></div>")
                      ,col4rowCol2pie = $("<div class=' pie pull-left'></div>").attr('data-name','rangeslider' + numberOfChildren[i-1])
                      ,col4rowCol2h6 = $("<h6 class='numberValue" + numberOfChildren[i-1]+"' ></h6>")
                      ,col4rowCol2h6per = $("<h6 class='numberValue-per" + numberOfChildren[i-1]+"' ></h6>")

                    col4rowCol1.append(col4rowCol2pie)
                    col4rowCol2.append(col4rowCol2h6,col4rowCol2h6per)
                    col4row.append(col4rowCol1,col4rowCol2,col4rowCol2)
                    col4.append(col4row)

                    var col5 = $("<div class='col-md-2 col-sm-5 box-under-header-sx bar'></div>")
                      ,max = isoObject[numberOfChildren[i-1]].maxDegree;
                    var col5input = $("<input class='slider' type='range' value='0' min='0' max=" +max +" name='rangeslider" + numberOfChildren[i-1]+ "' data-parent='" + numberClass+ "' data-children='" + children+ "' >")
                    col5.append(col5input)

                    var col6 = $("<div class='col-md-1-2 col-sm-2 box-under-header-sx button-expand'></div>")
                      , button = $("<button type='button' class='claim-hseq" + numberOfChildren[i-1]+" btn btn-primary btn-sm custom-btn'>Rozwiń</button>")

                    col6.append(button)

                    row.append(col1,col2,col3,col4,col5,col6)

                    return row
                  }

                  for(var i = 1; i <= numberOfChildren.length; i++ ){
                    $('.col-md-12.filter-group').append( makePanel())
                  }
                }
              }

              var titleClaim = $('.title-hseq' + numberClass);
              // console.log(titleClaim.text());

              var titlePanel = $('.title-claim');
              var label = $('.label-claim');
              titlePanel.text(titleClaim.text());
              label.text(numberClass.split('-').join('.'));


            });


          }

        });
      })
    });
  });


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

});

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

var sliderTitle;
console.log(sliderTitle)
// var arrXml;




var slidersMemo;
var relationships = {};
// console.log(relationships)
console.log(slidersMemo)
relationships['rangesliderA0'] = {parent: '', children: 'A5,A6,A7,A8,A9,A10,A11,A12,A13,A14,A15,A16,A17,A18'};
relationships['rangesliderA6'] = {parent: 'A0', children: 'A61,A62'};
relationships['rangesliderA61'] = {parent: 'A6', children: 'A611,A612,A613,A614,A615'};
relationships['rangesliderA611'] = {parent: 'A61', children: 'A611a,A611b,A611c,A611d'};
relationships['rangesliderA612'] = {parent: 'A61', children: 'A612a,A612b'};
relationships['rangesliderA7'] = {parent: 'A0', children: 'A71,A72,A73'};
relationships['rangeslider5'] = {parent: '0', children: '51,52'};
relationships['rangeslider41'] = {parent: '4', children: '411,412,413,414,415,416,417,418,419'};
relationships['rangeslider42'] = {parent: '4'};
relationships['rangeslider43'] = {parent: '4'};
relationships['rangeslider44'] = {parent: '4'};
relationships['rangeslider45'] = {parent: '4'};
relationships['rangeslider411'] = {parent: '41', children: '4111,4112,4113,4114'};
relationships['rangeslider4113'] = {parent: '411', children: '4113-HS,4113-E,4113-Q'};
relationships['rangeslider3'] = {parent: '0', children: '31,32,33,34,35,36,37'};

// console.log(slidersMemo)

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
// console.log(sliderName)
  if(!relationships['rangeslider'+sliderName])
  {
    sliderValue = slidersMemo['rangeslider' + sliderName];
    if (sliderValue) {
      result = parseInt(sliderValue);
    }
    return result;
  }

  var childrenIds = relationships['rangeslider'+sliderName].children;
  // console.log('childrenIds')
  // console.log(childrenIds)

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

    var topValue = sliderSumForTop('A0'),
        topSlider = $('input[name=rangesliderA0]');

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

