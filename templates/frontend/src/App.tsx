import React, { useState, useRef, useEffect } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import './App.css';
import {
  A4_DIMENSIONS,
  measureElementHeight,
  findElementsInShadow,
  fitsOnPage,
  isIndivisible,
  wouldBeOrphaned,
} from './paginationService';
import { extractColorsFromCode, applyColorChanges, ExtractedColor } from './utils/colorExtractor';

interface SampleData {
  // Header fields at root level (not nested)
  name?: string;
  title?: string;
  contact?: {
    phone?: string;
    email?: string;
    website?: string;
    location?: string;
  };
  profile?: string;
  profilePageNumber?: number; // Always page 1
  skills?: string[];
  skillsPageNumbers?: number[]; // Array matching skills array
  experience?: Array<{
    position: string;
    company: string;
    startDate: string;
    endDate: string;
    description?: string[];
    pageNumber?: number;
  }>;
  projects?: Array<{
    name: string;
    description: string;
    pageNumber?: number;
  }>;
  education?: Array<{
    institution: string;
    degree: string;
    startDate: string;
    endDate: string;
    pageNumber?: number;
  }>;
  languages?: string[];
  languagesPageNumbers?: number[]; // Array matching languages array
  achievements?: string[];
  achievementsPageNumbers?: number[]; // Array matching achievements array
  certifications?: string[];
  certificationsPageNumbers?: number[]; // Array matching certifications array
}

type MockDataSize = 'small' | 'medium' | 'large' | 'xlarge';

// Generate mock data based on size
function generateMockData(size: MockDataSize): SampleData {
  const skillPools = [
    'JavaScript', 'TypeScript', 'Python', 'Java', 'C++', 'C#', 'Go', 'Rust', 'Swift', 'Kotlin',
    'React', 'Vue.js', 'Angular', 'Next.js', 'Node.js', 'Express', 'Django', 'Flask', 'Spring', 'Laravel',
    'PostgreSQL', 'MySQL', 'MongoDB', 'Redis', 'Elasticsearch', 'DynamoDB', 'Cassandra', 'Neo4j', 'SQLite', 'Oracle',
    'AWS', 'Azure', 'GCP', 'Docker', 'Kubernetes', 'Terraform', 'Ansible', 'Jenkins', 'GitLab CI', 'GitHub Actions',
    'GraphQL', 'REST API', 'gRPC', 'WebSocket', 'Microservices', 'Serverless', 'Lambda', 'S3', 'EC2', 'RDS',
    'HTML5', 'CSS3', 'SASS', 'LESS', 'Tailwind CSS', 'Bootstrap', 'Material-UI', 'Ant Design', 'Webpack', 'Vite',
    'Git', 'SVN', 'Mercurial', 'Jira', 'Confluence', 'Slack', 'Agile', 'Scrum', 'Kanban', 'DevOps'
  ];

  const projectNames = [
    'E-commerce Platform', 'Cloud Migration Project', 'Mobile Banking App', 'AI Recommendation System',
    'Real-time Analytics Dashboard', 'IoT Device Management', 'Blockchain Voting System', 'Healthcare Management System',
    'Social Media Analytics', 'Supply Chain Optimization', 'Video Streaming Platform', 'Learning Management System'
  ];

  const projectDescriptions = [
    'Full-stack e-commerce solution with payment integration, serving 50K+ active users. Implemented real-time inventory management and secure checkout process.',
    'Led migration of legacy systems to AWS, reducing infrastructure costs by 35% and improving system reliability.',
    'Developed mobile-first banking application with biometric authentication, handling 100K+ daily transactions securely.',
    'Built machine learning recommendation engine that improved user engagement by 45% using collaborative filtering algorithms.',
    'Created real-time analytics dashboard processing 1M+ events per minute using Apache Kafka and Elasticsearch.',
    'Designed and implemented IoT platform managing 10K+ connected devices with real-time monitoring and alerting.',
    'Developed blockchain-based voting system ensuring transparency and security for electoral processes.',
    'Built comprehensive healthcare management system with HIPAA compliance, serving 20+ medical facilities.',
    'Created social media analytics platform analyzing 500M+ posts daily with sentiment analysis and trend detection.',
    'Optimized supply chain logistics reducing delivery time by 30% using predictive analytics and route optimization.',
    'Developed scalable video streaming platform supporting 4K content delivery to 100K+ concurrent users.',
    'Built learning management system with AI-powered course recommendations, serving 50K+ students.'
  ];

  const companyNames = [
    'Tech Corp', 'Startup Inc', 'Global Solutions', 'Innovation Labs', 'Digital Ventures', 'Cloud Systems',
    'Data Analytics Co', 'Software Solutions', 'Enterprise Tech', 'Future Systems', 'Smart Technologies', 'NextGen Inc'
  ];

  const positions = [
    'Senior Software Engineer', 'Software Engineer', 'Lead Developer', 'Full Stack Developer',
    'Backend Engineer', 'Frontend Engineer', 'DevOps Engineer', 'Cloud Architect',
    'Data Engineer', 'Machine Learning Engineer', 'Mobile Developer', 'Security Engineer'
  ];

  const institutions = [
    'University of Technology', 'State University', 'Tech Institute', 'Engineering College',
    'Computer Science University', 'Institute of Technology', 'Polytechnic University', 'Science Academy'
  ];

  const degrees = [
    'Bachelor of Science in Computer Science', 'Master of Science in Software Engineering',
    'Bachelor of Engineering', 'Master of Computer Applications', 'Bachelor of Information Technology',
    'Master of Science in Data Science', 'Bachelor of Science in Information Systems', 'PhD in Computer Science'
  ];

  const languages = [
    'English', 'Spanish', 'French', 'German', 'Mandarin', 'Japanese', 'Portuguese', 'Italian',
    'Russian', 'Arabic', 'Hindi', 'Korean', 'Dutch', 'Swedish', 'Norwegian', 'Danish'
  ];

  const achievements = [
    'Best Innovation Award - Tech Corp Annual Awards 2022',
    'Published 3 technical articles on cloud architecture',
    'Open source contributor with 500+ GitHub stars',
    'Led team that won Best Product Award at Tech Conference 2023',
    'Speaker at International Developer Conference 2022',
    'Mentored 10+ junior developers, improving team productivity by 25%',
    'Achieved 99.9% uptime for critical production systems',
    'Reduced system response time by 60% through optimization',
    'Contributed to open source project with 10K+ stars',
    'Earned AWS Solutions Architect Professional certification',
    'Won hackathon competition with innovative AI solution',
    'Published research paper in top-tier computer science journal'
  ];

  const certifications = [
    'AWS Certified Solutions Architect - 2021',
    'Kubernetes Certified Administrator - 2020',
    'Google Cloud Professional Cloud Architect - 2019',
    'Microsoft Azure Solutions Architect Expert - 2022',
    'Docker Certified Associate - 2021',
    'Certified Kubernetes Application Developer - 2023',
    'Terraform Associate Certification - 2022',
    'Oracle Certified Professional Java SE Developer - 2020',
    'MongoDB Certified Developer Associate - 2021',
    'Elastic Certified Engineer - 2022',
    'Certified Information Systems Security Professional - 2023',
    'Scrum Master Certification - 2021'
  ];

  const getCount = (size: MockDataSize) => {
    switch (size) {
      case 'small': return { skills: 10, projects: 1, experience: 1, education: 1, languages: 1, achievements: 1, certifications: 1 };
      case 'medium': return { skills: 20, projects: 2, experience: 2, education: 2, languages: 2, achievements: 2, certifications: 2 };
      case 'large': return { skills: 30, projects: 3, experience: 3, education: 3, languages: 3, achievements: 3, certifications: 3 };
      case 'xlarge': return { skills: 60, projects: 6, experience: 6, education: 6, languages: 6, achievements: 6, certifications: 6 };
    }
  };

  const counts = getCount(size);

  // Generate skills
  const skills = skillPools.slice(0, counts.skills);

  // Generate projects
  const projects = Array.from({ length: counts.projects }, (_, i) => ({
    name: projectNames[i % projectNames.length],
    description: projectDescriptions[i % projectDescriptions.length]
  }));

  // Generate experience
  const experience = Array.from({ length: counts.experience }, (_, i) => {
    const year = 2024 - (i * 2);
    return {
      position: positions[i % positions.length],
      company: companyNames[i % companyNames.length],
      startDate: year.toString(),
      endDate: i === 0 ? 'Present' : (year - 2).toString(),
      description: [
        `Improved system performance by ${40 + i * 5}% through optimization`,
        `Led team of ${5 + i} developers in agile environment`,
        `Architected scalable solutions handling ${10 + i * 5}M+ requests daily`
      ]
    };
  });

  // Generate education
  const education = Array.from({ length: counts.education }, (_, i) => {
    const startYear = 2018 - (i * 2);
    return {
      institution: institutions[i % institutions.length],
      degree: degrees[i % degrees.length],
      startDate: startYear.toString(),
      endDate: (startYear + 4).toString()
    };
  });

  // Generate languages
  const selectedLanguages = languages.slice(0, counts.languages);

  // Generate achievements
  const selectedAchievements = achievements.slice(0, counts.achievements);

  // Generate certifications
  const selectedCertifications = certifications.slice(0, counts.certifications);

  return {
    name: 'John Doe',
    title: 'Senior Software Engineer',
    contact: {
      phone: '+1 (555) 123-4567',
      email: 'john.doe@example.com',
      website: 'johndoe.dev',
      location: 'San Francisco, CA'
    },
    profile: 'Experienced software engineer with 8+ years of expertise in full-stack development, cloud architecture, and team leadership. Proven track record of delivering scalable solutions and leading cross-functional teams.',
    skills,
    experience,
    projects,
    education,
    languages: selectedLanguages,
    achievements: selectedAchievements,
    certifications: selectedCertifications
  };
}

// API base URL for getquickresume API
// GetQuickResume API runs on port 3001 (see serverless.yml)
// Templates server API runs on port 4000 (see templates/server/server.js)
// Note: serverless-offline uses /dev/ prefix for local development
const API_BASE_URL = 'http://localhost:3001/dev';

function App() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [generatedCode, setGeneratedCode] = useState<string | null>(null);
  const [sampleData, setSampleData] = useState<SampleData | null>(null);
  const [mockDataSize, setMockDataSize] = useState<MockDataSize>('medium');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [isPaginating, setIsPaginating] = useState(false);
  const [paginatedData, setPaginatedData] = useState<SampleData | null>(null);
  const [showPromoteModal, setShowPromoteModal] = useState(false);
  const [promoting, setPromoting] = useState(false);
  const [promoteSuccess, setPromoteSuccess] = useState(false);
  const [promoteError, setPromoteError] = useState<string | null>(null);
  
  // Template modification state
  const [modificationPrompt, setModificationPrompt] = useState<string>('');
  const [modifying, setModifying] = useState(false);
  const [modificationError, setModificationError] = useState<string | null>(null);
  const [modificationSuccess, setModificationSuccess] = useState(false);
  
  // Manual code editing state
  const [editedCode, setEditedCode] = useState<string | null>(null);
  const [isCodeEdited, setIsCodeEdited] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [previewingManualChanges, setPreviewingManualChanges] = useState(false);
  
  // Color modification state
  const [extractedColors, setExtractedColors] = useState<Array<{ id: string; value: string; originalValue: string; label: string; context: string; occurrences: number }>>([]);
  const [modifiedColors, setModifiedColors] = useState<Map<string, string>>(new Map());
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [colorModifiedCode, setColorModifiedCode] = useState<string | null>(null);
  const [colorsModified, setColorsModified] = useState(false);
  
  // Template metadata - collected BEFORE image upload
  const [templateMetadata, setTemplateMetadata] = useState({
    id: '',
    name: '',
    tagName: ''
  });
  
  // Promotion form - only for description, category, and variant name
  const [templateForm, setTemplateForm] = useState({
    id: '',
    name: '',
    description: '',
    category: 'free' as 'free' | 'premium',
    tagName: '',
    variantName: ''
  });
  const fileInputRef = useRef<HTMLInputElement>(null);
  const previewIframeRef = useRef<HTMLIFrameElement>(null);
  
  // Initialize template metadata on mount
  useEffect(() => {
    const defaultId = generateTemplateId();
    const defaultName = 'My Resume Template';
    const defaultTagName = toKebabCase(defaultName);
    setTemplateMetadata({
      id: defaultId,
      name: defaultName,
      tagName: defaultTagName.includes('-') ? defaultTagName : `${defaultTagName}-template`
    });
  }, []);

  /**
   * Handle template metadata changes
   */
  const handleMetadataChange = (field: 'id' | 'name' | 'tagName', value: string) => {
    setTemplateMetadata(prev => {
      const updated = { ...prev, [field]: value };
      
      // Auto-generate tagName from name if name is being changed
      if (field === 'name' && value) {
        const kebabName = toKebabCase(value);
        // Ensure it has at least one hyphen for valid custom element name
        if (kebabName && !kebabName.includes('-')) {
          updated.tagName = `${kebabName}-template`;
        } else if (kebabName) {
          updated.tagName = kebabName;
        }
      }
      
      return updated;
    });
  };

  /**
   * Validate template metadata
   */
  const isMetadataValid = (): boolean => {
    if (!templateMetadata.id.trim()) return false;
    if (!templateMetadata.name.trim()) return false;
    if (!templateMetadata.tagName.trim()) return false;
    return validateTagName(templateMetadata.tagName.trim());
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.type.startsWith('image/')) {
        setSelectedFile(file);
        setError(null);
        setPreviewUrl(URL.createObjectURL(file));
      } else {
        setError('Please select an image file');
      }
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      setSelectedFile(file);
      setError(null);
      setPreviewUrl(URL.createObjectURL(file));
    } else {
      setError('Please drop an image file');
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const generateTemplate = async () => {
    console.log('[App] generateTemplate called');
    
    // Validate metadata first
    if (!isMetadataValid()) {
      setError('Please fill in all template metadata fields (ID, Name, Tag Name) with valid values');
      return;
    }
    
    if (!selectedFile) {
      console.error('[App] No file selected');
      setError('Please select an image file first');
      return;
    }

    console.log('[App] Starting template generation...');
    console.log('[App] Template metadata:', templateMetadata);
    setLoading(true);
    setError(null);
    setGeneratedCode(null);
    setSampleData(null);

    try {
      const formData = new FormData();
      formData.append('image', selectedFile);
      formData.append('templateId', templateMetadata.id.trim());
      formData.append('templateName', templateMetadata.name.trim());
      formData.append('tagName', templateMetadata.tagName.trim());
      console.log('[App] Sending request to API with metadata...');

      const response = await fetch('/api/generate-template', {
        method: 'POST',
        body: formData
      });
      console.log('[App] API response received:', response.status, response.statusText);

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ error: 'Unknown error' }));
        const errorMessage = errorData.error || errorData.message || `Server error: ${response.status}`;
        const errorDetails = errorData.details ? ` Details: ${JSON.stringify(errorData.details)}` : '';
        throw new Error(errorMessage + errorDetails);
      }

      const data = await response.json();
      console.log('[App] Template generated successfully');
      console.log('[App] Code length:', data.code?.length || 0);
      
      // Generate mock data based on current size selection
      const mockData = generateMockData(mockDataSize);
      console.log('[App] Generated mock data for size:', mockDataSize);
      console.log('[App] Sample data:', mockData);
      
      setGeneratedCode(data.code);
      setSampleData(mockData);
      
      // Reset edit state when new template is generated
      setEditedCode(null);
      setIsCodeEdited(false);
      setEditMode(false);
      
      // Reset color modification state
      setModifiedColors(new Map());
      setColorModifiedCode(null);
      setColorsModified(false);
      setShowColorPicker(false);
      
      // Small delay to ensure state is set before rendering
      setTimeout(() => {
        console.log('[App] Rendering template in iframe...');
        renderTemplateInIframe(data.code, mockData);
        // Start pagination after initial render
        setTimeout(() => {
          console.log('[App] Starting pagination...');
          applyPagination(data.code, mockData);
        }, 2000); // Wait for initial render to complete
      }, 100);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      console.error('Error generating template:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleModifyTemplate = async () => {
    if (!generatedCode || !modificationPrompt.trim()) {
      setModificationError('Please enter a modification request');
      return;
    }

    if (!templateMetadata.tagName) {
      setModificationError('Template tagName is required');
      return;
    }

    setModifying(true);
    setModificationError(null);
    setModificationSuccess(false);

    try {
      const formData = new FormData();
      formData.append('currentCode', generatedCode);
      formData.append('modificationPrompt', modificationPrompt.trim());
      formData.append('tagName', templateMetadata.tagName.trim());
      
      // Optionally include original image if available
      if (selectedFile) {
        formData.append('image', selectedFile);
      }

      console.log('[App] Sending modification request to API...');
      const response = await fetch('/api/modify-template', {
        method: 'POST',
        body: formData
      });

      console.log('[App] Modification API response received:', response.status, response.statusText);

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ error: 'Unknown error' }));
        const errorMessage = errorData.error || errorData.message || `Server error: ${response.status}`;
        const errorDetails = errorData.details ? ` Details: ${JSON.stringify(errorData.details)}` : '';
        throw new Error(errorMessage + errorDetails);
      }

      const data = await response.json();
      console.log('[App] Template modified successfully');
      console.log('[App] Modified code length:', data.code?.length || 0);

      // Update generated code
      setGeneratedCode(data.code);
      
      // Reset edit state when code is modified via API
      setEditedCode(null);
      setIsCodeEdited(false);
      setEditMode(false);
      
      // Reset color modification state
      setModifiedColors(new Map());
      setColorModifiedCode(null);
      setColorsModified(false);
      setShowColorPicker(false);
      
      // Get current mock data (preserve current size)
      const currentMockData = sampleData || generateMockData(mockDataSize);
      
      // Force reload iframe to clear custom element registry
      // When we modify a template, the custom element is already registered in the iframe.
      // Setting src to 'about:blank' clears the document and custom element registry,
      // allowing the new modified code to register properly.
      const iframe = previewIframeRef.current;
      if (iframe) {
        console.log('[App] Force reloading iframe to clear custom element registry...');
        
        // Clean up any existing onload handler to prevent cycles
        iframe.onload = null;
        
        // Set iframe src to 'about:blank' to clear the document and custom element registry
        // This ensures the new modified code can register the custom element without conflicts
        iframe.src = 'about:blank';
        
        // Wait for iframe to reload using a Promise-based approach
        // This avoids setting onload handlers that could create cycles
        const waitForIframeReload = (): Promise<void> => {
          return new Promise((resolve) => {
            const checkIframe = () => {
              if (iframe.contentDocument && iframe.contentDocument.readyState === 'complete') {
                console.log('[App] Iframe reloaded, custom element registry cleared.');
                resolve();
              } else {
                setTimeout(checkIframe, 50);
              }
            };
            // Start checking after a short delay to allow iframe to start reloading
            setTimeout(checkIframe, 100);
          });
        };
        
        waitForIframeReload().then(() => {
          // Small delay to ensure iframe document is fully ready
          setTimeout(() => {
            console.log('[App] Re-rendering modified template in iframe...');
            renderTemplateInIframe(data.code, currentMockData);
            // Re-apply pagination after render
            setTimeout(() => {
              console.log('[App] Re-applying pagination to modified template...');
              applyPagination(data.code, currentMockData);
            }, 2000);
          }, 100);
        });
      } else {
        console.error('[App] Iframe ref is null, cannot reload');
        // Fallback: try to render anyway
        setTimeout(() => {
          console.log('[App] Re-rendering modified template in iframe (fallback)...');
          renderTemplateInIframe(data.code, currentMockData);
          setTimeout(() => {
            console.log('[App] Re-applying pagination to modified template...');
            applyPagination(data.code, currentMockData);
          }, 2000);
        }, 100);
      }

      // Clear modification prompt and show success
      setModificationPrompt('');
      setModificationSuccess(true);
      
      // Clear success message after 3 seconds
      setTimeout(() => {
        setModificationSuccess(false);
      }, 3000);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An error occurred while modifying the template';
      setModificationError(errorMessage);
      console.error('Error modifying template:', err);
    } finally {
      setModifying(false);
    }
  };

  // Manual code editing functions
  const handleEditModeToggle = () => {
    if (!editMode) {
      // Entering edit mode - initialize editedCode with current generatedCode
      if (generatedCode) {
        setEditedCode(generatedCode);
        setIsCodeEdited(false);
      }
    } else {
      // Exiting edit mode - check if code was modified
      if (editedCode && generatedCode && editedCode !== generatedCode) {
        setIsCodeEdited(true);
      } else {
        setIsCodeEdited(false);
      }
    }
    setEditMode(!editMode);
  };

  const handleCodeEdit = (newCode: string) => {
    setEditedCode(newCode);
    // Check if code differs from original
    if (generatedCode && newCode !== generatedCode) {
      setIsCodeEdited(true);
    } else {
      setIsCodeEdited(false);
    }
  };

  const handleResetCode = () => {
    if (generatedCode) {
      setEditedCode(generatedCode);
      setIsCodeEdited(false);
    }
  };

  const handlePreviewManualChanges = async () => {
    if (!editedCode || !editedCode.trim()) {
      console.error('[App] No edited code to preview');
      return;
    }

    if (!templateMetadata.tagName) {
      console.error('[App] Template tagName is required');
      return;
    }

    setPreviewingManualChanges(true);

    try {
      // Get current mock data (preserve current size)
      const currentMockData = sampleData || generateMockData(mockDataSize);

      // Force reload iframe to clear custom element registry
      const iframe = previewIframeRef.current;
      if (iframe) {
        console.log('[App] Force reloading iframe to preview manual changes...');
        
        // Clean up any existing onload handler to prevent cycles
        iframe.onload = null;
        
        // Set iframe src to 'about:blank' to clear the document and custom element registry
        iframe.src = 'about:blank';

        // Wait for iframe to reload using a Promise-based approach
        // This avoids setting onload handlers that could create cycles
        const waitForIframeReload = (): Promise<void> => {
          return new Promise((resolve) => {
            const checkIframe = () => {
              if (iframe.contentDocument && iframe.contentDocument.readyState === 'complete') {
                console.log('[App] Iframe reloaded, custom element registry cleared.');
                resolve();
              } else {
                setTimeout(checkIframe, 50);
              }
            };
            // Start checking after a short delay to allow iframe to start reloading
            setTimeout(checkIframe, 100);
          });
        };
        
        waitForIframeReload().then(() => {
          // Small delay to ensure iframe document is fully ready
          setTimeout(() => {
            console.log('[App] Rendering manually edited code in iframe...');
            renderTemplateInIframe(editedCode, currentMockData);
            // Re-apply pagination after render
            setTimeout(() => {
              console.log('[App] Re-applying pagination to manually edited code...');
              applyPagination(editedCode, currentMockData);
            }, 2000);
          }, 100);
        });
      } else {
        console.error('[App] Iframe ref is null, cannot preview');
      }
    } catch (err) {
      console.error('Error previewing manual changes:', err);
    } finally {
      setPreviewingManualChanges(false);
    }
  };

  /**
   * Handle color change in color picker
   */
  const handleColorChange = (colorId: string, newValue: string) => {
    const newModifiedColors = new Map(modifiedColors);
    newModifiedColors.set(colorId, newValue);
    setModifiedColors(newModifiedColors);
    
    // Get the code to modify
    const codeToModify = isCodeEdited && editedCode ? editedCode : generatedCode;
    if (!codeToModify) return;
    
    // Apply color changes immediately
    const modifiedCode = applyColorChanges(codeToModify, newModifiedColors);
    setColorModifiedCode(modifiedCode);
    setColorsModified(true);
    
    // Get current mock data
    const currentMockData = sampleData || generateMockData(mockDataSize);
    
    // Force reload iframe to clear custom element registry
    const iframe = previewIframeRef.current;
    if (iframe) {
      // Clean up any existing onload handler to prevent cycles
      iframe.onload = null;
      
      // Set iframe src to 'about:blank' to clear the document and custom element registry
      iframe.src = 'about:blank';
      
      // Wait for iframe to reload using a Promise-based approach
      const waitForIframeReload = (): Promise<void> => {
        return new Promise((resolve) => {
          const checkIframe = () => {
            if (iframe.contentDocument && iframe.contentDocument.readyState === 'complete') {
              resolve();
            } else {
              setTimeout(checkIframe, 50);
            }
          };
          setTimeout(checkIframe, 100);
        });
      };
      
      waitForIframeReload().then(() => {
        setTimeout(() => {
          renderTemplateInIframe(modifiedCode, currentMockData);
          setTimeout(() => {
            applyPagination(modifiedCode, currentMockData);
          }, 2000);
        }, 100);
      });
    }
  };

  /**
   * Reset a single color to original
   */
  const handleResetColor = (colorId: string) => {
    const newModifiedColors = new Map(modifiedColors);
    newModifiedColors.delete(colorId);
    setModifiedColors(newModifiedColors);
    
    // If no colors are modified, reset everything
    if (newModifiedColors.size === 0) {
      setColorModifiedCode(null);
      setColorsModified(false);
      
      // Re-render with original code
      const codeToRender = isCodeEdited && editedCode ? editedCode : generatedCode;
      if (codeToRender) {
        const currentMockData = sampleData || generateMockData(mockDataSize);
        const iframe = previewIframeRef.current;
        if (iframe) {
          iframe.onload = null;
          iframe.src = 'about:blank';
          
          const waitForIframeReload = (): Promise<void> => {
            return new Promise((resolve) => {
              const checkIframe = () => {
                if (iframe.contentDocument && iframe.contentDocument.readyState === 'complete') {
                  resolve();
                } else {
                  setTimeout(checkIframe, 50);
                }
              };
              setTimeout(checkIframe, 100);
            });
          };
          
          waitForIframeReload().then(() => {
            setTimeout(() => {
              renderTemplateInIframe(codeToRender, currentMockData);
              setTimeout(() => {
                applyPagination(codeToRender, currentMockData);
              }, 2000);
            }, 100);
          });
        }
      }
    } else {
      // Apply remaining color changes
      const codeToModify = isCodeEdited && editedCode ? editedCode : generatedCode;
      if (codeToModify) {
        const modifiedCode = applyColorChanges(codeToModify, newModifiedColors);
        setColorModifiedCode(modifiedCode);
        
        const currentMockData = sampleData || generateMockData(mockDataSize);
        const iframe = previewIframeRef.current;
        if (iframe) {
          iframe.onload = null;
          iframe.src = 'about:blank';
          
          const waitForIframeReload = (): Promise<void> => {
            return new Promise((resolve) => {
              const checkIframe = () => {
                if (iframe.contentDocument && iframe.contentDocument.readyState === 'complete') {
                  resolve();
                } else {
                  setTimeout(checkIframe, 50);
                }
              };
              setTimeout(checkIframe, 100);
            });
          };
          
          waitForIframeReload().then(() => {
            setTimeout(() => {
              renderTemplateInIframe(modifiedCode, currentMockData);
              setTimeout(() => {
                applyPagination(modifiedCode, currentMockData);
              }, 2000);
            }, 100);
          });
        }
      }
    }
  };

  /**
   * Reset all colors to original
   */
  const handleResetAllColors = () => {
    setModifiedColors(new Map());
    setColorModifiedCode(null);
    setColorsModified(false);
    
    // Re-render with original code
    const codeToRender = isCodeEdited && editedCode ? editedCode : generatedCode;
    if (codeToRender) {
      const currentMockData = sampleData || generateMockData(mockDataSize);
      const iframe = previewIframeRef.current;
      if (iframe) {
        iframe.onload = null;
        iframe.src = 'about:blank';
        
        const waitForIframeReload = (): Promise<void> => {
          return new Promise((resolve) => {
            const checkIframe = () => {
              if (iframe.contentDocument && iframe.contentDocument.readyState === 'complete') {
                resolve();
              } else {
                setTimeout(checkIframe, 50);
              }
            };
            setTimeout(checkIframe, 100);
          });
        };
        
        waitForIframeReload().then(() => {
          setTimeout(() => {
            renderTemplateInIframe(codeToRender, currentMockData);
            setTimeout(() => {
              applyPagination(codeToRender, currentMockData);
            }, 2000);
          }, 100);
        });
      }
    }
  };

  /**
   * Measure rendered content in iframe shadow DOM
   */
  const measureRenderedContent = (): {
    header?: number;
    profile?: number;
    skills?: number;
    experience: Array<{ index: number; height: number }>;
    projects: Array<{ index: number; height: number }>;
    education: Array<{ index: number; height: number }>;
    languages?: number;
    achievements?: number;
    certifications?: number;
  } | null => {
    const iframe = previewIframeRef.current;
    if (!iframe) {
      console.log('[PAGINATION] Iframe ref is null');
      return null;
    }

    const iframeDoc = iframe.contentDocument || iframe.contentWindow?.document;
    if (!iframeDoc) {
      console.log('[PAGINATION] Cannot access iframe document');
      return null;
    }

    const container = iframeDoc.getElementById('preview-container');
    if (!container) {
      console.log('[PAGINATION] Preview container not found');
      return null;
    }

    const tagName = templateMetadata.tagName || 'resume-component';
    const component = container.querySelector(tagName) as any;
    if (!component || !component.shadowRoot) {
      console.log('[PAGINATION] Component or shadowRoot not found');
      return null;
    }

    const shadowRoot = component.shadowRoot;
    console.log('[PAGINATION] Starting measurement of rendered content');

    const measurements: {
      header?: number;
      profile?: number;
      skills?: number;
      experience: Array<{ index: number; height: number }>;
      projects: Array<{ index: number; height: number }>;
      education: Array<{ index: number; height: number }>;
      languages?: number;
      achievements?: number;
      certifications?: number;
    } = {
      experience: [],
      projects: [],
      education: [],
    };

    // Measure header
    const headerEl = findElementsInShadow(shadowRoot, '.header, header, [class*="header"]')[0];
    if (headerEl) {
      measurements.header = measureElementHeight(headerEl);
    }

    // Measure profile/summary - look for section with PROFILE title or profile class
    const profileSection = findElementsInShadow(shadowRoot, '.section').find(section => {
      const title = section.querySelector('.section-title');
      return title && (title.textContent?.includes('PROFILE') || title.textContent?.includes('Profile') || title.textContent?.includes('SUMMARY'));
    });
    if (profileSection) {
      measurements.profile = measureElementHeight(profileSection);
    } else {
      // Fallback to class-based search
      const profileEl = findElementsInShadow(shadowRoot, '.profile, .summary, [class*="profile"], [class*="summary"]')[0];
      if (profileEl) {
        measurements.profile = measureElementHeight(profileEl);
      }
    }

    // Measure skills section - look for section with SKILLS title or skills container
    const skillsSection = findElementsInShadow(shadowRoot, '.section').find(section => {
      const title = section.querySelector('.section-title');
      return title && (title.textContent?.includes('SKILLS') || title.textContent?.includes('Skills'));
    });
    if (skillsSection) {
      measurements.skills = measureElementHeight(skillsSection);
    } else {
      // Fallback to class-based search
      const skillsContainer = findElementsInShadow(shadowRoot, '.skills-container, .skills-grid, .skills-list, [class*="skill"]')[0];
      if (skillsContainer) {
        measurements.skills = measureElementHeight(skillsContainer);
      }
    }

    // Measure experience items - look in section with WORK EXPERIENCE title
    const experienceSection = findElementsInShadow(shadowRoot, '.section').find(section => {
      const title = section.querySelector('.section-title');
      return title && (title.textContent?.includes('EXPERIENCE') || title.textContent?.includes('Experience'));
    });
    if (experienceSection) {
      const experienceItems = experienceSection.querySelectorAll('.experience-item, [class*="experience-item"]');
      experienceItems.forEach((item, index) => {
        const height = measureElementHeight(item as Element);
        measurements.experience.push({ index, height });
      });
    } else {
      // Fallback to direct search
      const experienceItems = findElementsInShadow(shadowRoot, '.experience-item, [class*="experience-item"]');
      experienceItems.forEach((item, index) => {
        const height = measureElementHeight(item);
        measurements.experience.push({ index, height });
      });
    }

    // Measure project items - look in section with PROJECTS title
    const projectsSection = findElementsInShadow(shadowRoot, '.section').find(section => {
      const title = section.querySelector('.section-title');
      return title && (title.textContent?.includes('PROJECTS') || title.textContent?.includes('Projects'));
    });
    if (projectsSection) {
      const projectItems = projectsSection.querySelectorAll('.project-item, [class*="project-item"]');
      projectItems.forEach((item, index) => {
        const height = measureElementHeight(item as Element);
        measurements.projects.push({ index, height });
      });
    } else {
      // Fallback to direct search
      const projectItems = findElementsInShadow(shadowRoot, '.project-item, [class*="project-item"]');
      projectItems.forEach((item, index) => {
        const height = measureElementHeight(item);
        measurements.projects.push({ index, height });
      });
    }

    // Measure education items - look in section with EDUCATION title
    const educationSection = findElementsInShadow(shadowRoot, '.section').find(section => {
      const title = section.querySelector('.section-title');
      return title && (title.textContent?.includes('EDUCATION') || title.textContent?.includes('Education'));
    });
    if (educationSection) {
      const educationItems = educationSection.querySelectorAll('.education-item, [class*="education-item"]');
      educationItems.forEach((item, index) => {
        const height = measureElementHeight(item as Element);
        measurements.education.push({ index, height });
      });
    } else {
      // Fallback to direct search
      const educationItems = findElementsInShadow(shadowRoot, '.education-item, [class*="education-item"]');
      educationItems.forEach((item, index) => {
        const height = measureElementHeight(item);
        measurements.education.push({ index, height });
      });
    }

    // Measure languages - look in section with LANGUAGES title
    const languagesSection = findElementsInShadow(shadowRoot, '.section').find(section => {
      const title = section.querySelector('.section-title');
      return title && (title.textContent?.includes('LANGUAGES') || title.textContent?.includes('Languages'));
    });
    if (languagesSection) {
      measurements.languages = measureElementHeight(languagesSection);
    } else {
      // Fallback to class-based search
      const languagesEl = findElementsInShadow(shadowRoot, '.languages-list, [class*="language"]')[0];
      if (languagesEl) {
        measurements.languages = measureElementHeight(languagesEl);
      }
    }

    // Measure achievements - look in section with ACHIEVEMENTS title
    const achievementsSection = findElementsInShadow(shadowRoot, '.section').find(section => {
      const title = section.querySelector('.section-title');
      return title && (title.textContent?.includes('ACHIEVEMENTS') || title.textContent?.includes('Achievements'));
    });
    if (achievementsSection) {
      measurements.achievements = measureElementHeight(achievementsSection);
    } else {
      // Fallback to class-based search
      const achievementsEl = findElementsInShadow(shadowRoot, '.achievements-list, [class*="achievement"]')[0];
      if (achievementsEl) {
        measurements.achievements = measureElementHeight(achievementsEl);
      }
    }

    // Measure certifications - look in section with CERTIFICATIONS title
    const certificationsSection = findElementsInShadow(shadowRoot, '.section').find(section => {
      const title = section.querySelector('.section-title');
      return title && (title.textContent?.includes('CERTIFICATIONS') || title.textContent?.includes('Certifications'));
    });
    if (certificationsSection) {
      measurements.certifications = measureElementHeight(certificationsSection);
    } else {
      // Fallback to class-based search
      const certificationsEl = findElementsInShadow(shadowRoot, '.certifications-list, [class*="certification"]')[0];
      if (certificationsEl) {
        measurements.certifications = measureElementHeight(certificationsEl);
      }
    }

    console.log('[PAGINATION] Measurement complete:', measurements);
    return measurements;
  };

  /**
   * Measure template padding from the rendered .resume container
   */
  const measureTemplatePadding = (): { top: number; bottom: number } => {
    const iframe = previewIframeRef.current;
    if (!iframe) {
      console.log('[PAGINATION] Iframe ref is null, using default padding');
      return { top: 0, bottom: 0 };
    }

    const iframeDoc = iframe.contentDocument || iframe.contentWindow?.document;
    if (!iframeDoc) {
      console.log('[PAGINATION] Cannot access iframe document, using default padding');
      return { top: 0, bottom: 0 };
    }

    const container = iframeDoc.getElementById('preview-container');
    if (!container) {
      console.log('[PAGINATION] Preview container not found, using default padding');
      return { top: 0, bottom: 0 };
    }

    const tagName = templateMetadata.tagName || 'resume-component';
    const component = container.querySelector(tagName) as any;
    if (!component || !component.shadowRoot) {
      console.log('[PAGINATION] Component or shadowRoot not found, using default padding');
      return { top: 0, bottom: 0 };
    }

    const shadowRoot = component.shadowRoot;
    const resumeEl = shadowRoot.querySelector('.resume') as HTMLElement;
    
    if (!resumeEl) {
      console.log('[PAGINATION] .resume element not found, using default padding');
      return { top: 0, bottom: 0 };
    }

    const computedStyle = iframeDoc.defaultView?.getComputedStyle(resumeEl);
    if (!computedStyle) {
      console.log('[PAGINATION] Cannot get computed style, using default padding');
      return { top: 0, bottom: 0 };
    }

    const paddingTop = parseFloat(computedStyle.paddingTop) || 0;
    const paddingBottom = parseFloat(computedStyle.paddingBottom) || 0;

    console.log(`[PAGINATION] Template padding measured: top=${paddingTop}px, bottom=${paddingBottom}px`);
    return { top: paddingTop, bottom: paddingBottom };
  };

  /**
   * Calculate pagination for a page iteratively
   * Following PAGINATION_FLOW.md algorithm
   */
  const calculatePagination = async (
    data: SampleData,
    targetPage: number
  ): Promise<SampleData> => {
    console.log(`[PAGINATION] Calculating pagination for page ${targetPage}`);
    
    // Wait for render to complete
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Measure template padding
    const templatePadding = measureTemplatePadding();
    
    // Calculate adjusted available height accounting for margins and template padding
    const availableHeight = A4_DIMENSIONS.heightPX 
      - A4_DIMENSIONS.topMargin 
      - A4_DIMENSIONS.bottomMargin 
      - templatePadding.top 
      - templatePadding.bottom;
    
    console.log(`[PAGINATION] Available height calculation: ${A4_DIMENSIONS.heightPX}px (A4) - ${A4_DIMENSIONS.topMargin}px (top margin) - ${A4_DIMENSIONS.bottomMargin}px (bottom margin) - ${templatePadding.top}px (template top padding) - ${templatePadding.bottom}px (template bottom padding) = ${availableHeight}px`);
    
    const measurements = measureRenderedContent();
    if (!measurements) {
      console.log('[PAGINATION] Could not measure content, returning original data');
      return data;
    }

    const paginatedData: SampleData = { ...data };
    // Start with top margin + template top padding
    let currentPageHeight = A4_DIMENSIONS.topMargin + templatePadding.top;
    let currentPage = targetPage;

    console.log(`[PAGINATION] Starting page assignment for page ${currentPage}, current height: ${currentPageHeight}px (${A4_DIMENSIONS.topMargin}px margin + ${templatePadding.top}px template padding)`);

    // Header always on page 1 only
    if (measurements.header && currentPage === 1) {
      currentPageHeight += measurements.header;
      console.log(`[PAGINATION] Header assigned to page 1, height: ${measurements.header}px, total: ${currentPageHeight}px`);
    }

    // Profile always on page 1 only
    if (measurements.profile && currentPage === 1) {
      if (fitsOnPage(currentPageHeight, measurements.profile, availableHeight)) {
        currentPageHeight += measurements.profile;
        paginatedData.profilePageNumber = 1;
        console.log(`[PAGINATION] Profile assigned to page 1, height: ${measurements.profile}px, total: ${currentPageHeight}px`);
      }
    }

    // Skills - can split across pages
    // Only assign skills that haven't been assigned yet or are assigned to current/later page
    if (measurements.skills && data.skills && data.skills.length > 0) {
      const existingAssignments = paginatedData.skillsPageNumbers || [];
      const unassignedIndices = data.skills
        .map((_, idx) => idx)
        .filter(idx => !existingAssignments[idx] || existingAssignments[idx] >= targetPage);
      
      if (unassignedIndices.length > 0) {
        // Calculate height of unassigned skills (approximate: total height / total skills * unassigned count)
        const unassignedHeight = (measurements.skills / data.skills.length) * unassignedIndices.length;
        
        if (fitsOnPage(currentPageHeight, unassignedHeight, availableHeight)) {
          currentPageHeight += unassignedHeight;
          // Update only unassigned skills
          const newAssignments = [...existingAssignments];
          unassignedIndices.forEach(idx => {
            newAssignments[idx] = currentPage;
          });
          paginatedData.skillsPageNumbers = newAssignments;
          console.log(`[PAGINATION] ${unassignedIndices.length} skills assigned to page ${currentPage}, height: ${unassignedHeight}px, total: ${currentPageHeight}px`);
        } else {
          // Unassigned skills don't fit, move to next page
          const newAssignments = [...existingAssignments];
          unassignedIndices.forEach(idx => {
            newAssignments[idx] = currentPage + 1;
          });
          paginatedData.skillsPageNumbers = newAssignments;
          console.log(`[PAGINATION] ${unassignedIndices.length} skills moved to page ${currentPage + 1}, height: ${unassignedHeight}px`);
        }
      }
    }

    // Experience items - only process unassigned items or items assigned to current/later page
    if (paginatedData.experience) {
      paginatedData.experience = paginatedData.experience.map((exp, index) => {
        // Skip if already assigned to an earlier page
        if (exp.pageNumber !== undefined && exp.pageNumber < targetPage) {
          return exp; // Keep existing assignment
        }

        const measurement = measurements.experience.find(m => m.index === index);
        if (!measurement) return exp;

        if (fitsOnPage(currentPageHeight, measurement.height, availableHeight)) {
          currentPageHeight += measurement.height;
          console.log(`[PAGINATION] Experience ${index} assigned to page ${currentPage}, height: ${measurement.height}px, total: ${currentPageHeight}px`);
          return { ...exp, pageNumber: currentPage };
        } else {
          const assignedPage = currentPage + 1;
          console.log(`[PAGINATION] Experience ${index} moved to page ${assignedPage}, height: ${measurement.height}px`);
          return { ...exp, pageNumber: assignedPage };
        }
      });
    }

    // Projects - only process unassigned items or items assigned to current/later page
    if (paginatedData.projects) {
      paginatedData.projects = paginatedData.projects.map((proj, index) => {
        // Skip if already assigned to an earlier page
        if (proj.pageNumber !== undefined && proj.pageNumber < targetPage) {
          return proj; // Keep existing assignment
        }

        const measurement = measurements.projects.find(m => m.index === index);
        if (!measurement) return proj;

        if (fitsOnPage(currentPageHeight, measurement.height, availableHeight)) {
          currentPageHeight += measurement.height;
          console.log(`[PAGINATION] Project ${index} assigned to page ${currentPage}, height: ${measurement.height}px, total: ${currentPageHeight}px`);
          return { ...proj, pageNumber: currentPage };
        } else {
          const assignedPage = currentPage + 1;
          console.log(`[PAGINATION] Project ${index} moved to page ${assignedPage}, height: ${measurement.height}px`);
          return { ...proj, pageNumber: assignedPage };
        }
      });
    }

    // Education - only process unassigned items or items assigned to current/later page
    if (paginatedData.education) {
      paginatedData.education = paginatedData.education.map((edu, index) => {
        // Skip if already assigned to an earlier page
        if (edu.pageNumber !== undefined && edu.pageNumber < targetPage) {
          return edu; // Keep existing assignment
        }

        const measurement = measurements.education.find(m => m.index === index);
        if (!measurement) return edu;

        if (fitsOnPage(currentPageHeight, measurement.height, availableHeight)) {
          currentPageHeight += measurement.height;
          console.log(`[PAGINATION] Education ${index} assigned to page ${currentPage}, height: ${measurement.height}px, total: ${currentPageHeight}px`);
          return { ...edu, pageNumber: currentPage };
        } else {
          const assignedPage = currentPage + 1;
          console.log(`[PAGINATION] Education ${index} moved to page ${assignedPage}, height: ${measurement.height}px`);
          return { ...edu, pageNumber: assignedPage };
        }
      });
    }

    // Languages - only assign unassigned items
    if (measurements.languages && data.languages && data.languages.length > 0) {
      const existingAssignments = paginatedData.languagesPageNumbers || [];
      const unassignedIndices = data.languages
        .map((_, idx) => idx)
        .filter(idx => !existingAssignments[idx] || existingAssignments[idx] >= targetPage);
      
      if (unassignedIndices.length > 0) {
        const unassignedHeight = (measurements.languages / data.languages.length) * unassignedIndices.length;
        
        if (fitsOnPage(currentPageHeight, unassignedHeight, availableHeight)) {
          currentPageHeight += unassignedHeight;
          const newAssignments = [...existingAssignments];
          unassignedIndices.forEach(idx => {
            newAssignments[idx] = currentPage;
          });
          paginatedData.languagesPageNumbers = newAssignments;
          console.log(`[PAGINATION] ${unassignedIndices.length} languages assigned to page ${currentPage}, height: ${unassignedHeight}px, total: ${currentPageHeight}px`);
        } else {
          const newAssignments = [...existingAssignments];
          unassignedIndices.forEach(idx => {
            newAssignments[idx] = currentPage + 1;
          });
          paginatedData.languagesPageNumbers = newAssignments;
          console.log(`[PAGINATION] ${unassignedIndices.length} languages moved to page ${currentPage + 1}, height: ${unassignedHeight}px`);
        }
      }
    }

    // Achievements - only assign unassigned items
    if (measurements.achievements && data.achievements && data.achievements.length > 0) {
      const existingAssignments = paginatedData.achievementsPageNumbers || [];
      const unassignedIndices = data.achievements
        .map((_, idx) => idx)
        .filter(idx => !existingAssignments[idx] || existingAssignments[idx] >= targetPage);
      
      if (unassignedIndices.length > 0) {
        const unassignedHeight = (measurements.achievements / data.achievements.length) * unassignedIndices.length;
        
        if (fitsOnPage(currentPageHeight, unassignedHeight, availableHeight)) {
          currentPageHeight += unassignedHeight;
          const newAssignments = [...existingAssignments];
          unassignedIndices.forEach(idx => {
            newAssignments[idx] = currentPage;
          });
          paginatedData.achievementsPageNumbers = newAssignments;
          console.log(`[PAGINATION] ${unassignedIndices.length} achievements assigned to page ${currentPage}, height: ${unassignedHeight}px, total: ${currentPageHeight}px`);
        } else {
          const newAssignments = [...existingAssignments];
          unassignedIndices.forEach(idx => {
            newAssignments[idx] = currentPage + 1;
          });
          paginatedData.achievementsPageNumbers = newAssignments;
          console.log(`[PAGINATION] ${unassignedIndices.length} achievements moved to page ${currentPage + 1}, height: ${unassignedHeight}px`);
        }
      }
    }

    // Certifications - only assign unassigned items
    if (measurements.certifications && data.certifications && data.certifications.length > 0) {
      const existingAssignments = paginatedData.certificationsPageNumbers || [];
      const unassignedIndices = data.certifications
        .map((_, idx) => idx)
        .filter(idx => !existingAssignments[idx] || existingAssignments[idx] >= targetPage);
      
      if (unassignedIndices.length > 0) {
        const unassignedHeight = (measurements.certifications / data.certifications.length) * unassignedIndices.length;
        
        if (fitsOnPage(currentPageHeight, unassignedHeight, availableHeight)) {
          currentPageHeight += unassignedHeight;
          const newAssignments = [...existingAssignments];
          unassignedIndices.forEach(idx => {
            newAssignments[idx] = currentPage;
          });
          paginatedData.certificationsPageNumbers = newAssignments;
          console.log(`[PAGINATION] ${unassignedIndices.length} certifications assigned to page ${currentPage}, height: ${unassignedHeight}px, total: ${currentPageHeight}px`);
        } else {
          const newAssignments = [...existingAssignments];
          unassignedIndices.forEach(idx => {
            newAssignments[idx] = currentPage + 1;
          });
          paginatedData.certificationsPageNumbers = newAssignments;
          console.log(`[PAGINATION] ${unassignedIndices.length} certifications moved to page ${currentPage + 1}, height: ${unassignedHeight}px`);
        }
      }
    }

    // Final page height includes content + template bottom padding
    const finalPageHeight = currentPageHeight + templatePadding.bottom;
    const totalPageHeight = finalPageHeight + A4_DIMENSIONS.bottomMargin;
    
    console.log(`[PAGINATION] Page ${currentPage} assignment complete:`);
    console.log(`[PAGINATION]   Content height: ${currentPageHeight}px`);
    console.log(`[PAGINATION]   + Template bottom padding: ${templatePadding.bottom}px`);
    console.log(`[PAGINATION]   + Bottom margin: ${A4_DIMENSIONS.bottomMargin}px`);
    console.log(`[PAGINATION]   = Total page height: ${totalPageHeight}px / ${A4_DIMENSIONS.heightPX}px (A4)`);
    console.log(`[PAGINATION]   Available height used: ${currentPageHeight}px / ${availableHeight}px`);
    
    if (totalPageHeight > A4_DIMENSIONS.heightPX) {
      console.warn(`[PAGINATION] WARNING: Page ${currentPage} exceeds A4 height! ${totalPageHeight}px > ${A4_DIMENSIONS.heightPX}px`);
    }
    
    return paginatedData;
  };

  /**
   * Filter data to only include items for a specific page
   */
  const filterDataForPage = (paginatedData: SampleData, pageNumber: number): SampleData => {
    const filtered: SampleData = {
      ...paginatedData,
      // Header always on page 1
      name: pageNumber === 1 ? paginatedData.name : undefined,
      title: pageNumber === 1 ? paginatedData.title : undefined,
      contact: pageNumber === 1 ? paginatedData.contact : undefined,
      // Profile always on page 1
      profile: pageNumber === 1 ? paginatedData.profile : undefined,
      profilePageNumber: pageNumber === 1 ? 1 : undefined,
    };

    // Filter skills by pageNumber
    if (paginatedData.skills && paginatedData.skillsPageNumbers) {
      filtered.skills = paginatedData.skills.filter((_, index) => 
        paginatedData.skillsPageNumbers![index] === pageNumber
      );
      filtered.skillsPageNumbers = filtered.skills.map(() => pageNumber);
    }

    // Filter experience by pageNumber
    if (paginatedData.experience) {
      filtered.experience = paginatedData.experience.filter(exp => exp.pageNumber === pageNumber);
    }

    // Filter projects by pageNumber
    if (paginatedData.projects) {
      filtered.projects = paginatedData.projects.filter(proj => proj.pageNumber === pageNumber);
    }

    // Filter education by pageNumber
    if (paginatedData.education) {
      filtered.education = paginatedData.education.filter(edu => edu.pageNumber === pageNumber);
    }

    // Filter languages by pageNumber
    if (paginatedData.languages && paginatedData.languagesPageNumbers) {
      filtered.languages = paginatedData.languages.filter((_, index) => 
        paginatedData.languagesPageNumbers![index] === pageNumber
      );
      filtered.languagesPageNumbers = filtered.languages.map(() => pageNumber);
    }

    // Filter achievements by pageNumber
    if (paginatedData.achievements && paginatedData.achievementsPageNumbers) {
      filtered.achievements = paginatedData.achievements.filter((_, index) => 
        paginatedData.achievementsPageNumbers![index] === pageNumber
      );
      filtered.achievementsPageNumbers = filtered.achievements.map(() => pageNumber);
    }

    // Filter certifications by pageNumber
    if (paginatedData.certifications && paginatedData.certificationsPageNumbers) {
      filtered.certifications = paginatedData.certifications.filter((_, index) => 
        paginatedData.certificationsPageNumbers![index] === pageNumber
      );
      filtered.certificationsPageNumbers = filtered.certifications.map(() => pageNumber);
    }

    return filtered;
  };

  /**
   * Render multiple pages with paginated data
   */
  const renderPaginatedPages = (code: string, paginatedData: SampleData) => {
    console.log('[PAGINATION] Rendering paginated pages');
    
    // Calculate total pages
    const allPageNumbers = new Set<number>();
    if (paginatedData.profilePageNumber) allPageNumbers.add(paginatedData.profilePageNumber);
    if (paginatedData.experience) {
      paginatedData.experience.forEach(exp => {
        if (exp.pageNumber) allPageNumbers.add(exp.pageNumber);
      });
    }
    if (paginatedData.projects) {
      paginatedData.projects.forEach(proj => {
        if (proj.pageNumber) allPageNumbers.add(proj.pageNumber);
      });
    }
    if (paginatedData.education) {
      paginatedData.education.forEach(edu => {
        if (edu.pageNumber) allPageNumbers.add(edu.pageNumber);
      });
    }
    if (paginatedData.skillsPageNumbers) {
      paginatedData.skillsPageNumbers.forEach(pn => allPageNumbers.add(pn));
    }
    if (paginatedData.languagesPageNumbers) {
      paginatedData.languagesPageNumbers.forEach(pn => allPageNumbers.add(pn));
    }
    if (paginatedData.achievementsPageNumbers) {
      paginatedData.achievementsPageNumbers.forEach(pn => allPageNumbers.add(pn));
    }
    if (paginatedData.certificationsPageNumbers) {
      paginatedData.certificationsPageNumbers.forEach(pn => allPageNumbers.add(pn));
    }

    const totalPages = Math.max(...Array.from(allPageNumbers), 1);
    console.log(`[PAGINATION] Rendering ${totalPages} pages`);

    const iframe = previewIframeRef.current;
    if (!iframe) {
      console.error('[PAGINATION] Iframe ref is null');
      return;
    }

    const iframeDoc = iframe.contentDocument || iframe.contentWindow?.document;
    if (!iframeDoc) {
      console.error('[PAGINATION] Cannot access iframe document');
      return;
    }

    const container = iframeDoc.getElementById('preview-container');
    if (!container) {
      console.error('[PAGINATION] Preview container not found');
      return;
    }

    // Check if component is registered
    const tagName = templateMetadata.tagName || 'resume-component';
    const isRegistered = iframeDoc.defaultView?.customElements?.get(tagName);
    if (!isRegistered) {
      console.error('[PAGINATION]', tagName, 'not registered in iframe, cannot render pages');
      return;
    }

    // Clear container
    container.innerHTML = '';

    // Create a page container for each page
    for (let pageNum = 1; pageNum <= totalPages; pageNum++) {
      console.log(`[PAGINATION] Creating page ${pageNum} container`);
      const pageDiv = iframeDoc.createElement('div');
      pageDiv.className = 'page';
      pageDiv.setAttribute('data-page-number', pageNum.toString());
      
      // Create component for this page
      const component = iframeDoc.createElement(tagName) as any;
      const pageData = filterDataForPage(paginatedData, pageNum);
      
      // Append to DOM first so component initializes
      pageDiv.appendChild(component);
      container.appendChild(pageDiv);
      
      // Set data after component is in DOM (will trigger render)
      // Use requestAnimationFrame to ensure component is ready
      requestAnimationFrame(() => {
        component.data = pageData;
        console.log(`[PAGINATION] Set data for page ${pageNum}:`, {
          experience: pageData.experience?.length || 0,
          projects: pageData.projects?.length || 0,
          education: pageData.education?.length || 0,
          skills: pageData.skills?.length || 0,
          languages: pageData.languages?.length || 0,
          achievements: pageData.achievements?.length || 0,
          certifications: pageData.certifications?.length || 0,
        });
      });
    }

    console.log(`[PAGINATION] Rendered ${totalPages} pages`);
  };

  /**
   * Apply pagination iteratively following PAGINATION_FLOW.md
   */
  const applyPagination = async (code: string, data: SampleData) => {
    console.log('[PAGINATION] Starting pagination process');
    setIsPaginating(true);

    try {
      // Step 1: Initial render with all data (no pageNumbers)
      console.log('[PAGINATION] Step 1: Initial render with all data');
      const cleanData = { ...data };
      // Remove any existing pageNumber properties
      delete cleanData.profilePageNumber;
      delete cleanData.skillsPageNumbers;
      delete cleanData.languagesPageNumbers;
      delete cleanData.achievementsPageNumbers;
      delete cleanData.certificationsPageNumbers;
      if (cleanData.experience) {
        cleanData.experience = cleanData.experience.map(exp => {
          const { pageNumber, ...rest } = exp;
          return rest;
        });
      }
      if (cleanData.projects) {
        cleanData.projects = cleanData.projects.map(proj => {
          const { pageNumber, ...rest } = proj;
          return rest;
        });
      }
      if (cleanData.education) {
        cleanData.education = cleanData.education.map(edu => {
          const { pageNumber, ...rest } = edu;
          return rest;
        });
      }

      renderTemplateInIframe(code, cleanData);
      await new Promise(resolve => setTimeout(resolve, 1000)); // Wait for initial render

      // Step 2: Calculate page 1
      console.log('[PAGINATION] Step 2: Calculating page 1');
      let paginatedData = await calculatePagination(cleanData, 1);
      
      // Step 3: Re-render with page 1 assignments
      console.log('[PAGINATION] Step 3: Re-rendering with page 1 assignments');
      const updated = updateIframeData(paginatedData);
      if (!updated) {
        console.log('[PAGINATION] Could not update iframe data, falling back to full render');
        renderTemplateInIframe(code, paginatedData);
      }
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Step 4: Iterate for remaining pages
      let maxPage = 1;
      let hasMoreContent = true;
      let iterations = 0;
      const maxIterations = 10; // Safety limit

      while (hasMoreContent && iterations < maxIterations) {
        iterations++;
        console.log(`[PAGINATION] Iteration ${iterations}: Checking for more content`);

        // Check if there's content assigned to pages beyond current max
        const nextPage = maxPage + 1;
        const hasContentOnNextPage = 
          (paginatedData.experience?.some(exp => exp.pageNumber === nextPage)) ||
          (paginatedData.projects?.some(proj => proj.pageNumber === nextPage)) ||
          (paginatedData.education?.some(edu => edu.pageNumber === nextPage)) ||
          (paginatedData.skillsPageNumbers?.some(pn => pn === nextPage)) ||
          (paginatedData.languagesPageNumbers?.some(pn => pn === nextPage)) ||
          (paginatedData.achievementsPageNumbers?.some(pn => pn === nextPage)) ||
          (paginatedData.certificationsPageNumbers?.some(pn => pn === nextPage));

        if (!hasContentOnNextPage) {
          hasMoreContent = false;
          console.log(`[PAGINATION] No more content found, pagination complete at page ${maxPage}`);
          break;
        }

        // Re-calculate for next page
        console.log(`[PAGINATION] Calculating page ${nextPage}`);
        paginatedData = await calculatePagination(paginatedData, nextPage);
        maxPage = nextPage;

        // Re-render with updated pagination
        const updated = updateIframeData(paginatedData);
        if (!updated) {
          console.log('[PAGINATION] Could not update iframe data, falling back to full render');
          renderTemplateInIframe(code, paginatedData);
        }
        await new Promise(resolve => setTimeout(resolve, 1000));
      }

      console.log(`[PAGINATION] Pagination complete: ${maxPage} pages`);
      setPaginatedData(paginatedData);
      setSampleData(paginatedData);
      
      // Render paginated pages
      console.log('[PAGINATION] Rendering paginated pages with filtered data');
      renderPaginatedPages(code, paginatedData);
    } catch (error) {
      console.error('[PAGINATION] Error during pagination:', error);
      setError('Error calculating pagination');
    } finally {
      setIsPaginating(false);
    }
  };

  const renderTemplateInIframe = (code: string, data: SampleData) => {
    console.log('[Preview] Starting renderTemplateInIframe');
    console.log('[Preview] Code length:', code.length);
    console.log('[Preview] Data:', data);
    console.log('[Preview] Using tagName:', templateMetadata.tagName);
    
    const iframe = previewIframeRef.current;
    const tagName = templateMetadata.tagName || 'resume-component';
    if (!iframe) {
      console.error('[Preview] Iframe ref is null');
      return;
    }
    console.log('[Preview] Iframe found');

    // Function to write content to iframe
    const writeToIframe = () => {
      try {
        const iframeDoc = iframe.contentDocument || iframe.contentWindow?.document;
        if (!iframeDoc) {
          console.error('[Preview] Cannot access iframe document');
          return;
        }
        console.log('[Preview] Iframe document accessible');

        // Clear iframe content
        console.log('[Preview] Writing HTML to iframe...');
        
        iframeDoc.open();
        
        // Build HTML content using safer method - create script element separately
        const htmlStart = `<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
      * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
      }
      body {
        margin: 0;
        padding: 20px;
        font-family: Arial, sans-serif;
        background: #f5f5f5;
        display: flex;
        justify-content: center;
        align-items: flex-start;
      }
      #preview-container {
        width: 100%;
        max-width: 210mm;
        background: #f5f5f5;
        padding: 20px;
        overflow: visible;
        display: flex;
        flex-direction: column;
        gap: 20px;
      }
      .page {
        width: 210mm;
        min-height: 297mm;
        height: auto;
        background: white;
        box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        padding-top: 20px;
        padding-bottom: 30px;
        padding-left: 0;
        padding-right: 0;
        page-break-after: always;
        break-after: page;
        overflow: hidden;
      }
      ${tagName} {
        display: block;
        width: 100%;
      }
      @media print {
        body {
          background: white;
          padding: 0;
        }
        #preview-container {
          background: white;
          padding: 0;
          gap: 0;
        }
        .page {
          box-shadow: none;
          margin: 0;
        }
      }
    </style>
  </head>
  <body>
    <div id="preview-container"></div>
    <script>
      console.log('[Iframe] Script starting...');
      try {
        console.log('[Iframe] Evaluating template code...');`;
        
        const htmlEnd = `
        console.log('[Iframe] Template code evaluated');
        const tagName = '${tagName}';
        console.log('[Iframe] Using tagName:', tagName);
        console.log('[Iframe] Checking if', tagName, 'is registered...');
        const existingComponent = customElements.get(tagName);
        console.log('[Iframe] customElements.get result:', existingComponent);
        
        // Only register if not already registered
        if (!existingComponent) {
          console.log('[Iframe] Registering', tagName, '...');
          // Template code will register the component
        } else {
          console.log('[Iframe]', tagName, 'already registered, skipping registration');
        }
        
        // Wait for component to be registered
        setTimeout(() => {
          console.log('[Iframe] Timeout callback executing...');
          const container = document.getElementById('preview-container');
          if (!container) {
            console.error('[Iframe] Preview container not found');
            return;
          }
          console.log('[Iframe] Container found:', container);
          
          // Check if component is registered
          const isRegistered = customElements.get(tagName);
          console.log('[Iframe] Component registered?', !!isRegistered);
          
          if (isRegistered) {
            try {
              console.log('[Iframe] Creating component element...');
              const component = document.createElement(tagName);
              console.log('[Iframe] Component created:', component);
              
              const data = ${JSON.stringify(data)};
              console.log('[Iframe] Data to set:', data);
              console.log('[Iframe] Data.name:', data.name);
              console.log('[Iframe] Data.title:', data.title);
              console.log('[Iframe] Data.contact:', data.contact);
              console.log('[Iframe] Data.profile:', data.profile);
              console.log('[Iframe] Setting component.data...');
              component.data = data;
              console.log('[Iframe] component.data after set:', component.data);
              console.log('[Iframe] component._data:', component._data);
              console.log('[Iframe] component._data.name:', component._data?.name);
              console.log('[Iframe] component._data.title:', component._data?.title);
              console.log('[Iframe] component._data.contact:', component._data?.contact);
              console.log('[Iframe] component._data.profile:', component._data?.profile);
              
              container.innerHTML = '';
              console.log('[Iframe] Appending component to container...');
              container.appendChild(component);
              console.log('[Iframe] Component appended. Container children:', container.children.length);
              console.log('[Iframe] Component shadowRoot:', component.shadowRoot);
              console.log('[Iframe] Component shadowRoot innerHTML length:', component.shadowRoot?.innerHTML?.length || 0);
              console.log('[Iframe] Component shadowRoot innerHTML preview:', component.shadowRoot?.innerHTML?.substring(0, 500) || 'empty');
              
              // Force a re-render after a short delay to ensure data is set
              setTimeout(() => {
                console.log('[Iframe] Force re-render timeout...');
                console.log('[Iframe] component.data before render:', component.data);
                console.log('[Iframe] component._data before render:', component._data);
                console.log('[Iframe] component._data?.name:', component._data?.name);
                console.log('[Iframe] component._data?.title:', component._data?.title);
                console.log('[Iframe] component._data?.contact:', component._data?.contact);
                console.log('[Iframe] component._data?.profile:', component._data?.profile);
                
                if (component.data) {
                  console.log('[Iframe] Calling component.render()...');
                  try {
                    component.render();
                    console.log('[Iframe] Render called successfully');
                    console.log('[Iframe] ShadowRoot innerHTML length:', component.shadowRoot?.innerHTML?.length || 0);
                    const fullHTML = component.shadowRoot?.innerHTML || '';
                    const htmlPreview = fullHTML.substring(0, 2000);
                    console.log('[Iframe] ShadowRoot innerHTML preview after render:', htmlPreview);
                    console.log('[Iframe] Full HTML length:', fullHTML.length);
                    
                    // Get the HTML after the style tag to see the actual content
                    const styleEndIndex = fullHTML.indexOf('</style>');
                    const contentHTML = styleEndIndex > -1 ? fullHTML.substring(styleEndIndex + 8) : fullHTML;
                    console.log('[Iframe] Content HTML (after style) length:', contentHTML.length);
                    console.log('[Iframe] Content HTML (after style):', contentHTML.substring(0, 2000));
                    
                    // Check if there's any actual content divs
                    if (contentHTML.includes('<div')) {
                      console.log('[Iframe] ✓ Found div elements in content');
                      const divCount = (contentHTML.match(/<div/g) || []).length;
                      console.log('[Iframe] Number of div elements:', divCount);
                    } else {
                      console.warn('[Iframe] ✗ No div elements found in content HTML');
                    }
                    
                    // Check if header is in the HTML
                    if (fullHTML.includes('John Doe')) {
                      console.log('[Iframe] ✓ Header name found in HTML');
                    } else {
                      console.warn('[Iframe] ✗ Header name NOT found in HTML');
                      console.warn('[Iframe] Looking for header structure...');
                      if (fullHTML.includes('<header class="header">') || fullHTML.includes('<div class="header">')) {
                        console.warn('[Iframe] Header element found but empty');
                        // Check what's actually in the header
                        const headerMatch = fullHTML.match(/<header[^>]*>([\\s\\S]*?)<\\/header>/i) || fullHTML.match(/<div[^>]*class="header"[^>]*>([\\s\\S]*?)<\\/div>/i);
                        if (headerMatch) {
                          console.warn('[Iframe] Header content:', headerMatch[1].substring(0, 200));
                        }
                      } else {
                        console.warn('[Iframe] Header element NOT found');
                      }
                    }
                    
                    if (fullHTML.includes('Senior Software Engineer')) {
                      console.log('[Iframe] ✓ Title found in HTML');
                    } else {
                      console.warn('[Iframe] ✗ Title NOT found in HTML');
                    }
                    
                    if (fullHTML.includes('Profile') || fullHTML.includes('PROFILE')) {
                      console.log('[Iframe] ✓ Profile section found in HTML');
                    } else {
                      console.warn('[Iframe] ✗ Profile section NOT found in HTML');
                    }
                    
                    // Check what the template's render method is actually receiving
                    console.log('[Iframe] Checking template render method...');
                    if (component.render && typeof component.render === 'function') {
                      console.log('[Iframe] Render method exists');
                      // Try to see what data the render method sees
                      const renderData = component._data || component.data;
                      console.log('[Iframe] Data in render context:', renderData);
                      console.log('[Iframe] renderData.name:', renderData?.name);
                      console.log('[Iframe] renderData.title:', renderData?.title);
                      console.log('[Iframe] renderData.contact:', renderData?.contact);
                      console.log('[Iframe] renderData.profile:', renderData?.profile);
                      console.log('[Iframe] renderData.experience:', renderData?.experience);
                    }
                  } catch (renderError) {
                    console.error('[Iframe] Error during render:', renderError);
                    console.error('[Iframe] Render error stack:', renderError.stack);
                  }
                } else {
                  console.error('[Iframe] Component data is null/undefined');
                }
              }, 100);
            } catch (err) {
              console.error('[Iframe] Error creating component:', err);
              console.error('[Iframe] Error stack:', err.stack);
              container.innerHTML = '<p style="color: red; padding: 20px;">Error creating component: ' + err.message + '</p>';
            }
          } else {
            console.error('[Iframe]', tagName, 'not registered');
            console.error('[Iframe] Available custom elements:', Array.from(customElements.keys || []));
            container.innerHTML = '<p style="color: red; padding: 20px;">Error: Component ' + tagName + ' not registered. Check console for errors.</p>';
          }
        }, 300);
      } catch (error) {
        console.error('[Iframe] Error in preview script:', error);
        console.error('[Iframe] Error stack:', error.stack);
        document.body.innerHTML = '<p style="color: red; padding: 20px;">Error loading template: ' + error.message + '</p>';
      }
    </script>
  </body>
</html>`;
        
        // Wrap customElements.define calls in try-catch to prevent re-registration errors
        let wrappedCode = code;
        // Match customElements.define with the actual tagName (dynamic)
        // Escape special regex characters in tagName
        const escapedTagName = tagName.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        const tagNamePattern = new RegExp(`customElements\\.define\\s*\\(\\s*['"]${escapedTagName}['"]`, 'g');
        
        if (tagNamePattern.test(code)) {
          // Replace all occurrences of customElements.define with tagName
          wrappedCode = code.replace(
            new RegExp(`customElements\\.define\\s*\\(\\s*['"]${escapedTagName}['"]\\s*,\\s*([^)]+)\\)`, 'g'),
            (match, className) => {
              return `(function() {
                try {
                  if (!customElements.get('${tagName}')) {
                    customElements.define('${tagName}', ${className});
                    console.log('[Iframe] Successfully registered ${tagName}');
                  } else {
                    console.log('[Iframe] ${tagName} already registered, skipping');
                  }
                } catch (e) {
                  console.log('[Iframe] Error registering component (may already be registered):', e.message);
                }
              })()`;
            }
          );
        } else {
          console.warn('[Iframe] TagName', tagName, 'not found in code. Code may use different tagName.');
        }
        
        // Write HTML in parts to avoid template literal issues
        iframeDoc.write(htmlStart);
        iframeDoc.write(wrappedCode); // Write wrapped code
        iframeDoc.write(htmlEnd);
        iframeDoc.close();
        console.log('[Preview] Iframe HTML written and closed');
      } catch (error) {
        console.error('[Preview] Error writing to iframe:', error);
      }
    };

    // Wait for iframe to load before accessing its document
    if (iframe.contentDocument) {
      console.log('[Preview] Iframe already loaded, writing immediately');
      writeToIframe();
    } else {
      console.log('[Preview] Waiting for iframe to load...');
      // Clean up any existing onload handler to prevent cycles
      iframe.onload = null;
      // Set a one-time onload handler
      iframe.onload = () => {
        console.log('[Preview] Iframe loaded event fired');
        // Clean up the handler immediately after use to prevent re-triggering
        iframe.onload = null;
        writeToIframe();
      };
      
      // Also try writing after a short delay as fallback
      setTimeout(() => {
        if (iframe.contentDocument) {
          console.log('[Preview] Iframe loaded (timeout fallback), writing...');
          // Clean up onload handler if it wasn't triggered
          iframe.onload = null;
          writeToIframe();
        } else {
          console.error('[Preview] Iframe document still not accessible after timeout');
        }
      }, 500);
    }
  };

  const downloadTemplate = () => {
    // Priority: colorModifiedCode > editedCode > generatedCode
    let codeToDownload: string | null = null;
    if (colorsModified && colorModifiedCode) {
      codeToDownload = colorModifiedCode;
    } else if (isCodeEdited && editedCode) {
      codeToDownload = editedCode;
    } else {
      codeToDownload = generatedCode;
    }
    if (!codeToDownload) return;

    const blob = new Blob([codeToDownload], { type: 'text/javascript' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'resume-template.js';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const copyToClipboard = async () => {
    // Priority: colorModifiedCode > editedCode > generatedCode
    let codeToCopy: string | null = null;
    if (colorsModified && colorModifiedCode) {
      codeToCopy = colorModifiedCode;
    } else if (isCodeEdited && editedCode) {
      codeToCopy = editedCode;
    } else {
      codeToCopy = generatedCode;
    }
    if (!codeToCopy) return;

    try {
      await navigator.clipboard.writeText(codeToCopy);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
      setError('Failed to copy to clipboard');
    }
  };

  // Update existing component data in iframe without re-executing template code
  const updateIframeData = (data: SampleData): boolean => {
    const iframe = previewIframeRef.current;
    if (!iframe) {
      console.log('[Update] Iframe ref is null');
      return false;
    }

    try {
      const iframeDoc = iframe.contentDocument || iframe.contentWindow?.document;
      if (!iframeDoc) {
        console.log('[Update] Cannot access iframe document');
        return false;
      }

      const container = iframeDoc.getElementById('preview-container');
      if (!container) {
        console.log('[Update] Preview container not found');
        return false;
      }

      // Find existing component element
      const tagName = templateMetadata.tagName || 'resume-component';
      const component = container.querySelector(tagName) as any;
      if (!component) {
        console.log('[Update] Component element not found in container');
        return false;
      }

      // Check if component is properly initialized
      if (!component.data && !component._data) {
        console.log('[Update] Component exists but not initialized');
        return false;
      }

      console.log('[Update] Found existing component, updating data...');
      console.log('[Update] New data:', data);
      
      // Update component data - this will trigger render() automatically
      component.data = data;
      
      // Force a render if the component has a render method
      if (component.render && typeof component.render === 'function') {
        setTimeout(() => {
          try {
            component.render();
            console.log('[Update] Component render() called');
          } catch (e) {
            console.log('[Update] Error calling render():', e);
          }
        }, 100);
      }
      
      console.log('[Update] Component data updated successfully');
      return true;
    } catch (error) {
      console.error('[Update] Error updating iframe data:', error);
      return false;
    }
  };

  const handleMockDataSizeChange = (size: MockDataSize) => {
    if (!generatedCode) return;
    
    console.log('[App] Mock data size changed to:', size);
    setMockDataSize(size);
    
    // Generate new mock data with selected size
    const newMockData = generateMockData(size);
    setSampleData(newMockData);
    
    // Try to update existing component data first
    setTimeout(() => {
      console.log('[App] Attempting to update existing component data...');
      const updated = updateIframeData(newMockData);
      
      if (!updated) {
        // Fallback to full render if component doesn't exist yet
        console.log('[App] Component not found, performing full render...');
        renderTemplateInIframe(generatedCode, newMockData);
        // Start pagination after initial render
        setTimeout(() => {
          console.log('[App] Starting pagination after data size change...');
          applyPagination(generatedCode, newMockData);
        }, 2000);
      } else {
        console.log('[App] Component data updated successfully');
        // Trigger pagination after data update
        setTimeout(() => {
          console.log('[App] Starting pagination after data size change...');
          applyPagination(generatedCode, newMockData);
        }, 500);
      }
    }, 100);
  };

  /**
   * Convert string to kebab-case
   */
  const toKebabCase = (str: string): string => {
    return str
      .replace(/([a-z])([A-Z])/g, '$1-$2')
      .replace(/[\s_]+/g, '-')
      .toLowerCase()
      .replace(/[^a-z0-9-]/g, '');
  };

  /**
   * Generate template ID from timestamp
   */
  const generateTemplateId = (): string => {
    return `template-${Date.now()}`;
  };

  /**
   * Validate tag name format (kebab-case with hyphen)
   */
  const validateTagName = (tagName: string): boolean => {
    const pattern = /^[a-z][a-z0-9]*-[a-z0-9-]+$/;
    return pattern.test(tagName);
  };

  /**
   * Open promote template modal and initialize form with pre-filled metadata
   */
  const openPromoteModal = () => {
    if (!generatedCode) return;

    // If colors are modified, prepare for variant
    let baseName = templateMetadata.name;
    let baseTagName = templateMetadata.tagName;
    let baseId = templateMetadata.id;
    
    // Use already collected metadata
    setTemplateForm({
      id: baseId,
      name: baseName,
      description: '',
      category: 'free',
      tagName: baseTagName,
      variantName: colorsModified ? '' : ''
    });
    setPromoteSuccess(false);
    setPromoteError(null);
    setShowPromoteModal(true);
  };

  /**
   * Close promote template modal
   */
  const closePromoteModal = () => {
    setShowPromoteModal(false);
    setTemplateForm({
      id: '',
      name: '',
      description: '',
      category: 'free',
      tagName: '',
      variantName: ''
    });
    setPromoteSuccess(false);
    setPromoteError(null);
  };

  /**
   * Handle promotion form input changes (only description and category)
   */
  const handleFormChange = (field: string, value: string) => {
    setTemplateForm(prev => ({
      ...prev,
      [field]: value
    }));
  };

  /**
   * Promote template to getquickresume API
   */
  const promoteTemplate = async () => {
    // Priority: colorModifiedCode > editedCode > generatedCode
    let codeToPromote: string | null = null;
    if (colorsModified && colorModifiedCode) {
      codeToPromote = colorModifiedCode;
    } else if (isCodeEdited && editedCode) {
      codeToPromote = editedCode;
    } else {
      codeToPromote = generatedCode;
    }
    
    if (!codeToPromote) {
      setPromoteError('No code available to promote');
      return;
    }

    // Validate required fields
    if (!templateForm.id.trim()) {
      setPromoteError('Template ID is required');
      return;
    }
    if (!templateForm.name.trim()) {
      setPromoteError('Template name is required');
      return;
    }
    if (!templateForm.category) {
      setPromoteError('Category is required');
      return;
    }
    if (!templateForm.tagName.trim()) {
      setPromoteError('Tag name is required');
      return;
    }
    
    // If colors are modified, variant name is required
    if (colorsModified && !templateForm.variantName.trim()) {
      setPromoteError('Variant name is required when colors have been modified');
      return;
    }

    // If colors are modified, handle variant name
    let finalName = templateForm.name.trim();
    let finalTagName = templateForm.tagName.trim();
    let finalId = templateForm.id.trim();
    
    if (colorsModified && templateForm.variantName.trim()) {
      const variant = toKebabCase(templateForm.variantName.trim());
      finalName = `${finalName}-${variant}`;
      finalTagName = `${finalTagName}-${variant}`;
      finalId = `${finalId}-${variant}`;
    }

    // Validate tag name format
    if (!validateTagName(finalTagName)) {
      setPromoteError('Tag name must be a valid custom element name (kebab-case with at least one hyphen, e.g., "resume-template-1")');
      return;
    }

    setPromoting(true);
    setPromoteError(null);
    setPromoteSuccess(false);

    try {
      const codeType = colorsModified ? 'color-modified' : (isCodeEdited ? 'manually edited' : 'generated');
      console.log('[App] Promoting template with', codeType, 'code');
      const response = await fetch(`${API_BASE_URL}/api/templates`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          id: finalId,
          name: finalName,
          description: templateForm.description.trim() || undefined,
          category: templateForm.category,
          tagName: finalTagName,
          jsCode: codeToPromote
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || data.message || `Server error: ${response.status}`);
      }

      // Success
      setPromoteSuccess(true);
      setPromoteError(null);
      
      // Close modal after 2 seconds
      setTimeout(() => {
        closePromoteModal();
      }, 2000);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to promote template';
      setPromoteError(errorMessage);
      setPromoteSuccess(false);
      console.error('Error promoting template:', err);
    } finally {
      setPromoting(false);
    }
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>Resume Template Generator</h1>
        <p>Upload a reference image to generate a custom resume template</p>
      </header>

      <main className="app-main">
        {/* Template Metadata Form - BEFORE image upload */}
        <div className="metadata-section">
          <h2>Template Information</h2>
          <p className="section-description">Fill in the template details before uploading the image</p>
          <div className="metadata-form">
            <div className="form-group">
              <label htmlFor="template-id-input">Template ID *</label>
              <input
                type="text"
                id="template-id-input"
                value={templateMetadata.id}
                onChange={(e) => handleMetadataChange('id', e.target.value)}
                placeholder="template-1234567890"
                className="form-input"
              />
              <small className="form-hint">Unique identifier for the template</small>
            </div>
            <div className="form-group">
              <label htmlFor="template-name-input">Template Name *</label>
              <input
                type="text"
                id="template-name-input"
                value={templateMetadata.name}
                onChange={(e) => handleMetadataChange('name', e.target.value)}
                placeholder="My Resume Template"
                className="form-input"
                required
              />
              <small className="form-hint">Display name for the template</small>
            </div>
            <div className="form-group">
              <label htmlFor="template-tag-name-input">Tag Name *</label>
              <input
                type="text"
                id="template-tag-name-input"
                value={templateMetadata.tagName}
                onChange={(e) => handleMetadataChange('tagName', e.target.value)}
                placeholder="resume-template-1"
                className="form-input"
                required
              />
              <small className="form-hint">
                Custom element name (kebab-case with hyphen, e.g., "resume-template-1")
                {!validateTagName(templateMetadata.tagName) && templateMetadata.tagName && (
                  <span className="error-hint"> - Invalid format</span>
                )}
              </small>
            </div>
            {!isMetadataValid() && (
              <div className="warning-message">
                ⚠️ Please fill in all fields with valid values before uploading an image
              </div>
            )}
          </div>
        </div>

        <div className="upload-section">
          <div
            className="upload-area"
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onClick={() => fileInputRef.current?.click()}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileSelect}
              style={{ display: 'none' }}
            />
            {previewUrl ? (
              <div className="preview-image-container">
                <img src={previewUrl} alt="Preview" className="preview-image" />
                <p className="preview-text">Click to change image</p>
              </div>
            ) : (
              <div className="upload-placeholder">
                <svg
                  width="64"
                  height="64"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="17 8 12 3 7 8" />
                  <line x1="12" y1="3" x2="12" y2="15" />
                </svg>
                <p>Drag and drop an image here, or click to select</p>
                <p className="upload-hint">Supports: JPG, PNG, GIF, WebP</p>
              </div>
            )}
          </div>

          <button
            className="generate-button"
            onClick={generateTemplate}
            disabled={!selectedFile || loading || !isMetadataValid()}
            title={!isMetadataValid() ? 'Please fill in all template metadata fields first' : ''}
          >
            {loading ? 'Generating...' : 'Generate Template'}
          </button>

          {error && <div className="error-message">{error}</div>}
        </div>

        {generatedCode && (
          <div className="results-section">
            <div className="preview-section">
              <div className="preview-header">
                <h2>Preview</h2>
                <div className="mock-data-size-selector">
                  <label htmlFor="mock-data-size">Mock Data Size: </label>
                  <select
                    id="mock-data-size"
                    value={mockDataSize}
                    onChange={(e) => handleMockDataSizeChange(e.target.value as MockDataSize)}
                    className="size-select"
                  >
                    <option value="small">Small</option>
                    <option value="medium">Medium</option>
                    <option value="large">Large</option>
                    <option value="xlarge">XLarge</option>
                  </select>
                </div>
              </div>
              <div className="preview-container">
                <iframe
                  ref={previewIframeRef}
                  title="Template Preview"
                  className="preview-iframe"
                  sandbox="allow-scripts allow-same-origin"
                />
              </div>
            </div>

            <div className="code-section">
              <div className="code-header">
                <div className="code-header-left">
                <h2>Generated Code</h2>
                  {isCodeEdited && (
                    <span className="code-modified-indicator">(Manually Modified)</span>
                  )}
                </div>
                <div className="code-actions">
                  <button
                    className="action-button edit-mode-toggle"
                    onClick={handleEditModeToggle}
                  >
                    {editMode ? 'View Code' : 'Edit Code'}
                  </button>
                  {editMode && isCodeEdited && (
                    <button
                      className="action-button reset-code-button"
                      onClick={handleResetCode}
                    >
                      Reset to Original
                    </button>
                  )}
                  {editMode && isCodeEdited && (
                    <button
                      className="action-button preview-manual-button"
                      onClick={handlePreviewManualChanges}
                      disabled={previewingManualChanges || !editedCode}
                    >
                      {previewingManualChanges ? 'Previewing...' : 'Preview Manual Changes'}
                    </button>
                  )}
                  <button
                    className="action-button copy-button"
                    onClick={copyToClipboard}
                    disabled={!generatedCode && !editedCode}
                  >
                    {copied ? '✓ Copied!' : 'Copy Code'}
                  </button>
                  <button
                    className="action-button download-button"
                    onClick={downloadTemplate}
                    disabled={!generatedCode && !editedCode}
                  >
                    Download
                  </button>
                  <button
                    className="action-button modify-colors-button"
                    onClick={() => {
                      const codeToExtract = isCodeEdited && editedCode ? editedCode : generatedCode;
                      if (codeToExtract) {
                        const colors = extractColorsFromCode(codeToExtract);
                        setExtractedColors(colors);
                        setModifiedColors(new Map());
                        setShowColorPicker(true);
                        setColorsModified(false);
                        setColorModifiedCode(null);
                      }
                    }}
                    disabled={!generatedCode && !editedCode}
                  >
                    Modify Colors
                  </button>
                  <button
                    className="action-button promote-button"
                    onClick={openPromoteModal}
                    disabled={!generatedCode}
                  >
                    Promote Template
                  </button>
                </div>
              </div>
              <div className="code-viewer">
                {editMode ? (
                  <div className="code-editor-container">
                    <textarea
                      className="code-editor"
                      value={editedCode || ''}
                      onChange={(e) => handleCodeEdit(e.target.value)}
                      spellCheck={false}
                      placeholder="Edit the template code here..."
                    />
                  </div>
                ) : (
                <SyntaxHighlighter
                  language="javascript"
                  style={vscDarkPlus}
                  customStyle={{
                    margin: 0,
                    borderRadius: '8px',
                    fontSize: '14px'
                  }}
                >
                  {generatedCode}
                </SyntaxHighlighter>
                )}
              </div>
            </div>

            {/* Color Modification Section */}
            {showColorPicker && extractedColors.length > 0 && (
              <div className="color-modification-section">
                <div className="color-modification-header">
                  <h2>Modify Colors</h2>
                  <p className="color-modification-description">
                    Adjust the colors used in the template. Changes are applied in real-time.
                  </p>
                  <button
                    className="action-button close-color-picker-button"
                    onClick={() => {
                      setShowColorPicker(false);
                    }}
                  >
                    Close
                  </button>
                </div>
                <div className="color-picker-grid">
                  {extractedColors.map((color) => {
                    const currentValue = modifiedColors.get(color.id) || color.value;
                    return (
                      <div key={color.id} className="color-picker-item">
                        <div className="color-picker-label">
                          <label>{color.label}</label>
                          <span className="color-occurrences">({color.occurrences} uses)</span>
                        </div>
                        <div className="color-picker-controls">
                          <div className="color-preview" style={{ backgroundColor: currentValue }}></div>
                          <input
                            type="color"
                            value={currentValue}
                            onChange={(e) => handleColorChange(color.id, e.target.value)}
                            className="color-input"
                          />
                          <input
                            type="text"
                            value={currentValue}
                            onChange={(e) => {
                              const hexValue = e.target.value.trim();
                              if (/^#([0-9a-f]{3}|[0-9a-f]{6})$/i.test(hexValue)) {
                                handleColorChange(color.id, hexValue);
                              }
                            }}
                            className="color-value-input"
                            placeholder="#000000"
                          />
                          {modifiedColors.has(color.id) && (
                            <button
                              className="action-button reset-color-button"
                              onClick={() => handleResetColor(color.id)}
                              title="Reset to original"
                            >
                              Reset
                            </button>
                          )}
                        </div>
                        <div className="color-original-value">
                          Original: <code>{color.originalValue}</code>
                        </div>
                      </div>
                    );
                  })}
                </div>
                {colorsModified && (
                  <div className="color-modification-actions">
                    <button
                      className="action-button reset-all-colors-button"
                      onClick={handleResetAllColors}
                    >
                      Reset All Colors
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* Request Changes Section */}
            <div className="modification-section">
              <div className="modification-header">
                <h2>Request Changes</h2>
                <p className="modification-description">
                  Describe the changes you want to apply to the template. The template will be regenerated with your requested modifications.
                </p>
              </div>
              <div className="modification-form">
                <textarea
                  className="modification-textarea"
                  placeholder="e.g., Change the font to Arial, increase the header font size, change the color scheme to blue and white, add more spacing between sections..."
                  value={modificationPrompt}
                  onChange={(e) => {
                    setModificationPrompt(e.target.value);
                    setModificationError(null);
                    setModificationSuccess(false);
                  }}
                  rows={4}
                  disabled={modifying}
                />
                <div className="modification-actions">
                  <button
                    className="modify-button"
                    onClick={handleModifyTemplate}
                    disabled={!modificationPrompt.trim() || modifying || !generatedCode}
                  >
                    {modifying ? 'Applying Changes...' : 'Apply Changes'}
                  </button>
                </div>
                {modificationError && (
                  <div className="modification-error">
                    {modificationError}
                  </div>
                )}
                {modificationSuccess && (
                  <div className="modification-success">
                    ✓ Template modified successfully! The preview has been updated.
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Promote Template Modal */}
        {showPromoteModal && (
          <div className="modal-overlay" onClick={closePromoteModal}>
            <div className="modal-container" onClick={(e) => e.stopPropagation()}>
              <div className="modal-header">
                <h2>Confirm & Promote Template</h2>
                <button className="modal-close" onClick={closePromoteModal}>×</button>
              </div>
              <div className="modal-body">
                {promoteSuccess ? (
                  <div className="success-message">
                    <p>✓ Template promoted successfully!</p>
                    <p>Template ID: {templateForm.id}</p>
                  </div>
                ) : (
                  <form onSubmit={(e) => { e.preventDefault(); promoteTemplate(); }}>
                    <div className="form-group">
                      <label htmlFor="template-id">Template ID</label>
                      <input
                        type="text"
                        id="template-id"
                        value={templateForm.id}
                        disabled
                        className="form-input-disabled"
                      />
                      <small className="form-hint">Pre-filled from template metadata</small>
                    </div>
                    {colorsModified && (
                      <div className="form-group">
                        <div className="color-variant-notice">
                          🎨 Colors have been modified. Enter a variant name to create a new template variant.
                        </div>
                      </div>
                    )}
                    <div className="form-group">
                      <label htmlFor="template-name">Template Name</label>
                      <input
                        type="text"
                        id="template-name"
                        value={templateForm.name}
                        disabled
                        className="form-input-disabled"
                      />
                      <small className="form-hint">Pre-filled from template metadata</small>
                      {colorsModified && templateForm.variantName && (
                        <small className="form-hint">
                          Will be saved as: {templateForm.name}-{toKebabCase(templateForm.variantName)}
                        </small>
                      )}
                    </div>
                    {colorsModified && (
                      <div className="form-group">
                        <label htmlFor="variant-name-input">Variant Name *</label>
                        <input
                          type="text"
                          id="variant-name-input"
                          value={templateForm.variantName}
                          onChange={(e) => handleFormChange('variantName', e.target.value)}
                          placeholder="e.g., blue, red, dark"
                          className="form-input"
                          required
                          disabled={promoting}
                        />
                        <small className="form-hint">
                          A short name for this color variant (e.g., "blue", "red", "dark"). Will be appended to template name and tag.
                        </small>
                      </div>
                    )}
                    <div className="form-group">
                      <label htmlFor="template-tag-name">Tag Name</label>
                      <input
                        type="text"
                        id="template-tag-name"
                        value={templateForm.tagName}
                        disabled
                        className="form-input-disabled"
                      />
                      <small className="form-hint">Pre-filled from template metadata</small>
                      {colorsModified && templateForm.variantName && (
                        <small className="form-hint">
                          Will be saved as: {templateForm.tagName}-{toKebabCase(templateForm.variantName)}
                        </small>
                      )}
                    </div>
                    <div className="form-group">
                      <label htmlFor="template-description">Description</label>
                      <textarea
                        id="template-description"
                        value={templateForm.description}
                        onChange={(e) => handleFormChange('description', e.target.value)}
                        placeholder="Optional description of the template"
                        rows={3}
                        disabled={promoting}
                        className="form-textarea"
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="template-category">Category *</label>
                      <select
                        id="template-category"
                        value={templateForm.category}
                        onChange={(e) => handleFormChange('category', e.target.value)}
                        required
                        disabled={promoting}
                        className="form-select"
                      >
                        <option value="free">Free</option>
                        <option value="premium">Premium</option>
                      </select>
                    </div>
                    {promoteError && (
                      <div className="error-message">{promoteError}</div>
                    )}
                    <div className="modal-actions">
                      <button
                        type="button"
                        className="modal-button cancel-button"
                        onClick={closePromoteModal}
                        disabled={promoting}
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="modal-button submit-button"
                        disabled={promoting}
                      >
                        {promoting ? 'Promoting...' : 'Confirm & Promote'}
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;

