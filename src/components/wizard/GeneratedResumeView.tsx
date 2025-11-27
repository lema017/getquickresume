import { useState } from 'react';
import { GeneratedResume } from '@/types';
import { SectionImprovementModal } from './SectionImprovementModal';
import { useResumeStore } from '@/stores/resumeStore';
import { 
  FileText,      // Resumen
  Briefcase,     // Experiencia
  Zap,          // Habilidades
  GraduationCap, // Educación
  Award,        // Certificaciones
  FolderKanban, // Proyectos
  Trophy,       // Logros
  Globe,        // Idiomas
  Sparkles,     // IA
  Edit2,        // Editar
  Star,         // Honores
  User          // Contacto
} from 'lucide-react';

interface GeneratedResumeViewProps {
  resume: GeneratedResume;
  onEdit?: (section: string) => void;
}

export function GeneratedResumeView({ resume, onEdit }: GeneratedResumeViewProps) {
  const { updateResumeSection, setGeneratedResume } = useResumeStore();
  const [improvementModal, setImprovementModal] = useState<{
    isOpen: boolean;
    sectionType: 'summary' | 'experience' | 'education' | 'certification' | 'project' | 'achievement' | 'language';
    originalText: string;
  }>({
    isOpen: false,
    sectionType: 'summary',
    originalText: ''
  });

  // const handleImproveSection = (sectionType: typeof improvementModal.sectionType, originalText: string) => {
  //   setImprovementModal({
  //     isOpen: true,
  //     sectionType,
  //     originalText
  //   });
  // };

  const handleApproveImprovement = (improvedText: string) => {
    // TODO: Implementar actualización del resume con el texto mejorado
    console.log('Texto mejorado:', improvedText);
    // Aquí se actualizaría el estado del resume con el nuevo texto
  };

  const handleEnhancementComplete = (sectionType: string, enhancedText: string) => {
    try {
      // Update the resume section in the store
      const updatedResume = updateResumeSection(sectionType, enhancedText);
      if (updatedResume) {
        setGeneratedResume(updatedResume);
        // Optionally trigger re-scoring after enhancement
        // if (currentResumeId) {
        //   setTimeout(() => {
        //     scoreResume(currentResumeId).catch(err => console.error('Error re-scoring:', err));
        //   }, 1000);
        // }
      }
    } catch (error) {
      console.error('Error updating resume section:', error);
    }
  };

  const handleCloseImprovement = () => {
    setImprovementModal({
      isOpen: false,
      sectionType: 'summary',
      originalText: ''
    });
  };
  return (
    <div className="space-y-6">

      {/* Header with Contact Info */}
      <ContactInfoSection contactInfo={resume.contactInfo} onEdit={onEdit} />
      
      {/* Professional Summary */}
      <SummarySection summary={resume.professionalSummary} onEdit={onEdit} />
      
      {/* Experience - COMPLETA */}
      <ExperienceSection experiences={resume.experience} onEdit={onEdit} />
      
      {/* Skills - COMPLETAS (technical, soft, tools) */}
      <SkillsSection skills={resume.skills} onEdit={onEdit} />
      
      {/* Education - COMPLETA */}
      <EducationSection education={resume.education} onEdit={onEdit} />
      
      {/* Certifications - NUEVA */}
      {resume.certifications.length > 0 && (
        <CertificationsSection certifications={resume.certifications} onEdit={onEdit} />
      )}
      
      {/* Projects - NUEVA */}
      {resume.projects.length > 0 && (
        <ProjectsSection projects={resume.projects} onEdit={onEdit} />
      )}
      
      {/* General Achievements - NUEVA */}
      {resume.achievements.length > 0 && (
        <AchievementsSection achievements={resume.achievements} onEdit={onEdit} />
      )}
      
      {/* Languages - NUEVA */}
      {resume.languages.length > 0 && (
        <LanguagesSection languages={resume.languages} onEdit={onEdit} />
      )}

      {/* Section Improvement Modal */}
      <SectionImprovementModal
        isOpen={improvementModal.isOpen}
        onClose={handleCloseImprovement}
        sectionType={improvementModal.sectionType}
        originalText={improvementModal.originalText}
        onApprove={handleApproveImprovement}
      />
    </div>
  );
}

// Contact Info Section
function ContactInfoSection({ contactInfo, onEdit }: { contactInfo: GeneratedResume['contactInfo']; onEdit?: (section: string) => void }) {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <User className="w-5 h-5 text-blue-600 mr-2" />
          <h2 className="text-lg font-semibold text-gray-900">Información de Contacto</h2>
        </div>
        {onEdit && (
          <button
            onClick={() => onEdit('contact')}
            className="text-blue-600 hover:text-blue-800 text-sm flex items-center"
          >
            <Edit2 className="h-4 w-4 mr-1" />
            Editar
          </button>
        )}
      </div>
      
      <div className="text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          {contactInfo.fullName}
        </h1>
        <div className="flex flex-col sm:flex-row justify-center items-center gap-2 text-sm text-gray-500 mb-4">
          <span>{contactInfo.email}</span>
          <span className="hidden sm:inline">•</span>
          <span>{contactInfo.phone}</span>
          <span className="hidden sm:inline">•</span>
          <span>{contactInfo.location}</span>
        </div>
        {contactInfo.linkedin && (
          <div className="mt-2">
            <a 
              href={contactInfo.linkedin} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-800 text-sm flex items-center justify-center"
            >
              🔗 LinkedIn
            </a>
          </div>
        )}
      </div>
    </div>
  );
}

// Professional Summary Section
function SummarySection({ summary, onEdit }: { summary: string; onEdit?: (section: string) => void }) {
  const [improvementModal, setImprovementModal] = useState(false);

  const handleImproveSection = () => {
    setImprovementModal(true);
  };

  const handleApproveImprovement = (improvedText: string) => {
    // TODO: Implementar actualización del resume con el texto mejorado
    console.log('Texto mejorado:', improvedText);
  };

  return (
    <>
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <FileText className="w-5 h-5 text-blue-600 mr-2" />
          <h2 className="text-lg font-semibold text-gray-900">Resumen Profesional</h2>
        </div>
          <div className="flex gap-2">
            <button
              onClick={handleImproveSection}
              className="inline-flex items-center px-3 py-1.5 bg-gradient-to-r from-purple-500 to-blue-500 text-white text-sm font-medium rounded-lg hover:from-purple-600 hover:to-blue-600 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm hover:shadow-md"
            >
              <Sparkles className="h-4 w-4 mr-1" />
              Sugerencias con IA
            </button>
            {onEdit && (
              <button
                onClick={() => onEdit('summary')}
                className="flex items-center gap-1 px-3 py-1.5 text-sm bg-gray-50 text-gray-700 rounded-md hover:bg-gray-100 transition-colors"
              >
                <Edit2 className="h-4 w-4" />
                Editar
              </button>
            )}
          </div>
        </div>
        <p className="text-gray-700 leading-relaxed">{summary}</p>
      </div>

      <SectionImprovementModal
        isOpen={improvementModal}
        onClose={() => setImprovementModal(false)}
        sectionType="summary"
        originalText={summary}
        onApprove={handleApproveImprovement}
      />
    </>
  );
}

// Experience Section - MEJORADA
function ExperienceSection({ experiences, onEdit }: { experiences: GeneratedResume['experience']; onEdit?: (section: string) => void }) {
  const [improvementModal, setImprovementModal] = useState<{
    isOpen: boolean;
    experienceIndex: number;
    originalText: string;
  }>({
    isOpen: false,
    experienceIndex: -1,
    originalText: ''
  });

  if (experiences.length === 0) return null;

  const handleImproveExperience = (index: number, description: string) => {
    setImprovementModal({
      isOpen: true,
      experienceIndex: index,
      originalText: description
    });
  };

  const handleApproveImprovement = (improvedText: string) => {
    // TODO: Implementar actualización del resume con el texto mejorado
    console.log('Texto mejorado:', improvedText);
  };

  return (
    <>
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <Briefcase className="w-5 h-5 text-blue-600 mr-2" />
          <h2 className="text-lg font-semibold text-gray-900">Experiencia Laboral</h2>
        </div>
          {onEdit && (
            <button
              onClick={() => onEdit('experience')}
              className="text-blue-600 hover:text-blue-800 text-sm flex items-center"
            >
              <Edit2 className="h-4 w-4 mr-1" />
              Editar
            </button>
          )}
        </div>
      
      <div className="space-y-6">
        {experiences.map((exp, index) => (
          <div key={index} className="border-l-4 border-blue-200 pl-4">
            <div className="flex justify-between items-start mb-2">
              <div>
                <h3 className="font-semibold text-gray-900 text-lg">{exp.title}</h3>
                <p className="text-gray-600">{exp.company} • {exp.duration}</p>
                {exp.location && (
                  <p className="text-sm text-gray-500">{exp.location}</p>
                )}
              </div>
          <button
            onClick={() => handleImproveExperience(index, exp.description)}
            className="inline-flex items-center px-3 py-1.5 bg-gradient-to-r from-purple-500 to-blue-500 text-white text-sm font-medium rounded-lg hover:from-purple-600 hover:to-blue-600 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm hover:shadow-md"
          >
            <Sparkles className="h-4 w-4 mr-1" />
            Sugerencias con IA
          </button>
            </div>
            
            <p className="text-gray-700 mb-3 leading-relaxed">{exp.description}</p>
            
            {/* Achievements - TODOS */}
            {exp.achievements.length > 0 && (
              <div className="mb-3">
                <h4 className="font-medium text-gray-800 mb-2">Logros Clave:</h4>
                <ul className="space-y-1">
                  {exp.achievements.map((achievement, idx) => (
                    <li key={idx} className="text-sm text-gray-600 flex items-start">
                      <span className="text-blue-500 mr-2">•</span>
                      {achievement}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            
            {/* Skills del puesto - NUEVO */}
            {exp.skills.length > 0 && (
              <div className="mb-3">
                <h4 className="font-medium text-gray-800 mb-2">Habilidades:</h4>
                <div className="flex flex-wrap gap-2">
                  {exp.skills.map((skill, idx) => (
                    <span key={idx} className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}
            
          </div>
        ))}
      </div>
    </div>

    <SectionImprovementModal
      isOpen={improvementModal.isOpen}
      onClose={() => setImprovementModal({ isOpen: false, experienceIndex: -1, originalText: '' })}
      sectionType="experience"
      originalText={improvementModal.originalText}
      onApprove={handleApproveImprovement}
    />
  </>
  );
}

// Skills Section - MEJORADA
function SkillsSection({ skills, onEdit }: { skills: GeneratedResume['skills']; onEdit?: (section: string) => void }) {
  const hasSkills = skills.technical.length > 0 || skills.soft.length > 0 || skills.tools.length > 0;
  if (!hasSkills) return null;

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <Zap className="w-5 h-5 text-blue-600 mr-2" />
          <h2 className="text-lg font-semibold text-gray-900">Habilidades</h2>
        </div>
        {onEdit && (
          <button
            onClick={() => onEdit('skills')}
            className="text-blue-600 hover:text-blue-800 text-sm flex items-center"
          >
            <Edit2 className="h-4 w-4 mr-1" />
            Editar
          </button>
        )}
      </div>
      
      <div className="space-y-4">
        {/* Technical Skills - TODAS */}
        {skills.technical.length > 0 && (
          <div>
            <h4 className="font-medium text-gray-800 mb-3">Habilidades Técnicas</h4>
            <div className="flex flex-wrap gap-2">
              {skills.technical.map((skill, index) => (
                <span key={index} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}
        
        {/* Soft Skills - NUEVO */}
        {skills.soft.length > 0 && (
          <div>
            <h4 className="font-medium text-gray-800 mb-3">Habilidades Blandas</h4>
            <div className="flex flex-wrap gap-2">
              {skills.soft.map((skill, index) => (
                <span key={index} className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}
        
        {/* Tools - TODAS */}
        {skills.tools.length > 0 && (
          <div>
            <h4 className="font-medium text-gray-800 mb-3">Herramientas</h4>
            <div className="flex flex-wrap gap-2">
              {skills.tools.map((tool, index) => (
                <span key={index} className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
                  {tool}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// Education Section - MEJORADA
function EducationSection({ education, onEdit }: { education: GeneratedResume['education']; onEdit?: (section: string) => void }) {
  if (education.length === 0) return null;

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <GraduationCap className="w-5 h-5 text-blue-600 mr-2" />
          <h2 className="text-lg font-semibold text-gray-900">Educación</h2>
        </div>
        {onEdit && (
          <button
            onClick={() => onEdit('education')}
            className="text-blue-600 hover:text-blue-800 text-sm flex items-center"
          >
            <Edit2 className="h-4 w-4 mr-1" />
            Editar
          </button>
        )}
      </div>
      
      <div className="space-y-4">
        {education.map((edu, index) => (
          <div key={index} className="border-l-4 border-blue-200 pl-4">
            <h3 className="font-semibold text-gray-900">{edu.degree}</h3>
            <p className="text-gray-600">{edu.institution} • {edu.field}</p>
            <p className="text-gray-500 text-sm">{edu.duration}</p>
            
            {/* GPA - NUEVO */}
            {edu.gpa && (
              <p className="text-sm text-gray-600 mt-1">GPA: {edu.gpa}</p>
            )}
            
            {/* Relevant Coursework - NUEVO */}
            {edu.relevantCoursework && edu.relevantCoursework.length > 0 && (
              <div className="mt-2">
                <h4 className="font-medium text-gray-800 text-sm mb-1">Cursos Relevantes:</h4>
                <div className="flex flex-wrap gap-1">
                  {edu.relevantCoursework?.map((course, idx) => (
                    <span key={idx} className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">
                      {course}
                    </span>
                  ))}
                </div>
              </div>
            )}
            
            {/* Honors - NUEVO */}
            {edu.honors && edu.honors.length > 0 && (
              <div className="mt-2">
                <h4 className="font-medium text-gray-800 text-sm mb-1">Honores:</h4>
                <ul className="space-y-1">
                  {edu.honors?.map((honor, idx) => (
                    <li key={idx} className="text-sm text-gray-600 flex items-start">
                      <Star className="h-4 w-4 text-yellow-500 mr-2" />
                      {honor}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

// Certifications Section - NUEVA
function CertificationsSection({ certifications, onEdit }: { certifications: GeneratedResume['certifications']; onEdit?: (section: string) => void }) {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <Award className="w-5 h-5 text-blue-600 mr-2" />
          <h2 className="text-lg font-semibold text-gray-900">Certificaciones</h2>
        </div>
        {onEdit && (
          <button
            onClick={() => onEdit('certifications')}
            className="text-blue-600 hover:text-blue-800 text-sm flex items-center"
          >
            <Edit2 className="h-4 w-4 mr-1" />
            Editar
          </button>
        )}
      </div>
      
      <div className="space-y-4">
        {certifications.map((cert, index) => (
          <div key={index} className="border-l-4 border-yellow-200 pl-4">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-semibold text-gray-900">{cert.name}</h3>
                <p className="text-gray-600">{cert.issuer} • {cert.date}</p>
                {cert.credentialId && (
                  <p className="text-sm text-gray-500">ID: {cert.credentialId}</p>
                )}
              </div>
              {cert.url && (
                <a 
                  href={cert.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800 text-sm"
                >
                  🔗 Ver
                </a>
              )}
            </div>
            
            {/* Skills relacionadas */}
            {cert.skills.length > 0 && (
              <div className="mt-2">
                <div className="flex flex-wrap gap-1">
                  {cert.skills.map((skill, idx) => (
                    <span key={idx} className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-xs">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

// Projects Section - NUEVA
function ProjectsSection({ projects, onEdit }: { projects: GeneratedResume['projects']; onEdit?: (section: string) => void }) {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <FolderKanban className="w-5 h-5 text-blue-600 mr-2" />
          <h2 className="text-lg font-semibold text-gray-900">Proyectos</h2>
        </div>
        {onEdit && (
          <button
            onClick={() => onEdit('projects')}
            className="text-blue-600 hover:text-blue-800 text-sm flex items-center"
          >
            <Edit2 className="h-4 w-4 mr-1" />
            Editar
          </button>
        )}
      </div>
      
      <div className="space-y-6">
        {projects.map((project, index) => (
          <div key={index} className="border-l-4 border-green-200 pl-4">
            <div className="flex justify-between items-start mb-2">
              <div>
                <h3 className="font-semibold text-gray-900 text-lg">{project.name}</h3>
                <p className="text-gray-600">{project.duration}</p>
              </div>
              {project.url && (
                <a 
                  href={project.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800 text-sm"
                >
                  🔗 Ver Proyecto
                </a>
              )}
            </div>
            
            <p className="text-gray-700 mb-3 leading-relaxed">{project.description}</p>
            
            {/* Technologies */}
            {project.technologies.length > 0 && (
              <div className="mb-3">
                <h4 className="font-medium text-gray-800 mb-2">Tecnologías:</h4>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech, idx) => (
                    <span key={idx} className="bg-cyan-100 text-cyan-800 px-2 py-1 rounded text-xs">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            )}
            
            {/* Achievements */}
            {project.achievements.length > 0 && (
              <div className="mb-3">
                <h4 className="font-medium text-gray-800 mb-2">Logros:</h4>
                <ul className="space-y-1">
                  {project.achievements.map((achievement, idx) => (
                    <li key={idx} className="text-sm text-gray-600 flex items-start">
                      <span className="text-green-500 mr-2">•</span>
                      {achievement}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            
          </div>
        ))}
      </div>
    </div>
  );
}

// Achievements Section - NUEVA
function AchievementsSection({ achievements, onEdit }: { achievements: string[]; onEdit?: (section: string) => void }) {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <Trophy className="w-5 h-5 text-blue-600 mr-2" />
          <h2 className="text-lg font-semibold text-gray-900">Logros Generales</h2>
        </div>
        {onEdit && (
          <button
            onClick={() => onEdit('achievements')}
            className="text-blue-600 hover:text-blue-800 text-sm flex items-center"
          >
            <Edit2 className="h-4 w-4 mr-1" />
            Editar
          </button>
        )}
      </div>
      
      <div className="space-y-3">
        {achievements.map((achievement, index) => (
          <div key={index} className="flex items-start">
            <Star className="h-4 w-4 text-yellow-500 mr-3 mt-1" />
            <p className="text-gray-700 leading-relaxed">{achievement}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

// Languages Section - NUEVA
function LanguagesSection({ languages, onEdit }: { languages: GeneratedResume['languages']; onEdit?: (section: string) => void }) {
  const getLevelColor = (level: string) => {
    switch (level.toLowerCase()) {
      case 'native': return 'bg-green-100 text-green-800';
      case 'advanced': return 'bg-blue-100 text-blue-800';
      case 'intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'basic': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <Globe className="w-5 h-5 text-blue-600 mr-2" />
          <h2 className="text-lg font-semibold text-gray-900">Idiomas</h2>
        </div>
        {onEdit && (
          <button
            onClick={() => onEdit('languages')}
            className="text-blue-600 hover:text-blue-800 text-sm flex items-center"
          >
            <Edit2 className="h-4 w-4 mr-1" />
            Editar
          </button>
        )}
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {languages.map((lang, index) => (
          <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div>
              <h4 className="font-medium text-gray-900">{lang.language}</h4>
              {lang.certifications && lang.certifications.length > 0 && (
                <p className="text-sm text-gray-500">{lang.certifications.join(', ')}</p>
              )}
            </div>
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${getLevelColor(lang.level)}`}>
              {lang.level}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
