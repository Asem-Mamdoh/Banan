export const heroQuery = `*[_type == "hero"][0] {
  badge,
  headline,
  subheadline,
  ctaText,
  watchStoryText,
  "backgroundImage": backgroundImage.asset->url
}`;

export const featuresQuery = `*[_type == "featuresSection"][0] {
  badge,
  title,
  description,
  items[] {
    icon,
    title,
    subtitle,
    description,
    details[] { en, ar },
    whatsappMessage
  },
  consultExpertText
}`;

export const mediaQuery = `*[_type == "mediaSection"][0] {
  title,
  videoButtonText,
  photoButtonText,
  featuredVideo {
    title,
    subtitle,
    videoUrl,
    "videoFileUrl": videoFile.asset->url,
    "thumbnail": thumbnail.asset->url
  },
  videoGallery[] {
    title,
    category,
    videoUrl,
    "videoFileUrl": videoFile.asset->url,
    "thumbnail": thumbnail.asset->url
  },
  photoGallery[] {
    "image": image.asset->url,
    title,
    category
  }
}`;

export const siteSettingsQuery = `*[_type == "siteSettings"][0] {
  brandName,
  footerDescription,
  socialLinks,
  legalContent {
    privacyPolicy {
      title,
      content[] { en, ar }
    },
    termsOfService {
      title,
      content[] { en, ar }
    }
  },
  cookieSettings,
  navLabels,
  footerLabels
}`;

export const projectsSectionQuery = `*[_type == "projectsSection"][0] {
  badge,
  title,
  description
}`;

export const socialSectionQuery = `*[_type == "socialSection"][0] {
  whatsappTitle,
  whatsappSubtitle,
  feedImages[] {
    "url": asset->url
  }
}`;

/** Compact project data for the AI sales agent (matches project document fields). */
export const projectsForAgentQuery = `*[_type == "project"] | order(orderRank asc, _createdAt desc) {
  titleEn,
  titleAr,
  category,
  descriptionEn,
  descriptionAr,
  "mainImageUrl": mainImage.asset->url,
  specs,
  units
}`;

/** Full project data for the frontend gallery. */
export const projectsListQuery = `*[_type == "project"] | order(orderRank asc, _createdAt desc) {
  _id,
  "slug": slug.current,
  titleEn,
  titleAr,
  category,
  descriptionEn,
  descriptionAr,
  "mainImageUrl": mainImage.asset->url,
  "gallery": gallery[].asset->url,
  specs,
  units
}`;
