import { JiraListBoxService } from "~/component/jira-listbox/JiraListBoxService";
import fs from "fs";
import {Ticket} from "~/component/jira-listbox/JiraTicket";

const blessed = require('blessed');

export class JiraListBox {

    private jiraListBoxService: JiraListBoxService;
    private list: any;
    private screen: any;

    constructor(screen: any) {
        this.jiraListBoxService = new JiraListBoxService();
        this.screen = screen;
        this.list = this.createListBox(screen);
        this.registerEvents();
    }

    private createListBox(screen: any) {
        return blessed.list({
            parent: screen,
            top: 'center',
            left: 'center',
            width: '100%',
            height: '50%',
            border: 'line',
            label: 'JIRA Issues',
            keys: true,
            //vi: true,
            //mouse: true,
            style: {
                selected: {
                    fg: 'white',
                    bg: 'blue',
                }
            },
            scrollbar: {
                ch: ' ',
                track: {
                    bg: 'cyan'
                },
                style: {
                    inverse: true
                }
            },
            items: ['Loading...'] // Display a loading message initially
        });
    }

    public getComponent() {
        return this.list;
    }

    public subscribeOnDetails(fn: (ticket: Ticket) => void) {
        this.jiraListBoxService.subscribeOnDetails(fn);
    }

    public registerEvents() {
        //this.screen.key('enter', () => {
        this.list.on('keypress', (ch: any, key: any) => {
            if (key?.full === 'enter') {
                // Get the index of the selected item
                const selectedIndex = this.list.selected;
                const item = this.list.getItem(selectedIndex).getContent();

                fs.appendFileSync('debug.log', `[jiralistbox] onEnter index=${selectedIndex} and ${item} \n`);
                this.jiraListBoxService.showDetails(item);
            }
        });
    }

    public async loadJiraTickets() {
        await this.jiraListBoxService.fetchJiraTickets();
        const issues = this.jiraListBoxService.getTickets();
        this.list.setItems(issues);
        this.screen.render();
    }

    public filter(filter: string) {
        const issues = this.jiraListBoxService.filter(filter);
        this.list.setItems(issues);
        this.screen.render();
    }


}

