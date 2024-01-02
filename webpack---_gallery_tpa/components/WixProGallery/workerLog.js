export default class WorkerLog {
    constructor() {
        this.log = [];
        this.creationTime = Date.now();
        this.push = this.push.bind(this);
        this.push('created worker log');
    }

    push(message) {
        const elapsed = Date.now() - this.creationTime;
        const timeStamp = elapsed + 'ms';
        this.log.push('[' + timeStamp + ']: ' + message);
    }
}