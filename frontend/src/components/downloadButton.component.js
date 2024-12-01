import React from 'react';
import '../assets/css/downloadButton.css';
import { MdOutlineFileDownload } from 'react-icons/md';

const DownloadButton = ({ onDownloadSuccess }) => {
  const handleDownload = () => {
    setTimeout(() => {
      if (onDownloadSuccess) {
        onDownloadSuccess(); 
      }
    }, 1000); 
  };

  return (
    <div className="download-button" onClick={handleDownload}>
      <p className="custom-download-button font-family-regular">
        <MdOutlineFileDownload className="icon" /> Tải đề thi
      </p>
    </div>
  );
};

export default DownloadButton;
