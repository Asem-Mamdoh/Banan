import { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import ProjectModal from '../ui/ProjectModal';
import { AnimatePresence, motion } from 'framer-motion';

const ProjectsGallery = () => {
  const { t, isRtl, cmsData } = useLanguage();
  const [selectedProject, setSelectedProject] = useState<any | null>(null);
  const [showAll, setShowAll] = useState(false);

  // Fallback if CMS data is still loading or undefined
  const projects = cmsData?.projectsList || [];
  const visibleProjects = showAll ? projects : projects.slice(0, 6);

  return (
    <section id="projects" className="section-padding bg-surface">
      <div className="container-custom">
        {/* Header Section */}
        <div className="mb-16 text-center" data-aos="fade-up">
          <span className="mb-4 inline-block text-[10px] font-bold uppercase tracking-[0.4em] text-secondary">
            {cmsData?.projectsSection?.badge || t.projects.badge}
          </span>
          <h2 className="mb-6 text-4xl md:text-5xl lg:text-6xl font-headline font-bold text-[#1b1c1a] tracking-tight">
            {cmsData?.projectsSection?.title || t.projects.title}
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-[#1b1c1a]/60 leading-relaxed">
            {cmsData?.projectsSection?.description || t.projects.description}
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {visibleProjects.map((project: any, index: number) => {
              const title = isRtl ? project.titleAr : project.titleEn;
              const description = isRtl ? project.descriptionAr : project.descriptionEn;
              
              return (
                <motion.div 
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                  key={project._id}
                  className="group relative flex flex-col overflow-hidden bg-surface-container-low transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl"
                >
                {/* Media Container */}
                <div className="relative aspect-[4/5] overflow-hidden">
                  <img
                    src={project.mainImageUrl}
                    alt={title}
                    className="h-full w-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                  
                  {/* Floating ID/Number (Curator Style) */}
                  <div className="absolute top-6 start-6 size-10 flex items-center justify-center border border-white/20 text-white/50 text-[10px] font-bold backdrop-blur-md opacity-0 group-hover:opacity-100 transition-all duration-700 delay-100">
                    0{index + 1}
                  </div>
                </div>

                {/* Content Container */}
                <div className="flex flex-col p-8 bg-[#faf9f5]">
                  <div className="mb-2 flex items-center gap-3">
                    <span className="h-px w-6 bg-secondary/30"></span>
                    <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-secondary">
                      {project.category}
                    </span>
                  </div>
                  
                  <h3 className="mb-4 text-2xl font-headline font-bold text-[#1b1c1a]">
                    {title}
                  </h3>
                  
                  <p className="mb-8 text-sm leading-relaxed text-[#1b1c1a]/60 font-light line-clamp-3">
                    {description}
                  </p>
                  
                  {/* Action Link (Minimalist) */}
                  <div 
                    onClick={() => setSelectedProject(project)}
                    className={`mt-auto flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.3em] text-[#1b1c1a] transition-all duration-300 hover:text-secondary group/link cursor-pointer ${isRtl ? 'flex-row-reverse' : ''}`}
                  >
                    <span className="border-b border-transparent group-hover/link:border-secondary pb-0.5">
                      {t.projects.viewDetails}
                    </span>
                    <span className={`material-symbols-outlined text-sm transition-transform duration-300 ${isRtl ? 'rotate-180 group-hover/link:-translate-x-1' : 'group-hover/link:translate-x-1'}`}>
                      arrow_forward
                    </span>
                  </div>
                </div>
              </motion.div>
            );
          })}
          </AnimatePresence>
        </div>

        {/* View All Button */}
        {projects.length > 6 && (
          <div className="mt-16 flex justify-center" data-aos="fade-up">
            <button
              onClick={() => setShowAll(!showAll)}
              className="group relative flex items-center justify-center gap-3 overflow-hidden border border-[#1b1c1a]/20 bg-transparent px-8 py-4 text-[10px] font-bold uppercase tracking-[0.3em] text-[#1b1c1a] transition-all duration-500 hover:border-[#1b1c1a] hover:bg-[#1b1c1a] hover:text-white"
            >
              <span className="relative z-10">
                {showAll 
                  ? (isRtl ? 'عرض عدد أقل' : 'View Less') 
                  : (isRtl ? 'عرض جميع المشاريع' : 'View All Projects')}
              </span>
            </button>
          </div>
        )}
      </div>

      {/* Project Details Modal */}
      <ProjectModal 
        project={selectedProject} 
        onClose={() => setSelectedProject(null)} 
      />
    </section>
  );
};

export default ProjectsGallery;
