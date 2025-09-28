@api
Feature: API testing
    As a QA engineer
    I want to validate GET and POST APIs
    So that I can ensure the backend works correctly

    Scenario: GET user details
        When I send a GET request to "/users/1"
        Then the response status should be 200
        And the response body should have "data.id" equal to 1

    Scenario: POST create user
        When I send a POST request to "/users" with body:
            """
            {
                "name": "John Doe",
                "job": "QA Engineer"
            }
            """
        Then the response status should be 201
        And the response body should have "name" equal to "John Doe"
