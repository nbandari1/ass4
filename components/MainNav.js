// components/MainNav.js
import { Navbar, Nav, Form, FormControl, Button } from 'react-bootstrap';
import Link from 'next/link';
import { useRouter } from 'next/router';

const MainNav = () => {
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    const searchField = e.target.searchField.value;
    router.push(`/artwork?title=true&q=${searchField}`);
  };

  return (
    <>
      <Navbar className="fixed-top navbar-dark bg-primary" expand="lg">
        <Navbar.Brand>Nishnath Bandari</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Link href="/" passHref>
              <Nav.Link>Home</Nav.Link>
            </Link>
            <Link href="/search" passHref>
              <Nav.Link>Advanced Search</Nav.Link>
            </Link>
          </Nav>
          <Form className="d-flex" onSubmit={handleSubmit}>
            <FormControl
              type="text"
              placeholder="Search"
              className="mr-sm-2"
              name="searchField"
            />
            <Button variant="outline-success" type="submit">
              Search
            </Button>
          </Form>
        </Navbar.Collapse>
      </Navbar>
      <br />
      <br />
    </>
  );
};

export default MainNav;
