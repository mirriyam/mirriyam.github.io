'use strict';
const root = document.documentElement;
const $ = (id) => document.getElementById(id);
const main = document.querySelector('main');
const GH = 'https://github.com/mirriyam';

// The photography page is switched off for now. Set this to true to bring back the
// Engineering / Photography switch and the "View my photography" link.
const PHOTOGRAPHY_PAGE = false;

// Portrait photos: engineering has one, photography has three (they change with the mouse)
const PHOTOS = {
  eng: ['assets/me.jpg'],
  photo: ['assets/photo-1.svg', 'assets/photo-2.svg', 'assets/photo-3.svg']
};

// Contact links with small logos (static SVG, drawn with currentColor)
const ICONS = {
  github: '<svg viewBox="0 0 16 16" aria-hidden="true"><path fill="currentColor" d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"/></svg>',
  linkedin: '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="2" y="2" width="20" height="20" rx="3" fill="currentColor"/><rect class="i-cut" x="5.5" y="9.5" width="2.6" height="8"/><circle class="i-cut" cx="6.8" cy="6.6" r="1.5"/><path class="i-cut" d="M10.5 9.5h2.5v1.1c.5-.8 1.4-1.3 2.6-1.3 2.2 0 3 1.4 3 3.6v4.6h-2.6v-4.1c0-1-.3-1.7-1.3-1.7s-1.6.7-1.6 1.8v4h-2.6z"/></svg>',
  instagram: '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="17.2" cy="6.8" r="1.2" fill="currentColor"/></svg>'
};
const LINKS = {
  eng: [
    { icon: 'github', label: 'GitHub', href: GH },
    { icon: 'linkedin', label: 'LinkedIn', href: 'https://linkedin.com/in/maryam-ali-65240b2b9' }
  ],
  photo: [{ icon: 'instagram', label: 'Instagram @mirriyamm', href: 'https://instagram.com/mirriyamm' }]
};

// ---------- Text shared by both portfolios ----------
const ui = {
  en: {
    logo_name: 'MARYAM ALI',
    nav_home: 'Home', nav_about: 'About', nav_skills: 'Skills', nav_edu: 'Education', nav_hobbies: 'Hobbies', nav_contact: 'Contact',
    mode_eng: 'Engineering', mode_photo: 'Photography', theme_btn: 'Toggle theme',
    btn_touch: "Let's talk",
    eb_about: 'Who I am', about_title: 'About Me',
    edu_title: 'Education', eb_edu: 'Background',
    hobbies_title: 'Hobbies', eb_hobbies: 'Outside work',
    contact_title: 'Contact', eb_contact: 'Get in touch',
    f_name: 'Name', f_email: 'Email', f_message: 'Message', send: 'Send message',
    form_ok: 'Thanks! Your message was received (demo form).',
    footer: 'Maryam Ali. Handcrafted with HTML, CSS and JavaScript.',
    alt_eng: 'Professional portrait of Maryam', alt_photo: 'Portrait of Maryam (photo {n} of 3)'
  },
  ar: {
    logo_name: 'مريم علي',
    nav_home: 'الرئيسية', nav_about: 'عني', nav_skills: 'المهارات', nav_edu: 'التعليم', nav_hobbies: 'الهوايات', nav_contact: 'تواصل',
    mode_eng: 'الهندسة', mode_photo: 'التصوير', theme_btn: 'تبديل السمة',
    btn_touch: 'لنتحدث',
    eb_about: 'من أكون', about_title: 'من أنا',
    edu_title: 'التعليم', eb_edu: 'الخلفية العلمية',
    hobbies_title: 'الهوايات', eb_hobbies: 'خارج العمل',
    contact_title: 'تواصل معي', eb_contact: 'راسلني',
    f_name: 'الاسم', f_email: 'البريد الإلكتروني', f_message: 'الرسالة', send: 'إرسال الرسالة',
    form_ok: 'شكراً لك! تم استلام رسالتك (نموذج تجريبي).',
    footer: 'مريم علي. صُمّم يدوياً بـ HTML وCSS وJavaScript.',
    alt_eng: 'صورة رسمية لمريم', alt_photo: 'صورة لمريم ({n} من 3)'
  }
};

// ---------- Text that changes with the portfolio mode ----------
// Projects: `group` adds a small heading in the tab list; `media` (photo or video) is optional.
// Experience / education: `logo` is a file in assets/logos/ (shown in black and white; initials if missing).
const copy = {
  eng: {
    en: {
      title: 'Maryam Ali | Software Engineer',
      nav_projects: 'Projects', nav_exp: 'Experience',
      hero_hi: "Hi, I'm Maryam,", hero_1: 'Software', hero_2: 'Engineer', btn_browse: 'View my work',
      hero_lead: "I'm a computer engineering graduate who builds clean, maintainable software with Java and Spring Boot, and I'm growing my skills in AI.",
      tag1: 'Computer Engineering graduate', tag2: 'Java · Spring Boot · AI',
      about_text: "I'm a Computer Engineering graduate who enjoys building things with Java and Spring Boot, and I'm growing my skills in AI, working with Python and exploring large language models and NLP to solve real problems. I care about writing clean, maintainable code and like digging into new tools as I go. Outside of development, I've been a Scout leader for years, organizing activities and media coverage within the Girl Guides Council, an experience that taught me a lot about leadership, initiative, and working with people.",
      location: '',
      eb_skills: 'What I work with', skills_title: 'Skills',
      skills: [
        { h: 'Programming languages', items: ['Java', 'Python', 'SQL', 'Assembly', 'JavaScript', 'Matlab'] },
        { h: 'AI / ML', items: ['Large Language Models (LLMs)', 'Natural Language Processing (NLP)'] },
        { h: 'Tools', items: ['Git / GitHub', 'VS Code', 'AutoCAD', 'LTspice', 'VLSI'] },
        { h: 'Frameworks', items: ['Flask', 'Esri JS API', 'Apache Tomcat (familiar)'] },
        { h: 'DevOps', items: ['Linux', 'Docker (familiar)', 'Kubernetes (familiar)'] }
      ],
      eb_projects: 'Selected work', projects_title: 'Projects',
      projects: [
        { group: 'Graduation project', tab: 'AI Question Generation', title: 'AI-Powered Question Generation System', at: '@ GitHub', href: 'https://github.com/mirriyam/FlaskProjectGrad',
          meta: 'Graduation project · Flask, LLaMA 3.1, Ollama, pdfplumber', media: 'assets/projects/graduation.mp4',
          pts: ['Developed a web-based educational platform for automated question generation.', 'Used the LLaMA 3.1 language model to generate multiple choice, true/false and short-answer questions.', 'Built with Flask and a responsive frontend, with results exported as DOCX/TXT.', 'Evaluated performance using BLEU, ROUGE and cosine similarity metrics.'] },
        { group: 'AI Bootcamp', tab: 'FastAPI Chat API', title: 'FastAPI Chat API', at: '@ GitHub', href: GH, meta: 'FastAPI, Prometheus, OpenRouter',
          pts: ['Built a FastAPI chat API with an OpenRouter LLM backend.', 'Added Prometheus monitoring.', 'Added structured logging.'] },
        { group: 'AI Bootcamp', tab: 'TypeScript Agents', title: 'TypeScript Agents Workshop', at: '@ GitHub', href: GH, meta: 'TypeScript, @openai/agents, OpenRouter',
          pts: ['Used the @openai/agents SDK pointed at OpenRouter.', 'Built a custom file system agent.'] },
        { group: 'Amman 42', tab: 'Advanced Digital Skills Program', title: 'Advanced Digital Skills Program', at: '@ GitHub', href: GH, meta: 'Amman 42 · 10/2026 – Present', pts: [],
          items: [
            { t: 'P00: Discovery Web Piscine', href: 'https://github.com/mirriyam/discovery-web-piscine', d: 'Introductory exercises (ex00 to ex03) done in the shell and tracked with Git.' },
            { t: 'P01: HTML Fundamentals', href: 'https://github.com/mirriyam/project-01-HTML-Fundamentals', d: 'Six exercises (ex00 to ex05) on the fundamentals of structuring a web page with HTML.' },
            { t: 'P02: CSS Visual Presentation', href: 'https://github.com/mirriyam/project-02-CSS-Visual-Presentation', d: 'A project on controlling how a web page looks and is laid out using CSS.' }
            // Add the next project here, for example:
            // , { t: 'P03: Name', href: 'https://github.com/mirriyam/repo-name', d: 'One sentence about the project.' }
          ] },
        { group: 'Embedded systems', tab: 'Rain-Aware Irrigation', title: 'A Simple Rain-Aware Automated Garden Irrigation System', at: '@ GitHub', href: GH, meta: 'PIC16F877A, PIC Assembly',
          pts: ['Designed an embedded system for home gardens using the PIC16F877A microcontroller.', 'Programmed in PIC assembly to manage sensor data acquisition and irrigation control.'] }
      ],
      eb_exp: "Where I've worked", exp_title: 'Experience',
      exp: [
        { tab: 'ProgressSoft', org: 'ProgressSoft', role: 'Java Developer Intern', date: '07/2026 – 08/2026', logo: 'assets/logos/progresssoft.png',
          pts: ['Applied core Java (OOP, exceptions, lambdas, Collections, JDBC), Git and Maven.', 'Practiced clean code principles, SOLID design, common design patterns and TDD through structured code reviews.', 'Gained hands-on exposure to Spring Boot fundamentals, Java servlets and AI-assisted development practices.'] },
        { tab: 'Estarta Solutions', org: 'Estarta Solutions', role: 'Estarta Incubator Program', date: '04/2026 – 08/2026', logo: 'assets/logos/estarta.png',
          pts: ['Networking fundamentals, OSI/TCP-IP layers and Layer 2 switching (VLANs, STP, EtherChannel).', 'IP addressing, routing (OSPFv2, DHCP) and network security (ACLs, VPN/IPsec).', 'Network virtualization, automation, wireless LAN, and network operations and troubleshooting.'] },
        { tab: 'gistec', org: 'gistec', role: 'Frontend Developer and ArcGIS Intern', date: '07/2025 – 09/2025', logo: 'assets/logos/gistec.png',
          pts: ['Built responsive web interfaces and interactive maps using HTML, CSS and JavaScript for enterprise GIS solutions.', 'Integrated the Esri JavaScript API to render real-time interactive maps and spatial data visualizations.', 'Managed GIS datasets and performed spatial analysis using ArcGIS Pro and ArcGIS Online.'] }
      ],
      edu: [
        { tab: 'University of Jordan', org: 'University of Jordan', role: 'Computer Engineering', date: '2021 – 01/2026', logo: 'assets/logos/uj.png', pts: [] },
        { tab: 'Amman 42', org: 'Amman 42', role: 'Advanced Digital Skills Program', date: '10/2026 – Present', logo: 'assets/logos/amman42.png',
          pts: ['Project-based training in the fundamentals of web development: shell, Git, HTML and CSS.'] },
        { tab: 'JOSA', org: 'JOSA', role: 'AI Engineering Bootcamp', date: '05/2026 – 06/2026', logo: 'assets/logos/josa.png',
          pts: ['Prompt engineering, RAG pipelines, and autonomous agents and multi-agent workflows (MCP).', 'Production feedback loops, model monitoring, and fine-tuning open-source LLMs (Hugging Face, Ollama).'] }
      ],
      hobbies: [
        { t: 'Photography', d: '“A Walker in Amman”, submitted to an exhibition.', act: 'switch', a: 'View my photography' },
        { t: 'Scouting and volunteering', d: 'Scout leader with the Girl Guides Council since 2021.', act: 'soon', a: 'Page coming soon' },
        { t: 'Reading', d: 'Interested in reading psychology, history and literature, and a founding member of Diwan Fatemah, a cultural club.', act: '', a: '' }
      ],
      contact_sub: "Have a role, a project or an idea in mind? Let's talk."
    },
    ar: {
      title: 'مريم علي | مهندسة برمجيات',
      nav_projects: 'المشاريع', nav_exp: 'الخبرات',
      hero_hi: 'مرحباً، أنا مريم،', hero_1: 'مهندسة', hero_2: 'برمجيات', btn_browse: 'شاهد أعمالي',
      hero_lead: 'أنا خريجة هندسة حاسوب أبني برمجيات نظيفة وسهلة الصيانة باستخدام Java وSpring Boot، وأطوّر مهاراتي في الذكاء الاصطناعي.',
      tag1: 'خريجة هندسة حاسوب', tag2: 'Java · Spring Boot · AI',
      about_text: 'أنا خريجة هندسة حاسوب أستمتع ببناء المشاريع باستخدام Java وSpring Boot، وأطوّر مهاراتي في الذكاء الاصطناعي من خلال العمل مع Python واستكشاف النماذج اللغوية الكبيرة ومعالجة اللغة الطبيعية لحل مشكلات حقيقية. أهتم بكتابة كود نظيف وقابل للصيانة، وأحب التعمق في الأدوات الجديدة أثناء العمل. وخارج التطوير، أنا قائدة كشفية منذ سنوات، أنظّم الأنشطة والتغطية الإعلامية ضمن مجلس المرشدات، وقد علّمتني هذه التجربة الكثير عن القيادة والمبادرة والعمل مع الناس.',
      location: '',
      eb_skills: 'ما أعمل به', skills_title: 'المهارات',
      skills: [
        { h: 'لغات البرمجة', items: ['Java', 'Python', 'SQL', 'Assembly', 'JavaScript', 'Matlab'] },
        { h: 'الذكاء الاصطناعي / تعلّم الآلة', items: ['النماذج اللغوية الكبيرة (LLMs)', 'معالجة اللغة الطبيعية (NLP)'] },
        { h: 'الأدوات', items: ['Git / GitHub', 'VS Code', 'AutoCAD', 'LTspice', 'VLSI'] },
        { h: 'أطر العمل', items: ['Flask', 'Esri JS API', 'Apache Tomcat (إلمام)'] },
        { h: 'DevOps', items: ['Linux', 'Docker (إلمام)', 'Kubernetes (إلمام)'] }
      ],
      eb_projects: 'أعمال مختارة', projects_title: 'المشاريع',
      projects: [
        { group: 'مشروع التخرج', tab: 'توليد الأسئلة بالذكاء الاصطناعي', title: 'نظام توليد الأسئلة بالذكاء الاصطناعي', at: '@ GitHub', href: 'https://github.com/mirriyam/FlaskProjectGrad',
          meta: 'مشروع التخرج · Flask, LLaMA 3.1, Ollama, pdfplumber', media: 'assets/projects/graduation.mp4',
          pts: ['طوّرت منصة تعليمية على الويب لتوليد الأسئلة تلقائياً.', 'استخدمت نموذج LLaMA 3.1 لتوليد أسئلة اختيار من متعدد وصح/خطأ وإجابات قصيرة.', 'بنيتها باستخدام Flask وواجهة أمامية متجاوبة، مع تصدير النتائج بصيغتي DOCX/TXT.', 'قيّمت الأداء بمقاييس BLEU وROUGE وCosine Similarity.'] },
        { group: 'معسكر الذكاء الاصطناعي', tab: 'واجهة محادثة FastAPI', title: 'واجهة محادثة بـ FastAPI', at: '@ GitHub', href: GH, meta: 'FastAPI, Prometheus, OpenRouter',
          pts: ['بنيت واجهة محادثة بـ FastAPI مع نموذج لغوي عبر OpenRouter.', 'أضفت مراقبة الأداء بـ Prometheus.', 'أضفت سجلات منظّمة.'] },
        { group: 'معسكر الذكاء الاصطناعي', tab: 'وكلاء TypeScript', title: 'ورشة وكلاء TypeScript', at: '@ GitHub', href: GH, meta: 'TypeScript, @openai/agents, OpenRouter',
          pts: ['استخدمت حزمة @openai/agents مع OpenRouter.', 'بنيت وكيلاً مخصصاً لإدارة الملفات.'] },
        { group: 'Amman 42', tab: 'برنامج المهارات الرقمية المتقدمة', title: 'برنامج المهارات الرقمية المتقدمة', at: '@ GitHub', href: GH, meta: 'Amman 42 · 10/2026 – حتى الآن', pts: [],
          items: [
            { t: 'P00: Discovery Web Piscine', href: 'https://github.com/mirriyam/discovery-web-piscine', d: 'تمارين تمهيدية (ex00 إلى ex03) نُفّذت في الـ shell وتمت متابعتها بـ Git.' },
            { t: 'P01: HTML Fundamentals', href: 'https://github.com/mirriyam/project-01-HTML-Fundamentals', d: 'ستة تمارين (ex00 إلى ex05) على أساسيات بناء صفحة ويب بـ HTML.' },
            { t: 'P02: CSS Visual Presentation', href: 'https://github.com/mirriyam/project-02-CSS-Visual-Presentation', d: 'مشروع حول التحكم بمظهر صفحة الويب وتخطيطها باستخدام CSS.' }
          ] },
        { group: 'الأنظمة المدمجة', tab: 'الري الآلي للحديقة', title: 'نظام ري آلي بسيط للحديقة يستجيب للمطر', at: '@ GitHub', href: GH, meta: 'PIC16F877A, PIC Assembly',
          pts: ['صمّمت نظاماً مدمجاً للحدائق المنزلية باستخدام المتحكم PIC16F877A.', 'برمجته بلغة PIC assembly لإدارة قراءة الحساسات والتحكم بالري.'] }
      ],
      eb_exp: 'أين عملت', exp_title: 'الخبرات',
      exp: [
        { tab: 'ProgressSoft', org: 'ProgressSoft', role: 'متدرّبة مطوّرة Java', date: '07/2026 – 08/2026', logo: 'assets/logos/progresssoft.png',
          pts: ['طبّقت أساسيات Java (البرمجة كائنية التوجه، الاستثناءات، lambdas، Collections، JDBC) إلى جانب Git وMaven.', 'تدرّبت على مبادئ الكود النظيف وتصميم SOLID وأنماط التصميم الشائعة وTDD من خلال مراجعات كود منظّمة.', 'اكتسبت تعرّضاً عملياً لأساسيات Spring Boot وJava servlets وممارسات التطوير بمساعدة الذكاء الاصطناعي.'] },
        { tab: 'Estarta Solutions', org: 'Estarta Solutions', role: 'برنامج Estarta للحضانة', date: '04/2026 – 08/2026', logo: 'assets/logos/estarta.png',
          pts: ['أساسيات الشبكات وطبقات OSI/TCP-IP وتبديل الطبقة الثانية (VLANs وSTP وEtherChannel).', 'عنونة IP والتوجيه (OSPFv2 وDHCP) وأمن الشبكات (ACLs وVPN/IPsec).', 'افتراضية الشبكات والأتمتة والشبكات اللاسلكية وتشغيل الشبكات واستكشاف أخطائها.'] },
        { tab: 'gistec', org: 'gistec', role: 'متدرّبة واجهات أمامية وArcGIS', date: '07/2025 – 09/2025', logo: 'assets/logos/gistec.png',
          pts: ['بنيت واجهات ويب متجاوبة وخرائط تفاعلية باستخدام HTML وCSS وJavaScript لحلول GIS المؤسسية.', 'دمجت Esri JavaScript API لعرض خرائط تفاعلية وتصورات بيانات مكانية في الوقت الفعلي.', 'أدرت مجموعات بيانات GIS وأجريت تحليلاً مكانياً باستخدام ArcGIS Pro وArcGIS Online.'] }
      ],
      edu: [
        { tab: 'الجامعة الأردنية', org: 'الجامعة الأردنية', role: 'هندسة الحاسوب', date: '2021 – 01/2026', logo: 'assets/logos/uj.png', pts: [] },
        { tab: 'Amman 42', org: 'Amman 42', role: 'برنامج المهارات الرقمية المتقدمة', date: '10/2026 – حتى الآن', logo: 'assets/logos/amman42.png',
          pts: ['تدريب قائم على المشاريع في أساسيات تطوير الويب: الـ shell وGit وHTML وCSS.'] },
        { tab: 'JOSA', org: 'JOSA', role: 'معسكر هندسة الذكاء الاصطناعي', date: '05/2026 – 06/2026', logo: 'assets/logos/josa.png',
          pts: ['هندسة الأوامر وخطوط RAG والوكلاء المستقلين وسير عمل الوكلاء المتعددين (MCP).', 'حلقات التغذية الراجعة في الإنتاج ومراقبة النماذج وضبط النماذج اللغوية مفتوحة المصدر (Hugging Face وOllama).'] }
      ],
      hobbies: [
        { t: 'التصوير', d: '«مَشّاءة في عمّان»، شاركت بها في معرض.', act: 'switch', a: 'شاهد أعمال التصوير' },
        { t: 'الكشافة والتطوع', d: 'قائدة كشفية ضمن مجلس المرشدات منذ 2021.', act: 'soon', a: 'الصفحة قريباً' },
        { t: 'القراءة', d: 'مهتمة بالقراءة في علم النفس والتاريخ والأدب، وعضوة مؤسِّسة في ديوان فاطمة، وهو نادٍ ثقافي.', act: '', a: '' }
      ],
      contact_sub: 'لديك فرصة أو مشروع أو فكرة؟ لنتحدث.'
    }
  },
  photo: {
    en: {
      title: 'Maryam Ali | Photographer',
      nav_projects: 'Gallery', nav_exp: 'Journey',
      hero_hi: "Hi, I'm Maryam,", hero_1: 'Photographer', hero_2: 'from Amman', btn_browse: 'View gallery',
      hero_lead: 'I use light and composition to tell small stories about everyday life in Amman.',
      tag1: 'Based in Amman', tag2: '“A Walker in Amman”',
      about_text: 'Photography is how I notice the details of everyday life in Amman. I use light and composition to tell small stories, and my photo “A Walker in Amman” was submitted to an exhibition.',
      location: '',
      eb_skills: 'What I bring', skills_title: 'Skills',
      skills: [
        { h: 'Creative skills', items: ['Photography', 'Video editing', 'Graphic design', 'Content writing'] },
        { h: 'Training', items: ['Introduction to photography and Photoshop'] }
      ],
      eb_projects: 'Selected photos', projects_title: 'Gallery',
      projects: [
        { tab: 'A Walker in Amman', title: 'A Walker in Amman', at: '@ Exhibition', meta: 'April 2026', media: 'assets/gallery/walker-in-amman.jpg',
          pts: ['Shot in Amman in April 2026', 'Submitted to an exhibition'] }
      ],
      eb_exp: 'Along the way', exp_title: 'Journey',
      exp: [
        { tab: 'A Walker in Amman', org: 'A Walker in Amman', role: 'Exhibition submission', date: '04/2026', logo: '',
          pts: ['Shot in Amman in April 2026.', 'Submitted to an exhibition.'] },
        { tab: 'AT Films Academy', org: 'AT Films Academy', role: 'Introduction to Photography and Photoshop', date: '', logo: 'assets/logos/at-films.png', pts: [] }
      ],
      edu: [], hobbies: [],
      contact_sub: 'Interested in a shoot or a print? Say hello.'
    },
    ar: {
      title: 'مريم علي | مصوّرة',
      nav_projects: 'المعرض', nav_exp: 'المسيرة',
      hero_hi: 'مرحباً، أنا مريم،', hero_1: 'مصوّرة', hero_2: 'من عمّان', btn_browse: 'شاهد المعرض',
      hero_lead: 'أستخدم الضوء والتكوين لأروي قصصاً صغيرة عن الحياة اليومية في عمّان.',
      tag1: 'من عمّان', tag2: '«مَشّاءة في عمّان»',
      about_text: 'التصوير هو طريقتي في ملاحظة تفاصيل الحياة اليومية في عمّان. أستخدم الضوء والتكوين لأروي قصصاً صغيرة، وقد شاركت بصورتي «مَشّاءة في عمّان» في معرض.',
      location: '',
      eb_skills: 'ما أقدّمه', skills_title: 'المهارات',
      skills: [
        { h: 'المهارات الإبداعية', items: ['التصوير', 'مونتاج الفيديو', 'التصميم الجرافيكي', 'كتابة المحتوى'] },
        { h: 'التدريب', items: ['مقدمة في التصوير وPhotoshop'] }
      ],
      eb_projects: 'صور مختارة', projects_title: 'المعرض',
      projects: [
        { tab: 'مَشّاءة في عمّان', title: 'مَشّاءة في عمّان', at: '@ معرض', meta: 'نيسان 2026', media: 'assets/gallery/walker-in-amman.jpg',
          pts: ['صُوّرت في عمّان في نيسان 2026', 'شاركت بها في معرض'] }
      ],
      eb_exp: 'على الطريق', exp_title: 'المسيرة',
      exp: [
        { tab: 'مَشّاءة في عمّان', org: 'مَشّاءة في عمّان', role: 'المشاركة في معرض', date: '04/2026', logo: '',
          pts: ['صُوّرت في عمّان في نيسان 2026.', 'شاركت بها في معرض.'] },
        { tab: 'AT Films Academy', org: 'AT Films Academy', role: 'مقدمة في التصوير وPhotoshop', date: '', logo: 'assets/logos/at-films.png', pts: [] }
      ],
      edu: [], hobbies: [],
      contact_sub: 'هل تفكر في جلسة تصوير أو طباعة صورة؟ راسلني.'
    }
  }
};

// ---------- State ----------
let lang = localStorage.getItem('lang') || 'en';
let mode = PHOTOGRAPHY_PAGE ? (localStorage.getItem('mode') || 'eng') : 'eng';
let photoIdx = 0;
const activeTabs = { projects: 0, exp: 0, edu: 0 };
const avatar = $('avatar');
const ring = $('ring');

// ---------- Builders (text always goes in with textContent) ----------
const el = (tag, cls, text) => {
  const node = document.createElement(tag);
  if (cls) node.className = cls;
  if (text !== undefined) node.textContent = text;
  return node;
};

function buildSkills(list) {
  $('skills-cols').replaceChildren(...list.map((col) => {
    const div = el('div', 'col');
    const ul = el('ul');
    col.items.forEach((item) => ul.append(el('li', '', item)));
    div.append(el('h3', '', col.h), ul);
    return div;
  }));
}

function buildHobbies(list) {
  $('hobby-rows').replaceChildren(...list.map((h) => {
    const li = el('li', 'row');
    li.append(el('div', 'what', h.t), el('div', 'hobby-desc', h.d));
    if (h.act === 'switch' && PHOTOGRAPHY_PAGE) {
      const b = el('button', 'link-btn', h.a);
      b.type = 'button';
      b.addEventListener('click', () => { switchMode('photo'); window.scrollTo({ top: 0, behavior: 'smooth' }); });
      li.append(b);
    } else if (h.act === 'soon') {
      li.append(el('span', 'soon', h.a));
    } else {
      li.append(el('span'));
    }
    return li;
  }));
}

function buildLinks(list) {
  $('links').replaceChildren(...list.map((l) => {
    const li = el('li');
    const a = el('a');
    a.href = l.href; a.target = '_blank'; a.rel = 'noopener';
    a.insertAdjacentHTML('afterbegin', ICONS[l.icon]);   // static, trusted SVG
    a.append(el('span', '', l.label));
    li.append(a);
    return li;
  }));
}

// Photo or video; if the file is missing, a striped frame with the title shows instead
function makeMedia(src, title) {
  const box = el('div', 'media');
  const fallback = () => box.replaceChildren(el('div', 'ph', title));
  const isVideo = /\.(mp4|webm)$/i.test(src);
  const node = document.createElement(isVideo ? 'video' : 'img');
  if (isVideo) { node.controls = true; node.muted = true; node.loop = true; node.playsInline = true; node.autoplay = true; node.preload = 'metadata'; }
  else { node.alt = title; node.loading = 'lazy'; }
  node.addEventListener('error', fallback);
  node.src = src;
  box.append(node);
  return box;
}

// Company / school logo, shown in black and white; initials if the file is missing
function makeLogo(src, name) {
  const box = el('div', 'logo-box');
  const initials = () => box.replaceChildren(el('span', 'mono', name.split(/\s+/).filter(Boolean).slice(0, 2).map((w) => w[0]).join('').toUpperCase()));
  if (!src) { initials(); return box; }
  const img = document.createElement('img');
  img.alt = '';
  img.addEventListener('error', initials);
  img.src = src;
  box.append(img);
  return box;
}

function projectPanel(p) {
  const panel = el('article');
  if (p.media) panel.append(makeMedia(p.media, p.title));
  const h3 = el('h3');
  h3.append(p.title + ' ');
  const at = el(p.href ? 'a' : 'span', 'at', p.at);
  if (p.href) { at.href = p.href; at.target = '_blank'; at.rel = 'noopener'; }
  h3.append(at);
  const pts = el('ul', 'checks');
  p.pts.forEach((pt) => pts.append(el('li', '', pt)));
  panel.append(h3, el('p', 'meta', p.meta), pts);
  if (p.items) {
    const subs = el('ul', 'subs');
    p.items.forEach((it) => {
      const li = el('li', 'sub');
      const h4 = el('h4');
      h4.append(it.t + ' ');
      const a = el('a', 'at', '@ GitHub');
      a.href = it.href; a.target = '_blank'; a.rel = 'noopener';
      h4.append(a);
      li.append(h4, el('p', '', it.d));
      subs.append(li);
    });
    panel.append(subs);
  }
  return panel;
}

function orgPanel(e) {
  const panel = el('article');
  const head = el('div', 'org-head');
  const info = el('div');
  const h3 = el('h3');
  h3.append(e.org);
  if (e.role) h3.append(el('span', 'role', e.role));
  info.append(h3, el('p', 'date', e.date));
  head.append(makeLogo(e.logo, e.org), info);
  const pts = el('ul', 'checks');
  e.pts.forEach((pt) => pts.append(el('li', '', pt)));
  panel.append(head, pts);
  return panel;
}

function selectTab(key, i) {
  activeTabs[key] = i;
  document.querySelectorAll(`#${key}-tabs .tab`).forEach((t, j) => {
    t.classList.toggle('active', i === j);
    t.setAttribute('aria-selected', String(i === j));
  });
  document.querySelectorAll(`#${key}-panels .panel`).forEach((p, j) => { p.hidden = i !== j; });
}

// One vertical tab list + detail panel, used for projects, experience and education
function buildTabs(key, list, panelFn) {
  const tabs = $(key + '-tabs');
  const panels = $(key + '-panels');
  tabs.replaceChildren();
  panels.replaceChildren();
  let lastGroup = null;
  list.forEach((item, i) => {
    if (item.group && item.group !== lastGroup) { tabs.append(el('div', 'tab-group', item.group)); lastGroup = item.group; }
    const tab = el('button', 'tab', item.tab);
    tab.type = 'button';
    tab.id = `${key}-tab-${i}`;
    tab.setAttribute('role', 'tab');
    tab.setAttribute('aria-controls', `${key}-panel-${i}`);
    tab.addEventListener('click', () => selectTab(key, i));
    tabs.append(tab);

    const panel = panelFn(item);
    panel.classList.add('panel');
    panel.id = `${key}-panel-${i}`;
    panel.setAttribute('role', 'tabpanel');
    panel.setAttribute('aria-labelledby', tab.id);
    panels.append(panel);
  });
  selectTab(key, Math.max(0, Math.min(activeTabs[key], list.length - 1)));
}

// ---------- Portrait photo ----------
function altText() {
  return mode === 'eng' ? ui[lang].alt_eng : ui[lang].alt_photo.replace('{n}', photoIdx + 1);
}
function updateDots() {
  document.querySelectorAll('#dots i').forEach((d, i) => d.classList.toggle('on', i === photoIdx));
}
function showPhoto(i) {
  const n = PHOTOS[mode].length;
  i = (i + n) % n;
  if (i === photoIdx) return;
  photoIdx = i;
  avatar.classList.add('fade');
  setTimeout(() => {
    avatar.src = PHOTOS[mode][photoIdx];
    avatar.alt = altText();
    updateDots();
    avatar.classList.remove('fade');
  }, 140);
}

// ---------- Render ----------
function render() {
  const t = { ...ui[lang], ...copy[mode][lang] };
  document.querySelectorAll('[data-i18n]').forEach((node) => { node.textContent = t[node.dataset.i18n]; });
  document.title = t.title;
  $('lang-btn').textContent = lang === 'ar' ? 'English' : 'العربية';
  if (photoIdx >= PHOTOS[mode].length) photoIdx = 0;
  if (!avatar.src.endsWith(PHOTOS[mode][photoIdx])) avatar.src = PHOTOS[mode][photoIdx];
  avatar.alt = altText();
  ring.tabIndex = mode === 'photo' ? 0 : -1;
  updateDots();
  $('form-status').dataset.ok = t.form_ok;
  $('form-status').textContent = '';
  buildSkills(t.skills);
  buildTabs('projects', t.projects, projectPanel);
  buildTabs('exp', t.exp, orgPanel);
  buildTabs('edu', t.edu, orgPanel);
  buildHobbies(t.hobbies);
  buildLinks(LINKS[mode]);
  document.querySelectorAll('.mode button').forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.mode === mode)));
}

function setLang(l) {
  lang = l;
  root.lang = l;
  root.dir = l === 'ar' ? 'rtl' : 'ltr';
  localStorage.setItem('lang', l);
  render();
}

function setMode(m) {
  mode = m;
  root.dataset.mode = m;   // CSS swaps colors and the logo mark from this attribute, and hides engineering-only sections
  photoIdx = 0;
  activeTabs.projects = activeTabs.exp = activeTabs.edu = 0;
  localStorage.setItem('mode', m);
  render();
}

// Mode switch: click -> fade out -> swap content and colors -> fade in
function switchMode(m) {
  if (m === mode) return;
  main.classList.add('swap');
  setTimeout(() => { setMode(m); main.classList.remove('swap'); }, 200);
}

// ---------- Events ----------
document.querySelectorAll('.mode button').forEach((btn) => btn.addEventListener('click', () => switchMode(btn.dataset.mode)));
$('lang-btn').addEventListener('click', () => setLang(lang === 'en' ? 'ar' : 'en'));

function applyTheme(theme) {
  root.dataset.theme = theme;
  localStorage.setItem('theme', theme);
}
$('theme-btn').addEventListener('click', () => applyTheme(root.dataset.theme === 'dark' ? 'light' : 'dark'));

// Photography portrait: moving the mouse across the photo picks one of the 3 photos by position.
// Touch: tap to cycle. Keyboard: arrow keys.
ring.addEventListener('pointermove', (e) => {
  if (mode !== 'photo' || e.pointerType === 'touch') return;
  const r = ring.getBoundingClientRect();
  const n = PHOTOS.photo.length;
  showPhoto(Math.min(n - 1, Math.max(0, Math.floor((e.clientX - r.left) / r.width * n))));
});
ring.addEventListener('pointerdown', (e) => { if (mode === 'photo' && e.pointerType === 'touch') showPhoto(photoIdx + 1); });
ring.addEventListener('keydown', (e) => {
  if (mode !== 'photo') return;
  if (e.key === 'ArrowRight') showPhoto(photoIdx + 1);
  if (e.key === 'ArrowLeft') showPhoto(photoIdx - 1);
});

   // Contact form: sends the message through Formspree
   $('contact-form').addEventListener('submit', async (e) => {
     e.preventDefault();
     const form = e.target;
     const status = $('form-status');
     try {
       const res = await fetch('https://formspree.io/f/xzeerlbn', {
         method: 'POST',
         body: new FormData(form),
         headers: { Accept: 'application/json' }
       });
       if (res.ok) { status.textContent = status.dataset.ok; form.reset(); }
       else throw new Error('failed');
     } catch (err) {
       status.textContent = root.lang === 'ar' ? 'تعذّر الإرسال، حاولي مرة أخرى.' : 'Could not send. Please try again.';
     }
   });

// Highlight the nav link of the section in view
const navLinks = [...document.querySelectorAll('.nav-links a')];
const spy = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) navLinks.forEach((l) => l.classList.toggle('active', l.getAttribute('href') === '#' + entry.target.id));
  });
}, { rootMargin: '-40% 0px -55% 0px' });
navLinks.forEach((l) => spy.observe(document.querySelector(l.getAttribute('href'))));

// ---------- Start ----------
if (!PHOTOGRAPHY_PAGE) document.querySelector('.mode').hidden = true;
$('year').textContent = new Date().getFullYear();
applyTheme(localStorage.getItem('theme') || 'light');
root.dataset.mode = mode;
setLang(lang);
