import React, { useState } from 'react'; 
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import styled from 'styled-components'
import Header from './component/header' 
import Home from './pages/home' 
import Gs from './theme/globalStyles';
import { ThemeProvider } from 'styled-components'
import { theme } from './theme/theme' 
import Footer from './component/footer';
  
function App() {   

  const [isDark,setDarkTheme] = useState(true);
  const selectedTheme = theme(isDark);

  function setTheme(flag){
    setDarkTheme(flag);    
  }

  return (
    <Router> 
    <ThemeProvider theme={selectedTheme}>
      <section className='bodySection clearfix'>
        <Gs.GlobalStyle />  
          <Header isDarkTheme={isDark} setTheme={setTheme}  />  
            {/* <Switch>
            <Route path="/" exact> <Home isDarkTheme={isDark}  />  </Route>   */}
            {/* </Switch>  */}
              
          <Footer /> 
        </section>
    </ThemeProvider>
    </Router> 
  );
}


const RightBX = styled.div`
  width:calc(100% - 240px);  background-image:url('${(props) => props.theme.RBXbg}'); background-repeat:no-repeat; background-position:top left; background-size:cover ; min-height:100vh;

`
export default App;