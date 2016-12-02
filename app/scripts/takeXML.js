// // // $(document).ready( function() {
// // //   $.ajax({
// // //     type: 'GET',
// // //     url: '../iso.xml',
// // //     dataType: 'xml',
// // //     success: xmlParser
// // //   });
// // //
// // //   function xmlParser(xml) {
// // //     $(xml).find('node').each(function () {
// // //
// // //       var arrXml = {}
// // //         , maxDegree = 'maxDegree'
// // //         , parent = 'parent'
// // //         , children = 'children'
// // //         , childrenDegree = 'childrenDegree'
// // //         , name = 'name'
// // //         , description = 'description'
// // //         , nameElement3 = $(this).find('name').html()
// // //         , degree = $(this).find('decision').attr('maxDegree')
// // //         , labelChildren = $(this).children('nodes').children('node').children('label').text().split(/(?=[A-Z])/).join(',').split('.').join('')
// // //         , descriptionChildren = $(this).children('nodes').children('node').children('description')
// // //
// // //
// // //           // .text().replace(/([<b><])([W](?=y))/g, '##<b$1 $2').split('<b##').join('^')
// // //
// // //         // split('Wymagania')
// // //           // .split(/(?=[A-Z])/, "Wymagania")
// // //           // .split(/(?=[A-Z])/).join(',').split('.').join('')
// // //         , lastChildrenDegree = $(this).children('nodes').children('node').children('label').siblings('assessment').children('decision')
// // //         , labelParent = labelChildren.split(',')[0]
// // //         , labelParent1 = labelChildren.split(',')
// // //         , labelParentLength = labelParent.length - 1
// // //         , labelParent2 = labelParent.substring(0, labelParentLength)
// // //         , labelParent2Length = labelParent2.length - 1
// // //         // ,nameElement =  $(this).children('nodes').children('node[type="claim"]').children('name').text()
// // //         , nameElement = $(this).children('nodes').children('node').children('name').text().replace('PBI', 'PBI: ').replace('SZBI', 'SZBI. ').replace(/([a-z-ń0-9])([A-Z])/g, '$1. $2')
// // //         // .split('.')
// // //         // ,nameElementLength = nameElement.length
// // //         // ,nameElement2 = nameElement.substring(0, nameElementLength)
// // //         , parents = labelParent2.substring(0, labelParent2Length)
// // //         , parents1 = labelParent2.substring(1, 3);
// // //
// // //       // console.log(labelParent2)
// // //       // console.log(labelChildren);
// // //       // console.log(descriptionChildren);
// // //
// // // var arrayWithDescription = [];
// // // var textDescription = [];
// // //       $.each(descriptionChildren, function (v,i) {
// // //           var desc= (i.innerHTML).replace(/&lt;/g, '<').replace(/&gt;/g, '>');
// // //         arrayWithDescription.push(desc);
// // //         textDescription = arrayWithDescription.join('$')
// // //
// // //       });
// // //
// // // // console.log(textDescription);
// // //
// // //
// // //       if (labelParentLength == 3 && (parents1 >= 11 && parents1 <= 18)) {
// // //         parents = labelParent2.substring(0, labelParent2Length - 1);
// // //       } else {
// // //         parents = labelParent2.substring(0, labelParent2Length);
// // //       }
// // //
// // //
// // //       var t = [];
// // //       var y = [];
// // //
// // //       $.each(lastChildrenDegree, function (index, value) {
// // //         t.push(value.outerHTML.split('"'));
// // //         // console.log(t)
// // //
// // //       });
// // //
// // //       $.each(t, function (i, v) {
// // //         y.push(v[3])
// // //
// // //       });
// // //
// // //       y.shift();
// // //
// // //       arrXml[maxDegree] = degree;
// // //       arrXml[name] = nameElement;
// // //       arrXml[children] = labelChildren;
// // //       arrXml[childrenDegree] = y.join(',');
// // //       arrXml[parent] = parents;
// // //       arrXml[description] = textDescription;
// // //
// // //       if (labelParent2.length > 0) {
// // //         xmlDataArr[labelParent2] = arrXml
// // //       }
// // //
// // //       // console.log(labelParent1[0] == "")
// // //       // xmlDataArr[labelParent1[0]] = arrXml
// // //       // && labelParent1.length >= 1
// // //     });
// // //
// // //     // console.log(xmlDataArr);
// // //     // console.log(JSON.stringify(xmlDataArr));
// // //   }
// // // });
// //
// //
// //
// $(document).ready( function() {
//   $.ajax({
//     type: 'GET',
//     url: '../iso.xml',
//     dataType: 'xml',
//     success: xmlParser
//   });
//
//   function xmlParser(xml) {
//
//     $(xml).find('node').each(function () {
//       //console.log($(this));
//
//       var label = $(this).children('label').text().split('.').join(''),
//           arrXml = {};
//
//       if(label.length > 0) {
//         var parentLabel = ($(this)[0].parentElement.parentElement.parentElement.parentElement.children[1].innerHTML.split('.').join('')),
//             children = $(this)[0].children[5],
//             childrenLabels = '',
//             childrenNames = '',
//             childrenDescriptions = '',
//             childrenMaxDegree = '';
//
//         if(children)
//         {
//           children = (children.children[0].children[6].children);
//           // console.log(children)
//
//           for(var i=0; i<children.length; i++)
//           {
//
//             var localMaxDegree;
//
//             for(var j=0; j<children[i].children[4].children.length; j++){
//             // console.log(children[i].children[4].children[j].getAttribute('maxDegree'));
//               localMaxDegree = children[i].children[4].children[1].getAttribute('maxDegree');
//           }
//
//             // var localLabel = children[i].children[1],
//             var localLabel = children[i].children[1].innerHTML.split('.').join(''),
//                 localName = children[i].children[0].innerHTML,
//                 localDescription = children[i].children[3].innerHTML;
//
//              // console.log(localMaxDegree)
//             // console.log(localName);
//
//
//             if(localLabel && localLabel.length>0) {
//               // console.log(localLabel);
//               // console.log(childrenLabels);
//               if(childrenLabels.length===0)
//               {
//                 childrenLabels=localLabel;
//               }
//               else {
//                 childrenLabels = childrenLabels + ',' + localLabel;
//               }
//             }
//
//             if(localName && localName.length>0) {
//               if(childrenNames.length===0)
//               {
//                 childrenNames=localName;
//               }
//               else {
//                 childrenNames = childrenNames + '.' + localName;
//               }
//             }
//
//             if(localDescription && localDescription.length>0) {
//               if(childrenDescriptions.length===0)
//               {
//                 childrenDescriptions=localDescription;
//               }
//               else {
//                 childrenDescriptions = childrenDescriptions + ',' + localDescription;
//               }
//             }
//
//             if(localMaxDegree && localMaxDegree.length>0) {
//               if(childrenMaxDegree.length===0)
//               {
//                 childrenMaxDegree=localMaxDegree;
//               }
//               else {
//                 childrenMaxDegree = childrenMaxDegree + ',' + localMaxDegree;
//               }
//             }
//           }
//         }
//
//         arrXml['parent'] = parentLabel;
//         arrXml['name'] = $(this).children('name').text();
//         arrXml['description'] = $(this).children('description').text();
//         arrXml['maxDegree'] = $(this).find('decision').attr('maxDegree');
//         arrXml['children'] = childrenLabels;
//         arrXml['childrenNames'] = childrenNames;
//         arrXml['childrenDescriptions'] = childrenDescriptions;
//         arrXml['childrenMaxDegree'] = childrenMaxDegree;
//
//         xmlDataArr[label] = arrXml;
//       }
//     });
//
//     console.log(xmlDataArr);
//     // console.log(JSON.stringify(xmlDataArr))
//   }
// });
