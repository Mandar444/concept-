import { useEffect } from 'react';
import Lenis from 'lenis';
import HeroSection from './HeroSection';

function App() {
    useEffect(() => {
        // 0. Smooth Scrolling with Lenis
        const lenis = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            orientation: 'vertical',
            gestureOrientation: 'vertical',
            smoothWheel: true,
            wheelMultiplier: 1,
            touchMultiplier: 2,
        });

        function raf(time: number) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }

        requestAnimationFrame(raf);

        // 1. Custom Cursor
        const cursorDot = document.querySelector('.cursor-dot') as HTMLElement;
        const cursorOutline = document.querySelector('.cursor-outline') as HTMLElement;

        // Only apply custom cursor on non-touch devices
        if (window.matchMedia("(pointer: fine)").matches) {
            window.addEventListener('mousemove', (e) => {
                const posX = e.clientX;
                const posY = e.clientY;

                if (cursorDot) {
                    cursorDot.style.left = `${posX}px`;
                    cursorDot.style.top = `${posY}px`;
                }

                if (cursorOutline) {
                    cursorOutline.animate({
                        left: `${posX}px`,
                        top: `${posY}px`
                    }, { duration: 150, fill: "forwards" });
                }
            });

            // Add hover effect for links and buttons
            const interactables = document.querySelectorAll('a, button, .card');
            interactables.forEach(el => {
                el.addEventListener('mouseenter', () => {
                    if (cursorOutline) {
                        cursorOutline.style.width = '60px';
                        cursorOutline.style.height = '60px';
                        cursorOutline.style.backgroundColor = 'rgba(179, 38, 30, 0.1)';
                    }
                });
                el.addEventListener('mouseleave', () => {
                    if (cursorOutline) {
                        cursorOutline.style.width = '40px';
                        cursorOutline.style.height = '40px';
                        cursorOutline.style.backgroundColor = 'transparent';
                    }
                });
            });
        }

        // 2. Mobile Menu Toggle
        const hamburger = document.querySelector('.hamburger');
        const mobileMenu = document.querySelector('.mobile-menu');
        const mobileLinks = document.querySelectorAll('.mobile-nav-links a, .mobile-menu .btn');

        if (hamburger && mobileMenu) {
            hamburger.addEventListener('click', () => {
                hamburger.classList.toggle('active');
                mobileMenu.classList.toggle('active');
                document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
            });

            mobileLinks.forEach(link => {
                link.addEventListener('click', () => {
                    hamburger.classList.remove('active');
                    mobileMenu.classList.remove('active');
                    document.body.style.overflow = '';
                });
            });
        }

        // 3. Scroll Animations (Intersection Observer)
        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.15
        };

        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        document.querySelectorAll('.animate-on-scroll').forEach(el => {
            observer.observe(el);
        });

        // 4. Navbar Background on Scroll
        const navbar = document.getElementById('navbar');
        if (navbar) {
            window.addEventListener('scroll', () => {
                if (window.scrollY > 50) {
                    navbar.style.background = 'rgba(10, 10, 8, 0.95)';
                    navbar.style.borderBottom = '1px solid var(--border-color)';
                } else {
                    navbar.style.background = 'rgba(10, 10, 8, 0.4)';
                    navbar.style.borderBottom = '1px solid rgba(255,255,255,0.03)';
                }
            });
        }

        // 5. High School Waitlist Form Handling ./;
        const hsForm = document.getElementById('hsWaitlist');
        const formMessage = document.querySelector('.form-message') as HTMLElement;

        if (hsForm) {
            hsForm.addEventListener('submit', (e) => {
                e.preventDefault();
                const emailInput = hsForm.querySelector('input[type="email"]') as HTMLInputElement;
                if (emailInput && emailInput.value) {
                    // Mock API call
                    const btn = hsForm.querySelector('button');
                    if (btn) {
                        btn.textContent = 'Joining...';
                        btn.disabled = true;
                    }

                    setTimeout(() => {
                        hsForm.style.display = 'none';
                        if (formMessage) formMessage.style.display = 'block';
                    }, 1000);
                }
            });
        }
    }, []);

    return (
        <>
            {/* Custom Cursor */}
            <div className="cursor-dot"></div>
            <div className="cursor-outline"></div>

            {/* Navigation */}
            <nav id="navbar">
                <div className="nav-container">
                    <div className="logo">
                        <span className="logo-concpt">CONCPT</span>
                        <span className="logo-devhub">by DevHub</span>
                    </div>
                    <ul className="nav-links">
                        <li><a href="#about">About</a></li>
                        <li><a href="#process">Process</a></li>
                        <li><a href="#programs">Programs</a></li>
                        <li><a href="#mentors">Mentors</a></li>
                    </ul>
                    <div className="nav-cta">
                        <a href="#apply" className="btn btn-primary">Apply Now</a>
                    </div>
                    <button className="hamburger" aria-label="Menu">
                        <span></span>
                        <span></span>
                    </button>
                </div>
            </nav>

            {/* Mobile Menu Overlay */}
            <div className="mobile-menu">
                <ul className="mobile-nav-links">
                    <li><a href="#about">About</a></li>
                    <li><a href="#process">Process</a></li>
                    <li><a href="#programs">Programs</a></li>
                    <li><a href="#mentors">Mentors</a></li>
                </ul>
                <a href="#apply" className="btn btn-primary">Apply Now</a>
            </div>

            <main>
                {/* Use the new React Hero Section instead of the static HTML one */}
                <HeroSection />

                {/* The Problem Section */}
                <section id="about" className="problem-section">
                    <div className="container animate-on-scroll">
                        <div className="section-header">
                            <div className="section-tag">
                                <span className="tag-line"></span>
                                <span className="tag-text">THE PROBLEM</span>
                            </div>
                            <h2>Why research is inaccessible.</h2>
                            <p className="section-subtitle">Most undergraduate students—even the ambitious ones—have never done real research. Access is gatekept.</p>
                        </div>
                        <div className="grid grid-3 problem-cards">
                            <div className="card problem-card">
                                <div className="card-icon">01</div>
                                <h3>No Infrastructure</h3>
                                <p>Labs and resources are restricted to postgrads or professors. Undergrads are left out of the loop.</p>
                            </div>
                            <div className="card problem-card">
                                <div className="card-icon">02</div>
                                <h3>No Mentors</h3>
                                <p>Finding a researcher willing to guide an undergrad from idea to publication is nearly impossible.</p>
                            </div>
                            <div className="card problem-card">
                                <div className="card-icon">03</div>
                                <h3>Geography & Cost</h3>
                                <p>Top research opportunities are centralized in a few tier-1 institutions or locked behind expensive programs.</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* How It Works Section */}
                <section id="process" className="process-section">
                    <div className="container animate-on-scroll">
                        <div className="section-header">
                            <div className="section-tag">
                                <span className="tag-line"></span>
                                <span className="tag-text">HOW IT WORKS</span>
                            </div>
                            <h2>The Path to Publication</h2>
                        </div>
                        <div className="process-timeline">
                            <div className="timeline-item">
                                <div className="timeline-marker"></div>
                                <div className="timeline-content">
                                    <h3>Apply & Get Selected</h3>
                                    <p>Submit your application. We evaluate based on curiosity, analytical skills, and commitment. 18 candidates are chosen.</p>
                                </div>
                            </div>
                            <div className="timeline-item">
                                <div className="timeline-marker"></div>
                                <div className="timeline-content">
                                    <h3>Join Research Team</h3>
                                    <p>Get matched with a dedicated mentor and a team of 3. Receive your research domain and kickoff your literature review.</p>
                                </div>
                            </div>
                            <div className="timeline-item">
                                <div className="timeline-marker"></div>
                                <div className="timeline-content">
                                    <h3>Research to Publication</h3>
                                    <p>Execute the research, write the paper, and submit it to top-tier academic journals with full guidance.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Cohort 1 Details */}
                <section id="cohort1" className="cohort-section">
                    <div className="container animate-on-scroll">
                        <div className="cohort-wrapper">
                            <div className="cohort-info">
                                <div className="section-tag">
                                    <span className="tag-line"></span>
                                    <span className="tag-text">COHORT 1</span>
                                </div>
                                <h2>June – November 2025</h2>
                                <div className="cohort-details-grid">
                                    <div className="detail-item">
                                        <span className="detail-label">Seats</span>
                                        <span className="detail-value">18</span>
                                    </div>
                                    <div className="detail-item">
                                        <span className="detail-label">Structure</span>
                                        <span className="detail-value">6 Teams × 3</span>
                                    </div>
                                    <div className="detail-item">
                                        <span className="detail-label">Cost</span>
                                        <span className="detail-value accent-text">Free</span>
                                    </div>
                                </div>
                            </div>
                            <div className="cohort-timeline">
                                <div className="month-row">
                                    <span className="month">May</span>
                                    <span className="phase">Applications & Interviews</span>
                                </div>
                                <div className="month-row">
                                    <span className="month">Jun</span>
                                    <span className="phase">Kickoff & Topic Selection</span>
                                </div>
                                <div className="month-row">
                                    <span className="month">Jul-Sep</span>
                                    <span className="phase">Core Research Phase</span>
                                </div>
                                <div className="month-row">
                                    <span className="month">Oct</span>
                                    <span className="phase">Drafting & Review</span>
                                </div>
                                <div className="month-row">
                                    <span className="month">Nov</span>
                                    <span className="phase">Submission</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Programs Section */}
                <section id="programs" className="programs-section">
                    <div className="container animate-on-scroll">
                        <div className="section-header">
                            <div className="section-tag">
                                <span className="tag-line"></span>
                                <span className="tag-text">PROGRAMS</span>
                            </div>
                            <h2>Choose Your Path</h2>
                        </div>
                        <div className="grid grid-2">
                            <div className="card program-card ug-program">
                                <div className="card-badge">OPEN NOW</div>
                                <h3>Undergrad Program</h3>
                                <p className="program-desc">For currently enrolled bachelor's degree students looking to build serious academic credentials.</p>
                                <ul className="program-features">
                                    <li>18 Exclusive Seats</li>
                                    <li>6-Month Duration</li>
                                    <li>1-on-1 Mentorship</li>
                                    <li>Zero Cost</li>
                                </ul>
                                <a href="#apply" className="btn btn-primary">Apply Now</a>
                            </div>
                            <div className="card program-card hs-program">
                                <div className="card-badge badge-warning">COMING SOON</div>
                                <h3>High School Program</h3>
                                <p className="program-desc">For ambitious high schoolers (15-18) looking for early research exposure before college.</p>
                                <ul className="program-features">
                                    <li>Pre-undergrad exposure</li>
                                    <li>Foundational research skills</li>
                                    <li>Dedicated mentors</li>
                                </ul>
                                <div className="waitlist-form">
                                    <p className="waitlist-label">Join the Waitlist (Cohort 2)</p>
                                    <form id="hsWaitlist" className="inline-form">
                                        <input type="email" placeholder="Enter your email" required />
                                        <button type="submit" className="btn btn-secondary">Join</button>
                                    </form>
                                    <div className="form-message" style={{ display: 'none', marginTop: '10px', fontSize: '14px', color: 'var(--accent)' }}>Joined waitlist!</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Mentors Section */}
                <section id="mentors" className="mentors-section">
                    <div className="container animate-on-scroll">
                        <div className="section-header">
                            <div className="section-tag">
                                <span className="tag-line"></span>
                                <span className="tag-text">MENTORS & TEAM</span>
                            </div>
                            <h2>Guided by Experts</h2>
                            <p className="section-subtitle">Our collective brings deep academic rigor and real-world execution. No fluff.</p>
                        </div>
                        <div className="mentor-highlights grid grid-3">
                            <div className="card feature-block">
                                <div className="feature-title">20+ Papers</div>
                                <p>Published in top-tier international journals and conferences.</p>
                            </div>
                            <div className="card feature-block">
                                <div className="feature-title">Direct Mentorship</div>
                                <p>We work in the trenches with you. Active guidance, not passive lectures.</p>
                            </div>
                            <div className="card feature-block">
                                <div className="feature-title">DevHub Origins</div>
                                <p>Backed by DevHub's technical excellence and ecosystem.</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Apply CTA Section */}
                <section id="apply" className="apply-section">
                    <div className="container animate-on-scroll">
                        <div className="apply-box">
                            <h2>Ready to do real research?</h2>
                            <p>Applications for Cohort 1 are currently open. Only 18 seats available.</p>
                            <div className="countdown" id="countdown">
                                <div className="countdown-item">
                                    <span className="time" id="days">14</span>
                                    <span className="label">Days</span>
                                </div>
                                <div className="countdown-item">
                                    <span className="time" id="hours">00</span>
                                    <span className="label">Hours</span>
                                </div>
                            </div>
                            <a href="#" target="_blank" className="btn btn-primary btn-large pulse-animation">Start Application</a>
                        </div>
                    </div>
                </section>
            </main>

            {/* Footer */}
            <footer>
                <div className="container">
                    <div className="footer-grid">
                        <div className="footer-brand">
                            <div className="logo">
                                <span className="logo-concpt">CONCPT</span>
                            </div>
                            <p>DevHub's applied research lab.</p>
                        </div>
                        <div className="footer-links">
                            <h4>Navigation</h4>
                            <ul>
                                <li><a href="#about">About</a></li>
                                <li><a href="#process">Process</a></li>
                                <li><a href="#programs">Programs</a></li>
                                <li><a href="#mentors">Mentors</a></li>
                            </ul>
                        </div>
                        <div className="footer-contact">
                            <h4>Contact</h4>
                            <a href="mailto:concpt@devhub.com" className="email-link">concpt@devhub.com</a>
                        </div>
                    </div>
                    <div className="footer-bottom">
                        <p>&copy; 2025 DevHub. All rights reserved.</p>
                        <p className="confidential-note">Information is for prospective applicants. Subject to change.</p>
                    </div>
                </div>
            </footer>
        </>
    );
}

export default App;
