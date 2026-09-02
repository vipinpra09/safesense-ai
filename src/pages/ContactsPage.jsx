import React, { useState } from 'react';
import {
  Users,
  UserPlus,
  Phone,
  Mail,
  Edit2,
  Trash2,
  Star,
  ShieldCheck,
  Lock,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { useContacts } from '../context/ContactsContext';
import { useToast } from '../context/ToastContext';
import { Modal } from '../components/common/Modal';
import { RELATIONSHIPS } from '../utils/constants';

const EMPTY_CONTACT_FORM = {
  name: '',
  relationship: 'Spouse / Partner',
  phone: '',
  email: '',
  isPrimary: false
};

export function ContactsPage() {
  const { contacts, addContact, updateContact, deleteContact, setPrimaryContact } = useContacts();
  const { addToast } = useToast();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingContactId, setEditingContactId] = useState(null);
  const [formData, setFormData] = useState(EMPTY_CONTACT_FORM);
  const [formErrors, setFormErrors] = useState({});

  const handleOpenAddModal = () => {
    setEditingContactId(null);
    setFormData({
      ...EMPTY_CONTACT_FORM,
      isPrimary: contacts.length === 0
    });
    setFormErrors({});
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (contact) => {
    setEditingContactId(contact.id);
    setFormData({
      name: contact.name,
      relationship: contact.relationship,
      phone: contact.phone,
      email: contact.email || '',
      isPrimary: contact.isPrimary
    });
    setFormErrors({});
    setIsModalOpen(true);
  };

  const handleSaveContact = (e) => {
    e.preventDefault();
    setFormErrors({});

    if (editingContactId) {
      const res = updateContact(editingContactId, formData);
      if (res.success) {
        addToast('Contact updated successfully.', 'success');
        setIsModalOpen(false);
      } else {
        setFormErrors(res.errors || {});
      }
    } else {
      const res = addContact(formData);
      if (res.success) {
        addToast('Emergency contact added.', 'success');
        setIsModalOpen(false);
      } else {
        setFormErrors(res.errors || {});
      }
    }
  };

  const handleDelete = (id, name) => {
    if (window.confirm(`Are you sure you want to remove "${name}" from your emergency contacts?`)) {
      deleteContact(id);
      addToast(`Removed ${name} from emergency contacts.`, 'info');
    }
  };

  return (
    <div className="max-w-5xl mx-auto py-8 px-4 space-y-8">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-2xl bg-purple-50 dark:bg-purple-950 text-purple-600 dark:text-purple-400">
            <Users className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
              Emergency Contacts
            </h1>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Trusted individuals notified with 1 tap during SOS activations
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={handleOpenAddModal}
          className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 active:bg-purple-800 text-white font-bold text-sm shadow-md focus:outline-none focus:ring-4 focus:ring-purple-300 transition-all cursor-pointer shrink-0"
        >
          <UserPlus className="w-4 h-4" /> Add New Contact
        </button>
      </div>

      {/* Privacy Notice Card */}
      <div className="bg-purple-50/60 dark:bg-purple-950/20 border border-purple-200 dark:border-purple-900/40 p-4 rounded-2xl flex items-center gap-3 text-xs text-purple-950 dark:text-purple-200">
        <Lock className="w-5 h-5 text-purple-600 dark:text-purple-400 shrink-0" />
        <p>
          <strong>Privacy Isolation:</strong> Emergency contacts are stored exclusively in your browser's
          local storage. They are never uploaded to any remote server or shared without your explicit SOS action.
        </p>
      </div>

      {/* Contacts List Grid */}
      {contacts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {contacts.map((contact) => (
            <div
              key={contact.id}
              className={`p-5 rounded-2xl border transition-all flex flex-col justify-between ${
                contact.isPrimary
                  ? 'bg-gradient-to-br from-white to-purple-50/40 dark:from-slate-900 dark:to-purple-950/20 border-purple-300 dark:border-purple-800 shadow-md'
                  : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 shadow-sm'
              }`}
            >
              <div>
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div>
                    <h3 className="font-bold text-base sm:text-lg text-slate-900 dark:text-white">
                      {contact.name}
                    </h3>
                    <span className="text-xs font-semibold text-purple-600 dark:text-purple-400">
                      {contact.relationship}
                    </span>
                  </div>

                  {contact.isPrimary ? (
                    <span className="inline-flex items-center gap-1 text-[11px] font-black uppercase px-2.5 py-1 rounded-full bg-rose-100 dark:bg-rose-950 text-rose-700 dark:text-rose-300">
                      <Star className="w-3 h-3 fill-rose-500 text-rose-500" /> Primary
                    </span>
                  ) : (
                    <button
                      type="button"
                      onClick={() => setPrimaryContact(contact.id)}
                      className="text-[11px] text-slate-400 hover:text-rose-600 dark:hover:text-rose-400 font-semibold focus:outline-none"
                    >
                      Make Primary
                    </button>
                  )}
                </div>

                <div className="space-y-1.5 text-xs text-slate-600 dark:text-slate-300 my-3">
                  <div className="flex items-center gap-2">
                    <Phone className="w-3.5 h-3.5 text-slate-400" />
                    <span className="font-mono font-medium">{contact.phone}</span>
                  </div>
                  {contact.email && (
                    <div className="flex items-center gap-2">
                      <Mail className="w-3.5 h-3.5 text-slate-400" />
                      <span>{contact.email}</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-slate-100 dark:border-slate-800 gap-2">
                <a
                  href={`tel:${contact.phone}`}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 hover:bg-emerald-100 text-emerald-700 dark:text-emerald-300 font-bold text-xs transition-colors"
                >
                  <Phone className="w-3 h-3" /> Test Call
                </a>

                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    onClick={() => handleOpenEditModal(contact)}
                    aria-label={`Edit ${contact.name}`}
                    className="p-1.5 rounded-lg text-slate-500 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDelete(contact.id, contact.name)}
                    aria-label={`Delete ${contact.name}`}
                    className="p-1.5 rounded-lg text-rose-500 hover:text-rose-700 hover:bg-rose-50 dark:hover:bg-rose-950/60 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-12 text-center border border-dashed border-slate-300 dark:border-slate-700">
          <Users className="w-12 h-12 text-slate-400 mx-auto mb-3" />
          <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-1">
            No Emergency Contacts Configured
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm mx-auto mb-4">
            Add close family, friends, or doctors so they can be alerted with 1 click during an emergency.
          </p>
          <button
            type="button"
            onClick={handleOpenAddModal}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-sm shadow"
          >
            <UserPlus className="w-4 h-4" /> Add First Contact
          </button>
        </div>
      )}

      {/* Add / Edit Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingContactId ? 'Edit Emergency Contact' : 'Add Emergency Contact'}
      >
        <form onSubmit={handleSaveContact} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
              Full Name *
            </label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="e.g. Sarah Miller"
              className="w-full px-3.5 py-2 text-sm rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            {formErrors.name && (
              <p className="text-xs text-rose-500 mt-1 font-medium">{formErrors.name}</p>
            )}
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
              Relationship *
            </label>
            <select
              value={formData.relationship}
              onChange={(e) => setFormData({ ...formData, relationship: e.target.value })}
              className="w-full px-3.5 py-2 text-sm rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              {RELATIONSHIPS.map((rel) => (
                <option key={rel} value={rel}>
                  {rel}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
              Phone Number *
            </label>
            <input
              type="tel"
              required
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              placeholder="+1 (555) 000-0000"
              className="w-full px-3.5 py-2 text-sm rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500 font-mono"
            />
            {formErrors.phone && (
              <p className="text-xs text-rose-500 mt-1 font-medium">{formErrors.phone}</p>
            )}
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
              Email Address (Optional)
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="sarah@example.com"
              className="w-full px-3.5 py-2 text-sm rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            {formErrors.email && (
              <p className="text-xs text-rose-500 mt-1 font-medium">{formErrors.email}</p>
            )}
          </div>

          <div className="pt-2">
            <label className="flex items-center gap-2 cursor-pointer font-bold text-xs text-slate-800 dark:text-slate-200">
              <input
                type="checkbox"
                checked={formData.isPrimary}
                onChange={(e) => setFormData({ ...formData, isPrimary: e.target.checked })}
                className="w-4 h-4 rounded text-purple-600 focus:ring-purple-500"
              />
              <span>Set as Primary Contact (First to be dialed & alerted)</span>
            </label>
          </div>

          <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-200 dark:border-slate-800">
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="px-4 py-2 text-sm font-semibold text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-sm shadow focus:outline-none focus:ring-2 focus:ring-purple-400"
            >
              {editingContactId ? 'Update Contact' : 'Save Contact'}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
