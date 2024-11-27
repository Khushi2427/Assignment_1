const db = require("../config/db");

exports.addSchool = (req, res) => {
  const { name, address, latitude, longitude } = req.body;

 
  if (!name || !address || !latitude || !longitude) {
    return res.status(400).json({ error: "All fields are required!" });
  }

  const lat = parseFloat(latitude);
  const lon = parseFloat(longitude);

  if (isNaN(lat) || isNaN(lon)) {
    return res.status(400).json({ error: "Latitude and Longitude must be valid numbers!" });
  }


  const query = "INSERT INTO schools (name, address, latitude, longitude) VALUES (?, ?, ?, ?)";
  db.query(query, [name, address, lat, lon], (err, result) => {
    if (err) {
      console.error("Error adding school:", err.message);
      return res.status(500).json({ error: "An error occurred while adding the school." });
    }
    res.status(201).json({ message: "School added successfully!", schoolId: result.insertId });
  });
};


exports.listSchools = (req, res) => {
  const { latitude, longitude } = req.query;


  if (!latitude || !longitude) {
    return res.status(400).json({ error: "Latitude and Longitude are required!" });
  }

  const userLatitude = parseFloat(latitude);
  const userLongitude = parseFloat(longitude);

  if (isNaN(userLatitude) || isNaN(userLongitude)) {
    return res.status(400).json({ error: "Latitude and Longitude must be valid numbers!" });
  }


  const query = "SELECT * FROM schools";
  db.query(query, (err, results) => {
    if (err) {
      console.error("Error fetching schools:", err.message);
      return res.status(500).json({ error: "An error occurred while fetching schools." });
    }

    if (results.length === 0) {
      return res.status(200).json({ message: "No schools found." });
    }

    
    const calculateDistance = (lat1, lon1, lat2, lon2) => {
      const toRad = (value) => (value * Math.PI) / 180;
      const R = 6371; 
      const dLat = toRad(lat2 - lat1);
      const dLon = toRad(lon2 - lon1);

      const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      return R * c;
    };

    
    const sortedSchools = results
      .map((school) => ({
        ...school,
        distance: calculateDistance(userLatitude, userLongitude, school.latitude, school.longitude),
      }))
      .sort((a, b) => a.distance - b.distance);

    res.status(200).json(sortedSchools);
  });
};
