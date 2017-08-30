import { merge } from "lodash";
import MockDataStore from "./MockDataStore";

const localStorageKey = "mockDataStore";

const updateLocalStorage = dataStore => {
  if (typeof Storage !== "undefined") {
    localStorage.setItem(localStorageKey, JSON.stringify(dataStore));
  }
};

const createMockDataStore = () => {
  const seed = localStorage.getItem(localStorageKey);
  return seed ? new MockDataStore(JSON.parse(seed)) : new MockDataStore();
};

const DataStore = createMockDataStore();

const persistMutation = result => {
  updateLocalStorage(DataStore);
  return result;
};

export default {
  String: () => "",
  Query: () => ({
    questionnaires: (root, args, ctx) => {
      return DataStore.getQuestionnaires(args.id);
    },
    questionnaire: (root, args, ctx) => {
      return DataStore.getQuestionnaire(args.id);
    },
    section: (root, args, ctx) => {
      return DataStore.getSection(args.id);
    },
    group: (root, args, ctx) => {
      return DataStore.getGroup(args.id);
    },
    page: (root, args, ctx) => {
      return DataStore.getPage(args.id);
    },
    questionPage: (root, args, ctx) => {
      return DataStore.getQuestionPage(args.id);
    },
    answer: (root, args, ctx) => {
      return DataStore.getAnswer(args.id);
    },
    option: (root, args, ctx) => {
      return DataStore.getOption(args.id);
    }
  }),
  Mutation: () => ({
    createQuestionnaire: (root, args, ctx) => {
      return persistMutation(DataStore.createQuestionnaire(merge({}, args)));
    },
    updateQuestionnaire: (root, args, ctx) => {
      return persistMutation(DataStore.updateQuestionnaire(merge({}, args)));
    },
    deleteQuestionnaire: (root, args, ctx) => {
      return persistMutation(DataStore.deleteQuestionnaire(merge({}, args)));
    },
    createSection: (root, args, ctx) => {
      const section = persistMutation(DataStore.createSection(merge({}, args)));

      persistMutation(
        DataStore.createPage({
          pageType: "QuestionPage",
          title: "",
          description: "",
          type: "General",
          sectionId: section.id
        })
      );

      return section;
    },
    updateSection: (root, args, ctx) => {
      return persistMutation(DataStore.updateSection(merge({}, args)));
    },
    deleteSection: (root, args, ctx) => {
      return persistMutation(DataStore.deleteSection(merge({}, args)));
    },
    createGroup: (root, args, ctx) => {
      return persistMutation(DataStore.createSection(merge({}, args)));
    },
    updateGroup: (root, args, ctx) => {
      return persistMutation(DataStore.updateSection(merge({}, args)));
    },
    deleteGroup: (root, args, ctx) => {
      return persistMutation(DataStore.deleteSection(merge({}, args)));
    },
    createPage: (root, args, ctx) => {
      return persistMutation(DataStore.createPage(merge({}, args)));
    },
    updatePage: (root, args, ctx) => {
      return persistMutation(DataStore.updatePage(merge({}, args)));
    },
    deletePage: (root, args, ctx) => {
      return persistMutation(DataStore.deletePage(merge({}, args)));
    },
    createQuestionPage: (root, args, ctx) => {
      return persistMutation(DataStore.createPage(merge({}, args)));
    },
    updateQuestionPage: (root, args, ctx) => {
      return persistMutation(DataStore.updatePage(merge({}, args)));
    },
    deleteQuestionPage: (root, args, ctx) => {
      return persistMutation(DataStore.deletePage(merge({}, args)));
    },
    createAnswer: (root, args, ctx) => {
      return persistMutation(DataStore.createAnswer(merge({}, args)));
    },
    updateAnswer: (root, args, ctx) => {
      return persistMutation(DataStore.updateAnswer(merge({}, args)));
    },
    deleteAnswer: (root, args, ctx) => {
      return persistMutation(DataStore.deleteAnswer(merge({}, args)));
    },
    createOption: (root, args, ctx) => {
      return persistMutation(DataStore.createOption(merge({}, args)));
    },
    updateOption: (root, args, ctx) => {
      return persistMutation(DataStore.updateOption(merge({}, args)));
    },
    deleteOption: (root, args, ctx) => {
      return persistMutation(DataStore.deleteOption(merge({}, args)));
    }
  }),

  Questionnaire: () => ({
    sections: (questionnaire, args, ctx) =>
      DataStore.getSections(questionnaire.id)
  }),

  Section: () => ({
    pages: (section, args, ctx) => DataStore.getPages(section.id),
    questionnaire: (section, args, ctx) =>
      DataStore.getQuestionnaire(section.questionnaireId)
  }),

  Page: () => ({
    __resolveType: ({ pageType }) => pageType
  }),

  QuestionPage: () => ({
    answers: (page, args, ctx) => DataStore.getAnswers(page.id),
    section: (page, args, ctx) => DataStore.getSection(page.sectionId)
  }),

  Answer: () => ({
    __resolveType: (answer, args, ctx) => answer.__typename
  }),

  BasicAnswer: () => ({
    page: (answer, args, ctx) => DataStore.getPage(answer.questionPageId)
  }),

  MultipleChoiceAnswer: () => ({
    page: (answer, args, ctx) => DataStore.getPage(answer.questionPageId),
    options: (answer, args, ctx) => DataStore.getOptions(answer.id)
  })
};
