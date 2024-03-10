import { FaBars, FaSearch } from "react-icons/fa"
import styled from "styled-components"
// import MobileSidebar from "./MobileSidebar"
import { useOutletContext } from "react-router-dom"

type Page = {
    page: string
}
const Navbar = ({page}: Page) => {
  const {toggleSidebar} = useOutletContext() as any;
  return (
    <Wrapper>
        <div className="head">
            <FaBars className="icon" onClick={toggleSidebar}/>
            <h3>{page}</h3>
            <FaSearch className="icon"/>
        </div>
        <div className="empty"></div>
    </Wrapper>
  )
}

export default Navbar

const Wrapper = styled.header`
    /* background-color: var(--primaryColor); */
    position: sticky;
    top: 0;
    /* height: auto; */
    /* background-color: red; */
    background-color: var(--backgroundColor2);
    color: white;
    .head{
        width: min(var(--maxWidth2),90%);
        margin-inline: auto;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding-block: 1.5rem;
        h3{
            font-weight: 500;
        }
        .icon{
            /* border: 2px solid var(--primaryColor80); */
            padding: .3rem;
            border-radius: .25rem;
        }
    }
    .empty{
        height: .5rem;
        width: 100%;
        background-color: var(--primaryColor);
    }
    /* @media screen and (min-width: 800px){
        position: sticky;
        top: 0;
    } */
`