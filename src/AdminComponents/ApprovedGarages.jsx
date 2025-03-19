import React, { useEffect, useState } from "react";
import axios from "axios";

const ApprovedGarages = () => {
    const [approvedGarages, setApprovedGarages] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:5000/garages/all")
            .then(response => {
                console.log("Approved Garages data:", response.data); // ✅ Check API response
                const filteredGarages = response.data.filter(garage => garage.approvalStatus === "approved");
                setApprovedGarages(filteredGarages);
            })
            .catch(error => console.error("Error fetching approved garages:", error.response?.data || error.message));
    }, []);

    return (
        <div className="container mt-4">
            <h2 className="text-center mb-4">Approved Garages</h2>
            <table className="table table-hover table-bordered" style={{ width: "70%", tableLayout: "fixed" }}>
                <thead className="table-success text-center">
                    <tr>
                        <th style={{ width: "5%" }}>#</th>
                        <th style={{ width: "20%" }}>Garage Name</th>
                        <th style={{ width: "20%" }}>TIN Number</th>
                        <th style={{ width: "20%" }}>Location</th>
                        <th style={{ width: "20%" }}>Phone</th>
                    </tr>
                </thead>
                <tbody>
                    {approvedGarages.length > 0 ? (
                        approvedGarages.map((garage, index) => (
                            <tr key={garage._id} className="align-middle text-center">
                                <td>{index + 1}</td>
                                <td>{garage.GarageName}</td>  {/* ✅ Fixed field name */}
                                <td>{garage.GaragetinNumber}</td>
                                <td>{garage.location?.coordinates?.join(", ") || "N/A"}</td> {/* ✅ Fixed location */}
                                <td>{garage.Garagephone}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="5" className="text-center text-muted">
                                No approved garages found.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default ApprovedGarages;
