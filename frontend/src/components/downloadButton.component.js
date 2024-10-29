import React from 'react';
import '../assets/css/downloadButton.css';
import { MdOutlineFileDownload } from 'react-icons/md';

const DownloadButton = () => {
  return (
    <div className="download-button">
      <p className="custom-download-button font-family-regular">
        <MdOutlineFileDownload className="icon" /> Tải đề thi
      </p>
    </div>
  );
};
export default DownloadButton;
