import { memoize } from "lodash";
const parser = new DOMParser();

const getTextFromHTML = html => {
  const doc = parser.parseFromString(html, "text/html");
  return doc.body.textContent.trim();
};

export default memoize(getTextFromHTML);
