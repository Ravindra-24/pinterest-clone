import React, { createContext, useState } from 'react';
import { useDispatch } from 'react-redux';


export const SearchContext = createContext();

export const SearchProvider = ({ children }) => {
    const [search, setSearch] = useState('');
    const dispatch = useDispatch();
    const [showSearchModal, setShowSearchModal] = useState(false);

    const toggleSearchModal = () => {
        setShowSearchModal(!showSearchModal);
        setSearch('');
        dispatch({type: "CLEAR_SEARCHED_POSTS"})
    }
    return (
        <SearchContext.Provider value={{ search,showSearchModal, setSearch,toggleSearchModal }}>
            {children}
        </SearchContext.Provider>
    )
}