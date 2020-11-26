import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { listProductsByGenre } from '../../state/products/actions';

const Filter = () => {
  const [filter, setFilter] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    if (filter) {
      dispatch(listProductsByGenre(filter));
    }
  }, [filter, dispatch]);

  const handleTodosSet = () => {
    setFilter('todos');
  };

  const handleHombreSet = () => {
    setFilter('hombre');
  };

  const handleMujerSet = () => {
    setFilter('mujer');
  };

  const handleUnisexSet = () => {
    setFilter('unisex');
  };

  return (
    <div className="Filters">
      <p
        style={{ color: `${filter === 'todos' ? 'pink' : ''}` }}
        onClick={handleTodosSet}
      >
        Todos
      </p>
      <p
        style={{ color: `${filter === 'hombre' ? 'pink' : ''}` }}
        onClick={handleHombreSet}
      >
        Hombres
      </p>
      <p
        style={{ color: `${filter === 'mujer' ? 'pink' : ''}` }}
        onClick={handleMujerSet}
      >
        Mujeres
      </p>
      <p
        style={{ color: `${filter === 'unisex' ? 'pink' : ''}` }}
        onClick={handleUnisexSet}
      >
        Unisex
      </p>
    </div>
  );
};

export default Filter;
