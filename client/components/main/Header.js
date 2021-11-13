import styled from 'styled-components';
import CaretIcon from '../../assets/icons/caret.svg';
import UserIcon from '../../assets/icons/user2.svg';
import ChoicesIcon from '../../assets/icons/choices2.svg';
import QuestionMarkIcon from '../../assets/icons/question3.svg';
import CogIcon from '../../assets/icons/cog.svg';
import ChevronIcon from '../../assets/icons/chevron.svg';
import ArrowIcon from '../../assets/icons/arrow.svg';
import BoltIcon from '../../assets/icons/bolt.svg';
import Link from 'next/link';
import { CSSTransition } from 'react-transition-group';
import { useState, useEffect, useRef } from 'react';

const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: center;
  justify-content: space-between;
  padding-left: 1.5rem;
`;

const StyledCaretIcon = styled(CaretIcon)`
  
  /* padding-top: .5rem; */
  justify-self: end;
  cursor: pointer;

  /* display: flex; */
  /* align-items: center; */
  
  path {
    //height: 100%;
    //width: 100%;
    fill: ${props => props.theme.primary100};
  }
`;

const StyledA = styled.a`

  --button-size: calc(var(60px) * 0.5);
  width: var(--button-size);
  height: var(--button-size);
  background-color: ${props => props.theme.background};
  border-radius: 50%;
  padding: 3px;
  margin: 2px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: filter 300ms;

  &:hover {
    filter: brightness(1.2);
  }
`;

const LogoText = styled.a`
  cursor: pointer;
  font-size: ${props => props.theme.fs.h1m};
  color: ${props => props.theme.primary100};
`;

const StyledNavBar = styled.nav`
  height: var(--nav-size);
  background-color: ${props => props.theme.background};
  padding: 0 1rem;
  * {
    box-sizing: content-box;
  }
`;

const StyledNavBarNav = styled.ul`
  max-width: 100%;
  height: 100%;
  display: flex;
  justify-content: flex-end;
  //box-sizing: content-box;

  li.nav-item {
    width: calc(var(--nav-size) * 0.8);
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .icon-button {
    --button-size: calc(var(--nav-size) * 0.5);
    width: var(--button-size);
    height: var(--button-size);
    background-color: ${props => props.theme.background};
    border-radius: 50%;
    padding: 5px;
    margin: 2px;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: filter 300ms;
  }

  .icon-button:hover {
    filter: brightness(1.2);
  }

  .icon-button svg { 
    fill: ${props => props.theme.black100};
    width: 35px;
    height: 35px;
  }

  /* Dropdown Menu */
  .dropdown {
    position: absolute;
    top: 58px;
    width: 300px;
    transform: translateX(-45%);
    background-color: ${props => props.theme.white};
    //border: 1px solid ${props => props.theme.primary100};
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
    border-radius: var(--border-radius);
    padding: 1rem;
    overflow: hidden;
    transition: height var(--speed) ease;
    z-index: 100;

    .icon-button-dd {
      --button-size: calc(var(--nav-size) * 0.5);
      width: var(--button-size);
      height: var(--button-size);
      background-color: ${props => props.theme.background};
      border-radius: 50%;
      padding: 5px;
      margin: 2px;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: filter 300ms;
    }

    .icon-button-dd:hover {
      filter: brightness(1.2);
    }

    .icon-button-dd svg {
      fill: ${props => props.theme.black100};
      width: 25px;
      height: 25px;
    }
  }

  .menu {
    width: 100%;
  }

  .menu-item {
    height: 50px;
    display: flex;
    align-items: center;
    border-radius: var(--border-radius);
    transition: background var(--speed);
    padding: .5rem;
    font-size: ${props => props.theme.fs.pl};
  }

  .menu-item .icon-button-dd {
    margin-right: 1.5rem;
  }


  .menu-item .icon-button:hover {
    filter: none;
  }

  .menu-item:hover {
    background-color: ${props => props.theme.background};
  }

  .icon-right {
    margin-left: auto;
  }

  /* CSSTransition classes  */
  .menu-primary-enter {
    position: absolute;
    transform: translateX(-110%);
  }
  .menu-primary-enter-active {
    transform: translateX(0%);
    transition: all var(--speed) ease;
  }
  .menu-primary-exit {
    position: absolute;
  }
  .menu-primary-exit-active {
    transform: translateX(-110%);
    transition: all var(--speed) ease;
  }


  .menu-secondary-enter {
    transform: translateX(110%);
  }
  .menu-secondary-enter-active {
    transform: translateX(0%);
    transition: all var(--speed) ease;
  }
  .menu-secondary-exit {

  }
  .menu-secondary-exit-active {
    transform: translateX(110%);
    transition: all var(--speed) ease;
  }
`;


export default function Header() {
  return (
    <Container>
      <Link href="/">
        <LogoText>vilkenutbildning</LogoText>
      </Link>
      <NavBar>
        <NavItem icon={<UserIcon />}>
          <DropdownMenu></DropdownMenu>
        </NavItem>
      </NavBar>
    </Container>
  )
}

function NavBar(props) {
  return (
    <StyledNavBar className="navbar">
      <StyledNavBarNav className="navbar-nav">{props.children}</StyledNavBarNav>
    </StyledNavBar>
  );
}

function NavItem(props) {
  const [open, setOpen] = useState(false);

  const handleMenuClick = () => {
    setOpen(!open);
  }

  // useEffect(() => {
  //   window.addEventListener('click', handleMenuClick);
  //   return () => {
  //     window.removeEventListener('click', handleMenuClick);
  //   }
  // }, [])

  return (
    <li className="nav-item">
      <a href="#" className="icon-button" id="user-nav" onClick={handleMenuClick}>
        {props.icon}
      </a>

      {open && props.children}
    </li>
  );
}

function DropdownMenu() {
  const [activeMenu, setActiveMenu] = useState('main');
  const [menuHeight, setMenuHeight] = useState(null);
  const dropdownRef = useRef(null);

  useEffect(() => {
    setMenuHeight(dropdownRef.current?.firstChild.offsetHeight)
  }, [])

  function calcHeight(el) {
    const height = el.offsetHeight;
    setMenuHeight(height);
  }

  function DropdownItem(props) {
    return (
      <a href="#" className="menu-item" onClick={() => props.goToMenu && setActiveMenu(props.goToMenu)}>
        <span className="icon-button-dd">{props.leftIcon}</span>
        {props.children}
        <span className="icon-right">{props.rightIcon}</span>
      </a>
    );
  }

  return (
    <div className="dropdown" style={{ height: menuHeight }} ref={dropdownRef}>

      <CSSTransition
        in={activeMenu === 'main'}
        timeout={500}
        classNames="menu-primary"
        unmountOnExit
        onEnter={calcHeight}>
        <div className="menu">
          <DropdownItem
            leftIcon={<UserIcon />}
          >
            Min profil
          </DropdownItem>
          <DropdownItem
            leftIcon={<ChoicesIcon />}
            rightIcon={<ChevronIcon />}
            goToMenu="settings">
            Mina val
          </DropdownItem>
          <DropdownItem
            leftIcon={<CogIcon />}
            rightIcon={<ChevronIcon />}
            goToMenu="animals">
            Inställningar
          </DropdownItem>

        </div>
      </CSSTransition>

      <CSSTransition
        in={activeMenu === 'settings'}
        timeout={500}
        classNames="menu-secondary"
        unmountOnExit
        onEnter={calcHeight}>
        <div className="menu">
          <DropdownItem goToMenu="main" leftIcon={<ArrowIcon />}>
            <h2>Mina val</h2>
          </DropdownItem>
          <DropdownItem leftIcon={<QuestionMarkIcon />}>Någonting 1</DropdownItem>
          <DropdownItem leftIcon={<QuestionMarkIcon />}>Någonting 2</DropdownItem>
          <DropdownItem leftIcon={<QuestionMarkIcon />}>Någonting 3</DropdownItem>
          <DropdownItem leftIcon={<QuestionMarkIcon />}>Någonting 4</DropdownItem>
        </div>
      </CSSTransition>

      <CSSTransition
        in={activeMenu === 'animals'}
        timeout={500}
        classNames="menu-secondary"
        unmountOnExit
        onEnter={calcHeight}>
        <div className="menu">
          <DropdownItem goToMenu="main" leftIcon={<ArrowIcon />}>
            <h2>Animals</h2>
          </DropdownItem>
          <DropdownItem leftIcon={<QuestionMarkIcon />}>Någonting 1</DropdownItem>
          <DropdownItem leftIcon={<QuestionMarkIcon />}>Någonting 2</DropdownItem>
          <DropdownItem leftIcon={<QuestionMarkIcon />}>Någonting 2</DropdownItem>
          <DropdownItem leftIcon={<QuestionMarkIcon />}>Någonting 4</DropdownItem>
        </div>
      </CSSTransition>
    </div>
  );
}