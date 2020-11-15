import React from 'react';

const Whatapps = ({ phoneNumber }) => {
  return (
    <a
      className="Whatsapp"
      target="_blank"
      href={`https://api.whatsapp.com/send?phone=${phoneNumber}`}
    >
      {' '}
    </a>
  );
};

export default Whatapps;
