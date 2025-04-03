import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

const GarageList = () => {
    const [garages, setGarages] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:5000/garages/all")
            .then(response => setGarages(response.data))
            .catch(error => console.error("Error fetching garages:", error.response?.data || error.message));
    }, []);

    const handleApprove = (id) => {
        Swal.fire({
            title: "Approve Garage?",
            text: "Are you sure you want to approve this garage?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#28a745",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Approve",
        }).then((result) => {
            if (result.isConfirmed) {
                axios.put(`http://localhost:5000/garages/approve/${id}`)
                    .then(() => {
                        setGarages(prev => prev.filter(g => g._id !== id));
                        Swal.fire("Approved!", "The garage has been approved.", "success");
                    })
                    .catch(error => console.error("Error approving garage:", error));
            }
        });
    };

    const handleReject = (id) => {
        Swal.fire({
            title: "Reject Garage?",
            text: "Are you sure you want to reject this garage?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#28a745",
            confirmButtonText: "Yes, Reject",
        }).then((result) => {
            if (result.isConfirmed) {
                axios.put(`http://localhost:5000/garages/reject/${id}`)
                    .then(() => {
                        setGarages(prev => prev.map(g => g._id === id ? { ...g, approvalStatus: "rejected" } : g));
                        Swal.fire("Rejected!", "The garage has been rejected.", "error");
                    })
                    .catch(error => console.error("Error rejecting garage:", error));
            }
        });
    };

    return (
        <div className="container mt-4 text-center">
            <h2 className="text-orange mb-4" style={{marginLeft:'-35%'}}>Pending & Rejected Garages</h2>
            <div className="table-responsive" style={{ overflowX: "hidden" }}>
                <table className="custom-table" style={{ width: "80%", margin: "0 auto",marginLeft:'15%' }}>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Garage Name</th>
                            <th>TIN Number</th>
                            <th>Location</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {garages.filter(garage => garage.approvalStatus !== "approved").map((garage, index) => (
                            <tr key={garage._id}>
                                <td>{index + 1}</td>
                                <td>{garage.GarageName}</td>
                                <td>{garage.GaragetinNumber}</td>
                                <td>{garage.location?.address || "Address not available"}</td>
                                <td>{garage.approvalStatus}</td>
                                <td className="d-flex justify-content-center">
                                    {garage.approvalStatus === "pending" ? (
                                        <>
                                            <button className="btn btn-success btn-sm me-2" onClick={() => handleApprove(garage._id)}>Approve</button>
                                            <button className="btn btn-danger btn-sm" onClick={() => handleReject(garage._id)}>Reject</button>
                                        </>
                                    ) : (
                                        <button className="btn btn-info btn-sm" onClick={() => handleApprove(garage._id)}>Approve Again</button>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <style>
                {`
                .custom-table {
                    width: 100%;
                    border-collapse: collapse;
                }
                .custom-table thead {
                    background-color: #343a40;
                    color: white;
                }
                .custom-table th, .custom-table td {
                    padding: 12px;
                    text-align: center;
                    border-bottom: 1px solid #ddd;
                }
                .custom-table tbody tr:last-child td {
                    border-bottom: none;
                }
                .custom-table tbody tr:hover {
                    background-color: #f8f9fa;
                }
                .text-orange {
                    color: #FF6A00;
                }
                .table-responsive {
                    overflow-x: hidden;
                }
                
                `}
            </style>
        </div>
    );
};

export default GarageList;
