module.exports = {
  elements: {
    header: "header"
  },

  sections: {
    sidebar: {
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
    }
  }
};
