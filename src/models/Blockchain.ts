import { Block } from './Block';
import { Transaction } from './Transaction';
import * as hash from 'js-sha256';

class Blockchain {
    private chain: Array<Block>;
    private currentTransactions: Array<Transaction>;

    constructor() {
        this.chain = new Array();
        this.currentTransactions = new Array();
    }

    //Find a number wich multiplied by lastProof gives you a hash with 4 leading 0
    public proofOfWork(lastProof: number): number {
        let proof = 0;
        while (!Blockchain.validateProofOfWork(lastProof, proof))
            proof++;

        return proof;
    }

    public static validateProofOfWork(lastProof: number, proof: number): boolean {
        return hash.sha256(lastProof + proof).substring(0, 4) === "0000";
    }
    //Adds a new block to the Blockchain
    public newBlock(proof: number, previousHash: string = Blockchain.hash(this.chain.pop())): any {
        let block: Block = new Block(this.chain.length + 1, Date.now(), this.currentTransactions, proof, previousHash);
        this.currentTransactions = new Array();
        this.chain.push(block);
        return block;
    }

    //Adds a new transaction to the currentTransactions list
    //Returns the index of the block
    public newTransaction(sender: string, receiver: string, amount: number): number {
        this.currentTransactions.push(new Transaction(sender, receiver, amount));
        return this.lastBlock.index + 1;
    }

    //Hashes a blocks
    public static hash(block: Block): string {
        return hash.sha256(block);
    }

    get lastBlock(): Block {
        return this.chain.pop();
    }

}