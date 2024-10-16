import React, { useState, useEffect } from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import { Box, Grid2, Link, Typography } from '@mui/material';
import { createApi } from 'unsplash-js';

const api = createApi({
  accessKey: 'eUsOQhcWBmw31RMUYG8ZEGfMn8Dkk0bW0jt5Nzn1ido',
});

const PhotoComp = ({ photo }) => {
  const { user, urls } = photo;

  return (
    <>
      <img className="img" src={urls.regular} />
      <Link
        target="_blank"
        href={`https://unsplash.com/@${user.username}`}
        sx={{
          textDecoration: 'none',
          fontSize: {
            xs: '12px',
            sm: '16px',
          },
        }}
      >
        {user.name}
      </Link>
    </>
  );
};

const Quotes = () => {
  const [quotes, setQuotes] = useState([]);
  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    fetch('https://dummyjson.com/quotes')
      .then(res => res.json())
      .then(data => setQuotes(data.quotes));
  }, []);

  useEffect(() => {
    api.search
      .getPhotos({ query: 'nature', orientation: 'portrait', perPage: 30, })
      .then(result => {
        setPhotos(result.response.results);
      })
      .catch(() => {
        console.log('Something went wrong while fetching photos.');
      });
  }, []);

  if (!quotes.length || !photos.length) {
    return <Box>Loading...</Box>;
  }

  return (
    <Box>
      <List>
        {quotes.map((quote, index) => (
          <Grid2
            container
            key={index}
            sx={{
              border: "solid black 2px",
              borderRadius: "10px",
              background: "darkslategray",
              marginBottom: "20px",
              display:"flex", 
              width: {
                xs: '90vw',
                sm: '75vw',
                md: '60vw',
              },
              p: {
                xs: '0',
                sm: '0 15px 0 15px',
              },
              flexDirection: {
                xs: 'column',
                sm: 'row',
              },
              
            }}
          >
            <ListItem 
              key={photos[index].id}
              sx={{
                flex: "1"
              }}
            >
              <Box
                sx={{
                  display:"flex", 
                  flexDirection:"column",
                  justifyContent:"center",
                  margin:"auto",
                }}
              >
                <PhotoComp photo={photos[index]} />
              </Box>
            </ListItem>

            <ListItem 
              key={quote.id}
              sx={{
                display:"flex", 
                flexDirection:"column",
                color: "darkgray",
                fontSize: "22px",
                margin: "auto",
                alignItems: "flex-start",
                flex: "2" 
              }}
            >
              <Typography 
                sx={{
                  fontSize: {
                    xs: '20px',
                    sm: '24px',
                  },
                  fontWeight: '600',
                  mb: '10px'
                }}
              >
                {quote.quote}
              </Typography>
              <Typography>
                -{quote.author}
              </Typography>
            </ListItem>
          </Grid2>
        ))}
      </List>
    </Box>
  );
};

export default Quotes;
