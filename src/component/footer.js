import React, { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import styled from 'styled-components'
import Media from './../theme/media-breackpoint' 
import { Zoom, Fade } from 'react-reveal';
import Gs from '../theme/globalStyles'
import { FaTelegramPlane, FaTwitter, FaYoutube, FaReddit } from 'react-icons/fa' 
 

 

const Footer = () => {
 
    return (
        <FooterSection>
            <FlexDiv>  
            © 2022 Wild West Undead, All rights reserved
            </FlexDiv>

        </FooterSection >
    )
}

const FlexDiv = styled.div`
    display: flex; align-items: center; justify-content:center; flex-wrap:wrap;
`;

const FooterSection = styled.div`
    background-color:#000710; width:100%; margin-top:60px; padding:30px 22px; color:#7f7f7f; 
    ${Media.sm}{ padding:20px 16px;}  text-transform:uppercase;
`;
 

export default Footer