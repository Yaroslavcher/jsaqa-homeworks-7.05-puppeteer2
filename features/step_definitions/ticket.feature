Feature: To book tickets
  Scenario: Should book one ticket
    When user clicks on next day and first time, on 7 row and 4 chair and on Забронировать button
    Then user sees opened page with Row / Chair '7/4'

  Scenario: Should book two tickets
    When user clicks on next day and first time, on 7 row and 4 chair and on 7 row and 5 chair and on Забронировать button
    Then user sees opened page with Row / Chair: '7/4, 7/5'

  Scenario: Should not book taken chair
    When user clicks on next day and first time, on 'taken' chair and on Забронировать button
    Then button Забронировать is disabled
