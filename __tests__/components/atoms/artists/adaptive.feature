Feature: Adaptive Theme

Scenario: Is in light theme
    Given Theme is light
    When Artist's title appear
    Then it should be in dark text

Scenario: Is in dark theme
    Given Theme is dark
    When Artist's title appear
    Then it should be in white text