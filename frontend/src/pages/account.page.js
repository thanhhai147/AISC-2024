import React, { useState, useEffect } from "react";
import { json, useNavigate } from "react-router-dom";
import { useAuth } from "../context/authentication.context";
import UserAPI from "../api/user.api";

import MainLayout from "../layouts/main.layout";
import AvatarAccount from "../components/avatarAccount.component";
import InforAccount from "../components/infoAccount.component";
import { FaUserEdit } from "react-icons/fa";
import { FaUsers } from "react-icons/fa6";
import { MdOutlineMail } from "react-icons/md";
import { CiLock } from "react-icons/ci";
import Button from "../components/button.component";
import EditModal from "../components/editModal.component";
import '../assets/css/account.page.css'
import Swal from 'sweetalert2'

export default function AccountPage() {
    const navigate = useNavigate()
    const { userId, user, setUser } = useAuth()

    const [isModalOpen, setModalOpen] = useState(false);
    const [currentField, setCurrentField] = useState({key: "", title: "",label:"", value: "",  type:"" });
    const [accountData, setAccountData] = useState(null);
    const [avatar, setAvatar] = useState(null)

    useEffect(() => {
        setAccountData({
            "name": user?.username,
            "emailPhoneNumber": user?.emailPhoneNumber,
            "password": user?.password, 
            "role": user?.role,
            "avatarId": user?.avatar
        })
    }, [user])

    useEffect(() => {
        setAvatar({
            "avatarURL": null,
            "avatarBlob": null,
        })

        if (accountData?.avatarId === null || accountData?.avatarId === undefined || accountData?.avatarId === "") return
       
        UserAPI.getAvatar(accountData?.avatarId)
        .then(response => {
            if (!response.ok) return response.json()
            return response.blob();
        })
        .then(data => {
            if (data.type === "application/octet-stream") {
                const url = window.URL.createObjectURL(data)
                setAvatar({
                    "avatarURL": url,
                    "avatarBlob": data 
                })
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Truy xuất avatar thất bại!',
                    text: data.message,
                    confirmButtonText: 'OK',
                })
            }
        })
        .catch(error => {
            throw error
        })
    }, [accountData])

    const handleUpdateAvatar = (avatarURL, avatarBlob) => {
        setAvatar({
            "avatarURL": avatarURL,
            "avatarBlob": avatarBlob 
        })
    }

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
        }).finally(() => {
            window.location.reload()
        })
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

    const handleUpdateAccount = () => {
        UserAPI.update(userId, accountData?.name, accountData?.emailPhoneNumber, accountData?.password, accountData?.role, avatar?.avatarBlob)
        .then(response => response.json())
        .then(data => {
            if(data.success) handleUpdateSuccess()
            else handleUpdateUnsuccess()
            console.log(data.message)
        })
        .catch(error => {
            throw error
        })
    }

    return (
        <>
            <MainLayout>
                <AvatarAccount
                    name={accountData?.name}
                    imgUrl={avatar?.avatarURL}
                    onSetAvatar={handleUpdateAvatar}
                />
                <div className="infor-account">
                    <InforAccount
                        icon={FaUserEdit}
                        label="Họ và tên"
                        title="Họ và tên"
                        value={accountData?.name}
                        type="text"
                        onEdit={() => handleEdit("name", "Cập nhật", "Họ và tên", accountData?.name, "text")}
                    />
                    <InforAccount
                        icon={MdOutlineMail}
                        label="Email hoặc số điện thoại"
                        title="Email hoặc số điện thoại"
                        value={accountData?.emailPhoneNumber}
                        type="text"
                        onEdit={() => handleEdit("emailPhoneNumber", "Cập nhật", "Email hoặc số điện thoại", accountData?.emailPhoneNumber, "text")}
                    />
                    <InforAccount
                        icon={CiLock}
                        title="Đổi mật khẩu"
                        label="Mật khẩu"
                        type="password"
                        value={accountData?.password}
                        onEdit={() => handleEdit("password", "Đổi mật khẩu","Mật khẩu", accountData?.password, "password")}
                    />
                    <InforAccount
                        icon={FaUsers}
                        title="Gói đăng ký"
                        label="Gói đăng ký"
                        type="text"     
                        value={accountData?.role}
                    />
                </div>
                <span
                    className="combo-button"
                >
                    <Button type="primary" size="large" onClick={handleUpdateAccount}>
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
