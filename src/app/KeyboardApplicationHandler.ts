const blessed = require('blessed');
const fs = require('fs');

export class KeyboardApplicationHandler {

    constructor(screen: any) {
        screen.on('keypress', (ch: any, key: any) => {
            fs.writeFileSync('debug.log', 'global handler ' + ch || '' + key || '' + '\n');
            /*if (key.name === 'up' || (key.name === 'k' && key.ctrl === false)) {
                //this.jiraListBox.getComponent().up(1);
            } else if (key.name === 'down' || (key.name === 'j' && key.ctrl === false)) {
                //this.jiraListBox.getComponent().down(1);
            } else if (key.name === '/' || key.name === ':') {
                //this.searchBar.getComponent().focus();
            }*/
            //this.screen.render();
        });

        // Quit on Control-C
        screen.key(['C-c'], function(ch: any, key: any) {
            return process.exit(0);
        });
    }

}
