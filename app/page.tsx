"use client"

import { useState, useEffect, useRef } from "react"
import { MessageCircle, BotMessageSquare, X, Send, Phone, Mail, MapPin, Users, Shield, Heart, FileText } from "lucide-react"

export default function ACSWebsite() {
  const [isChatOpen, setIsChatOpen] = useState(false)
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hello! I'm here to help you with information about ACS services. How can I assist you today?",
      sender: "bot",
      timestamp: new Date(),
    },
  ])
  const [inputValue, setInputValue] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [loadingText, setLoadingText] = useState("")
  const messagesEndRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = async (e) => {
    e.preventDefault()

    if (!inputValue.trim() || isTyping) return

    const userMessage = {
      id: Date.now(),
      text: inputValue.trim(),
      sender: "user",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputValue("")
    setIsTyping(true)

    // Loading text progression
    const loadingStates = [
      "Processing your question...",
      "Analyzing your request...",
      "Fetching relevant information...",
      "Preparing response..."
    ]

    let currentStateIndex = 0
    const loadingInterval = setInterval(() => {
      setLoadingText(loadingStates[currentStateIndex])
      currentStateIndex = (currentStateIndex + 1) % loadingStates.length
    }, 1000)

    try {
      const response = await fetch("http://127.0.0.1:8000/api/faq", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ question: userMessage.text }),
      })

      const data = await response.json()

      const botMessage = {
        id: Date.now() + 1,
        text: data.answer || "I apologize, but I couldn't find a specific answer to your question. Please feel free to contact our support team directly for personalized assistance.",
        sender: "bot",
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, botMessage])
    } catch (error) {
      const errorMessage = {
        id: Date.now() + 1,
        text: "I'm temporarily unable to process your request. Please try again in a moment, or contact our support team directly at 1-800-342-3720.",
        sender: "bot",
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, errorMessage])
    } finally {
      clearInterval(loadingInterval)
      setIsTyping(false)
      setLoadingText("")
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage(e)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-slate-700 rounded-lg flex items-center justify-center">
                <Shield className="w-7 h-7 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-semibold text-slate-800">ACS</h1>
                <p className="text-sm text-slate-600">Administration for Children's Services</p>
              </div>
            </div>
            <nav className="hidden md:flex space-x-8">
              <a href="#services" className="text-slate-600 hover:text-slate-800 font-medium transition-colors">
                Services
              </a>
              <a href="#about" className="text-slate-600 hover:text-slate-800 font-medium transition-colors">
                About
              </a>
              <a href="#contact" className="text-slate-600 hover:text-slate-800 font-medium transition-colors">
                Contact
              </a>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-5xl md:text-6xl font-light text-slate-800 mb-8 leading-tight">
            Protecting Children,
            <span className="text-slate-600 block font-normal">Supporting Families</span>
          </h2>
          <p className="text-xl text-slate-600 mb-12 max-w-3xl mx-auto leading-relaxed">
            The NYC Administration for Children's Services is dedicated to ensuring the safety and well-being of New
            York City's children through comprehensive child welfare services, foster care, and family support programs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-slate-800 text-white px-8 py-4 rounded-lg font-medium hover:bg-slate-700 transition-colors">
              Get Help Now
            </button>
            <button className="border border-slate-300 text-slate-700 px-8 py-4 rounded-lg font-medium hover:bg-slate-50 transition-colors">
              Learn More
            </button>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h3 className="text-4xl font-light text-slate-800 mb-4">Our Services</h3>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Comprehensive support services designed to protect children and strengthen families
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-slate-50 p-8 rounded-lg border border-slate-200 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-slate-700 rounded-lg flex items-center justify-center mb-6">
                <Users className="w-6 h-6 text-white" />
              </div>
              <h4 className="text-xl font-semibold text-slate-800 mb-4">Foster Care</h4>
              <p className="text-slate-600 leading-relaxed">
                Comprehensive foster care services including recruitment, training, and ongoing support for foster
                families.
              </p>
            </div>

            <div className="bg-slate-50 p-8 rounded-lg border border-slate-200 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-slate-700 rounded-lg flex items-center justify-center mb-6">
                <Heart className="w-6 h-6 text-white" />
              </div>
              <h4 className="text-xl font-semibold text-slate-800 mb-4">Adoption Services</h4>
              <p className="text-slate-600 leading-relaxed">
                Helping create permanent, loving families through our comprehensive adoption programs and support
                services.
              </p>
            </div>

            <div className="bg-slate-50 p-8 rounded-lg border border-slate-200 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-slate-700 rounded-lg flex items-center justify-center mb-6">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <h4 className="text-xl font-semibold text-slate-800 mb-4">Child Protection</h4>
              <p className="text-slate-600 leading-relaxed">
                24/7 child protective services to ensure the safety and well-being of children throughout NYC.
              </p>
            </div>

            <div className="bg-slate-50 p-8 rounded-lg border border-slate-200 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-slate-700 rounded-lg flex items-center justify-center mb-6">
                <FileText className="w-6 h-6 text-white" />
              </div>
              <h4 className="text-xl font-semibold text-slate-800 mb-4">OSI Investigations</h4>
              <p className="text-slate-600 leading-relaxed">
                Professional investigations conducted by our Office of Special Investigations to ensure child safety.
              </p>
            </div>

            <div className="bg-slate-50 p-8 rounded-lg border border-slate-200 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-slate-700 rounded-lg flex items-center justify-center mb-6">
                <Users className="w-6 h-6 text-white" />
              </div>
              <h4 className="text-xl font-semibold text-slate-800 mb-4">Family Support</h4>
              <p className="text-slate-600 leading-relaxed">
                Comprehensive family support services including counseling, financial assistance, and educational
                resources.
              </p>
            </div>

            <div className="bg-slate-50 p-8 rounded-lg border border-slate-200 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-slate-700 rounded-lg flex items-center justify-center mb-6">
                <Heart className="w-6 h-6 text-white" />
              </div>
              <h4 className="text-xl font-semibold text-slate-800 mb-4">Juvenile Justice</h4>
              <p className="text-slate-600 leading-relaxed">
                Rehabilitation-focused juvenile justice programs aimed at family reunification and positive outcomes.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-slate-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-4xl font-light mb-6">About ACS</h3>
              <p className="text-xl mb-6 text-slate-200 leading-relaxed">
                The Administration for Children's Services (ACS) protects and promotes safety and well-being of New York
                City children and families by providing child welfare, juvenile justice, and early care and education
                services.
              </p>
              <p className="text-lg text-slate-300 leading-relaxed">
                We work with community partners to support families and ensure children have safe, stable, and nurturing
                environments where they can thrive.
              </p>
            </div>
            <div className="bg-slate-700 rounded-lg p-8 border border-slate-600">
              <h4 className="text-2xl font-semibold mb-8 text-center">Impact Overview</h4>
              <div className="grid grid-cols-2 gap-8">
                <div className="text-center">
                  <div className="text-3xl font-light text-slate-100 mb-2">24/7</div>
                  <div className="text-sm text-slate-300">Emergency Services</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-light text-slate-100 mb-2">50K+</div>
                  <div className="text-sm text-slate-300">Children Served</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-light text-slate-100 mb-2">5K+</div>
                  <div className="text-sm text-slate-300">Foster Families</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-light text-slate-100 mb-2">100+</div>
                  <div className="text-sm text-slate-300">Community Partners</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h3 className="text-4xl font-light text-slate-800 mb-4">Contact Us</h3>
            <p className="text-xl text-slate-600">We're here to help 24/7</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-8 bg-slate-50 rounded-lg border border-slate-200">
              <div className="w-12 h-12 bg-slate-700 rounded-full flex items-center justify-center mx-auto mb-4">
                <Phone className="w-6 h-6 text-white" />
              </div>
              <h4 className="text-xl font-semibold text-slate-800 mb-2">Emergency Hotline</h4>
              <p className="text-slate-700 font-medium text-lg">1-800-342-3720</p>
              <p className="text-slate-600 text-sm mt-2">Available 24/7</p>
            </div>

            <div className="text-center p-8 bg-slate-50 rounded-lg border border-slate-200">
              <div className="w-12 h-12 bg-slate-700 rounded-full flex items-center justify-center mx-auto mb-4">
                <Mail className="w-6 h-6 text-white" />
              </div>
              <h4 className="text-xl font-semibold text-slate-800 mb-2">Email Support</h4>
              <p className="text-slate-700 font-medium">info@acs.nyc.gov</p>
              <p className="text-slate-600 text-sm mt-2">Response within 24 hours</p>
            </div>

            <div className="text-center p-8 bg-slate-50 rounded-lg border border-slate-200">
              <div className="w-12 h-12 bg-slate-700 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="w-6 h-6 text-white" />
              </div>
              <h4 className="text-xl font-semibold text-slate-800 mb-2">Main Office</h4>
              <p className="text-slate-700 font-medium">150 William St</p>
              <p className="text-slate-600 text-sm mt-2">New York, NY 10038</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-800 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="col-span-2">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-slate-600 rounded-lg flex items-center justify-center">
                  <Shield className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h5 className="text-xl font-semibold">ACS</h5>
                  <p className="text-slate-300 text-sm">Administration for Children's Services</p>
                </div>
              </div>
              <p className="text-slate-300 leading-relaxed">
                Protecting children and supporting families throughout New York City with comprehensive child welfare
                services and community partnerships.
              </p>
            </div>
            <div>
              <h6 className="font-semibold mb-4">Quick Links</h6>
              <ul className="space-y-2 text-slate-300">
                <li>
                  <a href="#services" className="hover:text-white transition-colors">
                    Services
                  </a>
                </li>
                <li>
                  <a href="#about" className="hover:text-white transition-colors">
                    About
                  </a>
                </li>
                <li>
                  <a href="#contact" className="hover:text-white transition-colors">
                    Contact
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Resources
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h6 className="font-semibold mb-4">Emergency</h6>
              <p className="text-slate-300 mb-2">Child Abuse Hotline</p>
              <p className="text-white font-medium text-lg">1-800-342-3720</p>
              <p className="text-slate-300 text-sm mt-2">Available 24/7</p>
            </div>
          </div>
          <div className="border-t border-slate-700 mt-8 pt-8 text-center text-slate-400">
            <p>&copy; 2024 NYC Administration for Children's Services. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Floating Chatbot Button */}
      <button
        onClick={() => setIsChatOpen(true)}
        className="fixed bottom-6 right-6 w-14 h-14 bg-slate-700 hover:bg-slate-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center z-50"
        aria-label="Open chat"
      >
        <BotMessageSquare className="w-6 h-6" />
      </button>

      {/* Chat Modal */}
      {isChatOpen && (
        <div className="fixed inset-0 z-50 flex items-end justify-end p-4">
          <div className="bg-white rounded-lg shadow-2xl w-full max-w-md h-[600px] flex flex-col overflow-hidden border border-slate-200">
            {/* Chat Header */}
            <div className="bg-slate-800 text-white p-4 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-slate-600 rounded-full flex items-center justify-center">
                  <BotMessageSquare className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-medium">ACS Assistant</h3>
                  <p className="text-slate-300 text-sm">Here to help</p>
                </div>
              </div>
              <button
                onClick={() => setIsChatOpen(false)}
                className="w-8 h-8 bg-slate-700 rounded-full flex items-center justify-center hover:bg-slate-600 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Chat Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
              {messages.map((message) => (
                <div key={message.id} className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`max-w-xs px-4 py-3 rounded-lg ${
                      message.sender === "user"
                        ? "bg-slate-700 text-white"
                        : "bg-white text-slate-800 border border-slate-200"
                    }`}
                  >
                    <p className="text-sm leading-relaxed">{message.text}</p>
                    <p className={`text-xs mt-2 ${message.sender === "user" ? "text-slate-300" : "text-slate-500"}`}>
                      {message.timestamp.toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  </div>
                </div>
              ))}

              {/* Enhanced Loading Indicator */}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-white border border-slate-200 rounded-lg px-4 py-3 max-w-xs">
                    <div className="flex items-center space-x-3">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"></div>
                        <div
                          className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"
                          style={{ animationDelay: "0.1s" }}
                        ></div>
                        <div
                          className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"
                          style={{ animationDelay: "0.2s" }}
                        ></div>
                      </div>
                      <span className="text-sm text-slate-600">{loadingText}</span>
                    </div>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Chat Input */}
            <div className="p-4 bg-white border-t border-slate-200">
              <form onSubmit={handleSendMessage} className="flex space-x-3">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask about ACS services..."
                  className="flex-1 px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-transparent text-sm"
                  disabled={isTyping}
                />
                <button
                  type="submit"
                  disabled={!inputValue.trim() || isTyping}
                  className="w-12 h-12 bg-slate-700 text-white rounded-lg hover:bg-slate-600 focus:ring-2 focus:ring-slate-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 flex items-center justify-center"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}