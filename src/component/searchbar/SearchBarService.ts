import fs from "fs";

const axios = require('axios');

export class SearchBarService {

    private filter: string | null = null;
    private action: string | null = null;
    private notifyFilterChange: (filter: string) => void;

    public onKeypress(key: string, text: string)  {
        fs.appendFileSync('debug.log', 'onKeypress service with key ' + key + '\n');

        if (key === 'escape') {
            this.filter = null;
            this.action = null;
            return;
        }

        if (this.filter === null && this.action === null) {
            if (key === '/') {
                this.filter = '';
                this.action = null;
            } else if (key === ':') {
                this.filter = null;
                this.action = '';
            }
        } else if (this.filter === null) {
            this.action = text;
        } else {
            this.filter = text;

            if (this.notifyFilterChange) {
                fs.appendFileSync('debug.log', 'notify with ' + this.filter + '\n');
                this.notifyFilterChange(this.filter);
            }
        }
    }

    public onFilterChange(fn: (filter: string) => void) {
        fs.appendFileSync('debug.log', 'register onFilterChange \n');
        this.notifyFilterChange = fn;
    }
}
