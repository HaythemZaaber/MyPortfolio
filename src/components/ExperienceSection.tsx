import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Briefcase, GraduationCap, Calendar } from 'lucide-react';

const experiences = [
  // Education
  {
    type: 'education',
    title: 'Software Engineering',
    company: 'Higher Institute Of Applied Science And Technology Of Sousse (ISSAT)',
    period: '2022 - 2025',
    description: 'Focused on software engineering fundamentals, full-stack development, and real-world project delivery.',
    technologies: ['Software Engineering', 'Web Development', 'System Design'],
  },
  {
    type: 'education',
    title: 'Integrated Preparatory Cycle',
    company: 'Higher Institute Of Applied Science And Technology Of Sousse (ISSAT)',
    period: '2020 - 2022',
    description: 'Completed preparatory studies in mathematics, physics, and computer science foundations.',
    technologies: ['Mathematics', 'Physics', 'Computer Science'],
  },
  
  // Work / Leadership
  {
    type: 'work',
    title: 'End of Studies Internship (Remote)',
    company: "It'sGeeks | Paris, France",
    period: 'Mar 2025 - Sep 2025',
    description: 'Built a modular e-learning ecosystem with Next.js and NestJS, including identity and certification verification workflows, while shipping a production-ready Dockerized microservices deployment pipeline.',
    technologies: ['Next.js', 'NestJS', 'Prisma', 'PostgreSQL', 'Python', 'Docker', 'CI/CD', 'Nginx'],
  },
  {
    type: 'work',
    title: 'Frontend Developer (Full-Time, On-Site)',
    company: 'Niagara Tech | Sousse, Tunisia',
    period: 'Nov 2024 - Jun 2025',
    description: 'Migrated legacy interfaces to React/Next.js, integrated REST APIs with robust Redux Toolkit state management, and improved dashboard performance using code-splitting and lazy loading.',
    technologies: ['React', 'Next.js', 'Tailwind CSS', 'Redux Toolkit', 'REST APIs'],
  },
  {
    type: 'work',
    title: 'Full-Stack Developer Internship (Remote)',
    company: "It'sGeeks | Paris, France",
    period: 'Jul 2024 - Aug 2024',
    description: 'Developed a scalable expert search engine and an intelligent 1-on-1 scheduling module with time-zone conversion and automated notifications.',
    technologies: ['Next.js', 'NestJS', 'Scheduling Systems', 'Email Automation'],
  },
  {
    type: 'work',
    title: 'Full-Stack Developer Internship (On-Site)',
    company: 'Nachd-IT | Sousse, Tunisia',
    period: 'Jul 2023 - Sep 2023',
    description: 'Built a digital internship workflow platform with real-time tracking and custom reporting tools to reduce administrative errors.',
    technologies: ['Angular', 'Laravel', 'MongoDB', 'Reporting', 'Workflow Automation'],
  },
];


const TimelineItem = ({ 
  experience, 
  index, 
  isInView 
}: { 
  experience: typeof experiences[0]; 
  index: number; 
  isInView: boolean;
}) => {
  const isLeft = index % 2 === 0;
  const Icon = experience.type === 'work' ? Briefcase : GraduationCap;

  return (
    <motion.div
      initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.15 }}
      className={`relative flex flex-col md:flex-row items-center md:items-start gap-8 ${
        isLeft ? 'md:flex-row' : 'md:flex-row-reverse'
      }`}
    >
      {/* Content Card */}
      <div className={`w-full md:w-5/12 ${isLeft ? 'md:text-right' : 'md:text-left'}`}>
        <motion.div
          className="glass rounded-2xl p-6 card-hover group"
          whileHover={{ scale: 1.02 }}
        >
          <div className={`flex items-center gap-2 mb-2 ${isLeft ? 'md:justify-end' : 'md:justify-start'}`}>
            <Calendar className="w-4 h-4 text-primary" />
            <span className="text-sm text-primary font-mono">{experience.period}</span>
          </div>
          
          <h3 className="text-xl font-bold mb-1 group-hover:text-primary transition-colors">
            {experience.title}
          </h3>
          <p className="text-muted-foreground mb-3">{experience.company}</p>
          <p className="text-sm text-muted-foreground mb-4">{experience.description}</p>
          
          <div className={`flex flex-wrap gap-2 ${isLeft ? 'md:justify-end' : 'md:justify-start'}`}>
            {experience.technologies.map((tech) => (
              <span
                key={tech}
                className="px-2 py-1 text-xs rounded-full bg-primary/10 text-primary"
              >
                {tech}
              </span>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Timeline Node */}
      <div className="hidden md:flex w-2/12 justify-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={isInView ? { scale: 1 } : {}}
          transition={{ duration: 0.3, delay: index * 0.15 + 0.2 }}
          className="relative z-10 w-12 h-12 rounded-full glass-strong flex items-center justify-center glow-primary"
        >
          <Icon className="w-5 h-5 text-primary" />
        </motion.div>
      </div>

      {/* Empty space for alternating layout */}
      <div className="hidden md:block w-5/12" />
    </motion.div>
  );
};

const ExperienceSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="experience" className="py-20 md:py-32 relative">
      {/* Background Glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />

      <div className="container mx-auto px-6" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="section-title">
            Experience & <span className="gradient-text">Education</span>
          </h2>
          <p className="section-subtitle">
            My professional journey and academic background
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Timeline Line */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-primary/50 to-transparent" />

          {/* Timeline Items */}
          <div className="space-y-12">
            {experiences.map((experience, index) => (
              <TimelineItem
                key={`${experience.title}-${experience.period}`}
                experience={experience}
                index={index}
                isInView={isInView}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
