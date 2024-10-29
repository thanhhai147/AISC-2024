import React, { useState, useEffect } from 'react'
import '../assets/css/searchbar.css'
import { IoMdSearch } from "react-icons/io";
import ListItems from './listItems.component';

const SearchBar = () => {
    const [search, setSearch] = useState(''); 
    const [results, setResults] = useState([]);

    const handleChange = (e) => {
        setSearch(e.target.value)
    }

    useEffect(() => {
        if (search !== "") {
            fetchSuggestions(search);
        } else {
            setResults([]); 
        }
    }, [search])

    const fetchSuggestions = async (query) => {
        try {
            const data = ['Đề số 1', 'Đề số 2', 'Đề số 3', 'Đề số 4'];
            // Lọc dữ liệu chỉ chứa nội dung đã nhập
            const filteredData = data.filter(item =>
                item.toLowerCase().includes(query.toLowerCase())
            );

            // Nếu có kết quả phù hợp, cập nhật results
            setResults(filteredData);
        } catch (error) {
            console.error('Error fetching suggestions:', error);
        }
    };

    return (
        <section className='search_section'>
            <div className='search_input_div'>
                <div className='search_icon'>
                    <IoMdSearch/>
                </div>
                <input
                    type = 'text'
                    className='search_input font-family-regular'
                    placeholder='Tìm kiếm...'
                    autoComplete='off'
                    onChange={handleChange}
                
                    value={search}
                />
            </div>
            {results.length > 0 && <ListItems results={results} search={search} />}
        </section>
    );
};
export default SearchBar;