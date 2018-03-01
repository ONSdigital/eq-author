import initStoryshots from "@storybook/addon-storyshots";
import { mount } from "enzyme";

function renderOnly({ story, context }) {
  var storyElement = story.render(context);
  mount(storyElement);
}

initStoryshots({
  framework: "react",
  test: renderOnly
});
