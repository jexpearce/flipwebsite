import React, { useState, useEffect } from 'react';

const FlipWebsite = () => {
  const [isVisible, setIsVisible] = useState({});
  const [phoneFlipped, setPhoneFlipped] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsVisible(prev => ({
            ...prev,
            [entry.target.id]: entry.isIntersecting
          }));
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll('[id]').forEach((el) => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const flipInterval = setInterval(() => {
      setPhoneFlipped(prev => !prev);
    }, 3000);

    return () => clearInterval(flipInterval);
  }, []);

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
      {/* Enhanced Floating Background Elements */}
      <FloatingOrb size="300px" top="5%" left="5%" delay="0s" color1="#38BDF8" color2="#8B5CF6" />
      <FloatingOrb size="200px" top="60%" left="85%" delay="1s" color1="#06B6D4" color2="#A78BFA" />
      <FloatingOrb size="250px" top="25%" left="75%" delay="2s" color1="#8B5CF6" color2="#38BDF8" />
      <FloatingOrb size="180px" top="80%" left="15%" delay="3s" color1="#A78BFA" color2="#06B6D4" />
      <FloatingOrb size="220px" top="40%" left="5%" delay="1.5s" color1="#06B6D4" color2="#8B5CF6" />

      {/* Hero Section */}
      <section id="hero" className="min-h-screen flex items-center justify-center relative px-6">
        <div className="max-w-7xl mx-auto text-center">
          {/* Logo and Branding */}
          <div className="mb-12">
            <h1 
              className="font-black tracking-tight mb-6 text-transparent bg-clip-text drop-shadow-2xl"
              style={{
                fontSize: 'clamp(6rem, 15vw, 12rem)',
                background: 'linear-gradient(to right, #ffffff, #38bdf8, #a78bfa)',
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
              }}
            >
              FL!P
            </h1>
          </div>

          {/* Taglines */}
          <div className="mb-12 space-y-6">
            <h2 className="text-4xl md:text-6xl font-bold text-white leading-tight">
              The productivity app that doesn't mess around
            </h2>
            <p className="text-2xl md:text-3xl text-slate-300 max-w-4xl mx-auto leading-relaxed">
              Real motion tracking. Real consequences. Real results.
            </p>
          </div>

          {/* Enhanced Phone Animation */}
          <div className="mb-16 flex justify-center">
            <div className="relative">
              <div 
                className={`w-40 h-80 rounded-[3rem] border-4 border-slate-600 shadow-2xl transform transition-all duration-1000 hover:scale-105 ${phoneFlipped ? 'rotate-180 scale-95' : 'rotate-0 scale-100'}`}
                style={{
                  background: 'linear-gradient(to bottom, #1e293b, #0f172a)',
                  boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.8), 0 0 50px rgba(56, 189, 248, 0.3)',
                }}
              >
                <div 
                  className="absolute inset-3 rounded-[2.5rem] flex items-center justify-center overflow-hidden"
                  style={{
                    background: 'linear-gradient(to bottom right, #7c3aed, #6d28d9, #581c87)',
                  }}
                >
                  <div className={`transition-opacity duration-500 ${phoneFlipped ? 'opacity-0' : 'opacity-100'} text-center`}>
                    <div className="text-white text-2xl font-black mb-2">FL!P</div>
                    <div className="text-teal-300 text-sm font-semibold tracking-wide">ACTIVE</div>
                  </div>
                  {/* Animated screen glow */}
                  <div 
                    className="absolute inset-0 animate-pulse"
                    style={{
                      background: 'linear-gradient(to bottom right, rgba(56, 189, 248, 0.2), rgba(139, 92, 246, 0.2))',
                    }}
                  />
                </div>
              </div>
              <div className="absolute -right-12 top-1/2 transform -translate-y-1/2">
                <div className="flex flex-col items-center text-teal-400 animate-bounce">
                  <div className="text-3xl">↓</div>
                  <div className="text-sm font-bold tracking-wide">FLIP IT</div>
                </div>
              </div>
            </div>
          </div>

          {/* Enhanced CTA Button */}
          <div className="mb-12">
            <button 
              className="group relative px-16 py-8 rounded-3xl text-2xl font-bold transition-all duration-500 transform hover:scale-110 shadow-2xl"
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

          {/* Enhanced Quick Stats */}
          <div className="grid grid-cols-3 gap-12 max-w-2xl mx-auto">
            <StatCard number="40%" label="Productivity Increase" color="text-teal-400" />
            <StatCard number="10s" label="Flip Back Timer" color="text-purple-400" />
            <StatCard number="0%" label="Tolerance for BS" color="text-orange-400" />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-32 px-6 relative">
        <div className="max-w-8xl mx-auto">
          <div className="text-center mb-24">
            <h2 
              className="font-bold mb-8 text-transparent bg-clip-text"
              style={{
                fontSize: 'clamp(3rem, 8vw, 7rem)',
                background: 'linear-gradient(to right, #ffffff, #38bdf8, #a78bfa)',
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
              }}
            >
              Core Features
            </h2>
            <p className="text-2xl text-slate-300 max-w-4xl mx-auto leading-relaxed">
              Built for serious productivity enthusiasts who demand real accountability
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20">
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

      {/* Philosophy Section */}
      <section 
        id="philosophy" 
        className="py-32 px-6 backdrop-blur-2xl border-y border-slate-700/30"
        style={{
          background: 'linear-gradient(to bottom right, rgba(15, 23, 42, 0.6), rgba(76, 29, 149, 0.6))',
        }}
      >
        <div className="max-w-6xl mx-auto text-center">
          <h2 
            className="font-bold mb-16 text-transparent bg-clip-text"
            style={{
              fontSize: 'clamp(2.5rem, 6vw, 6rem)',
              background: 'linear-gradient(to right, #ffffff, #a78bfa, #38bdf8)',
              WebkitBackgroundClip: 'text',
              backgroundClip: 'text',
            }}
          >
            Why FL!P Works
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-20">
            <div 
              className="p-10 rounded-3xl border border-slate-700/40 backdrop-blur-xl hover:scale-105 transition-all duration-500 hover:border-teal-400/50"
              style={{
                background: 'linear-gradient(to bottom right, rgba(30, 41, 59, 0.6), rgba(15, 23, 42, 0.6))',
              }}
            >
              <div className="text-5xl mb-6">🔬</div>
              <h3 className="text-2xl font-bold mb-6 text-teal-300">Research-Backed</h3>
              <p className="text-slate-300 text-lg leading-relaxed">Studies show productivity increases 40% when phones are face-down and out of sight.</p>
            </div>
            
            <div 
              className="p-10 rounded-3xl border border-slate-700/40 backdrop-blur-xl hover:scale-105 transition-all duration-500 hover:border-purple-400/50"
              style={{
                background: 'linear-gradient(to bottom right, rgba(30, 41, 59, 0.6), rgba(15, 23, 42, 0.6))',
              }}
            >
              <div className="text-5xl mb-6">💪</div>
              <h3 className="text-2xl font-bold mb-6 text-purple-300">Real Accountability</h3>
              <p className="text-slate-300 text-lg leading-relaxed">We built FL!P because other productivity apps are too forgiving. Real change requires real consequences.</p>
            </div>
            
            <div 
              className="p-10 rounded-3xl border border-slate-700/40 backdrop-blur-xl hover:scale-105 transition-all duration-500 hover:border-orange-400/50"
              style={{
                background: 'linear-gradient(to bottom right, rgba(30, 41, 59, 0.6), rgba(15, 23, 42, 0.6))',
              }}
            >
              <div className="text-5xl mb-6">🎯</div>
              <h3 className="text-2xl font-bold mb-6 text-orange-300">Behavior Change</h3>
              <p className="text-slate-300 text-lg leading-relaxed">True productivity comes from building discipline, not just tracking time. FL!P enforces the habits that matter.</p>
            </div>
          </div>

          <div 
            className="rounded-[2rem] p-16 border border-purple-500/30 backdrop-blur-xl shadow-2xl shadow-purple-500/20"
            style={{
              background: 'linear-gradient(to right, rgba(30, 41, 59, 0.8), rgba(76, 29, 149, 0.8), rgba(30, 41, 59, 0.8))',
            }}
          >
            <blockquote className="text-3xl md:text-4xl font-medium text-white leading-relaxed mb-8">
              "The difference between successful people and everyone else isn't talent or luck—it's the ability to maintain focus when it matters most."
            </blockquote>
            <div className="text-xl text-teal-400 font-bold tracking-wide">— The FL!P Philosophy</div>
          </div>
        </div>
      </section>

      {/* Technical Features */}
      <section id="technical" className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 
            className="font-bold text-center mb-20 text-transparent bg-clip-text"
            style={{
              fontSize: 'clamp(2rem, 5vw, 5rem)',
              background: 'linear-gradient(to right, #ffffff, #38bdf8, #a78bfa)',
              WebkitBackgroundClip: 'text',
              backgroundClip: 'text',
            }}
          >
            Built for Privacy & Performance
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: '🔒', title: 'Privacy First', desc: 'Motion data stays on your device. Period.', color: 'text-teal-300', hoverColor: 'hover:border-teal-400/50' },
              { icon: '🏫', title: 'University System', desc: 'Pick your school, compete with classmates', color: 'text-purple-300', hoverColor: 'hover:border-purple-400/50' },
              { icon: '📱', title: 'iOS Exclusive', desc: 'Optimized for iOS hardware and sensors', color: 'text-blue-300', hoverColor: 'hover:border-blue-400/50' },
              { icon: '👥', title: 'Social Features', desc: 'Connect without being pushy or distracting', color: 'text-orange-300', hoverColor: 'hover:border-orange-400/50' }
            ].map((item, index) => (
              <div 
                key={index}
                className={`p-8 rounded-2xl border border-slate-700/40 backdrop-blur-xl text-center hover:scale-105 transition-all duration-500 ${item.hoverColor}`}
                style={{
                  background: 'linear-gradient(to bottom right, rgba(30, 41, 59, 0.6), rgba(15, 23, 42, 0.6))',
                }}
              >
                <div className="text-4xl mb-6">{item.icon}</div>
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
        className="py-32 px-6 backdrop-blur-xl"
        style={{
          background: 'linear-gradient(to bottom right, rgba(76, 29, 149, 0.8), rgba(15, 23, 42, 0.8), rgba(20, 184, 166, 0.8))',
        }}
      >
        <div className="max-w-5xl mx-auto text-center">
          <h2 
            className="font-bold mb-12 text-transparent bg-clip-text"
            style={{
              fontSize: 'clamp(2.5rem, 6vw, 6rem)',
              background: 'linear-gradient(to right, #ffffff, #38bdf8, #a78bfa)',
              WebkitBackgroundClip: 'text',
              backgroundClip: 'text',
            }}
          >
            Ready to get serious about productivity?
          </h2>
          <p className="text-2xl text-slate-300 mb-16 max-w-3xl mx-auto leading-relaxed">
            Join thousands of students and professionals who've chosen the uncompromising path to better focus.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-8 justify-center items-center">
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
              <span className="relative z-10">Download FL!P Now</span>
            </button>
            
            <button className="px-12 py-6 border-2 border-slate-600 rounded-3xl text-xl font-semibold hover:border-teal-400 hover:text-teal-400 transition-all duration-500 hover:shadow-lg hover:shadow-teal-400/20">
              Learn More
            </button>
          </div>

          <div className="mt-20 text-center">
            <p className="text-slate-400 text-lg">
              iOS exclusive • Free download • No subscriptions • Real results
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 px-6 border-t border-slate-800/50 backdrop-blur-xl">
        <div className="max-w-6xl mx-auto text-center">
          <div 
            className="font-bold mb-6 text-transparent bg-clip-text"
            style={{
              fontSize: '3rem',
              background: 'linear-gradient(to right, #ffffff, #38bdf8, #a78bfa)',
              WebkitBackgroundClip: 'text',
              backgroundClip: 'text',
            }}
          >
            FL!P
          </div>
          <p className="text-slate-400 mb-10 text-lg">
            The productivity app that doesn't mess around.
          </p>
          <div className="flex justify-center space-x-12 text-slate-400">
            <a href="#" className="hover:text-teal-400 transition-colors duration-300 text-lg">Privacy Policy</a>
            <a href="#" className="hover:text-teal-400 transition-colors duration-300 text-lg">Terms of Service</a>
            <a href="#" className="hover:text-teal-400 transition-colors duration-300 text-lg">Support</a>
            <a href="#" className="hover:text-teal-400 transition-colors duration-300 text-lg">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default FlipWebsite;