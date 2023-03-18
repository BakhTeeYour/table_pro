import React, {useState, useEffect, MouseEvent} from "react";
import 'bootstrap/dist/css/bootstrap.css';
import axios from "axios";
import {Title} from "../App";

interface PaginationProps {
    handlePage(data: Title[], titlePerPage: number): void,

    postLength: number,
}


const updateParams = (key: string, value: string) => {
    const searchParams = new URLSearchParams(window.location.search);
    searchParams.set(key, value);
    const newPath = `${window.location.pathname}?${searchParams.toString()}`;
    window.history.replaceState(null, '', newPath);
};

const Pagination: React.FC<PaginationProps> = ({handlePage, postLength}) => {

    const url = new URLSearchParams(window.location.search)
    const page = Number(url.get('_page'));
    const [titlesPerPage, setTitlesPerPage] = useState(page || 1);

    useEffect(() => {
        const pages = axios.get(`https://jsonplaceholder.typicode.com/posts?_page=${titlesPerPage}&_limit=10`);
        pages
            .then(({data}) => {
                handlePage(data, titlesPerPage);

            });
    }, [titlesPerPage]);

    const pageNumber = [];

    for (let i = 1; i <= postLength; i++) {
        pageNumber.push(i);
    }

    const updatePerPage = (evt: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>, num: number): void => {
        evt.preventDefault();
        // setTitlesPerPage(num);
        if (num < 10 && num > 0) {
            updateParams('_page', num.toString());
            setTitlesPerPage(num);
        }

    }


    return (
        <div>
            <ul className="pagination">
                <button className="btn" onClick={(evt) => updatePerPage(evt, titlesPerPage - 1)}>
                    Назад
                </button>
                <div className="pagination-numbers">
                    {
                        pageNumber.map(numbers => (
                            <li key={numbers}>
                                {
                                    numbers === page ?
                                        <span className="page-active">
                                        {numbers}
                                    </span>
                                        :
                                        <button onClick={evt => updatePerPage(evt, numbers)}
                                                className="pagination-link">
                                            {numbers}
                                        </button>
                                }
                            </li>
                        ))
                    }
                </div>
                <button className="btn" onClick={(evt) => updatePerPage(evt, titlesPerPage + 1)}>
                    Далее
                </button>
            </ul>
        </div>
    );
};

export default Pagination;