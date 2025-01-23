import React, { useEffect, useRef, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import * as THREE from 'three';
import { OrbitControls } from '@react-three/drei';

const Globe = () => {
  const globeRef = useRef();
  const [geoData, setGeoData] = useState(null);
  const [loading, setLoading] = useState(true);

  // Helper function: Convert lat/lng to 3D vector for placing on the globe
  const latLngToVector3 = (lat, lng, radius = 2.3) => {
    const phi = (90 - lat) * (Math.PI / 180);
    const theta = (lng + 180) * (Math.PI / 180);
    const x = -radius * Math.sin(phi) * Math.cos(theta);
    const y = radius * Math.cos(phi);
    const z = radius * Math.sin(phi) * Math.sin(theta);
    return new THREE.Vector3(x, y, z);
  };

  // Draw country borders and fill shapes on the globe
  const drawCountries = (data) => {
    const countryGroup = new THREE.Group();

    data.features.forEach((feature) => {
      const countryName = feature.properties.name || feature.properties.ADMIN;
      const coordinates = feature.geometry.coordinates;

      // Determine color based on country name
      const fillColor = countryName === 'India' ? '#ff0000' : '#ffffff'; // Red for India, white for others
      const borderColor = '#1c1b1b'; // Set border color to black

      // Handle Polygon and MultiPolygon for each country
      const drawPolygon = (polygon) => {
        const points = polygon.map(([lng, lat]) => latLngToVector3(lat, lng, 2.3));

        // Create geometry for the filled polygon
        const geometry = new THREE.BufferGeometry().setFromPoints(points);
        // Manually create the indices for the geometry
        const indices = [];
        for (let i = 0; i < points.length - 2; i++) {
          indices.push(0, i + 1, i + 2);
        }
        geometry.setIndex(indices);

        const fillMaterial = new THREE.MeshBasicMaterial({
          color: fillColor,
          side: THREE.DoubleSide, // Fill both sides of the polygon
        });

        // Create a mesh for the polygon and add it to the group
        const mesh = new THREE.Mesh(geometry, fillMaterial);
        countryGroup.add(mesh);

        // Create border geometry
        const borderGeometry = new THREE.BufferGeometry().setFromPoints(points.concat([points[0]])); // Close the polygon
        const borderMaterial = new THREE.LineBasicMaterial({ color: borderColor }); // Black border
        const borderLine = new THREE.Line(borderGeometry, borderMaterial);
        countryGroup.add(borderLine);
      };

      if (feature.geometry.type === 'Polygon') {
        coordinates.forEach((polygon) => drawPolygon(polygon));
      } else if (feature.geometry.type === 'MultiPolygon') {
        coordinates.forEach((polygon) => polygon.forEach((ring) => drawPolygon(ring)));
      }
    });

    if (globeRef.current) {
      globeRef.current.add(countryGroup);
    }
  };

  // Fetch GeoJSON data on mount
  useEffect(() => {
    fetch('/geomaps/custom.geo.json') // Replace with your GeoJSON file's path
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        setGeoData(data);
        drawCountries(data); // Call the function to draw all countries
        setLoading(false); // Set loading to false after data is loaded
      })
      .catch((error) => {
        console.error('Error fetching GeoJSON:', error);
        setLoading(false);
      });

    return () => {
      if (globeRef.current) {
        globeRef.current.clear();
      }
    };
  }, []);

  return (
    <>
      {loading && <div>Loading...</div>} {/* Loading Indicator */}
      <Canvas camera={{ position: [0, 0, 4], fov: 75 }} style={{ height: '100vh', width: '100vw' }}>
        {/* Sphere representing the globe */}
        <mesh ref={globeRef} rotation={[0.4, 0.5, 0]}>
          <sphereGeometry args={[2, 64, 64]} />
          <meshBasicMaterial 
            color={0x223344} 
            transparent={true} 
            opacity={0} 
            wireframe={false} 
          />
        </mesh>

        {/* Orbit controls for interaction, with zoom disabled */}
        <OrbitControls enableZoom={false} /> {/* Disable zoom */}

        {/* Lights */}
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 3, 5]} intensity={1} />
      </Canvas>
    </>
  );
};

export default Globe;
