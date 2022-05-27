const assert = require("assert")
const ganache= require("ganache-cli");
const  Web3= require("web3");
const web3 = new Web3(ganache.provider())

const {interface,bytecode} = require("../compile")

let lottery;
let accounts;

beforeEach( async ()=>{
    accounts = await web3.eth.getAccounts();
    lottery = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({data:bytecode})
    .send({from:accounts[0],gas:"1000000"});
})

describe("Lottery is created",()=>{
    it("deployed", ()=>{
        assert.ok(lottery.options.address);
    })

    it("allow one account",async ()=>{
        await lottery.methods.enter().send({
            from: accounts[0],
            value: web3.utils.toWei('0.02','ether')
        })

        const players= await lottery.methods.getPlayers().call({
            from:accounts[0]
        })

        assert.equal(accounts[0],players[0]);
        
    });

    it("allow multiple account",async ()=>{
        await lottery.methods.enter().send({
            from: accounts[0],
            value: web3.utils.toWei('0.02','ether')
        })

        await lottery.methods.enter().send({
            from: accounts[1],
            value: web3.utils.toWei('0.02','ether')
        })


        const players= await lottery.methods.getPlayers().call({
            from:accounts[0]
        })

        assert.equal(accounts[0],players[0]);
        assert.equal(accounts[1],players[1]);
        
    });

    it ('require minimuim ether', async ()=>{
        try{
            await lottery.methods.enter.send({
                from:accounts[0],
                value:0
            });
            assert(false)

        }
        catch(err){
            assert.ok(err)
        }
    })
})