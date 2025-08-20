"use client";
import React, { useState } from 'react';
import { Search, MapPin, Clock, CheckCircle, Users, FileText, Building2, Phone, Mail, Shield, Star, TrendingUp, Award, Lightbulb, MessageSquare, AlertTriangle } from 'lucide-react';
import ReportCase from '@/components/dashboard/reportCase';
import Link from 'next/link';
import Logo from '@/components/ui/logo';
import { Input } from '@/components/ui/input';
import TrackCase from '@/components/dashboard/trackCase';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

export default function CommunityComplaintSystem() {
  const [caseId, setCaseId] = useState("");
const [recordId, setRecordId] = useState("");
  const handleTrackCase = () => {
    if (!caseId.trim()) {
      alert("Please enter a valid case reference number");
      return;
    }
    alert(`Tracking case: ${caseId}`);
  };

  const handleReportIssue = () => {
    alert("Report Issue form would open here");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-md sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="bg-blue-600 text-white p-2 rounded-lg">
              <Building2 size={24} />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-800">CivicConnect</h1>
              <p className="text-xs text-gray-500">Community Management Platform</p>
            </div>
          </div>
          <div className="flex items-center justify-center space-x-3">
             {/* <nav className="flex flex-row items-center gap-x-4">
                      <Link href="#" className="px-2 cursor-pointer hover:scale-105 transform transition-transform duration-300"><Logo /></Link>
                    </nav> */}
                    <div className="flex flex-row gap-x-2">
                      <Link href="/auth/sign-in" className='border p-2 px-5 mr-2 rounded-md'>Sign In</Link>
                      <ReportCase />
                    </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
          <div className="absolute top-40 right-20 w-72 h-72 bg-indigo-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-1000"></div>
          <div className="absolute bottom-20 left-1/2 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-2000"></div>
        </div>
        
        <div className="relative container mx-auto px-4 py-20">
          <div className="max-w-4xl mx-auto text-center">
            <div className="mb-6">
              <span className="inline-flex items-center px-4 py-2 bg-blue-600 bg-opacity-20 backdrop-blur-sm rounded-full text-sm font-medium mb-6">
                <Shield className="w-4 h-4 mr-2" />
                Trusted by 200+ Councils Nationwide
              </span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              <span className="bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
                Your Voice,
              </span>
              <br />
              <span className="bg-gradient-to-r from-blue-200 to-white bg-clip-text text-transparent">
                Our Priority
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-blue-100 mb-8 leading-relaxed max-w-3xl mx-auto">
              Streamline community feedback with our intelligent complaint management system. 
              Connect citizens with local government for faster, more effective resolutions.
            </p>

            {/* Case Tracking */}
               <div className="flex flex-row items-center gap-x-1 my-4 px-4">
                  <Input
                    type="text"
                    placeholder="Enter Case Reference Code..."
                    onChange={(e) => setRecordId(e.target.value)}
                    className="hover:shadow-md focus:shadow-lg transition-shadow duration-300"
                  />
                  {recordId.length > 0 ? (
                    <TrackCase recordId={recordId} />
                  ) : (
                    <Button onClick={() => toast.error("Please enter case reference id")}>Track Case</Button>
                  )}
                </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-2xl mx-auto">
              {[
                { number: "15K+", label: "Cases Resolved" },
                { number: "98%", label: "Satisfaction Rate" },
                { number: "24hrs", label: "Avg Response" },
                { number: "200+", label: "Active Councils" }
              ].map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-2xl md:text-3xl font-bold text-blue-200">{stat.number}</div>
                  <div className="text-sm text-blue-300">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Dashboard Preview */}
      <section className="py-16 relative">
        <div className="container mx-auto px-4">
          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden transform hover:scale-105 transition-transform duration-500">
            <div className="bg-gradient-to-r from-gray-900 to-gray-800 px-6 py-4 flex items-center space-x-2">
              <div className="flex space-x-2">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              </div>
              <div className="flex-1 text-center text-gray-300 text-sm">CivicConnect Dashboard</div>
            </div>
            
            {/* Mock Dashboard */}
            <div className="p-8 bg-gradient-to-br from-blue-50 to-indigo-50">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-blue-500">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-600 text-sm">Active Cases</p>
                      <p className="text-3xl font-bold text-gray-800">247</p>
                    </div>
                    <div className="bg-blue-100 p-3 rounded-full">
                      <FileText className="w-6 h-6 text-blue-600" />
                    </div>
                  </div>
                </div>
                
                <div className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-green-500">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-600 text-sm">Resolved Today</p>
                      <p className="text-3xl font-bold text-gray-800">18</p>
                    </div>
                    <div className="bg-green-100 p-3 rounded-full">
                      <CheckCircle className="w-6 h-6 text-green-600" />
                    </div>
                  </div>
                </div>
                
                <div className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-orange-500">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-600 text-sm">Avg Response</p>
                      <p className="text-3xl font-bold text-gray-800">6h</p>
                    </div>
                    <div className="bg-orange-100 p-3 rounded-full">
                      <Clock className="w-6 h-6 text-orange-600" />
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Mock Map */}
              <div className="bg-white p-4 rounded-xl shadow-sm">
                <div className="h-64 bg-gradient-to-br from-green-200 to-blue-200 rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <MapPin className="w-12 h-12 text-blue-600 mx-auto mb-2" />
                    <p className="text-gray-600">Interactive Community Map</p>
                    <p className="text-sm text-gray-500">Real-time issue tracking</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
              Powerful Features for Modern Communities
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Everything you need to manage community feedback effectively and build stronger citizen-government relationships.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <MessageSquare className="w-8 h-8" />,
                title: "Smart Case Management",
                description: "AI-powered categorization and routing ensures every complaint reaches the right department instantly.",
                color: "blue"
              },
              {
                icon: <MapPin className="w-8 h-8" />,
                title: "Location-Based Tracking",
                description: "GPS integration and interactive maps help pinpoint issues for faster, more accurate responses.",
                color: "green"
              },
              {
                icon: <Clock className="w-8 h-8" />,
                title: "Real-Time Updates",
                description: "Automated notifications keep citizens informed at every step of the resolution process.",
                color: "purple"
              },
              {
                icon: <TrendingUp className="w-8 h-8" />,
                title: "Analytics & Insights",
                description: "Data-driven dashboards help councils identify trends and improve service delivery.",
                color: "orange"
              },
              {
                icon: <Users className="w-8 h-8" />,
                title: "Multi-Channel Support",
                description: "Accept complaints via web, mobile app, email, or phone - all in one unified system.",
                color: "red"
              },
              {
                icon: <Award className="w-8 h-8" />,
                title: "Compliance Ready",
                description: "Built-in audit trails and reporting ensure compliance with local government standards.",
                color: "indigo"
              }
            ].map((feature, index) => (
              <div key={index} className="group">
                <div className="bg-gray-50 rounded-2xl p-8 h-full transition-all duration-300 hover:shadow-xl hover:-translate-y-2 hover:bg-white">
                  <div className={`inline-flex p-3 rounded-xl bg-${feature.color}-100 text-${feature.color}-600 mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-4">{feature.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Transform Your Community?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
            Join hundreds of councils already using CivicConnect to build better relationships with their communities.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-4 bg-white text-blue-600 rounded-xl font-semibold hover:bg-gray-100 transition-colors">
              Schedule Demo
            </button>
            <button className="px-8 py-4 border-2 border-white text-white rounded-xl font-semibold hover:bg-white hover:text-blue-600 transition-colors">
              Learn More
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="bg-blue-600 text-white p-2 rounded-lg">
                  <Building2 size={20} />
                </div>
                <span className="text-white font-bold text-lg">CivicConnect</span>
              </div>
              <p className="text-gray-400 leading-relaxed">
                Empowering communities through better communication and efficient complaint resolution.
              </p>
            </div>
            
            <div>
              <h3 className="text-white font-semibold mb-4">Product</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Features</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Pricing</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Security</a></li>
                <li><a href="#" className="hover:text-white transition-colors">API</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-white font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Documentation</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Status</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-white font-semibold mb-4">Contact</h3>
              <div className="space-y-3 text-gray-400">
                <div className="flex items-center space-x-3">
                  <Phone size={16} />
                  <span>1-800-CIVIC-01</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Mail size={16} />
                  <span>hello@civicconnect.com</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2025 CivicConnect. All rights reserved. Built for communities, by community advocates.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}