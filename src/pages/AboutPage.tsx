import { useTranslation } from 'react-i18next';
import { Heart, Users, Target, Zap } from 'lucide-react';

export function AboutPage() {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-6">
            {t('about.title')}
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {t('about.mission')}
          </p>
        </div>

        {/* Mission Section */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 mb-12">
          <div className="text-center">
            <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <Heart className="w-10 h-10 text-primary" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              {t('about.ourMission')}
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              {t('about.missionDescription')}
            </p>
          </div>
        </div>

        {/* Values */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Accesibilidad
            </h3>
            <p className="text-gray-600">
              Herramientas profesionales disponibles para todos, sin importar su nivel de experiencia o recursos.
            </p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Target className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Precisión
            </h3>
            <p className="text-gray-600">
              Utilizamos IA avanzada para optimizar cada CV según las mejores prácticas de reclutamiento.
            </p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Zap className="w-8 h-8 text-purple-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Eficiencia
            </h3>
            <p className="text-gray-600">
              Proceso rápido y guiado que te permite crear un CV profesional en minutos, no horas.
            </p>
          </div>
        </div>

        {/* Story */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Nuestra Historia
          </h2>
          <div className="prose max-w-none">
            <p className="text-gray-600 leading-relaxed mb-4">
              GetQuickResume nació de una necesidad personal. Como profesionales en el sector tecnológico, 
              nos dimos cuenta de que crear un currículum efectivo era más difícil de lo que debería ser. 
              Las herramientas existentes eran costosas, complicadas o simplemente no estaban optimizadas 
              para los sistemas de reclutamiento modernos.
            </p>
            <p className="text-gray-600 leading-relaxed mb-4">
              Decidimos crear una solución que combinara la simplicidad de uso con la potencia de la 
              inteligencia artificial. Nuestro objetivo era hacer que cualquier persona, independientemente 
              de su experiencia técnica, pudiera crear un currículum que realmente destacara.
            </p>
            <p className="text-gray-600 leading-relaxed">
              Hoy, miles de profesionales confían en GetQuickResume para crear currículums que les 
              abren puertas a nuevas oportunidades. Estamos orgullosos de ser parte de su éxito profesional.
            </p>
          </div>
        </div>

        {/* Team */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            Nuestro Equipo
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                name: "Ana García",
                role: "CEO & Fundadora",
                description: "Experta en recursos humanos con más de 10 años ayudando a profesionales a destacar.",
                image: "https://via.placeholder.com/150?text=AG"
              },
              {
                name: "Carlos López",
                role: "CTO & Co-fundador",
                description: "Ingeniero de software especializado en IA y machine learning aplicado al reclutamiento.",
                image: "https://via.placeholder.com/150?text=CL"
              },
              {
                name: "María Rodríguez",
                role: "Diseñadora UX/UI",
                description: "Especialista en experiencia de usuario, enfocada en hacer herramientas accesibles para todos.",
                image: "https://via.placeholder.com/150?text=MR"
              }
            ].map((member, index) => (
              <div key={index} className="text-center">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-24 h-24 rounded-full mx-auto mb-4"
                />
                <h3 className="text-lg font-semibold text-gray-900 mb-1">
                  {member.name}
                </h3>
                <p className="text-primary font-medium mb-2">
                  {member.role}
                </p>
                <p className="text-sm text-gray-600">
                  {member.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="bg-primary rounded-lg p-8 text-white text-center">
          <h2 className="text-2xl font-bold mb-8">
            Nuestro Impacto
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="text-4xl font-bold mb-2">10,000+</div>
              <div className="text-primary-100">CVs creados</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">95%</div>
              <div className="text-primary-100">Tasa de satisfacción</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">50+</div>
              <div className="text-primary-100">Países atendidos</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
