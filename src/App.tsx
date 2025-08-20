import React, { useRef, useState } from 'react';
import { Heart, Star, Calendar, Download, ArrowRight, Mail, Phone, Instagram, Facebook, CheckCircle, X, Play } from 'lucide-react';

function App() {
  const [showForm, setShowForm] = useState(false);
  const [formType, setFormType] = useState('');
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    experience: ''
  });

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [videoStarted, setVideoStarted] = useState(false);
  const handlePlayClick = () => {
    if (videoRef.current) {
      videoRef.current.play();
      setVideoStarted(true);
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowForm(false);
    setShowConfirmation(true);
    setFormData({ name: '', email: '', experience: '' });
  };

  const openForm = (type: string) => {
    setFormType(type);
    setShowForm(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 to-green-50">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-r from-pink-50 via-orange-50 to-green-50 py-20 min-h-screen flex flex-col justify-center">
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
      <section className="relative overflow-hidden bg-gradient-to-r from-pink-50 via-orange-50 to-green-50 py-20 min-h-screen flex flex-col justify-center">
        <div className="absolute inset-0 bg-white/10"></div>
        <div className="relative max-w-7xl mx-auto h-full px-4 sm:px-6 lg:px-8">
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
                  poster="https://img.youtube.com/vi/Y_CDqJVr7Tk/hqdefault.jpg"
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

          {/* Intro Text */}
          <div className="mt-16 max-w-4xl mx-auto text-center">
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
        </div>
      </section>

      {/* Three Core Offers */}
      <section className="py-20 bg-white/50 min-h-screen flex items-center">
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

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-16 min-h-screen flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8 items-center">
            <div className="text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start mb-4">
                <img 
                  src="https://images.pexels.com/photos/3182826/pexels-photo-3182826.jpeg?auto=compress&cs=tinysrgb&w=100"
                  alt="Olga" 
                  className="w-12 h-12 rounded-full mr-3"
                />
                <h3 className="text-2xl font-bold">Olga</h3>
              </div>
              <p className="text-gray-300">Healing & Divorce Coach</p>
            </div>
            
            <div className="text-center">
              <p className="text-lg font-medium mb-4 text-rose-300">
                "You don't have to navigate this alone. Let's walk this path together."
              </p>
            </div>
            
            <div className="text-center md:text-right">
              <div className="flex justify-center md:justify-end space-x-4 mb-4">
                <Mail className="w-6 h-6 text-rose-300 hover:text-rose-200 cursor-pointer transition-colors" />
                <Phone className="w-6 h-6 text-rose-300 hover:text-rose-200 cursor-pointer transition-colors" />
                <Instagram className="w-6 h-6 text-rose-300 hover:text-rose-200 cursor-pointer transition-colors" />
                <Facebook className="w-6 h-6 text-rose-300 hover:text-rose-200 cursor-pointer transition-colors" />
              </div>
              <p className="text-gray-300">Connect & Follow</p>
            </div>
          </div>
          
          <div className="border-t border-gray-700 mt-12 pt-8 text-center">
            <p className="text-gray-400">&copy; 2025 Olga Healing Coach. All rights reserved.</p>
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
                <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                <input 
                  type="text" 
                  required
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
                    <strong>Payment:</strong> After submitting, you'll receive Zelle payment instructions for $140.
                  </p>
                </div>
              )}
              
              <button 
                type="submit"
                className="w-full bg-rose-400 hover:bg-rose-500 text-white py-3 px-6 rounded-lg font-medium transition-all duration-300"
              >
                {formType === 'discovery' && 'Book My Call'}
                {formType === 'guide' && 'Download Guide'}
                {formType === 'coaching' && 'Submit & Get Payment Info'}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Confirmation Modal */}
      {showConfirmation && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 text-center">
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Thank You!</h3>
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
                  <br />• You'll receive Zelle payment instructions via email ($140)
                  <br />• After payment confirmation, you'll get a calendar link to book your 40-minute Limitless Life Design™ session
                  <br />• Prepare to transform your life!
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