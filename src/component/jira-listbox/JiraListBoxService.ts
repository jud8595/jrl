import {Ticket} from "~/component/jira-listbox/JiraTicket";
import fs from "fs";

const axios = require('axios');

export const HEADERS = [ 'Ticket', 'Description', 'Team' ];

export class JiraListBoxService {

    private tickets: Ticket[];
    private onDetailsCallback: (ticket: Ticket) => void;

    constructor() {
        this.tickets = [];
    }

    public onDetails(callback: (ticket: Ticket) => void) {
        this.onDetailsCallback = callback;
    }

    public showDetails(item: Ticket) {
        if (this.onDetailsCallback) {
            this.onDetailsCallback(item);
        }
    }

    public getTickets() {
        return this.tickets;
    }

    public filter(filter: string): Ticket[] {
        return this.tickets.slice(1).filter(ticket => {
            //return Object.values(ticket).filter(value => value.includes(filter)).length > 0
            return ticket.filter(field => field.includes(filter)).length > 0
        });
    }


    public async fetchJiraTickets() {
        try {
            //const response = await axios.get('https://your-jira-instance.atlassian.net/rest/api/latest/search?jql=YOUR_JQL_QUERY');
            //return response.data.issues.map(issue => issue.key + ' - ' + issue.fields.summary);
            // this.tickets = [
            //     { id: 'IM-1', description: 'foo' },
            //     { id: 'IM-1', description: 'bar' },
            //     { id: 'IM-1', description: 'baz' }];
            this.tickets = [
                HEADERS,
                [ 'IM-1', 'foo', 'A' ],
                [ 'IM-2', 'bar', 'B' ],
                [ 'IM-3', 'baz', 'C' ]];
        } catch (error) {
            console.error('Error fetching JIRA issues:', error);
        }
    }
}
