import React, { useState, useEffect } from 'react';
import Table from './components/Table';
import SearchBar from './components/SearchBar';
import CreateUserModal from './components/CreateUserModal';
import './styles.css';

const App = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [users, setUsers] = useState([]);

  const isInitialMount = React.useRef(true);

  useEffect(() => {
    if (isInitialMount.current) {
      const storedUsers = localStorage.getItem('users');
      const createdUsers = JSON.parse(storedUsers);
      console.log("createdUsers: ", createdUsers);
      if (createdUsers?.length > 0) {
        setUsers(createdUsers);
      } else {
        const defaultUsers = [
          { name: 'James', email: 'james@gmail.com', phone: '8583453234', address: '123 Street, NY' },
          { name: 'Clara', email: 'clara@gmail.com', phone: '9983423854', address: '456 Avenue, CA' },
          { name: 'Wayne', email: 'wayne@gmail.com', phone: '4348273323', address: '789 Blvd, TX' },
          { name: 'Maya', email: 'maya@gmail.com', phone: '9920558566', address: '321 Road, FL' },
        ];
        setUsers(defaultUsers);
        localStorage.setItem('users', JSON.stringify(defaultUsers));
      }
      isInitialMount.current = false;
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('users', JSON.stringify(users));
  }, [users]);

  return (
    <div className="container">
      <div className="header">
        <h1>User Management</h1>
        <button className="create-btn" onClick={() => setShowModal(true)}>+ Create User</button>
      </div>
      <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <Table searchQuery={searchQuery} users={users} setUsers={setUsers} />
      {showModal && <CreateUserModal onClose={() => setShowModal(false)} setUsers={setUsers} />}
    </div>
  );
};

export default App;
