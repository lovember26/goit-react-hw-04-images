import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Container } from './App.styled';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { Loader } from 'components/Loader/Loader';
import { Button } from 'components/Button/Button';
import { Modal } from 'components/Modal/Modal';
import { getImg } from 'services/getImg';
import { Wrapper } from 'components/ImageGallery/ImageGallery.styled';
import { useEffect, useState } from 'react';

export const App = () => {
  const [value, setValue] = useState('');
  const [gallery, setGallery] = useState([]);
  const [totalImg, setTotalImg] = useState(0);
  const [page, setPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalUrl, setModalUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (value) {
      setIsLoading(true);
      try {
        getImg(value, page)
          .then(data => {
            if (data.total === 0) {
              Notify.failure('No results found!');
            }

            setGallery(prevState => {
              return page === 1 ? data.hits : [...prevState, ...data.hits];
            });
            setTotalImg(data.totalHits);
          })
          .finally(() => setIsLoading(false));
      } catch (error) {
        console.log(error);
      }
    }
  }, [page, value]);

  const onClick = () => {
    setPage(prevState => prevState + 1);
  };

  const handleModal = url => {
    setIsModalOpen(true);
    setModalUrl(url);
  };

  const closeModal = ({ target }) => {
    if (target.nodeName !== 'IMG') {
      setIsModalOpen(false);
    }
  };

  const onSubmit = query => {
    if (query.trim() === '') {
      Notify.info('Enter search query!');
    } else {
      setValue(query);
      setPage(1);
      setGallery([]);
    }
  };

  return (
    <Container>
      <Searchbar onSubmit={onSubmit} />
      <Wrapper>
        <ImageGallery gallery={gallery} handleModal={handleModal} />
        {gallery.length < totalImg && isLoading === false && (
          <Button onClick={onClick} />
        )}
        {isLoading && <Loader />}
        {isModalOpen && <Modal url={modalUrl} closeModal={closeModal} />}
      </Wrapper>
    </Container>
  );
};
