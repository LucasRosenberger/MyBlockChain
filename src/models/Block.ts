import { Transaction } from './Transaction';

export class Block {
    public index: number;
    public timestamp: number;
    public transactions: Array<Transaction>;
    public proof: number;
    public previousHash: string;

    constructor(_index: number, _timestamp: number, _transactions: Array<Transaction>, _proof: number, _previousHash: string) {
        this.index = _index;
        this.timestamp = _timestamp;
        this.transactions = _transactions;
        this.proof = _proof;
        this.previousHash = _previousHash;
    }

    public toString = (): string => {
        return this.index + this.timestamp + this.transactions.toString() + this.proof + this.previousHash;
    }
}