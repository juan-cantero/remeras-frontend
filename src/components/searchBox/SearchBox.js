import { Button, Form, FormControl } from 'react-bootstrap';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

const SearchBox = () => {
  const [keyword, setKeyword] = useState('');
  const history = useHistory();

  const handleChange = (e) => {
    setKeyword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      history.push(`/search/${keyword}`);
    } else {
      history.push('/');
    }
  };

  return (
    <Form className="SearchBox" onSubmit={handleSubmit} inline>
      <FormControl
        type="text"
        name="q"
        onChange={handleChange}
        placeholder="Buscar remeras"
        className="mr-sm-2 ml-sm-1 SearchBox__input"
      />
      <Button
        type="submit"
        variant="secondary"
        className="p-2 SearchBox__button"
      >
        Buscar
      </Button>
    </Form>
  );
};

export default SearchBox;
