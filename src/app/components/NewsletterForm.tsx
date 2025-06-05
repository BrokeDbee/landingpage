'use client';

import { useState } from 'react';

export default function NewsletterForm() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    studentId: '',
    program: '',
    consent: false
  });

  const [status, setStatus] = useState<{
    type: 'idle' | 'loading' | 'success' | 'error';
    message: string;
  }>({
    type: 'idle',
    message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus({ type: 'loading', message: 'Subscribing...' });

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setStatus({
        type: 'success',
        message: 'Thank you for subscribing to our newsletter!'
      });
      
      // Reset form
      setFormData({
        fullName: '',
        email: '',
        studentId: '',
        program: '',
        consent: false
      });
    } catch (error) {
      setStatus({
        type: 'error',
        message: 'Failed to subscribe. Please try again.'
      });
    }
  };

  return (
    <section className="py-20 bg-primary text-white">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-4">Stay Updated</h2>
          <p className="text-xl mb-8">
            Subscribe to our newsletter to receive important updates, upcoming events, and latest news directly in your inbox.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="Full Name"
                required
                className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50"
              />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email Address"
                required
                className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                name="studentId"
                value={formData.studentId}
                onChange={handleChange}
                placeholder="Student ID"
                required
                className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50"
              />
              <select
                name="program"
                value={formData.program}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50"
              >
                <option value="">Select Your Program</option>
                <option value="undergraduate">Undergraduate</option>
                <option value="graduate">Graduate</option>
                <option value="phd">PhD</option>
              </select>
            </div>
            <div className="flex items-center justify-center gap-2 text-sm">
              <input
                type="checkbox"
                name="consent"
                checked={formData.consent}
                onChange={handleChange}
                required
                className="rounded border-white/20 bg-white/10"
              />
              <label>
                I agree to receive newsletters and updates from Knutsford University SRC
              </label>
            </div>
            <button
              type="submit"
              disabled={status.type === 'loading'}
              className="w-full bg-white text-primary hover:bg-gray-100 font-bold py-3 px-8 rounded-lg transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {status.type === 'loading' ? 'Subscribing...' : 'Subscribe Now'}
            </button>
          </form>

          {status.type !== 'idle' && (
            <div className={`mt-4 p-4 rounded-lg ${
              status.type === 'success' ? 'bg-green-500/20' :
              status.type === 'error' ? 'bg-red-500/20' :
              'bg-white/20'
            }`}>
              {status.message}
            </div>
          )}

          <p className="text-sm mt-4 text-white/70">
            By subscribing, you'll receive updates about:
            <ul className="list-disc list-inside mt-2">
              <li>Important announcements and news</li>
              <li>Upcoming events and activities</li>
              <li>Student welfare initiatives</li>
              <li>Academic updates and opportunities</li>
            </ul>
          </p>
        </div>
      </div>
    </section>
  );
} 