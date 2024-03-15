import {SearchBarService} from "~/component/searchbar/SearchBarService";

const blessed = require('blessed');
const fs = require('fs');

export class SearchBar {

    private searchBar;
    private searchBarService;
    private screen;
    private filterChangeCallback: (filter: string) => void;

    constructor(screen: any) {
        this.searchBar = this.createSearchBar(screen);
        this.searchBar.hide();
        this.searchBarService = new SearchBarService();
        this.screen = screen;
        this.handleKeyboard();
    }

    public onFilterChange(callback: (filter: string) => void) {
        this.filterChangeCallback = callback;
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

    public getValue() {
        return this.searchBar.getValue();
    }

    public keypressed(key: string) {
        let consumed = false;
        if (!this.searchBar.focused) { // or not visible
            if (key === '/') {
                if (!this.searchBar.getValue()) {
                    this.searchBar.setValue('/');
                }
                this.searchBar.focus();
                this.searchBar.show();
                consumed = true;
            } else if (key === ':') {
                this.searchBar.setValue(':');
                this.searchBar.focus();
                this.searchBar.show();
                consumed = true;
            }
        }

        if (key === 'escape') {
            this.searchBar.setValue('');
            this.searchBar.hide();
            consumed = true;
        }

        if (this.filterChangeCallback) {
            this.filterChangeCallback(this.searchBar.getValue() ? this.searchBar.getValue().slice(1) : '');
        }

        this.searchBar.render();
        this.screen.render();

        return consumed;
    }

    private handleKeyboard() {
        this.searchBar.on('submit', () => {
            this.searchBar.hide();
            this.searchBar.render();
            this.screen.render();
        });

        this.searchBar.on('cancel', () => {
            this.searchBar.hide();
            this.searchBar.clearValue();
            this.searchBar.render();
            this.screen.render();
        })

        this.searchBar.on('keypress', (ch: any, key: any) => {
            setTimeout(() => {
                this.keypressed(key?.full);
            }, 10); // hack: so that .getValue() contains the key pressed
        });
    }
}
