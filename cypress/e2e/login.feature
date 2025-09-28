@ui
Feature: Login functionality

    @smoke
    Scenario: Successful login
        Given I open the login page
        When I login with "standard_user" and "secret_sauce"
        Then I should see the products page

    @regression
    Scenario Outline: Login attempt
        Given I open the login page
        When I login with "<username>" and "<password>"
        Then I should see "<result>"

        Examples:
            | username        | password     | result                                                    |
            | standard_user   | secret_sauce | Products                                                  |
            | locked_out_user | wrong_pass   | Epic sadface: Username and password do not match any user |
    
    @regression
    Scenario: Login with multiple test data
        Given I open the login page
        When I login with below credentials

        | username          | password 
        | standard_user     | secret_sauce   
        | Nathan            | Cork     
        Then I should see the products page
