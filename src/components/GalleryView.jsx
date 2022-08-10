import React, { useState, useCallback, useEffect } from "react";
// import { render } from "react-dom";
import Gallery from "react-photo-gallery";
import Carousel, { Modal, ModalGateway } from "react-images";
// import { photos } from "./photos";

import { makeStyles } from '@mui/styles';

import { collection, query, onSnapshot } from "firebase/firestore"
import { db } from './firebase';
import Loader from './Loader'
import { getStorage, ref, listAll, getDownloadURL } from "firebase/storage";

/* const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
})); */

export default function GalleryView() {
  const [currentImage, setCurrentImage] = useState(0);
  const [viewerIsOpen, setViewerIsOpen] = useState(false);
  const [files, setFiles] = useState([]);

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
      let urlObj =[];
      url.map(u =>{
        urlObj.push({
          src : u,
        width : 4,
        height : 3
        });
      })
      setFiles(urlObj);
    }
    loadImages();

  }, []);

  const openLightbox = useCallback((event, { photo, index }) => {
    setCurrentImage(index);
    setViewerIsOpen(true);
  }, []);

  const closeLightbox = () => {
    setCurrentImage(0);
    setViewerIsOpen(false);
  };
  // const classes = useStyles();
  return (
    <div>
    {files.length === 0 ? <Loader /> :
    <div>
      {/* <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            News
          </Typography>
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>
    </div> */}

      <Gallery photos={files} onClick={openLightbox} />
      <ModalGateway>
        {viewerIsOpen ? (
          <Modal onClose={closeLightbox}>
            <Carousel
              currentIndex={currentImage}
              views={files.map(x => ({
                ...x,
                srcset: x.srcSet,
                caption: x.title
              }))}
            />
          </Modal>
        ) : null}
      </ModalGateway>
    </div>
    }
    </div>
  );
}

