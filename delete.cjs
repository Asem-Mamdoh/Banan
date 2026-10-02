const { createClient } = require('@sanity/client');
const client = createClient({ 
  projectId: 'dicolbis', 
  dataset: 'production', 
  apiVersion: '2023-05-03', 
  useCdn: false,
  token: 'skM8Z4VlXoB11z72m9c72R6e8n1P7s8L6U4d3sL4k7zY2y8u5H9T3h6N8d1Q7m5W3e5D1s5F2X8b3k4T3q2R9v6X7c4E2A8V5T1S6Q4A7L2P4I6X9g4M8s6H2L4f8B7c9W3s8K1V5P9m4B2' // Wait, I don't have the token!
}); 

// If I don't have a token, I cannot delete via API.
