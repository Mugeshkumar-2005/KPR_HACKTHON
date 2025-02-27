// import React from "react";

// const Profile = () => {
//   return (
//     <div>
//       <h1>User Profile</h1>
//       <p>Manage personal details, history, and settings.</p>
//     </div>
//   );
// };

// export default Profile;

import React from 'react';
import { useNavigate } from 'react-router-dom';

function Profile() {
  const navigate = useNavigate();
  return (
    <div>
      <h1>Profile Page</h1>
      <button onClick={() => navigate('/')}>Back to Dashboard</button>
    </div>
  );
}

export default Profile;