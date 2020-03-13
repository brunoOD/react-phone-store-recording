import styled from 'styled-components'

//Exportamos el botón como constante. De esta forma cada vez que lo importemos lo podremos utilizar
//Este botón podrá ser utilizado en distintos proyectos.
//Con style-components creamos un solo botón y lo usamos en múltiples proyectos


//Para styled debemos declarar la constante y luego implementarla en el JSX
//mas info en https://styled-components.com/
//En border obtenemos mediante "var", las variables desde css (root:)
//&: Usamos "&" cuando pasa algo, se produzca el efecto  después del corchete

export const ButtonContainer=styled.button `
text-transform:capitalize;
font-size: 1.4rem;
background:transparent;
border:0.05rem solid var(--lightBlue);
border-color:${props =>
	props.cart? "var(--mainYellow)" : "var(--lightBlue)"};
color: ${prop=> prop.cart ? "var(--mainYellow)" : "var(--lightBlue)"};
border-radius:0.5rem;
padding:0.2rem 0.5rem; 
cursor:pointer;
margin: 0.2rem 0.5rem 0.2rem 0.5rem;
transition: all 0.5s ease-in-out;
&: hover{
	
	background:${prop=> prop.cart ? "var(--mainYellow)" : "var(--lightBlue)"};
	color:var(--mainBlue);
}
&:focus{
	outline:none;
}
`
