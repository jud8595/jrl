import {SearchBar} from "~/component/searchbar/SearchBar";
import {JiraListBox} from "~/component/jira-listbox/JiraListBox";
import {JiraTicketDetails} from "~/component/jira-ticket-details/JiraTicketDetails";
import {Ticket} from "~/component/jira-listbox/JiraTicket";

const blessed = require('blessed');
const fs = require('fs');

export class JiraListBoxSearch {

    private jiraListBox;
    private searchBar;
    private jiraTicketDetails;
    private screen;

    constructor(screen: any) {
        this.jiraListBox = new JiraListBox(screen);
        this.jiraListBox.getComponent().focus();
        this.searchBar = new SearchBar(screen);
        this.jiraTicketDetails = new JiraTicketDetails(screen);
        this.jiraTicketDetails.getComponent().hide();
        this.screen = screen;
        this.handleKeyboard();

        this.searchBar.onFilterChange((filter: string) => {
            this.jiraListBox.filter(filter);
        });

        this.jiraListBox.onDetails((ticket: Ticket) => {
            this.jiraTicketDetails.getComponent().setValue(`Details for ticket ${ticket[1]}`);
            this.jiraTicketDetails.getComponent().focus();
            this.jiraTicketDetails.getComponent().show();
        })
    }

    public loadJiraTickets() {
        this.jiraListBox.loadJiraTickets();
    }

    private handleKeyboard() {
        this.jiraListBox.getComponent().on('keypress', (ch: any, key: any) => {
            if (key?.name === 'up' || key?.name === 'down') {
                return;
            }
            const consumed = this.searchBar.keypressed(key.full);
            if (!consumed) {
                // shortcut
            }
        });
    }
}
