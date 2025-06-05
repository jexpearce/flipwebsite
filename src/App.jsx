import React, { useState, useEffect } from 'react';
console.log("FlipWebsite loaded");

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

  const FloatingOrb = ({ size, top, left, delay }) => (
    <div 
      className="absolute rounded-full opacity-20 animate-pulse"
      style={{
        width: size,
        height: size,
        top,
        left,
        background: 'linear-gradient(135deg, #38BDF8, #8B5CF6)',
        filter: 'blur(20px)',
        animationDelay: delay,
        animationDuration: '4s'
      }}
    />
  );

  const FeatureCard = ({ icon, title, description, features, gradient }) => (
    <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-slate-700/50 backdrop-blur-sm p-8 hover:scale-105 transition-all duration-500 hover:border-cyan-400/50">
      <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />
      <div className="relative z-10">
        <div className="text-4xl mb-6">{icon}</div>
        <h3 className="text-2xl font-bold text-white mb-4">{title}</h3>
        <p className="text-slate-300 mb-6 leading-relaxed">{description}</p>
        <ul className="space-y-3">
          {features.map((feature, index) => (
            <li key={index} className="flex items-center text-slate-200">
              <div className="w-2 h-2 bg-cyan-400 rounded-full mr-3 flex-shrink-0" />
              {feature}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );

  const StatCard = ({ number, label, color }) => (
    <div className="text-center">
      <div className={`text-4xl font-bold ${color} mb-2`}>{number}</div>
      <div className="text-slate-400 text-sm">{label}</div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white relative overflow-hidden">
      {/* Floating Background Elements */}
      <FloatingOrb size="200px" top="10%" left="10%" delay="0s" />
      <FloatingOrb size="150px" top="60%" left="80%" delay="1s" />
      <FloatingOrb size="100px" top="30%" left="70%" delay="2s" />
      <FloatingOrb size="120px" top="80%" left="20%" delay="3s" />

      {/* Hero Section */}
      <section id="hero" className="min-h-screen flex items-center justify-center relative px-6">
        <div className="max-w-6xl mx-auto text-center">
          {/* Logo and Branding */}
          <div className="mb-8">
            <h1 className="text-8xl md:text-9xl font-black tracking-tight mb-4">
              <span className="bg-gradient-to-r from-white to-cyan-300 bg-clip-text text-transparent">
                FL!P
              </span>
            </h1>
            <div className="text-4xl mb-2">📱↩️</div>
          </div>

          {/* Taglines */}
          <div className="mb-8 space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold text-white">
              The productivity app that doesn't mess around
            </h2>
            <p className="text-xl md:text-2xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
              Real motion tracking. Real consequences. Real results.
            </p>
          </div>

          {/* Phone Animation */}
          <div className="mb-12 flex justify-center">
            <div className="relative">
              <div 
                className={`w-32 h-64 bg-gradient-to-b from-slate-800 to-slate-900 rounded-3xl border-4 border-slate-600 shadow-2xl transform transition-all duration-1000 ${phoneFlipped ? 'rotate-180 scale-95' : 'rotate-0 scale-100'}`}
              >
                <div className="absolute inset-2 bg-gradient-to-br from-purple-600 to-purple-800 rounded-2xl flex items-center justify-center">
                  <div className={`transition-opacity duration-500 ${phoneFlipped ? 'opacity-0' : 'opacity-100'}`}>
                    <div className="text-white text-lg font-bold">FL!P</div>
                    <div className="text-cyan-300 text-sm">ACTIVE</div>
                  </div>
                </div>
              </div>
              <div className="absolute -right-8 top-1/2 transform -translate-y-1/2">
                <div className="flex flex-col items-center text-cyan-400">
                  <div className="text-2xl animate-bounce">⬇️</div>
                  <div className="text-sm font-semibold">FLIP IT</div>
                </div>
              </div>
            </div>
          </div>

          {/* CTA Button */}
          <div className="mb-8">
            <button className="group relative px-12 py-6 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-2xl text-xl font-bold hover:from-cyan-400 hover:to-blue-500 transition-all duration-300 transform hover:scale-105 shadow-2xl hover:shadow-cyan-500/25">
              <span className="relative z-10">Download on App Store</span>
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-2xl blur opacity-0 group-hover:opacity-50 transition-opacity duration-300" />
            </button>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-3 gap-8 max-w-md mx-auto">
            <StatCard number="40%" label="Productivity Increase" color="text-cyan-400" />
            <StatCard number="10s" label="Flip Back Timer" color="text-purple-400" />
            <StatCard number="0%" label="Tolerance for BS" color="text-orange-400" />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 px-6 relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-white to-cyan-300 bg-clip-text text-transparent">
              Core Features
            </h2>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              Built for serious productivity enthusiasts who demand real accountability
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            <FeatureCard
              icon="📱"
              title="No BS Motion Tracking"
              description="Your phone MUST stay face-down. No cheating, no exceptions."
              gradient="from-red-500 to-orange-500"
              features={[
                "Real device motion sensor integration",
                "Immediate detection when phone is lifted",
                "No workarounds or bypass methods",
                "Precision tracking every millisecond"
              ]}
            />

            <FeatureCard
              icon="🏆"
              title="Competitive Edge"
              description="See when your friends fail. They see when you do too."
              gradient="from-green-500 to-emerald-500"
              features={[
                "University leaderboards (weekly & all-time)",
                "Building-specific rankings via GPS",
                "Regional and global competitions",
                "Friend challenges and social accountability"
              ]}
            />

            <FeatureCard
              icon="⏸️"
              title="Strategic Pause System"
              description="Limited pauses per session. Strategic pauses for emergencies only."
              gradient="from-blue-500 to-cyan-500"
              features={[
                "Configurable pause limits per session",
                "10-second countdown to flip back",
                "Pause usage tracked and visible to friends",
                "Emergency-only mindset enforcement"
              ]}
            />

            <FeatureCard
              icon="📊"
              title="Scoring & Streaks"
              description="Climb the ranks with our unforgiving ranking system."
              gradient="from-purple-500 to-violet-500"
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
      <section id="philosophy" className="py-24 px-6 bg-gradient-to-br from-slate-800/50 to-purple-900/50 backdrop-blur-sm">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-5xl font-bold mb-12 bg-gradient-to-r from-white to-purple-300 bg-clip-text text-transparent">
            Why FL!P Works
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <div className="p-8 rounded-2xl bg-gradient-to-br from-slate-800/80 to-slate-900/80 border border-slate-700/50">
              <div className="text-4xl mb-4">🔬</div>
              <h3 className="text-xl font-bold mb-4">Research-Backed</h3>
              <p className="text-slate-300">Studies show productivity increases 40% when phones are face-down and out of sight.</p>
            </div>
            
            <div className="p-8 rounded-2xl bg-gradient-to-br from-slate-800/80 to-slate-900/80 border border-slate-700/50">
              <div className="text-4xl mb-4">💪</div>
              <h3 className="text-xl font-bold mb-4">Real Accountability</h3>
              <p className="text-slate-300">We built FL!P because other productivity apps are too forgiving. Real change requires real consequences.</p>
            </div>
            
            <div className="p-8 rounded-2xl bg-gradient-to-br from-slate-800/80 to-slate-900/80 border border-slate-700/50">
              <div className="text-4xl mb-4">🎯</div>
              <h3 className="text-xl font-bold mb-4">Behavior Change</h3>
              <p className="text-slate-300">True productivity comes from building discipline, not just tracking time. FL!P enforces the habits that matter.</p>
            </div>
          </div>

          <div className="bg-gradient-to-r from-slate-800/80 to-purple-800/80 rounded-3xl p-12 border border-purple-500/30">
            <blockquote className="text-2xl md:text-3xl font-medium text-white leading-relaxed">
              "The difference between successful people and everyone else isn't talent or luck—it's the ability to maintain focus when it matters most."
            </blockquote>
            <div className="mt-6 text-cyan-400 font-semibold">— The FL!P Philosophy</div>
          </div>
        </div>
      </section>

      {/* Technical Features */}
      <section id="technical" className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16 bg-gradient-to-r from-white to-cyan-300 bg-clip-text text-transparent">
            Built for Privacy & Performance
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 rounded-xl bg-gradient-to-br from-slate-800/60 to-slate-900/60 border border-slate-700/50 text-center">
              <div className="text-3xl mb-4">🔒</div>
              <h3 className="font-bold mb-2">Privacy First</h3>
              <p className="text-sm text-slate-300">Motion data stays on your device. Period.</p>
            </div>
            
            <div className="p-6 rounded-xl bg-gradient-to-br from-slate-800/60 to-slate-900/60 border border-slate-700/50 text-center">
              <div className="text-3xl mb-4">🏫</div>
              <h3 className="font-bold mb-2">University System</h3>
              <p className="text-sm text-slate-300">Pick your school, compete with classmates</p>
            </div>
            
            <div className="p-6 rounded-xl bg-gradient-to-br from-slate-800/60 to-slate-900/60 border border-slate-700/50 text-center">
              <div className="text-3xl mb-4">📱</div>
              <h3 className="font-bold mb-2">iOS Exclusive</h3>
              <p className="text-sm text-slate-300">Optimized for iOS hardware and sensors</p>
            </div>
            
            <div className="p-6 rounded-xl bg-gradient-to-br from-slate-800/60 to-slate-900/60 border border-slate-700/50 text-center">
              <div className="text-3xl mb-4">👥</div>
              <h3 className="font-bold mb-2">Social Features</h3>
              <p className="text-sm text-slate-300">Connect without being pushy or distracting</p>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section id="cta" className="py-24 px-6 bg-gradient-to-br from-purple-900/80 to-slate-900/80">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-5xl font-bold mb-8 bg-gradient-to-r from-white to-cyan-300 bg-clip-text text-transparent">
            Ready to get serious about productivity?
          </h2>
          <p className="text-xl text-slate-300 mb-12 max-w-2xl mx-auto">
            Join thousands of students and professionals who've chosen the uncompromising path to better focus.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <button className="group relative px-10 py-5 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-2xl text-lg font-bold hover:from-cyan-400 hover:to-blue-500 transition-all duration-300 transform hover:scale-105 shadow-2xl hover:shadow-cyan-500/25">
              <span className="relative z-10">Download FL!P Now</span>
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-2xl blur opacity-0 group-hover:opacity-50 transition-opacity duration-300" />
            </button>
            
            <button className="px-10 py-5 border-2 border-slate-600 rounded-2xl text-lg font-semibold hover:border-cyan-400 hover:text-cyan-400 transition-all duration-300">
              Learn More
            </button>
          </div>

          <div className="mt-16 text-center">
            <p className="text-slate-400 text-sm">
              iOS exclusive • Free download • No subscriptions • Real results
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-slate-800">
        <div className="max-w-6xl mx-auto text-center">
          <div className="text-2xl font-bold mb-4 bg-gradient-to-r from-white to-cyan-300 bg-clip-text text-transparent">
            FL!P
          </div>
          <p className="text-slate-400 text-sm mb-8">
            The productivity app that doesn't mess around.
          </p>
          <div className="flex justify-center space-x-8 text-slate-400 text-sm">
            <a href="#" className="hover:text-cyan-400 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-cyan-400 transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-cyan-400 transition-colors">Support</a>
            <a href="#" className="hover:text-cyan-400 transition-colors">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default FlipWebsite;