function sliderSum(theSlider) {
  var childrenIds = theSlider.data('children')
    , result = 0;

  if(childrenIds)
  {
    $.each(childrenIds.split(','), function(idx, val) {
      if(slidersMemo) {
        var childValue = slidersMemo[val];

        if(childValue)
        {
          result = result + parseInt(childValue);
        }
      }
    });
  }
  return result;
}//sliderSum

function sliderSumForTop(sliderName) {
  var sliderValue, result = 0;
  if(!isoObject[sliderName])
  {
    sliderValue = slidersMemo[sliderName];
    if (sliderValue) {
      result = parseInt(sliderValue);
    }
    return result;
  }

  var childrenIds = isoObject[sliderName].children;
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
}//sliderSumForTop

function updateTopSlider() {
  var topValue = sliderSumForTop('A')
    , topSlider = $('input[name=A]');

  if (topValue >= 0) {
    topSlider.val(topValue);
    updateSlider(topSlider, null);
  }
}

$.fn.rangeslider = function (options) {
  var obj = this
    , defautValue = obj.attr('value');
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
};//updateTopSlider

function OnInputSlider(obj) {
  updateSlider(obj);
  if(obj) {
    // tempAssessmentObject.sliderName=obj.name;
    // tempAssessmentObject.value=$(obj).val();

    tempAssessmentObject[obj.name]=$(obj).val();
    // console.log(tempAssessmentObject)

    $ ('input').off('click');
    $ ('input').off('click touchend');

    $('input').on('click', function (e) {
      notSavedAssessment=true;
      e.stopPropagation()
    });

    $('input').on('touchend ', function (e) {
      notSavedAssessment=true;
      console.log(this, e);
      console.log(notSavedAssessment)
      e.stopPropagation()
    })
  }
}//OnInputSlider

function updateSlider(passObj, memo, isInit) {

  var obj = $(passObj)
    , value = obj.val()
    , min = obj.attr('min')
    , max = obj.attr('max')
    , t = 100/max
    , range = Math.round(max - min)
    , percentage = ((value - min) * 100 / range).toFixed(2)
    , nextObj = obj.next();

  nextObj.find('span.bar-btn').css('left', percentage + '%');
  nextObj.find('span.bar > span.pasek1').css('width', percentage + '%');
  nextObj.find('span.bar > span.pasek').css('width', max * t - percentage + '%' );

  if(!obj[0]) {
    return;
  }
  var nn = obj[0].name.replace('rangeslider','');

  var input = $('input[name=' + tempAssessmentObject.sliderName + ']');

  if(memo){ //Inicjalizacja slidera
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
      updateSlider(passObj[idx], null, true);

    });
    return;
  } else {
    //ruch myszką
    if(!slidersMemo) {
      slidersMemo={};
    }

    // console.log(slidersMemo)
    // console.log(tempAssessmentObject)
    // slidersMemo[obj[0].name] = value;

    var xxx=obj[0].name;
    if(SzybkaOcena){
      // zapisanie oceny
      slidersMemo[obj[0].name] = value;
    }else{
      if(savingAssessment || isInit) {
        slidersMemo[obj[0].name] = value;
      }
    }

    if(obj.attr('data-parent') != null){
      var parentSlider = $('input[name='+obj.attr('data-parent') +']')
        , parentVal = sliderSum(parentSlider);

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

  function $$(selector, context) {
    context = context || document;
    var elements = context.querySelectorAll(selector);
    return Array.prototype.slice.call(elements);
  }


  $$('.pie').forEach(function(pie) {
    for (var i = 0; i < obj.length; i++) {
      if(obj[i].name == pie.getAttribute('data-name') ||
        obj.name == pie.getAttribute('data-name')) {
        var p = percentage
          , NS = 'http://www.w3.org/2000/svg'
          , svg = document.createElementNS(NS, 'svg')
          , circle = document.createElementNS(NS, 'circle')
          , title = document.createElementNS(NS, 'title');
        circle.setAttribute('r', 16);
        circle.setAttribute('cx', 16);
        circle.setAttribute('cy', 16);
        circle.setAttribute('stroke-dasharray', p + ' 100');
        svg.setAttribute('viewBox', '0 0 32 32');
        title.textContent = pie.textContent;
        pie.textContent = '';
        svg.appendChild(title);
        svg.appendChild(circle);
        pie.appendChild(svg);

        if(value > 0 ){
          circle.classList.add('circle')
        }
      }
    }
  });

}//updateSlider

