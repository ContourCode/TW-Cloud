const WS = require('ws');
const EventEmitter = require('events');

class Connection extends EventEmitter {
	constructor(username, id) {
		super();
        this.username = username;
        this.id = id;
        this.vars = {};
    }
    init() {
        this.WS = new WS('wss://clouddata.turbowarp.org');
        
        this.WS.onopen = () => {
            this.WS.send(JSON.stringify({
                method: 'handshake',
                user: this.username,
                project_id: this.id
            }));
        }

        this.WS.onmessage = event => {
            for (const i of event.data.split('\n')) {
                const json = JSON.parse(i);
                if (json.method == 'set') {
                    this.vars[json.name] = json.value.toString();
                    this.emit('set', {name: json.name, value: json.value.toString()});
                }
            }
        }

        this.WS.onclose = () => this.WS = new WS('wss://clouddata.turbowarp.org');
    }

    set(name, val) {
        this.vars.name = val;
		this.WS.send(JSON.stringify({
			method: 'set',
			name,
			val
		}));
    }

    get(name) {
        return this.vars.name;
    }
}

module.exports = Connection;
