// ArtworkCardDetail.js
import { Card } from 'react-bootstrap';
import Link from 'next/link';
import useSWR from 'swr';
import { useState } from 'react'; // Import useState hook for component state
import { useRouter } from 'next/router';

const ArtworkCardDetail = ({ objectID }) => {
  const router = useRouter();
  const [error, setError] = useState(null); // Use useState for error state

  const { data } = useSWR(
    `https://collectionapi.metmuseum.org/public/collection/v1/objects/${objectID}`,
    { onError: (err) => setError(err) } // Handle error with onError callback
  );

  if (error) return <p>Error: {error.message}</p>; // Render error message if error occurs

  if (!data) return <p>Loading...</p>; // Render loading indicator while data is being fetched

  const {
    primaryImage,
    medium,
    artistDisplayName,
    creditLine,
    dimensions,
    artistWikidata_URL
  } = data;

  return (
    <Card>
      {primaryImage && <Card.Img variant="top" src={primaryImage} />}
      <Card.Body>
        {medium && (
          <>
            <Card.Text>Medium: {medium}</Card.Text>
            <br />
            <br />
          </>
        )}
        <Card.Text>Artist: {artistDisplayName || "N/A"}</Card.Text>
        <Card.Text>Credit Line: {creditLine || "N/A"}</Card.Text>
        <Card.Text>Dimensions: {dimensions || "N/A"}</Card.Text>
        {artistWikidata_URL && (
          <Card.Text>
            <Link href={artistWikidata_URL} passHref>
              <a target="_blank" rel="noreferrer">Wiki</a>
            </Link>
          </Card.Text>
        )}
      </Card.Body>
    </Card>
  );
};

export default ArtworkCardDetail;
