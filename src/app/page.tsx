"use client";

import { useEffect, useMemo, useRef } from "react";
import gsap from "gsap";

const contactFormAction = "https://formspree.io/f/your-id";

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);

  const data = useMemo(
    () => ({
      name: "Sohith Patha",
      title: "Software Engineering Explore Intern",
      location: "Hyderabad, India",
      summary:
        "Software Engineering Explore Intern with a strong foundation in Python and computer science. Experienced in building impactful solutions, including a project that reduced study time by 70% through educational video summarization. Eager to tackle real-world software challenges and collaborate on scalable, reliable systems.",
      stats: [
        { label: "Projects shipped", value: "2+" },
        { label: "Hackathon wins", value: "1" },
        { label: "CGPA", value: "9.52" },
      ],
      skills: {
        languages: ["Python", "C++", "Java", "C", "JavaScript", "SQL"],
        frontend: ["React", "HTML", "CSS", "Tailwind CSS"],
        backend: ["Node.js", "Express", "MongoDB"],
        tools: ["Git", "GitHub", "Docker", "Google Colab"],
        soft: [
          "Problem Solving",
          "Time Management",
          "Critical Thinking",
        ],
      },
      experience: [
        {
          company: "Pyrosynergy",
          role: "Software Engineer Intern",
          type: "Internship",
          period: "Apr 2026 - Present",
          location: "Remote · Hyderabad",
          highlights: [
            "Revamped the company website with end-to-end frontend and backend development.",
            "Built a responsive UI in React and Tailwind CSS to improve user experience.",
            "Developed scalable services in Node.js and Express with MongoDB data operations.",
            "Deployed and hosted the application, improving reliability and performance.",
            "Increased website traffic by 30%, boosting overall engagement.",
          ],
          tech: ["React", "Node.js", "Express", "MongoDB", "Tailwind CSS"],
        },
      ],
      projects: [
        {
          name: "Educational Video Summarization & Q&A Generator",
          role: "Developer",
          period: "May 2024 - Present",
          impact:
            "Converted long educational videos into concise notes and structured Q&A, reducing study time by 70%.",
          highlights: [
            "Built a processing pipeline to extract key concepts for faster revision.",
            "Recognized as the winning solution at an inter-diploma college hackathon.",
          ],
          tech: ["Python", "Langchain", "Tailwind CSS"],
        },
        {
          name: "Public Safety Monitoring System",
          role: "Developer",
          period: "May 2025",
          impact:
            "Created a YOLO-based system to detect fire and smoke from CCTV streams for rapid emergency response.",
          highlights: [
            "Trained object detection models on Kaggle datasets in Google Colab.",
            "Designed an alert workflow to route fire, medical, and police responses.",
          ],
          tech: ["Python", "YOLO", "OpenCV", "Google Colab"],
        },
      ],
      education: [
        {
          school: "VNR Vignana Jyothi",
          degree: "Bachelor of Science in Information Technology",
          period: "May 2025 - Present",
        },
        {
          school: "GPT Nizamabad",
          degree: "Diploma in Computer Science",
          period: "2022 - May 2025",
          note: "CGPA 9.52",
        },
      ],
      certifications: [
        {
          title: "Winner — Srujana Tech Fest Hackathon",
          org: "Inter-Diploma College Hackathon",
          date: "May 2024",
        },
        {
          title: "Participant — TechnoVista 24-Hour Hackathon",
          org: "VNR Vignana Jyothi",
          date: "May 2025",
        },
      ],
      coursework: [
        "Data Structures",
        "Software Methodology",
        "Algorithm Analysis",
        "Database Management",
        "Computer Architecture",
        "Computer Science",
      ],
      socials: [
        {
          label: "LinkedIn",
          href: "https://www.linkedin.com/in/sohith-patha",
        },
      ],
    }),
    []
  );

  useEffect(() => {
    if (!containerRef.current) return;
    if (!cursorRef.current) return;
    if (typeof window === "undefined") return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) return;

    const canHover = window.matchMedia("(hover: hover)").matches;
    if (!canHover) return;

    const ctx = gsap.context(() => {
      const cursor = cursorRef.current;
      if (!cursor) return;

      const setX = gsap.quickSetter(cursor, "x", "px");
      const setY = gsap.quickSetter(cursor, "y", "px");
      const floatTargets = gsap.utils.toArray<HTMLElement>("[data-float]");

      const handleMove = (event: MouseEvent) => {
        setX(event.clientX);
        setY(event.clientY);

        const x = ((event.clientX / window.innerWidth) * 100).toFixed(2);
        const y = ((event.clientY / window.innerHeight) * 100).toFixed(2);
        document.body.style.setProperty("--bg-x", `${x}%`);
        document.body.style.setProperty("--bg-y", `${y}%`);
      };

      const hoverHandlers: Array<{
        el: HTMLElement;
        enter: () => void;
        leave: () => void;
      }> = [];

      floatTargets.forEach((el) => {
        gsap.set(el, { transformOrigin: "center", willChange: "transform" });

        const handleEnter = () => {
          gsap.killTweensOf(el);
          gsap.to(el, {
            scale: 1.03,
            duration: 0.35,
            ease: "power3.out",
          });
        };

        const handleLeave = () => {
          gsap.killTweensOf(el);
          gsap.to(el, {
            scale: 1,
            duration: 0.35,
            ease: "power3.out",
          });
        };

        el.addEventListener("pointerenter", handleEnter);
        el.addEventListener("pointerleave", handleLeave);
        hoverHandlers.push({ el, enter: handleEnter, leave: handleLeave });
      });

      window.addEventListener("mousemove", handleMove, { passive: true });

      gsap.to(cursor, {
        opacity: 1,
        duration: 0.4,
        ease: "power2.out",
      });

      // Loading animations removed by request.

      return () => {
        window.removeEventListener("mousemove", handleMove);
        document.body.style.removeProperty("--bg-x");
        document.body.style.removeProperty("--bg-y");
        hoverHandlers.forEach(({ el, enter, leave }) => {
          el.removeEventListener("pointerenter", enter);
          el.removeEventListener("pointerleave", leave);
          gsap.killTweensOf(el);
          gsap.set(el, { scale: 1, clearProps: "willChange" });
        });
      };
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="bg-grid">
      <div ref={cursorRef} className="cursor-dot" aria-hidden="true" />
      <header className="sticky top-0 z-30 border-b border-[var(--mist)] bg-[var(--canvas)]/90 backdrop-blur">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-5">
          <div className="flex items-center gap-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--accent)] text-xs font-semibold text-[var(--canvas)]">
              SP
            </div>
            <div>
              <p className="text-sm font-semibold text-[var(--ink)]">
                {data.name}
              </p>
              <p className="text-xs text-[var(--steel-soft)]">{data.title}</p>
            </div>
          </div>
          <nav className="hidden items-center gap-6 text-xs font-semibold uppercase tracking-[0.25em] text-[var(--steel)] md:flex">
            {[
              "About",
              "Skills",
              "Experience",
              "Projects",
              "Education",
              "Certifications",
              "Contact",
            ].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="transition-colors hover:text-[var(--accent)]"
              >
                {item}
              </a>
            ))}
          </nav>
          <a
            href="/resume.pdf"
            className="hidden rounded-full border border-[var(--ring)] px-4 py-2 text-xs font-semibold text-[var(--ink)] transition hover:border-[var(--accent)] hover:text-[var(--accent)] md:inline-flex"
            download
          >
            Resume
          </a>
        </div>
      </header>

      <main className="mx-auto w-full max-w-6xl px-6 pb-24 pt-20">
        <section id="hero" className="grid gap-10 md:grid-cols-[1.25fr_0.75fr]">
          <div className="space-y-6">
            <p
              data-hero
              className="text-xs font-semibold uppercase tracking-[0.4em] text-[var(--steel)]"
            >
              Don&apos;t be boring.
            </p>
            <h1
              data-hero
              className="display-font text-5xl font-semibold leading-tight text-[var(--ink)] md:text-6xl"
            >
              {data.name}
            </h1>
            <p data-hero className="text-lg text-[var(--steel)]">
              {data.title} · {data.location}
            </p>
            <p data-hero className="text-base text-[var(--ink-soft)]">
              {data.summary}
            </p>
            <div data-hero className="flex flex-wrap gap-3">
              <a
                href="/resume.pdf"
                className="rounded-full bg-[var(--accent)] px-5 py-3 text-sm font-semibold text-[var(--canvas)] transition hover:brightness-110"
                download
              >
                Download Resume
              </a>
              <a
                href="#contact"
                className="rounded-full border border-[var(--ring)] px-5 py-3 text-sm font-semibold text-[var(--ink)] transition hover:border-[var(--accent)] hover:text-[var(--accent)]"
              >
                Contact Me
              </a>
            </div>
            <div data-hero className="flex flex-wrap gap-6 text-xs text-[var(--steel-soft)]">
              <span>Open to internship + full-time roles</span>
              <span>Remote · Hyderabad</span>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -right-16 top-6 h-64 w-64 rounded-full bg-[var(--accent-soft)] opacity-70 blur-3xl" />
            <div
              data-float
              className="relative z-10 rounded-3xl border border-[var(--mist)] bg-[var(--paper)] p-8 shadow-xl"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[var(--steel)]">
                Snapshot
              </p>
              <div className="mt-6 grid gap-4">
                {data.stats.map((stat) => (
                  <div
                    key={stat.label}
                    className="flex items-center justify-between rounded-2xl border border-[var(--ring)] bg-[var(--paper)] px-4 py-3"
                  >
                    <span className="text-xs uppercase tracking-[0.2em] text-[var(--steel-soft)]">
                      {stat.label}
                    </span>
                    <span className="text-lg font-semibold text-[var(--ink)]">
                      {stat.value}
                    </span>
                  </div>
                ))}
              </div>
              <div className="mt-6 text-xs text-[var(--steel-soft)]">
                <p>Profile photo coming soon.</p>
              </div>
            </div>
          </div>
        </section>

        <section id="about" data-section className="mt-20">
          <div data-reveal className="grid gap-10 md:grid-cols-[1.1fr_0.9fr]">
            <div
              data-float
              className="rounded-3xl border border-[var(--mist)] bg-[var(--paper)] p-10 shadow-lg"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[var(--steel)]">
                Who am I
              </p>
              <h2 className="display-font mt-4 text-4xl text-[var(--ink)]">
                Clear, fast, and outcome-focused engineering.
              </h2>
              <p className="mt-6 text-base text-[var(--ink-soft)]">
                {data.summary}
              </p>
            </div>
            <div
              data-float
              className="rounded-3xl border border-[var(--mist)] bg-[var(--paper)] p-10 shadow-lg"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[var(--steel)]">
                Focus areas
              </p>
              <div className="mt-6 space-y-4 text-sm text-[var(--ink-soft)]">
                <p>Convert better</p>
                <p>Launch sooner</p>
                <p>Build reliable systems</p>
              </div>
            </div>
          </div>
        </section>

        <section id="skills" data-section className="mt-20">
          <div data-reveal className="flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[var(--steel)]">
                Skills
              </p>
              <h2 className="display-font mt-4 text-4xl text-[var(--ink)]">
                Technical toolkit
              </h2>
            </div>
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {Object.entries(data.skills).map(([key, list], index) => (
              <article
                key={key}
                data-reveal
                data-float
                className="rounded-3xl border border-[var(--mist)] bg-[var(--paper)] p-8 shadow-lg"
              >
                <div className="flex items-center justify-between">
                  <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[var(--steel)]">
                    {String(index + 1).padStart(2, "0")}
                  </p>
                  <p className="text-sm font-semibold capitalize text-[var(--ink)]">
                    {key}
                  </p>
                </div>
                <div className="mt-6 flex flex-wrap gap-2">
                  {list.map((item) => (
                    <span
                      key={item}
                      className="rounded-full border border-[var(--ring)] bg-[var(--paper)] px-3 py-1 text-xs text-[var(--steel)]"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="experience" data-section className="mt-20">
          <div data-reveal>
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[var(--steel)]">
              Experience
            </p>
            <h2 className="display-font mt-4 text-4xl text-[var(--ink)]">
              Work that creates value
            </h2>
          </div>
          <div className="mt-10 grid gap-6">
            {data.experience.map((role, index) => (
              <article
                key={role.company}
                data-reveal
                data-float
                className="rounded-3xl border border-[var(--mist)] bg-[var(--paper)] p-10 shadow-lg"
              >
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[var(--steel)]">
                      {String(index + 1).padStart(2, "0")}
                    </p>
                    <h3 className="mt-3 text-2xl font-semibold text-[var(--ink)]">
                      {role.role}
                    </h3>
                    <p className="text-sm text-[var(--steel)]">
                      {role.company} · {role.type}
                    </p>
                    <p className="text-xs text-[var(--steel-soft)]">
                      {role.period} · {role.location}
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {role.tech.map((item) => (
                      <span
                        key={item}
                        className="rounded-full border border-[var(--ring)] bg-[var(--paper)] px-3 py-1 text-xs text-[var(--steel)]"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
                <ul className="mt-6 grid gap-3 text-sm text-[var(--ink-soft)]">
                  {role.highlights.map((point) => (
                    <li key={point} className="flex gap-2">
                      <span className="mt-1 h-1.5 w-1.5 rounded-full bg-[var(--accent)]" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>

        <section id="projects" data-section className="mt-20">
          <div data-reveal>
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[var(--steel)]">
              Projects
            </p>
            <h2 className="display-font mt-4 text-4xl text-[var(--ink)]">
              Selected work
            </h2>
          </div>
          <div className="mt-10 grid gap-6 lg:grid-cols-2">
            {data.projects.map((project, index) => (
              <article
                key={project.name}
                data-reveal
                data-float
                className="flex h-full flex-col rounded-3xl border border-[var(--mist)] bg-[var(--paper)] p-10 shadow-lg"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[var(--steel)]">
                      {String(index + 1).padStart(2, "0")}
                    </p>
                    <h3 className="mt-3 text-2xl font-semibold text-[var(--ink)]">
                      {project.name}
                    </h3>
                    <p className="text-sm text-[var(--steel)]">
                      {project.role}
                    </p>
                    <p className="text-xs text-[var(--steel-soft)]">
                      {project.period}
                    </p>
                  </div>
                </div>
                <p className="mt-4 text-sm text-[var(--ink-soft)]">
                  {project.impact}
                </p>
                <ul className="mt-4 grid gap-2 text-sm text-[var(--ink-soft)]">
                  {project.highlights.map((point) => (
                    <li key={point} className="flex gap-2">
                      <span className="mt-1 h-1.5 w-1.5 rounded-full bg-[var(--accent)]" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-6 flex flex-wrap gap-2">
                  {project.tech.map((item) => (
                    <span
                      key={item}
                      className="rounded-full border border-[var(--ring)] bg-[var(--paper)] px-3 py-1 text-xs text-[var(--steel)]"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="education" data-section className="mt-20">
          <div data-reveal>
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[var(--steel)]">
              Education
            </p>
            <h2 className="display-font mt-4 text-4xl text-[var(--ink)]">
              Academic path
            </h2>
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {data.education.map((entry, index) => (
              <article
                key={entry.school}
                data-reveal
                data-float
                className="rounded-3xl border border-[var(--mist)] bg-[var(--paper)] p-8 shadow-lg"
              >
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[var(--steel)]">
                  {String(index + 1).padStart(2, "0")}
                </p>
                <p className="mt-3 text-lg font-semibold text-[var(--ink)]">
                  {entry.school}
                </p>
                <p className="text-sm text-[var(--steel)]">{entry.degree}</p>
                <p className="text-xs text-[var(--steel-soft)]">
                  {entry.period}
                </p>
                {entry.note ? (
                  <p className="mt-3 text-xs font-semibold text-[var(--accent)]">
                    {entry.note}
                  </p>
                ) : null}
              </article>
            ))}
          </div>
        </section>

        <section id="certifications" data-section className="mt-20">
          <div data-reveal>
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[var(--steel)]">
              Recognition
            </p>
            <h2 className="display-font mt-4 text-4xl text-[var(--ink)]">
              Awards & certifications
            </h2>
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {data.certifications.map((item, index) => (
              <article
                key={item.title}
                data-reveal
                data-float
                className="rounded-3xl border border-[var(--mist)] bg-[var(--paper)] p-8 shadow-lg"
              >
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[var(--steel)]">
                  {String(index + 1).padStart(2, "0")}
                </p>
                <p className="mt-3 text-lg font-semibold text-[var(--ink)]">
                  {item.title}
                </p>
                <p className="text-sm text-[var(--steel)]">{item.org}</p>
                <p className="text-xs text-[var(--steel-soft)]">{item.date}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="contact" data-section className="mt-20">
          <div
            data-reveal
            data-float
            className="rounded-3xl border border-[var(--mist)] bg-[var(--paper)] p-10 shadow-lg"
          >
            <div className="grid gap-10 md:grid-cols-[1.1fr_0.9fr]">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[var(--steel)]">
                  Contact
                </p>
                <h2 className="display-font mt-4 text-4xl text-[var(--ink)]">
                  Let&apos;s make it obvious.
                </h2>
                <p className="mt-4 text-sm text-[var(--ink-soft)]">
                  Use the form to reach me directly. Messages are routed to
                  {" "}
                  <span className="font-semibold text-[var(--steel)]">
                    sohithpatha8074@gmail.com
                  </span>
                  .
                </p>
                <div className="mt-6 flex flex-wrap gap-3">
                  {data.socials.map((social) => (
                    <a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-full border border-[var(--ring)] bg-[var(--paper)] px-4 py-2 text-xs font-semibold text-[var(--steel)] transition hover:border-[var(--accent)] hover:text-[var(--accent)]"
                    >
                      {social.label}
                    </a>
                  ))}
                </div>
              </div>
              <form
                data-reveal
                className="grid gap-4 rounded-2xl border border-[var(--ring)] bg-[var(--paper)] p-6"
                action={contactFormAction}
                method="POST"
              >
                <div>
                  <label className="text-xs font-semibold text-[var(--steel)]">
                    Full name
                  </label>
                  <input
                    name="name"
                    required
                    className="mt-2 w-full rounded-xl border border-[var(--ring)] bg-[var(--paper)] px-4 py-3 text-sm text-[var(--ink)] outline-none focus:border-[var(--accent)]"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-[var(--steel)]">
                    Email address
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    className="mt-2 w-full rounded-xl border border-[var(--ring)] bg-[var(--paper)] px-4 py-3 text-sm text-[var(--ink)] outline-none focus:border-[var(--accent)]"
                    placeholder="you@email.com"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-[var(--steel)]">
                    Message
                  </label>
                  <textarea
                    name="message"
                    required
                    rows={4}
                    className="mt-2 w-full rounded-xl border border-[var(--ring)] bg-[var(--paper)] px-4 py-3 text-sm text-[var(--ink)] outline-none focus:border-[var(--accent)]"
                    placeholder="Tell me about your project or role."
                  />
                </div>
                <button
                  type="submit"
                  className="rounded-full bg-[var(--accent)] px-5 py-3 text-sm font-semibold text-[var(--canvas)] transition hover:brightness-110"
                >
                  Send Message
                </button>
                <p className="text-xs text-[var(--steel-soft)]">
                  Replace the Formspree ID in the code to activate submissions.
                </p>
              </form>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
