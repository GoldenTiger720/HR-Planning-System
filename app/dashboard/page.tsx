"use client"

import { useAuth } from '@/contexts/AuthContext'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { mockWorkers, mockTasks, mockPerformanceReports } from '@/lib/mockData'
import { Calendar, Users, Activity, FileText, TrendingUp, Clock, Award, AlertTriangle, ArrowRight } from 'lucide-react'

export default function DashboardPage() {
  const { user } = useAuth()
  const router = useRouter()

  if (!user) {
    router.push('/signin')
    return null
  }

  const totalWorkers = mockWorkers.length
  const availableWorkers = mockWorkers.filter(w => w.availability === 'Available').length
  const activeTasks = mockTasks.filter(t => t.status === 'in-progress').length
  const completedTasks = mockTasks.filter(t => t.status === 'completed').length
  const pendingTasks = mockTasks.filter(t => t.status === 'pending').length

  const avgPerformance = Math.round(
    mockPerformanceReports.reduce((sum, r) => sum + (r.efficiency + r.quality) / 2, 0) / mockPerformanceReports.length
  )

  const fatigueAlerts = mockWorkers.filter(w => w.fatigueScore >= 70).length
  const moderateFatigue = mockWorkers.filter(w => w.fatigueScore >= 50 && w.fatigueScore < 70).length

  const modules = [
    {
      title: 'Planning',
      description: 'Automated task assignment & scheduling',
      icon: Calendar,
      color: 'from-blue-600 to-cyan-600',
      href: '/planning',
      stats: { label: 'Active Tasks', value: activeTasks }
    },
    {
      title: 'Competency',
      description: 'Skills & certification management',
      icon: Users,
      color: 'from-purple-600 to-pink-600',
      href: '/competency',
      stats: { label: 'Total Workers', value: totalWorkers }
    },
    {
      title: 'Fatigue',
      description: 'Work hours & rest monitoring',
      icon: Activity,
      color: 'from-orange-600 to-red-600',
      href: '/fatigue',
      stats: { label: 'Alerts', value: fatigueAlerts }
    },
    {
      title: 'Performance',
      description: 'Efficiency & quality tracking',
      icon: FileText,
      color: 'from-green-600 to-emerald-600',
      href: '/performance',
      stats: { label: 'Avg Score', value: `${avgPerformance}%` }
    }
  ]

  const recentTasks = mockTasks.slice(0, 5)
  const topPerformers = mockWorkers
    .map(worker => {
      const workerReports = mockPerformanceReports.filter(r => r.workerId === worker.id)
      const avgScore = workerReports.length > 0
        ? Math.round(workerReports.reduce((sum, r) => sum + (r.efficiency + r.quality) / 2, 0) / workerReports.length)
        : 0
      return { ...worker, avgScore }
    })
    .sort((a, b) => b.avgScore - a.avgScore)
    .slice(0, 5)

  return (
    <div className="min-h-screen pt-16 bg-gradient-to-br from-blue-50/50 via-white to-purple-50/50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Dashboard</h1>
          <p className="text-muted-foreground text-lg">
            Welcome back, {user.name}! Here&apos;s your system overview.
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
          <Card className="bg-gradient-to-br from-blue-600 to-cyan-600 text-white">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium opacity-90">Total Tasks</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <span className="text-4xl font-bold">{mockTasks.length}</span>
                <Calendar className="h-10 w-10 opacity-80" />
              </div>
              <p className="text-xs mt-2 opacity-80">
                {activeTasks} active, {completedTasks} completed, {pendingTasks} pending
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-600 to-pink-600 text-white">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium opacity-90">Workforce</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <span className="text-4xl font-bold">{totalWorkers}</span>
                <Users className="h-10 w-10 opacity-80" />
              </div>
              <p className="text-xs mt-2 opacity-80">
                {availableWorkers} available now
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-orange-600 to-red-600 text-white">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium opacity-90">Fatigue Status</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <span className="text-4xl font-bold">{fatigueAlerts}</span>
                <Activity className="h-10 w-10 opacity-80" />
              </div>
              <p className="text-xs mt-2 opacity-80">
                {fatigueAlerts} alerts, {moderateFatigue} moderate
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-600 to-emerald-600 text-white">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium opacity-90">Avg Performance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <span className="text-4xl font-bold">{avgPerformance}%</span>
                <TrendingUp className="h-10 w-10 opacity-80" />
              </div>
              <p className="text-xs mt-2 opacity-80">
                Based on {mockPerformanceReports.length} reports
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Module Quick Access */}
        <div className="grid gap-6 md:grid-cols-2 mb-8">
          {modules.map((module) => {
            const Icon = module.icon
            return (
              <Link key={module.title} href={module.href}>
                <Card className="hover:shadow-xl transition-all cursor-pointer group">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${module.color} flex items-center justify-center`}>
                          <Icon className="h-6 w-6 text-white" />
                        </div>
                        <div>
                          <CardTitle>{module.title}</CardTitle>
                          <CardDescription>{module.description}</CardDescription>
                        </div>
                      </div>
                      <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:translate-x-1 transition-transform" />
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">{module.stats.label}</span>
                      <span className="text-2xl font-bold">{module.stats.value}</span>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            )
          })}
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {/* Recent Tasks */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Recent Tasks</CardTitle>
                <Link href="/planning">
                  <Button variant="ghost" size="sm">
                    View All
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
              <CardDescription>Latest task assignments and updates</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {recentTasks.map((task) => {
                  const worker = mockWorkers.find(w => w.id === task.assignedWorker)
                  return (
                    <div key={task.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex-1">
                        <p className="font-medium">{task.name}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <Clock className="h-3 w-3 text-muted-foreground" />
                          <span className="text-xs text-muted-foreground">
                            {new Date(task.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </span>
                          {worker && (
                            <span className="text-xs text-muted-foreground">• {worker.name}</span>
                          )}
                        </div>
                      </div>
                      <Badge variant={task.status === 'completed' ? 'default' : task.status === 'in-progress' ? 'secondary' : 'outline'}>
                        {task.status}
                      </Badge>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>

          {/* Top Performers */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Top Performers</CardTitle>
                <Link href="/performance">
                  <Button variant="ghost" size="sm">
                    View All
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
              <CardDescription>Highest performing team members</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {topPerformers.map((worker, index) => (
                  <div key={worker.id} className="flex items-center gap-3 p-3 border rounded-lg">
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-br from-green-600 to-emerald-600 text-white font-bold text-sm">
                      #{index + 1}
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">{worker.name}</p>
                      <p className="text-xs text-muted-foreground">{worker.role}</p>
                    </div>
                    <div className="flex items-center gap-1">
                      <Award className="h-4 w-4 text-yellow-600" />
                      <span className="font-bold text-green-600">{worker.avgScore}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Alerts */}
        {fatigueAlerts > 0 && (
          <Card className="mt-6 border-orange-200 dark:border-orange-900">
            <CardHeader>
              <div className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-orange-600" />
                <CardTitle className="text-orange-600">Fatigue Alerts</CardTitle>
              </div>
              <CardDescription>Workers requiring rest or attention</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {mockWorkers
                  .filter(w => w.fatigueScore >= 70)
                  .map((worker) => (
                    <div key={worker.id} className="flex items-center justify-between p-3 bg-orange-50 dark:bg-orange-950/20 rounded-lg">
                      <div>
                        <p className="font-medium">{worker.name}</p>
                        <p className="text-xs text-muted-foreground">Fatigue Score: {worker.fatigueScore}</p>
                      </div>
                      <Link href="/fatigue">
                        <Button size="sm" variant="outline">
                          View Details
                        </Button>
                      </Link>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
