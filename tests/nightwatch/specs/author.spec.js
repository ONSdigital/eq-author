module.exports = {
  "visit create form": browser => {
    browser.url("http://localhost:3000").waitForElementVisible("body", 1000);
    browser.page.ListPage().clickCreate();
  },

  "create questionnaire": browser => {
    const create = browser.page.CreatePage();
    const design = browser.page.DesignPage();

    create.section.form
      .fill({
        title: "a title",
        description: "a description of some kind"
      })
      .submit();

    design
      .titleContains("a title")
      .assertUrl({ questionnaireId: 1, sectionId: 1, pageId: 1 });
  },

  "add a page": browser => {
    const design = browser.page.DesignPage();
    const sidebar = design.section.sidebar;

    sidebar.createPage();
    design.assertUrl({ sectionId: 1, pageId: 2 });
  },

  "delete a page": browser => {
    const design = browser.page.DesignPage();
    const sidebar = design.section.sidebar;

    sidebar.deletePage(0).assertNumberPages(1);
  },

  "add a section": browser => {
    const design = browser.page.DesignPage();
    const sidebar = design.section.sidebar;

    sidebar.createSection();
    design.assertUrl({ sectionId: 2, pageId: 3 });
  },

  "delete a section": browser => {
    const design = browser.page.DesignPage();
    const sidebar = design.section.sidebar;

    sidebar.deleteSection(0).assertNumberSections(1);
  },

  "deleting the last page of a section": browser => {
    const design = browser.page.DesignPage();
    const sidebar = design.section.sidebar;

    sidebar.deletePage(0);
    design.assertUrl({ sectionId: 2, pageId: 4 });
  },

  "deleting the last section of a questionnaire": browser => {
    const design = browser.page.DesignPage();
    const sidebar = design.section.sidebar;

    sidebar.deleteSection(0);
    design.assertUrl({ sectionId: 3, pageId: 5 });
  },

  finished: browser => browser.end()
};
