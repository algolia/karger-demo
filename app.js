var search = instantsearch({
        appId: 'Q71HM8430Y',
        apiKey: '7f42b7cbd41474bf777414c24302d4a4',
        indexName: 'oa_test_gi-copy'
      });

      search.addWidget(
        instantsearch.widgets.searchBox({
          container: '#search-box',
          placeholder: 'Search journals and books...'
        })
      );

      search.addWidget(
        instantsearch.widgets.hits({
          container: '#hits-container',
          templates: {
            item: function(data) {return '<div class="hit-item"><div class="hit-item-img"><img src="http://placehold.it/65x100"></div><div class="hit-item-main"><div class="hit-item-date">' + convertToDate(data.PublicationDateTimestamp) + '</div><div class="hit-item-title">' + data._highlightResult.Title.value + '</div><div class="hit-item-abstract-container"><span class="hit-item-abstract-title">Abstract: </span><div class="hit-item-abstract">' + checkIfResultExists(data._snippetResult.Abstract) + '</div></div><div class="hit-item-paragraph">' + checkIfMatchExists(data._snippetResult.Paragraph) + '</div></div></div>'}
          }
        })
      );

      search.addWidget(
        instantsearch.widgets.pagination({
          container: '#pagination-container'
        })
      );
    
    search.addWidget(
        instantsearch.widgets.menu({
          container: '#titles-container',
          attributeName: 'JournalTitle'
        })
      );
    
    search.addWidget(
        instantsearch.widgets.refinementList({
          container: '#keywords-container',
          attributeName: 'Keywords'
        })
      );
    
    search.addWidget(
        instantsearch.widgets.sortBySelector({
          container: '#sort-container',
          indices: [
            {name: 'oa_test_gi-copy', label: 'Most relevant'},
            {name: 'oa_test_gi-copy-slave', label: 'Most recent'}
            ]
        })
      );

    search.addWidget(
        instantsearch.widgets.numericRefinementList({
          container: '#dates-container',
            attributeName: 'PublicationDateTimestamp',
            options: [
                {name: 'All'},
                {start: (moment().subtract(1, 'years').unix() * 1000), name: 'Less than a year ago'},
                {end: (moment().subtract(1, 'years').unix() * 1000), name: 'More than a year ago'}
            ]
        })
      );

      search.start();

function checkIfResultExists(result) {
    return result != undefined ? result.value : "";
}

function checkIfMatchExists(paragraph) {
    return paragraph.matchLevel === 'full' || paragraph.matchLevel === 'partial' ? paragraph.value : "";
}

function convertToDate(timestamp) {
    return moment(timestamp).format("MMMM Do, YYYY");
}