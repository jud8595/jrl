const blessed = require('blessed');
const fs = require('fs');

export class KeyboardApplicationHandler {

    constructor(screen: any) {
        screen.on('keypress', (ch: any, key: any) => {
            //fs.writeFileSync('debug.log', '[KeyboardApplicationHandler] keypress  ' + JSON.stringify({ch: ch, key: key}) + '\n');
        });

        // Quit on Control-C
        screen.key(['C-c'], function(ch: any, key: any) {
            return process.exit(0);
        });
    }

}
