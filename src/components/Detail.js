import React from 'react';
import { Table } from 'react-bootstrap';

const Detail = ({selectedContact}) => {
    console.log('selectedContact', selectedContact);
    return (
        <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>ID</th>                
                <th>First Name</th>
                <th>Last Name</th>
                <th>Email</th>
                <th>Country</th>
              </tr>
            </thead>
            <tbody>
                <tr>
                    <td>{selectedContact.id}</td>
                    <td>{selectedContact.first_name}</td>
                    <td>{selectedContact.last_name}</td>
                    <td>{selectedContact.email}</td>
                    <td>{selectedContact.country.iso}</td>
                </tr>   
            </tbody>
        </Table>
    )
}

export default Detail;