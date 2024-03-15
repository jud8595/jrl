import fs from "fs";

const blessed = require('blessed');

export class JiraTicketDetails {

    private textarea: any;
    private screen: any;

    constructor(screen: any) {
        this.screen = screen;
        this.textarea = this.createTextArea(screen);
        this.handleKeyboard();
    }

    public handleKeyboard() {
        this.textarea.key('escape', () => {
            this.textarea.hide();
            this.screen.render();
        });
    }

    private createTextArea(screen: any) {
        return blessed.textbox({
            parent: screen,
            top: 'center',
            left: 'center',
            width: '100%',
            height: '50%',
            border: 'line',
            label: 'JIRA ticket details',
            keys: true,
            //vi: true,
            mouse: true,
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
            content: 'Loading...' // initial message
        });
    }

    public getComponent() {
        return this.textarea;
    }

}

