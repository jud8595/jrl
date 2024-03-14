import {SearchBarService} from "~/component/searchbar/SearchBarService";

const blessed = require('blessed');
const axios = require('axios');
const fs = require('fs');

export class SearchBar {

    private forComponent;
    private searchBar;
    private searchBarService;
    private screen;

    constructor(screen: any, forComponent: any) {
        this.forComponent = forComponent;
        this.searchBar = this.createSearchBar(screen);
        this.searchBar.hide();
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

    public keypressed(key: string): boolean {
        return this.searchBarService.onKeypress(key, this.searchBar.getValue());
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
        this.searchBar.on('submit', () => {
            this.searchBar.hide();
            this.searchBar.setValue(this.searchBarService.getText());
            this.searchBar.render();
            this.screen.render();
        });

        this.searchBar.on('cancel', () => {
            fs.writeFileSync('debug.log', `[searchBar] event cancel \n`);
            this.searchBar.hide();
            this.searchBar.clearValue();
            this.searchBarService.onKeypress('', this.searchBar.getValue());
            this.searchBar.render();
            this.screen.render();
        })

        this.searchBar.on('keypress', (ch: any, key: any) => {
            setTimeout(() => {
                //this.searchBarService.textChanged(this.searchBar.getValue());
                if (this.searchBar.focused) {
                    this.searchBarService.onKeypress(key.full, this.searchBar.getValue());
                }

                //this.searchBar.setValue(this.searchBarService.getText());
                this.searchBar.render();
                this.screen.render();
            }, 10);
        });
/*
        this.searchBar.on('keypress', (ch: any, key: any) => {
            //this.searchBar.render();
            //this.screen.render();
            setTimeout(() => {
                //this.searchBarService.textChanged(this.searchBar.getValue());
                this.searchBarService.onKeypress(key.full, this.searchBar.getValue());
                if (this.searchBarService.getStatus() === 'Edition') {
                    this.searchBar.show();
                    this.searchBar.focus();
                } else {
                    this.searchBar.hide();
                }
                fs.writeFileSync('debug.log', `[searchBar] setting value(0) ${this.searchBarService.getText()} \n`);
                this.searchBar.setValue(this.searchBarService.getText());
                this.searchBar.render();
                this.screen.render();
            }, 10);
        });
*/
        // 1- on équipe une list box d'une search bar



        // si la searchbar reste tout le temps visible alors '/' est append
        // si la searchbar se cache, alors '/' l'affiche
        // 1- soit cette logique fait partie du service
        // 2- soit non
        // la business logic de la searchbar: elle contient que /des ou :zer
        // d'un point de vue extern, si elle contient du text on l'affiche
        // attention: si on a decide de masquer apres return, comment on affiche a nouveau ?
        // j'ai l'impression que ce scenario n'est pas possible
        // a la fois S gère si on affiche ou pas la searchbar (sans savoir comment elle fonctionne), juste
        // savoir que valider masque la S. Comment on la réactive alors ? on ne peut pas
        // soit il faut connaître les triggers pour reactiver soit le SS contient la logique d'affichage
        // sol1: SS doit avoir un mode d'edition et un mode de non-edition/affichage/status_validé
        //       donc si mode d edition on append '/', sinon on ca redeclenche le mode edition
        //       donc afficher S si mode edition uniquement sinon on masque


        /*this.searchBar.on('keypress', (ch: any, key: any) => {
            fs.writeFileSync('debug.log', '[searchbar] keypress ' + JSON.stringify({ch: ch, key: key}) + '\n');
            fs.writeFileSync('debug.log', '\n');
            this.searchBarService.onKeypress(key.full, this.searchBar.getValue());
        });
        this.screen.on('keypress', (ch: any, key: any) => {
            fs.writeFileSync('debug.log', '[searchbar] screen keypress ' + JSON.stringify({ch: ch, key: key}) + '\n');
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
        });*/
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