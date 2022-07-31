import React from 'react';
import { useEffect, useState } from 'react';
import { collection, query, onSnapshot } from "firebase/firestore"
import { db } from './firebase';

function Contact() {
    const [contacts, setContact] = useState([]);
    useEffect(() => {
        const q = query(collection(db, 'contact'));
        onSnapshot(q, (querySnapshot) => {
            setContact(querySnapshot.docs.map(doc => (
                doc.data()
            )))
        })
    }, []);

    return (
        <div>
            {contacts.map((contact) => (
                <div>
                    <p>{contact.name}</p>
                    <p>{contact.phone1}</p>
                    <p>{contact.phone2}</p>
                </div>
            ))}
        </div>
    )
}

export default Contact;
