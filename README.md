Notes:
- searchbar: do not allow to type /foo and at the same time be able to give focus to navigate the list box because
  - bring too much complexity regarding component focus
  - cannot use global shortcut like <shift + f> => would be transformed into F
  => allow searchbar to listen for screen event and hide it when done it simplifies focus
- error1: try to ignore focus on component and compensate with onKeypress => as much as possible use focus

Doc:
https://www.npmjs.com/package/blessed/v/0.1.4#textbox-from-textarea

Saving comment:
JiraListBoxSearch:
// rmq: j'ai quand même envie d'envoyer l'event de keypress à searchbar (pas forcément par emit
// pour au moins etre en synchrone. Pk ? parce que c'est pas vraiment à ce comp de savoir
// que / ou : trigger la search bar.
// cas du escape: ca a une action sur la searchbar sans qu'elle soit visible!
// donc d'un point de vue de ce comp, on ne peut pas savoir si l'event a été consumed
// donc il faut que keypress dise si l'event a été consumed.
// sol1: keypressed qui renvoie si consumed ou pas
// sol2: on garde / : escape dans ce comp
// sol3: on gère l'affichage de la searchbar ici (duplication mais de wrong abstraction)
// cf conversation ce comp connaît les fonctionnalités de ses children vs aggregateur avec peu de connaissances