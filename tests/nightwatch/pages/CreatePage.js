module.exports = {
  sections: {
    form: {
      selector: "form",
      elements: {
        title: "#title",
        description: "#description",
        navigation: "label[for='navigation']",
        submit: "button[type='submit']"
      },
      commands: [
        {
          submit: function() {
            this.click("@submit");
            return this;
          },

          fill: function({ title, description }) {
            this.setValue("@title", title)
              .setValue("@description", description)
              .click("@navigation");

            return this;
          }
        }
      ]
    }
  }
};
