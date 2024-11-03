import React, { useState, useEffect, useRef } from 'react';
import '../assets/css/boxSort.css';
import ListItems from './listItems.component';
import { MdOutlineSort } from "react-icons/md";

const BoxSort = () => {
    const data = ['Mới nhất', 'Nhiều lượt thích nhất', 'Nhiều câu trả lời nhất'];
    const [isBoxVisible, setIsBoxVisible] = useState(false);
    const boxRef = useRef(null);

    // Toggle visibility khi click vào icon
    const toggleBoxVisibility = () => {
        setIsBoxVisible(!isBoxVisible);
    };

    // Xử lý khi click ngoài box để ẩn box-sort
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (boxRef.current && !boxRef.current.contains(event.target)) {
                setIsBoxVisible(false);
            }
        };

        if (isBoxVisible) {
            document.addEventListener("mousedown", handleClickOutside);
        } else {
            document.removeEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isBoxVisible]);

    return (
        <div className="box-sort-wrapper">
            <div className='box-sort-title-wrapper' onClick={toggleBoxVisibility}>
                <MdOutlineSort className='box-sort-title-icon' />
                <p className='box-sort-title font-family-semibold'>Sắp xếp theo</p>
            </div>
            
            {isBoxVisible && (
                <div className="box-sort" ref={boxRef}>
                    <ListItems results={data} />
                </div>
            )}
            
        </div>
    );
};

export default BoxSort;
