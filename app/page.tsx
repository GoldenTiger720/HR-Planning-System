"use client"

import Link from 'next/link'
import { useEffect, useState, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { ArrowRight, Calendar, Users, Activity, FileText, CheckCircle, TrendingUp } from 'lucide-react'
import { motion, useInView } from 'framer-motion'

const carouselImages = [
  {
    url: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1600&q=80',
    title: 'Strategic Planning',
    description: 'Optimize workforce allocation'
  },
  {
    url: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=1600&q=80',
    title: 'Team Collaboration',
    description: 'Enhance productivity'
  },
  {
    url: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=1600&q=80',
    title: 'Professional Development',
    description: 'Build competencies'
  },
  {
    url: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=1600&q=80',
    title: 'Performance Excellence',
    description: 'Track and improve'
  }
]

function FadeInSection({ children, direction = 'left' }: { children: React.ReactNode, direction?: 'left' | 'right' }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: direction === 'left' ? -50 : 50 }}
      animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: direction === 'left' ? -50 : 50 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  )
}

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % carouselImages.length)
    }, 5000)

    return () => clearInterval(timer)
  }, [])

  const modules = [
    {
      icon: Calendar,
      title: 'Planning Module',
      description: 'Automatically assigns personnel to machines and tasks based on location, competency, and availability. Smart scheduling that adapts to your workforce needs.',
      color: 'from-blue-600 to-cyan-600'
    },
    {
      icon: Users,
      title: 'Competency Management',
      description: 'Track worker skills, certifications, and experience levels. Ensure the right person with the right skills is assigned to every task.',
      color: 'from-purple-600 to-pink-600'
    },
    {
      icon: Activity,
      title: 'Fatigue Management',
      description: 'Monitor work hours and assess worker readiness. Prioritize rest and safety with intelligent fatigue scoring algorithms.',
      color: 'from-orange-600 to-red-600'
    },
    {
      icon: FileText,
      title: 'Performance Reporting',
      description: 'Enable real-time task updates and completion reporting. Track efficiency, quality, and continuous improvement metrics.',
      color: 'from-green-600 to-emerald-600'
    }
  ]

  const features = [
    'Automated task assignment',
    'Real-time competency tracking',
    'Intelligent fatigue monitoring',
    'Comprehensive performance analytics',
    'Seamless module integration',
    'Continuous improvement tracking'
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 dark:from-blue-900 dark:via-purple-900 dark:to-pink-900" />
        <div className="absolute inset-0 bg-black/20 dark:bg-black/40" />

        <motion.div
          className="relative z-10 container mx-auto px-4 text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <motion.h1
            className="text-5xl md:text-7xl font-bold text-white mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            HR Planning System
          </motion.h1>
          <motion.p
            className="text-xl md:text-2xl text-white/90 mb-8 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
          >
            Comprehensive Workforce Management for the Modern Enterprise
          </motion.p>
          <motion.p
            className="text-lg text-white/80 mb-12 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6 }}
          >
            Automate planning, manage competencies, monitor fatigue, and track performance—all in one integrated platform
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link href="/signup">
              <Button size="lg" className="bg-white text-purple-600 hover:bg-white/90 text-lg px-8 py-6">
                Get Started
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="/signin">
              <Button size="lg" variant="outline" className="bg-transparent text-white border-white hover:bg-white/10 text-lg px-8 py-6">
                Sign In
              </Button>
            </Link>
          </motion.div>
        </motion.div>

        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex items-start justify-center p-2">
            <div className="w-1 h-3 bg-white/50 rounded-full" />
          </div>
        </div>
      </section>

      {/* Carousel Section */}
      <section className="relative h-[600px] overflow-hidden">
        {carouselImages.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${image.url})` }}
            />
            <div className="absolute inset-0 bg-black/50" />
            <div className="relative h-full flex items-center justify-center">
              <div className="text-center text-white">
                <h2 className="text-5xl font-bold mb-4">{image.title}</h2>
                <p className="text-2xl">{image.description}</p>
              </div>
            </div>
          </div>
        ))}

        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-2 z-10">
          {carouselImages.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-all ${
                index === currentSlide ? 'bg-white w-8' : 'bg-white/50'
              }`}
            />
          ))}
        </div>
      </section>

      {/* Modules Section */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <FadeInSection direction="left">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-4">Four Powerful Modules</h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Work individually or together to create a comprehensive HR ecosystem
              </p>
            </div>
          </FadeInSection>

          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {modules.map((module, index) => {
              const Icon = module.icon
              return (
                <FadeInSection key={index} direction={index % 2 === 0 ? 'left' : 'right'}>
                  <Card className="h-full hover:shadow-xl transition-shadow">
                    <CardContent className="p-8">
                      <div className={`w-16 h-16 rounded-lg bg-gradient-to-br ${module.color} flex items-center justify-center mb-6`}>
                        <Icon className="h-8 w-8 text-white" />
                      </div>
                      <h3 className="text-2xl font-bold mb-4">{module.title}</h3>
                      <p className="text-muted-foreground leading-relaxed">{module.description}</p>
                    </CardContent>
                  </Card>
                </FadeInSection>
              )
            })}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-muted/50">
        <div className="container mx-auto px-4">
          <FadeInSection direction="right">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-4">Key Features</h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Everything you need for effective workforce management
              </p>
            </div>
          </FadeInSection>

          <FadeInSection direction="left">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {features.map((feature, index) => (
                <div key={index} className="flex items-center gap-3 bg-background p-6 rounded-lg shadow-sm">
                  <CheckCircle className="h-6 w-6 text-green-600 flex-shrink-0" />
                  <span className="text-lg">{feature}</span>
                </div>
              ))}
            </div>
          </FadeInSection>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 text-white">
        <div className="container mx-auto px-4">
          <FadeInSection direction="left">
            <div className="text-center max-w-3xl mx-auto">
              <TrendingUp className="h-16 w-16 mx-auto mb-6" />
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Ready to Transform Your Workforce Management?
              </h2>
              <p className="text-xl mb-8 text-white/90">
                Join leading organizations that trust our platform for continuous improvement and operational readiness
              </p>
              <Link href="/signup">
                <Button size="lg" className="bg-white text-purple-600 hover:bg-white/90 text-lg px-8 py-6">
                  Start Free Trial
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </FadeInSection>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-background border-t">
        <div className="container mx-auto px-4">
          <div className="text-center text-muted-foreground">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center">
                <span className="text-white font-bold">HR</span>
              </div>
              <span className="font-bold text-xl text-foreground">HR Planning System</span>
            </div>
            <p>&copy; 2025 HR Planning System. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
