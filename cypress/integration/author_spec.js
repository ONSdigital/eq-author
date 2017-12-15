describe("eq-author", () => {
  it("can create a questionnaire", () => {
    cy.visit("http://localhost:3000");
    cy.get("#btn-create-questionnaire").click();

    cy.get("#title").type("title");
    cy.get("#description").type("description");
    cy.get("#theme").select("default");
    cy.get("#legalBasis").select("StatisticsOfTradeAct");
    cy.get("label[for='navigation']").click();
    cy
      .get("button")
      .contains("Create")
      .click();

    cy.url().should("match", /questionnaire\/1\/design\/1\/1/);
  });

  it("can create a new page", () => {
    cy.get("#btn-add-page").click();
    cy.url().should("match", /questionnaire\/1\/design\/1\/2/);
  });

  it("can create a new section", () => {
    cy
      .get("#questionnaire-nav")
      .contains("Create new section")
      .click();
    cy.url().should("match", /questionnaire\/1\/design\/2\/3/);
  });

  it("can delete a page", () => {
    cy
      .get("#questionnaire-nav [aria-label='Delete page']")
      .first()
      .click();
  });

  it("can delete a section", () => {
    cy
      .get("#questionnaire-nav [aria-label='Delete section']")
      .first()
      .click();
  });

  it("can edit section title", () => {
    cy
      .get("#section-editor [aria-label='title']")
      .click()
      .type("hello")
      .blur();

    cy.get("#questionnaire-nav").contains("hello");
  });
});

export {};
