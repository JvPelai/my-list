import React from 'react';

const PermanentDrawerRight: React.FC = () => {
  return (
    <div className="d-flex flex-column position-fixed end-0 text-white p-3 bg-dark mt-2 w-auto vh-100">
      <h1 className="mx-3">Sidebar</h1>
      <hr />
      <ul className="nav nav-pills flex-column mb-auto">
        <li className="nav-item">
          <a href="/" className="nav-link active">
            {' '}
            Home{' '}
          </a>
        </li>
      </ul>
      <hr />
    </div>
  );
};

export { PermanentDrawerRight };
