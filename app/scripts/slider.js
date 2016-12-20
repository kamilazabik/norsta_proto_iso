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
  obj.attr('oninput', 'OnInputSlider(this)');
  updateSlider(this, slidersMemo);

  return obj;
};

function OnInputSlider(obj)
{
  updateSlider(obj);
  if(obj) {
    tempAssessmentObject.sliderName=obj.name;
    tempAssessmentObject.value=$(obj).val();
    $ ('input').off('click')

    $('input').on('click', function (e) {
      notSavedAssessment=true;
      e.stopPropagation()
    })
  }
}

// function activeSlider(numberOfChildren){
//   $.each(numberOfChildren, function (index,value) {
//     console.log(value)
//     if(!isoObject[value].children){
//       console.log($('.panel-hseq'+ value).find('.bar').find('span'))
//     }
//   })
// }



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

  if(!obj[0]) {
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
      else {
        initVal = memo[obj[idx].name];

        nextObj.parent().parent().parent().children('.bar-slider').children().children('.slider-container').children('.bar').children('.pasek').slice(2).addClass('active-input')
      }
      if(!initVal) {
        initVal=0;
      }
      $(passObj[idx]).val(initVal);
      updateSlider(passObj[idx], null);


    });
    return;
  } else {
    //ruch myszką
    if(!slidersMemo) {
      slidersMemo={};
    }

    // slidersMemo[obj[0].name] = value;

    if(SzybkaOcena){
      // console.log('zapisało się')
      slidersMemo[obj[0].name] = value;
    }else{
      // console.log("nie zapisało się")
    }


    if(obj.attr('data-parent') != null){
      var parentSlider = $('input[name='+obj.attr('data-parent') +']')
        , parentVal = sliderSum(parentSlider);
      // console.log(parentSlider.val())
      // console.log(parentSlider)

      if(parentVal>=0) {
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

