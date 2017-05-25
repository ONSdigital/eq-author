Feature: Author application is alive
  As an eQ Author
  I should be able to browse to the Author application
  So that I can author a new survey

Scenario: Homepage is responding
  Given I navigate to "http://localhost:3000"
  Then the page title should be "This should fail"
