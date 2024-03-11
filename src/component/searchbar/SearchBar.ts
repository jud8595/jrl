import {SearchBarService} from "~/component/searchbar/SearchBarService";

const blessed = require('blessed');
const axios = require('axios');
const fs = require('fs');

export class SearchBar {

    private searchBar;
    private searchBarService;
    private screen;

    constructor(screen: any) {
        this.searchBar = this.createSearchBar(screen);
        this.searchBarService = new SearchBarService();
        this.screen = screen;
        this.handleKeyboard();
    }

    public onFilterChange(fn: (filter: string) => void) {
        this.searchBarService.onFilterChange(fn);
    }

    public getComponent() {
        return this.searchBar;
    }

    private createSearchBar(screen: any) {
        return blessed.textbox({
            parent: screen,
            top: '0',
            left: '0',
            width: '100%',
            height: 'shrink',
            inputOnFocus: true,
            border: 'line',
            content: 'menu',
            keys: true,
            //mouse: true,
            // style: {
            //     fg: 'white',
            //     bg: 'blue'
            // }
        });
    }

    private handleKeyboard() {
/*
        this.screen.key(':', () => {
            fs.appendFileSync('debug.log', 'searchbar1 : \n');
            this.searchBar.emit('keypress', ':');
            //this.searchBar.getComponent().setContent(this.searchBar.getComponent().content + ':')
            this.searchBarService.onKeypress(':', this.searchBar.getValue());
            this.searchBar.focus();
            this.screen.render();
        });

        this.screen.key('/', () => {
            fs.appendFileSync('debug.log', 'searchbar1 / \n');
            this.searchBar.emit('keypress', '/');
            //this.searchBar.getComponent().setContent(this.searchBar.getComponent().content + ':')
            this.searchBarService.onKeypress(':', this.searchBar.getValue());
            this.searchBar.focus();
            this.screen.render();
        });
*/
        this.screen.on('keypress', (ch: any, key: any) => {
            fs.writeFileSync('debug.log', 'searchbar keypress ' + JSON.stringify({ch: ch, key: key}) + '\n');
            fs.writeFileSync('debug.log', '\n');
            this.searchBarService.onKeypress(key.full, this.searchBar.getValue());
            // Check if the pressed key is the escape key
            if (key?.full === ':' || key?.full === '/') {
                // Clear the input text of the textbox
                //this.searchBar.clearValue();
                // Re-focus on the textbox
                this.searchBar.show();
                this.searchBar.focus();
                this.screen.render();
            }
            if (key?.full === 'escape') {
                this.searchBar.clearValue();
                //this.searchBar.hide();
                //this.searchBar.rewindFocus();
                this.screen.render();
            }
        });
        /*this.screen.on('keypress', (ch: any, key: any) => {
            //this.searchBar.add . setContent(this.searchBar.content + ch);
            if (key == '/' || key == ':') {
                this.searchBar.focus();
                //this.searchBar.emit('keypress', ch, key);
                this.screen.render();
                fs.writeFileSync('debug.log', 'searchbar /: pressed!')
            }
        });*/

        /*this.searchBar.getComponent().on('keypress', (ch: any, key: any) => {
            this.searchBarService.onKeypress(ch);
        });*/
    }
/*
    private initHandler(searchBar, screen) {
        searchBar.on('keypress', (ch, key) => {
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
                searchBar();
                searchBar.focus();
                screen.render();
            }
        });
    }*/
}

/*

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
async function updateList() {
    const issues = await fetchJiraIssues();
    list.setItems(issues);
    screen.render();
}
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
// Function to display a menu
function showMenu() {
    const menu = blessed.box({
        parent: screen,
        top: 'center',
        left: 'center',
        width: '50%',
        height: '50%',
        border: 'line',
        label: 'Menu',
        keys: true,
        vi: true,
        mouse: true,
        scrollbar: {
            ch: ' ',
            track: {
                bg: 'cyan'
            },
            style: {
                inverse: true
            }
        },
        content: 'Menu content goes here...'
    });
    // Close menu on Escape or q
    screen.onceKey(['escape', 'q'], function() {
        menu.destroy();
        list.focus();
        screen.render();
    });
    screen.render();
}
// Quit on Control-C
screen.key(['C-c'], function(ch, key) {
    return process.exit(0);
});
//showMenu();
//searchBox.focus();
list.focus();
// Render the screen
screen.render();

 */