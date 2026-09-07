import React, {
    useEffect,
    useState
} from "react";

import {
    CreditCard,
    Plus
} from "lucide-react";

import api from "../services/api";

export default function PaymentManagement() {

    const [payments, setPayments] =
        useState([]);

    const [open, setOpen] =
        useState(false);

    const [message, setMessage] =
        useState("");

    const [error, setError] =
        useState("");

    const [form, setForm] =
        useState({
            memberOrBuyer: "",
            transaction: "",
            amount: "",
            paymentDate:
                new Date()
                    .toISOString()
                    .slice(0, 10),

            paymentMethod:
                "BANK_TRANSFER",

            paymentStatus:
                "PENDING",

            referenceNumber: ""
        });


    // ==============================
    // LOAD PAYMENTS
    // ==============================

    const loadPayments = async () => {

        try {

            setError("");

            const response =
                await api.get("/payments");

            console.log(
                "PAYMENT RESPONSE:",
                response.data
            );

            setPayments(
                Array.isArray(response.data)
                    ? response.data
                    : []
            );

        } catch (err) {

            console.error(
                "Payment loading error:",
                err
            );

            setPayments([]);

            setError(
                "Unable to load payments."
            );
        }
    };


    useEffect(() => {

        loadPayments();

    }, []);


    // ==============================
    // CREATE PAYMENT
    // ==============================

    const submit = async (e) => {

        e.preventDefault();

        try {

            setError("");
            setMessage("");

            const payload = {

                memberOrBuyer:
                form.memberOrBuyer,

                transaction:
                form.transaction,

                amount:
                    Number(form.amount),

                paymentDate:
                form.paymentDate,

                paymentMethod:
                form.paymentMethod,

                paymentStatus:
                form.paymentStatus,

                referenceNumber:
                form.referenceNumber
            };


            await api.post(
                "/payments",
                payload
            );


            setMessage(
                "Payment recorded successfully."
            );


            setOpen(false);


            setForm({

                memberOrBuyer: "",

                transaction: "",

                amount: "",

                paymentDate:
                    new Date()
                        .toISOString()
                        .slice(0, 10),

                paymentMethod:
                    "BANK_TRANSFER",

                paymentStatus:
                    "PENDING",

                referenceNumber: ""
            });


            await loadPayments();


        } catch (err) {

            console.error(
                "Payment creation error:",
                err
            );

            setError(
                err.response?.data?.message ||
                "Unable to record payment."
            );
        }
    };


    // ==============================
    // UPDATE STATUS
    // ==============================

    const markPaid = async (id) => {

        try {

            setError("");

            await api.put(
                `/payments/${id}/status?status=PAID`
            );

            setMessage(
                "Payment marked as paid."
            );

            await loadPayments();

        } catch (err) {

            console.error(
                "Payment status error:",
                err
            );

            setError(
                "Unable to update payment."
            );
        }
    };


    return (
        <>

            {/* HEADER */}

            <div className="page-head">

                <div>

          <span className="eyebrow">
            FINANCIAL OPERATIONS
          </span>

                    <h2>
                        Payment Management
                    </h2>

                    <p>
                        Record and track farmer
                        and buyer payments.
                    </p>

                </div>


                <button
                    className="primary"
                    onClick={() =>
                        setOpen(true)
                    }
                >

                    <Plus size={17} />

                    New payment

                </button>

            </div>


            {/* SUCCESS MESSAGE */}

            {message && (

                <div className="toast">
                    {message}
                </div>

            )}


            {/* ERROR */}

            {error && (

                <div className="alert">
                    {error}
                </div>

            )}


            {/* TABLE */}

            <div className="panel">

                <div className="panel-head">

                    <div>

                        <h3>
                            Payment Records
                        </h3>

                        <p>
                            Farmer and buyer
                            payment transactions.
                        </p>

                    </div>

                </div>


                {payments.length > 0 ? (

                    <div className="table-wrap">

                        <table>

                            <thead>

                            <tr>

                                <th>
                                    Payment ID
                                </th>

                                <th>
                                    Member / Buyer
                                </th>

                                <th>
                                    Transaction
                                </th>

                                <th>
                                    Amount
                                </th>

                                <th>
                                    Date
                                </th>

                                <th>
                                    Method
                                </th>

                                <th>
                                    Status
                                </th>

                                <th>
                                    Reference
                                </th>

                                <th>
                                    Action
                                </th>

                            </tr>

                            </thead>


                            <tbody>

                            {payments.map(
                                (payment) => (

                                    <tr
                                        key={payment.id}
                                    >

                                        <td>

                                            <b>
                                                PAY-
                                                {payment.id}
                                            </b>

                                        </td>


                                        <td>

                                            {payment.memberOrBuyer
                                                || "-"}

                                        </td>


                                        <td>

                                            {payment.transaction
                                                || "-"}

                                        </td>


                                        <td>

                                            <b>
                                                ₹
                                                {payment.amount
                                                    ?? 0}
                                            </b>

                                        </td>


                                        <td>

                                            {payment.paymentDate
                                                || "-"}

                                        </td>


                                        <td>

                                            {String(
                                                payment.paymentMethod
                                                || "-"
                                            ).replaceAll(
                                                "_",
                                                " "
                                            )}

                                        </td>


                                        <td>

                                            {payment.paymentStatus
                                            === "PAID" ||

                                            payment.paymentStatus
                                            === "RECEIVED"
                                                ? (

                                                    <span
                                                        className=
                                                            "badge success"
                                                    >

                              {
                                  payment
                                      .paymentStatus
                              }

                            </span>

                                                )
                                                : (

                                                    <span
                                                        className=
                                                            "badge pending"
                                                    >

                              {
                                  payment
                                      .paymentStatus
                                  || "PENDING"
                              }

                            </span>

                                                )}

                                        </td>


                                        <td>

                                            {
                                                payment
                                                    .referenceNumber
                                                || "-"
                                            }

                                        </td>


                                        <td>

                                            {payment.paymentStatus
                                                === "PENDING" && (

                                                    <button
                                                        className=
                                                            "small-btn"
                                                        onClick={() =>
                                                            markPaid(
                                                                payment.id
                                                            )
                                                        }
                                                    >

                                                        Mark paid

                                                    </button>

                                                )}

                                        </td>

                                    </tr>

                                )
                            )}

                            </tbody>

                        </table>

                    </div>

                ) : (

                    <div className="empty">

                        No payment records found.

                    </div>

                )}

            </div>


            {/* ADD PAYMENT MODAL */}

            {open && (

                <div className="modal-bg">

                    <form
                        className="modal"
                        onSubmit={submit}
                    >

                        <div className="modal-head">

                            <h3>
                                Record Payment
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


                            {/* MEMBER / BUYER */}

                            <label>

                                Member / Buyer

                                <input
                                    type="text"
                                    required
                                    placeholder=
                                        "Example: Kumar"
                                    value={
                                        form.memberOrBuyer
                                    }
                                    onChange={(e) =>
                                        setForm({
                                            ...form,
                                            memberOrBuyer:
                                            e.target.value
                                        })
                                    }
                                />

                            </label>


                            {/* TRANSACTION */}

                            <label>

                                Transaction

                                <input
                                    type="text"
                                    required
                                    placeholder=
                                        "Example: Procurement #1"
                                    value={
                                        form.transaction
                                    }
                                    onChange={(e) =>
                                        setForm({
                                            ...form,
                                            transaction:
                                            e.target.value
                                        })
                                    }
                                />

                            </label>


                            {/* AMOUNT */}

                            <label>

                                Amount (₹)

                                <input
                                    type="number"
                                    required
                                    min="0.01"
                                    step="0.01"
                                    value={
                                        form.amount
                                    }
                                    onChange={(e) =>
                                        setForm({
                                            ...form,
                                            amount:
                                            e.target.value
                                        })
                                    }
                                />

                            </label>


                            {/* DATE */}

                            <label>

                                Payment Date

                                <input
                                    type="date"
                                    required
                                    value={
                                        form.paymentDate
                                    }
                                    onChange={(e) =>
                                        setForm({
                                            ...form,
                                            paymentDate:
                                            e.target.value
                                        })
                                    }
                                />

                            </label>


                            {/* METHOD */}

                            <label>

                                Payment Method

                                <select
                                    value={
                                        form.paymentMethod
                                    }
                                    onChange={(e) =>
                                        setForm({
                                            ...form,
                                            paymentMethod:
                                            e.target.value
                                        })
                                    }
                                >

                                    <option
                                        value=
                                            "BANK_TRANSFER"
                                    >
                                        Bank Transfer
                                    </option>

                                    <option
                                        value="UPI"
                                    >
                                        UPI
                                    </option>

                                    <option
                                        value="CASH"
                                    >
                                        Cash
                                    </option>

                                    <option
                                        value="CHEQUE"
                                    >
                                        Cheque
                                    </option>

                                </select>

                            </label>


                            {/* STATUS */}

                            <label>

                                Payment Status

                                <select
                                    value={
                                        form.paymentStatus
                                    }
                                    onChange={(e) =>
                                        setForm({
                                            ...form,
                                            paymentStatus:
                                            e.target.value
                                        })
                                    }
                                >

                                    <option
                                        value="PENDING"
                                    >
                                        Pending
                                    </option>

                                    <option
                                        value="PAID"
                                    >
                                        Paid
                                    </option>

                                    <option
                                        value="RECEIVED"
                                    >
                                        Received
                                    </option>

                                </select>

                            </label>


                            {/* REFERENCE */}

                            <label>

                                Reference Number

                                <input
                                    type="text"
                                    placeholder=
                                        "UTR / cheque / reference no."
                                    value={
                                        form.referenceNumber
                                    }
                                    onChange={(e) =>
                                        setForm({
                                            ...form,
                                            referenceNumber:
                                            e.target.value
                                        })
                                    }
                                />

                            </label>


                        </div>


                        <button
                            type="submit"
                            className="primary full"
                        >

                            <CreditCard size={17} />

                            Record payment

                        </button>

                    </form>

                </div>

            )}

        </>
    );
}