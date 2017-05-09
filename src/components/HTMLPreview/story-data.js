export default {
  survey: {
    data_version: '0.0.1',
    description: 'Quarterly Business Survey',
    groups: {
      'number-of-employees': {
        blocks: [
          'introduction',
          'number-of-employees-block',
          'summary'
        ],
        id: 'number-of-employees',
        title: 'Quarterly Business Survey'
      }
    },
    legal_basis: 'StatisticsOfTradeAct',
    mime_type: 'application/json/ons/eq',
    questionnaire_id: '0001',
    schema_version: '0.0.1',
    id: '139',
    theme: 'default',
    title: 'Quarterly Business Survey',
    blocks: {
      introduction: {
        type: 'Introduction',
        id: 'introduction',
        information_to_provide: [
          'Employee numbers'
        ]
      },
      'number-of-employees-block': {
        id: 'number-of-employees-block',
        sections: [
          'number-of-employees-section'
        ],
        type: 'Questionnaire'
      },
      summary: {
        type: 'Summary',
        id: 'summary'
      }
    },
    sections: {
      'number-of-employees-section': {
        description: 'Section description',
        id: 'number-of-employees-section',
        title: 'Quarterly Business Survey',
        questions: [
          'number-of-employees-question'
        ]
      }
    },
    questions: {
      'number-of-employees-question': {
        answers: [
          'number-of-employees-male-more-30-hours',
          'number-of-employees-male-less-30-hours',
          'number-of-employees-female-more-30-hours',
          'number-of-employees-female-less-30-hours',
          'number-of-employees-total'
        ],
        description: 'This is the question description',
        guidance: [
          {
            description: '',
            list: [
              'all workers paid directly from {{respondent.ru_name}}’s payroll(s)',
              'those temporarily absent but still being paid, for example on maternity leave'
            ],
            title: 'Include:'
          },
          {
            description: '',
            list: [
              'agency workers paid directly from the agency payroll',
              'voluntary workers',
              'former employees only receiving a pension',
              'self-employed workers',
              'working owners who are not paid via PAYE'
            ],
            title: 'Exclude:'
          }
        ],
        id: 'number-of-employees-question',
        title: 'On {{exercise.start_date|format_date}} what was the number of employees for {{respondent.ru_name}}?',
        displayName: 'No. of employees',
        type: 'General',
        label: 'This is the question label'
      }
    },
    answers: {
      'number-of-employees-male-more-30-hours': {
        description: 'This is the label description',
        id: 'number-of-employees-male-more-30-hours',
        label: 'Number of male employees working more than 30 hours per week',
        displayName: 'Number of male employees working more than 50 hours per week',
        mandatory: false,
        q_code: '51',
        type: 'PositiveInteger'
      },
      'number-of-employees-male-less-30-hours': {
        description: '',
        id: 'number-of-employees-male-less-30-hours',
        label: 'Number of male employees working 30 hours or less per week',
        displayName: 'Number of male employees working 30 hours or less per week',
        mandatory: false,
        q_code: '52',
        type: 'PositiveInteger'
      },
      'number-of-employees-female-more-30-hours': {
        description: '',
        id: 'number-of-employees-female-more-30-hours',
        label: 'Number of female employees working more than 30 hours per week',
        displayName: 'Number of female employees working more than 30 hours per week',
        mandatory: false,
        q_code: '53',
        type: 'PositiveInteger'
      },
      'number-of-employees-female-less-30-hours': {
        description: '',
        id: 'number-of-employees-female-less-30-hours',
        label: 'Number of female employees working 30 hours or less per week',
        displayName: 'Number of female employees working 30 hours or less per week',
        mandatory: false,
        q_code: '54',
        type: 'PositiveInteger'
      },
      'number-of-employees-total': {
        description: '',
        id: 'number-of-employees-total',
        label: 'Total number of employees',
        displayName: 'Total number of employees',
        mandatory: false,
        q_code: '50',
        type: 'PositiveInteger'
      }
    }
  }
}
