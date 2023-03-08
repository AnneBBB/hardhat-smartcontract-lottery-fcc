const { network, ethers } = require("hardhat")
const { developmentChains } = require("../helper-hardhat-config")

const BASE_FEE = ethers.utils.parseEther("0.25") //premium 0.25 Link
const GAS_PRICE_LINK = 1e9 //calculated value based on gas price on chain

module.exports = async ({ getNamedAccounts, deployments }) => {
    const { deploy, log } = deployments
    const { deployer } = await getNamedAccounts()
    const args = [BASE_FEE, GAS_PRICE_LINK]

    if (developmentChains.includes(network.name)) {
        log("Local network detected! Deploying mocks...")
        await deploy("VRFCoordinatorV2Mock", {
            from: deployer,
            log: true,
            args: args, //base_fee, gas_price_link
        })
        log("Mocks deployed!")
        log("------------------------------------------------------------")
    }
}

module.exports.tags = ["all", "mocks"]
