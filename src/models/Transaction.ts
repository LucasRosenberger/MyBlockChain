export class Transaction {
    constructor(public sender: string,
        public receiver: string,
        public amount: number) { }

    public toString = (): string => {
        return this.sender + this.receiver + this.amount;
    }
}