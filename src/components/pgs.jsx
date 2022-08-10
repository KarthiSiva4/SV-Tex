import React from 'react';
import { useEffect, useState } from 'react';
import { collection, query, onSnapshot } from "firebase/firestore"
import { db } from './firebase';
import Loader from './Loader'
import { CardMedia, ImageList, ImageListItem } from '@mui/material';
import { Box } from '@mui/system';
import { getStorage, ref, listAll, getDownloadURL } from "firebase/storage";


function Gallery() {
  const [gallery, setGallery] = useState([]);
  const [files, setFiles] = useState([]);

  useEffect(() => {
    const q = query(collection(db, 'gallery'));
    onSnapshot(q, (querySnapshot) => {
      setGallery(querySnapshot.docs.map(doc => (
        doc.data()
      )))
      loadImages();
    })
    const fetchImages = async () => {
      const storage = getStorage();
      const listRef = ref(storage, 'Gallery');
      const promises = await listAll(listRef);
      return await Promise.all(promises.items);
    }

    const loadImages = async () => {
      const lists = await fetchImages();
      const url = await Promise.all(lists.map(a => getDownloadURL(a)));
      console.log(url);
      setFiles(url);
    }

  }, []);

  return (
    <div>{files.length === 0 ? <Loader /> :
      // <ImageList sx={{ width: 500, height: 450 }} cols={3} rowHeight={164} gap={10}>
      <div>
        {files.map((item) => (
           <CardMedia
           component="img"
           height="50"
           width="50"
           image={item}
           alt="green iguana"
         />
        ))}</div>
    }
    </div>
  )
}

export default Gallery;
