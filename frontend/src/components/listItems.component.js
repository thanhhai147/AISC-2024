import React, { useState } from 'react';
import '../assets/css/listItems.css';
import Button from './button.component.js';

const ListItems = ({ results = [] }) => {
    const [items, setItems] = useState(
        results.length ? results : ['Đề số 1', 'Đề số 2', 'Đề số 3', 'Đề số 4']
    );

    const [selectedIndex, setSelectedIndex] = useState(null); 

    const handleClick = (item, index) => {
        console.log(`Clicked on ${item}`);
        setSelectedIndex(index);
    };

    if (!items.length) {
        return <p className="no-results-message">No results found.</p>;
    }

    return (
        <div className='list-items'>
            {items.map((item, index) => (
                <div key={index} className='search_suggestion_line'>
                    <Button
                        type='secondary'
                        size='small'
                        status={selectedIndex === index ? 'active' : 'disabled'} 
                        onClick={() => handleClick(item, index)}
                    >
                        {item}
                    </Button>
                </div>
            ))}
        </div>
    );
};

export default ListItems;
