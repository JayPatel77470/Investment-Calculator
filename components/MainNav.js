import React from 'react'
import Navbar  from 'react-bootstrap/Navbar'
import Container from 'react-bootstrap/Container'



const MainNav = () => {
    return (
        <>
            <Navbar bg="primary" variant="dark">
                <Container>
                    <Navbar.Brand href="#home">
                        Investment Calculator
                    </Navbar.Brand>
                </Container>
            </Navbar>
        </>
    )
}

export default MainNav
