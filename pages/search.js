// pages/search.js
import { useState } from 'react';
import { useRouter } from 'next/router';
import { Form, Button } from 'react-bootstrap';

const AdvancedSearch = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    searchBy: '',
    geoLocation: '',
    medium: '',
    isOnView: false,
    isHighlight: false,
    q: ''
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const submitForm = (e) => {
    e.preventDefault();
    let queryString = '';
    const { searchBy, geoLocation, medium, isOnView, isHighlight, q } = formData;
    
    if (searchBy) queryString += `searchBy=true&`;
    if (geoLocation) queryString += `geoLocation=${geoLocation}&`;
    if (medium) queryString += `medium=${medium}&`;
    if (isOnView) queryString += `isOnView=true&`;
    if (isHighlight) queryString += `isHighlight=true&`;
    if (q) queryString += `q=${q}&`;

    router.push(`/artwork?${queryString}`);
  };

  return (
    <Form onSubmit={submitForm}>
      <Form.Group controlId="searchBy">
        <Form.Check 
          type="checkbox" 
          label="Search By" 
          name="searchBy" 
          onChange={handleChange}
        />
      </Form.Group>
      <Form.Group controlId="geoLocation">
        <Form.Label>Geo Location</Form.Label>
        <Form.Control 
          type="text" 
          placeholder="Enter Geo Location" 
          name="geoLocation" 
          onChange={handleChange}
        />
      </Form.Group>
      <Form.Group controlId="medium">
        <Form.Label>Medium</Form.Label>
        <Form.Control 
          type="text" 
          placeholder="Enter Medium" 
          name="medium" 
          onChange={handleChange}
        />
      </Form.Group>
      <Form.Group controlId="isOnView">
        <Form.Check 
          type="checkbox" 
          label="Is On View" 
          name="isOnView" 
          onChange={handleChange}
        />
      </Form.Group>
      <Form.Group controlId="isHighlight">
        <Form.Check 
          type="checkbox" 
          label="Is Highlight" 
          name="isHighlight" 
          onChange={handleChange}
        />
      </Form.Group>
      <Form.Group controlId="q">
        <Form.Label>Search</Form.Label>
        <Form.Control 
          type="text" 
          placeholder="Enter Search Keyword" 
          name="q" 
          onChange={handleChange} 
          className={formData.q === '' ? 'is-invalid' : ''}
          required
        />
        <div className="invalid-feedback">
          Please provide a search keyword.
        </div>
      </Form.Group>
      <Button variant="primary" type="submit">
        Search
      </Button>
    </Form>
  );
};

export default AdvancedSearch;
