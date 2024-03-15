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

    public setValue(value: string) {
        if (value.startsWith('/') || value.startsWith(':')) {
            this.text = value;
            if (this.notifyFilterChange) {
                this.notifyFilterChange(this.text.slice(1));
            }
            return true;
        } else {
            return false;
        }
    }

    public onKeypress(key: string, text: string): boolean  {
        fs.appendFileSync('debug.log', `[searchBar service] onKeypress key ${key} and text=${text} \n`);

        // will end up here if hit enter in list box (show details)
        // sol1- ignore all keypress if not edition mode (except activation keys / and :)
        // sol2- do not call this method except for activating keys
        // idea: put the keyboard handler in parent component and handle priority (chain with forward=false)

        // sol1: listbox keypress qui forward a searchbar puis shortcut
        //       attention si keypress g, il ne faut pas declencher keyboard si searchbar est en edition
        //       en revanche, comment on fait pour savoir que / doit afficher la searchbar
        //       on peut dire justement que searchbar renvoie forward false
        //       sinon searchbar ne gere pas / et : (c'est quand même bien de standardiser / et le fait
        //       que la searchbar puisse faire des actions)

        // sol1: handleKeyboard dans parent. keypress 'enter' (cas1: on ne sait pas si ça passe la searchbar en
        //       edition ou si c'est un shortcut. cas2: la searchbar reste en permanence affichée)
        //       pour le cas2, si c'est parent qui gère l'affichage de la searchbar, c'est normal qu'il gère
        //       le forward ou non du keypress.
        //   1a. la searchbar dit si elle consomme l'event clavier et parent ne forward pas si consumed
        //   1b. le parent connaît le comportement fonctionnel de ses children, et sait que si la searchar
        //       est en edition (ou vient de disparaître) alors pas besoin de forward

        // sol1: la listbox a des actions/shortcuts et / et : en font partie (très simple)
        // sol2: je forward tous les keypress a searchbar qui me dit que l'event a été consumed => très compliqué!

        // je pense que searchbar est trop compliqué, pas besoin de status display ou edition,
        // si le composant a le focus alors on est en edition naturellement sinon non.

        if (key === 'p') {
            return process.exit(0);
        }

        if (key === 'escape' || key === 'return') { // add 'enter' also ? fired at the same time as 'return'
            this.status = 'Display';
            this.text = null;
        }

        else if (key === '/' || key === ':') {
            this.status = 'Edition';

            if (this.text === null || this.text.length === 0) {
                this.text = key;
            }
        }

        else {
            if (this.status === 'Edition') {
                this.text = text;
            }
        }

        if (this.text?.startsWith('/')) {
            if (this.notifyFilterChange) {
                this.notifyFilterChange(this.text.slice(1));
            }
        } else if (this.text === null) {
            if (this.notifyFilterChange) {
                this.notifyFilterChange('');
            }
        }

        return false;
/*
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
        }*/
    }

    public onFilterChange(fn: (filter: string) => void) {
        fs.appendFileSync('debug.log', '[searchbar service] register onFilterChange \n');
        this.notifyFilterChange = fn;
    }
}
