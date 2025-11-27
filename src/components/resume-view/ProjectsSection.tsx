import { Project } from '@/types';
import { useTranslation } from 'react-i18next';
import { FolderKanban } from 'lucide-react';

interface ProjectsSectionProps {
  projects: Project[];
}

export function ProjectsSection({ projects }: ProjectsSectionProps) {
  const { t } = useTranslation();

  if (!projects || projects.length === 0) {
    return null;
  }

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <div className="flex items-center mb-4">
        <FolderKanban className="w-5 h-5 text-blue-600 mr-2" />
        <h2 className="text-lg font-semibold text-gray-900">
          {t('resumeView.sections.projects')}
        </h2>
      </div>
      
      <div className="space-y-4">
        {projects.map((project) => (
          <div key={project.id} className="border-l-4 border-purple-200 pl-4">
            <h3 className="font-semibold text-gray-900">{project.name}</h3>
            {project.description && (
              <p className="text-gray-600 mt-1 leading-relaxed">{project.description}</p>
            )}
            {project.technologies && project.technologies.length > 0 && (
              <div className="mt-2 flex flex-wrap gap-2">
                {project.technologies.map((tech, idx) => (
                  <span
                    key={idx}
                    className="bg-purple-100 text-purple-800 px-2 py-1 rounded text-xs"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            )}
            {project.url && (
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-blue-600 hover:text-blue-800 transition-colors mt-2 inline-block"
              >
                {t('resumeView.actions.viewProject')}
              </a>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

