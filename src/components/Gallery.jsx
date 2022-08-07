import React from 'react';
import { useEffect, useState } from 'react';
import { collection, query, onSnapshot } from "firebase/firestore"
import { db } from './firebase';
import Loader from './Loader'
import { ImageList, ImageListItem } from '@mui/material';

function Gallery() {
    const [gallery, setGallery] = useState([]);
    useEffect(() => {
        const q = query(collection(db, 'gallery'));
        onSnapshot(q, (querySnapshot) => {
            setGallery(querySnapshot.docs.map(doc => (
                doc.data()
            )))
        })
    }, []);

    return (
        <div>{gallery.length === 0 ? <Loader /> :
            <ImageList sx={{ width: 500, height: 450 }} cols={3} rowHeight={164} gap={10}>
      {gallery.map((item) => (
        <ImageListItem key={item.url}>
          <img
            src={`${item.url}?w=164&h=164&fit=crop&auto=format`}
            srcSet={`${item.url}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
            alt="images"
            loading="lazy"
          />
        </ImageListItem>
      ))}
    </ImageList>
    }
        </div>
    )
}

export default Gallery;
