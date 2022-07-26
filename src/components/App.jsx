import { useState, useMemo } from 'react';
import Loader from './Loader';
import ContactForm from './ContactForm';
import ContactList from './ContactList';
import Filter from './Filter';
import {
  useGetContactsQuery,
  useDeleteContactMutation,
  useAddContactMutation,
} from 'redux/contactsAPI';

function App() {
  const [filter, setFilter] = useState('');
  const { data, isFetching } = useGetContactsQuery();
  const [deleteContact] = useDeleteContactMutation();
  const [addContact] = useAddContactMutation();

  const formSubmit = contact => {
    if (data.some(({ name }) => name === contact.name)) {
      alert(`${contact.name} is already in contacts`);
      return;
    }
    addContact(contact);
  };

  const handleDelete = id => deleteContact(id);

  const filteredContacts = useMemo(() => {
    if (!data) {
      return;
    }
    const normalizedFilter = filter.toLowerCase();
    return data.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  }, [data, filter]);

  return (
    <div className="section">
      <h1>Phonebook</h1>
      <ContactForm onSubmit={formSubmit} />
      <h2>Contacts</h2>
      <Filter changeFilter={setFilter} />
      <div style={{ position: 'relative' }}>
        {filteredContacts?.length > 0 && (
          <ContactList contacts={filteredContacts} deleteContact={handleDelete} />
        )}
        {isFetching && <Loader />}
      </div>
    </div>
  );
}

export { App };
