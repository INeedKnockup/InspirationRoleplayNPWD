import React from 'react';
import { SearchContacts } from './SearchContacts';
import { Link, useHistory } from 'react-router-dom';
import { useFilteredContacts } from '../../hooks/state';
import { Contact } from '@typings/contact';
import { classNames } from '@utils/css';

export const ContactList: React.FC = () => {
  const filteredContacts = useFilteredContacts();
  const history = useHistory();

  // FIXME: This should be reduced before being passed to the component
  const groupedContacts = filteredContacts.reduce((r, e) => {
    const group = e.display.charAt(0).toUpperCase();
    if (!r[group]) r[group] = { group, contacts: [e] };
    else r[group].contacts.push(e);

    return r;
  }, []);

  return (
    <div>
      <SearchContacts />
      <div className="mt-4 px-4">
        <nav className="overflow-y-auto" aria-label="Directory">
          {Object.keys(groupedContacts)
            .sort()
            .map((letter) => (
              <div key={letter} className="relative">
                <div className="sticky top-0 z-10 border-t border-b border-gray-200 bg-neutral-50 px-6 py-1 text-sm font-medium text-gray-500 dark:border-none dark:bg-neutral-800">
                  <h3>{letter}</h3>
                </div>
                <ul
                  role="list"
                  className="relative z-0 divide-y divide-neutral-200 dark:divide-neutral-800"
                >
                  {groupedContacts[letter].contacts.map((contact: Contact) => (
                    <li key={contact.id} className="dark:bg-neutral-900">
                      <div
                        className={classNames(
                          'relative flex items-center space-x-3 px-6 py-5',
                          'hover:dark:bg-neutral-800/50',
                        )}
                      >
                        <div className="min-w-0 flex-1">
                          <Link to={`/contacts/${contact.id}`} className="focus:outline-none">
                            {/* Extend touch target to entire panel */}
                            <span className="absolute inset-0" aria-hidden="true" />
                            <p className="text-sm font-medium text-neutral-900 dark:text-neutral-100">
                              {contact.display}
                            </p>
                          </Link>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
        </nav>
      </div>
    </div>
  );
};
