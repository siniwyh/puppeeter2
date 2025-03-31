Feature: Booking cinema tickets

    Scenario: Should booking a ticket
        Given user is on the main page
        When user chooses day and time of session
        When user selects seat "div:nth-child(5) span:nth-child(7)"
        Then sees the title "Вы выбрали билеты:"

    Scenario: Should booking several tickets
        Given user is on the main page
        When user chooses day and time of session
        When user selects seat "div:nth-child(5) span:nth-child(7)" and seat "div:nth-child(5) span:nth-child(5)"
        Then sees the title "Вы выбрали билеты:"

    Scenario: Occupied seat cannot be reserved
        Given user is on the main page
        When user chooses day and time of session
        When user selects seat "div:nth-child(6) span:nth-child(9)"
        When user buys ticket
        When user returns to the previous page
        When user chooses day and time of session
        When user selects seat "div:nth-child(6) span:nth-child(9)"
        Then sees occupied seats cannot be reserved