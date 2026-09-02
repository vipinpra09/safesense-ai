import React, { createContext, useContext, useState, useEffect } from 'react';
import { STORAGE_KEYS } from '../utils/constants';
import { storageService } from '../services/storageService';
import { validateContact } from '../utils/validators';

const ContactsContext = createContext();

const INITIAL_DEFAULT_CONTACTS = [
  {
    id: 'contact-default-1',
    name: 'Sarah Miller',
    relationship: 'Spouse / Partner',
    phone: '+1 (555) 234-5678',
    email: 'sarah.m@example.com',
    priority: 1,
    notifyViaSms: true,
    notifyViaCall: true,
    isPrimary: true,
  },
  {
    id: 'contact-default-2',
    name: 'Dr. Robert Chen',
    relationship: 'Primary Physician',
    phone: '+1 (555) 987-6543',
    email: 'dr.chen@clinic.org',
    priority: 2,
    notifyViaSms: true,
    notifyViaCall: false,
    isPrimary: false,
  },
];

export function ContactsProvider({ children }) {
  const [contacts, setContacts] = useState(() => {
    return storageService.getItem(STORAGE_KEYS.CONTACTS, INITIAL_DEFAULT_CONTACTS);
  });

  useEffect(() => {
    storageService.setItem(STORAGE_KEYS.CONTACTS, contacts);
  }, [contacts]);

  const addContact = (contactData) => {
    const { isValid, errors } = validateContact(contactData);
    if (!isValid) {
      return { success: false, errors };
    }

    const newContact = {
      id: 'contact-' + Date.now() + '-' + Math.random().toString(36).substr(2, 4),
      ...contactData,
      priority: contacts.length + 1,
      isPrimary: contacts.length === 0 ? true : Boolean(contactData.isPrimary),
    };

    let updated = [...contacts];
    if (newContact.isPrimary) {
      updated = updated.map((c) => ({ ...c, isPrimary: false }));
    }
    updated.push(newContact);

    setContacts(updated);
    return { success: true, contact: newContact };
  };

  const updateContact = (id, updatedFields) => {
    const existing = contacts.find((c) => c.id === id);
    if (!existing) {
      return { success: false, errors: { general: 'Contact not found.' } };
    }

    const merged = { ...existing, ...updatedFields };
    const { isValid, errors } = validateContact(merged);
    if (!isValid) {
      return { success: false, errors };
    }

    let updated = contacts.map((c) => {
      if (c.id === id) {
        return merged;
      }
      if (merged.isPrimary) {
        return { ...c, isPrimary: false };
      }
      return c;
    });

    setContacts(updated);
    return { success: true, contact: merged };
  };

  const deleteContact = (id) => {
    let updated = contacts.filter((c) => c.id !== id);
    // If we deleted the primary contact and have others, make the first one primary
    if (updated.length > 0 && !updated.some((c) => c.isPrimary)) {
      updated = updated.map((contact, index) => ({
        ...contact,
        isPrimary: index === 0,
      }));
    }
    setContacts(updated);
    return { success: true };
  };

  const setPrimaryContact = (id) => {
    const updated = contacts.map((c) => ({
      ...c,
      isPrimary: c.id === id,
    }));
    setContacts(updated);
  };

  const clearAllContacts = () => {
    setContacts([]);
  };

  return (
    <ContactsContext.Provider
      value={{
        contacts,
        addContact,
        updateContact,
        deleteContact,
        setPrimaryContact,
        clearAllContacts,
      }}
    >
      {children}
    </ContactsContext.Provider>
  );
}

export function useContacts() {
  const context = useContext(ContactsContext);
  if (!context) {
    throw new Error('useContacts must be used within a ContactsProvider');
  }
  return context;
}
