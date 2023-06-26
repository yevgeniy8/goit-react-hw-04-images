import Searchbar from '../Searchbar/Searchbar';
import ImageGallery from '../ImageGallery/ImageGallery';
import Button from '../Button/Button';
import Loader from '../Loader/Loader';
import Modal from '../Modal/Modal';

import { pixabayApi } from 'helpers/pixabay-api';

import { WrapperApp } from './App.styled';
import { useState, useEffect } from 'react';

export const App = () => {
    const [text, setText] = useState('');
    const [collections, setCollections] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPage, setTotalPage] = useState(0);
    const [isLoading, setIsLoaging] = useState(false);
    const [largeImageURL, setLargeImageURL] = useState('');
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        if (text === '') {
            return;
        }
        const fetchApi = async () => {
            try {
                setIsLoaging(true);
                const data = await pixabayApi(text, page);
                const totalPage = data.total / 12;
                setTimeout(() => {
                    setCollections(prevState => [...prevState, ...data.hits]);
                    setTotalPage(totalPage);
                    setIsLoaging(false);
                }, 1000);
            } catch (error) {
                console.log(error);
            }
        };

        fetchApi();
    }, [page, text]);

    const addInputValue = text => {
        setText(text);
        setPage(1);
        setCollections([]);
    };

    const onClickButton = () => {
        setPage(prevState => prevState + 1);
    };

    const toggleModal = () => {
        setShowModal(prevState => !prevState);
    };

    const openModal = id => {
        setIsLoaging(true);
        const largeImage = collections.find(item => item.id === id);

        setTimeout(() => {
            setLargeImageURL(largeImage.largeImageURL);
            setIsLoaging(false);

            toggleModal();
        }, 500);
    };

    return (
        <WrapperApp>
            <Searchbar onSubmit={addInputValue} />

            {isLoading && <Loader />}

            {collections.length > 0 && (
                <>
                    <ImageGallery
                        collections={collections}
                        openModal={openModal}
                    />
                    {page < totalPage && <Button onClick={onClickButton} />}
                </>
            )}
            {showModal && (
                <Modal largeImageURL={largeImageURL} onClose={toggleModal} />
            )}
        </WrapperApp>
    );
};
