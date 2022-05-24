import _toConsumableArray from "@babel/runtime/helpers/toConsumableArray";

var tagsSuggestionsFilter = function tagsSuggestionsFilter(suggestedTags, userInput, getTagLabel) {
  if (!userInput) {
    return [];
  }

  var suggestions = _toConsumableArray(suggestedTags);

  if (userInput) {
    var regexp = new RegExp(userInput, 'i');
    suggestions = suggestions.filter(function (suggestion) {
      return regexp.test(getTagLabel(suggestion));
    });
  }

  return suggestions;
};

export { tagsSuggestionsFilter };