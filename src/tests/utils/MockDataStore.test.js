import MockDataStore from "./MockDataStore";

import { merge, values, sum } from "lodash";

describe("MockDataStore", () => {
  const seedData = {
    questionnaires: { 1: { test: "questionnaire" } },
    sections: { 1: { test: "section" } },
    pages: { 1: { test: "page" } },
    answers: { 1: { test: "answer" } }
  };

  it("should be able to create an empty data store ", () => {
    const result = new MockDataStore();

    expect(result).toMatchObject({
      questionnaires: {},
      sections: {},
      pages: {},
      answers: {}
    });
  });

  it("should be possible to seed the data store with existing data", () => {
    const result = new MockDataStore({ ...seedData });

    expect(result).toMatchObject(seedData);
  });

  it("should start all counters at zero", () => {
    const result = new MockDataStore();
    expect(sum(values(result.counter))).toBe(0);
  });

  describe("retrieving values from the mock data store", () => {
    it("should be possible to retrieve data from the store", () => {
      const result = new MockDataStore(seedData);
      expect(result.getQuestionnaire(1)).toEqual(seedData.questionnaires[1]);
      expect(result.getSection(1)).toEqual(seedData.sections[1]);
      expect(result.getPage(1)).toEqual(seedData.pages[1]);
      expect(result.getAnswer(1)).toEqual(seedData.answers[1]);
    });
  });

  describe("mutations", () => {
    it("should be possible to create individual data model entities", () => {
      const result = new MockDataStore();
      result.createQuestionaire(seedData.questionnaires[1]);
      expect(values(result.questionnaires)).toHaveLength(1);
    });

    it("should increment the relevant counter when creating entities", () => {
      const result = new MockDataStore();
      result.createQuestionaire(seedData.questionnaires[1]);

      expect(result.counter.questionnaire).toBe(1);
    });
  });

  describe("questionnaires", () => {
    it("should return all the questionnaires", () => {
      const store = new MockDataStore();

      const questionnaire1 = store.createQuestionaire(
        merge({}, seedData.questionnaires[1], { id: 1 })
      );
      const questionnaire2 = store.createQuestionaire(
        merge({}, seedData.questionnaires[1], { id: 2 })
      );

      expect(store.getQuestionnaires()).toEqual(
        expect.arrayContaining([questionnaire1, questionnaire2])
      );
    });
  });

  describe("questionnaire", () => {
    it("should be possible to retrieve a created questionnaire", () => {
      const store = new MockDataStore();

      const questionnaire = store.createQuestionaire(
        merge({}, seedData.questionnaires[1], { title: "test" })
      );

      expect(store.getQuestionnaire(1)).toEqual(questionnaire);
    });

    it("should create a section and page automatically for a new questionnaire", () => {
      const result = new MockDataStore();
      result.createQuestionaire(seedData.questionnaires[1]);

      expect(values(result.sections)).toHaveLength(1);
      expect(values(result.pages)).toHaveLength(1);
    });

    it("should be possible to update questionnaire details", () => {
      const store = new MockDataStore();
      const questionnaire = store.createQuestionaire({
        title: "Questionnaire 1"
      });
      store.updateQuestionnaire(merge({}, questionnaire, { title: "Updated" }));

      expect(store.getQuestionnaire(1).title).toEqual("Updated");
    });

    describe("deleting a questionnaire", () => {
      it("should be possible to delete a questionnaire", () => {
        const store = new MockDataStore();
        const questionnaire = store.createQuestionaire({
          title: "Questionnaire 1"
        });

        store.deleteQuestionnaire(questionnaire);

        expect(values(store.questionnaires)).toHaveLength(0);
      });

      it("should remove any sections associated with a deleted questionnaire", () => {
        const store = new MockDataStore();
        const questionnaire = store.createQuestionaire({
          title: "Questionnaire 1"
        });

        store.deleteQuestionnaire(questionnaire);

        expect(values(store.sections)).toHaveLength(0);
        expect(store.getQuestionnaire(1)).toBeUndefined();
      });
    });
  });

  describe("section", () => {
    it("should be possible to add a section to a questionnaire", () => {
      const store = new MockDataStore();
      store.createQuestionaire(merge({}, { id: 1, sections: [] }));

      const section = store.createSection(merge({}, { questionnaireId: 1 }));

      expect(store.getSection(2)).toEqual(section);
      expect(store.getQuestionnaire(1).sections).toEqual(
        expect.arrayContaining([section])
      );
    });

    it("should be possible to update section details", () => {
      const store = new MockDataStore();
      store.createQuestionaire({});

      store.updateSection(merge({}, store.getSection(1), { title: "Updated" }));

      expect(store.getSection(1).title).toEqual("Updated");
    });

    describe("deleting a section", () => {
      it("should delete all pages under the deleted section", () => {
        const store = new MockDataStore();
        store.createQuestionaire({});

        const section = store.getSection(1);
        store.deleteSection(merge({}, section));

        expect(values(store.pages)).toHaveLength(0);
        expect(values(store.sections)).toHaveLength(0);
        expect(values(store.questionnaires)).toHaveLength(1);
        expect(store.getQuestionnaire(1).sections).not.toContain(section);
      });
    });
  });

  describe("page", () => {
    let store;

    beforeEach(() => {
      store = new MockDataStore();
      store.createQuestionaire({});
    });

    it("should be possible to add a page to a section", () => {
      const page = store.createPage(merge({}, { sectionId: 1 }));

      expect(store.getPage(2)).toEqual(page);
      expect(store.getSection(1).pages).toEqual(expect.arrayContaining([page]));
      expect(store.getSection(1).pages).toHaveLength(2);
    });

    it("should be possible to update details for a page", () => {
      store.updatePage(merge({}, store.getPage(1), { title: "updated page" }));

      expect(store.getPage(1).title).toEqual("updated page");
      expect(values(store.pages)).toHaveLength(1);
    });

    it("should be possible to delete a page", () => {
      const page = store.getPage(1);

      const deletedPage = store.deletePage(merge({}, { id: page.id }));

      expect(values(store.pages)).toHaveLength(0);
      expect(store.getPage(1)).toBeUndefined();
      expect(store.getSection(1).pages).not.toContain(page);
      expect(deletedPage.__typename).not.toBeUndefined();
    });

    it("should be possible to delete a page containing answers", () => {
      const page = store.getPage(1);
      store.createAnswer({ label: "test answer", pageId: 1 });

      store.deletePage(merge({}, page));

      expect(values(store.pages)).toHaveLength(0);
      expect(values(store.answers)).toHaveLength(0);
    });
  });

  describe("answer", () => {
    let store;

    beforeEach(() => {
      store = new MockDataStore({});
    });

    it("should be possible to add an answer to a page", () => {
      store.createQuestionaire({});

      const answer = store.createAnswer({ label: "test answer", pageId: 1 });

      expect(store.getAnswer(1)).toEqual(answer);
      expect(store.getPage(1).answers).toEqual(
        expect.arrayContaining([answer])
      );
      expect(values(store.answers)).toHaveLength(1);
    });

    it("should be possible to update an answer", () => {
      store.createQuestionaire({});
      store.createAnswer({ label: "test answer", pageId: 1 });

      store.updateAnswer(
        merge({}, store.getAnswer(1), { label: "updated answer" })
      );

      expect(store.getAnswer(1).label).toEqual("updated answer");
    });

    it("should be possible to remove an answer", () => {
      store.createQuestionaire({});
      const answer = store.createAnswer({ label: "test answer", pageId: 1 });

      expect(values(store.answers)).toHaveLength(1);
      expect(store.getAnswer(1)).toEqual(answer);

      store.deleteAnswer(merge({}, store.getAnswer(1)));

      expect(values(store.answers)).toHaveLength(0);
      expect(store.getAnswer(1)).toBeUndefined();
      expect(store.getPage(1).answers).not.toContain(answer);
    });
  });

  describe("options", () => {
    let store;
    beforeEach(() => {
      store = new MockDataStore();
    });

    const options = [
      {
        label: "Option one",
        description: "The first option"
      },
      {
        label: "Option two",
        description: "The second option"
      },
      {
        label: "Option three",
        description: "The third option"
      }
    ];

    it("should be possible to create a new option", () => {
      store.createOption(options[0]);
      expect(store.getOption(1)).toMatchObject(options[0]);
    });

    it("should assign a new id for each newly added option", () => {
      store.createOption(options[0]);
      store.createOption(options[1]);

      expect(store.getOption(1).id).toEqual(1);
      expect(store.getOption(2).id).toEqual(2);
    });

    it("should continue to increment Ids even if option deleted", () => {
      store.createOption(options[0]);
      store.createOption(options[1]);
      store.deleteOption({ id: 1 });
      store.deleteOption({ id: 2 });

      store.createOption(options[2]);

      expect(store.getOption(3).id).toEqual(3);
    });

    it("should add the new option to an answer if answerId specified", () => {
      store.createQuestionaire({});
      store.createAnswer({ label: "Checkbox answer", pageId: 1 });

      const option = store.createOption(merge({}, options[0], { answerId: 1 }));

      expect(store.getAnswer(1).options).toContain(option);
    });

    it("should be possible to update an option", () => {
      store.createOption(options[0]);
      store.updateOption(
        merge({}, store.getOption(1), { description: "Updated description" })
      );
      expect(store.getOption(1).description).toEqual("Updated description");
    });

    it("should have 1 option in the store after adding a single option", () => {
      store.createOption(options[0]);
      expect(values(store.options)).toHaveLength(1);
    });

    it("should have 0 options in the store after removing an option", () => {
      store.createOption(options[0]);
      store.deleteOption({ id: 1 });

      expect(values(store.options)).toHaveLength(0);
    });

    it("should return undefined when trying to retrieve a deleted option from the store", () => {
      store.createOption(options[0]);
      store.deleteOption({ id: 1 });

      expect(store.getOption(1)).toBeUndefined();
    });

    it("should remove the option from the answer when option is deleted", () => {
      store.createQuestionaire({});
      store.createAnswer({ label: "Checkbox answer", pageId: 1 });
      const option = store.createOption(merge({}, options[0], { answerId: 1 }));

      store.deleteOption({ id: 1 });

      expect(store.getAnswer(1).options).not.toContain(option);
    });

    describe("answer specific option behaviour", () => {
      it("should create a single option by default for a checkbox answer", () => {
        store.createQuestionaire({});
        store.createAnswer({
          label: "Checkbox answer",
          type: "Checkbox",
          pageId: 1
        });

        expect(store.getAnswer(1).options).toHaveLength(1);
      });

      it("should create two default options for a radio answer", () => {
        store.createQuestionaire({});
        store.createAnswer({
          label: "Checkbox answer",
          type: "Radio",
          pageId: 1
        });

        expect(store.getAnswer(1).options).toHaveLength(2);
      });
    });
  });
});
