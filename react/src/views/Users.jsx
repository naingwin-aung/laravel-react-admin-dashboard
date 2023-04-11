import React, { useEffect, useState } from "react";
import axiosClient from "../axios-client";
import { Link } from "react-router-dom";
import DefaultContent from "../components/DefaultContent";

function Users() {
    const [users, setUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        getUsers();
    }, []);

    const getUsers = async () => {
        setIsLoading(true);
        const { data } = await axiosClient.get("/users");
        setUsers(data.data);
        setIsLoading(false);
    };

    const onDelete = (u) => {
        if (!window.confirm("Are you sure you want to delete this user?")) {
            return;
        }

        axiosClient.delete(`/users/${u.id}`).then(() => {
            // todo show notification
            getUsers();
        });
    };

    let content = <DefaultContent>Not Found Users</DefaultContent>;

    if (users.length > 0) {
        content = users.map((user) => (
            <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.created_at}</td>
                <td>
                    <Link to={`/users/${user.id}`} className="btn-edit me-3">
                        Edit
                    </Link>
                    <button
                        onClick={(ev) => onDelete(user)}
                        className="btn-delete"
                    >
                        Delete
                    </button>
                </td>
            </tr>
        ));
    }

    if (isLoading) {
        content = <DefaultContent>Loading.........</DefaultContent>;
    }

    return (
        <>
            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                }}
            >
                <h1>Users</h1>
                <Link to="/users/new" className="btn-add">
                    Add New
                </Link>
            </div>

            <div className="card animated fadeInDown mt-3">
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Created At</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>{content}</tbody>
                </table>
            </div>
        </>
    );
}

export default Users;
