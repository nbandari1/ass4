import { Row, Col, Image } from 'react-bootstrap';

const Home = () => {
  return (
    <Row>
      <Col md={6}>
        <Image 
          src="https://upload.wikimedia.org/wikipedia/commons/3/30/Metropolitan_Museum_of_Art_%28The_Met%29_-_Central_Park%2C_NYC.jpg" 
          alt="Metropolitan Museum of Art" 
          fluid
          rounded
        />
      </Col>
      <Col md={6}>
        <p>
          The Metropolitan Museum of Art, often referred to simply as the Met, is one of the largest and most comprehensive art museums in the world. Located in New York City, the Met houses an extensive collection of artworks spanning thousands of years and various cultures.
        </p>
        <p>
          For more information, visit the <a href="https://en.wikipedia.org/wiki/Metropolitan_Museum_of_Art" target="_blank" rel="noreferrer">Wikipedia entry</a>.
        </p>
      </Col>
    </Row>
  );
};

export default Home;
