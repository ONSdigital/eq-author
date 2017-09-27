import { values, merge, forEach, remove, filter, includes } from "lodash";

class MockDataStore {
  constructor(seedData = {}) {
    this.counter = {
      questionnaire: 0,
      section: 0,
      page: 0,
      answer: 0,
      option: 0
    };

    this.questionnaires = {};
    this.sections = {};
    this.pages = {};
    this.answers = {};
    this.options = {};

    merge(this, seedData);
  }

  getQuestionnaires() {
    return values(this.questionnaires);
  }

  getQuestionnaire(id) {
    return this.questionnaires[id];
  }

  getSection(id) {
    return this.sections[id];
  }

  getPage(id) {
    return this.pages[id];
  }

  getAnswer(id) {
    return this.answers[id];
  }

  getOption(id) {
    return this.options[id];
  }

  createQuestionnaire(questionnaire) {
    const id = (++this.counter.questionnaire).toString();
    this.questionnaires[id] = merge(questionnaire, {
      id,
      sections: [],
      createdAt: new Date().toISOString()
    });

    const defaultSection = this.createSection({
      title: "",
      description: "",
      questionnaireId: questionnaire.id
    });

    this.createPage({
      pageType: "QuestionPage",
      title: "",
      description: "",
      sectionId: defaultSection.id
    });

    return this.questionnaires[id];
  }

  updateQuestionnaire(questionnaire) {
    this.questionnaires[questionnaire.id] = merge(
      this.questionnaires[questionnaire.id],
      questionnaire
    );
    return this.questionnaires[questionnaire.id];
  }

  deleteQuestionnaire(questionnaire) {
    const questionnaireToDelete = this.questionnaires[questionnaire.id];

    forEach(questionnaireToDelete.sections, s => {
      this.deleteSection(s);
    });

    delete this.questionnaires[questionnaire.id];
    return questionnaire;
  }

  createSection(section) {
    const id = (++this.counter.section).toString();
    this.sections[id] = merge(section, { id }, { pages: [] });

    this.getQuestionnaire(section.questionnaireId).sections.push(
      this.sections[id]
    );
    return this.sections[id];
  }

  updateSection(section) {
    this.sections[section.id] = merge(this.sections[section.id], section);
    return this.sections[section.id];
  }

  deleteSection(section) {
    const sectionToDelete = this.sections[section.id];

    forEach(sectionToDelete.pages, p => {
      this.deletePage(p);
    });

    if (sectionToDelete.questionnaireId) {
      remove(this.questionnaires[sectionToDelete.questionnaireId].sections, {
        id: sectionToDelete.id
      });
    }

    delete this.sections[section.id];
    return section;
  }

  createPage(page) {
    const id = (++this.counter.page).toString();
    this.pages[id] = merge(
      page,
      { id },
      { answers: [], __typename: "QuestionPage" }
    );

    this.getSection(page.sectionId).pages.push(this.pages[id]);
    return this.pages[id];
  }

  updatePage(page) {
    this.pages[page.id] = merge(this.pages[page.id], page);
    return this.pages[page.id];
  }

  deletePage(page) {
    const pageToDelete = this.pages[page.id];

    forEach(pageToDelete.answers, a => {
      this.deleteAnswer(a);
    });

    if (pageToDelete.sectionId) {
      remove(this.sections[pageToDelete.sectionId].pages, {
        id: pageToDelete.id
      });
    }

    delete this.pages[page.id];
    return pageToDelete;
  }

  createAnswer(answer) {
    const id = (++this.counter.answer).toString();
    this.answers[id] = merge(
      answer,
      { id, options: [] },
      {
        __typename: includes(["Checkbox", "Radio"], answer.type)
          ? "MultipleChoiceAnswer"
          : "BasicAnswer"
      }
    );

    const answerType = this.answers[id].type;
    if (answerType === "Checkbox" || answerType === "Radio") {
      const defaultOptions = [];
      const defaultOption = {
        answerId: id
      };

      defaultOptions.push(defaultOption);
      if (answerType === "Radio") {
        defaultOptions.push(defaultOption);
      }

      defaultOptions.forEach(it => this.createOption(merge({}, it)));
    }

    this.getPage(answer.questionPageId).answers.push(this.answers[id]);
    return this.answers[id];
  }

  updateAnswer(answer) {
    this.answers[answer.id] = merge(this.answers[answer.id], answer);
    return this.answers[answer.id];
  }

  deleteAnswer(answer) {
    const answerToDelete = this.answers[answer.id];
    if (answerToDelete.questionPageId) {
      remove(this.pages[answerToDelete.questionPageId].answers, {
        id: answerToDelete.id
      });
    }

    delete this.answers[answer.id];
    return answerToDelete;
  }

  createOption(option) {
    const id = (++this.counter.option).toString();
    this.options[id] = merge(option, { id });

    if (option.answerId) {
      this.getAnswer(option.answerId).options.push(this.options[id]);
    }
    return this.options[id];
  }

  updateOption(option) {
    return merge(this.options[option.id], option);
  }

  deleteOption(option) {
    const deletedOption = this.options[option.id];
    if (deletedOption.answerId) {
      remove(this.answers[deletedOption.answerId].options, {
        id: deletedOption.id
      });
    }

    delete this.options[option.id];
    return deletedOption;
  }

  getSections(questionnaireId) {
    return filter(values(this.sections), { questionnaireId: questionnaireId });
  }

  getPages(sectionId) {
    return filter(values(this.sections), { sectionId: sectionId });
  }

  getAnswers(pageId) {
    return filter(values(this.answers), { questionPageId: pageId });
  }

  getOptions(answerId) {
    return filter(values(this.options), { answerId: answerId });
  }
}

export default MockDataStore;
