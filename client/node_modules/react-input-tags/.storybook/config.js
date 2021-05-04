import { configure } from '@kadira/storybook';

function loadStories() {
  require('../stories/styles.js');
  require('../stories/Example.jsx');
  require('../stories/InputTagsContainer.jsx');
  require('../stories/InputTags.jsx');
  require('../stories/Input.jsx');
  require('../stories/Tag.jsx');
  require('../stories/SuggestionList.jsx');
  require('../stories/Suggestion.jsx');
  require('../stories/SuggestionsLoader.jsx');
}

configure(loadStories, module);
