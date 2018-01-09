const URL_RE = /#\/questionnaire\/(\d+)\/design\/(\d+)\/(\d+)$/;

exports.assertion = function urlMatches(expected, message) {
  this.expected = JSON.stringify(expected);
  this.message = message || `Testing if url matches: ${this.expected}`;

  this.pass = function(value) {
    value = JSON.parse(value);

    if (
      expected.questionnaireId !== undefined &&
      value.questionnaireId !== expected.questionnaireId
    ) {
      return false;
    }
    if (
      expected.sectionId !== undefined &&
      value.sectionId !== expected.sectionId
    ) {
      return false;
    }
    if (expected.pageId !== undefined && value.pageId !== expected.pageId) {
      return false;
    }

    return true;
  };

  this.value = function value({ value }) {
    var [, questionnaireId, sectionId, pageId] = value.match(URL_RE);

    return JSON.stringify({
      questionnaireId: parseInt(questionnaireId, 10),
      sectionId: parseInt(sectionId, 10),
      pageId: parseInt(pageId, 10)
    });
  };

  this.command = function command(callback) {
    return this.api.url(callback);
  };
};
