import { Block } from './Block';
import { Transaction } from './Transaction';
import * as hash from 'js-sha256';

export class Blockchain {
    private chain: Array<Block>;
    private currentTransactions: Array<Transaction>;
    private static proofOfWorkLength: number = 4;
    private static proofString: string;

    constructor() {
        this.chain = new Array();
        this.currentTransactions = new Array();
        this.getProofString();
        //Creating the genesis block
        this.newBlock(100, "1");
    }
    private getProofString() {
        let t: string = '';
        for (let i = 0; i < Blockchain.proofOfWorkLength; i++) {
            t += "0";
        }
        Blockchain.proofString = t;
    }
    get getChain(): Array<Block> {
        return this.chain;
    }
    //Find a number wich multiplied by lastProof gives you a hash with 4 leading 0
    public proofOfWork(lastProof: number): number {
        console.time('mine');
        let proof = 0;
        while (!Blockchain.validateProofOfWork(lastProof, proof))
            proof++;

        console.timeEnd('mine');
        return proof;
    }

    public static validateProofOfWork(lastProof: number, proof: number): boolean {
        return hash.sha256(lastProof.toString() + proof.toString()).substring(0, Blockchain.proofOfWorkLength) === Blockchain.proofString;
    }
    //Adds a new block to the Blockchain
    public newBlock(proof: number, prevHash?: string): Block {
        let previousHash = prevHash || Blockchain.hash(this.lastBlock);
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
        return hash.sha256(block.toString());
    }

    public get lastBlock(): Block {
        return this.chain[this.chain.length - 1];
    }

}