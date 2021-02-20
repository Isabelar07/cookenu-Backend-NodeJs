export class GenerateDate {
    constructor(
        private readonly now = new Date,
        private readonly day = String(now.getDate()),
        private readonly month = String(now.getMonth()+1).padStart(2,'0'),
        private readonly year = String(now.getFullYear()),    
        private readonly today = (`${year}-${month}-${day}`) 
    ) {}

    public getDate = () => this.today
}