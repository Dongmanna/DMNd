import { createGlobalStyle } from 'styled-components';

const GlobalStyle= createGlobalStyle`
@font-face {
    font-family: 'InkLipquid';
    src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_one@1.0/InkLipquid.woff') format('woff');
    font-weight: normal;
    font-style: normal;
}
@font-face {
     font-family: 'NIXGONM-Vb';
     src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_six@1.2/NIXGONM-Vb.woff') format('woff');
     font-weight: normal;
     font-style: normal;
}
@font-face {
    font-family: 'Roboto';
    src: url('https://fonts.googleapis.com/css2?family=Roboto&display=swap');
    font-weight: normal;
    font-style: notmal;
}
    *{
        box-sizing:border-box;
        html{
            margin:0;
        }
    }

@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@700&display=swap');
    
    :root{
        --grn-1:#9BBA74;
        --grn-2:#638A55;
        --bg-gray:#F2F2F2;
        --hred:#F95335;
        --gray1:#A1A1A1;
    }
    html{
        width:100%;
        font-size:10px;
        padding:0px;
        margin:0;
        @media(max-width: 800px){
            font-size: 8px;
        }
        @media(max-width: 560px){
            font-size:6px;
        }
        body{
            margin:0;
            padding:0;
        }
    }
`;

export default GlobalStyle;
//사용 : background-color: var(--grn-1);