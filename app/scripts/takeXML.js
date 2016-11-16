
$.ajax({
  type: 'GET',
  url: '../iso.xml',
  dataType: 'xml',
  success: xmlParser
});

function xmlParser(xml) {
  $(xml).find('node').each(function () {

    var arrXml = {}
      ,maxDegree = 'maxDegree'
      ,parent = 'parent'
      ,children = 'children'
      ,childrenDegree = 'childrenDegree'
      ,name = 'name'
      ,nameElement3 = $(this).find('name').html()
      ,degree = $(this).find('decision').attr('maxDegree')
      ,labelChildren = $(this).children('nodes').children('node').children('label').text( ).split(/(?=[A-Z])/).join(',').split('.').join('')
      ,lastChildrenDegree =  $(this).children('nodes').children('node').children('label').siblings('assessment').children('decision')
      ,labelParent =  labelChildren.split(',')[0]
      ,labelParent1 =  labelChildren.split(',')
      ,labelParentLength = labelParent.length-1
      ,labelParent2 = labelParent.substring(0, labelParentLength)
      ,labelParent2Length = labelParent2.length-1
      // ,nameElement =  $(this).children('nodes').children('node[type="claim"]').children('name').text()
      ,nameElement = $(this).children('nodes').children('node').children('name').text().replace('PBI', 'PBI: ').replace('SZBI', 'SZBI. ').replace(/([a-z-ń0-9])([A-Z])/g, '$1. $2')
      // .split('.')
      // ,nameElementLength = nameElement.length
      // ,nameElement2 = nameElement.substring(0, nameElementLength)
      ,parents = labelParent2.substring(0, labelParent2Length)
      ,parents1 = labelParent2.substring(1, 3);

    // console.log(labelParent2)
    // console.log(labelChildren)

    if(labelParentLength == 3 && (parents1 >=11 && parents1 <= 18)){
      parents = labelParent2.substring(0, labelParent2Length-1);
    }else{
      parents = labelParent2.substring(0, labelParent2Length);
    }


    var t=[];
    var y = [];

    $.each(lastChildrenDegree, function (index, value) {
      t.push(value.outerHTML.split('"'));
      // console.log(t)

    });

    $.each(t, function (i,v) {
      y.push(v[3])

    });

    y.shift();

    arrXml[maxDegree] = degree;
    arrXml[name] = nameElement;
    arrXml[children] = labelChildren;
    arrXml[childrenDegree] = y.join(',');
    arrXml[parent] = parents;

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

