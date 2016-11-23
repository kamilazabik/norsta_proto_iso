function loadTitle(){
  var links = $('[class*=\'title-hseq\']')
    , allElement = $('[class*=\'panel-hseq\']')
    , title = $('.title-claim')
    , label = $('.label-claim')
    , allInputs = $('input')
    , slider = $('.sliderRightPanel input.slider');




  $('#normalAsses, #fastAsses').click(function () {
    if (this.id == 'normalAsses') {
      console.log('normalAsses 1 clicked');
      clickedButton = false;

    }
    else if (this.id == 'fastAsses') {
      console.log('fastAsses 2 clicked');
      clickedButton = true;
      console.log(clickedButton)
    }
  });

  allElement.each(function(){
    var className = $(this);
    // console.log(className)
    // var numberClass = className.attr('class').split(' ')[0].replace('title-hseq','').split('-');
    var numberClass = className.attr('class').split(' ')[1].replace('panel-hseq','').split('-');
    var panel = $('.panel-hseq' + numberClass.join('-'));

    clickOnClassName(numberClass, className,panel)

  });

  function clickOnClassName(numberClass,className,panel) {
    $(className).on('click', function (e) {

      var classNameText = numberClass.join('.')
        // , link = $(this).text();
        , link = $('.title-hseq' + classNameText).text()
      , comment = $('.addedCom')


      $('.addedComment').attr('data-name', classNameText);
      $('.editable_text').on('click', divClicked);


      allElement.removeClass('panel-shadow');
      e.preventDefault();
      title.text(link);
      label.text(numberClass.join('.'));

      console.log(isoObject[classNameText].comment)

      if(!isoObject[classNameText].comment){
        comment.text('Dodaj komentarz');
      }else{
        comment.text(isoObject[classNameText].comment);
      }

      changeSlider(classNameText);

      loadDescription(numberClass);

      panel.addClass('panel-shadow');

      console.log(clickedButton);

      if(isoObject[numberClass] == undefined){
        allInputs.each(function () {
          $('input').attr('disabled', 'disabled')
        });

        if(!clickedButton){
          var clickedInput = $('input[name='+classNameText +']');
          clickedInput.removeAttr('disabled' );
        }
      }
    });

    $('.sliderRightPanel').on('click', function (e) {

      var classNameText = numberClass.join('.');

      var input = $('input[name='+numberClass +']');
      console.log(input);

      // changeSlider(classNameText);
      updateSlider(input, slidersMemo);
    })
  }


}//loadTitle
