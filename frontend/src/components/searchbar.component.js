import React, { useState, useEffect } from 'react'
import '../assets/css/searchbar.css'
import { IoMdSearch } from "react-icons/io";

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
            const data = ['Đề thi số 1', 'Đề thi số 2', 'Đề thi số 3'].filter(item =>
                item.toLowerCase().includes(query.toLowerCase())
            );
            setResults(data);
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
            {results.length > 0 && (
                <div className='search_result'>
                    {results.map((result, index) => (
                        <p
                            key={index} 
                            target='_blank' 
                            className='search_suggestion_line font-family-extrabold'
                        >
                            {result}
                        </p>
                    ))}
                </div>
            )}
        </section>
    );
};
export default SearchBar;