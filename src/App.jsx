import React, { useState, useEffect, useRef } from 'react';

const FlipWebsite = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [flipComplete, setFlipComplete] = useState(false);
  const [hasFlipped, setHasFlipped] = useState(false);
  const heroRef = useRef(null);

  useEffect(() => {
    // Check if user has already seen the flip animation
    const hasSeenFlip = sessionStorage.getItem('flip-seen');
    if (hasSeenFlip) {
      setFlipComplete(true);
      setHasFlipped(true);
      setScrollProgress(1);
      return;
    }

    let ticking = false;

    const handleScroll = () => {
      if (!ticking && !flipComplete) {
        requestAnimationFrame(() => {
          const scrollY = window.scrollY;
          const maxScroll = window.innerHeight * 0.3; // Flip completes in first 30% of viewport height
          const progress = Math.min(scrollY / maxScroll, 1);
          
          setScrollProgress(progress);
          
          if (progress >= 1 && !hasFlipped) {
            setFlipComplete(true);
            setHasFlipped(true);
            sessionStorage.setItem('flip-seen', 'true');
          }
          
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [flipComplete, hasFlipped]);

  const FloatingOrb = ({ size, top, left, delay, color1, color2 }) => (
    <div 
      className="absolute rounded-full animate-pulse"
      style={{
        width: size,
        height: size,
        top,
        left,
        background: `linear-gradient(135deg, ${color1}, ${color2})`,
        filter: 'blur(40px)',
        animationDelay: delay,
        animationDuration: '4s',
        opacity: 0.6,
      }}
    />
  );

  const Header = () => (
    <header className="fixed top-0 w-full z-50 backdrop-blur-xl border-b border-slate-700/30" style={{
      background: 'rgba(15, 23, 42, 0.8)',
    }}>
      <nav className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <div className="text-2xl font-bold text-transparent bg-clip-text" style={{
          background: 'linear-gradient(to right, #ffffff, #38bdf8)',
          WebkitBackgroundClip: 'text',
          backgroundClip: 'text',
        }}>
          FL!P
        </div>
        <div className="hidden md:flex space-x-8">
          <a href="#hero" className="text-slate-300 hover:text-teal-400 transition-colors">Home</a>
          <a href="#features" className="text-slate-300 hover:text-teal-400 transition-colors">Features</a>
          <a href="#philosophy" className="text-slate-300 hover:text-teal-400 transition-colors">Ethos</a>
          <a href="#technical" className="text-slate-300 hover:text-teal-400 transition-colors">About</a>
          <a href="#cta" className="text-slate-300 hover:text-teal-400 transition-colors">Download</a>
        </div>
        <button className="md:hidden text-slate-300 hover:text-teal-400">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </nav>
    </header>
  );

  const FlipLogo = () => {
    const getLetterTransform = (index, delay = 0) => {
      const letterProgress = Math.max(0, Math.min(1, (scrollProgress - delay) * 2));
      const rotateX = (1 - letterProgress) * 180;
      return {
        transform: `perspective(1000px) rotateX(${rotateX}deg)`,
        transformStyle: 'preserve-3d',
        transformOrigin: 'center center',
      };
    };

    const letters = ['F', 'L', '!', 'P'];
    const flippedLetters = ['Ⅎ', '˥', '¡', 'Ԁ'];

    return (
      <h1 className="font-black tracking-tight mb-6 relative select-none" style={{
        fontSize: 'clamp(4rem, 12vw, 12rem)',
        lineHeight: '0.9',
      }}>
        {letters.map((letter, index) => (
          <span
            key={index}
            className="inline-block relative"
            style={getLetterTransform(index, index * 0.05)}
          >
            {/* Front face (normal letters) */}
            <span
              className="absolute inset-0 text-transparent bg-clip-text"
              style={{
                background: 'linear-gradient(to right, #ffffff, #38bdf8, #a78bfa)',
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
                backfaceVisibility: 'hidden',
                transform: 'rotateX(0deg)',
              }}
            >
              {letter}
            </span>
            {/* Back face (flipped letters) */}
            <span
              className="text-transparent bg-clip-text"
              style={{
                background: 'linear-gradient(to right, #ffffff, #38bdf8, #a78bfa)',
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
                backfaceVisibility: 'hidden',
                transform: 'rotateX(180deg)',
              }}
            >
              {flippedLetters[index]}
            </span>
          </span>
        ))}
      </h1>
    );
  };

  const FlipPhone = () => {
    const phoneRotation = scrollProgress * 180;
    
    return (
      <div className="relative">
        <div 
          className="w-36 h-72 md:w-40 md:h-80 rounded-[3rem] border-4 border-slate-600 shadow-2xl transform transition-all duration-300 hover:scale-105"
          style={{
            background: 'linear-gradient(to bottom, #1e293b, #0f172a)',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.8), 0 0 50px rgba(56, 189, 248, 0.3)',
            transform: `perspective(1000px) rotateX(${phoneRotation}deg)`,
            transformStyle: 'preserve-3d',
          }}
        >
          <div 
            className="absolute inset-3 rounded-[2.5rem] flex items-center justify-center overflow-hidden"
            style={{
              background: scrollProgress < 1 
                ? 'linear-gradient(to bottom right, #374151, #1f2937)' // Face up (gray/inactive)
                : 'linear-gradient(to bottom right, #7c3aed, #6d28d9, #581c87)', // Face down (purple/active)
            }}
          >
            <div className="text-center">
              <div className="text-white text-xl md:text-2xl font-black mb-2">FL!P</div>
              <div className={`text-xs md:text-sm font-semibold tracking-wide transition-colors duration-500 ${
                scrollProgress < 1 ? 'text-gray-400' : 'text-teal-300'
              }`}>
                {scrollProgress < 1 ? 'INACTIVE' : 'ACTIVE'}
              </div>
            </div>
            <div 
              className="absolute inset-0 transition-opacity duration-500"
              style={{
                background: scrollProgress < 1 
                  ? 'rgba(75, 85, 99, 0.2)' 
                  : 'linear-gradient(to bottom right, rgba(56, 189, 248, 0.2), rgba(139, 92, 246, 0.2))',
                opacity: scrollProgress < 1 ? 0.5 : 1,
              }}
            />
          </div>
        </div>
        
        {/* Scroll hint - only show when flip hasn't completed */}
        {!flipComplete && (
          <div className="absolute -bottom-16 left-1/2 transform -translate-x-1/2 text-center">
            <div className="text-teal-400 text-sm font-medium animate-bounce">
              Scroll to flip
            </div>
            <div className="text-teal-300 text-xs mt-1 opacity-60">
              ↓
            </div>
          </div>
        )}
      </div>
    );
  };

  const FeatureCard = ({ title, description, features, gradient, accent }) => {
    const getAccentClasses = (accent) => {
      const accentMap = {
        red: 'hover:border-red-400/60 hover:shadow-red-500/20',
        emerald: 'hover:border-emerald-400/60 hover:shadow-emerald-500/20',
        blue: 'hover:border-blue-400/60 hover:shadow-blue-500/20',
        purple: 'hover:border-purple-400/60 hover:shadow-purple-500/20'
      };
      return accentMap[accent] || 'hover:border-teal-400/60 hover:shadow-teal-500/20';
    };

    const getBulletColor = (accent) => {
      const colorMap = {
        red: 'bg-red-400 shadow-red-400/50',
        emerald: 'bg-emerald-400 shadow-emerald-400/50',
        blue: 'bg-blue-400 shadow-blue-400/50',
        purple: 'bg-purple-400 shadow-purple-400/50'
      };
      return colorMap[accent] || 'bg-teal-400 shadow-teal-400/50';
    };

    return (
      <div 
        className={`group relative overflow-hidden rounded-3xl border border-slate-700/30 backdrop-blur-xl p-8 hover:scale-105 transition-all duration-700 hover:shadow-2xl ${getAccentClasses(accent)}`}
        style={{
          background: 'rgba(15, 23, 42, 0.4)',
        }}
      >
        <div 
          className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-20 transition-opacity duration-700`} 
        />
        <div className="relative z-10">
          <h3 className="text-3xl font-bold text-white mb-6 group-hover:text-teal-300 transition-colors duration-500">{title}</h3>
          <p className="text-slate-300 mb-8 leading-relaxed text-lg">{description}</p>
          <ul className="space-y-4">
            {features.map((feature, index) => (
              <li key={index} className="flex items-center text-slate-200">
                <div className={`w-3 h-3 rounded-full mr-4 flex-shrink-0 shadow-lg ${getBulletColor(accent)}`} />
                <span className="text-base">{feature}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  };

  const StatCard = ({ number, label, color }) => (
    <div className="text-center group cursor-pointer">
      <div className={`text-5xl font-black ${color} mb-3 group-hover:scale-110 transition-transform duration-300`}>{number}</div>
      <div className="text-slate-400 text-base font-medium">{label}</div>
    </div>
  );

  return (
    <div 
      className="min-h-screen text-white relative overflow-hidden"
      style={{
        background: 'linear-gradient(to bottom right, #0f172a, #1e1b4b, #0f172a)',
      }}
    >
      <Header />

      {/* Enhanced Floating Background Elements */}
      <FloatingOrb size="300px" top="5%" left="5%" delay="0s" color1="#38BDF8" color2="#8B5CF6" />
      <FloatingOrb size="200px" top="60%" left="85%" delay="1s" color1="#06B6D4" color2="#A78BFA" />
      <FloatingOrb size="250px" top="25%" left="75%" delay="2s" color1="#8B5CF6" color2="#38BDF8" />
      <FloatingOrb size="180px" top="80%" left="15%" delay="3s" color1="#A78BFA" color2="#06B6D4" />
      <FloatingOrb size="220px" top="40%" left="5%" delay="1.5s" color1="#06B6D4" color2="#8B5CF6" />

      {/* Hero Section with Flip Animation */}
      <section ref={heroRef} id="hero" className="min-h-screen flex items-center justify-center relative px-6 pt-20">
        <div className="max-w-7xl mx-auto text-center">
          {/* Flip Logo */}
          <div className="mb-8">
            <FlipLogo />
          </div>

          {/* Taglines */}
          <div className="mb-8 space-y-4">
            <h2 className="text-3xl md:text-5xl font-bold text-white leading-tight">
              The productivity app that doesn't mess around
            </h2>
            <p className="text-xl md:text-2xl text-slate-300 max-w-4xl mx-auto leading-relaxed">
              Real motion tracking. Real results.
            </p>
          </div>

          {/* Flip Phone Animation */}
          <div className="mb-12 flex justify-center">
            <FlipPhone />
          </div>

          {/* Enhanced CTA Button */}
          <div className="mb-8">
            <button 
              className="group relative px-12 py-6 rounded-3xl text-xl font-bold transition-all duration-500 transform hover:scale-110 shadow-2xl"
              style={{
                background: 'linear-gradient(to right, #14b8a6, #2563eb, #7c3aed)',
              }}
              onMouseEnter={(e) => {
                e.target.style.background = 'linear-gradient(to right, #0d9488, #1d4ed8, #6d28d9)';
              }}
              onMouseLeave={(e) => {
                e.target.style.background = 'linear-gradient(to right, #14b8a6, #2563eb, #7c3aed)';
              }}
            >
              <span className="relative z-10">Download on App Store</span>
              <div 
                className="absolute inset-0 rounded-3xl blur-xl opacity-0 group-hover:opacity-60 transition-opacity duration-500"
                style={{
                  background: 'linear-gradient(to right, #0d9488, #1d4ed8, #6d28d9)',
                }}
              />
            </button>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto">
            <StatCard number="40%" label="Productivity Increase" color="text-teal-400" />
            <StatCard number="10s" label="Flip Back Timer" color="text-purple-400" />
            <StatCard number="0%" label="Tolerance for BS" color="text-orange-400" />
          </div>
        </div>
      </section>

      {/* Philosophy Section - Enhanced with Press Release Content */}
      <section 
        id="philosophy" 
        className="py-24 px-6 backdrop-blur-2xl border-y border-slate-700/30"
        style={{
          background: 'linear-gradient(to bottom right, rgba(15, 23, 42, 0.6), rgba(76, 29, 149, 0.6))',
        }}
      >
        <div className="max-w-6xl mx-auto text-center">
          <h2 
            className="font-bold mb-12 text-transparent bg-clip-text"
            style={{
              fontSize: 'clamp(2.5rem, 6vw, 5rem)',
              background: 'linear-gradient(to right, #ffffff, #a78bfa, #38bdf8)',
              WebkitBackgroundClip: 'text',
              backgroundClip: 'text',
            }}
          >
            The Problem We're Solving
          </h2>
          
          <div 
            className="rounded-[2rem] p-12 mb-16 border border-red-500/30 backdrop-blur-xl shadow-2xl shadow-red-500/20"
            style={{
              background: 'linear-gradient(to right, rgba(30, 41, 59, 0.8), rgba(127, 29, 29, 0.3), rgba(30, 41, 59, 0.8))',
            }}
          >
            <p className="text-2xl md:text-3xl text-white leading-relaxed mb-6">
              Phones hijack your focus. Face up, they are alive. Buzzing, lighting up, blinking and nudging you back into endless, attention stealing scrolling.
            </p>
            <p className="text-xl text-slate-300 leading-relaxed">
              One glance becomes five minutes. And it adds up.
            </p>
          </div>

          <div 
            className="rounded-[2rem] p-12 border border-teal-500/30 backdrop-blur-xl shadow-2xl shadow-teal-500/20"
            style={{
              background: 'linear-gradient(to right, rgba(30, 41, 59, 0.8), rgba(20, 184, 166, 0.3), rgba(30, 41, 59, 0.8))',
            }}
          >
            <h3 className="text-2xl font-bold text-teal-300 mb-6">The FL!P Solution</h3>
            <p className="text-xl text-white leading-relaxed mb-4">
              The team behind FL!P™ set out to change that. How? With one physical movement. And based on one clear rule.
            </p>
            <p className="text-lg text-slate-300 italic">
              Real behavior change requires real accountability.
            </p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 px-6 relative">
        <div className="max-w-8xl mx-auto">
          <div className="text-center mb-20">
            <h2 
              className="font-bold mb-8 text-transparent bg-clip-text"
              style={{
                fontSize: 'clamp(3rem, 8vw, 6rem)',
                background: 'linear-gradient(to right, #ffffff, #38bdf8, #a78bfa)',
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
              }}
            >
              Core Features
            </h2>
            <p className="text-xl text-slate-300 max-w-4xl mx-auto leading-relaxed">
              Built for serious productivity enthusiasts who demand real accountability
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-16">
            <FeatureCard
              title="No BS Motion Tracking"
              description="Your phone MUST stay face-down. No cheating, no exceptions."
              gradient="from-red-500/20 to-orange-500/20"
              accent="red"
              features={[
                "Real device motion sensor integration",
                "Immediate detection when phone is lifted",
                "No workarounds or bypass methods",
                "Precision tracking every millisecond"
              ]}
            />

            <FeatureCard
              title="Competitive Edge"
              description="See when your friends fail. They see when you do too."
              gradient="from-emerald-500/20 to-green-500/20"
              accent="emerald"
              features={[
                "University leaderboards (weekly & all-time)",
                "Building-specific rankings via GPS",
                "Regional and global competitions",
                "Friend challenges and social accountability"
              ]}
            />

            <FeatureCard
              title="Strategic Pause System"
              description="Limited pauses per session. Strategic pauses for emergencies only."
              gradient="from-blue-500/20 to-cyan-500/20"
              accent="blue"
              features={[
                "Configurable pause limits per session",
                "10-second countdown to flip back",
                "Pause usage tracked and visible to friends",
                "Emergency-only mindset enforcement"
              ]}
            />

            <FeatureCard
              title="Scoring & Streaks"
              description="Climb the ranks with our unforgiving ranking system."
              gradient="from-purple-500/20 to-violet-500/20"
              accent="purple"
              features={[
                "Discipline ranks from Beginner to Master",
                "Weekly streak tracking and rewards",
                "Achievement system for milestones",
                "Performance analytics and insights"
              ]}
            />
          </div>
        </div>
      </section>

      {/* Technical Features */}
      <section id="technical" className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 
            className="font-bold text-center mb-16 text-transparent bg-clip-text"
            style={{
              fontSize: 'clamp(2rem, 5vw, 4rem)',
              background: 'linear-gradient(to right, #ffffff, #38bdf8, #a78bfa)',
              WebkitBackgroundClip: 'text',
              backgroundClip: 'text',
            }}
          >
            Built for Privacy & Performance
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { title: 'Privacy First', desc: 'Motion data stays on your device. Period.', color: 'text-teal-300', hoverColor: 'hover:border-teal-400/50' },
              { title: 'University System', desc: 'Pick your school, compete with classmates', color: 'text-purple-300', hoverColor: 'hover:border-purple-400/50' },
              { title: 'iOS Exclusive', desc: 'Optimized for iOS hardware and sensors', color: 'text-blue-300', hoverColor: 'hover:border-blue-400/50' },
              { title: 'Social Features', desc: 'Connect without being pushy or distracting', color: 'text-orange-300', hoverColor: 'hover:border-orange-400/50' }
            ].map((item, index) => (
              <div 
                key={index}
                className={`p-8 rounded-2xl border border-slate-700/40 backdrop-blur-xl text-center hover:scale-105 transition-all duration-500 ${item.hoverColor}`}
                style={{
                  background: 'linear-gradient(to bottom right, rgba(30, 41, 59, 0.6), rgba(15, 23, 42, 0.6))',
                }}
              >
                <h3 className={`font-bold text-xl mb-4 ${item.color}`}>{item.title}</h3>
                <p className="text-slate-300">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section 
        id="cta" 
        className="py-24 px-6 backdrop-blur-xl"
        style={{
          background: 'linear-gradient(to bottom right, rgba(76, 29, 149, 0.8), rgba(15, 23, 42, 0.8), rgba(20, 184, 166, 0.8))',
        }}
      >
        <div className="max-w-5xl mx-auto text-center">
          <h2 
            className="font-bold mb-8 text-transparent bg-clip-text"
            style={{
              fontSize: 'clamp(2.5rem, 6vw, 5rem)',
              background: 'linear-gradient(to right, #ffffff, #38bdf8, #a78bfa)',
              WebkitBackgroundClip: 'text',
              backgroundClip: 'text',
            }}
          >
            Ready to get serious about productivity?
          </h2>
          <p className="text-xl text-slate-300 mb-12 max-w-3xl mx-auto leading-relaxed">
            Join thousands of students and professionals who've chosen the uncompromising path to better focus.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <button 
              className="group relative px-10 py-5 rounded-3xl text-lg font-bold transition-all duration-500 transform hover:scale-110 shadow-2xl"
              style={{
                background: 'linear-gradient(to right, #14b8a6, #2563eb, #7c3aed)',
              }}
              onMouseEnter={(e) => {
                e.target.style.background = 'linear-gradient(to right, #0d9488, #1d4ed8, #6d28d9)';
              }}
              onMouseLeave={(e) => {
                e.target.style.background = 'linear-gradient(to right, #14b8a6, #2563eb, #7c3aed)';
              }}
            >
              <span className="relative z-10">Download FL!P Now</span>
            </button>
            
            <button className="px-10 py-5 border-2 border-slate-600 rounded-3xl text-lg font-semibold hover:border-teal-400 hover:text-teal-400 transition-all duration-500 hover:shadow-lg hover:shadow-teal-400/20">
              Learn More
            </button>
          </div>

          <div className="mt-16 text-center">
            <p className="text-slate-400 text-lg">
              iOS exclusive • Free download • No subscriptions • Real results
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-slate-800/50 backdrop-blur-xl">
        <div className="max-w-6xl mx-auto text-center">
          <div 
            className="font-bold mb-4 text-transparent bg-clip-text"
            style={{
              fontSize: '2rem',
              background: 'linear-gradient(to right, #ffffff, #38bdf8, #a78bfa)',
              WebkitBackgroundClip: 'text',
              backgroundClip: 'text',
            }}
          >
            FL!P
          </div>
          <p className="text-slate-400 mb-8">
            The productivity app that doesn't mess around.
          </p>
          <div className="flex justify-center space-x-8 text-slate-400">
            <a href="#" className="hover:text-teal-400 transition-colors duration-300">Privacy Policy</a>
            <a href="#" className="hover:text-teal-400 transition-colors duration-300">Terms of Service</a>
            <a href="#" className="hover:text-teal-400 transition-colors duration-300">Support</a>
            <a href="#" className="hover:text-teal-400 transition-colors duration-300">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default FlipWebsite;