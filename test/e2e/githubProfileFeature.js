var mock = require('protractor-http-mock');

describe('GitHub profile finder', function() {

  var searchBox = element(by.model('searchCtrl.searchTerm'))
  var searchButton = element(by.className('btn'))

  describe('using protractor mock', function () {
    beforeEach(function() {
      mock(['githubUserSearch.js']);
    });

    it('has a title', function() {
      browser.get('http://localhost:8080');
      expect(browser.getTitle()).toEqual('Github user search');
     });

    it('finds profiles', function() {
      browser.get('http://localhost:8080');
      searchBox.sendKeys('ptolemybarnes');
      searchButton.click();

      var profiles = element.all(by.repeater('user in searchCtrl.searchResult.items'));
      expect(profiles.get(0).getText()).toEqual('ptolemybarnes');
    });

    it('finds the last ptolemy', function() {
      browser.get('http://localhost:8080');
      searchBox.sendKeys('ptolemybarnes');
      searchButton.click();

      var profiles = element.all(by.repeater('user in searchCtrl.searchResult.items'));
      expect(profiles.last().getText()).toEqual('ptolemyrulz');
    });

    it('count the number of Spikes', function() {
      browser.get('http://localhost:8080');
      searchBox.sendKeys('ptolemybarnes');
      searchButton.click();

      element.all(by.repeater('user in searchCtrl.searchResult.items')).then(function(items) {
        expect(items.length).toBe(2);
      });
    });

    afterEach(function() {
      mock.teardown();
    });
  });

  describe('without using protractor mock', function () {
    it('return no users when user is not found', function () {
      browser.get('http://localhost:8080');
      searchBox.sendKeys('hdahdajksdhoiwhdanlsl');
      searchButton.click();

      element.all(by.repeater('user in searchCtrl.searchResult.items')).then(function(items) {
        expect(items.length).toBe(0);
      });
    });
  });

});
