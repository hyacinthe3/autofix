import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

const GarageList = () => {
    const [garages, setGarages] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:5000/garages/all")
            .then(response => {
                console.log("Garages data:", response.data); // ✅ Check what is being received
                setGarages(response.data);
            })
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
                        setGarages(prev => prev.filter(g => g._id !== id)); // Remove approved garage
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
        <div className="container mt-4">
            <h2 className="text-center mb-4">Pending & Rejected Garages</h2>
            <table className="table table-hover table-bordered" style={{ width: "70%", tableLayout: "fixed" }}>
                <thead className="table-dark text-center">
                    <tr>
                        <th style={{ width: "5%" }}>#</th>
                        <th style={{ width: "20%" }}>Garage Name</th>
                        <th style={{ width: "20%" }}>TIN Number</th>
                        <th style={{ width: "20%" }}>Location</th>
                        <th style={{ width: "15%" }}>Status</th>
                        <th style={{ width: "20%" }}>Actions</th>
                    </tr>
                </thead>
                <tbody>
        {garages.filter(garage => garage.approvalStatus !== "approved").map((garage, index) => (
            <tr key={garage._id} className="align-middle text-center">
                <td>{index + 1}</td>
                <td>{garage.GarageName}</td>  {/* ✅ Fixed field name */}
                <td>{garage.GaragetinNumber}</td>
                <td>{garage.location.coordinates?.join(", ")}</td> {/* ✅ Fixed location */}
                <td>{garage.approvalStatus}</td>
                <td>
                    {garage.approvalStatus === "pending" && (
                        <>
                            <button className="btn btn-success btn-sm me-2" onClick={() => handleApprove(garage._id)}>
                                Approve
                            </button>
                            <button className="btn btn-danger btn-sm" onClick={() => handleReject(garage._id)}>
                                Reject
                            </button>
                        </>
                    )}
                </td>
            </tr>
        ))}
    </tbody>
            </table>
        </div>
    );
};

export default GarageList;
