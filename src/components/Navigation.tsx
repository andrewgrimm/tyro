import React, { SyntheticEvent, useState } from 'react';
import {
  Button,
  Form,
  FormGroup,
  Input,
  Navbar,
  NavbarBrand,
  Nav,
  NavItem,
} from 'reactstrap';

interface props {
  search: (text: string) => void,
}

const Navigation = ({ search }: props) => {
  const [searchText, setSearchText] = useState('');

  const submitSearch = (event: SyntheticEvent) => {
    event.preventDefault();
    search(searchText);
  };

  return (
    <div>
      <Navbar
        className="navbar shadow-sm p-3 mb-4 bg-white rounded"
        color="light"
        expand="md"
        fixed="top"
        light
        style={{ position: 'sticky' }}
      >
        <NavbarBrand>GetFlix</NavbarBrand>
        <Nav className="mr-auto" navbar>
          <NavItem>
            <Form inline onSubmit={submitSearch}>
              <FormGroup>
                <Input
                  data-testid="searchInput"
                  id="searchText"
                  name="search"
                  onChange={(e) => setSearchText(e.currentTarget.value)}
                  placeholder="Title, Year ..."
                  type="text"
                />
              </FormGroup>
            </Form>
          </NavItem>
          <NavItem className="mx-2">
            <Button
              data-testid="searchButton"
              onClick={submitSearch}
            >
              Search
            </Button>
          </NavItem>
        </Nav>
      </Navbar>
    </div>
  );
};

export default Navigation;
