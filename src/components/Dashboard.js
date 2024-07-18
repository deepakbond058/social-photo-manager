// src/components/Dashboard.js

import React, { useEffect, useState } from 'react';
import { db } from '../firebase';
import { collection, getDocs, updateDoc, doc } from 'firebase/firestore';
import { Box, Typography, Grid, Card, CardMedia, CardContent, CardActions, Button } from '@mui/material';
import { Visibility as VisibilityIcon } from '@mui/icons-material';
import { styled } from '@mui/system';

const DashboardContainer = styled(Box)({
  padding: '40px',
  backgroundColor: '#f5f5f5',
  minHeight: 'calc(100vh - 64px)', // Subtract the height of the navbar
});

const StyledCard = styled(Card)({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: '0 12px 20px rgba(0,0,0,0.2)',
  },
});

const Dashboard = () => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    const fetchImages = async () => {
      const querySnapshot = await getDocs(collection(db, 'images'));
      setImages(querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id })));
    };
    fetchImages();
  }, []);

  const incrementView = async (id, currentViews) => {
    const imageDoc = doc(db, 'images', id);
    await updateDoc(imageDoc, { views: currentViews + 1 });
    setImages(images.map(img => img.id === id ? { ...img, views: img.views + 1 } : img));
  };

  return (
    <DashboardContainer>
      <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', color: '#1976d2', marginBottom: '30px' }}>
        Image Dashboard
      </Typography>
      <Grid container spacing={4}>
        {images.map(image => (
          <Grid item xs={12} sm={6} md={4} key={image.id}>
            <StyledCard>
              <CardMedia
                component="img"
                height="200"
                image={image.url}
                alt="Uploaded image"
              />
              <CardContent>
                <Typography variant="body2" color="textSecondary" sx={{ display: 'flex', alignItems: 'center' }}>
                  <VisibilityIcon sx={{ marginRight: 1 }} /> Views: {image.views}
                </Typography>
              </CardContent>
              <CardActions>
                <Button
                  size="small"
                  color="primary"
                  onClick={() => incrementView(image.id, image.views)}
                  href={image.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View Image
                </Button>
              </CardActions>
            </StyledCard>
          </Grid>
        ))}
      </Grid>
    </DashboardContainer>
  );
};

export default Dashboard;
