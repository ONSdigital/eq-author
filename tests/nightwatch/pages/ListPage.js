module.exports = {
  elements: {
    createButton: "#btn-create-questionnaire"
  },
  commands: [
    {
      clickCreate: function() {
        this.click("@createButton");
      }
    }
  ]
};
