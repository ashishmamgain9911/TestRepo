import { createGlobalStyle } from 'styled-components';
import styled from 'styled-components';
import Media from './../theme/media-breackpoint'; 
import MainBG from './../assets/images/bg.jpg' 

var Gs = {}
 
Gs.GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0; 
    font-family: 'Cowboy Movie', sans-serif;  font-weight:400 ;
    background:url(${MainBG}) center top no-repeat #021225;
    color:#fff; overflow:hidden; ;
  }  
  button{ outline:none; border:none;}
  .bodySection{ display: flex; align-items: flex-start; justify-content: flex-start; flex-wrap:wrap;} 
  .collapse-css-transition { transition: all 280ms cubic-bezier(0.4, 0, 0.2, 1); }
  .app__collapse{ visibility:hidden; opacity:0;}
  .app__collapse.collapse-active{ visibility:visible; opacity:1;}


  .Show-sm{ display:none !important; } 
  .youtube-embed {
  position: relative;
  padding-bottom: 56%;
  width: 100%;
  text-align: left;
}

.youtube-embed iframe {
  width: 100%;
  position: absolute;
  height: 100%;
  overflow: hidden;
}

@media(max-width:767px){ 
  .Show-lg{ display:none !important; }
  .Show-sm{ display:flex !important; }
} 

`; 

 

Gs.Container = styled.div`
margin:0 auto; width: 100%; max-width:1400px; padding:0;
 

`;
 

export default Gs; 

