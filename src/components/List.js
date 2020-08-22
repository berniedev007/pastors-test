import React, { useEffect, useState, useRef } from 'react';
import { Scrollbars } from 'react-custom-scrollbars';
import { useSelector, useDispatch } from "react-redux";
import { getContacts } from '../actions/contacts';
import { Table, Spinner } from 'react-bootstrap';

const List = ({showContactDetail, setPage, contacts, page, query, isShowEvenContact}) => {
  console.log('query', query);
  const [isFetching, setIsFetching] = useState(false);
  const dispatch = useDispatch();
  const el = useRef();

  function handleScroll(e) {
      if (window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight) 
          return;
      setIsFetching(true);
      //console.log('Fetch more list items!', document.documentElement, window.innerHeight, document.documentElement.scrollTop, document.documentElement.offsetHeight);
  }
  
  useEffect(() => {
    if (!isFetching) return;
    fetchMoreListItems();
  }, [isFetching]);
  
  async function fetchMoreListItems() {
    await dispatch(getContacts({
      companyId: 171,
      page: page + 1,
      query: query
    }));
    setPage(page + 1);
    setIsFetching(false);
  }

  return (
    <>
      <ul className="list-group mb-2">
        <Scrollbars ref={el} style={{ width: '100%' }} autoHeight onScroll={()=> handleScroll()}>
          <Table  striped bordered hover responsive>
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
              {
                contacts.filter(contact => {
                  return isShowEvenContact ? contact.id % 2 == 0 : true;
                }).filter(contact => {
                  return query ? (contact.first_name && contact.first_name.includes(query)) || (contact.last_name && contact.last_name.includes(query)) : true;
                }).map((contact, index) =>
                    <tr key={index} onClick={() => showContactDetail(contact)}>
                      <td>{contact.id}</td>
                      <td>{contact.first_name}</td>
                      <td>{contact.last_name}</td>
                      <td>{contact.email}</td>
                      <td>{contact.country.iso}</td>
                    </tr>
              )}
            </tbody>
          </Table>
        </Scrollbars>
      </ul>
      {isFetching && <Spinner animation="border" variant="success" /> }
    </>
  );
};

export default List;