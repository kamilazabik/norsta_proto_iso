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
