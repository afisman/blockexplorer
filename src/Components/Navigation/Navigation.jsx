import { Nav, Navbar, Container } from 'react-bootstrap'

import './Navigation.css'

const Navigation = () => {



    return (
        <Navbar bg="dark" variant="dark">
            <Container>
                <Navbar.Brand href="#home">Seposcan</Navbar.Brand>
                <Nav className="me-auto">
                    <Nav.Link href="/">Home</Nav.Link>
                    {/* <Nav.Link href="">Features</Nav.Link>
                    <Nav.Link href="#pricing">Pricing</Nav.Link> */}
                </Nav>
            </Container>
        </Navbar>
    )
}

export default Navigation