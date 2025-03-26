import appStore from './index.js';

console.log('Testing app store scraper with ESM imports:');

// Test app details
console.log('\n1. Testing app lookup:');
appStore
  .app({ id: 553834731 })
  .then(result => {
    console.log(`Successfully retrieved details for ${result.title}`);
  })
  .catch(console.error);

// Test search
console.log('\n2. Testing search:');
appStore
  .search({ term: 'candy crush', num: 1 })
  .then(results => {
    console.log(`Search returned ${results.length} results`);
    if (results.length > 0) {
      console.log(`First result: ${results[0].title}`);
    }
  })
  .catch(console.error);

// Test list
console.log('\n3. Testing list:');
appStore
  .list({
    collection: appStore.collection.TOP_FREE_IOS,
    num: 2
  })
  .then(results => {
    console.log(`List returned ${results.length} results`);
    results.forEach((app, i) => {
      console.log(`${i + 1}. ${app.title}`);
    });
  })
  .catch(console.error);
