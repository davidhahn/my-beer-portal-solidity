const main = async () => {
  const beerContractFactory = await hre.ethers.getContractFactory('BeerPortal');
  const beerContract = await beerContractFactory.deploy();
  await beerContract.deployed();
  console.log("Contract deployed to:", beerContract.address);
};

const runMain = async () => {
  try {
    await main();
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

runMain();
