import { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { projectsData, Project } from '../../data/projects';
import ProjectModal from '../ui/ProjectModal';

const ProjectsGallery = () => {
  const { t, isRtl } = useLanguage();
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <section id="projects" className="section-padding bg-surface">
      <div className="container-custom">
        {/* Header Section */}
        <div className="mb-16 text-center" data-aos="fade-up">
          <span className="mb-4 inline-block text-[10px] font-bold uppercase tracking-[0.4em] text-secondary">
            {t.projects.badge}
          </span>
          <h2 className="mb-6 text-4xl md:text-5xl lg:text-6xl font-headline font-bold text-[#1b1c1a] tracking-tight">
            {t.projects.title}
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-[#1b1c1a]/60 leading-relaxed">
            {t.projects.description}
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-3">
          {projectsData.map((project, index) => {
            const projectInfo = (t.projects.items as any)[project.translationKey];
            
            return (
              <div 
                key={project.id}
                className="group relative flex flex-col overflow-hidden bg-surface-container-low transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl"
                data-aos="fade-up"
                data-aos-delay={index * 100}
              >
                {/* Media Container */}
                <div className="relative aspect-[4/5] overflow-hidden">
                  <img
                    src={project.image}
                    alt={projectInfo.title}
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
                      {projectInfo.category}
                    </span>
                  </div>
                  
                  <h3 className="mb-4 text-2xl font-headline font-bold text-[#1b1c1a]">
                    {projectInfo.title}
                  </h3>
                  
                  <p className="mb-8 text-sm leading-relaxed text-[#1b1c1a]/60 font-light line-clamp-3">
                    {projectInfo.description}
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
              </div>
            );
          })}
        </div>
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
