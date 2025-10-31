"use client"

import { useState } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { mockWorkers, mockFatigueRecords } from '@/lib/mockData'
import { Activity, Clock, AlertTriangle, CheckCircle, Moon, TrendingDown } from 'lucide-react'

export default function FatiguePage() {
  const { user } = useAuth()
  const router = useRouter()
  const [workers] = useState(mockWorkers)
  const [fatigueRecords] = useState(mockFatigueRecords)

  if (!user) {
    router.push('/signin')
    return null
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'well-rested': return 'bg-green-500'
      case 'moderate': return 'bg-yellow-500'
      case 'fatigued': return 'bg-orange-500'
      case 'critical': return 'bg-red-500'
      default: return 'bg-gray-500'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'well-rested': return CheckCircle
      case 'moderate': return Activity
      case 'fatigued': return AlertTriangle
      case 'critical': return AlertTriangle
      default: return Activity
    }
  }

  const getStatusBadgeVariant = (status: string): "default" | "secondary" | "destructive" | "outline" => {
    switch (status) {
      case 'well-rested': return 'default'
      case 'moderate': return 'secondary'
      case 'fatigued': return 'destructive'
      case 'critical': return 'destructive'
      default: return 'secondary'
    }
  }

  const getFatigueLevel = (score: number) => {
    if (score < 25) return 'Low'
    if (score < 50) return 'Moderate'
    if (score < 75) return 'High'
    return 'Critical'
  }

  return (
    <div className="min-h-screen pt-16">
      {/* Background Image */}
      <div
        className="fixed inset-0 z-0 opacity-20 dark:opacity-10"
        style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=1600&q=80)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed'
        }}
      />

      <div className="relative z-10 container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Fatigue Management</h1>
          <p className="text-muted-foreground text-lg">
            Monitor work hours and assess worker readiness to ensure safety and optimal performance
          </p>
        </div>

        <Tabs defaultValue="dashboard" className="space-y-6">
          <TabsList className="grid w-full max-w-md grid-cols-2">
            <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
            <TabsTrigger value="records">Detailed Records</TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {workers.map((worker) => {
                const StatusIcon = getStatusIcon(
                  worker.fatigueScore < 25 ? 'well-rested' :
                  worker.fatigueScore < 50 ? 'moderate' :
                  worker.fatigueScore < 75 ? 'fatigued' : 'critical'
                )

                return (
                  <Card key={worker.id} className="bg-card/50 backdrop-blur">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div>
                          <CardTitle className="text-lg">{worker.name}</CardTitle>
                          <CardDescription>{worker.role}</CardDescription>
                        </div>
                        <div className={`w-3 h-3 rounded-full ${getStatusColor(
                          worker.fatigueScore < 25 ? 'well-rested' :
                          worker.fatigueScore < 50 ? 'moderate' :
                          worker.fatigueScore < 75 ? 'fatigued' : 'critical'
                        )}`} />
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm text-muted-foreground">Fatigue Score</span>
                          <span className="font-bold text-2xl">{worker.fatigueScore}</span>
                        </div>
                        <div className="h-3 bg-muted rounded-full overflow-hidden">
                          <div
                            className={`h-full transition-all ${
                              worker.fatigueScore < 25 ? 'bg-green-500' :
                              worker.fatigueScore < 50 ? 'bg-yellow-500' :
                              worker.fatigueScore < 75 ? 'bg-orange-500' : 'bg-red-500'
                            }`}
                            style={{ width: `${worker.fatigueScore}%` }}
                          />
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">
                          Level: {getFatigueLevel(worker.fatigueScore)}
                        </p>
                      </div>

                      <div className="grid grid-cols-2 gap-3 text-sm">
                        <div className="space-y-1">
                          <div className="flex items-center gap-1 text-muted-foreground">
                            <Clock className="h-3 w-3" />
                            <span className="text-xs">Hours This Week</span>
                          </div>
                          <p className="font-semibold">{worker.hoursWorked}h</p>
                        </div>

                        <div className="space-y-1">
                          <div className="flex items-center gap-1 text-muted-foreground">
                            <Moon className="h-3 w-3" />
                            <span className="text-xs">Rest Required</span>
                          </div>
                          <p className="font-semibold">
                            {worker.fatigueScore > 70 ? '16h' : worker.fatigueScore > 40 ? '12h' : '8h'}
                          </p>
                        </div>
                      </div>

                      <div className="pt-3 border-t">
                        <div className="flex items-center gap-2">
                          <StatusIcon className={`h-4 w-4 ${
                            worker.fatigueScore < 25 ? 'text-green-600' :
                            worker.fatigueScore < 50 ? 'text-yellow-600' :
                            worker.fatigueScore < 75 ? 'text-orange-600' : 'text-red-600'
                          }`} />
                          <span className="text-sm">
                            {worker.fatigueScore < 25 ? 'Ready for work' :
                             worker.fatigueScore < 50 ? 'Monitor closely' :
                             worker.fatigueScore < 75 ? 'Rest recommended' : 'Rest required'}
                          </span>
                        </div>
                      </div>

                      {worker.fatigueScore >= 50 && (
                        <div className={`p-2 rounded-md text-xs ${
                          worker.fatigueScore >= 75 ? 'bg-red-50 dark:bg-red-950/20 text-red-600' : 'bg-yellow-50 dark:bg-yellow-950/20 text-yellow-600'
                        }`}>
                          {worker.fatigueScore >= 75 ?
                            '⚠️ Critical: Schedule mandatory rest period' :
                            '⚡ Caution: Approaching fatigue threshold'}
                        </div>
                      )}
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </TabsContent>

          <TabsContent value="records" className="space-y-4">
            <Card className="bg-card/50 backdrop-blur">
              <CardHeader>
                <CardTitle>Fatigue Records</CardTitle>
                <CardDescription>Historical fatigue data and work hour tracking</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {fatigueRecords.map((record) => {
                    const worker = workers.find(w => w.id === record.workerId)
                    const StatusIcon = getStatusIcon(record.status)

                    return (
                      <div key={record.id} className="p-4 border rounded-lg space-y-3">
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="font-semibold text-lg">{worker?.name}</h3>
                            <p className="text-sm text-muted-foreground">{worker?.role}</p>
                          </div>
                          <Badge variant={getStatusBadgeVariant(record.status)}>
                            {record.status.replace('-', ' ')}
                          </Badge>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                          <div>
                            <p className="text-xs text-muted-foreground mb-1">Date</p>
                            <p className="text-sm font-medium">{new Date(record.date).toLocaleDateString()}</p>
                          </div>

                          <div>
                            <p className="text-xs text-muted-foreground mb-1">Hours Worked</p>
                            <div className="flex items-center gap-1">
                              <Clock className="h-4 w-4 text-muted-foreground" />
                              <p className="text-sm font-medium">{record.hoursWorked}h</p>
                            </div>
                          </div>

                          <div>
                            <p className="text-xs text-muted-foreground mb-1">Tasks Completed</p>
                            <p className="text-sm font-medium">{record.tasksCompleted}</p>
                          </div>

                          <div>
                            <p className="text-xs text-muted-foreground mb-1">Rest Required</p>
                            <div className="flex items-center gap-1">
                              <Moon className="h-4 w-4 text-muted-foreground" />
                              <p className="text-sm font-medium">{record.restRequired}h</p>
                            </div>
                          </div>
                        </div>

                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-sm text-muted-foreground">Fatigue Score</span>
                            <span className="font-bold">{record.fatigueScore}/100</span>
                          </div>
                          <div className="h-2 bg-muted rounded-full overflow-hidden">
                            <div
                              className={`h-full transition-all ${getStatusColor(record.status)}`}
                              style={{ width: `${record.fatigueScore}%` }}
                            />
                          </div>
                        </div>

                        <div className="flex items-center gap-2 pt-2 border-t">
                          <StatusIcon className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm capitalize">
                            {record.status === 'well-rested' ? 'Well rested and ready' :
                             record.status === 'moderate' ? 'Moderate fatigue - monitor' :
                             record.status === 'fatigued' ? 'Fatigued - rest recommended' :
                             'Critical fatigue - immediate rest required'}
                          </span>
                        </div>
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
