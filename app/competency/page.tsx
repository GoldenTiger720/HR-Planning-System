"use client"

import { useState } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { mockWorkers, mockCompetencies } from '@/lib/mockData'
import { Award, Calendar, CheckCircle, AlertTriangle, TrendingUp } from 'lucide-react'

export default function CompetencyPage() {
  const { user } = useAuth()
  const router = useRouter()
  const [workers] = useState(mockWorkers)
  const [competencies] = useState(mockCompetencies)

  if (!user) {
    router.push('/signin')
    return null
  }

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'expert': return 'bg-purple-500'
      case 'advanced': return 'bg-blue-500'
      case 'intermediate': return 'bg-green-500'
      case 'beginner': return 'bg-yellow-500'
      default: return 'bg-gray-500'
    }
  }

  const getLevelBadgeVariant = (level: string): "default" | "secondary" | "destructive" | "outline" => {
    switch (level) {
      case 'expert': return 'default'
      case 'advanced': return 'default'
      case 'intermediate': return 'secondary'
      case 'beginner': return 'outline'
      default: return 'secondary'
    }
  }

  const isSkillExpiringSoon = (expiryDate?: string) => {
    if (!expiryDate) return false
    const expiry = new Date(expiryDate)
    const now = new Date()
    const daysUntilExpiry = Math.floor((expiry.getTime() - now.getTime()) / (1000 * 60 * 60 * 24))
    return daysUntilExpiry < 90 && daysUntilExpiry > 0
  }

  const isSkillExpired = (expiryDate?: string) => {
    if (!expiryDate) return false
    return new Date(expiryDate) < new Date()
  }

  return (
    <div className="min-h-screen pt-16">
      {/* Background Image */}
      <div
        className="fixed inset-0 z-0 opacity-20 dark:opacity-10"
        style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1552664730-d307ca884978?w=1600&q=80)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed'
        }}
      />

      <div className="relative z-10 container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Competency Management</h1>
          <p className="text-muted-foreground text-lg">
            Track worker skills, certifications, and competency levels to ensure optimal task assignment
          </p>
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full max-w-md grid-cols-2">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="details">Detailed Records</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {workers.map((worker) => (
                <Card key={worker.id} className="bg-card/50 backdrop-blur">
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center text-white font-bold text-lg">
                        {worker.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <CardTitle className="text-lg">{worker.name}</CardTitle>
                        <CardDescription>{worker.role}</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Experience</span>
                      <div className="flex items-center gap-1">
                        <TrendingUp className="h-4 w-4 text-green-600" />
                        <span className="font-semibold">{worker.experience} years</span>
                      </div>
                    </div>

                    <div>
                      <p className="text-sm text-muted-foreground mb-2">Core Competencies:</p>
                      <div className="flex flex-wrap gap-2">
                        {worker.competencies.map((comp, idx) => (
                          <Badge key={idx} variant="secondary" className="text-xs">
                            {comp}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div>
                      <p className="text-sm text-muted-foreground mb-2">Certifications:</p>
                      <div className="space-y-1">
                        {worker.certifications.map((cert, idx) => (
                          <div key={idx} className="flex items-center gap-2 text-sm">
                            <Award className="h-3 w-3 text-muted-foreground" />
                            <span className="text-xs">{cert}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="pt-2 border-t">
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <Calendar className="h-3 w-3" />
                        Last active: {new Date(worker.lastTaskDate).toLocaleDateString()}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="details" className="space-y-4">
            <Card className="bg-card/50 backdrop-blur">
              <CardHeader>
                <CardTitle>Competency Records</CardTitle>
                <CardDescription>Detailed skill levels and certification status for all workers</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {competencies.map((comp) => {
                    const worker = workers.find(w => w.id === comp.workerId)
                    const expiringSoon = isSkillExpiringSoon(comp.expiryDate)
                    const expired = isSkillExpired(comp.expiryDate)

                    return (
                      <div key={comp.id} className="p-4 border rounded-lg space-y-3">
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="font-semibold text-lg">{comp.skill}</h3>
                            <p className="text-sm text-muted-foreground">{worker?.name} - {worker?.role}</p>
                          </div>
                          <Badge variant={getLevelBadgeVariant(comp.level)}>
                            {comp.level}
                          </Badge>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                          <div>
                            <p className="text-muted-foreground mb-1">Proficiency Level</p>
                            <div className="flex items-center gap-2">
                              <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                                <div
                                  className={`h-full ${getLevelColor(comp.level)} transition-all`}
                                  style={{
                                    width: comp.level === 'expert' ? '100%' : comp.level === 'advanced' ? '75%' : comp.level === 'intermediate' ? '50%' : '25%'
                                  }}
                                />
                              </div>
                            </div>
                          </div>

                          <div>
                            <p className="text-muted-foreground mb-1">Last Used</p>
                            <div className="flex items-center gap-1">
                              <Calendar className="h-4 w-4 text-muted-foreground" />
                              <span>{new Date(comp.lastUsed).toLocaleDateString()}</span>
                            </div>
                          </div>

                          <div>
                            <p className="text-muted-foreground mb-1">Certification Status</p>
                            {comp.certificationDate ? (
                              <div className="space-y-1">
                                <div className="flex items-center gap-1 text-xs">
                                  <CheckCircle className="h-3 w-3 text-green-600" />
                                  <span>Certified: {new Date(comp.certificationDate).toLocaleDateString()}</span>
                                </div>
                                {comp.expiryDate && (
                                  <div className={`flex items-center gap-1 text-xs ${expired ? 'text-red-600' : expiringSoon ? 'text-yellow-600' : 'text-muted-foreground'}`}>
                                    {expired || expiringSoon ? <AlertTriangle className="h-3 w-3" /> : <Calendar className="h-3 w-3" />}
                                    <span>
                                      {expired ? 'Expired: ' : 'Expires: '}
                                      {new Date(comp.expiryDate).toLocaleDateString()}
                                    </span>
                                  </div>
                                )}
                              </div>
                            ) : (
                              <span className="text-xs text-muted-foreground">No certification required</span>
                            )}
                          </div>
                        </div>

                        {(expired || expiringSoon) && (
                          <div className={`p-2 rounded-md ${expired ? 'bg-red-50 dark:bg-red-950/20 text-red-600' : 'bg-yellow-50 dark:bg-yellow-950/20 text-yellow-600'}`}>
                            <p className="text-xs font-medium">
                              {expired ? '⚠️ Certification expired - Renewal required' : '⏰ Certification expiring soon - Schedule renewal'}
                            </p>
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
