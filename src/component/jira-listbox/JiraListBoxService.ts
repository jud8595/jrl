import {Ticket} from "~/component/jira-listbox/JiraTicket";
import fs from "fs";

const axios = require('axios');


export class JiraListBoxService {

    private tickets: Ticket[];
    private onDetails: (ticket: Ticket) => void;

    constructor() {
        this.tickets = [];
    }

    public subscribeOnDetails(fn: (ticket: Ticket) => void) {
        fs.appendFileSync('debug.log', '[jiralistbox service] register onDetails \n');
        this.onDetails = fn;
    }

    public showDetails(index: number) {
        if (this.onDetails) {
            this.onDetails(this.tickets[index]);
        }
    }

    public getTickets() {
        return this.tickets;
    }

    public filter(filter: string): Ticket[] {
        return this.tickets.filter(ticket => ticket.includes(filter));
    }

    public details(ticket: Ticket) {

    }

    public async fetchJiraTickets() {
        try {
            //const response = await axios.get('https://your-jira-instance.atlassian.net/rest/api/latest/search?jql=YOUR_JQL_QUERY');
            //return response.data.issues.map(issue => issue.key + ' - ' + issue.fields.summary);
            this.tickets = ['foo', 'bar', 'baz'];
        } catch (error) {
            console.error('Error fetching JIRA issues:', error);
        }
    }
}
