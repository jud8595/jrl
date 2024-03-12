import {SearchBar} from "~/component/searchbar/SearchBar";
import {JiraListBox} from "~/component/jira-listbox/JiraListBox";

const blessed = require('blessed');
const fs = require('fs');

export class JiraListBoxSearch {

    private jiraListBox;
    private searchBar;
    private screen;

    constructor(screen: any) {
        this.jiraListBox = new JiraListBox(screen);
        this.searchBar = new SearchBar(screen);
        this.screen = screen;
        this.handleKeyboard();

        this.searchBar.onFilterChange((filter: string) => {
            this.jiraListBox.filter(filter);
        });
    }

    public loadJiraTickets() {
        this.jiraListBox.loadJiraTickets();
    }

    private handleKeyboard() {
        this.screen.key('tab', () => {
            fs.appendFileSync('debug.log', '[JiraListBoxSearch] called tab \n');
            this.searchBar.getComponent().focus();
            this.screen.render();
        });
        /*
        this.screen.key(':', () => {
            fs.appendFileSync('debug.log', 'called : \n');
            //this.searchBar.getComponent().emit('keypress', ':');
            //this.searchBar.getComponent().setContent(this.searchBar.getComponent().content + ':')
            this.searchBar.getComponent().focus();
            this.screen.render();

        });
        this.screen.key('/', () => {
            fs.appendFileSync('debug.log', 'called / \n');
            this.searchBar.getComponent().focus();
            this.screen.render();
        });*/
        /*this.screen.key('up', () =>
        this.screen.getComponent().on('keypress', (ch: any, key: any) => {
            if (key.name === 'up' || (key.name === 'k' && key.ctrl === false)) {
                this.jiraListBox.getComponent().up(1);
            } else if (key.name === 'down' || (key.name === 'j' && key.ctrl === false)) {
                this.jiraListBox.getComponent().down(1);
            } else if (key.name === '/' || key.name === ':') {
                this.searchBar.getComponent().focus();
            }
            this.screen.render();
        });*/
    }
}

/*

searchBox.on('keypress', (ch, key) => {
    if (key.name === 'up' || (key.name === 'k' && key.ctrl === false)) {
        // Move selection up
        list.up(1);
        screen.render();
    } else if (key.name === 'down' || (key.name === 'j' && key.ctrl === false)) {
        // Move selection down
        list.down(1);
        screen.render();
    } else if (key.name === '/' || key.name === ':') {
        // Move selection down
        searchBox();
        searchBox.focus();
        screen.render();
    }
});

// Event listener for key press events
list.on('keypress', (ch, key) => {
    if (key.name === 'up' || (key.name === 'k' && key.ctrl === false)) {
        // Move selection up
        list.up(1);
        screen.render();
    } else if (key.name === 'down' || (key.name === 'j' && key.ctrl === false)) {
        // Move selection down
        list.down(1);
        screen.render();
    } else if (key.name === '/' || key.name === ':') {
        // Move selection down
        searchBox();
        searchBox.focus();
        screen.render();
    }
});

// Function to update the list with JIRA issues

// Refresh the list every 30 seconds
//setInterval(updateList, 30000);
// Initialize the list
updateList();
// Event handler for search box
searchBox.on('submit', function(text) {
    if (text === ':menu') {
        // Display a menu
        showMenu();
    }
});

*/
