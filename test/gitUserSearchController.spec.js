describe('GitUserSearchController', function() {
  beforeEach(module('GitUserSearch'));

  var items = [
    {
      'login': 'tansaku',
      'avatar_url': 'https://avatars.githubusercontent.com/u/30216?v=3',
      'html_url': 'https://github.com/tansaku'
    },
    {
      'login': 'stephenlloyd',
      'avatar_url': 'https://avatars.githubusercontent.com/u/196474?v=3',
      'html_url': 'https://github.com/stephenlloyd'
    }
  ];

  var ctrl, fakeSearch, scope;

  beforeEach(function() {
    fakeSearch = jasmine.createSpyObj('fakeSearch', ['query']);

    module({
      Search: fakeSearch
    });
  });

  beforeEach(inject(function($controller, $q, $rootScope) {
    ctrl = $controller('GitUserSearchController');
    fakeSearch.query.and.returnValue($q.when({data: items}));
    scope = $rootScope;
  }));

  it('initialises with an empty search result and term', function() {
    expect(ctrl.searchResult).toBeUndefined();
    expect(ctrl.searchTerm).toBeUndefined();
  });

  describe('when searching for a user', function() {

    it('displays search results', function() {
      ctrl.searchTerm = 'hello';
      ctrl.doSearch();
      scope.$apply();
      expect(ctrl.searchResult).toEqual(items);
    });
  });

});
