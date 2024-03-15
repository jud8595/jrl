import {SearchBar} from "~/component/searchbar/SearchBar";
import {JiraListBox} from "~/component/jira-listbox/JiraListBox";
import {JiraTicketDetails} from "~/component/jira-ticket-details/JiraTicketDetails";

const blessed = require('blessed');
const fs = require('fs');

export class JiraListBoxSearch {

    private jiraListBox;
    private searchBar;
    private jiraTicketDetails;
    private screen;

    constructor(screen: any) {
        this.jiraListBox = new JiraListBox(screen);
        this.searchBar = new SearchBar(screen, this.jiraListBox);
        this.jiraTicketDetails = new JiraTicketDetails(screen);
        this.jiraTicketDetails.getComponent().hide();
        this.screen = screen;
        this.handleKeyboard();

        this.searchBar.onFilterChange((filter: string) => {
            this.jiraListBox.filter(filter);
        });

        this.jiraListBox.subscribeOnDetails((ticket) => {
            fs.appendFileSync('debug.log', `[jiralistboxsearch] onDetails with ${ticket} \n`);
            this.jiraTicketDetails.getComponent().setValue(`Details for ticket ${ticket}`);
            this.jiraTicketDetails.getComponent().focus();
            this.jiraTicketDetails.getComponent().show();
        })
    }

    public loadJiraTickets() {
        this.jiraListBox.loadJiraTickets();
    }

    private handleKeyboard() {
        this.jiraListBox.getComponent().on('keypress', (ch: any, key: any) => {
            /*fs.writeFileSync('debug.log', `**** from forCOmponznr  \n`);
            if (this.screen.focused) {
                fs.writeFileSync('debug.log', `**** screen focused  ${this.screen.focused === this.searchBar}  \n`);
            }*/
            fs.writeFileSync('debug.log', `[jira list box search] val= ${this.searchBar.getValue()} \n`);
            //if (key?.full === '/' || key?.full === ':') {
                fs.writeFileSync('debug.log', `[jira list box search] pressing ${JSON.stringify(key)} \n`);
                //this.searchBar.getComponent().setValue(key.full); // meilleure facon
                //this.searchBar.keypressed(key.full);
                //const result = this.searchBar.setValue(this.searchBar.getValue() || key.full);
                const consumed = this.searchBar.keypressed(key.full);
                if (consumed) {
                    /*this.searchBar.getComponent().show();
                    this.searchBar.getComponent().focus();
                    this.screen.render();*/
                } else {
                    // shortcut
                }
            //}

            // if (key?.full === 'escape') {
            //     this.searchBar.clearValue();
            // }

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

            /*
            const consumed = this.searchBar.keypressed(key);
            this.searchBarService.onKeypress(key.full, this.searchBar.getValue());
            if (this.searchBarService.getStatus() === 'Edition') {
                this.searchBar.show();
                this.searchBar.focus();
            } else {
                this.searchBar.hide();
            }
            fs.writeFileSync('debug.log', `[searchBar] setting value (1) ${this.searchBarService.getText()} \n`);
            this.searchBar.setValue(this.searchBarService.getText());
            this.searchBar.render();
            this.screen.render();
             */
        });
    }
}
