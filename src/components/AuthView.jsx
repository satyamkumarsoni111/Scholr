import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Lock, User, Check, AlertCircle, Loader2 } from 'lucide-react';
import { getImagePath } from '../utils/paths';
import './AuthView.css';

export default function AuthView({ onLoginSuccess }) {
  const [mode, setMode] = useState('signin'); // 'signin' or 'signup'
  
  // Fields state
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  
  const [fullName, setFullName] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [stream, setStream] = useState('🎓 B.Tech / B.E.');
  
  // UX states
  const [errors, setErrors] = useState({});
  const [generalError, setGeneralError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Validate fields helper
  const validateForm = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!emailRegex.test(email)) {
      newErrors.email = 'Invalid email format';
    }

    if (!password) {
      newErrors.password = 'Password is required';
    } else if (password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }

    if (mode === 'signup') {
      if (!fullName.trim()) {
        newErrors.fullName = 'Full Name is required';
      }
      if (!confirmPassword) {
        newErrors.confirmPassword = 'Confirm Password is required';
      } else if (password !== confirmPassword) {
        newErrors.confirmPassword = 'Passwords do not match';
      }
      if (!acceptTerms) {
        newErrors.acceptTerms = 'You must accept the Terms & Conditions';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Helper to generate default articles for new users based on their stream
  const generateDefaultArticles = (authorName, userStream) => {
    const date = 'Just now';
    
    if (userStream === '💼 MBA') {
      return [
        {
          id: `p-${Date.now()}-1`,
          category: 'Product Management',
          author: authorName,
          date: date,
          title: "Product Management 101: Bridging Business and Engineering",
          excerpt: "How to craft a product vision, prioritize feature roadmaps, and communicate effectively with software developers.",
          initialClaps: 120,
          comments: 1,
          commentsList: [
            {
              id: `c-${Date.now()}-11`,
              author: 'Marc Thompson',
              avatar: getImagePath('/images/avatar_marc.png'),
              text: 'Excellent summary! As an engineer, clear PRDs and requirements make a huge difference.',
              date: 'Just now'
            }
          ],
          image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=500&auto=format&fit=crop',
          tags: ['Product Management', 'Career Prep'],
          streams: ['💼 MBA'],
          content: [
            "Product management sits at the intersection of business, design, and technology. As a PM, your job is not to build the code, but to define what needs to be built and why.",
            "## The Three Core Responsibilities",
            "1. **Customer Empathy:** Talk to users daily to discover their pain points.",
            "2. **Strategic Prioritization:** Balance technical debt against business goals.",
            "3. **Team Communication:** Bridge business goals into actionable engineer issues.",
            "To succeed as a student PM, start by analyzing your favorite products and writing simple feature breakdown specs."
          ]
        },
        {
          id: `p-${Date.now()}-2`,
          category: 'Finance',
          author: authorName,
          date: date,
          title: "Startup Valuations: How VCs Value Early-Stage Companies",
          excerpt: "An analysis of valuation frameworks, discounted cash flow (DCF), market comparables, and the dilution math of seed rounds.",
          initialClaps: 95,
          comments: 1,
          commentsList: [
            {
              id: `c-${Date.now()}-12`,
              author: 'Sarah Miller',
              avatar: getImagePath('/images/avatar_anna.png'),
              text: 'Valuation math is so interesting, especially the Berkus method.',
              date: 'Just now'
            }
          ],
          image: 'https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?w=500&auto=format&fit=crop',
          tags: ['Startup', 'Finance'],
          streams: ['💼 MBA'],
          content: [
            "How can a company with zero revenue be valued at $10 million? Valuation at the early stage is an art powered by market comparables and founder backgrounds.",
            "## Key VC Valuation Frameworks",
            "- **Berkus Method:** Assigns value to ideas, prototypes, and management teams.",
            "- **Scorecard Method:** Grades the startup against similar active companies.",
            "- **Risk Factor Summation:** Analyzes strategic risks (regulations, competition).",
            "For business students, understanding these metrics is key to advising or launching startup projects."
          ]
        },
        {
          id: `p-${Date.now()}-3`,
          category: 'Marketing',
          author: authorName,
          date: date,
          title: "The Art of Marketing to Gen-Z: Why Traditional Ads are Dead",
          excerpt: "How modern brands leverage micro-influencers, viral social media memes, and community-driven campaigns to capture attention.",
          initialClaps: 80,
          comments: 0,
          commentsList: [],
          image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=500&auto=format&fit=crop',
          tags: ['Marketing', 'Economics'],
          streams: ['💼 MBA'],
          content: [
            "Traditional television and banner ads fail to resonate with Gen-Z. To capture attention, modern marketing plans focus on authenticity, humor, and organic community participation.",
            "## Focus on Short Form Video",
            "TikTok and Instagram Reels are the primary channels. Campaigns must look organic, not highly produced.",
            "## Partnering with Micro-Influencers",
            "Influencers with 5k-50k followers often have much higher trust and engagement rates than celebrities."
          ]
        }
      ];
    } else if (userStream === 'Learner') {
      return [
        {
          id: `p-${Date.now()}-1`,
          category: 'Career Prep',
          author: authorName,
          date: date,
          title: "How to Land Your 1st Internship: No Experience Required",
          excerpt: "A complete step-by-step roadmap for first-year college students to build skills, write cover letters, and land their first paid internship.",
          initialClaps: 110,
          comments: 1,
          commentsList: [
            {
              id: `c-${Date.now()}-13`,
              author: 'Alex Chen',
              avatar: getImagePath('/images/avatar_user.png'),
              text: 'Extremely helpful advice! Building projects is definitely the best way to get noticed.',
              date: 'Just now'
            }
          ],
          image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=500&auto=format&fit=crop',
          tags: ['1st Internships', 'Career Prep'],
          streams: ['Learner'],
          content: [
            "Landing your very first internship with a blank resume is a common hurdle. The trick is to show potential, willingness to learn, and independent project building.",
            "## Build Mini Projects",
            "Don't wait for companies to hire you to start building. Create small apps or write tutorials to show your work.",
            "## Tailor Your Cover Letter",
            "Express passion for the company's domain and highlight how you can assist their team."
          ]
        },
        {
          id: `p-${Date.now()}-2`,
          category: 'Beginner Special',
          author: authorName,
          date: date,
          title: "How to Start with Open Source: A Beginner's First Pull Request",
          excerpt: "Ready to contribute to open source but don't know where to start? We guide you through finding beginner-friendly issues, forking, and landing your very first PR.",
          initialClaps: 135,
          comments: 1,
          commentsList: [
            {
              id: `c-${Date.now()}-14`,
              author: 'Sarah Miller',
              avatar: getImagePath('/images/avatar_anna.png'),
              text: 'I made my first contribution last week and it felt awesome!',
              date: 'Just now'
            }
          ],
          image: 'https://images.unsplash.com/photo-1618401471353-b98aedd07871?w=500&auto=format&fit=crop',
          tags: ['For you', 'Beginner Special'],
          streams: ['Learner'],
          content: [
            "Contributing to open source can feel extremely intimidating. Seeing code repositories with thousands of stars and complex structures might make you feel like you aren't ready. However, open source thrives on small contributions.",
            "## 1. Finding Good First Issues",
            "Start by looking for repositories with labels like `good first issue` or `documentation`.",
            "## 2. The Git Fork & Clone Workflow",
            "Fork the repository to your own account, then clone it to your local environment. Work on a separate feature branch.",
            "```bash\ngit checkout -b fix/typo-in-docs\n# Edit files and save\ngit add .\ngit commit -m 'Fix spelling in readme'\ngit push origin fix/typo-in-docs\n```"
          ]
        },
        {
          id: `p-${Date.now()}-3`,
          category: 'Version Control',
          author: authorName,
          date: date,
          title: "Introduction to Version Control: Git & GitHub 101",
          excerpt: "Stop naming files 'final_version_v2_edit.zip'. Master git init, commits, branches, and pushing repositories to GitHub.",
          initialClaps: 75,
          comments: 0,
          commentsList: [],
          image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=500&auto=format&fit=crop',
          tags: ['Beginner Special', 'Git'],
          streams: ['Learner'],
          content: [
            "Version control tracks edits chronologically. It allows you to roll back changes, debug file conflicts, and collaborate seamlessly on team projects.",
            "## 1. Initializing a Repository",
            "Run `git init` inside your project directory to start tracking revisions.",
            "## 2. The Commits Pipeline",
            "Stages files using `git add` and snapshot edits with `git commit`.",
            "```bash\ngit add .\ngit commit -m \"Initialize student profile layout\"\n```"
          ]
        }
      ];
    } else {
      // Default is B.Tech / B.E.
      return [
        {
          id: `p-${Date.now()}-1`,
          category: 'Robotics',
          author: authorName,
          date: date,
          title: "Exploring the Frontiers of Robotics: My Journey with ROS2",
          excerpt: "How I started building node-based control systems for autonomous vehicles and what I learned about robot middleware.",
          initialClaps: 150,
          comments: 1,
          commentsList: [
            {
              id: `c-${Date.now()}-15`,
              author: 'Alex Chen',
              avatar: getImagePath('/images/avatar_user.png'),
              text: 'Great starting guide! ROS2 is indeed the future of robotics engineering.',
              date: 'Just now'
            }
          ],
          image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=500&auto=format&fit=crop',
          tags: ['For you', 'Robotics'],
          streams: ['🎓 B.Tech / B.E.'],
          content: [
            "Robot Operating System (ROS2) is the industry standard for writing robust robot software. As a B.Tech student, getting my hands dirty with nodes, topics, and services opened my eyes to the world of middleware.",
            "## Setting up the ROS2 Workspace",
            "First, you need to configure your environment and create a workspace. Here is a simple minimal node setup in C++:",
            "```cpp\n#include \"rclcpp/rclcpp.hpp\"\nint main(int argc, char **argv) {\n  rclcpp::init(argc, argv);\n  auto node = rclcpp::Node::make_shared(\"my_first_node\");\n  RCLCPP_INFO(node->get_logger(), \"Hello from ROS2 Workspace!\");\n  rclcpp::spin(node);\n  rclcpp::shutdown();\n  return 0;\n}\n```"
          ]
        },
        {
          id: `p-${Date.now()}-2`,
          category: 'DSA',
          author: authorName,
          date: date,
          title: "How to Master Data Structures and Algorithms without Burning Out",
          excerpt: "A practical guide for B.Tech students on mastering arrays, trees, and dynamic programming through consistent daily practice.",
          initialClaps: 220,
          comments: 1,
          commentsList: [
            {
              id: `c-${Date.now()}-16`,
              author: 'Sergey Nes',
              avatar: getImagePath('/images/avatar_marc.png'),
              text: 'Consistency is key. 1-2 problems a day keeps the job hunt stress away!',
              date: 'Just now'
            }
          ],
          image: 'https://images.unsplash.com/photo-1607799279861-4dd421887fb3?w=500&auto=format&fit=crop',
          tags: ['For you', 'DSA'],
          streams: ['🎓 B.Tech / B.E.'],
          content: [
            "Data Structures and Algorithms (DSA) form the foundation of problem-solving in computer science. Master it by focusing on logic, not memorization.",
            "## Step-by-Step Focus",
            "1. **Arrays & Strings:** Master basic index math.",
            "2. **Recursion & Trees:** Learn how to think recursively.",
            "3. **Dynamic Programming:** Break complex problems into smaller subproblems."
          ]
        },
        {
          id: `p-${Date.now()}-3`,
          category: 'Web Development',
          author: authorName,
          date: date,
          title: "Why Web Development is a Superpower for Engineers",
          excerpt: "An engineering-first perspective on how building full-stack web applications can help you bring your robotics or AI ideas to life.",
          initialClaps: 90,
          comments: 0,
          commentsList: [],
          image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=500&auto=format&fit=crop',
          tags: ['For you', 'Web Development'],
          streams: ['🎓 B.Tech / B.E.'],
          content: [
            "Many engineering students look down on web dev as 'just UI.' But web applications are the primary medium for exposing algorithms and devices to users.",
            "## Build Full Stack Prototypes",
            "Knowing how to write a simple API wrapper or React dashboard allows you to demo your machine learning models or hardware sensors in real-time."
          ]
        }
      ];
    }
  };

  const handleSignIn = (e) => {
    e.preventDefault();
    setGeneralError('');
    setSuccessMessage('');

    if (!validateForm()) return;

    setIsLoading(true);

    // Simulate server request delay (1s)
    setTimeout(() => {
      // Get users from localStorage
      const usersRaw = localStorage.getItem('users');
      let users;
      try {
        users = usersRaw ? JSON.parse(usersRaw) : [];
      } catch {
        users = [];
      }

      // Check if demo user "Satyam" needs to be added (seed user)
      const hasSatyam = users.some(u => u.email.toLowerCase() === 'satyam@scholr.com');
      if (!hasSatyam) {
        const satyamUser = {
          name: 'Satyam',
          email: 'satyam@scholr.com',
          password: 'password123',
          stream: '🎓 B.Tech / B.E.',
          avatar: getImagePath('/images/avatar_user.png'),
          banner: getImagePath('/images/cover_user.png'),
          headline: 'AI/ML Enthusiast | Web Developer | Open Source Learner',
          education: 'QUAD AI School of Technology / Medhavi Skills University',
          branch: 'Integrated B.Tech in Computer Science (AI/ML)',
          gradYear: '2028',
          collegeLocation: 'Ranchi, Jharkhand, India',
          skills: 'React, Python, DSA, Machine Learning, C++, HTML, CSS, JavaScript, Git, EasyEDA, Tinkercard, Circuit Design',
          areasOfInterest: 'Robotics & Automation, Artificial Intelligence, Frontend Development, Participating in Hackathon',
          github: 'https://github.com/satyam',
          linkedin: 'https://linkedin.com/in/satyam',
          portfolio: 'https://satyam.dev',
          about: `Satyam is a Computer Science (AI/ML) student at QUAD AI School of Technology pursuing an Integrated B.Tech program affiliated with Medhavi Skills University.

He is passionate about Robotics, AI/ML, and building real-world tech projects. He enjoy participating in hackathons, solving practical problems, and learning by building innovative solutions under real challenges.
Over the past few months, He has worked on robotics projects, PCB design, frontend development, and AI-based ideas while actively participating in multiple hackathons .

Technical Skills & Tools:
 • C++, Python
 • HTML, CSS, JavaScript, React
 • Git & GitHub
 • EasyEDA
 • Tinkercard
 • Circuit Design
 • AI/ML Basics
 • Robotics

Areas of Interest:
 • Robotics & Automation
 • Artificial Intelligence
 • Frontend Development
 • Participating in Hackathon

Achievements & Highlights:
 • Finalist at hackathon events organized by BITS Pilani
 • Winner at competitions hosted by Indian Institute of Technology Dhanbad
 • Winner at tech competitions organized by Birsa Institute of Technology Sindri
 • Published technical and student-focused articles on Medium .

He believe in learning through hands-on experience, teamwork, and continuous experimentation. Always open to collaborating, learning new technologies, and building impactful project.`,
          profileArticles: [
            {
              id: 'p1',
              category: 'AI Insights',
              author: 'Satyam',
              date: 'May 12',
              title: 'The Future of AI Agents: Why Students Should Care',
              excerpt: 'Autonomous agents are redefining the academic landscape, from research automation to personalized study assistants. We look into the AI tools driving student productivity and breakthroughs.',
              initialClaps: 2400,
              comments: 2,
              commentsList: [
                {
                  id: 'c1',
                  author: 'Anna Richards',
                  avatar: getImagePath('/images/avatar_anna.png'),
                  text: 'This is an outstanding breakdown! The explanation of the agentic loop makes perfect sense.',
                  date: '3 days ago'
                },
                {
                  id: 'c2',
                  author: 'Marc Thompson',
                  avatar: getImagePath('/images/avatar_marc.png'),
                  text: 'Absolutely! I have been building similar deterministic loops with python. Keep up the great writing.',
                  date: '2 days ago'
                }
              ],
              image: 'https://images.unsplash.com/photo-1677442136019-21780efad99a?w=500&auto=format&fit=crop',
              content: [
                "Autonomous AI agents are set to transform the student experience. Far from being simple text predictors, these agents plan, call APIs, and reason through long-term academic tasks.",
                "## Personalized Tutors",
                "Instead of a static textbook, an agent analyzes your homework code, suggests debugging solutions, and tests your understanding with interactive quizzes.",
                "## Research Automation",
                "Agents can scour scientific databases, summarize relevant papers, and draft literature review structures, saving students hours of research overhead."
              ]
            },
            {
              id: 'p2',
              category: 'Code Academy',
              author: 'Sarah Miller',
              date: 'May 10',
              title: '2024 Web Development Roadmap: From Zero to Full Stack',
              excerpt: 'Mastering modern web development requires a strategic approach. We break down the absolute essentials of HTML, CSS, JavaScript, React, server architectures, and databases for full mastery.',
              initialClaps: 1800,
              comments: 2,
              commentsList: [
                {
                  id: 'c1',
                  author: 'Anna Richards',
                  avatar: getImagePath('/images/avatar_anna.png'),
                  text: 'This is an outstanding breakdown! The explanation of the agentic loop makes perfect sense.',
                  date: '3 days ago'
                },
                {
                  id: 'c2',
                  author: 'Marc Thompson',
                  avatar: getImagePath('/images/avatar_marc.png'),
                  text: 'Absolutely! I have been building similar deterministic loops with python. Keep up the great writing.',
                  date: '2 days ago'
                }
              ],
              image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=500&auto=format&fit=crop',
              content: [
                "Web development moves incredibly fast. To avoid tutorial hell, build a systematic learning list mapping out standard web structures.",
                "## Phase 1: Semantic HTML & Vanilla CSS",
                "Master responsive styling, document mapping, flexbox layouts, and grids.",
                "## Phase 2: JavaScript & DOM Manipulation",
                "Understand asynchronous promises, fetch API calls, storage mechanics, and event listeners.",
                "## Phase 3: Frameworks & Deployments",
                "Learn React lifecycle states, routers, custom hooks, and publish application bundles to hosting solutions."
              ]
            },
            {
              id: 'p3',
              category: 'Student Success',
              author: 'Satyam',
              date: 'May 8',
              title: 'How I Landed a FAANG Internship as a Sophomore',
              excerpt: 'Networking, open-source contributions, and the exact resume template that got me past the screening bots at Google and Stripe. Here is the step-by-step sophomore guide.',
              initialClaps: 4200,
              comments: 2,
              commentsList: [
                {
                  id: 'c1',
                  author: 'Anna Richards',
                  avatar: getImagePath('/images/avatar_anna.png'),
                  text: 'This is an outstanding breakdown! The explanation of the agentic loop makes perfect sense.',
                  date: '3 days ago'
                },
                {
                  id: 'c2',
                  author: 'Marc Thompson',
                  avatar: getImagePath('/images/avatar_marc.png'),
                  text: 'Absolutely! I have been building similar deterministic loops with python. Keep up the great writing.',
                  date: '2 days ago'
                }
              ],
              image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=500&auto=format&fit=crop',
              content: [
                "Landing a sophomore internship at FAANG is tough, but far from impossible. If you focus on building a robust portfolio and networking, you can skip the standard application filters.",
                "## 1. Technical Depth Wins",
                "Don't build basic calculator apps. Build systems that handle multi-user database entries or automate hardware processes.",
                "## 2. Resume Keyword Optimization",
                "Align project bullet points to job description nouns: e.g., 'Implemented responsive React hooks, decreasing loading latency by 20%'.",
                "## 3. Direct Cold Messaging",
                "Connect with engineering managers, present your open-source projects, and ask for career advice. Often, they will refer you directly."
              ]
            }
          ],
          savedArticles: [],
          followingCreators: [
            {
              id: 'a1',
              name: 'Anna Richards',
              title: 'Data Scientist at Google',
              avatar: getImagePath('/images/avatar_anna.png')
            },
            {
              id: 'm1',
              name: 'Marc Thompson',
              title: 'Senior SWE at Stripe',
              avatar: getImagePath('/images/avatar_marc.png')
            }
          ],
          followers: [
            {
              id: 'f1',
              name: 'Sarah Miller',
              title: 'Technical Writer',
              avatar: getImagePath('/images/avatar_anna.png')
            },
            {
              id: 'f2',
              name: 'Alex Chen',
              title: 'AI Engineer',
              avatar: getImagePath('/images/avatar_user.png')
            },
            {
              id: 'f3',
              name: 'Sergey Nes',
              title: 'Staff Developer',
              avatar: getImagePath('/images/avatar_marc.png')
            }
          ]
        };
        users.push(satyamUser);
        localStorage.setItem('users', JSON.stringify(users));
      }

      const foundUser = users.find(
        u => u.email.toLowerCase() === email.toLowerCase() && u.password === password
      );

      if (foundUser) {
        // Save login state in currentUser in localStorage
        const sessionPayload = JSON.stringify(foundUser);
        localStorage.setItem('currentUser', sessionPayload);

        // Redirect to homepage via callback
        onLoginSuccess(foundUser);
      } else {
        setGeneralError('Invalid email or password. Use satyam@scholr.com / password123 for demo.');
        setIsLoading(false);
      }
    }, 1000);
  };

  const handleSignUp = (e) => {
    e.preventDefault();
    setGeneralError('');
    setSuccessMessage('');

    if (!validateForm()) return;

    setIsLoading(true);

    setTimeout(() => {
      // Get users list
      const usersRaw = localStorage.getItem('users');
      let users;
      try {
        users = usersRaw ? JSON.parse(usersRaw) : [];
      } catch {
        users = [];
      }

      const emailExists = users.some(u => u.email.toLowerCase() === email.toLowerCase());

      if (emailExists) {
        setGeneralError('An account with this email already exists.');
        setIsLoading(false);
        return;
      }

      // Generate stream-tailored articles
      const startingArticles = generateDefaultArticles(fullName, stream);

      // Create new user profile with pre-populated articles and standard networks
      const newUser = {
        name: fullName,
        email: email,
        password: password,
        stream: stream,
        avatar: getImagePath('/images/avatar_user.png'),
        banner: 'linear-gradient(135deg, #0F172A 0%, #1e293b 100%)',
        headline: `${stream} Student | Scholr Member`,
        education: 'Scholr Academy',
        branch: `${stream} Program`,
        gradYear: '2028',
        collegeLocation: 'Ranchi, Jharkhand, India',
        skills: stream === '🎓 B.Tech / B.E.' ? 'Python, React, C++, SQL' : stream === '💼 MBA' ? 'Management, Strategy, Finance' : 'HTML, CSS, Git, Web Basics',
        areasOfInterest: stream === '🎓 B.Tech / B.E.' ? 'Artificial Intelligence, Robotics' : stream === '💼 MBA' ? 'Product Management, Startups' : 'Software Engineering, Writing',
        github: 'https://github.com',
        linkedin: 'https://linkedin.com',
        portfolio: '',
        about: `${fullName} is a passionate ${stream} student building their knowledge and sharing ideas on Scholr.`,
        profileArticles: startingArticles,
        savedArticles: [],
        followingCreators: [
          {
            id: 'a1',
            name: 'Anna Richards',
            title: 'Data Scientist at Google',
            avatar: getImagePath('/images/avatar_anna.png')
          },
          {
            id: 'm1',
            name: 'Marc Thompson',
            title: 'Senior SWE at Stripe',
            avatar: getImagePath('/images/avatar_marc.png')
          }
        ],
        followers: [
          {
            id: 'f1',
            name: 'Sarah Miller',
            title: 'Technical Writer',
            avatar: getImagePath('/images/avatar_anna.png')
          },
          {
            id: 'f2',
            name: 'Alex Chen',
            title: 'AI Engineer',
            avatar: getImagePath('/images/avatar_user.png')
          }
        ],
        isNewUser: false // set to false because we seeded their profile articles!
      };

      users.push(newUser);
      localStorage.setItem('users', JSON.stringify(users));
      localStorage.setItem('currentUser', JSON.stringify(newUser));

      setSuccessMessage('Account created successfully! Logging you in...');
      setIsLoading(false);

      // Directly log in the user and redirect to landing page (Home feed)
      setTimeout(() => {
        onLoginSuccess(newUser);
      }, 1000);

    }, 1200);
  };

  const switchMode = (newMode) => {
    setMode(newMode);
    setErrors({});
    setGeneralError('');
    setSuccessMessage('');
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    setFullName('');
    setAcceptTerms(false);
    setStream('🎓 B.Tech / B.E.');
  };

  return (
    <div className="auth-wrapper">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="auth-card"
      >
        {/* Brand Logo & Name */}
        <div className="auth-logo-row">
          <img 
            src={getImagePath('/images/logo.png')} 
            alt="Scholr Logo" 
            className="auth-logo-img"
          />
          <span className="auth-logo-text">
            Scholr
          </span>
        </div>

        <h2 className="auth-card-title">
          {mode === 'signin' ? 'Welcome Back' : 'Join Scholr'}
        </h2>
        <p className="auth-card-subtitle">
          {mode === 'signin' 
            ? 'Sign in to connect with fellow student creators.' 
            : 'Create your account to start writing and learning.'}
        </p>

        {/* Alerts */}
        <AnimatePresence>
          {generalError && (
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="auth-alert-error"
            >
              <AlertCircle size={16} className="auth-alert-icon" />
              <span>{generalError}</span>
            </motion.div>
          )}

          {successMessage && (
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="auth-alert-success"
            >
              <Check size={16} className="auth-alert-icon-success" />
              <span>{successMessage}</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Forms */}
        <form className="auth-form">
          
          {mode === 'signup' && (
            <div className="auth-form-group">
              <label className="auth-label">Full Name</label>
              <div className="auth-input-wrapper">
                <User size={16} className="auth-input-icon" />
                <input 
                  type="text"
                  placeholder="Enter your name"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className={`auth-input ${errors.fullName ? 'error' : ''}`}
                />
              </div>
              {errors.fullName && <span className="auth-error-text">{errors.fullName}</span>}
            </div>
          )}

          <div className="auth-form-group">
            <label className="auth-label">Email Address</label>
            <div className="auth-input-wrapper">
              <Mail size={16} className="auth-input-icon" />
              <input 
                type="email"
                placeholder="you@university.edu"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`auth-input ${errors.email ? 'error' : ''}`}
              />
            </div>
            {errors.email && <span className="auth-error-text">{errors.email}</span>}
          </div>

          <div className="auth-form-group">
            <label className="auth-label">Password</label>
            <div className="auth-input-wrapper">
              <Lock size={16} className="auth-input-icon" />
              <input 
                type="password"
                placeholder="At least 8 characters"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`auth-input ${errors.password ? 'error' : ''}`}
              />
            </div>
            {errors.password && <span className="auth-error-text">{errors.password}</span>}
          </div>

          {mode === 'signup' && (
            <div className="auth-form-group">
              <label className="auth-label">Confirm Password</label>
              <div className="auth-input-wrapper">
                <Lock size={16} className="auth-input-icon" />
                <input 
                  type="password"
                  placeholder="Repeat your password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className={`auth-input ${errors.confirmPassword ? 'error' : ''}`}
                />
              </div>
              {errors.confirmPassword && <span className="auth-error-text">{errors.confirmPassword}</span>}
            </div>
          )}
          {mode === 'signup' && (
            <div className="auth-form-group">
              <label className="auth-label">Stream / Field of Study</label>
              <div className="auth-input-wrapper">
                <select
                  value={stream}
                  onChange={(e) => setStream(e.target.value)}
                  className="auth-select"
                >
                  <option value="🎓 B.Tech / B.E.">🎓 B.Tech / B.E.</option>
                  <option value="💼 MBA">💼 MBA</option>
                  <option value="Learner">Learner</option>
                </select>
              </div>
            </div>
          )}

          {/* Remember Me / Forgot Password row */}
          {mode === 'signin' ? (
            <div className="auth-actions-row">
              <label className="auth-checkbox-label">
                <input 
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="auth-checkbox"
                />
                Remember Me
              </label>
              <a 
                href="#forgot" 
                onClick={(e) => {
                  e.preventDefault();
                  alert("Please contact administration or reset through demo credentials.");
                }}
                className="auth-forgot-link"
              >
                Forgot Password?
              </a>
            </div>
          ) : (
            <div className="auth-checkbox-group">
              <label className="auth-checkbox-label align-start">
                <input 
                  type="checkbox"
                  checked={acceptTerms}
                  onChange={(e) => setAcceptTerms(e.target.checked)}
                  className="auth-checkbox margin-top"
                />
                <span>I accept the Terms & Conditions and Privacy Policy</span>
              </label>
              {errors.acceptTerms && <span className="auth-error-text">{errors.acceptTerms}</span>}
            </div>
          )}

          {/* Submit button */}
          <motion.button
            whileHover={{ scale: isLoading ? 1 : 1.01 }}
            whileTap={{ scale: isLoading ? 1 : 0.99 }}
            onClick={mode === 'signin' ? handleSignIn : handleSignUp}
            disabled={isLoading}
            className="auth-submit-btn"
          >
            {isLoading ? (
              <>
                <Loader2 size={18} className="auth-spinner" />
                <span>Processing...</span>
              </>
            ) : (
              <span>{mode === 'signin' ? 'Sign In' : 'Create Account'}</span>
            )}
          </motion.button>
        </form>

        {/* Toggle Mode */}
        <div className="auth-switch-mode">
          {mode === 'signin' ? (
            <>
              Don't have an account?{' '}
              <a 
                href="#signup" 
                onClick={(e) => {
                  e.preventDefault();
                  switchMode('signup');
                }}
                className="auth-switch-link"
              >
                Sign Up
              </a>
            </>
          ) : (
            <>
              Already have an account?{' '}
              <a 
                href="#signin" 
                onClick={(e) => {
                  e.preventDefault();
                  switchMode('signin');
                }}
                className="auth-switch-link"
              >
                Sign In
              </a>
            </>
          )}
        </div>

        {/* Demo Hint */}
        {mode === 'signin' && (
          <div className="auth-demo-hint">
            <strong>Demo Login:</strong> satyam@scholr.com / password123
          </div>
        )}
      </motion.div>
    </div>
  );
}
