import {useState} from "react";
import 'bootstrap/dist/css/bootstrap.css';
import Pagination from "./components/pagination";
import Table from "./components/table";
import Search from "./components/search";
import './App.css';
import { FC } from "react";

export interface Title {
    body: string,
    id: number,
    title: string,
    userId: number,
    length: number,
    map: any
}

const App: FC = () => {
    const [post, setPost] = useState<Title[]>([]);
    const [titlePerPage, setTitlePerPage] = useState(1);

    return (
        <div className="list">
            <div className="container">
                <Search
                    handleSearch={(posts) => setPost(posts)}
                />
                <Table
                    tableData={post}
                    titlePerPage={titlePerPage}
                    handleSort={(posts) => setPost(posts)}
                />
                <Pagination
                    handlePage={(data, titlePerPage): void => {
                        setPost(data)
                        setTitlePerPage(titlePerPage)
                    }}
                    postLength={post.length}
                />
            </div>
        </div>
    );
};

export default App;
