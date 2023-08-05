import { NavLink as ReactLink, useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    NavbarText,
} from 'reactstrap';
import { getCurrentUserData, isLoggedIn } from '../services/auth-service';
import { doLogout } from '../services/auth-service';
import { toast } from 'react-toastify';

const CustomNavbar = () => {

    const [isOpen, setIsOpen] = useState(false);
    const [loggedIn, setLoggedIn] = useState(false);
    const [userData, setUserData] = useState(undefined);
    let navigate = useNavigate();

    useEffect(() => {
        setLoggedIn(isLoggedIn());
        setUserData(getCurrentUserData());
    }, [loggedIn]);

    const toggle = () => setIsOpen(!isOpen);

    const logout = () => {
        doLogout(() => {
            setLoggedIn(false);
            navigate("/");
            toast.info("User Logged out!!")
        });
    }

    return (
        <div>
            <Navbar
                color="dark"
                dark
                expand="md"
                fixed=""
                className="px-5"
            >
                <NavbarBrand tag={ReactLink} to="/">MyBlogs</NavbarBrand>
                <NavbarToggler onClick={toggle} />
                <Collapse isOpen={isOpen} navbar>
                    <Nav className="me-auto" navbar>
                        <NavItem>
                            <NavLink tag={ReactLink} to="/">New Feed</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink tag={ReactLink} to="/services">Services</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink href="https://github.com">GitHub</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink tag={ReactLink} to="/about">About</NavLink>
                        </NavItem>
                        <NavbarText className='mx-2'>Contact</NavbarText>
                        <UncontrolledDropdown nav inNavbar>
                            <DropdownToggle nav caret>More</DropdownToggle>
                            <DropdownMenu>
                                <DropdownItem>LinkedIn</DropdownItem>
                                <DropdownItem>Instagram</DropdownItem>
                                <DropdownItem>Facebook</DropdownItem>
                                <DropdownItem divider />
                                <DropdownItem>Help</DropdownItem>
                                <DropdownItem tag={ReactLink} to="/services">Services</DropdownItem>
                            </DropdownMenu>
                        </UncontrolledDropdown>
                    </Nav>
                    <Nav navbar>
                        {
                            loggedIn && (
                                <>
                                    <NavItem>
                                        <NavLink tag={ReactLink} to="/user/profile">{userData?.name}</NavLink>
                                    </NavItem>
                                    <NavItem>
                                        <NavLink tag={ReactLink} to="/user/dashboard">Dashboard</NavLink>
                                    </NavItem>
                                    <NavItem>
                                        <NavLink tag={ReactLink} onClick={logout} to="/">Logout</NavLink>
                                    </NavItem>
                                </>
                            )
                        }
                        {
                            !loggedIn && (
                                <>
                                    <NavItem>
                                        <NavLink tag={ReactLink} to="/login">Login</NavLink>
                                    </NavItem>
                                    <NavItem>
                                        <NavLink tag={ReactLink} to="/signup">Signup</NavLink>
                                    </NavItem>
                                </>
                            )
                        }
                    </Nav>
                </Collapse>
            </Navbar>
        </div>
    );
}

export default CustomNavbar;
