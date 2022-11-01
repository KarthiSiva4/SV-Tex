import React, { useState, useCallback, useEffect, useRef } from "react";
import Gallery from "react-photo-gallery";
import Carousel, { Modal, ModalGateway } from "react-images";
import Loader from './Loader'
import { getStorage, ref, listAll, getDownloadURL } from "firebase/storage";

export default function GalleryView() {
  const [currentImage, setCurrentImage] = useState(0);
  const [viewerIsOpen, setViewerIsOpen] = useState(false);
  const [files, setFiles] = useState([]);
  const counter = useRef(0);

  useEffect(() => {
    const fetchImages = async () => {
      const storage = getStorage();
      const listRef = ref(storage, 'Gallery');
      const promises = await listAll(listRef);
      return await Promise.all(promises.items);
    }

    const loadImages = async () => {
      counter.current += 1;
      const lists = await fetchImages();
      const url = await Promise.all(lists.map(a => getDownloadURL(a)));
      let urlObj = [];
      url.map(u => {
        urlObj.push({ src: u, width: 2, height: 2 });
      })
      setFiles(urlObj);
      if (counter.current >= urlObj.length) {
        return <Loader />;
      }
    }

  }, []);

  const openLightbox = useCallback((event, { photo, index }) => {
    setCurrentImage(index);
    setViewerIsOpen(true);
  }, []);

  const closeLightbox = () => {
    setCurrentImage(0);
    setViewerIsOpen(false);
  };
  return (
    <div>
      {files.length === 0 ? <Loader /> :
        <div>
          {/* <Gallery photos={files} onClick={openLightbox} onLoad={loadImages()} /> */}
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

