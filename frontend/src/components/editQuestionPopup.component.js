import React from "react";
import { useAuth } from "../context/authentication.context";

import PropTypes from "prop-types";
import { FiEdit } from "react-icons/fi";
import { MdOutlineAutoAwesome } from "react-icons/md";
import Button from "./button.component";
import "../assets/css/editQuestionPopup.css"; 

const EditQuestionPopup = ({ onClose, onManualEdit, onChatEdit }) => {

    const { user } = useAuth()

    return (
        <div className="popup-overlay">
            <div className="popup-content">
                <div className="w-100 d-flex justify-content-center align-items-center">
                    <p className="font-family-semibold primary-color">Chọn hình thức chỉnh sửa</p>
                </div>
                <span className="button-edit">
                    <span className="icon-button-edit primary-color">
                        <FiEdit />
                        <Button
                            className="popup-button"
                            type="primary"
                            size="large"
                            onClick={() => {
                                onManualEdit();
                                onClose();
                            }}
                        >
                            Chỉnh sửa Thủ công
                        </Button>
                    </span>
                    <span className="icon-button-edit">
                        <MdOutlineAutoAwesome />
                        <Button
                            className="popup-button"
                            type="primary"
                            size="large"
                            onClick={() => {
                                onChatEdit();
                                onClose();
                            }}
                        >
                            Chat cùng EduVision
                        </Button>
                    </span>
                </span>
                <Button className="popup-button cancel" type="warning" size="large" onClick={onClose}>
                    Hủy bỏ
                </Button>
            </div>
        </div>
    );
};

// PropTypes để kiểm tra kiểu dữ liệu
EditQuestionPopup.propTypes = {
    onClose: PropTypes.func.isRequired,
    onManualEdit: PropTypes.func.isRequired,
    onChatEdit: PropTypes.func.isRequired,
};

export default EditQuestionPopup;
