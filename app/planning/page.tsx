"use client"

import { useState } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { mockWorkers, mockTasks } from '@/lib/mockData'
import { MapPin, Clock, User, CheckCircle2, AlertCircle, PlayCircle } from 'lucide-react'

export default function PlanningPage() {
  const { user } = useAuth()
  const router = useRouter()
  const [tasks] = useState(mockTasks)
  const [workers] = useState(mockWorkers)

  if (!user) {
    router.push('/signin')
    return null
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-500'
      case 'in-progress': return 'bg-blue-500'
      case 'pending': return 'bg-yellow-500'
      default: return 'bg-gray-500'
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'destructive'
      case 'medium': return 'default'
      case 'low': return 'secondary'
      default: return 'secondary'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return CheckCircle2
      case 'in-progress': return PlayCircle
      case 'pending': return AlertCircle
      default: return Clock
    }
  }

  return (
    <div className="min-h-screen pt-16">
      {/* Background Image */}
      <div
        className="fixed inset-0 z-0 opacity-20 dark:opacity-10"
        style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1600&q=80)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed'
        }}
      />

      <div className="relative z-10 container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Planning Module</h1>
          <p className="text-muted-foreground text-lg">
            Automated task assignment and workforce scheduling based on location, competency, and availability
          </p>
        </div>

        <Tabs defaultValue="schedule" className="space-y-6">
          <TabsList className="grid w-full max-w-md grid-cols-3">
            <TabsTrigger value="schedule">Schedule</TabsTrigger>
            <TabsTrigger value="tasks">Tasks</TabsTrigger>
            <TabsTrigger value="workers">Workers</TabsTrigger>
          </TabsList>

          <TabsContent value="schedule" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Today&apos;s Schedule</CardTitle>
                <CardDescription>Automated assignments for {new Date().toLocaleDateString()}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {tasks.map((task) => {
                    const StatusIcon = getStatusIcon(task.status)
                    const assignedWorker = workers.find(w => w.id === task.assignedWorker)

                    return (
                      <div key={task.id} className="flex items-start gap-4 p-4 border rounded-lg bg-card/50 backdrop-blur">
                        <div className={`w-2 h-full rounded-full ${getStatusColor(task.status)}`} />
                        <div className="flex-1">
                          <div className="flex items-start justify-between mb-2">
                            <div>
                              <h3 className="font-semibold text-lg">{task.name}</h3>
                              <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                                <MapPin className="h-4 w-4" />
                                {task.location}
                              </div>
                            </div>
                            <Badge variant={getPriorityColor(task.priority)}>
                              {task.priority}
                            </Badge>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                            <div className="flex items-center gap-2">
                              <Clock className="h-4 w-4 text-muted-foreground" />
                              <span>{new Date(task.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                            </div>
                            {assignedWorker && (
                              <div className="flex items-center gap-2">
                                <User className="h-4 w-4 text-muted-foreground" />
                                <span>{assignedWorker.name}</span>
                              </div>
                            )}
                          </div>

                          <div className="mt-3">
                            <div className="flex items-center gap-2 text-sm">
                              <StatusIcon className="h-4 w-4" />
                              <span className="capitalize">{task.status.replace('-', ' ')}</span>
                            </div>
                          </div>

                          <div className="mt-2 flex flex-wrap gap-1">
                            {task.requiredCompetencies.map((comp, idx) => (
                              <Badge key={idx} variant="outline" className="text-xs">
                                {comp}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="tasks" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              {tasks.map((task) => (
                <Card key={task.id} className="bg-card/50 backdrop-blur">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <CardTitle className="text-xl">{task.name}</CardTitle>
                      <Badge variant={getPriorityColor(task.priority)}>
                        {task.priority}
                      </Badge>
                    </div>
                    <CardDescription>{task.machine}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center gap-2 text-sm">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <span>{task.location}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span>{new Date(task.startTime).toLocaleString()}</span>
                    </div>
                    {task.assignedWorker && (
                      <div className="flex items-center gap-2 text-sm">
                        <User className="h-4 w-4 text-muted-foreground" />
                        <span>{workers.find(w => w.id === task.assignedWorker)?.name}</span>
                      </div>
                    )}
                    <div className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full ${getStatusColor(task.status)}`} />
                      <span className="text-sm capitalize">{task.status.replace('-', ' ')}</span>
                    </div>
                    <div className="pt-2">
                      <p className="text-xs text-muted-foreground mb-2">Required Skills:</p>
                      <div className="flex flex-wrap gap-1">
                        {task.requiredCompetencies.map((comp, idx) => (
                          <Badge key={idx} variant="outline" className="text-xs">
                            {comp}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="workers" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {workers.map((worker) => (
                <Card key={worker.id} className="bg-card/50 backdrop-blur">
                  <CardHeader>
                    <CardTitle>{worker.name}</CardTitle>
                    <CardDescription>{worker.role}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Availability</span>
                      <Badge variant={worker.availability === 'Available' ? 'default' : 'secondary'}>
                        {worker.availability}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Hours This Week</span>
                      <span className="font-semibold">{worker.hoursWorked}h</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Experience</span>
                      <span className="font-semibold">{worker.experience} years</span>
                    </div>
                    <div className="pt-2">
                      <p className="text-xs text-muted-foreground mb-2">Competencies:</p>
                      <div className="flex flex-wrap gap-1">
                        {worker.competencies.slice(0, 3).map((comp, idx) => (
                          <Badge key={idx} variant="secondary" className="text-xs">
                            {comp}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
