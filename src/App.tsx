import React, { useEffect, useRef, useState } from 'react';
import { Heart, Star, Calendar, Download, Instagram, Facebook, CheckCircle, X, Play, Youtube, Linkedin, Menu, Copy } from 'lucide-react';

function App() {
  const [showForm, setShowForm] = useState(false);
  const [formType, setFormType] = useState('');
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [showPayment, setShowPayment] = useState(false);
  const [paymentBooked, setPaymentBooked] = useState(false);
  const [navOpen, setNavOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    experience: ''
  });

  // Zelle payment details (update these)
  const ZELLE_RECIPIENT_NAME = 'Your Name';
  const ZELLE_RECIPIENT_EMAIL = 'your-zelle-email@example.com';
  const COACHING_AMOUNT = 140;

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const videoWrapperRef = useRef<HTMLDivElement | null>(null);
  const [videoStarted, setVideoStarted] = useState(false);
  const handlePlayClick = () => {
    if (videoRef.current) {
      // Only seek to 1s for the initial play; otherwise continue where paused
      try {
        if (videoRef.current.currentTime < 0.5) {
          videoRef.current.currentTime = 1;
        }
      } catch {}
      videoRef.current.play();
      setVideoStarted(true);
    }
  };

  const handleLoadedMetadata = () => {
    // Ensure initial frame/time starts at 1s even with native controls
    if (videoRef.current) {
      try { videoRef.current.currentTime = 1; } catch {}
      // Force captions visible by default
      try {
        const tracks = videoRef.current.textTracks;
        if (tracks && tracks[0]) {
          tracks[0].mode = 'showing';
        }
      } catch {}
    }
  };

  // Pause when clicking anywhere outside the video wrapper
  useEffect(() => {
    const handleDocumentClick = (e: MouseEvent) => {
      const wrapper = videoWrapperRef.current;
      if (wrapper && !wrapper.contains(e.target as Node)) {
        const el = videoRef.current;
        if (el && !el.paused) {
          try { el.pause(); } catch {}
        }
        setVideoStarted(false);
      }
    };
    document.addEventListener('click', handleDocumentClick);
    return () => document.removeEventListener('click', handleDocumentClick);
  }, []);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formType === 'coaching') {
      // Lead to payment step for coaching
      setShowForm(false);
      setShowPayment(true);
      setPaymentBooked(false);
    } else {
      // Immediate confirmation for other flows
      setShowForm(false);
      setShowConfirmation(true);
      setFormData({ name: '', email: '', experience: '' });
    }
  };

  const openForm = (type: string) => {
    setFormType(type);
    setShowForm(true);
  };

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      // no toast system; silent success
    } catch {}
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 to-green-50">
      {/* Sticky Navbar */}
      <header className="sticky top-0 z-50 bg-white/70 backdrop-blur-md border-b border-rose-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          {/* Brand */}
          <a href="#hero" className="flex items-center gap-3">
            <img src="/logo.png" alt="Logo" className="w-56 h-56 object-contain" />
          </a>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8 text-gray-700">
            <a href="#hero" className="hover:text-rose-500 transition-colors">Home</a>
            <a href="#video" className="hover:text-rose-500 transition-colors">Video</a>
            <a href="#about" className="hover:text-rose-500 transition-colors">About</a>
            <a href="#offers" className="hover:text-rose-500 transition-colors">Programs</a>
            <a href="#contact" className="hover:text-rose-500 transition-colors">Contact</a>
            <button onClick={() => openForm('discovery')} className="ml-2 bg-rose-400 hover:bg-rose-500 text-white px-4 py-2 rounded-full text-sm font-medium transition-all shadow-md hover:shadow-lg">
              Book Free Call
            </button>
          </nav>

          {/* Mobile toggle */}
          <button onClick={() => setNavOpen(!navOpen)} className="md:hidden p-2 rounded-lg bg-white/60 hover:bg-white/80 border border-rose-100" aria-label="Toggle menu">
            {navOpen ? <X className="w-6 h-6 text-gray-700" /> : <Menu className="w-6 h-6 text-gray-700" />}
          </button>
        </div>

        {/* Mobile menu */}
        {navOpen && (
          <div className="md:hidden border-t border-rose-100 bg-white/80 backdrop-blur">
            <div className="max-w-7xl mx-auto px-4 py-3 flex flex-col gap-3 text-gray-700">
              <a href="#hero" onClick={() => setNavOpen(false)} className="py-2 hover:text-rose-500">Home</a>
              <a href="#video" onClick={() => setNavOpen(false)} className="py-2 hover:text-rose-500">Video</a>
              <a href="#about" onClick={() => setNavOpen(false)} className="py-2 hover:text-rose-500">About</a>
              <a href="#offers" onClick={() => setNavOpen(false)} className="py-2 hover:text-rose-500">Programs</a>
              <a href="#contact" onClick={() => setNavOpen(false)} className="py-2 hover:text-rose-500">Contact</a>
              <button onClick={() => { setNavOpen(false); openForm('discovery'); }} className="mt-2 bg-rose-400 hover:bg-rose-500 text-white px-4 py-2 rounded-full text-sm font-medium transition-all shadow">
                Book Free Call
              </button>
            </div>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section id="hero" className="relative overflow-hidden bg-gradient-to-r from-pink-50 via-orange-50 to-green-50 py-20 min-h-screen flex flex-col justify-center">
        <div className="absolute inset-0 bg-white/10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-800 mb-6 leading-tight">
                Find Your Way Forward
                <span className="block text-rose-500">After Divorce</span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-600 mb-8 font-light">
                Heal your heart, reclaim your strength, and create a life you love.
              </p>
              <button 
                onClick={() => openForm('discovery')}
                className="bg-rose-400 hover:bg-rose-500 text-white px-8 py-4 rounded-full text-lg font-medium transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                Book Your Free 15-Min Discovery Call
              </button>
            </div>
            <div className="flex justify-center">
              <div className="relative">
                <img 
                  src="https://images.pexels.com/photos/3182826/pexels-photo-3182826.jpeg?auto=compress&cs=tinysrgb&w=500"
                  alt="Olga - Healing & Divorce Coach" 
                  className="w-80 h-96 object-cover rounded-3xl shadow-2xl"
                />
                <div className="absolute -bottom-6 -right-6 bg-yellow-200 p-4 rounded-full shadow-lg">
                  <Heart className="w-8 h-8 text-rose-500" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Video + Intro Section */}
      <section id="video" className="relative overflow-hidden bg-gradient-to-r from-pink-50 via-orange-50 to-green-50 py-20 min-h-screen flex flex-col justify-center">
        <div className="absolute inset-0 bg-white/10"></div>
        <div className="relative max-w-7xl mx-auto h-full px-4 sm:px-6 lg:px-8">
          {/* Intro Text */}
          <div className="max-w-4xl mx-auto text-center mb-12">
            <div className="bg-white/60 backdrop-blur-sm p-8 rounded-2xl shadow-lg">
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                Feeling like your life is on pause after divorce? I know that feeling of being stuck, of a future that feels uncertain and a past that's too painful to revisit. But I also know what it's like to find your way forward.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                I'm Olga — and I guide women just like you through heartbreak, helping you rediscover your strength so you can build a life you're excited to wake up to.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                Let's connect for a free 15-minute call. No pressure — just a conversation about where you are and how I can help you take your next step.
              </p>
            </div>
          </div>

          {/* Video Section */}
          <div className="text-center">
            <div className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-lg max-w-4xl mx-auto">
              <h3 className="text-2xl font-semibold text-gray-800 mb-6">Watch Olga's Healing Message</h3>
              <div className="relative w-full overflow-hidden rounded-xl shadow-md">
                {/* Video */}
                <video
                  ref={videoRef}
                  className="w-full"
                  controls
                  playsInline
                  preload="metadata"
                  onLoadedMetadata={handleLoadedMetadata}
                  onPlay={() => setVideoStarted(true)}
                  onPause={() => setVideoStarted(false)}
                >
                  <source src="/media/videos/THING THAT I WISH I WAS TOLD [Y_CDqJVr7Tk].mp4" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>

                {/* Overlay play button (shown until play) */}
                {!videoStarted && (
                  <button
                    onClick={handlePlayClick}
                    aria-label="Play video"
                    className="absolute inset-0 grid place-items-center bg-gradient-to-r from-pink-50/80 via-orange-50/80 to-green-50/80 backdrop-blur-sm transition-opacity duration-300"
                  >
                    <span className="inline-flex items-center gap-3 bg-gradient-to-r from-rose-400 via-orange-400 to-green-400 text-white px-6 py-3 rounded-full shadow-lg hover:shadow-xl transform hover:scale-105">
                      <Play className="w-5 h-5" />
                      <span className="font-semibold">Watch Video</span>
                    </span>
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Three Core Offers */}
      <section id="offers" className="py-20 bg-white/50 min-h-screen flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-16">
            Your Path to Healing & Transformation
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {/* First Offer */}
            <div className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-rose-100">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-rose-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Calendar className="w-8 h-8 text-rose-500" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-4">Free 15-Min Discovery Call</h3>
              </div>
              <p className="text-gray-600 leading-relaxed mb-6">
                No pressure — just a conversation about where you are and how I can help you take your next step toward healing and strength.
              </p>
              <button 
                onClick={() => openForm('discovery')}
                className="w-full bg-rose-400 hover:bg-rose-500 text-white py-3 px-6 rounded-full font-medium transition-all duration-300"
              >
                Book Now
              </button>
            </div>

            {/* Second Offer */}
            <div className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-green-100">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Download className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-4">Free Guide Journal</h3>
                <p className="text-rose-500 font-semibold">The Heart Healing: 7 Days to Reclaim Your Power</p>
              </div>
              <p className="text-gray-600 leading-relaxed mb-6">
                Ready to mend your heart and step back into your strength? Our FREE guide journal walks with you for one week — with actionable steps and reflective prompts to help you heal and reconnect with your inner power.
              </p>
              <p className="text-sm text-gray-500 mb-6 italic">
                Get your copy instantly — just send us your email and type: "I'M READY TO MOVE ON".
              </p>
              <button 
                onClick={() => openForm('guide')}
                className="w-full bg-green-500 hover:bg-green-600 text-white py-3 px-6 rounded-full font-medium transition-all duration-300"
              >
                Download Now
              </button>
            </div>

            {/* Third Offer */}
            <div className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-yellow-100">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Star className="w-8 h-8 text-yellow-500" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-4">Limitless Life Design™</h3>
                <p className="text-yellow-600 font-semibold">Private Coaching • $140 for 40 minutes</p>
              </div>
              <p className="text-gray-600 leading-relaxed mb-4">
                Ideal for post-divorce, midlife, or career pivot. Transform your life with personalized guidance.
              </p>
              <ul className="text-sm text-gray-600 mb-6 space-y-2">
                <li>• Positive mindset + brain optimization</li>
                <li>• Goal alignment & custom strategies</li>
                <li>• Identity elevation & life vision planning</li>
              </ul>
              <button 
                onClick={() => openForm('coaching')}
                className="w-full bg-yellow-500 hover:bg-yellow-600 text-white py-3 px-6 rounded-full font-medium transition-all duration-300"
              >
                Start Your Transformation
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* About Me Section */}
      <section
        id="about"
        className="lg:px-32 lg:pb-8 md:px-12 sm:px-0 py-28"
        style={{ color: 'rgb(69, 74, 79)', backgroundColor: 'rgb(249, 240, 231)' }}
      >
        <div className="mx-auto lg:block">
          {/* Image moved above the content and made bigger */}
          <div className="w-full flex justify-center mb-10 px-4">
            <img
              src="https://cdn.filestackcontent.com/resize=fit:clip,width:1400/bYX9BuN6RGCxkswlQzqr"
              alt="Olga Binyaminov practicing Mindset coaching and NLP (neuro-linguistic programming) in Albertson, NY"
              className="w-full max-w-5xl md:max-w-4xl lg:max-w-3xl rounded-2xl object-cover transition-all duration-[1500ms]"
              loading="lazy"
            />
          </div>
          <div
            className="p-10 transition-all duration-[1500ms] md:px-5 mx-auto max-w-4xl"
            style={{ backgroundColor: 'rgb(250, 249, 249)' }}
          >
            <h2
              className="text-[40px] leading-[48px] lg:text-[27px] lg:leading-loose md:text-center"
              style={{ fontFamily: '"Playfair Display", serif', fontWeight: 700 }}
            >
              About me
            </h2>
            <div className="mt-10 space-y-4 leading-relaxed">
              <p>
                Hi, I’m Olga, founder of <em>Unbreakable You</em>. For over 20 years, I’ve been an educator,
                mentor, and coach, guiding people of all ages to discover their inner strength and reach their
                full potential.
              </p>
              <p>
                My path into healing work became deeply personal during a challenging life transition—navigating the pain of divorce and rebuilding my life from the ground up. I took the mess of that season and turned it into a message: <strong>you are stronger than you know, and your healing is possible.</strong>
              </p>
              <p>Drawing from my background as a college professor, business owner, and coach, I use a unique blend of:</p>
              <ul className="list-disc pl-5 space-y-2">
                <li>
                  <strong>Mindset coaching &amp; NLP (neuro-linguistic programming)</strong>
                </li>
                <li>
                  <strong>Guided meditation, journaling, and visualization practices</strong>
                </li>
                <li>
                  <strong>Personalized support and accountability</strong>
                </li>
              </ul>
              <p>
                I specialize in helping women move through heartbreak, life transitions, and self-doubt so they can create the lives they truly desire. My coaching style is warm, honest, and action-oriented—I’ll walk alongside you with compassion while giving you the tools and structure to move forward.
              </p>
              <p>
                When I’m not working with clients, you can find me creating empowering content for my YouTube channel and podcast or spending time with my son, who inspires me every day.
              </p>
              <p className="text-justify">
                <strong>
                  If you’re ready to release the pain of the past and rediscover your unbreakable self, I would love to support you.
                </strong>
              </p>
            </div>
            <button
              onClick={() => openForm('discovery')}
              className="mb-10 mt-6 w-fit rounded px-6 py-3 transition duration-150 ease-out sm:w-full bg-rose-400 hover:bg-rose-500 text-white shadow-md hover:shadow-lg"
            >
              Book Your Free Discovery Call
            </button>
            <div className="healme-widget" />
            <div className="p-6 mt-6 rounded-xl" style={{ backgroundColor: 'rgb(255, 255, 255)' }}>
              <div className="grid gap-4 grid-cols-2 lg:grid-cols-1">
                <div className="flex items-start gap-2">
                  {/* Inline icon SVG to match provided markup */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    aria-hidden="true"
                    className="h-6 w-6 flex-none text-gray-700"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z"
                    />
                  </svg>
                  <div>
                    <span className="border-b-2 border-dashed border-gray-300">Bachelor of Arts / Master of Arts</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="bg-[rgb(242,212,209)] text-[rgb(var(--color-black)/var(--tw-text-opacity))] py-16 min-h-[50vh] flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Top row: left name/subtitle, right nav + button */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            {/* Left: Name + subtitle */}
            <div className="text-left">
              <h3 className="text-xl font-bold">Olga Binyaminov</h3>
              <p className="text-sm">Healing and Empowerment Coach</p>
            </div>

            {/* Right: nav links + button */}
            <div className="flex items-center gap-6">
              <nav className="hidden sm:flex items-center gap-6">
                <a href="#hero" className="hover:opacity-70">About</a>
                <a href="#offers" className="hover:opacity-70">Services</a>
                <a href="#video" className="hover:opacity-70">Reviews</a>
                <a href="#contact" className="hover:opacity-70">Credentials</a>
              </nav>
              <button onClick={() => openForm('discovery')} className="px-5 py-2 rounded-lg border border-[rgb(var(--color-black)/0.4)] hover:bg-black/5 transition-colors">
                Book Now
              </button>
            </div>
          </div>

          {/* Social icons centered */}
          <div className="mt-10 flex justify-center gap-6">
            <a href="https://www.instagram.com/unbreakable_you_official/?igsh=YmswZmJvamhyc3g0&utm_source=qr#" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="transition-opacity hover:opacity-70">
              <Instagram className="w-6 h-6" />
            </a>
            <a href="https://www.facebook.com/olganyc21?mibextid=wwXIfr&rdid=pWD9E3z4WcP4hvZX&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F1Ccp93Bk95%2F%3Fmibextid%3DwwXIfr#" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="transition-opacity hover:opacity-70">
              <Facebook className="w-6 h-6" />
            </a>
            <a href="https://www.tiktok.com/@exceedlearningcenter?_t=ZP-8yQvgIEYenH&_r=1" target="_blank" rel="noopener noreferrer" aria-label="TikTok" className="transition-opacity hover:opacity-70">
              <Play className="w-6 h-6" />
            </a>
            <a href="https://www.linkedin.com/in/olga-binyaminov-5b163b6/?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="transition-opacity hover:opacity-70">
              <Linkedin className="w-6 h-6" />
            </a>
            <a href="https://www.youtube.com/@unbreakable-you-official" target="_blank" rel="noopener noreferrer" aria-label="YouTube" className="transition-opacity hover:opacity-70">
              <Youtube className="w-6 h-6" />
            </a>
          </div>

          <div className="border-t border-black/20 mt-12 pt-8 text-center text-sm">
            <p>&copy; 2025 Olga Healing Coach. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 relative">
            <button 
              onClick={() => setShowForm(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
            >
              <X className="w-6 h-6" />
            </button>
            
            <h3 className="text-2xl font-bold text-gray-800 mb-6">
              {formType === 'discovery' && 'Book Your Free Discovery Call'}
              {formType === 'guide' && 'Download Your Free Guide'}
              {formType === 'coaching' && 'Start Your Transformation'}
            </h3>
            
            <form onSubmit={handleFormSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Full Name (optional)</label>
                <input 
                  type="text" 
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-400 focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                <input 
                  type="email" 
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-400 focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {formType === 'guide' ? 'Type: "I\'M READY TO MOVE ON"' : 'Tell me briefly about your experience'}
                </label>
                <textarea 
                  required
                  value={formData.experience}
                  onChange={(e) => setFormData({...formData, experience: e.target.value})}
                  rows={3}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-400 focus:border-transparent"
                />
              </div>
              
              {formType === 'coaching' && (
                <div className="bg-yellow-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-700">
                    <strong>Payment:</strong> After you submit, you'll be taken to a screen with Zelle payment instructions for ${COACHING_AMOUNT}.
                  </p>
                </div>
              )}
              
              <button 
                type="submit"
                className="w-full bg-rose-400 hover:bg-rose-500 text-white py-3 px-6 rounded-lg font-medium transition-all duration-300"
              >
                {formType === 'discovery' && 'Book My Call'}
                {formType === 'guide' && 'Download Guide'}
                {formType === 'coaching' && 'Continue to Payment'}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Payment Modal (Coaching via Zelle) */}
      {showPayment && formType === 'coaching' && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 relative">
            <button 
              onClick={() => setShowPayment(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
            >
              <X className="w-6 h-6" />
            </button>

            <h3 className="text-2xl font-bold text-gray-800 mb-2">Zelle Payment</h3>
            <p className="text-gray-600 mb-4">Please send your payment to secure your session.</p>

            <div className="space-y-3 text-sm">
              <div className="flex items-center justify-between bg-gray-50 border rounded-lg p-3">
                <div>
                  <p className="text-gray-500">Amount</p>
                  <p className="font-semibold">${COACHING_AMOUNT}.00</p>
                </div>
              </div>
              <div className="bg-gray-50 border rounded-lg p-3">
                <p className="text-gray-500">Recipient Name</p>
                <div className="flex items-center justify-between">
                  <p className="font-semibold mr-3 truncate">{ZELLE_RECIPIENT_NAME}</p>
                  <button onClick={() => copyToClipboard(ZELLE_RECIPIENT_NAME)} className="p-2 hover:bg-white rounded-md border">
                    <Copy className="w-4 h-4" />
                  </button>
                </div>
              </div>
              <div className="bg-gray-50 border rounded-lg p-3">
                <p className="text-gray-500">Zelle Email</p>
                <div className="flex items-center justify-between">
                  <p className="font-semibold mr-3 truncate">{ZELLE_RECIPIENT_EMAIL}</p>
                  <button onClick={() => copyToClipboard(ZELLE_RECIPIENT_EMAIL)} className="p-2 hover:bg-white rounded-md border">
                    <Copy className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            <div className="mt-6 space-y-3 text-sm text-gray-600">
              <p>1) Open your banking app and choose Zelle.</p>
              <p>2) Send ${COACHING_AMOUNT} to the email above.</p>
              <p>3) Return and confirm payment to finalize your booking.</p>
            </div>

            <button
              onClick={() => { setShowPayment(false); setShowConfirmation(true); setPaymentBooked(true); setFormData({ name: '', email: '', experience: '' }); }}
              className="mt-6 w-full bg-rose-500 hover:bg-rose-600 text-white py-3 px-6 rounded-lg font-medium transition-all"
            >
              I've paid via Zelle
            </button>
          </div>
        </div>
      )}

      {/* Confirmation Modal */}
      {showConfirmation && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 text-center">
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-gray-800 mb-4">{formType === 'coaching' && paymentBooked ? 'Booked!' : 'Thank You!'}</h3>
            <p className="text-gray-600 mb-6">
              Your request has been submitted successfully! 
              {formType === 'discovery' && (
                <>
                  <br /><br />
                  <strong>Next Steps:</strong>
                  <br />• You'll receive a calendar link via email to book your free 15-minute call
                  <br />• Choose a time that works best for you
                  <br />• We'll connect and discuss your healing journey
                </>
              )}
              {formType === 'guide' && (
                <>
                  <br /><br />
                  <strong>Next Steps:</strong>
                  <br />• Check your email for the download link to "The Heart Healing: 7 Days to Reclaim Your Power"
                  <br />• Start your 7-day healing journey today
                </>
              )}
              {formType === 'coaching' && (
                <>
                  <br /><br />
                  <strong>Next Steps:</strong>
                  {paymentBooked ? (
                    <>
                      <br />• Your payment has been marked as sent.
                      <br />• You'll receive a calendar link by email to book your 40-minute Limitless Life Design™ session.
                      <br />• Prepare to transform your life!
                    </>
                  ) : (
                    <>
                      <br />• You'll receive Zelle payment instructions shortly ($${COACHING_AMOUNT})
                      <br />• After payment, you'll get a calendar link to book your session
                    </>
                  )}
                </>
              )}
            </p>
            <button 
              onClick={() => setShowConfirmation(false)}
              className="bg-rose-400 hover:bg-rose-500 text-white py-2 px-6 rounded-lg font-medium transition-all duration-300"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;