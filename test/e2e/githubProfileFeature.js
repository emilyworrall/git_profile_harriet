var mock = require('protractor-http-mock');

describe('GitHub profile finder', function() {

  beforeEach(function() {
    mock(['githubUserSearch.js']);
    browser.get('http://localhost:8080');
  });

  afterEach(function() {
    mock.teardown();
  });

  var searchBox = element(by.model('searchCtrl.searchTerm'))
  var searchButton = element(by.className('btn'))

  it('has a title', function() {
     expect(browser.getTitle()).toEqual('Github user search');
   });

  it('finds profiles', function() {
    searchBox.sendKeys('spike01');
    searchButton.click();

    var profiles = element.all(by.repeater('user in searchCtrl.searchResult.items'));
    expect(profiles.get(0).getText()).toEqual('spike01');
  });

  it('finds the last Spike', function() {
    searchBox.sendKeys('spike');
    searchButton.click();

    var profiles = element.all(by.repeater('user in searchCtrl.searchResult.items'));
    expect(profiles.last().getText()).toEqual('spikelynch');
  });

  it('count the number of Spikes', function() {
    searchBox.sendKeys('spike');
    searchButton.click();

    element.all(by.repeater('user in searchCtrl.searchResult.items')).then(function(items) {
      expect(items.length).toBe(30);
    });
  });
});
