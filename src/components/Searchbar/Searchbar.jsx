import { useState } from 'react';

import Notiflix from 'notiflix';

import PropTypes from 'prop-types';

import {
    Header,
    SearchForm,
    SearchFormButton,
    // Label,
    Input,
    StyledIcon,
} from './Searchbar.styled';

const Searchbar = ({ onSubmit }) => {
    const [text, setText] = useState('');

    const handleChange = evt => {
        setText(evt.target.value);
    };

    const handleSubmit = evt => {
        evt.preventDefault();
        if (text.trim() === '') {
            Notiflix.Notify.failure('Введіть запит у пошуковий рядок');
            return;
        }
        onSubmit(text);
        setText('');
    };

    return (
        <Header>
            <SearchForm onSubmit={handleSubmit}>
                <SearchFormButton type="submit">
                    {/* <Label>Search</Label> */}
                    <StyledIcon />
                </SearchFormButton>

                <Input
                    type="text"
                    autoComplete="off"
                    autoFocus
                    placeholder="Search images and photos"
                    value={text}
                    onChange={handleChange}
                />
            </SearchForm>
        </Header>
    );
};

Searchbar.propTypes = {
    onSubmit: PropTypes.func.isRequired,
};

export default Searchbar;
