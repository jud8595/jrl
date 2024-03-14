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
            if (key?.full === '/' || key?.full === ':') {
                fs.writeFileSync('debug.log', `[jira list box search] pressing ${key} \n`);
                //this.searchBar.getComponent().setValue(key.full); // meilleure facon
                this.searchBar.keypressed(key.full);
                this.searchBar.getComponent().show();
                this.searchBar.getComponent().focus();
                this.screen.render();
            }
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
