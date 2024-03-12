import fs from "fs";

const axios = require('axios');

export type Mode = 'Filter' | 'Action'
export type Status = 'Edition' | 'Display'

export class SearchBarService {

    private text: string | null = null;
    private mode: Mode | null = null;
    private status: Status = 'Display';
    private filter: string | null = null;
    private action: string | null = null;
    private notifyFilterChange: (filter: string) => void;

    public getText() {
        return this.text;
    }

    public getStatus() {
        return this.status;
    }

    public textChanged(text: string) {
         this.text = text;
        fs.appendFileSync('debug.log', `[searchbar service] text changed with ${this.text} and mode=${this.mode} \n`);
         if (this.text?.startsWith('/')) {
             if (this.notifyFilterChange) {
                 this.notifyFilterChange(this.text.slice(1));
             }
         }
    }

    public onKeypress(key: string, text: string)  {
        fs.appendFileSync('debug.log', `[searchBar service] onKeypress key ${key} and text=${text} \n`);

        if (key === 'escape' || key === 'return') {
            this.status = 'Display';
        }

        else if (key === '/' || key === ':') {
            this.status = 'Edition';

            if (this.text === null || this.text.length === 0) {
                this.text = key;
            }
        }

        else {
            this.text = text;
        }

        if (key === 'escape') {
            this.mode = null;
            return;
        }

        if (this.filter === null && this.action === null) {
            if (key === '/') {
                this.mode = 'Filter';
            } else if (key === ':') {
                this.mode = 'Action';
            }
        } else if (this.filter === null) {
            this.action = text;
        } else {
            this.filter = text;

            if (this.notifyFilterChange) {
                fs.appendFileSync('debug.log', '[searchbar service] notify with ' + this.filter + '\n');
                this.notifyFilterChange(this.filter);
            }
        }
    }

    public onFilterChange(fn: (filter: string) => void) {
        fs.appendFileSync('debug.log', '[searchbar service] register onFilterChange \n');
        this.notifyFilterChange = fn;
    }
}
