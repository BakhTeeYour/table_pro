import React, {useState, useEffect} from "react";
import 'bootstrap/dist/css/bootstrap.css';
import axios from "axios";
import SearchIcon from '../assets/search.svg';
import { Title } from "../App";



interface SearchProps {
    handleSearch(data: Title[]): void
}

const Search: React.FC<SearchProps> = ({handleSearch}) => {
        const POST_URL = 'https://jsonplaceholder.typicode.com/posts';
        const [searchTitle, setSearchTitle] = useState('');

        useEffect(() => {
            if (searchTitle) {
                const titleURL = axios.get(POST_URL, {params: {'title_like': `^${searchTitle}`}});
                titleURL
                    .then(({data}) => handleSearch(data));
            }

        }, [searchTitle]);

        return (
            <label className="search">
                <input
                    value={searchTitle}
                    autoFocus
                    type='text'
                    onChange={(e) => setSearchTitle(e.target.value)}
                    autoComplete='off'
                    placeholder='Поиск'
                />
                <img className="search_img" src={SearchIcon} alt="icon" />
            </label>
        );
    }
;

export default Search;