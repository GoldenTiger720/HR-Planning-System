# HR Planning System

A comprehensive human resource planning platform built with Next.js 14, TypeScript, TailwindCSS, and Shadcn/ui.

## 🌟 Features

### Four Integrated Modules

1. **Planning Module** - Automated task assignment and workforce scheduling
   - Assigns personnel to machines based on location, competency, and availability
   - Real-time schedule management
   - Task priority and status tracking

2. **Competency Management** - Skills and certification tracking
   - Worker skill levels and competencies
   - Certification management with expiry tracking
   - Experience and qualification monitoring

3. **Fatigue Management** - Work hours and rest monitoring
   - Intelligent fatigue scoring algorithm
   - Work hour tracking and analysis
   - Rest requirement calculations
   - Safety alerts for overtired workers

4. **Performance Reporting** - Efficiency and quality metrics
   - Task completion tracking
   - Efficiency and quality scoring
   - Issue reporting and resolution
   - Performance analytics and insights

### Additional Features

- **Stunning Hero Section** - Eye-catching landing page with gradient animations
- **Auto-Cycling Carousel** - Full-width image carousel showcasing key features
- **Scroll Animations** - Smooth fade-in effects from left and right
- **Dark/Light Mode** - Seamless theme switching with persistent preferences
- **Authentication** - Sign in and sign up functionality with mock data
- **Responsive Design** - Fully responsive across all device sizes
- **Modern UI/UX** - Clean, professional interface using Shadcn/ui components

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

The project is already set up and ready to run!

### Running the Application

1. Start the development server:
```bash
npm run dev
```

2. Open [http://localhost:3000](http://localhost:3000) in your browser

## 🔐 Demo Credentials

The platform includes mock authentication with the following test accounts:

- **Admin Account**
  - Email: `admin@hrplanning.com`
  - Password: `admin123`

- **Manager Account**
  - Email: `manager@hrplanning.com`
  - Password: `manager123`

- **Worker Account**
  - Email: `worker@hrplanning.com`
  - Password: `worker123`

## 📁 Project Structure

```
/home/cjh/Documents/new_project/
├── app/
│   ├── page.tsx              # Home page with hero and carousel
│   ├── layout.tsx            # Root layout with providers
│   ├── dashboard/            # Integrated dashboard
│   ├── planning/             # Planning module
│   ├── competency/           # Competency management
│   ├── fatigue/              # Fatigue monitoring
│   ├── performance/          # Performance reporting
│   ├── signin/               # Sign in page
│   └── signup/               # Sign up page
├── components/
│   ├── ui/                   # Shadcn/ui components
│   ├── Navigation.tsx        # Main navigation bar
│   └── ThemeToggle.tsx       # Dark/light mode toggle
├── contexts/
│   ├── AuthContext.tsx       # Authentication context
│   └── ThemeProvider.tsx     # Theme provider
├── lib/
│   ├── utils.ts              # Utility functions
│   └── mockData.ts           # Mock data for all modules
└── public/                   # Static assets
```

## 🎨 Technology Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: TailwindCSS
- **UI Components**: Shadcn/ui
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Theme**: next-themes

## 🎯 Key Highlights

- **Fully Operational Mockup** - All features use realistic mock data
- **Module Integration** - Four modules work individually or together
- **Automated Assignment** - Smart algorithm assigns tasks based on multiple factors
- **Safety First** - Fatigue monitoring ensures worker safety
- **Continuous Improvement** - Performance tracking enables ongoing optimization
- **Beautiful Design** - Modern, clean interface with smooth animations
- **Background Images** - Each module features relevant background imagery

## 📱 Pages Overview

1. **Home** - Hero section, carousel, module overview, features, CTA
2. **Dashboard** - Integrated overview of all modules with quick stats
3. **Planning** - Task scheduling and worker assignments
4. **Competency** - Skills matrix and certification tracking
5. **Fatigue** - Fatigue scores and rest monitoring
6. **Performance** - Efficiency metrics and quality reports
7. **Sign In/Sign Up** - Authentication pages

## 🌐 Development

The application is currently running at: **http://localhost:3000**

## 📝 Notes

- All data is mocked and stored in memory
- Authentication uses localStorage for session persistence
- Images are sourced from Unsplash for demonstration purposes
- The platform is designed to showcase a fully functional HR planning system

## 🎉 Enjoy!

This HR Planning System demonstrates a comprehensive workforce management solution with modern design, smooth animations, and intuitive user experience.
