import React, { Component, useEffect, useState } from 'react';
import styled from 'styled-components';
import Gs from '../theme/globalStyles';
import { Link, NavLink } from 'react-router-dom';
import Media from './../theme/media-breackpoint';
import ReactPlayer from 'react-player'

import HeroIMG from './../assets/images/hero.gif';
import Flashsad from './../assets/images/sad01.png';
import GraphSM from './../assets/images/graph-sm.png';
import GraphLG from './../assets/images/graph-lg.png';
import HowWave from './../assets/images/how-wave.png';
import { nftContract, signer, provider } from '../../wildPassContract';

import { ethers } from 'ethers';
import { utils, BigNumber } from 'ethers';
import { getAddress } from 'ethers/lib/utils';
 
import video from '../video/WildWestUndeadTrailer.mp4'

const contractAddr = '0xD3A2f272C514512EA8eBC0566849b7CD238ef641'
const Home = (props) => {

  
  const [chainID, setNetworkName] = useState('');
  const [activeBadgeId, setActiveBadgeID] = useState();
  const [balance, setBalance] = useState();
  const [address, setAddress] = useState('');
  const [loader, setLoader] = useState(false);
  useEffect(() => {
    
    async function checkBalance() {
    if (!window.ethereum) {
      alert('install metamask extension!!');
      return
    }
    await window.ethereum
    .request({ method: 'eth_requestAccounts' })
    .then((res) => checkWalletBalance(res[0]));

     await window.ethereum.on('accountsChanged', async function(accounts) {
     await checkWalletBalance(accounts[0])
      return accounts[0]
    });
    const checkNetworkIdValid = await window.ethereum
    .request({ method: 'net_version' })
    .then((chainID) => 
     chainID === '1'
        ? setNetworkName('Ethereum Main Network')
        : chainID === '3'
        ? setNetworkName('ropsten')
        : chainID === '4'
        ? setNetworkName('rinkeby')
        : chainID === '5'
        ? setNetworkName('Goerli Test Network')
        : chainID === '42'
        ? setNetworkName('Kovan Test Network')
        : setNetworkName('Network not found')
    );
    
    }
    checkBalance();
  }, []);
  const checkWalletBalance = async (account) =>{
    const checkNetworkIdValid = await window.ethereum
    .request({ method: 'net_version' })
    .then((chainID) => chainID);
   
    if (checkNetworkIdValid !== '4') {
    
      alert('Please Switch to Rinkeby Test Network');
      return ;
    }
    const activeBadgeId = ethers.BigNumber.from(
      await nftContract.activeBadgeId()
    ).toNumber();
   setActiveBadgeID(activeBadgeId)
    const balanceOf = ethers.BigNumber.from(
      await nftContract.balanceOf(account, activeBadgeId)
    ).toNumber();
   
      setBalance(balanceOf);
      return balanceOf;
  }
  // const checkNetworkId = async () => {
  //  const type =  await window.ethereum.request({ method: 'net_version' }).then((chainID) => {
  //    setNetworkName(chainID)
  //     // return chainID;
  //   });
  
  //   return chainID
  // };

  const mintNftHandler = async () => {
    try {
      // at a later point in Time
      if(props.data && !props.data.address){
        alert('Please Connect Wallet');
        return;
      }
      const account = await window.ethereum
        .request({ method: 'eth_requestAccounts' })
        .then((res) => res[0]);
        const checkNetworkIdValid = await window.ethereum
        .request({ method: 'net_version' })
        .then((chainID) => chainID);
       
        if (checkNetworkIdValid !== '4') {
        
          alert('Please Switch to Rinkeby Test Network');
          return ;
        }
       
      
        // let t1 = (1000 * nftPrice);
        
        let amount = 1;
        let nftPrice1 = (100000000000000 * amount).toString();
        console.log('Price of the token is : ', nftPrice1);
  
        const activeBadgeId = ethers.BigNumber.from(
          await nftContract.activeBadgeId()
        ).toNumber();
        const maxSupply = ethers.BigNumber.from(
          await nftContract.maxSupply()
        ).toNumber();
        const maxToken = ethers.BigNumber.from(
          await nftContract.maxToken()
        ).toNumber();
        const totalSupply = ethers.BigNumber.from(
          await nftContract.totalSupply(activeBadgeId)
        ).toNumber();
        const balanceOf = ethers.BigNumber.from(
          await nftContract.balanceOf(account, activeBadgeId)
        ).toNumber();
          setBalance(balanceOf);
        const maxPerWallet = ethers.BigNumber.from(
          await nftContract.maxPerWallet()
        ).toNumber();
        const walletBalance = await window.ethereum
          .request({
            method: 'eth_getBalance',
            params: [account, 'latest'],
          })
          .then((balance) => {
            return ethers.utils.formatEther(balance);
          });
  
        if (activeBadgeId) {
          if (totalSupply + amount > maxToken) {
            nftPrice1 = nftPrice1 * 2;
            // if(nftPrice1 >= PRICE * amount && walletBalance){

            // }
          }
        } else {
          alert('Sale Is Not Active');
          return;
        }
       
      
        // const balance = BigNumber.from(nftPrice1.toString(16));
      
        // console.log('utils...123', utils.formatEther(balance));
       
        if (Number(Number(walletBalance).toFixed(4)) < Number(utils.formatEther(nftPrice1))) {
          alert('Not enough ETH for transaction');
          return;
        }
        if (balanceOf >= maxPerWallet) {
          alert('Max tkn per wallet exceeded');
          return;
        }
        const nftTxn = await nftContract.PUBLICMINT(amount, { value: nftPrice1 });
        setLoader(true);
        if (nftTxn && nftTxn.from && nftTxn.hash) {
          alert('Minted Successfully');
          setLoader(false)
          // window.location.reload();

          // dispatch(onAfterMint({ accountAddress: nftTxn.from, mintTxnId: nftTxn.hash }))
          // setIsMinted(true);
        }
        console.log('Mining... please wait');
        console.log('txnObject : ', nftTxn);
        console.log(`Discount price of token is ============/${nftTxn.hash}`);
      
   
    } catch (err) {
      console.log(err);
      alert(err.message);
    }
  };
  useEffect(() => {
    window.scrollTo(0, 10);
  }, []);


  return (
    <>
  
      <HomeBG>

        <Gs.Container>
       
          <BannerBX>
            <BannerSBX01>
              <Title01>
              Hell might be scary,
                <span>but you’re judge, jury, and f*****g executioner.</span>
              </Title01>
              <Text01>
                <p>
                Explore the world of Los Diablos, rustle up some firepower, and peel back the mystery of how a massive mining settlement can become a ghost town overnight.
                </p>
              </Text01>
              <BTNBX02>
                <p>Mint WildMestWest NFT</p>
                <button
                  onClick={() => {
                    mintNftHandler();
                  }}
                >
                  MINT
                </button>
              </BTNBX02>
              {
                props.data.address &&balance ?
                <BTNBX02 style={{'paddingLeft': '20px'}}>
                <p>View Tokens</p>
                <button
                  onClick={() => {
                    window.open(`https://testnets.opensea.io/assets/${chainID}/${contractAddr}/${activeBadgeId}`)
                  }}
                >
                  View Tokens
                </button>
              </BTNBX02> 
              : ''
              }
            </BannerSBX01>

            <BannerSBX02>
              <div className='BorderBX'>
                <img src={HeroIMG} alt='' />
              </div>
            </BannerSBX02>
          </BannerBX>

          <BodyTitle01> 
            <Text01 className='v3'>
              <p>
              Forge alliances, backstab your pals for fun, bathe in gore, and do whatever it takes to emerge bloody and victorious in Los Diablos. There’s so much to do and see, you’ll never play the same game twice.</p>

              <p>Wild West Undead is an Open World Metaverse, third person shooter where players blast their way through hordes of ravenous walking dead, nightmarish hell spawn, and other horrors stalking the world around you—including your fellow players. After that cool down at one of our Saloons for a drink and chance to win tokens in our Wild West Casino Mini Games.</p>

              <p>The town of Los Diablos is now a hunting ground for the brave, the greedy and those who have nothing to lose, who exactly are you

              </p>
            </Text01> 

           <span> Being a holder of our NFT Access Pass will give you special features:</span>

           <Text01 className='v4'>
                  <ul>
                  <li><span>1.</span>	Access to the private Wild West Undead Discord Server </li>
                  <li><span>2.</span>	Be the first to be notified of upcoming Wild West Undead NFT drops </li>
                  <li><span>3.</span>	VIP Access to all WWU parties and events </li>
                  <li><span>4.</span>	Be whitelisted for the upcoming custom character NFT collection </li>
                  <li><span>5.</span>	You will be given priority to purchase land plots in our Open World Metaverse </li>
                  <li><span>6.</span>	Holders will be rewarded with tokens from our upcoming drop and use them in our online casino mini games and weapon customization shop, among other upcoming features. </li>
                  <li><span>7.</span>	Cast your characters in our content creation program and be compensated for letting us use your character in our social network content, animated series, comic book collection and our AAA video game experience.</li>
                  <li> <span>8.</span>	Download and play our Wild West Undead-Infinite Zombie Wave Game and PVP shooter experience.</li>
                  </ul>

           </Text01>




          </BodyTitle01>

          <BodyTitle01>
            Mint Price:
            {/* <Text01 className='v2'>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam.
              </p>
            </Text01> */}
            <GraphIMG>
              <img src={GraphLG} className='lgshow' alt='' />
              <img src={GraphSM} className='smshow' alt='' />
            </GraphIMG>
          </BodyTitle01>
        </Gs.Container>
        <HowWaves>
          <Gs.Container>
            <BodyTitle01>Walk through video about NFTs </BodyTitle01>
            <Section4>
              <BlueLayer>
                <BlueLayer2>
                  {/* <div className='youtube-embed'> */}
               
                  <div className='player-wrapper'>
            <ReactPlayer
            className='react-player fixed-bottom'
            url={video}
            width='100%'
            height='100%'
            controls = {true}
            />
        </div>
                    {/* <iframe
                      width='560'
                      height='315'
                      src='../video/WildWestUndeadTrailer.MP4'
                      title='YouTube video player'
                      frameBorder='0'
                      allow='accelerometer;  clipboard-write; encrypted-media; gyroscope;'
                      allowFullScreen
                    ></iframe> */}

                  {/* </div> */}
                </BlueLayer2>
              </BlueLayer>
            </Section4>
            <div style={{ textAlign: 'center' }}>
              <BTNBX02>
                <button
                  onClick={() => {
                    mintNftHandler();
                  }}
                >
                  MINT
                </button>
              </BTNBX02>
            </div>
          </Gs.Container>
        </HowWaves>
      </HomeBG>
    </>
  );
};

const FlexDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
`;

const HowWaves = styled.div`
  background: url(${HowWave}) no-repeat;
  background-size: contain;
  background-position: center;
  width: 100%;
`;

const HomeBG = styled(FlexDiv)`
  align-content: flex-start;
  width: 100%;
  ${Media.md2} {
    padding-left: 20px;
    padding-right: 20px;
  }
`;

const Section4 = styled.div`
  padding: 64px 0px 100px 0;
  @media (max-width: 1300px) {
    padding: 118px 0px 100px;
  }

  ${Media.md2} {
    padding: 100px 0px 90px;
  }
  ${Media.sm} {
    padding: 40px 0px 50px;
  }
`;

const BlueLayer = styled.div`
  max-width: 1058px;
  margin: 0 auto;
  background: linear-gradient(
    90deg,
    ${(props) => props.theme.GColor1Light},
    ${(props) => props.theme.GColor2Light}
  );
  position: relative;
  transform: scaleY(0.9);

  @media (max-width: 1300px) {
    max-width: 900px;
  }
`;

const BlueLayer2 = styled.div`
  justify-content: space-between;
  max-width: 962px;
  margin: 0 auto;
  background: linear-gradient(
    90deg,
    ${(props) => props.theme.GColor1},
    ${(props) => props.theme.GColor2}
  );
  padding: 20px;
  box-shadow: 0px 0px 40px 0px ${(props) => props.theme.BG1Shadow};
  transform: scaleY(1.1);
  ${Media.lg} {
    max-width: 900px;
  }
  ${Media.sm} {
    padding: 10px;
  }

  @media (max-width: 1300px) {
    max-width: 800px;
  }
`;

const BannerBX = styled(FlexDiv)`
  justify-content: flex-start;
  position: relative;
  margin-top: 70px;

  :after {
    content: '';
    border: none;
    width: 800px;
    height: 570px;
    background: url(${Flashsad}) center top no-repeat;
    position: absolute;
    right: -140px;
    top: -29px;
    z-index: -1;
    mix-blend-mode: screen;
  }

  ${Media.lg} {
    padding: 0 40px;
  }
  ${Media.md} {
    :after {
      content: '';
      right: -220px;
      top: -48px;
    }
  }
  ${Media.md2} {
    flex-direction: column-reverse;
    :after {
      content: '';
      right: -50px;
      top: -48px;
    }
  }
  ${Media.sm} {
    :after {
      right: 40%;
      top: -48px;
      transform: translateX(50%);
    }
  }
  ${Media.xs} {
    padding: 0 10px;
    :after {
      top: -178px;
    }
  }
`;
const GraphIMG = styled(FlexDiv)`
  width: 100%;
  max-width: 1050px;
  margin: 0 auto 50px auto;
  padding: 0 15px;

  img {
    height: auto;
    max-width: 100%;
  }

  .smshow {
    display: none;
  }
  ${Media.md2} {
    .smshow {
      display: block;
    }
    .lgshow {
      display: none;
    }
  }
`;

const BannerSBX01 = styled(FlexDiv)`
  width: 50%;
  padding-right: 20px;
  justify-content: flex-start;

  ${Media.md2} {
    width: 100%;
  }
  ${Media.sm} {
    justify-content: center;
  }
`;
const BannerSBX02 = styled(FlexDiv)` 
  width:50%; padding-left:20px;   perspective: 468px;   perspective-origin: 60% 50%; 
  .BorderBX{ padding:20px; background-color:rgba(10,36,96,0.4); border:1px solid #644c7f; 
    transform:scaleX(1) scaleY(1) scaleZ(1) rotateX(0deg) rotateY(-16deg) rotateZ(0deg) translateX(0px) translateY(0px) translateZ(-20px) skewX(0deg) skewY(0deg); 
  }
  
  -webkit-animation: mover 3s infinite  alternate;
  animation: mover 3s infinite  alternate;
}
@-webkit-keyframes mover {
  0% { transform: translateY(0) scale(1);  }
  100% { transform: translateY(-28px) scale(1.1); }
}
@keyframes mover {
  0% { transform: translateY(0) scale(1);  }
  100% { transform: translateY(-28px) scale(1.02); }
}

${Media.md2}{ width:100%; justify-content: flex-start; }
${Media.xs}{ padding-left:0px; }
`;

const Title01 = styled.div`
  font-size: 65px; 
  margin-top: 36px;
  text-transform: uppercase;
  span {
    font-size: 38px;
    font-weight: 300;
    text-transform: uppercase;
    width: 100%;
    display: block;
  }

  ${Media.md} {
    font-size: 55px;
    span {
      font-size: 20px;
    }
  }
  ${Media.sm} {
    font-size: 45px;
    text-align: center;
  }
  ${Media.xs} {
    font-size: 35px;
    text-align: center;
  }
`;
const Text01 = styled.div`
  font-size: 20px;
  font-weight: 300;
  line-height: 25px;
  max-width: 530px;
  font-family: 'IBM Plex Sans', sans-serif;
  color: #cecece;
  padding: 18px 0;

  &.v2 {
    max-width: 770px;
    margin: 0 auto;
    text-transform: none;
  }
  &.v3 {
    max-width: 900px;
    margin: 0 auto;
    text-transform: none;
  }
  
  &.v4 {
    max-width:800px;
    margin: 0 auto;
    text-transform: none;
    span{ color: #8cb63c; display: inline-block; width:auto; font-size:20px; font-weight:700;}
    li{ list-style: none; margin-bottom:15px;   }
  }

  ${Media.sm} {
    justify-content: center;
    text-align: center;
  }
`;
const BodyTitle01 = styled(Title01)`
  font-size: 46px;
  width: 100%;
  text-align: center;
  margin: 120px 0 0 0;

  ${Media.xs} {
    font-size: 35px;
    text-align: center;
    margin: 40px 0 0 0;
  }
`;

const BTNBX02 = styled.div`
  font-size: 26px; text-transform: uppercase;
  font-weight: 300;
  color: #fff;

  button {
    display: inline-block; text-transform: uppercase;
    font-size: 30px; 
    background-color: #ff9806;
    color: #fff;
    border: 2px solid #ff9806;
    padding: 12px 24px;
    min-width: 250px;

    &:hover {
      background-color: #ff7b06;
    }
  }
`;

export default Home;
