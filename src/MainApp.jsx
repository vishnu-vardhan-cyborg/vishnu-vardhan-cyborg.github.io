import React, { lazy, Suspense, useEffect } from 'react';
import assets from './assets/vishnuvardhang.jpg';
import myFace from './assets/vishnu.png';
import './App.css';

// Lazy-loaded + memoized components
const TiltedCard = lazy(() => import('./tilted/TiltedCard').then(m => ({ default: React.memo(m.default) })));
const Beams = lazy(() => import('./beams/Beams').then(m => ({ default: React.memo(m.default) })));
const AsteroidCube = lazy(() => import('./Asteroid/AsteroidCube').then(m => ({ default: React.memo(m.default) })));
const ItalianStyleText = lazy(() => import('./ItalianStyleText').then(m => ({ default: React.memo(m.default) })));
const Waves = lazy(() => import('./waves/Waves').then(m => ({ default: React.memo(m.default) })));
const ScrollCube = lazy(() => import('./InteractiveCube').then(m => ({ default: React.memo(m.default) })));
const CustomFooter = lazy(() => import('./Custom/CustomFooter').then(m => ({ default: React.memo(m.default) })));
const ScrollReveal = lazy(() => import('./scroll/ScrollReveal').then(m => ({ default: React.memo(m.default) })));
const GlassMetalDiscs = lazy(() => import('./glass/GlassMetalDiscs').then(m => ({ default: React.memo(m.default) })));
const Navbar = lazy(() => import('./navv/Navbar').then(m => ({ default: React.memo(m.default) })));
const DockWithContactPopup = lazy(() => import('./DockWithContactPopup').then(m => ({ default: React.memo(m.default) })));
const GlassyProgressBar = lazy(() => import('./proo/GlassyProgressBar').then(m => ({ default: React.memo(m.default) })));
const ScrollSnapBlink = lazy(() => import('./blink/ScrollSnapBlink').then(m => ({ default: React.memo(m.default) })));

// App Component
function MainApp() {
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.body.scrollHeight - window.innerHeight;
      const scrollPercent = (scrollTop / docHeight) * 100;
      const progress = document.getElementById('scroll-progress');
      if (progress) {
        progress.style.height = scrollPercent + '%';
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <Suspense fallback={<div style={{ color: 'black', textAlign: 'center' }}>Loading...</div>}>
      <div style={{ position: 'relative', width: '100%', overflowX: 'hidden', background: 'black' }}>
    <div style={{ position: 'relative', width: '100%', overflowX: 'hidden', background: 'black' }}>
      <Navbar />

      {/* ---- Section 1: Home ---- */}
      <section id="home" style={{ width: '100%', height: '100vh', position: 'fixed', zIndex: 0 }}>
        <Beams
          beamWidth={2}
          beamHeight={15}
          beamNumber={12}
          lightColor="#ffffff"
          speed={2}
          noiseIntensity={1.75}
          scale={0.2}
          rotation={30}
        />

        {/* Centered Main Greeting */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            background: 'transparent',
            pointerEvents: 'none',

          }}
        >
          <ItalianStyleText text="Benvenuto!" />

          {/* Short Tagline / Vibe Sentence */}
          <p style={{
            marginTop: '1rem',
            color: '#ccc',
            fontSize: '1.1rem',
            fontFamily: 'Orbitron, sans-serif',
            letterSpacing: '0.05em',
            opacity: 0.8,
          }}>
            Crafting Creative Interfaces & Interactive Code.
          </p>

          {/* Scroll Hint */}
          <div style={{
            position: 'absolute',
            bottom: '160px',
            textAlign: 'center',
            color: '#aaa',
            fontFamily: 'Orbitron, sans-serif',
            opacity: 0.7,
            fontSize: '0.9rem',
            animation: 'blink 1.5s infinite',
          }}>
            Scroll ↓
          </div>
          <div
            style={{
              position: 'absolute',
              bottom: '2vh',
              left: '2vw',
              zIndex: 3,
              textAlign: 'left',
              fontFamily: 'Orbitron, sans-serif',
              opacity: 1,
              fontSize: 'clamp(2rem, 6vw, 6rem)',
              color: '#aaa',
            }}
            className="designer-title"
          >
            <div className="line">
              <span className="alt-font">D</span>ESIGNER&
            </div>

            <div className="line">
              WEB<span className="alt-font"> D</span>EVELOPER
            </div>
          </div>
          <div style={{
            position: 'absolute',
            top: '2vh',
            left: '2vw',
            textAlign: 'left',
            color: 'white',
            fontFamily: 'Orbitron, sans-serif',
            opacity: 1,
            fontSize: 'clamp(0.7rem, 1vw, 1rem)',

          }}>

            @Cyvorg
          </div>
          <div style={{
            position: 'absolute',
            bottom: '30vh',
            left: '2.4vw',
            color: 'white',
            fontFamily: 'Orbitron, sans-serif',
            opacity: 1,
            fontSize: 'clamp(0.9rem, 1vw, 1.2rem)',
            lineHeight: 1.4,
            whiteSpace: 'pre-line', // Important for line break

          }}>

            WELCOME ON MY PORTFOLIO
          </div>
          <div style={{
            position: 'absolute',
            bottom: '3vh',
            right: '2.4vw',
            color: 'white',
            fontFamily: 'Carattere, cursive',
            opacity: 1,
            fontSize: 'clamp(1.5rem, 3vw, 3rem)',
            lineHeight: 1.4,
            whiteSpace: 'pre-line', // Important for line break

          }}>

            Vishnu vardhan
          </div>

        </div>
      </section>
     

          <div
            className="scroll-wrapper"
            style={{
              marginTop: '100vh', // Push below the fixed home
              position: 'relative',
              zIndex: 1,
            }}
          >
            
         
            {/* ---- Section 2: About ---- */}
            <section id="about" style={{
              width: '100vw', height: '100vh', position: 'relative', zIndex: 2, overflow: 'hidden',
              display: 'flex', justifyContent: 'center', alignItems: 'center'
            }}>
              <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
                <GlassMetalDiscs />
              </div>

              <div style={{ position: 'absolute', top: '15.5vh', left: '21vw', zIndex: 5 }}>
                <TiltedCard
                  imageSrc={assets}
                  altText="vishnu-vardhan"
                  containerHeight="300px"
                  captionText="vishnu-vardhan"
                  containerWidth="300px"
                  imageHeight="300px"
                  imageWidth="300px"
                  rotateAmplitude={2}
                  scaleOnHover={1.2}
                  showMobileWarning={false}
                  showTooltip={true}
                  displayOverlayContent={true}
                  overlayContent={
                    <div>
                      <img src={myFace} alt="me" className="popout-image" />
                    </div>
                  }
                />
              </div>

              <div
                style={{
                  borderRadius: '16px',
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  backdropFilter: 'blur(6px)',
                  WebkitBackdropFilter: 'blur(6px)',
                  padding: '2rem', // optional: gives inner spacing
                  margin: '2rem 0', // optional: spacing around
                  position: 'absolute',
                  right: '5rem',
                  bottom: '4rem',
                  height: '40rem',
                  width: '30rem',

                }}
              >
                <ScrollReveal textClassName="scroll-reveal-text"
                  baseOpacity={1}
                  enableBlur={true}
                  baseRotation={5}
                  blurStrength={0}
                >
                  I am a detail-oriented Frontend Developer and Designer with a passion for crafting visually compelling and         highly interactive digital experiences. With a strong        foundation in modern web technologies and a keen eye   for clean, intuitive design, I specialize in blending           aesthetic innovation with technical precision.My
                  work    reflects a dedication to pushing creative boundaries while delivering seamless user experiences across
                  platforms. My expertise spans a range of technologies, including    React, TypeScript, Three.js, GSAP, and
                  WebGL, with a particular passion for crafting interactive, animated user  interfaces that bridge the gap
                  between design and             technology.Beyond my technical skills, I am deeply        committed to clean, maintainable code
                  and best               development practices, including version control with    Git, accessibility standards, and testing
                  methodologies. I collaborate closely with designers, developers, and stakeholders to ensure that projects
                  are aligned with both        creative and business objectives.
                </ScrollReveal>
                <div
                  style={{
                    position: 'absolute',
                    top: '-9vh',
                    right: '22vw',
                    color: 'white',
                    fontFamily: 'Carattere, cursive',
                    opacity: 1,
                    fontSize: 'clamp(1.5rem, 3vw, 3rem)',
                    lineHeight: 1.4,
                    whiteSpace: 'pre-line',
                  }}
                >
                  <span style={{ color: '#ff4c60', fontSize: 'clamp(2.5rem, 4vw, 4rem)' }}>A</span>bout
                </div>
              </div>
              <div style={{
                position: 'absolute',
                top: '15vh',
                left: '2.4vw',
                padding: '2rem',
                borderRadius: '16px',
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                backdropFilter: 'blur(6px)',
                WebkitBackdropFilter: 'blur(6px)',
                color: '#fff',
                fontFamily: 'Roboto Condensed, sans-serif',
                fontSize: 'clamp(1.3rem, 2vw, 1.2rem)',
                lineHeight: 1.8,
                width: 'clamp(400px, 40vw, 650px)',
                height: '30vh',
                userSelect: 'none',
              }}>

                <div>
                  {/* style={{ paddingLeft: '18vw' }} */}
                  <div style={{ marginBottom: '0.5rem' }}><strong>Name:</strong> Vishnu Vardhan</div>
                  <div style={{ marginBottom: '0.5rem' }}><strong>Occupation:</strong> Frontend Developer</div>
                  <div style={{ marginBottom: '0.5rem' }}><strong>Education:</strong> B.Tech Computer Science</div>
                  <div><strong>Location:</strong> India</div>
                </div>

              </div>




              <div
                style={{
                  position: 'absolute',
                  bottom: '4vh',
                  left: '2.4vw',
                  zIndex: 3,
                  opacity: 1,
                }}
                className="motivational-text"
              >
                <div className="line">
                  AN<span className="alt-font">Y</span>THING
                </div>
                <div className="line">
                  WO<span className="alt-font">R</span>TH HAVI<span className="alt-font">N</span>G
                </div>
                <div className="line">
                  TAKES <span className="alt-font">T</span>IME
                </div>
              </div>


              {/* <div
  style={{
    position: 'absolute',
    top: 0,
    left: 0,
    height: '100vh',
    width: 'max(100vh, 100vw)', // ensure enough space for rotated content
    transform: 'rotate(-90deg) translateX(-100vh)',
    transformOrigin: 'top left',
    zIndex: 3,
    overflow: 'visible', // allow full scrolling visibility
    userSelect:'none',
    opacity:'0.7',
    }}
    >
    <ScrollVelocity
    texts={['React Bits vishnu', 'Scroll Down',]}
    className="custom-scroll-text"
    />
    </div> */}

            </section>
      
      {/* --- Scroll Snapping Starts Here --- */}

 <div class="scroll-container">
      <section class="snap-section">
        {/* ---- Section 3: Projects ---- */}
        <section id="projects" className="scroll-cube-wrapper" style={{ scrollSnapAlign: 'start', width: '100vw', height: '100vh', background: 'black' }}>
          <ScrollCube />
          <div
            style={{
              position: 'absolute',
              top: '4vh',
              left: '2.4vw',
              zIndex: 3,
              opacity: 1,
            }}
            className="motivational-text"
          >
            <div className="line">
              PR<span className="alt-font">O</span>JECT'S
            </div>

          </div>
          <ScrollSnapBlink />
          <div className="footer-blur" />
        </section>
      </section>



      <section className="snap-section" id="contact" style={{ background: 'black' }}>
        {/* ---- Section 4: Contact ---- */}
        <section id="contact" style={{
          width: '100vw',
          height: '100vh',
          position: 'relative',
          zIndex: 1,
          background: 'black',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
          alignItems: 'center',
        }}>
          <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
            <Waves
              lineColor="#423e3e"
              backgroundColor="hsla(230, 34.50%, 22.70%, 0.05)"
              waveSpeedX={0.02}
              waveSpeedY={0.01}
              waveAmpX={40}
              waveAmpY={20}
              friction={0.9}
              tension={0.01}
              maxCursorMove={120}
              xGap={12}
              yGap={36}
            />
            <CustomFooter />
          </div>

          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            zIndex: 1,
            pointerEvents: 'none'
          }}>


            <div style={{
              position: 'absolute',
              width: '100%',
              height: '100%',
              pointerEvents: 'auto',
              cursor: 'default' // default
            }}>
              <div
                style={{
                  width: '100%',
                  height: '100%',
                  cursor: 'grab',
                }}
                onMouseDown={(e) => {
                  e.currentTarget.style.cursor = 'grabbing';
                }}
                onMouseUp={(e) => {
                  e.currentTarget.style.cursor = 'grab';
                }}
              >
                <AsteroidCube />
              </div>
            </div>
          </div>


          <div style={{
            position: 'absolute',
            top: '40px',
            left: '20px',
            padding: '40px',
            width: '600px',        // 🚩 Increase this
            maxWidth: '90vw',
            background: 'rgba(255, 255, 255, 0.05)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            borderRadius: '12px',
            backdropFilter: 'blur(3px)',
            WebkitBackdropFilter: 'blur(3px)',

          }}>
            <h2 style={{
              color: '#f0f0f0',
              fontFamily: 'Inter, sans-serif',
              fontSize: '16px',
              marginBottom: '20px',
            }}>
              My Skills
            </h2>
            <GlassyProgressBar label="React / Next.js" percentage={85} />
            <GlassyProgressBar label="Three.js / WebGL" percentage={70} />
            <GlassyProgressBar label="GSAP / Animation" percentage={80} />
            <GlassyProgressBar label="UI Design / Figma" percentage={65} />
            <GlassyProgressBar label="Creative Coding" percentage={75} />
          </div>
          <div style={{
            position: 'absolute',
            top: '40px',
            right: '20px',
            padding: '40px',
            width: '600px',        // 🚩 Increase this
            maxWidth: '90vw',
            background: 'rgba(255, 255, 255, 0.05)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            borderRadius: '12px',
            backdropFilter: 'blur(3px)',
            WebkitBackdropFilter: 'blur(3px)',

          }}>
            <h2 style={{
              color: '#f0f0f0',
              fontFamily: 'Inter, sans-serif',
              fontSize: '16px',
              marginBottom: '20px',
            }}>
              My Skills
            </h2>
            <GlassyProgressBar label="React / Next.js" percentage={85} />
            <GlassyProgressBar label="Three.js / WebGL" percentage={70} />
            <GlassyProgressBar label="GSAP / Animation" percentage={80} />
            <GlassyProgressBar label="UI Design / Figma" percentage={65} />
            <GlassyProgressBar label="Creative Coding" percentage={75} />
          </div>

        </section>
      </section>
    </div>

      {/* ---- Scroll Progress Bar  ---- */ }
  <div id="scroll-progress" style={{
    position: 'fixed',
    top: 0,
    right: 0,
    width: '4px',
    height: '0%',
    background: 'linear-gradient(to bottom, #f3f3f3ff, #545658ff)',
    zIndex: 9999,
    transition: 'height 0.1s ease-out',
  }} />
  {/*  Dock pinned visually to bottom inside this section */ }
  <div style={{
    position: 'absolute',
    zIndex: 40,
    paddingBottom: '40px',
  }}>
    <DockWithContactPopup />
  </div>

    </div >
      </div >
      </div>
    </Suspense>
  );
}




export default MainApp;
