import { useEffect, useState } from 'react';
import {
  ArrowUpRight,
  Award,
  BriefcaseBusiness,
  CakeSlice,
  CheckCircle,
  ClipboardCheck,
  Flower2,
  GraduationCap,
  Heart,
  Headset,
  Mail,
  MapPin,
  Phone,
  Plane,
  Sparkles,
  X,
} from 'lucide-react';
import ProjectCard from './components/ProjectCard';
import SkillCard from './components/SkillCard';
import { supabase } from './lib/supabaseClient';

const experience = [
  {
    id: 1,
    period: 'May 2024 — Present',
    role: 'Investigation Associate II',
    company: 'Amazon',
    description:
      'Reviews claim eligibility and supports customers by resolving requests involving damaged, lost, and remorse-issue products.',
  },
  {
    id: 2,
    period: '2020 — Present',
    role: 'Fiber Artist / Owner',
    company: 'The Fiber Art Store',
    description:
      'Own and create handmade fiber-art pieces, combining creativity with customer service and independent business operations.',
  },
  {
    id: 3,
    period: '2022 — May 2024',
    role: 'AT&T Telco Billing Account Associate',
    company: 'VXI Global Solutions',
    description:
      'Assisted customers with billing concerns, account needs, and service-related requests in a fast-paced support environment.',
  },
];

const education = [
  {
    period: '2024 — Present',
    degree: 'Bachelor of Science in Information Technology',
    detail: 'Major in Service Management Program',
    school: 'Laguna State Polytechnic University — Siniloan Campus',
  },
  {
    period: '2020 — 2022',
    degree: 'Humanities and Social Sciences',
    detail: 'Senior High School',
    school: 'Famy National Integrated High School',
  },
];

const awards = [
  {
    title: 'Consistent with Honor',
    school: 'Famy National Integrated High School',
    year: '2016–2022',
  },
  {
    title: 'Conduct Awardee',
    school: 'Famy National Integrated High School',
    year: '2017',
  },
  {
    title: 'Top 7 Finisher',
    school: 'Famy Elementary School',
    year: '2016',
  },
  {
    title: 'Second Honor',
    school: 'Famy Elementary School',
    year: '2011',
  },
];

const achievements = [
  {
    title: 'Dean’s Lister',
    detail: 'First Year',
  },
  {
    title: 'Dean’s Lister',
    detail: 'Second Year',
  },
];

const certificates = [
  'Learn Routing and Switching Using Cisco Packet Tracer',
  'IoT Device Identity and Access Management (IAM)',
  'Introduction to Security Operations Center (SOC)',
  'Professional Communication — Certiport Passer',
];

const skills = [
  {
    title: 'Customer Support',
    description: 'Helping people with care, clarity, and a focus on practical resolutions.',
    icon: Headset,
  },
  {
    title: 'Claims Review',
    description: 'Reviewing claim details and eligibility with accuracy and attention.',
    icon: ClipboardCheck,
  },
  {
    title: 'Problem-solving',
    description: 'Working through customer concerns and finding thoughtful next steps.',
    icon: CheckCircle,
  },
  {
    title: 'Professional Communication',
    description: 'Communicating clearly and respectfully across customer interactions.',
    icon: Heart,
  },
  {
    title: 'Fiber Arts & Crochet',
    description: 'Creating handmade work with patience, creativity, and care.',
    icon: Flower2,
  },
  {
    title: 'Service Management',
    description: 'Building knowledge around service experiences and customer needs.',
    icon: BriefcaseBusiness,
  },
];

const fallbackProjects = [
  {
    id: 'fiber-art-store',
    title: 'The Fiber Art Store',
    category: 'Creative Business',
    description:
      'A part-time creative business where I make and share fiber-art pieces, combining craft with customer care.',
    tools: 'Fiber art • Crochet • Small business',
  },
  {
    id: 'customer-care',
    title: 'Customer Care & Claim Resolution',
    category: 'Professional Experience',
    description:
      'Supporting customers with billing questions and claims for damaged or lost products through careful review and clear communication.',
    tools: 'Customer support • Claims review • Communication',
  },
  {
    id: 'service-management',
    title: 'Service Management Studies',
    category: 'Academic Journey',
    description:
      'Developing an academic foundation in Information Technology with a major in the Service Management Program at LSPU.',
    tools: 'BSIT • Service Management Program',
  },
];

export default function App() {
  const [activeExperience, setActiveExperience] = useState(null);
  const [projects, setProjects] = useState([]);
  const [projectsLoading, setProjectsLoading] = useState(true);
  const [projectsError, setProjectsError] = useState('');
  const [contactForm, setContactForm] = useState({ name: '', email: '', message: '' });
  const [contactErrors, setContactErrors] = useState({});
  const [contactStatus, setContactStatus] = useState(null);
  const [contactSubmitting, setContactSubmitting] = useState(false);

  useEffect(() => {
    let isMounted = true;

    async function loadProjects() {
      try {
        const { data, error } = await supabase
          .from('portfolio_items')
          .select('*')
          .order('created_at', { ascending: false });

        if (!isMounted) return;

        if (error) {
          setProjectsError('Saved projects could not be loaded. Showing portfolio highlights instead.');
          setProjects(fallbackProjects);
        } else {
          setProjects(data?.length ? data : fallbackProjects);
        }
      } catch {
        if (isMounted) {
          setProjectsError('Saved projects could not be loaded. Showing portfolio highlights instead.');
          setProjects(fallbackProjects);
        }
      } finally {
        if (isMounted) setProjectsLoading(false);
      }
    }

    loadProjects();
    return () => {
      isMounted = false;
    };
  }, []);

  function handleContactChange(event) {
    const { name, value } = event.target;
    setContactForm((current) => ({ ...current, [name]: value }));
    setContactErrors((current) => ({ ...current, [name]: '' }));
    setContactStatus(null);
  }

  async function handleContactSubmit(event) {
    event.preventDefault();
    const name = contactForm.name.trim();
    const email = contactForm.email.trim();
    const message = contactForm.message.trim();
    const errors = {};

    if (name.length < 2 || name.length > 100) {
      errors.name = 'Please enter a name between 2 and 100 characters.';
    }
    if (email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errors.email = 'Please enter a valid email address.';
    }
    if (message.length < 10 || message.length > 2000) {
      errors.message = 'Your message must be between 10 and 2,000 characters.';
    }

    setContactErrors(errors);
    setContactStatus(null);
    if (Object.keys(errors).length > 0) return;

    setContactSubmitting(true);
    try {
      const { error } = await supabase.from('contact_messages').insert({
        name,
        email,
        message,
      });

      if (error) {
        setContactStatus({
          type: 'error',
          message: `Your message could not be sent. ${error.message}`,
        });
        return;
      }

      setContactForm({ name: '', email: '', message: '' });
      setContactErrors({});
      setContactStatus({
        type: 'success',
        message: 'Thank you! Your message has been sent successfully.',
      });
    } catch (error) {
      setContactStatus({
        type: 'error',
        message: error instanceof Error
          ? `Your message could not be sent. ${error.message}`
          : 'Your message could not be sent. Please try again.',
      });
    } finally {
      setContactSubmitting(false);
    }
  }

  return (
    <div className="site-shell">
      <header className="topbar">
        <a className="brand" href="#top" aria-label="Princess Acorda profile">
          <span className="brand-mark">PA</span>
          <span>PRINCESS ACORDA</span>
        </a>
        <nav className="nav-links" aria-label="Primary navigation">
          <a href="#skills">Skills</a>
          <a href="#experience">Experience</a>
          <a href="#projects">Projects</a>
          <a href="#education">Education</a>
          <a href="#about">About</a>
          <a className="nav-contact" href="#contact">
            Contact me <ArrowUpRight size={15} />
          </a>
        </nav>
      </header>

      <main id="top">
        <section className="hero-section">
          <div className="hero-copy">
            <div className="eyebrow"><Sparkles size={15} /> Profile / Philippines</div>
            <h1>Service-minded, <em>creatively driven.</em></h1>
            <p className="hero-description">
              I&apos;m <strong>Princess Acorda</strong>, an investigation and customer
              support professional with a creative spirit. I bring careful
              problem-solving, empathy, and a detail-focused approach to every role.
            </p>
            <div className="hero-actions">
              <a className="primary-button" href="#experience">
                Explore my journey <ArrowUpRight size={17} />
              </a>
              <a className="text-button" href="mailto:princessacorda143@gmail.com">
                Send me an email
              </a>
            </div>
          </div>

          <div className="hero-portrait" aria-label="Princess Acorda profile card">
            <div className="portrait-orbit orbit-one" />
            <div className="portrait-orbit orbit-two" />
            <div className="portrait-card">
              <span className="portrait-sparkle">✦</span>
              <img
                className="portrait-photo"
                src="https://swjognmokbtcrhvbjvzf.supabase.co/storage/v1/object/public/acorda/profile.jpg"
                alt="Princess Acorda"
              />
              <div className="portrait-label">
                <span>Famy, Laguna</span>
                <strong>Princess Acorda</strong>
              </div>
            </div>
            <div className="availability-card"><span className="status-dot" /> Open to opportunities</div>
          </div>
        </section>

        <section className="quick-facts" id="about" aria-label="Profile summary">
          <article><BriefcaseBusiness size={22} /><div><span>Current role</span><strong>Investigation Associate II</strong></div></article>
          <article><GraduationCap size={22} /><div><span>Studying</span><strong>BSIT · Service Management Program</strong></div></article>
          <article><MapPin size={22} /><div><span>Based in</span><strong>Famy, Laguna</strong></div></article>
        </section>

        <section className="skills-section" id="skills">
          <div className="section-heading">
            <div><span className="section-kicker">What I bring</span><h2>Skills &amp; strengths</h2></div>
            <p>A blend of service, communication, problem-solving, and creative skills built through work, study, and personal interests.</p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {skills.map((skill) => <SkillCard key={skill.title} {...skill} />)}
          </div>
        </section>

        <section className="experience-section" id="experience">
          <div className="section-heading">
            <div><span className="section-kicker">Career timeline</span><h2>Experience</h2></div>
            <p>Customer-focused roles, independent creativity, and a growing foundation in service management.</p>
          </div>

          <div className="timeline">
            {experience.map((item) => (
              <button
                className="timeline-item"
                key={item.id}
                onClick={() => setActiveExperience(item)}
              >
                <span className="timeline-period">{item.period}</span>
                <div className="timeline-content">
                  <div><h3>{item.role}</h3><ArrowUpRight size={18} /></div>
                  <strong>{item.company}</strong>
                  <p>{item.description}</p>
                </div>
              </button>
            ))}
          </div>
        </section>

        <section className="education-section" id="education">
          <div className="section-heading">
            <div><span className="section-kicker">Academic journey</span><h2>Education</h2></div>
          </div>
          <div className="education-grid">
            {education.map((item) => (
              <article className="education-card" key={item.degree}>
                <span>{item.period}</span>
                <GraduationCap size={24} />
                <h3>{item.degree}</h3>
                <strong>{item.detail}</strong>
                <p>{item.school}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="interests-section" aria-label="Interests">
          <div className="interests-heading">
            <span className="section-kicker">Life beyond work</span>
            <h2>My side quests</h2>
          </div>
          <div className="interest-grid">
            <article><Plane size={23} /><div><strong>Traveling</strong><span>Exploring places and stories</span></div></article>
            <article><CakeSlice size={23} /><div><strong>Baking</strong><span>Making everyday moments sweeter</span></div></article>
            <article><Flower2 size={23} /><div><strong>Crochet</strong><span>Handmade details, patience, and craft</span></div></article>
          </div>
        </section>

        <section className="projects-section" id="projects">
          <div className="section-heading">
            <div><span className="section-kicker">Selected work</span><h2>Projects &amp; highlights</h2></div>
            <p>Creative work, professional experience, and learning highlights from my journey.</p>
          </div>
          {projectsError && <p className="mb-4 rounded-xl border border-[#eadfe6] bg-white/80 px-4 py-3 text-sm text-[#8c5574]" role="status">{projectsError}</p>}
          {projectsLoading ? (
            <div className="loading-card">Loading portfolio highlights…</div>
          ) : (
            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {projects.map((project) => <ProjectCard key={project.id} project={project} />)}
            </div>
          )}
        </section>

        <section className="recognition-section" id="recognition">
          <div className="recognition-heading">
            <div className="recognition-icon"><Award size={26} /></div>
            <div><span className="section-kicker">Recognition</span><h2>Awards &amp; achievements</h2></div>
          </div>

          <div className="achievement-block achievement-awards">
            <h3>Academic awards</h3>
            <div className="award-grid">
              {awards.map((award) => (
                <article className="award-card" key={`${award.title}-${award.year}`}>
                  <span>{award.year}</span>
                  <strong>{award.title}</strong>
                  <p>{award.school}</p>
                </article>
              ))}
            </div>
          </div>

          <div className="achievement-block achievement-deans">
            <h3>College distinction</h3>
            <div className="deans-grid">
              {achievements.map((achievement) => (
                <article className="deans-card" key={achievement.detail}>
                  <Award size={20} />
                  <div><strong>{achievement.title}</strong><span>{achievement.detail} · Laguna State Polytechnic University — Siniloan Campus</span></div>
                </article>
              ))}
            </div>
          </div>

          <div className="achievement-block certificate-block">
            <h3>Certificates &amp; professional learning</h3>
            <div className="certificate-list">
              {certificates.map((certificate) => (
                <article key={certificate}>
                  <Sparkles size={16} />
                  <span>{certificate}</span>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="contact-section" id="contact">
          <div className="contact-copy">
            <span className="section-kicker">Let&apos;s connect</span>
            <h2>Open to meaningful<br /><em>opportunities.</em></h2>
            <p>Have a question or want to get in touch? Send me a message and I&apos;ll be happy to hear from you.</p>
          </div>
          <div className="contact-content">
            <form className="contact-form" onSubmit={handleContactSubmit} noValidate>
              <label className="contact-field" htmlFor="contact-name">
                Your name
                <input
                  id="contact-name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  maxLength={100}
                  value={contactForm.name}
                  onChange={handleContactChange}
                  aria-invalid={Boolean(contactErrors.name)}
                  aria-describedby={contactErrors.name ? 'contact-name-error' : undefined}
                  required
                />
                {contactErrors.name && <span className="contact-field-error" id="contact-name-error">{contactErrors.name}</span>}
              </label>

              <label className="contact-field" htmlFor="contact-email">
                Email address
                <input
                  id="contact-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  maxLength={254}
                  value={contactForm.email}
                  onChange={handleContactChange}
                  aria-invalid={Boolean(contactErrors.email)}
                  aria-describedby={contactErrors.email ? 'contact-email-error' : undefined}
                  required
                />
                {contactErrors.email && <span className="contact-field-error" id="contact-email-error">{contactErrors.email}</span>}
              </label>

              <label className="contact-field" htmlFor="contact-message">
                Message
                <textarea
                  id="contact-message"
                  name="message"
                  rows={4}
                  maxLength={2000}
                  value={contactForm.message}
                  onChange={handleContactChange}
                  aria-invalid={Boolean(contactErrors.message)}
                  aria-describedby={contactErrors.message ? 'contact-message-error' : undefined}
                  required
                />
                {contactErrors.message && <span className="contact-field-error" id="contact-message-error">{contactErrors.message}</span>}
              </label>

              <button className="primary-button contact-submit" type="submit" disabled={contactSubmitting}>
                {contactSubmitting ? 'Sending…' : 'Send message'}
                {!contactSubmitting && <ArrowUpRight size={16} />}
              </button>
              {contactStatus && (
                <p className={`contact-feedback ${contactStatus.type}`} role="status" aria-live="polite">
                  {contactStatus.message}
                </p>
              )}
            </form>

            <div className="contact-options">
              <a href="mailto:princessacorda143@gmail.com">
                <span className="contact-icon"><Mail size={20} /></span>
                <span><small>Email</small><strong>princessacorda143@gmail.com</strong></span>
                <ArrowUpRight size={18} />
              </a>
              <a href="tel:+639562847313">
                <span className="contact-icon"><Phone size={20} /></span>
                <span><small>Phone</small><strong>09562847313</strong></span>
                <ArrowUpRight size={18} />
              </a>
            </div>
          </div>
        </section>

      </main>

      <footer>
        <div><strong>Princess Acorda</strong><span>Famy, Laguna</span></div>
        <a href="#top">Back to top <ArrowUpRight size={14} /></a>
      </footer>

      {activeExperience && (
        <div className="modal-backdrop" onClick={() => setActiveExperience(null)}>
          <div className="project-modal" onClick={(event) => event.stopPropagation()}>
            <button className="modal-close" onClick={() => setActiveExperience(null)} aria-label="Close details"><X size={20} /></button>
            <div className="modal-content">
              <span>{activeExperience.period}</span>
              <h3>{activeExperience.role}</h3>
              <strong className="modal-company">{activeExperience.company}</strong>
              <p>{activeExperience.description}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
