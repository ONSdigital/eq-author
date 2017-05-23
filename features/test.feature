Feature: Build check
  I should be able to go to a website
  and check no errors are logged

Scenario: Get the title of webpage
  Given I go to the website "http://localhost:3000/build"
  Then no errors are logged
