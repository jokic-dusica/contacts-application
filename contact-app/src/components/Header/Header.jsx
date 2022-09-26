import { useEffect, useState } from 'react';
import { HiOutlineSearch } from 'react-icons/hi';
import { useDispatch } from 'react-redux';

import {setSearchInput} from '../../redux/slices/searchInput';


import './Header.scss';

const Header = () => {

    const dispatch = useDispatch();
    const [searchValue, setSearchValue] = useState("");

    useEffect(() => {
        dispatch(setSearchInput(searchValue));
    }, [searchValue])

    return (
        <div className="Header">
            <HiOutlineSearch/>
            <input type="text" name="search" value={searchValue} onChange={(e)=>setSearchValue(e.target.value)} placeholder="Search"/>
        </div>
    )
}

export default Header;