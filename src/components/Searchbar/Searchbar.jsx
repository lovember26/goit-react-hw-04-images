import { useState } from 'react';
import { Header, Form, Button, Label, Input } from './Searchbar.styled';
import PropTypes from 'prop-types';

export const Searchbar = ({ onSubmit }) => {
  const [value, setValue] = useState('');

  const onChange = ({ target }) => {
    setValue(target.value);
  };
  const handleSubmit = e => {
    e.preventDefault();
    onSubmit(value);
    setValue('');
  };

  return (
    <Header className="searchbar">
      <Form className="form" onSubmit={handleSubmit}>
        <Button type="submit" className="button">
          <Label className="button-label">Search</Label>
        </Button>

        <Input
          className="input"
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          onChange={onChange}
          value={value}
        />
      </Form>
    </Header>
  );
};

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
