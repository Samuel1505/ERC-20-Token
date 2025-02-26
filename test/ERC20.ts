import hre from "hardhat";
import { expect } from "chai";

describe("ERC20 Token Deployment", function () {
    async function deployTokenContract() {
        const [owner, recipient, anotherUser] = await hre.ethers.getSigners();

        // Deploy ERC20 Token Contract
        const Token = await hre.ethers.getContractFactory("ERC20");
        const token = await Token.deploy("AbstractToken", "ABS", 1000000); // Name, Symbol, Supply

        return { token, owner, recipient, anotherUser };
    }

    describe("Deployment", function () {
        it("should deploy the token contract successfully", async function () {
            const { token } = await deployTokenContract();
            expect(token.target).to.not.equal("0x0000000000000000000000000000000000000000");
        });

        it("should be deployed by the owner", async function () {
            const { token, owner } = await deployTokenContract();
            expect(await token.runner.getAddress()).to.equal(owner.address);
        });

        it("should assign the total supply to the owner", async function () {
            const { token, owner } = await deployTokenContract();
            expect(await token.balanceOf(owner.address)).to.equal(1000000);
        });
    });

    describe("Transfers", function () {
        it("should allow only the owner to make the first transfer", async function () {
            const { token, owner, recipient } = await deployTokenContract();

            // Owner transfers 500 tokens to recipient
            await token.transfer(recipient.address, 500);

            // Check balances
            expect(await token.balanceOf(owner.address)).to.equal(1000000 - 500);
            expect(await token.balanceOf(recipient.address)).to.equal(500);
        });

        it("should prevent a user with zero balance from transferring", async function () {
            const { token, recipient, anotherUser } = await deployTokenContract();

            // Another user (without tokens) tries to transfer
            await expect(token.connect(anotherUser).transfer(recipient.address, 50))
                .to.be.revertedWith("INSUFFICIENT BALANCE");
        });

        it("should allow a recipient to transfer tokens after receiving them", async function () {
            const { token, owner, recipient, anotherUser } = await deployTokenContract();

            // Owner transfers 500 tokens to recipient
            await token.transfer(recipient.address, 500);

            // Recipient now transfers 200 tokens to another user
            await token.connect(recipient).transfer(anotherUser.address, 200);

            // Check balances
            expect(await token.balanceOf(owner.address)).to.equal(1000000 - 500);
            expect(await token.balanceOf(recipient.address)).to.equal(500 - 200);
            expect(await token.balanceOf(recipient.address)).to.equal(300);
        });
    });
});