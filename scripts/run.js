const main = async () => {
  const [owner, randomPerson] = await hre.ethers.getSigners();
  const beerContractFactory = await hre.ethers.getContractFactory('BeerPortal');
  const beerContract = await beerContractFactory.deploy();
  await beerContract.deployed();

  console.log("Contract deployed to:", beerContract.address);
  console.log("Contract deployed by:", owner.address);

  let beerCount;
  beerCount = await beerContract.getTotalBeer();

  let beerTxn = await beerContract.receiveBeer();
  await beerTxn.wait();

  beerCount = await beerContract.getTotalBeer();

  beerTxn = await beerContract.connect(randomPerson).receiveBeer();
  await beerTxn.wait();

  beerCount = await beerContract.getTotalBeer();
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
