import React, { useEffect, useState } from "react";
import axios from "axios";

const ApprovedGarages = () => {
    const [approvedGarages, setApprovedGarages] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:5000/garages/all")
            .then(async response => {
                console.log("Approved Garages data:", response.data); // ✅ Check API response
                const filteredGarages = response.data.filter(garage => garage.approvalStatus === "approved");

                // Convert coordinates to addresses
                const garagesWithAddresses = await Promise.all(
                    filteredGarages.map(async (garage) => {
                        if (garage.location?.coordinates) {
                            const address = await getAddressFromCoordinates(garage.location.coordinates);
                            return { ...garage, address };
                        }
                        return { ...garage, address: "N/A" };
                    })
                );

                setApprovedGarages(garagesWithAddresses);
            })
            .catch(error => console.error("Error fetching approved garages:", error.response?.data || error.message));
    }, []);

    // Function to get address from coordinates
    const getAddressFromCoordinates = async ([longitude, latitude]) => {
        try {
            const response = await axios.get(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`);
            return response.data.display_name || "Address not found";
        } catch (error) {
            console.error("Error getting address:", error.message);
            return "Address not found";
        }
    };

    return (
        <div className="container mt-4">
            <h2 className="text-center mb-4">Approved Garages</h2>
            <table className="table table-hover table-bordered" style={{ width: "70%", tableLayout: "fixed" }}>
                <thead className="table-dark text-center">
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
                                <td>{garage.GarageName}</td>  
                                <td>{garage.GaragetinNumber}</td>
                                <td>{garage.address}</td> {/* ✅ Displays Address Instead of Coordinates */}
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
