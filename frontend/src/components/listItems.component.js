import React, { useState } from 'react';
import '../assets/css/listItems.css';
import Button from './button.component.js';

const ListItems = ({ 
    results = [], 
    emptyMessage = 'Không có kết quả trả về.', 
    onItemClick = () => {}, 
    onExtraButtonClick = () => {} // Thêm prop mới
}) => {
    const [selectedIndex, setSelectedIndex] = useState(null);

    const handleClick = (item, index) => {
        setSelectedIndex(index);
        onItemClick(item, index); // Gọi callback từ cha
    };

    return (
        <div className="list-items">
            {
                results.length ? (
                    results.map((item, index) => (
                        <div key={index} className="search_suggestion_line">
                            <Button
                                type="secondary"
                                size="small"
                                status={selectedIndex === index ? "active" : "disabled"}
                                onClick={() => handleClick(item, index)} // Truyền sự kiện click
                            >
                                {item}
                            </Button>
                            {selectedIndex === index && (
                                <Button
                                    type="success"
                                    size="small"
                                    onClick={() => onExtraButtonClick(item, index)} // Truyền callback từ cha
                                >
                                    Thêm
                                </Button>
                            )}
                        </div>
                    ))
                ) : (
                    <p className="no-results-message">{emptyMessage}</p>
                )
            }
        </div>
    );
};

export default ListItems;
