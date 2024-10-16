import React, { useEffect, useState } from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import { Box, Grid2, Link, Typography } from '@mui/material';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDownOffAlt';
import PreviewIcon from '@mui/icons-material/Preview';
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

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    fetch('https://dummyjson.com/posts')
      .then(res => res.json())
      .then(data => setPosts(data.posts));
  }, []);

  useEffect(() => {
    api.search
      .getPhotos({ query: 'cat', orientation: 'portrait', perPage: 30, })
      .then(result => {
        setPhotos(result.response.results);
      })
      .catch(() => {
        console.log('Something went wrong while fetching photos.');
      });
  }, []);


  if (!posts.length || !photos.length) {
    return <Box>Loading...</Box>;
  }

  return (
    <List>
      {posts.map((post, index) => (
        <Grid2
          container
          key={index}
          sx={{ 
            width: {
              xs: '90vw',
              sm: '60vw',
            },
            border: "solid 2px black",
            borderRadius: "15px",
            padding: "20px",
            marginBottom: "20px",
            background: "lightgray",
            fontWeight: "600",
          }} 
        >
          <ListItem 
            key={photos[index].id}
            sx={{
              border: "solid black 2px",
              borderRadius: "10px",
              background: "darkslategray",
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
            key={post.id}
            sx={{
              display:"flex", 
              flexDirection:"column",
            }}
          >
            <Typography
              sx={{ 
                fontWeight: "600",
                mt: "10px",
                mb: "10px"
              }} 
            >
              {post.body}
            </Typography>

            <Grid2 
              container
              sx={{
                gap: "10px",
                textAlign: "center",
                alignSelf: "start",
                flexDirection:"row"
              }}
            >
              <Box sx={{ display: "flex", gap: "5px", color: "green" }}>
                {post.reactions.likes} <ThumbUpOffAltIcon />
              </Box>

              <Box sx={{ display: "flex", gap: "5px", color: "#dc1616" }}>
                {post.reactions.dislikes} <ThumbDownOffAltIcon />
              </Box>

              <Box sx={{ display: "flex", gap: "5px", color: "rebeccapurple" }}>
                {post.views} <PreviewIcon />
              </Box>
            </Grid2>
          </ListItem>
        </Grid2>
      ))}
    </List>
  );
};

export default Posts;
