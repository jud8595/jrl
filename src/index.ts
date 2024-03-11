import {JiraListBoxSearch} from "~/component/jira-listbox-searchbar/JiraListBoxSearch";
import {KeyboardApplicationHandler} from "~/app/KeyboardApplicationHandler";

const blessed = require('blessed');

const screen = blessed.screen({
    smartCSR: true
});

const jiraListBoxSearch = new JiraListBoxSearch(screen);
jiraListBoxSearch.loadJiraTickets();
new KeyboardApplicationHandler(screen);


screen.render();

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
});*/


// Refresh the list every 30 seconds
//setInterval(updateList, 30000);
// Initialize the list
//updateList();
// Event handler for search box
/*
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
//showMenu();
 */

