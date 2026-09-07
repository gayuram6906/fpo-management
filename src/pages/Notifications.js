import React, { useEffect, useState } from "react";
import {
    Bell,
    Check,
    Trash2,
    Plus
} from "lucide-react";

import api from "../services/api";

export default function Notifications() {

    const [notifications, setNotifications] = useState([]);
    const [open, setOpen] = useState(false);

    const [form, setForm] = useState({
        title: "",
        message: "",
        type: "INFO"
    });

    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const loadNotifications = async () => {

        try {

            const response = await api.get("/notifications");

            setNotifications(response.data);

            setError("");

        } catch (error) {

            console.error(
                "Notification loading error:",
                error
            );

            setError(
                error.response?.data?.message ||
                "Unable to load notifications."
            );
        }
    };

    useEffect(() => {
        loadNotifications();
    }, []);

    const createNotification = async (e) => {

        e.preventDefault();

        try {

            setError("");
            setSuccess("");

            await api.post("/notifications", {
                title: form.title,
                message: form.message,
                type: form.type
            });

            setForm({
                title: "",
                message: "",
                type: "INFO"
            });

            setOpen(false);

            setSuccess(
                "Notification created successfully."
            );

            await loadNotifications();

        } catch (error) {

            console.error(
                "Notification creation error:",
                error
            );

            setError(
                error.response?.data?.message ||
                "Unable to create notification."
            );
        }
    };

    const markRead = async (id) => {

        try {

            await api.put(
                `/notifications/${id}/read`
            );

            await loadNotifications();

        } catch (error) {

            console.error(
                "Mark read error:",
                error
            );
        }
    };

    const deleteNotification = async (id) => {

        try {

            await api.delete(
                `/notifications/${id}`
            );

            await loadNotifications();

        } catch (error) {

            console.error(
                "Delete notification error:",
                error
            );
        }
    };

    const unreadCount =
        notifications.filter(
            (notification) =>
                !notification.read
        ).length;

    return (
        <>
            {/* PAGE HEADER */}

            <div className="page-head">

                <div>

          <span className="eyebrow">
            ALERT CENTER
          </span>

                    <h2>
                        Notifications
                    </h2>

                    <p>
                        View important updates and alerts
                        from your FPO.
                    </p>

                </div>

                <button
                    className="primary"
                    onClick={() => {
                        setError("");
                        setSuccess("");
                        setOpen(true);
                    }}
                >
                    <Plus size={17} />

                    Add notification
                </button>

            </div>

            {/* SUCCESS */}

            {success && (
                <div className="toast">
                    {success}
                </div>
            )}

            {/* ERROR */}

            {error && (
                <div className="alert">
                    {error}
                </div>
            )}

            {/* UNREAD SUMMARY */}

            <div className="notification-summary">

                <div className="notification-count">

                    <Bell size={22} />

                    <div>

            <span>
              Unread notifications
            </span>

                        <strong>
                            {unreadCount}
                        </strong>

                    </div>

                </div>

            </div>

            {/* NOTIFICATION LIST */}

            <div className="notification-list">

                {notifications.length === 0 ? (

                    <div className="empty">
                        No notifications available.
                    </div>

                ) : (

                    notifications.map(
                        (notification) => (

                            <div
                                className={
                                    `notification-card ${
                                        notification.read
                                            ? "read"
                                            : "unread"
                                    }`
                                }
                                key={notification.id}
                            >

                                {/* ICON */}

                                <div className="notification-icon">

                                    <Bell size={20} />

                                </div>

                                {/* CONTENT */}

                                <div className="notification-content">

                                    <div className="notification-top">

                                        <h3>
                                            {notification.title}
                                        </h3>

                                        <span
                                            className={
                                                `badge ${
                                                    notification.type ===
                                                    "WARNING"
                                                        ? "warning"
                                                        : notification.type ===
                                                        "SUCCESS"
                                                            ? "success"
                                                            : "pending"
                                                }`
                                            }
                                        >
                      {notification.type}
                    </span>

                                    </div>

                                    <p>
                                        {notification.message}
                                    </p>

                                    <small>
                                        {notification.createdAt
                                            ? String(
                                                notification.createdAt
                                            ).replace("T", " ")
                                            : "-"}
                                    </small>

                                </div>

                                {/* ACTIONS */}

                                <div className="notification-actions">

                                    {!notification.read && (

                                        <button
                                            className="small-btn"
                                            onClick={() =>
                                                markRead(
                                                    notification.id
                                                )
                                            }
                                            title="Mark as read"
                                        >
                                            <Check size={16} />
                                        </button>

                                    )}

                                    <button
                                        className="small-btn danger"
                                        onClick={() =>
                                            deleteNotification(
                                                notification.id
                                            )
                                        }
                                        title="Delete"
                                    >
                                        <Trash2 size={16} />
                                    </button>

                                </div>

                            </div>

                        )
                    )

                )}

            </div>

            {/* ADD NOTIFICATION MODAL */}

            {open && (

                <div className="modal-bg">

                    <form
                        className="modal"
                        onSubmit={
                            createNotification
                        }
                    >

                        <div className="modal-head">

                            <h3>
                                Add Notification
                            </h3>

                            <button
                                type="button"
                                onClick={() =>
                                    setOpen(false)
                                }
                            >
                                ×
                            </button>

                        </div>

                        <div className="form-grid">

                            {/* TITLE */}

                            <label>

                                Title

                                <input
                                    required
                                    value={form.title}
                                    onChange={(e) =>
                                        setForm({
                                            ...form,
                                            title: e.target.value
                                        })
                                    }
                                    placeholder="Payment Pending"
                                />

                            </label>

                            {/* TYPE */}

                            <label>

                                Type

                                <select
                                    value={form.type}
                                    onChange={(e) =>
                                        setForm({
                                            ...form,
                                            type: e.target.value
                                        })
                                    }
                                >

                                    <option value="INFO">
                                        INFO
                                    </option>

                                    <option value="WARNING">
                                        WARNING
                                    </option>

                                    <option value="SUCCESS">
                                        SUCCESS
                                    </option>

                                </select>

                            </label>

                            {/* MESSAGE */}

                            <label className="full-field">

                                Message

                                <textarea
                                    required
                                    rows="4"
                                    value={form.message}
                                    onChange={(e) =>
                                        setForm({
                                            ...form,
                                            message: e.target.value
                                        })
                                    }
                                    placeholder="Payment of ₹2500 is pending for Kumar."
                                />

                            </label>

                        </div>

                        <button
                            type="submit"
                            className="primary full"
                        >
                            Create notification
                        </button>

                    </form>

                </div>

            )}

        </>
    );
}