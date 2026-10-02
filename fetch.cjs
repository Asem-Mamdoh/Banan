const { createClient } = require('@sanity/client');
const client = createClient({ 
  projectId: 'dicolbis', 
  dataset: 'production', 
  apiVersion: '2023-05-03', 
  useCdn: false 
}); 

client.fetch('*[_type=="project"]{ _id, titleEn, titleAr }').then(projects => {
  console.log(JSON.stringify(projects, null, 2));
}).catch(console.error);
