'use client';
import React, { useEffect, useState } from 'react';
import CreateUser from './views/createUser';
import UserList from "./views/userList";
import { toast } from "react-hot-toast";
import handleApiCallFetch from '@/components/handleApiCallFetch';
import { envConfig } from '@/utility/environment';
import axios from 'axios';
import UpdateUser from './views/updateUser';

interface UserData {
    fullName: string,
    email: string,
    contact: any,
    userType: string,
    dialCode: string;
}

export interface UpdateUserData {
    fullName: string,
    email: string,
    contact: any,
    userType: string,
    dialCode: string,
    userId: string;
}

const Users = () => {

    //states
    const [showCreateUser, setShowCreateUser] = useState(false);
    const [showUpdateUser, setShowUpdateUser] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [limit, setLimit] = useState(10);
    const [searchName, setSearchName] = useState('');
    const [userList, setUserList] = useState([]);
    const [totalData, setTotalData] = useState(0);
    const [userIdForUpdate, setUserIdForUpdate] = useState(0);

    //functions
    const displayCreateModel = (value: boolean): void => {
        setShowCreateUser(value);
    };

    const displayUpdateModel = (value: boolean): void => {
        setShowUpdateUser(false);
    };

    const handleChangePage = (page: number): void => {
        setCurrentPage(page);
    };

    const handleChangeLimit = (value: number): void => {
        setLimit(value);
    };

    //async functions
    const deleteUser = async (userId: number): Promise<void> => {

        try {

            const response = await axios.delete(`${envConfig.backendUrl}/user/deleteUser?userId=${userId}`, {
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (response.data.status == true) {
                fetchUserList(limit, currentPage, searchName);
            }

        } catch (error) {
            throw new Error;
        }

    };



    const createUser = async (userData: UserData): Promise<any> => {

        let formData = new FormData();

        formData.append('fullName', userData.fullName);
        formData.append('email', userData.email);
        formData.append('contact', userData.contact);
        formData.append('userType', userData.userType);
        formData.append('dialCode', userData.dialCode);

        try {

            const response = await axios.post(`${envConfig.backendUrl}/user/createNewUser`, formData);

            if (response.data.status == true) {
                toast.success(response.data.message);
                fetchUserList(limit, currentPage, searchName);
                return response.data;

            } else {

                toast.error("Something went wrong!!!");
            }

        } catch (error) {
            throw new Error;
        }
    };

    const editUser = (userId: number): void => {

        setUserIdForUpdate(userId);
        setShowUpdateUser(true);

    };


    const updateUser = async (values: UpdateUserData): Promise<void> => {

        let formData = new FormData();

        formData.append('fullName', values.fullName);
        formData.append('email', values.email);
        formData.append('contact', values.contact);
        formData.append('userType', values.userType);
        formData.append('dialCode', values.dialCode);
        formData.append('userId', values.userId);

        try {

            const response = await axios.post(`${envConfig.backendUrl}/user/updateUser`, formData);

            if (response.data.status == true) {
                toast.success(response.data.message);
                setUserIdForUpdate(0);
                setShowUpdateUser(false);
                fetchUserList(limit, currentPage, searchName);

            } else {
                toast.error("Something went wrong!!!");
            }

        } catch (error) {
            throw new Error;
        }
    };


    const fetchUserList = async (limit: number, page: number, fullName: string): Promise<void> => {

        try {
            const apiUrl = `${envConfig.backendUrl}/user/getUserList?page=${page}&limit=${limit}&fullName=${fullName}`;

            const params = {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            };

            const response: any = await handleApiCallFetch(apiUrl, params);

            if (Array.isArray(response.data) && response.data.length >= 2) {
                setUserList(response.data[0]);
                setTotalData(response.data[1]);
                displayCreateModel(false);
                displayUpdateModel(false);

                if (response.data[1] > 10) {
                    setTotalPages(Math.ceil(totalData / limit));
                }

            } else {
                throw new Error("Invalid response format");
            }

        } catch (error) {
            throw new Error;
        }
    };



    const searchUser = async (name: string): Promise<void> => {
        await fetchUserList(limit, currentPage, name);
    };


    const updateUsersStatus = async (userIds: number[], status: number): Promise<any> => {
        console.log(status);

        try {
            if (userIds.length == 0) return toast.error('Select users to delete!!!');
            const response = await axios.post(`${envConfig.backendUrl}/user/updateMultipleUserStatus`, { userIds, userStatus: status });
            console.log(response);

            if (response.status == 200) {
                await fetchUserList(limit, currentPage, searchName);
            } else {
                toast.error("Something went wrong!!!");
            }

        } catch (error) {
            throw new Error;
        }
    };


    const deleteMultipleUsers = async (userIds: number[]): Promise<any> => {

        try {
            if (userIds.length == 0) return toast.error('Select users to delete!!!');
            const response = await axios.post(`${envConfig.backendUrl}/user/deleteMultipleUser`, userIds);

            if (response.data.status == true) {
                fetchUserList(limit, currentPage, searchName);
            } else {
                toast.error("Something went wrong!!!");
            }

        } catch (error) {
            throw new Error;
        }
    };


    useEffect(() => {
        fetchUserList(limit, currentPage, searchName);
    }, [limit, currentPage]);


    return (
        <div className='max-h-[96vh] overflow-auto'>
            <div className='px-4 xl:px-12 rounded-md  w-full min-h-[96vh] bg-slate-100 py-4'>
                <h1 className='text-indigo-700  text-xl font-bold tracking-tight'>
                    All Users List - {totalData ? `(${totalData})` : '0'}
                </h1>

                <UserList
                    displayCreateModel={displayCreateModel}
                    deleteUser={deleteUser}
                    fetchUserList={fetchUserList}
                    searchUser={searchUser}
                    handleChangePage={handleChangePage}
                    handleChangeLimit={handleChangeLimit}
                    currentPage={currentPage}
                    totalPages={totalPages}
                    userList={userList}
                    editUser={editUser}
                    updateUsersStatus={updateUsersStatus}
                    deleteMultipleUsers={deleteMultipleUsers}
                />
            </div>

            {showCreateUser &&
                <CreateUser
                    displayCreateModel={displayCreateModel}
                    createUser={createUser}
                />
            }


            {showUpdateUser &&
                < UpdateUser
                    displayUpdateModel={displayUpdateModel}
                    updateUser={updateUser}
                    userId={userIdForUpdate}
                />
            }

        </div>
    );
};

export default Users;