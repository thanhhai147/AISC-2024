import React from "react";
import { useNavigate } from "react-router-dom";

import MainLayout from "../layouts/main.layout";
import AvatarAccount from "../components/avatarAccount.component";
import InforAccount from "../components/infoAccount.component";
import { FaUserEdit } from "react-icons/fa";
import { MdOutlineCalendarToday, MdOutlineMail } from "react-icons/md";
import { CiLock } from "react-icons/ci";
import { BsTelephone } from "react-icons/bs";
import Button from "../components/button.component";
import EditModal from "../components/editModal.component";
import '../assets/css/account.page.css'
import Swal from 'sweetalert2'

export default function AccountPage() {
    const navigate = useNavigate()
    
    const [isModalOpen, setModalOpen] = React.useState(false);
    const [currentField, setCurrentField] = React.useState({key: "", title: "",label:"", value: "",  type:"" });
    const [accountData, setAccountData] = React.useState({
        name: "Nguyễn Văn A",
        birthday: "16/11/2000",
        email: "nguyenvana@gmail.com",
        password: "123456",
        phone: "",
    });

    const handleEdit = (key, title, label, value, type) => {
        setCurrentField({ key, title, label, value, type });
        setModalOpen(true);
    };

    const handleSave = (newValue) => {
        setAccountData((prev) => ({ ...prev, [currentField.key]: newValue }));
        setModalOpen(false);
    };


    const handleUpdateSuccess = () => {
        Swal.fire({
            position: "center",
            icon: "success",
            title: "Cập nhật thành công",
            showConfirmButton: false,
            timer: 1500
      });
    }

    const handleUpdateUnsuccess = () => {
        Swal.fire({
            position: "center",
            icon: "error",
            title: "Cập nhật thất bại",
            showConfirmButton: false,
            timer: 1500
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/account"); 
        }
      });
    }
    return (
        <>
            <MainLayout>
                <AvatarAccount />
                <div className="infor-account">
                <InforAccount
                    icon={FaUserEdit}
                    label="Họ và tên"
                    title="Cập nhật"
                    value={accountData.name}
                    type="text"
                    onEdit={() => handleEdit("name", "Cập nhật", "Họ và tên", accountData.name, "text")}
                />
                
                <InforAccount
                    icon={MdOutlineCalendarToday}
                    label="Ngày sinh"
                    title="Cập nhật"
                    value={accountData.birthday}
                    type="date"
                    onEdit={() => handleEdit("birthday", "Cập nhật", "Ngày sinh", accountData.birthday, "date")}
                />
                <InforAccount
                    icon={MdOutlineMail}
                    label="Email"
                    title="Cập nhật"
                    value={accountData.email}
                    type="email"
                    onEdit={() => handleEdit("email", "Cập nhật", "Email", accountData.email, "email")}
                />

                    <InforAccount
                        icon={CiLock}
                        title="Đổi mật khẩu"
                        label="Mật khẩu"
                        type="password"
                        value={accountData.password}
                        onEdit={() => handleEdit("password", "Đổi mật khẩu","Mật khẩu", accountData.password, "password")}
                    />
                    <InforAccount
                        icon={BsTelephone}
                        title="Cập nhật"
                        label="Số điện thoại"
                        type="text"
                        value={accountData.phone}
                        onEdit={() => handleEdit("phone", "Cập nhật", "Số điện thoại", accountData.phone, "text")}
                    />
                </div>
                <span
                    className="combo-button"
                >
                    <Button type="primary" size="small" onClick={handleUpdateUnsuccess}>
                        Huỷ
                    </Button>
                    <Button type="primary" size="small" onClick={handleUpdateSuccess}>
                        Cập nhật
                    </Button>
                </span>
            </MainLayout>
            <EditModal
                isOpen={isModalOpen}
                onClose={() => setModalOpen(false)}
                title={currentField.title} 
                label={currentField.label} 
                value={currentField.value} 
                type={currentField.type}  
                onSave={handleSave}
            />
        </>
    );
}
