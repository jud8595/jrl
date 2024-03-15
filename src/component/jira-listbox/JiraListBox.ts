import {HEADERS, JiraListBoxService} from "~/component/jira-listbox/JiraListBoxService";
import fs from "fs";
import {Ticket} from "~/component/jira-listbox/JiraTicket";

const blessed = require('blessed');

export class JiraListBox {

    private jiraListBoxService: JiraListBoxService;
    private list: any;
    private screen: any;
    private currentFilter: any;

    constructor(screen: any) {
        this.jiraListBoxService = new JiraListBoxService();
        this.screen = screen;
        this.list = this.createListBox(screen);
        this.handleKeyboard();
    }

    private createListBox(screen: any) {
        return blessed.listtable({
            parent: screen,
            align: 'left',
            top: 'center',
            left: 'center',
            width: '100%',
            height: '50%',
            border: 'line',
            label: 'JIRA Issues',
            keys: true,
            //vi: true,
            mouse: true,
            /*style: {
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
            },*/
            //items: ['Loading...'] // Display a loading message initially
            noCellBorders: true,
            style: {
                //width: ['2%', '2%'], // a priori pas de configuration pour les cell width
                // a la main ? possible mais trop de travail
                selected: {
                    fg: 'white',
                    bg: 'blue',
                },
                //border: { fg: 'blue' },
                header: { fg: 'white', bold: true },
                cell: { fg: 'white', selected: {
                        fg: 'white',
                        bg: 'blue',
                    } }
            },
            data: [
                HEADERS,
            ]
        });
    }

    public getComponent() {
        return this.list;
    }

    public onDetails(callback: (ticket: Ticket) => void) {
        this.jiraListBoxService.onDetails(callback);
    }

    public handleKeyboard() {
        this.list.on('keypress', (ch: any, key: any) => {
            if (key?.full === 'enter') {
                const selectedIndex = this.list.selected - 1;
                const item = this.currentFilter[selectedIndex];
                fs.writeFileSync('debug.log', `pressing ${JSON.stringify(item)} \n`);
                this.jiraListBoxService.showDetails(item);
            }
        });
    }

    public async loadJiraTickets() {
        await this.jiraListBoxService.fetchJiraTickets();
        const issues = this.jiraListBoxService.getTickets();
        this.currentFilter = issues.slice(1);
        this.list.setRows(issues);
        this.screen.render();
    }

    public filter(filter: string) {
        this.currentFilter = this.jiraListBoxService.filter(filter);
        this.list.setData([HEADERS, ...this.currentFilter]);
        this.screen.render();
    }

}

