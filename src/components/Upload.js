// src/components/Upload.js

import React, { useState } from 'react';
import { storage, db } from '../firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { collection, addDoc, doc, updateDoc } from 'firebase/firestore';
import { Box, Button, Typography, CircularProgress, IconButton, Paper } from '@mui/material';
import { ContentCopy as CopyIcon, OpenInNew as OpenInNewIcon, CloudUpload as CloudUploadIcon } from '@mui/icons-material';
import { styled } from '@mui/system';

const UploadContainer = styled(Paper)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  margin: '50px auto',
  padding: '40px',
  borderRadius: '15px',
  maxWidth: '500px',
  backgroundColor: '#ffffff',
  boxShadow: '0 10px 20px rgba(0,0,0,0.1)',
});

const StyledButton = styled(Button)({
  marginTop: '20px',
  padding: '10px 20px',
  background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
  color: 'white',
  boxShadow: '0 3px 5px 2px rgba(33, 203, 243, .3)',
  '&:hover': {
    background: 'linear-gradient(45deg, #21CBF3 30%, #2196F3 90%)',
  },
});

const UrlContainer = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  marginTop: '20px',
  padding: '10px',
  borderRadius: '10px',
  backgroundColor: '#e3f2fd',
  boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
  width: '100%',
});

const Upload = () => {
  const [image, setImage] = useState(null);
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [imageId, setImageId] = useState('');
  const [imageViews, setImageViews] = useState(0);

  const handleChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleUpload = () => {
    if (image) {
      setLoading(true);
      const storageRef = ref(storage, `images/${image.name}`);
      uploadBytes(storageRef, image).then((snapshot) => {
        getDownloadURL(snapshot.ref).then((url) => {
          addDoc(collection(db, 'images'), {
            url,
            views: 0,
          }).then((docRef) => {
            const imageUrlWithId = `${window.location.origin}/redirect.html?url=${encodeURIComponent(url)}&id=${docRef.id}`;
            setUrl(imageUrlWithId);
            setImageId(docRef.id);
            setLoading(false);
          });
        });
      });
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(url);
    alert('URL copied to clipboard!');
    incrementView(imageId, imageViews);
  };

  const incrementView = async (id, currentViews) => {
    const imageDoc = doc(db, 'images', id);
    await updateDoc(imageDoc, { views: currentViews + 1 });
    setImageViews(currentViews + 1);
  };

  return (
    <UploadContainer elevation={3}>
      <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', color: '#1976d2' }}>
        Upload an Image
      </Typography>
      <input
        accept="image/*"
        style={{ display: 'none' }}
        id="raised-button-file"
        type="file"
        onChange={handleChange}
      />
      <label htmlFor="raised-button-file">
        <Button
          variant="outlined"
          component="span"
          startIcon={<CloudUploadIcon />}
          sx={{ marginBottom: 2 }}
        >
          Choose File
        </Button>
      </label>
      <Typography variant="body2" sx={{ marginBottom: 2 }}>
        {image ? image.name : 'No file chosen'}
      </Typography>
      <StyledButton variant="contained" onClick={handleUpload} disabled={loading}>
        {loading ? <CircularProgress size={24} sx={{ color: '#fff' }} /> : 'Upload'}
      </StyledButton>
      {url && (
        <UrlContainer>
          <Typography variant="body1" sx={{ wordBreak: 'break-all', flexGrow: 1 }}>
            {url}
          </Typography>
          <IconButton onClick={copyToClipboard} sx={{ ml: 1 }}>
            <CopyIcon />
          </IconButton>
          <IconButton
            component="a"
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => incrementView(imageId, imageViews)}
            sx={{ ml: 1 }}
          >
            <OpenInNewIcon />
          </IconButton>
        </UrlContainer>
      )}
    </UploadContainer>
  );
};

export default Upload;
