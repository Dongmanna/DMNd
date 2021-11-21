import React from 'react'
import styled from 'styled-components'

const InputStyle = styled.input`
    
        width: 15vw;
        height: 3rem;
        border:none;
        border-bottom:solid 2px var(--grn-1);
        ${(props)=>props.red?`border:solid 2px red`:""};
        background-color: transparent;
        font-size: 1.8rem;
        ::placeholder{
        }

        :focus{
            outline-width:0;
            border-bottom:solid 2px orange;
            transition: .4s;

        }

        :focus::placeholder{
            color: transparent!important;
        }
    
    ${(props)=> props.size==="L" &&`
        width:22vw;
        border-bottom:solid 2px #CFEBAC;
        :focus{
            outline-width:0;
            border-bottom:solid 3px var(--grn-1);
            transition: .4s;

        }
    `}
`
export default function Input({size, placeholder, required, type, setState, name, red}) {
    placeholder= (required)?"*"+placeholder:placeholder;
    //데이터 결과창에 넘겨줄 때 searchtext활용
    // const [text, setText] = useState("");
    const handleText = async function(e){
        e.preventDefault();
        if (e.target.value){
            // setText(e.target.value);
            if (setState){
                setState(e.target.value)
            
            }
        }
    }
    
    
    return (
        <InputStyle size={size} placeholder={placeholder}   red={red}onChange={handleText} type={type} name={name} >
        
        </InputStyle>
    )
}
