import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ConfirmDeleteModal from './ConfirmDeleteModal';
import '../styles.css';

const Table = ({ searchQuery, users, setUsers }) => {
    const navigate = useNavigate();
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(5);
    const [userToDelete, setUserToDelete] = useState(null);

    const filteredUsers = users.filter(user => {
        const query = searchQuery.toLowerCase();
        return (
            user.name.toLowerCase().includes(query) ||
            user.email.toLowerCase().includes(query) ||
            user.phone.toLowerCase().includes(query) ||
            user.address.toLowerCase().includes(query)
        );
    });

    const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
    if (currentPage > totalPages && totalPages > 0) {
        setCurrentPage(totalPages);
    }
    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentUsers = filteredUsers.slice(startIndex, startIndex + itemsPerPage);

    const handleDeleteClick = (email) => {
        setUserToDelete(email);
    };

    const confirmDelete = () => {
        const updatedUsers = users.filter(user => user.email !== userToDelete);
        setUsers(updatedUsers);
        if ((currentPage - 1) * itemsPerPage >= updatedUsers.length && currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
        setUserToDelete(null);
    };

    const cancelDelete = () => {
        setUserToDelete(null);
    };

    const changePage = (page) => {
        setCurrentPage(page);
    };

    const handleRowsPerPageChange = (e) => {
        const newItemsPerPage = parseInt(e.target.value, 10);
        setItemsPerPage(newItemsPerPage);
        setCurrentPage(1);
    };

    return (
        <div>
            <table className="table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {currentUsers.map(user => (
                        <tr key={user.email}>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>{user.phone}</td>
                            <td>
                                <button className="delete-btn" onClick={() => handleDeleteClick(user.email)}>Delete</button>
                                <button className="details-btn" onClick={() => navigate(`/details/${user.email}`)}>Details</button>
                            </td>
                        </tr>
                    ))}
                    {currentUsers.length === 0 && (
                        <tr>
                            <td colSpan="4" style={{ textAlign: 'center' }}>No users found.</td>
                        </tr>
                    )}
                </tbody>
            </table>

            <div className="pagination-container">
                    <div className="pagination">
                        {Array.from({ length: totalPages }, (_, index) => (
                            <button
                                key={index + 1}
                                className={`page-btn ${currentPage === index + 1 ? 'active' : ''}`}
                                onClick={() => changePage(index + 1)}
                            >
                                {index + 1}
                            </button>
                        ))}
                    </div>
                <div className="rows-selector">
                    <label htmlFor="rowsPerPage">Rows</label>
                    <select id="rowsPerPage" value={itemsPerPage} onChange={handleRowsPerPageChange}>
                        <option value={5}>5</option>
                        <option value={10}>10</option>
                        <option value={15}>15</option>
                        <option value={20}>20</option>
                    </select>
                </div>
            </div>

            {userToDelete && (
                <ConfirmDeleteModal onConfirm={confirmDelete} onCancel={cancelDelete} />
            )}
        </div>
    );
};

export default Table;
