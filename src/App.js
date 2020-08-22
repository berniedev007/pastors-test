import React, { useState, useEffect } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { getContacts } from './actions/contacts';
import List from './components/List';
import Detail from './components/Detail';
import { Scrollbars } from 'react-custom-scrollbars';
import {Spinner} from 'react-bootstrap';
import './assets/sass/app.scss';



function App() {
  const [isShowAllContactModal, setShowAllContactModal] = useState(false);
  const [isShowUsContactModal, setShowUsContactModal] = useState(false);
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);

  //let origin_contacts = useSelector(state => state.contacts.contacts);
 
  const contacts = useSelector(state => state.contacts.contacts);
  const loading = useSelector(state => state.contacts.loading);

  const [isShowEvenContact, setShowEventContact] = useState(false);

  const dispatch = useDispatch();
  const history = useHistory();
  
  const handleShowAllContactModal = () => {
    dispatch(getContacts({
      companyId: 171,
      page: 1,
    }));
    setShowAllContactModal(true);
    setShowUsContactModal(false);
    history.push('#location=all');
  }

  const handleShowUsContactModal = () => {
    dispatch(getContacts({
      companyId: 171,
      page: 1,
      countryId: 226
    }));
    setShowAllContactModal(false);
    setShowUsContactModal(true);
    history.push('#location=us');
  }

  const handleScrollStop = () => {
    console.log('page', page);
    // dispatch(getContacts({
    //   companyId: 171,
    //   page: page + 1,
    //   countryId: 226
    // }));

    //setPage(page + 1);
  }

  const [isShowContactDetail, setShowContactDetail] = useState(false);
  const [selectedContact, setSelectedContact] = useState(null);

  const showContactDetail = (contact) => {
    setShowAllContactModal(false);
    setShowUsContactModal(false);
    setShowContactDetail(true);
    setSelectedContact(contact)
  }

  const handleShowEvenContact = () => {    
    setShowEventContact(!isShowEvenContact);
  }

  const handleQuery = (e) => {
    setQuery(e.target.value)
    //console.log('query', query);
  }


  return (
    
      <div className="App">
        <div className="inner">
          <Button className="all-contacts btn mr-10" onClick={handleShowAllContactModal}>All Contacts</Button>
          <Button className="us-contacts btn" onClick={handleShowUsContactModal}>US Contacts</Button>
        </div>

        {/* Modal for All Contacts */}
        <Modal size="lg" show={isShowAllContactModal} onHide={() => setShowAllContactModal(false)}>
          
            <Modal.Body>
              <div className="modal-header">
                <h2>All contacts</h2>
                <input type="text" id="search-contact" name="search-contact" value={query} onChange={(e) => handleQuery(e)} placeholder="Search Contact"/>
              </div>               
              {contacts.length == 0 ? 
                <Spinner animation="border" variant="success" /> : 
                <List showContactDetail={showContactDetail} contacts={contacts} page={page} setPage={setPage} query={query} isShowEvenContact={isShowEvenContact} loading={loading}/>}
            </Modal.Body>
          
          <div className="btn-groups">
            <Button className="all-contacts btn" onClick={handleShowAllContactModal}>
              All Contacts
            </Button>
            <Button className="us-contacts btn" onClick={handleShowUsContactModal}>
              US Contacts
            </Button>
            <Button className="close-btn btn" onClick={() => setShowAllContactModal(false)}>
              Close
            </Button>  
          </div>
          <Modal.Footer>
            <input type="checkbox" id="only-even" name="evencontacts" checked={isShowEvenContact} onChange={() => handleShowEvenContact()}/>
            <label htmlFor="only-even"> Only even</label>
          </Modal.Footer>          
        </Modal>

        {/* Modal for US Contacts */}
        <Modal size="lg" show={isShowUsContactModal} onHide={() => setShowUsContactModal(false)}>
          <Modal.Body>
            <div className="modal-header">
              <h2>US Contacts</h2>
              <input type="text" id="search-contact" name="search-contact" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search Contact"/>
            </div>            
            {contacts.length == 0 ? "Loading" : <List showContactDetail={showContactDetail} contacts={contacts} page={page} setPage={setPage}  query={query}  isShowEvenContact={isShowEvenContact}/>}
          </Modal.Body>
          <div className="btn-groups">
            <Button className="all-contacts btn" onClick={handleShowAllContactModal}>
              All Contacts
            </Button>
            <Button className="us-contacts btn" onClick={handleShowUsContactModal}>
              US Contacts
            </Button>
            <Button className="close-btn btn" onClick={() => setShowUsContactModal(false)}>
              Close
            </Button>  
          </div>
          <Modal.Footer>
            <input type="checkbox" id="only-even" name="evencontacts" />
            <label htmlFor="only-even"> Only even</label>
          </Modal.Footer>        
        </Modal>

        {/* Modal for Contact Detail */}
        <Modal show={isShowContactDetail} onHide={() => setShowContactDetail(false)}>
          <Modal.Body>
            <h2>Contact Detail</h2>
            {
                selectedContact !== null && (
                  <Detail selectedContact={selectedContact} />
            )}            
          </Modal.Body>
          <div className="single-btn">            
            <Button className="close-btn btn" onClick={() => setShowContactDetail(false)}>
              Close
            </Button>  
          </div>        
        </Modal>
      </div>
  );
}

export default App;
