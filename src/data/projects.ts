export interface Project {
  id: string;
  image: string;
  translationKey: string;
  gallery: string[];
  specs: {
    area: string;
    bedrooms: string;
    type: string;
  };
}

export const projectsData: Project[] = [
  {
    id: 'sultan-haitham',
    image: '/assets/projects/sultan-haitham.png',
    translationKey: 'sultanHaitham',
    gallery: [
      '/assets/projects/sultan-haitham.png',
      'https://images.unsplash.com/photo-1498354178607-a79df2916198?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1582650625119-3a31f8fa2699?auto=format&fit=crop&w=1200&q=80'
    ],
    specs: {
      area: '1,200',
      bedrooms: '3-5',
      type: 'Smart Villa'
    }
  },
  {
    id: 'trump-aida',
    image: '/assets/projects/trump-aida.png',
    translationKey: 'trumpAida',
    gallery: [
      '/assets/projects/trump-aida.png',
      'https://images.unsplash.com/photo-1575517655861-39a976119bcc?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1200&q=80'
    ],
    specs: {
      area: '2,500',
      bedrooms: '4-6',
      type: 'Cliffside Mansion'
    }
  },
  {
    id: 'jebel-sifah',
    image: '/assets/projects/jebel-sifah.png',
    translationKey: 'jebelSifah',
    gallery: [
      '/assets/projects/jebel-sifah.png',
      'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1584132967334-10e028bd69f7?auto=format&fit=crop&w=1200&q=80'
    ],
    specs: {
      area: '850',
      bedrooms: '2-4',
      type: 'Marina Apartment'
    }
  },
  {
    id: 'the-great-escape',
    image: '/assets/projects/great-escape.png',
    translationKey: 'greatEscape',
    gallery: [
      '/assets/projects/great-escape.png',
      'https://images.unsplash.com/photo-1512918766671-5079a4be3281?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1480074568708-e7b720bb3f09?auto=format&fit=crop&w=1200&q=80'
    ],
    specs: {
      area: '1,500',
      bedrooms: '3-4',
      type: 'Mountain Villa'
    }
  }
];
