import React, { useState } from 'react';
import '../assets/css/listItems.css';
import Button from './button.component.js';

const ListItems = ({ results = [], emptyMessage='Không có kết quả trả về.' }) => {
    const [items, setItems] = useState(results);

    const [selectedIndex, setSelectedIndex] = useState(null); 

    const handleClick = (item, index) => {
        console.log(`Clicked on ${item}`);
        setSelectedIndex(index);
    };

    return (
        <div className='list-items'>
            {
                items.length ?
                items.map((item, index) => (
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
                )) :
                <p className="no-results-message">{emptyMessage}</p>
            }
        </div>
    );
};

export default ListItems;
