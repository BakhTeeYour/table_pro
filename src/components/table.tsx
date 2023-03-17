import React, {useState, useEffect} from "react";
import axios from "axios";
import ArrowIcon from '../assets/arrow.svg';
import 'bootstrap/dist/css/bootstrap.css';
import { Title } from "../App";

interface TableProps {
    tableData: Title[],
    handleSort(data: Title[]): void,
    titlePerPage: number
}

const Table: React.FC<TableProps> = ({tableData, handleSort, titlePerPage}) => {
    const [sortValue, setSortValue] = useState('asc');
    const [sortingValue, setSortingValue] = useState('id');
    const title_URL = 'https://jsonplaceholder.typicode.com/posts';


    useEffect(() => {
        const sortedTitles = axios.get(`${title_URL}?_sort=${sortingValue}&_order=${sortValue}&_page=${titlePerPage}&_limit=10`);
        sortedTitles
            .then(({data}) => {
                handleSort(data);
            });
    }, [sortingValue, sortValue, titlePerPage]);

    const setterSortValue = (val: string) => {
        if (sortValue === 'asc') {
            setSortValue('desc');
            setSortingValue(val);
            return;
        }
        if (sortValue === 'desc') {
            setSortValue('asc');
            setSortingValue(val);
            return;
        }
    }

    return (
        <table className="table table-striped">
            <thead>
            <tr className="table-default">
                <th scope="col" onClick={() => setterSortValue('id')}>
                    ID
                    <img src={ArrowIcon} alt="icon" />
                </th>
                <th scope="col" onClick={() => setterSortValue('title')}>
                    Заголовок
                    <img src={ArrowIcon} alt="icon" />
                </th>
                <th scope="col" onClick={() => setterSortValue('body')}>
                    Описание
                    <img src={ArrowIcon} alt="icon" />
                </th>
            </tr>
            </thead>
            <tbody className="table-bordered">
            {tableData?.length ? tableData?.map((el, id) => (
                <tr key={id}>
                    <th scope="row">{id + 1}</th>
                    <td>{el.title}</td>
                    <td>{el.body}</td>
                </tr>)) : <tr><td colSpan={3} className="text-center">there is no any data</td></tr>}
            </tbody>
        </table>
    );
};

export default Table;