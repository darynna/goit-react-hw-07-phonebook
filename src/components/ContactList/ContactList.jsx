import { ContactListItem } from 'components/ContactListItem/ContactListItem';
import {ContactsList} from "./ContactList.styled"
import { useDispatch, useSelector } from 'react-redux';
import { deleteContact, fetchContacts} from 'redux/reducer';
import { selectContacts, selectError, selectFilter, selectisLoading } from 'redux/selectors';
import { useEffect } from 'react';
import { Loading } from 'components/isLoading';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

export const ContactList = () => {

  const dispatch = useDispatch()

  const contacts = useSelector(selectContacts) 
  const filter = useSelector(selectFilter)
  const isLoading = useSelector(selectisLoading)
  const error = useSelector(selectError)

  useEffect(()=>{
    dispatch(fetchContacts());
}, [dispatch])

const filteredContacts = contacts !== null && contacts.filter(({ name }) => name.toLowerCase().includes(filter.toLowerCase()));

  const handleDeleteContacts = contactId => {
    dispatch(deleteContact(contactId))
  };

  return (

<>
    {isLoading && <Loading/>}
    {error && Notify.failure('Sorry, something went wrong!')}

    <ContactsList>
      {filteredContacts && filteredContacts.map(contact => (
        <ContactListItem key={contact.id} contact={contact} handleDeleteContacts={handleDeleteContacts}/>
      ))}
    </ContactsList>
    </>
  );
};
