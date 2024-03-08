import { useEffect, useState } from 'react';
import { Row, Col, Pagination, Card } from 'react-bootstrap';
import useSWR from 'swr';
import { useRouter } from 'next/router';
import ArtworkCard from '../../components/ArtworkCard'; // Adjusted import path
import Error from 'next/error'; // Added import for Error component

const PER_PAGE = 12;

const Artwork = () => {
  const [artworkList, setArtworkList] = useState(null);
  const [page, setPage] = useState(1);
  const router = useRouter();
  const finalQuery = router.asPath.split('?')[1];

  const { data, error } = useSWR(
    `https://collectionapi.metmuseum.org/public/collection/v1/search?${finalQuery}`
  );

  useEffect(() => {
    if (data) {
      const results = [];
      for (let i = 0; i < data?.objectIDs?.length; i += PER_PAGE) {
        const chunk = data?.objectIDs.slice(i, i + PER_PAGE);
        results.push(chunk);
      }
      setArtworkList(results);
      setPage(1);
    }
  }, [data]);

  const previousPage = () => {
    if (page > 1) setPage(page - 1);
  };

  const nextPage = () => {
    if (page < artworkList.length) setPage(page + 1);
  };

  if (error) return <Error statusCode={404} />; // Fixed Error component usage
  if (!artworkList) return null;

  return (
    <>
      {artworkList.length > 0 ? (
        <>
          <Row className="gy-4">
            {artworkList[page - 1].map((currentObjectID) => (
              <Col lg={3} key={currentObjectID}>
                <ArtworkCard objectID={currentObjectID} />
              </Col>
            ))}
          </Row>
          <Row className="justify-content-center mt-4">
            <Pagination>
              <Pagination.Prev onClick={previousPage} />
              <Pagination.Item>{page}</Pagination.Item>
              <Pagination.Next onClick={nextPage} />
            </Pagination>
          </Row>
        </>
      ) : (
        <Card>
          <Card.Body>
            <h4>Nothing Here</h4>
            Try searching sumn else.... :D
          </Card.Body>
        </Card>
      )}
    </>
  );
};

export default Artwork;
