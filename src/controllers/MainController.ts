import { Blockchain } from './../models/Blockchain';
import { Block } from '../models/Block';

export class MainController {
    private blockChain: Blockchain;
    private uuid: string;

    public constructor(uuid: string) {
        this.blockChain = new Blockchain();
        this.uuid = uuid;
    }
    public testRoute(req, res) {
        res.send(`${Date.now()}`);
    }
    public mineBlock(req, res) {
        //This is undefined in this codeBlock
        let lastBlock = this.blockChain.chain[this.blockChain.chain.length - 1];
        let proof = this.blockChain.proofOfWork(lastBlock.proof);
        this.blockChain.newTransaction("0", this.uuid, 1);
        let block: Block = this.blockChain.newBlock(proof);

        res.json({
            message: "New Block Added!",
            index: block.index,
            transactions: block.transactions,
            proof: block.proof,
            prevHash: block.previousHash
        });
    }
    public newTransaction(req, res) {
        if (!req.body || !req.body.sender || !req.body.receiver || !req.body.amount)
            return res.json({ success: false, message: "Not all Parameters provided!" });

        let index = this.blockChain.newTransaction(req.body.sender, req.body.receiver, req.body.amount);
        res.json({ succes: true, message: `Transaction will be added to block ${index}!` });
    }
    public getChain(req, res) {
        res.json(this.blockChain.getChain);
    }
}