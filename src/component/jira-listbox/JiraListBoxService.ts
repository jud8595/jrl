const axios = require('axios');

export type Ticket = string;

export class JiraListBoxService {

    private tickets: Ticket[];

    constructor() {
        this.tickets = [];
    }

    public getTickets() {
        return this.tickets;
    }

    public filter(filter: string): Ticket[] {
        return this.tickets.filter(ticket => ticket.includes(filter));
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
