import React, { useEffect, useState } from 'react';

const MyComponent = () => {
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    fetch('http://localhost:3000')
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          setSuccess(true);
        }
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  return (
    <div>
      {success ? <p>Operation was successful!</p> : <p>Loading...</p>}
    </div>
  );
};

export default MyComponent;
