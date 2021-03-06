// Utils Imports
const { isValid } = require('./utils/validationUtils');
const { search } = require('./utils/requests/search');
const { getSearchMethod } = require('./utils/searching');
const { getOutput } = require('./utils/sanitizer');
const { getCount } = require('./utils/general');

const resultsPageIndicator = true;
exports.getResults = async (req, res) => {
  // Inputs

  // artist, track or and album (Type)
  const type = req.query['search-type'];
  // specifices the proper API method to use (Method)
  const methods = getSearchMethod(type);
  // the user input -- with no spaces (Value)
  const value = encodeURIComponent(req.query['search-value']);
  // Input Validation
  if (!isValid(value)) {
    res.redirect('/');
  }

  try {
    const searchResults = await search(type, methods[0], value);
    const output = await getOutput(searchResults, type, methods);
    const count = getCount(output.length);
    res.render('results', {
      title: 'Search Results',
      resultsPageIndicator,
      output,
      count,
      noResults: output.length <= 0,
    });
  } catch (error) {
    res.redirect('/');
  }
};
