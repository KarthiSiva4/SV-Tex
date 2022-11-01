import React from 'react';
import { useEffect, useState } from 'react';
import { collection, query, onSnapshot } from "firebase/firestore"
import { db } from './firebase';
import Loader from './Loader'
import { Card, CardActionArea, CardContent, CardMedia, Tooltip, Typography } from '@mui/material';
import CallIcon from '@mui/icons-material/Call';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PersonPinIcon from '@mui/icons-material/Person';

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
        <div>{contacts.length === 0 ? <Loader /> :
            <Card sx={{ maxWidth: 345, marginTop: 5 }}>
                <CardActionArea>
                    <CardMedia
                        component="img"
                        height="140"
                        image="https://thumbs.dreamstime.com/z/indian-saree-design-19704685.jpg"
                        alt="green iguana"
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            SVTex
                        </Typography>
                        {contacts.map((contact) => (
                            <div key={contact.name}>
                                <div><p className="phoneIcon"><PersonPinIcon color="primary" sx={{ display: 'flex', mr: 1 }} />{contact.name}</p></div>
                                <div><p className="phoneIcon"><a href="https://www.google.com/maps/place/?q=place_id:ChIJ07JGwNnlqzsR70sw2IwaFzI" target="_blank" rel="noopener noreferrer"><Tooltip title="Click to open map" arrow placement="top-start"><LocationOnIcon color="primary" sx={{ display: 'flex', mr: 1 }} /></Tooltip></a>{contact.address}</p></div>
                                <div><p className="phoneIcon"><a href={"tel:" + contact.phone1}><Tooltip title="Click to call" arrow placement="top-start"><CallIcon color="primary" sx={{ display: 'flex', mr: 1 }} /></Tooltip></a>{contact.phone1}</p>
                                    <p className="phoneIcon"> <a href={"tel:" + contact.phone2}><Tooltip title="Click to call" arrow placement="top-start"><CallIcon color="primary" sx={{ display: 'flex', mr: 1 }} /></Tooltip></a>{contact.phone2}</p></div>
                            </div>
                        ))}
                    </CardContent>
                </CardActionArea>
            </Card>}
        </div>
    )
}

export default Contact;
