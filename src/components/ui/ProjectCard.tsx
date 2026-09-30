import { motion } from 'framer-motion';
import { useLanguage } from '../../context/LanguageContext';
import { urlFor } from '../../lib/sanity';

interface ProjectCardProps {
  project: any;
  onViewDetails: (project: any) => void;
}

const ProjectCard = ({ project, onViewDetails }: ProjectCardProps) => {
  const { language, isRtl, t } = useLanguage();

  const title = language === 'en' ? project.titleEn : project.titleAr;
  const rawDescription = language === 'en' ? project.descriptionEn : project.descriptionAr;

  const stripMarkdown = (text: string) => {
    if (!text) return '';
    return text
      .replace(/[#*`_~]/g, '') // Remove symbols
      .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1') // Remove links
      .replace(/!\[([^\]]*)\]\([^)]+\)/g, '') // Remove images
      .replace(/^\s*[-+*]\s+/gm, '') // Remove list bullets
      .replace(/^\s*\d+\.\s+/gm, '') // Remove numbered lists
      .trim();
  };

  const description = stripMarkdown(rawDescription);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.4 }}
      className="group relative flex flex-col bg-white overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 rounded-lg border border-gray-100"
    >
      {/* Image Container */}
      <div className="relative aspect-[4/5] overflow-hidden">
        <img
          src={project.mainImage ? urlFor(project.mainImage).url() : "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80"}
          alt={title}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        {/* Category Badge */}
        <div className={`absolute top-4 ${isRtl ? 'right-4' : 'left-4'}`}>
          <span className="px-3 py-1 bg-white/90 backdrop-blur-md text-[10px] font-bold uppercase tracking-widest text-[#1b1c1a] rounded-full">
            {(t.projects.categories as any)[project.category] || project.category}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-8 flex flex-col flex-grow">
        <h3 className={`mb-3 text-2xl font-headline font-bold text-[#1b1c1a] ${isRtl ? 'font-arabic' : ''}`}>
          {title}
        </h3>
        <p className={`mb-8 text-sm text-[#1b1c1a]/60 font-light leading-relaxed line-clamp-3 ${isRtl ? 'font-arabic' : ''}`}>
          {description}
        </p>

        <div className="mt-auto flex items-center justify-between gap-4">
          <button
            onClick={() => onViewDetails(project)}
            className={`flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.3em] text-[#1b1c1a] transition-all duration-300 hover:text-secondary group/link cursor-pointer`}
          >
            <span className="border-b border-transparent group-hover/link:border-secondary pb-0.5">
              {t.projects.viewDetails}
            </span>
            <span className={`material-symbols-outlined text-sm transition-transform duration-300 ${isRtl ? 'rotate-180 group-hover/link:-translate-x-1' : 'group-hover/link:translate-x-1'}`}>
              arrow_forward
            </span>
          </button>

          {project.brochureUrl && (
            <a
              href={project.brochureUrl}
              target="_blank"
              rel="noopener noreferrer"
              download
              className={`flex items-center gap-2 px-4 py-2 border border-[#1b1c1a]/10 text-[9px] font-bold uppercase tracking-[0.2em] text-[#1b1c1a]/60 transition-all duration-300 hover:bg-secondary hover:text-white hover:border-secondary group/download rounded-md`}
            >
              <span className="material-symbols-outlined text-sm leading-none">
                download
              </span>
              <span className="mb-0.5">
                {t.projects.downloadBrochure}
              </span>
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;
