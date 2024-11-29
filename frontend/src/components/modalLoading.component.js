import React from "react";
import PropTypes from "prop-types";
import "../assets/css/modalLoading.css";
import Button from "./button.component";

const ModalLoading = ({ title, message, isOpen, onClose, onCancelProcessing, buttonText }) => {
  if (!isOpen) return null;

  const handleCancel = () => {
    onClose(); // Đóng modal
    if (onCancelProcessing) {
      onCancelProcessing();
    }
  };

  const handleOverlayClick = (e) => {
    if (e.target.classList.contains("modal-overlay")) {
      onClose();
    }
  };

  return (
    <div
      className="modal-overlay"
      role="dialog"
      aria-labelledby="modal-title"
      aria-describedby="modal-message"
      onClick={handleOverlayClick}
    >
      <div className="modal-box" onClick={(e) => e.stopPropagation()}>
        <div className="loading">
          <div className="spinner"></div>
          <p id="modal-title" className="title font-family-semibold primary-color">
            {title}
          </p>
        </div>
        <p id="modal-message" className="message font-family-light secondary-color">
          {message}
        </p>
        <Button type="warning" size="small" onClick={handleCancel}>
          {buttonText || "Huỷ bỏ"}
        </Button>
      </div>
    </div>
  );
};

ModalLoading.propTypes = {
  title: PropTypes.string,
  message: PropTypes.string,
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onCancelProcessing: PropTypes.func, // Hàm dừng xử lý tài liệu
  buttonText: PropTypes.string,
};

ModalLoading.defaultProps = {
  title: "Đang tải...",
  message: "Quá trình này có thể mất vài giây. Vui lòng đợi trong giây lát!",
  buttonText: "Huỷ bỏ",
};

export default ModalLoading;
