// import React from "react";

// const Doctors = () => {
//   return (
//     <div>
//       <h1>Recommended Doctors</h1>
//       <p>Find doctors based on expertise, location, and budget.</p>
//     </div>
//   );
// };

// export default Doctors;


// import React from 'react';

// function Doctor() {
//   return (
//     <div>
//       <h1>Doctor Page</h1>
//     </div>
//   );
// }

// export default Doctor;



// import React, { useState } from 'react';
// import { Box, Typography, Avatar, Button, Card, CardContent, Rating, List, ListItem, ListItemText } from '@mui/material';
// import { FaUserMd, FaPhone, FaCalendarAlt, FaVideo } from 'react-icons/fa';

// const Doctor = () => {
//     const doctor = {
//         name: "Dr. John Doe",
//         specialty: "Cardiologist",
//         image: "https://via.placeholder.com/150", // Replace with actual image URL
//         rating: 4.8,
//         experience: 12,
//         contact: "+1 (555) 123-4567",
//         availableTimes: ["10:00 AM", "12:30 PM", "3:00 PM", "5:00 PM"],
//         reviews: [
//             { id: 1, name: "Emily R.", text: "Great doctor! Helped me a lot." },
//             { id: 2, name: "Michael B.", text: "Very patient and knowledgeable." },
//         ]
//     };

//     const [selectedTime, setSelectedTime] = useState(null);

//     const handleBookAppointment = (time) => {
//         setSelectedTime(time);
//         alert(`Appointment booked for ${time} with ${doctor.name}`);
//     };

//     return (
//         <Box sx={{ width: "95.7vw", height: "91vh", backgroundColor: "#f5f5f5", display: "flex", flexDirection: "column", alignItems: "center", padding: 3 }}>
            
//             {/* Doctor Profile */}
//             <Card sx={{ width: "90%", maxWidth: 500, textAlign: "center", padding: 2, marginBottom: 3 }}>
//                 <Avatar src={doctor.image} sx={{ width: 120, height: 120, margin: "auto" }} />
//                 <Typography variant="h5" fontWeight="bold" sx={{ marginTop: 1 }}>{doctor.name}</Typography>
//                 <Typography variant="subtitle1" color="textSecondary">{doctor.specialty}</Typography>
//                 <Typography variant="body2">🩺 {doctor.experience} years of experience</Typography>
//                 <Rating value={doctor.rating} precision={0.1} readOnly />
//             </Card>

//             {/* Appointment Booking */}
//             <Card sx={{ width: "90%", maxWidth: 500, padding: 2 }}>
//                 <Typography variant="h6" fontWeight="bold">
//                     <FaCalendarAlt style={{ marginRight: 8 }} /> Available Times
//                 </Typography>
//                 <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, marginTop: 2 }}>
//                     {doctor.availableTimes.map((time) => (
//                         <Button key={time} variant={selectedTime === time ? "contained" : "outlined"} onClick={() => handleBookAppointment(time)}>
//                             {time}
//                         </Button>
//                     ))}
//                 </Box>
//             </Card>

//             {/* Contact and Video Call */}
//             <Box sx={{ display: "flex", gap: 2, marginTop: 3 }}>
//                 <Button variant="contained" color="primary" startIcon={<FaPhone />}>
//                     Call Doctor
//                 </Button>
//                 <Button variant="contained" color="secondary" startIcon={<FaVideo />} onClick={() => alert("Starting video call...")}>
//                     Video Consultation
//                 </Button>
//             </Box>

//             {/* Patient Reviews */}
//             <Card sx={{ width: "90%", maxWidth: 500, marginTop: 3, padding: 2 }}>
//                 <Typography variant="h6" fontWeight="bold">Patient Reviews</Typography>
//                 <List>
//                     {doctor.reviews.map(review => (
//                         <ListItem key={review.id}>
//                             <ListItemText primary={review.name} secondary={review.text} />
//                         </ListItem>
//                     ))}
//                 </List>
//             </Card>
//         </Box>
//     );
// };

// export default Doctor;


import React, { useState } from 'react';
import { Box, Typography, Avatar, Button, Card, CardContent, Rating, List, ListItem, ListItemText } from '@mui/material';
import { FaCalendarAlt, FaVideo } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const Doctor = () => {
    const navigate = useNavigate();  // For navigation

    const doctor = {
        name: "Dr. John Doe",
        specialty: "Cardiologist",
        image: "https://via.placeholder.com/150",
        rating: 4.8,
        experience: 12,
        availableTimes: ["10:00 AM", "12:30 PM", "3:00 PM", "5:00 PM"],
        reviews: [
            { id: 1, name: "Emily R.", text: "Great doctor! Helped me a lot." },
            { id: 2, name: "Michael B.", text: "Very patient and knowledgeable." },
        ]
    };

    return (
        <Box sx={{ width: "95.7vw", height: "91vh", backgroundColor: "#f5f5f5", display: "flex", flexDirection: "column", alignItems: "center", padding: 3 }}>
            
            {/* Doctor Profile */}
            <Card sx={{ width: "90%", maxWidth: 500, textAlign: "center", padding: 2, marginBottom: 3 }}>
                <Avatar src={doctor.image} sx={{ width: 120, height: 120, margin: "auto" }} />
                <Typography variant="h5" fontWeight="bold" sx={{ marginTop: 1 }}>{doctor.name}</Typography>
                <Typography variant="subtitle1" color="textSecondary">{doctor.specialty}</Typography>
                <Typography variant="body2">🩺 {doctor.experience} years of experience</Typography>
                <Rating value={doctor.rating} precision={0.1} readOnly />
            </Card>

            {/* Video Consultation Button */}
            <Button 
                variant="contained" 
                color="secondary" 
                startIcon={<FaVideo />} 
                onClick={() => navigate('/consultation')} // Navigate to Consultation
                sx={{ marginTop: 2 }}
            >
                Video Consultation
            </Button>

            {/* Patient Reviews */}
            <Card sx={{ width: "90%", maxWidth: 500, marginTop: 3, padding: 2 }}>
                <Typography variant="h6" fontWeight="bold">Patient Reviews</Typography>
                <List>
                    {doctor.reviews.map(review => (
                        <ListItem key={review.id}>
                            <ListItemText primary={review.name} secondary={review.text} />
                        </ListItem>
                    ))}
                </List>
            </Card>
        </Box>
    );
};

export default Doctor;
