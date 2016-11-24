function loadTitle(){
  var links = $('[class*=\'title-hseq\']')
    , allElement = $('[class*=\'panel-hseq\']')
    , title = $('.title-claim')
    , label = $('.label-claim')
    , allInputs = $('input')
    , slider = $('.sliderRightPanel input.slider');

  changeAssessment();

  allElement.each(function(){
    var className = $(this)
    // var numberClass = className.attr('class').split(' ')[0].replace('title-hseq','').split('-');
      , numberClass = className.attr('class').split(' ')[1].replace('panel-hseq','').split('-')
      , panel = $('.panel-hseq' + numberClass.join('-'));

    clickOnClassName(numberClass, className,panel)

  });

  function clickOnClassName(numberClass,className,panel) {


    $(className).on('click', function (e) {

      var t = $(this).children().find('input').attr('name')

      console.log(t)

      var classNameText = numberClass.join('.')
        // , link = $(this).text();
        , link = $('.title-hseq' + classNameText).text()
        // , comment = $('.addedCom')
        , inputs =$(this).children().find('input')
        , inputName = inputs.attr('name')

      $('.addedComment').attr('data-name', classNameText);
      $('.editable_text').on('click', divClicked);


      allElement.removeClass('panel-shadow');
      e.preventDefault();
      title.text(link);
      label.text(numberClass.join('.'));

      addComments (classNameText)

      changeSlider(classNameText);

      loadDescription(numberClass);


      panel.addClass('panel-shadow');


      if(!isoObject[numberClass] || !isoObject[numberClass].children){
        console.log(inputs);
        console.log(classNameText);
        removeAssess(classNameText,inputs,slider);
        // removeAssess(classNameText,slider);

        allInputs.each(function () {
          $('input').attr('disabled', 'disabled')
        });
        if(!clickedButton){
          var clickedInput = $('input[name='+classNameText +']');
          clickedInput.removeAttr('disabled' );
        }else{
          slider.removeAttr('disabled' );
        }
      }


    });

    $('.sliderRightPanel').on('click', function (e) {

      var classNameText = numberClass.join('.');

      var input = $('input[name='+numberClass +']');
      // console.log(input);

      // changeSlider(classNameText);
      updateSlider(input, slidersMemo);
    })
  }
}//loadTitle


function addComments (classNameText){
  var comment = $('.addedCom');

  if(!isoObject[classNameText] ||!isoObject[classNameText].comment ){
    comment.text('Dodaj komentarz');
  }else{
    comment.text(isoObject[classNameText].comment);
  }
}


function changeAssessment (){
  $('#normalAsses, #fastAsses').click(function () {
    if (this.id == 'normalAsses') {
      // console.log('normalAsses 1 clicked');
      clickedButton = true;
      // console.log(clickedButton)
    }
    else if (this.id == 'fastAsses') {
      // console.log('fastAsses 2 clicked');
      clickedButton = false;
      // console.log(clickedButton)
    }
  });
}

function removeAssess(className,input,slider) {
  $('#removeAssess').unbind('click');
  $('#removeAssess').on('click', function () {
      console.log('removeAssess 1 clicked');
    slidersMemo[className] = "0";
    updateSlider(input, slidersMemo);
    updateSlider(slider, slidersMemo);
    })
}


