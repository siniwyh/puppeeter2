Feature: Booking cinema tickets

    Scenario: Should booking a ticket
        Given user is on the main page
        When user chooses day and time of session
        When user selects seat "div:nth-child(4) span:nth-child(7)"
        Then sees the title "Вы выбрали билеты:"