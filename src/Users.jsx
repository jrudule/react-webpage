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
      <img className="profileImg" src={urls.regular} />
      <Link
        target="_blank"
        href={`https://unsplash.com/@${user.username}`}
      >
        
      </Link>
    </>
  );
};

const Users = () => {
  const [users, setUsers] = useState([]);
  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    fetch('https://dummyjson.com/users')
      .then(res => res.json())
      .then(data => setUsers(data.users));
  }, []);

  useEffect(() => {
    api.search
      .getPhotos({ query: 'people', orientation: 'portrait', perPage: 30, })
      .then(result => {
        setPhotos(result.response.results);
      })
      .catch(() => {
        console.log('Something went wrong while fetching photos.');
      });
  }, []);

  if (!users.length || !photos.length) {
    return <Box>Loading...</Box>;
  }

  return (
    <Box>
      <List>
        {users.map((user, index) => (
          <Grid2
          container
            key={index}
            sx={{
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
                  overflow: "hidden",
                  width: {
                    xs: 'max-content',
                    sm: '200px',
                  },
                  height: {
                    xs: '25vh',
                    sm: '200px',
                  },
                  borderRadius: "20%"
                }}
              >
                <PhotoComp photo={photos[index]} />
              </Box>
            </ListItem>
            <ListItem 
              key={user.id}
              sx={{
                display:"flex",
                flexDirection: "column",
                alignItems: "flex-start",
                flex: "2"
              }}
            >
              <h3>{user.firstName} {user.lastName} {user.maidenName}</h3>
              <Typography 
                sx={{
                  display:"flex", 
                  fontWeight:"600",
                  wordBreak: 'break-all', 
                  overflowWrap: 'break-word',
                }}
              > 
                Username: {user.username} 
              </Typography>
              <Typography 
                sx={{
                  display:"flex", 
                  fontWeight:"600",
                  wordBreak: 'break-all', 
                  overflowWrap: 'break-word',
                }}
              > 
                Email: {user.email} 
              </Typography>
                <Typography 
                sx={{
                  display:"flex", 
                  fontWeight:"600",
                  wordBreak: 'break-all', 
                  overflowWrap: 'break-word',
                }}
              > 
                Age: {user.age} 
              </Typography>
              <Typography 
                sx={{
                  display:"flex", 
                  fontWeight:"600",
                  wordBreak: 'break-all', 
                  overflowWrap: 'break-word',
                }}
              > 
                {user.address.city}, {user.address.state}, {user.address.country}
              </Typography>
            </ListItem>
          </Grid2>
        ))}
      </List>
    </Box>
  );
};

export default Users;
