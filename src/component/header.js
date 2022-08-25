import React, { useEffect, useState } from 'react'
import Gs from '../theme/globalStyles'
import { Zoom, Fade } from 'react-reveal';
import styled from 'styled-components'
import { Link, NavLink } from 'react-router-dom'
import Media from '../theme/media-breackpoint'
import Logo from './../assets/images/logo.png'
import Collapse from '@kunukn/react-collapse'
import { ethers } from 'ethers';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Home from '../pages/home'

function Header(props) {

 
  const [isOpen3, setIsOpen3] = useState(false)
  const [buttonText, setButtonText] = useState('Connect Wallet');
  const [data, setdata] = useState({
    address: '',
    Balance: null,
  });
  const [account, setAccount] = useState('');
  useEffect(() => {
  }, []);
  useEffect(() => {
    async function listenMMAccount() {
      if (!window.ethereum) {
        console.log('install metamask extension!!');
        return
      }
      window.ethereum.on('accountsChanged', async function(accounts) {
        // Time to reload your interface with accounts[0]!
        // const accounts = await window.ethereum.getAccounts();
        // accounts = await web3.eth.getAccounts();
        accountChangeHandler(accounts[0])
      });
    }
    listenMMAccount();
  }, []);
  const getbalance = (address) => {
  
    // Requesting balance method
    window.ethereum
      .request({ 
        method: 'eth_getBalance', 
        params: [address, 'latest'] 
      })
      .then((balance) => {
        // Setting balance
        setdata({
          address: address,
          Balance: ethers.utils.formatEther(balance),
        });
      });
  };
  const btnhandler = () => {
  
    // Asking if metamask is already present or not
    if (window.ethereum) {
      let res;
      // res[0] for fetching a first wallet
      
      window.ethereum
        .request({ method: 'eth_requestAccounts' })
        .then((res) => accountChangeHandler(res[0]));
      
    } else {
      alert('install metamask extension!!');
    }
  };

  const accountChangeHandler = (account) => {
    // Setting an address data
    setdata({
      address: account,
    });
    setAccount(account)
    setButtonText('connected')
    // Setting a balance
    getbalance(account);
  };
  
  const onInit = ({ state, style, node }) => {

    setIsOpen3(false)
  }

  return (

    <HeaderOuter> 

      <HeadMbx>
          <LogoM>
            <Link to='/'>
              <img src={Logo} alt="logo" />
            </Link>
          </LogoM> 
        
          {  buttonText ===  'connected' ? <span style={{ fontFamily : ' IBM Plex Sans,sans-serif  '  }} > Wallet : {account} </span>:'' }
          <ConnectBTN>
            <button onClick={btnhandler} >{buttonText}</button>
          </ConnectBTN> 
      </HeadMbx>
      <Switch>
  <Route path="/" exact> <Home isDarkTheme={props.isDarkTheme} data ={data} onChange={btnhandler}/>  </Route>  
  </Switch> 
    </HeaderOuter>

  )

}
const FlexDiv = styled.div`
  display: flex; align-items: center; justify-content:center; flex-wrap:wrap;
`;

const HeaderOuter = styled(FlexDiv)`
   transition:all 500ms; min-height:90px; position:relative ;   width:100%; margin-bottom:30px; 
   
`; 
const HeadMbx = styled(FlexDiv)`
  width:100%; max-width:1400px; margin:0 auto;  

  ${Media.lg}{ padding:0 25px;  }
`
const LogoM = styled(FlexDiv)`
  margin-right:auto; padding-top:8px;
` 
const ConnectBTN = styled(FlexDiv)`
  margin-left:auto;

  button{ display: inline-block; font-size:20px;  background-color:transparent; color:#fff; border:2px solid #ff9806; padding:12px 24px; text-transform:uppercase;
    :hover{background-color:#ff9806; }

    ${Media.xs}{ font-size: 15px; border: 1px solid #ff9806; padding: 8px 10px; }
  }


`

export default Header;
