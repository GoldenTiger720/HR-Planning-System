"use client"

import { useState } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { mockWorkers, mockTasks, mockPerformanceReports } from '@/lib/mockData'
import { TrendingUp, Award, AlertCircle, CheckCircle, Clock, Target } from 'lucide-react'

export default function PerformancePage() {
  const { user } = useAuth()
  const router = useRouter()
  const [workers] = useState(mockWorkers)
  const [tasks] = useState(mockTasks)
  const [reports] = useState(mockPerformanceReports)

  if (!user) {
    router.push('/signin')
    return null
  }

  const getPerformanceColor = (score: number) => {
    if (score >= 90) return 'text-green-600'
    if (score >= 75) return 'text-blue-600'
    if (score >= 60) return 'text-yellow-600'
    return 'text-red-600'
  }

  const getPerformanceBadge = (score: number): "default" | "secondary" | "destructive" | "outline" => {
    if (score >= 90) return 'default'
    if (score >= 75) return 'secondary'
    return 'outline'
  }

  const getPerformanceLevel = (score: number) => {
    if (score >= 95) return 'Outstanding'
    if (score >= 90) return 'Excellent'
    if (score >= 80) return 'Very Good'
    if (score >= 70) return 'Good'
    if (score >= 60) return 'Satisfactory'
    return 'Needs Improvement'
  }

  return (
    <div className="min-h-screen pt-16">
      {/* Background Image */}
      <div
        className="fixed inset-0 z-0 opacity-20 dark:opacity-10"
        style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1551434678-e076c223a692?w=1600&q=80)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed'
        }}
      />

      <div className="relative z-10 container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Performance Reporting</h1>
          <p className="text-muted-foreground text-lg">
            Track task completion, efficiency metrics, and continuous improvement indicators
          </p>
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full max-w-md grid-cols-2">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="reports">Detailed Reports</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Card className="bg-card/50 backdrop-blur">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Total Reports</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <span className="text-3xl font-bold">{reports.length}</span>
                    <TrendingUp className="h-8 w-8 text-green-600" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-card/50 backdrop-blur">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Avg Efficiency</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <span className="text-3xl font-bold">
                      {Math.round(reports.reduce((sum, r) => sum + r.efficiency, 0) / reports.length)}%
                    </span>
                    <Target className="h-8 w-8 text-blue-600" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-card/50 backdrop-blur">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Avg Quality</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <span className="text-3xl font-bold">
                      {Math.round(reports.reduce((sum, r) => sum + r.quality, 0) / reports.length)}%
                    </span>
                    <Award className="h-8 w-8 text-purple-600" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-card/50 backdrop-blur">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Issues Reported</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <span className="text-3xl font-bold">
                      {reports.reduce((sum, r) => sum + (r.issues?.length || 0), 0)}
                    </span>
                    <AlertCircle className="h-8 w-8 text-orange-600" />
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              {workers.slice(0, 4).map((worker) => {
                const workerReports = reports.filter(r => r.workerId === worker.id)
                const avgEfficiency = workerReports.length > 0
                  ? Math.round(workerReports.reduce((sum, r) => sum + r.efficiency, 0) / workerReports.length)
                  : 0
                const avgQuality = workerReports.length > 0
                  ? Math.round(workerReports.reduce((sum, r) => sum + r.quality, 0) / workerReports.length)
                  : 0

                return (
                  <Card key={worker.id} className="bg-card/50 backdrop-blur">
                    <CardHeader>
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-green-600 to-emerald-600 flex items-center justify-center text-white font-bold text-lg">
                          {worker.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div>
                          <CardTitle className="text-lg">{worker.name}</CardTitle>
                          <CardDescription>{worker.role}</CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-xs text-muted-foreground mb-2">Efficiency</p>
                          <div className="flex items-center gap-2">
                            <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                              <div
                                className="h-full bg-blue-500 transition-all"
                                style={{ width: `${avgEfficiency}%` }}
                              />
                            </div>
                            <span className={`text-sm font-bold ${getPerformanceColor(avgEfficiency)}`}>
                              {avgEfficiency}%
                            </span>
                          </div>
                        </div>

                        <div>
                          <p className="text-xs text-muted-foreground mb-2">Quality</p>
                          <div className="flex items-center gap-2">
                            <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                              <div
                                className="h-full bg-purple-500 transition-all"
                                style={{ width: `${avgQuality}%` }}
                              />
                            </div>
                            <span className={`text-sm font-bold ${getPerformanceColor(avgQuality)}`}>
                              {avgQuality}%
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-2 border-t">
                        <span className="text-sm text-muted-foreground">Reports Filed</span>
                        <span className="font-semibold">{workerReports.length}</span>
                      </div>

                      {avgEfficiency > 0 && (
                        <Badge variant={getPerformanceBadge((avgEfficiency + avgQuality) / 2)}>
                          {getPerformanceLevel((avgEfficiency + avgQuality) / 2)}
                        </Badge>
                      )}
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </TabsContent>

          <TabsContent value="reports" className="space-y-4">
            <Card className="bg-card/50 backdrop-blur">
              <CardHeader>
                <CardTitle>Performance Reports</CardTitle>
                <CardDescription>Detailed completion reports and quality metrics</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {reports.map((report) => {
                    const task = tasks.find(t => t.id === report.taskId)
                    const worker = workers.find(w => w.id === report.workerId)
                    const overallScore = Math.round((report.efficiency + report.quality) / 2)

                    return (
                      <div key={report.id} className="p-4 border rounded-lg space-y-4">
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="font-semibold text-lg">{task?.name}</h3>
                            <p className="text-sm text-muted-foreground">{worker?.name} - {worker?.role}</p>
                          </div>
                          <Badge variant={getPerformanceBadge(overallScore)}>
                            {getPerformanceLevel(overallScore)}
                          </Badge>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                          <div>
                            <p className="text-xs text-muted-foreground mb-1">Completed</p>
                            <div className="flex items-center gap-1">
                              <Clock className="h-3 w-3 text-muted-foreground" />
                              <span className="text-sm">{new Date(report.completionTime).toLocaleString()}</span>
                            </div>
                          </div>

                          <div>
                            <p className="text-xs text-muted-foreground mb-2">Efficiency</p>
                            <div className="flex items-center gap-2">
                              <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                                <div
                                  className="h-full bg-blue-500"
                                  style={{ width: `${report.efficiency}%` }}
                                />
                              </div>
                              <span className={`text-sm font-bold ${getPerformanceColor(report.efficiency)}`}>
                                {report.efficiency}%
                              </span>
                            </div>
                          </div>

                          <div>
                            <p className="text-xs text-muted-foreground mb-2">Quality</p>
                            <div className="flex items-center gap-2">
                              <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                                <div
                                  className="h-full bg-purple-500"
                                  style={{ width: `${report.quality}%` }}
                                />
                              </div>
                              <span className={`text-sm font-bold ${getPerformanceColor(report.quality)}`}>
                                {report.quality}%
                              </span>
                            </div>
                          </div>

                          <div>
                            <p className="text-xs text-muted-foreground mb-1">Overall Score</p>
                            <div className="flex items-center gap-1">
                              <Award className="h-4 w-4 text-muted-foreground" />
                              <span className={`text-lg font-bold ${getPerformanceColor(overallScore)}`}>
                                {overallScore}%
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className="pt-3 border-t">
                          <p className="text-sm font-medium mb-2">Notes:</p>
                          <p className="text-sm text-muted-foreground">{report.notes}</p>
                        </div>

                        {report.issues && report.issues.length > 0 && (
                          <div className="p-3 bg-orange-50 dark:bg-orange-950/20 rounded-md">
                            <div className="flex items-start gap-2">
                              <AlertCircle className="h-4 w-4 text-orange-600 mt-0.5" />
                              <div>
                                <p className="text-sm font-medium text-orange-600 mb-1">Issues Reported:</p>
                                <ul className="text-sm text-orange-600 space-y-1">
                                  {report.issues.map((issue, idx) => (
                                    <li key={idx}>• {issue}</li>
                                  ))}
                                </ul>
                              </div>
                            </div>
                          </div>
                        )}

                        {report.quality >= 95 && report.efficiency >= 95 && (
                          <div className="flex items-center gap-2 p-3 bg-green-50 dark:bg-green-950/20 rounded-md">
                            <CheckCircle className="h-4 w-4 text-green-600" />
                            <span className="text-sm font-medium text-green-600">
                              Outstanding Performance - Exceeds Expectations
                            </span>
                          </div>
                        )}
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
