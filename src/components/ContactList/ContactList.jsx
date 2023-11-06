import { ContactListItem } from 'components/ContactListItem/ContactListItem';
import {ContactsList} from "./ContactList.styled"
import { useDispatch, useSelector } from 'react-redux';
import { deleteContacts} from 'redux/reducer';
import { getContacts, getFilter } from 'redux/selectors';

export const ContactList = () => {

  const dispatch = useDispatch()

  const contacts = useSelector(getContacts) 
  const filter = useSelector(getFilter)
  const filteredContacts = contacts.filter(({name}) => name.toLowerCase().includes(filter.toLowerCase()));

  const handleDeleteContacts = contactId => {
    dispatch(deleteContacts(contactId))
  };

  return (
    <ContactsList>
      {filteredContacts.map(contact => (
        <ContactListItem key={contact.id} contact={contact} handleDeleteContacts={handleDeleteContacts}/>
      ))}
    </ContactsList>
  );
};
