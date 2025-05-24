// API service for connecting to the backend
const API_BASE_URL = 'http://localhost:8080/api/files';

// Get all files
export const getAllFiles = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}`);
    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching files:', error);
    throw error;
  }
};

// Upload a file
export const uploadFile = async (file) => {
  try {
    const formData = new FormData();
    formData.append('file', file);

    const response = await fetch(`${API_BASE_URL}/upload`, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error uploading file:', error);
    throw error;
  }
};

// Download a file
export const downloadFile = async (fileId, downloadKey) => {
  try {
    const response = await fetch(`${API_BASE_URL}/download/${fileId}?key=${downloadKey}`);
    if (!response.ok) {
      if (response.status === 403) {
        throw new Error('Invalid download key');
      }
      throw new Error(`Error: ${response.status}`);
    }
    
    const blob = await response.blob();
    const contentDisposition = response.headers.get('Content-Disposition');
    let filename = 'download';
    
    if (contentDisposition) {
      const filenameMatch = contentDisposition.match(/filename="(.+)"/); 
      if (filenameMatch && filenameMatch[1]) {
        filename = filenameMatch[1];
      }
    }
    
    // Create a download link and trigger the download
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
    
    return true;
  } catch (error) {
    console.error('Error downloading file:', error);
    throw error;
  }
};

// Delete a file
export const deleteFile = async (fileId, downloadKey) => {
  try {
    const response = await fetch(`${API_BASE_URL}/${fileId}?key=${downloadKey}`, {
      method: 'DELETE',
    });
    
    if (!response.ok) {
      if (response.status === 403) {
        throw new Error('Invalid download key');
      }
      throw new Error(`Error: ${response.status}`);
    }
    
    return true;
  } catch (error) {
    console.error('Error deleting file:', error);
    throw error;
  }
};
