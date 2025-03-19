import React, { useEffect, useState } from "react";
import axios from "axios";

const ApprovedGarages = () => {
    const [approvedGarages, setApprovedGarages] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:5000/garages/approved") // ✅ Corrected API route
            .then(response => setApprovedGarages(response.data))
            .catch(error => console.error("Error fetching garages:", error));
    }, []);

    return (
        <div className="container mt-4">
            <h2 className="text-center mb-4">Approved Garages</h2>
            <table className="table table-hover table-bordered" style={{ width: "70%", tableLayout: "fixed" }}>
                <thead className="table-success text-center">
                    <tr>
                        <th>Garage Name</th>
                        <th>TIN Number</th>
                        <th>Location</th>
                        <th>Approval Date</th>
                    </tr>
                </thead>
                <tbody>
                    {approvedGarages.map(garage => (
                        <tr key={garage._id} className="align-middle text-center">
                            <td>{garage.GarageName}</td>
                            <td>{garage.GaragetinNumber}</td>
                            <td>{garage.location.coordinates?.join(", ")}</td>
                            <td>{new Date(garage.approvalDate).toLocaleString()}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ApprovedGarages;
