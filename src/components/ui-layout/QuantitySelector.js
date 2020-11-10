import React from 'react';
import { FormControl } from 'react-bootstrap';

const QuantitySelector = ({ quantity, selected, handleSelectChange }) => {
  return (
    <FormControl as="select" value={selected} onChange={handleSelectChange}>
      {[...Array(quantity).keys()].map((x) => {
        return (
          <option key={x + 1} value={x + 1}>
            {x + 1}
          </option>
        );
      })}
    </FormControl>
  );
};

export default QuantitySelector;
