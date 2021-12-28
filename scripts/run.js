const main = async () => {
  const beerContractFactory = await hre.ethers.getContractFactory('BeerPortal');
  const beerContract = await beerContractFactory.deploy({
    value: hre.ethers.utils.parseEther("0.1"),
  });
  await beerContract.deployed();

  console.log("Contract deployed to:", beerContract.address);

  let beerCount;
  beerCount = await beerContract.getTotalBeers();
  console.log(beerCount.toNumber());

  let beerTxn = await beerContract.receiveBeer('Cheers!');
  await beerTxn.wait();

  const [_, randomPerson] = await hre.ethers.getSigners();
  beerTxn = await beerContract.connect(randomPerson).receiveBeer('Another round!');
  await beerTxn.wait();

  let allBeers = await beerContract.getAllBeers();
  console.log(allBeers);
};

const checkBalance = async () => {
  const beerContractFactory = await hre.ethers.getContractFactory('BeerPortal');
  const beerContract = await beerContractFactory.deploy({
    value: hre.ethers.utils.parseEther("0.1"),
  });
  await beerContract.deployed();

  console.log("Contract deployed to:", beerContract.address);

  let contractBalance = await hre.ethers.provider.getBalance(beerContract.address);
  console.log('Contract balance:', hre.ethers.utils.formatEther(contractBalance));

  let beerTxn = await beerContract.receiveBeer('Cheeers!');
  await beerTxn.wait();

  contractBalance = await hre.ethers.provider.getBalance(beerContract.address);
  console.log('Contract balance:', hre.ethers.utils.formatEther(contractBalance));

  let allBeers = await beerContract.getAllBeers();
  console.log(allBeers);
};

const runMain = async () => {
  try {
    await main();
    await checkBalance();
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

runMain();
