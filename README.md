Notes:
- searchbar: do not allow to type /foo and at the same time be able to give focus to navigate the list box because
  - bring too much complexity regarding component focus
  - cannot use global shortcut like <shift + f> => would be transformed into F
  => allow searchbar to listen for screen event and hide it when done it simplifies focus