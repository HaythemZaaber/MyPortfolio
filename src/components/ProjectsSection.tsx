import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { ExternalLink, Github, Folder, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

const projects = [
  {
    title: 'Lorem Project Alpha',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    tech: ['React', 'Node.js', 'MongoDB'],
    github: '#',
    live: '#',
    image: '/images/projects/placeholder.png',
    featured: true,
  },
  {
    title: 'Lorem Project Beta',
    description: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    tech: ['Python', 'Django', 'PostgreSQL'],
    github: '#',
    live: '#',
    image: '/images/projects/placeholder.png',
    featured: true,
  },
  {
    title: 'Lorem Project Gamma',
    description: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
    tech: ['TypeScript', 'Next.js', 'Tailwind'],
    github: '#',
    live: '#',
    image: '/images/projects/placeholder.png',
    featured: true,
  },
  {
    title: 'Lorem Project Delta',
    description: 'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    tech: ['Rust', 'WebAssembly'],
    github: '#',
    live: '#',
    image: '/images/projects/placeholder.png',
    featured: true,
  },
  {
    title: 'Lorem Project Epsilon',
    description: 'Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores.',
    tech: ['Go', 'Docker', 'Kubernetes'],
    github: '#',
    live: '#',
    featured: false,
  },
  {
    title: 'Lorem Project Zeta',
    description: 'Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit.',
    tech: ['Vue.js', 'Firebase', 'GraphQL'],
    github: '#',
    live: '#',
    featured: false,
  },
];


const ProjectModal = ({ project, onClose }: { project: typeof projects[0]; onClose: () => void }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ type: 'spring', duration: 0.5 }}
        className="relative glass rounded-2xl overflow-hidden max-w-3xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/50 hover:bg-black/70 transition-colors"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Project Image */}
        <div className="relative h-64 md:h-80 overflow-hidden bg-gradient-to-br from-primary/20 via-accent/10 to-secondary">
          {project.image ? (
            <>
              <img 
                src={project.image} 
                alt={project.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
            </>
          ) : (
            <div className="absolute inset-0 flex items-center justify-center">
              <Folder className="w-24 h-24 text-primary/40" />
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-8">
          <div className="flex items-start justify-between mb-4">
            <h3 className="text-3xl font-bold gradient-text">
              {project.title}
            </h3>
            <div className="flex gap-3">
              <motion.a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-full hover:bg-primary/20 transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <Github className="w-6 h-6" />
              </motion.a>
              <motion.a
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-full hover:bg-primary/20 transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <ExternalLink className="w-6 h-6" />
              </motion.a>
            </div>
          </div>
          
          <p className="text-muted-foreground text-base leading-relaxed mb-6">
            {project.description}
          </p>

          <div className="flex flex-wrap gap-2">
            {project.tech.map((tech) => (
              <span
                key={tech}
                className="px-4 py-2 text-sm rounded-full bg-primary/10 text-primary border border-primary/20"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

const ProjectCard = ({ project, index, isInView }: { project: typeof projects[0]; index: number; isInView: boolean }) => {
  const [hoverTimer, setHoverTimer] = useState<NodeJS.Timeout | null>(null);
  const [showModal, setShowModal] = useState(false);

  const handleMouseEnter = () => {
    const timer = setTimeout(() => {
      setShowModal(true);
    }, 3000); // 3 seconds
    setHoverTimer(timer);
  };

  const handleMouseLeave = () => {
    if (hoverTimer) {
      clearTimeout(hoverTimer);
      setHoverTimer(null);
    }
  };

  const handleClick = () => {
    setShowModal(true);
    if (hoverTimer) {
      clearTimeout(hoverTimer);
      setHoverTimer(null);
    }
  };

  useEffect(() => {
    return () => {
      if (hoverTimer) {
        clearTimeout(hoverTimer);
      }
    };
  }, [hoverTimer]);

  if (project.featured) {
    return (
      <>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          className="group relative glass rounded-2xl overflow-hidden card-hover cursor-pointer"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onClick={handleClick}
        >
          {/* Project Image */}
          <div className="relative h-48 overflow-hidden bg-gradient-to-br from-primary/20 via-accent/10 to-secondary">
            {project.image ? (
              <>
                <img 
                  src={project.image} 
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-500" />
              </>
            ) : (
              <div className="absolute inset-0 flex items-center justify-center">
                <Folder className="w-16 h-16 text-primary/40 group-hover:scale-110 transition-transform duration-500" />
              </div>
            )}
            <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/10 transition-colors duration-500" />
          </div>

          {/* Content */}
          <div className="p-6">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-xl font-bold group-hover:text-primary transition-colors duration-300">
                {project.title}
              </h3>
              <div className="flex gap-2">
                <motion.a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-full hover:bg-primary/20 transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={(e) => e.stopPropagation()}
                >
                  <Github className="w-5 h-5" />
                </motion.a>
                <motion.a
                  href={project.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-full hover:bg-primary/20 transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={(e) => e.stopPropagation()}
                >
                  <ExternalLink className="w-5 h-5" />
                </motion.a>
              </div>
            </div>
            
            <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
              {project.description}
            </p>

            <div className="flex flex-wrap gap-2">
              {project.tech.map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1 text-xs rounded-full bg-primary/10 text-primary border border-primary/20"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </motion.div>

        <AnimatePresence>
          {showModal && (
            <ProjectModal project={project} onClose={() => setShowModal(false)} />
          )}
        </AnimatePresence>
      </>
    );
  }

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
        className="group glass rounded-xl p-6 card-hover cursor-pointer"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={handleClick}
      >
        <div className="flex items-center justify-between mb-4">
          <Folder className="w-10 h-10 text-primary" />
          <div className="flex gap-2">
            <a 
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary transition-colors"
              onClick={(e) => e.stopPropagation()}
            >
              <Github className="w-5 h-5" />
            </a>
            <a 
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary transition-colors"
              onClick={(e) => e.stopPropagation()}
            >
              <ExternalLink className="w-5 h-5" />
            </a>
          </div>
        </div>
        
        <h3 className="text-lg font-bold mb-2 group-hover:text-primary transition-colors">
          {project.title}
        </h3>
        <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
          {project.description}
        </p>
        
        <div className="flex flex-wrap gap-2">
          {project.tech.slice(0, 3).map((tech) => (
            <span key={tech} className="text-xs text-muted-foreground font-mono">
              {tech}
            </span>
          ))}
        </div>
      </motion.div>

      <AnimatePresence>
        {showModal && (
          <ProjectModal project={project} onClose={() => setShowModal(false)} />
        )}
      </AnimatePresence>
    </>
  );
};

const ProjectsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const featuredProjects = projects.filter((p) => p.featured);
  const otherProjects = projects.filter((p) => !p.featured);

  return (
    <section id="projects" className="py-20 md:py-32 relative">
      {/* Background Glow */}
      <div className="absolute top-1/2 right-0 w-80 h-80 bg-accent/10 rounded-full blur-3xl -translate-y-1/2" />

      <div className="container mx-auto px-6" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="section-title">
            Featured <span className="gradient-text">Projects</span>
          </h2>
          <p className="section-subtitle">
            Click on any project for more details.
          </p>
        </motion.div>

        {/* Featured Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {featuredProjects.map((project, index) => (
            <ProjectCard
              key={project.title}
              project={project}
              index={index}
              isInView={isInView}
            />
          ))}
        </div>

        {/* Other Projects */}
        <motion.h3
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.4 }}
          className="text-xl font-bold text-center mb-8"
        >
          Other Noteworthy Projects
        </motion.h3>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
          {otherProjects.map((project, index) => (
            <ProjectCard
              key={project.title}
              project={project}
              index={index}
              isInView={isInView}
            />
          ))}
        </div>

        {/* View More Button */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.6 }}
          className="text-center"
        >
          <Button variant="outline" className="glow-border hover:bg-primary/10 rounded-full px-8">
            <a href="https://github.com/HaythemZaaber?tab=repositories" target="_blank" rel="noopener noreferrer">
              View All Projects
            </a>  
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default ProjectsSection;