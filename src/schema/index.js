import { schema } from "normalizr";

export const answer = new schema.Entity("answers");

export const question = new schema.Entity("questions", {
  answers: [answer]
});

export const section = new schema.Entity("sections", {
  questions: [question]
});

export const block = new schema.Entity("blocks", {
  sections: [section]
});

export const group = new schema.Entity("groups", {
  blocks: [block]
});

export const questionnaireSchema = new schema.Entity(
  "questionnaire",
  {
    sections: [section],
    questions: [question],
    answers: [answer],
    blocks: [block],
    groups: [group]
  },
  { idAttribute: "survey_id" }
);
