import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axiosClient from "../axios-client";
import { useStateContext } from "../contexts/ContextProvider";

function UserForm() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [errors, setError] = useState(null);
    const [user, setUser] = useState({
        id: null,
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
    });
    const { setNotification } = useStateContext();

    if (id) {
        useEffect(() => {
            getUserInfo();
        }, []);
    }

    const getUserInfo = () => {
        setLoading(true);
        axiosClient.get(`/users/${id}`).then(({ data }) => {
            setLoading(false);
            setUser(data);
        });
    };

    const onSubmit = (e) => {
        e.preventDefault();
        setError(null);
        if (user.id) {
            axiosClient
                .put(`/users/${user.id}`, user)
                .then(() => {
                    // todo show notification
                    setNotification("User was successfully updated");
                    navigate("/users");
                })
                .catch((e) => {
                    const response = e.response;
                    if (response && response.status == 422) {
                        setError(response.data.errors);
                    }
                });
        } else {
            axiosClient
                .post(`/users/`, user)
                .then(() => {
                    // todo show notification
                    setNotification("User was successfully created");
                    navigate("/users");
                })
                .catch((e) => {
                    const response = e.response;
                    if (response && response.status == 422) {
                        setError(response.data.errors);
                    }
                });
        }
    };

    // const nameChangeHandler = (e) => {
    //     setUser((prevUser) => {
    //         const updateUser = { ...prevUser };
    //         return { ...updateUser, name: e.target.value };
    //     });
    // };

    return (
        <>
            {user.id ? <h1>Update User: {user.name}</h1> : <h1>New User</h1>}

            <div className="card animated fadeInDown">
                {loading && <div className="text-center">Loading.......</div>}
                {errors && (
                    <div className="alert">
                        {Object.keys(errors).map((key, index) => (
                            <p key={index}>{errors[key][0]}</p>
                        ))}
                    </div>
                )}

                {!loading && (
                    <form onSubmit={onSubmit}>
                        <input
                            value={user.name}
                            onChange={(e) =>
                                setUser({ ...user, name: e.target.value })
                            }
                            placeholder="Name"
                            type="text"
                        />
                        <input
                            value={user.email}
                            onChange={(e) =>
                                setUser({ ...user, email: e.target.value })
                            }
                            type="email"
                            placeholder="Email"
                        />
                        <input
                            onChange={(e) =>
                                setUser({ ...user, password: e.target.value })
                            }
                            type="password"
                            placeholder="Password"
                        />
                        <input
                            onChange={(e) =>
                                setUser({
                                    ...user,
                                    password_confirmation: e.target.value,
                                })
                            }
                            type="password"
                            placeholder="Password Confirmation"
                        />
                        <button className="btn">Save</button>
                    </form>
                )}
            </div>
        </>
    );
}

export default UserForm;
