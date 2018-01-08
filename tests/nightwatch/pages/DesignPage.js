const URL_RE = /#\/questionnaire\/(\d+)\/design\/(\d+)\/(\d+)$/;

const sidebarSection = {
  selector: "#questionnaire-nav",

  elements: {
    addSectionButton: "button[class*='AddSectionBtn']",
    deleteSectionButton: "[aria-label='Delete section']",
    addPageButton: "#btn-add-page",
    deletePageButton: "[aria-label='Delete page']"
  },

  commands: [
    {
      createPage: function() {
        this.click("@addPageButton");
        this.api.pause(500);
        return this;
      },

      createSection: function() {
        this.click("@addSectionButton");
        this.api.pause(500);
        return this;
      },

      deletePage: function(pageNumber = 0) {
        this.clickNth("@deletePageButton", pageNumber);
        this.api.pause(500);
        return this;
      },

      assertNumberPages: function(count) {
        this.verify.elementCount("@deletePageButton", 1);
        return this;
      },

      deleteSection: function(sectionNumber = 0) {
        this.clickNth("@deleteSectionButton", sectionNumber);
        this.api.pause(500);
        return this;
      },

      assertNumberSections: function(count) {
        this.verify.elementCount("@deleteSectionButton", 1);
        return this;
      }
    }
  ]
};

module.exports = {
  elements: {
    header: "header"
  },

  commands: [
    {
      titleContains: function(text) {
        this.assert.containsText("@header", text);
        return this;
      },

      assertUrl: function(expectations) {
        const api = this.api;

        api.url(function({ value }) {
          var [, questionnaireId, sectionId, pageId] = value.match(URL_RE);

          if (expectations.questionnaireId !== undefined) {
            api.assert.equal(
              expectations.questionnaireId,
              parseInt(questionnaireId, 10)
            );
          }
          if (expectations.sectionId !== undefined) {
            api.assert.equal(expectations.sectionId, parseInt(sectionId, 10));
          }
          if (expectations.pageId !== undefined) {
            api.assert.equal(expectations.pageId, parseInt(pageId, 10));
          }
        });

        return this;
      }
    }
  ],

  sections: {
    sidebar: sidebarSection
  }
};
