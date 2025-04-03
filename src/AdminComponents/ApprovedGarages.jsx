import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Adminstyles/approve.css"

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
            <h2 className="text-center mb-4" style={{ color: "#FF6A00", fontWeight: "bold",marginRight:'50%' }}>
                Approved Garages
            </h2>
            <div className="table-container" style={{marginLeft:'21%',width:'75%' }}>
                <table className="custom-table">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Garage Name</th>
                            <th>TIN Number</th>
                            <th>Location</th>
                            <th>Phone</th>
                        </tr>
                    </thead>
                    <tbody>
                        {approvedGarages.length > 0 ? (
                            approvedGarages.map((garage, index) => (
                                <tr key={garage._id}>
                                    <td>{index + 1}</td>
                                    <td>{garage.GarageName}</td>
                                    <td>{garage.GaragetinNumber}</td>
                                    <td>{garage.address}</td> {/* ✅ Displays Address Instead of Coordinates */}
                                    <td>{garage.Garagephone}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="5" className="no-data">No approved garages found.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ApprovedGarages;
