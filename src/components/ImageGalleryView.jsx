import React, { useEffect } from "react";
import "react-image-gallery/styles/css/image-gallery.css";
import ImageGallery from "react-image-gallery";
import { collection, query, onSnapshot } from "firebase/firestore"
import { db } from './firebase';
import { getStorage, ref, listAll, getDownloadURL } from "firebase/storage";

const ImagesGallery = () => {
  const [images, setImages] = React.useState(null);

  useEffect(() => {
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
      let tempImages = [];
      for (let i = 0; i < url.length; i++) {
        tempImages.push({
          original:url[i],
          thumbnail:url[i]
        })
        
      }
      setImages(tempImages);
    }
    loadImages();

  }, []);
  const imagesNew = [
    {
      original: 'https://firebasestorage.googleapis.com/v0/b/sv-tex.appspot.com/o/Gallery%2FIMG_20211222_092243.jpg?alt=media&token=a2e68dda-92ca-4d0b-ab73-bf3dc7ae0482',
      thumbnail: 'https://firebasestorage.googleapis.com/v0/b/sv-tex.appspot.com/o/Gallery%2FIMG_20211222_092243.jpg?alt=media&token=a2e68dda-92ca-4d0b-ab73-bf3dc7ae0482=w50',
    },
    {
      original: 'https://picsum.photos/id/1015/1000/600/',
      thumbnail: 'https://picsum.photos/id/1015/250/150/',
    },
    {
      original: 'https://picsum.photos/id/1019/1000/600/',
      thumbnail: 'https://picsum.photos/id/1019/250/150/',
    },
  ];
  /* React.useEffect(() => {
    let shouldCancel = false;

    const call = async () => {
      const response = await axios.get(
        "https://google-photos-album-demo2.glitch.me/4eXXxxG3rYwQVf948"
      );
      if (!shouldCancel && response.data && response.data.length > 0) {
        setImages(
          response.data.map(url => ({
            original: `${url}=w1024`,
            thumbnail: `${url}=w100`
          }))
        );
      }
    };
    call();
    return () => (shouldCancel = true);
  }, []); */

  return images ? <ImageGallery items={images} /> : null;
};

export default ImagesGallery;
