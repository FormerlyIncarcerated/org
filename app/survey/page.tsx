"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Slider } from "@/components/ui/slider"
import { Textarea } from "@/components/ui/textarea"
import { ChevronLeft, ChevronRight, Send, Loader2, CheckCircle } from "lucide-react"
import { generateSessionId } from "@/lib/supabase"


interface SurveyData {
  relationship: string
  cryptoFamiliarity: number[]
  categoryRanking: string[]
  concepts: string[]
  marcusHelp: string[]
  sarahBarrier: string
  integrationImportance: number[]
  successFactor: string
  learningSupport: string[]
  concerns: string
  additionalFeatures: string
  otherComments: string
}

const TOTAL_STEPS = 6

export default function SurveyPage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [sessionId, setSessionId] = useState<string>("")
  const [startTime, setStartTime] = useState<number>(Date.now())
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [submitError, setSubmitError] = useState<string>("")
  const [surveyData, setSurveyData] = useState<SurveyData>({
    relationship: "",
    cryptoFamiliarity: [5],
    categoryRanking: ["employment", "funding", "education", "housing", "legal", "financial"],
    concepts: [],
    marcusHelp: [],
    sarahBarrier: "",
    integrationImportance: [7],
    successFactor: "",
    learningSupport: [],
    concerns: "",
    additionalFeatures: "",
    otherComments: ""
  })

  // Initialize session on component mount
  useEffect(() => {
    const newSessionId = generateSessionId()
    setSessionId(newSessionId)
    setStartTime(Date.now())

    // Try to load existing survey data
    loadExistingSurvey(newSessionId)
  }, [])

  // Auto-save survey data when it changes
  useEffect(() => {
    if (sessionId && currentStep > 1) {
      autoSaveSurvey()
    }
  }, [surveyData, currentStep, sessionId])

  const loadExistingSurvey = async (sessionId: string) => {
    try {
      const response = await fetch(`/api/survey?session_id=${sessionId}`)
      if (response.ok) {
        const result = await response.json()
        if (result.success && result.data) {
          // Convert API format to component format
          const apiData = result.data
          setSurveyData({
            relationship: apiData.relationship || "",
            cryptoFamiliarity: [apiData.crypto_familiarity || 5],
            categoryRanking: apiData.category_ranking || ["employment", "funding", "education", "housing", "legal", "financial"],
            concepts: apiData.concepts || [],
            marcusHelp: apiData.marcus_help || [],
            sarahBarrier: apiData.sarah_barrier || "",
            integrationImportance: [apiData.integration_importance || 7],
            successFactor: apiData.success_factor || "",
            learningSupport: apiData.learning_support || [],
            concerns: apiData.concerns || "",
            additionalFeatures: apiData.additional_features || "",
            otherComments: apiData.other_comments || ""
          })
          setCurrentStep(apiData.step_completed || 1)
          if (apiData.completed) {
            setIsSubmitted(true)
          }
        }
      }
    } catch (error) {
      console.error('Error loading existing survey:', error)
    }
  }

  const autoSaveSurvey = async () => {
    if (!sessionId) return

    try {
      await saveSurveyData(false)
    } catch (error) {
      console.error('Auto-save failed:', error)
    }
  }

  const saveSurveyData = async (completed: boolean = false) => {
    const completionTime = completed ? Math.floor((Date.now() - startTime) / 1000) : undefined

    const apiData = {
      session_id: sessionId,
      relationship: surveyData.relationship,
      crypto_familiarity: surveyData.cryptoFamiliarity[0],
      category_ranking: surveyData.categoryRanking,
      concepts: surveyData.concepts,
      marcus_help: surveyData.marcusHelp,
      sarah_barrier: surveyData.sarahBarrier,
      integration_importance: surveyData.integrationImportance[0],
      success_factor: surveyData.successFactor,
      learning_support: surveyData.learningSupport,
      concerns: surveyData.concerns,
      additional_features: surveyData.additionalFeatures,
      other_comments: surveyData.otherComments,
      completion_time_seconds: completionTime,
      completed,
      step_completed: currentStep
    }

    const response = await fetch('/api/survey', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(apiData)
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.error || 'Failed to save survey')
    }

    return response.json()
  }

  const progress = (currentStep / TOTAL_STEPS) * 100

  const nextStep = async () => {
    if (currentStep < TOTAL_STEPS) {
      const newStep = currentStep + 1
      setCurrentStep(newStep)

      // Auto-save when moving to next step
      try {
        await saveSurveyData(false)
      } catch (error) {
        console.error('Failed to save progress:', error)
      }
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSubmit = async () => {
    if (isSubmitting || isSubmitted) return

    setIsSubmitting(true)
    setSubmitError("")

    try {
      await saveSurveyData(true)
      setIsSubmitted(true)

      // Show success message
      setTimeout(() => {
        alert("Thank you for your valuable feedback! Your responses will help create a more impactful platform for the formerly incarcerated community.")
      }, 500)

    } catch (error) {
      console.error('Survey submission failed:', error)
      setSubmitError(error instanceof Error ? error.message : 'Failed to submit survey')
    } finally {
      setIsSubmitting(false)
    }
  }

  const updateSurveyData = (field: keyof SurveyData, value: any) => {
    setSurveyData(prev => ({ ...prev, [field]: value }))
  }

  const toggleArrayValue = (field: keyof SurveyData, value: string) => {
    const currentArray = surveyData[field] as string[]
    const newArray = currentArray.includes(value)
      ? currentArray.filter(item => item !== value)
      : [...currentArray, value]
    updateSurveyData(field, newArray)
  }

  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
        <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto"
        >
          {/* Header */}
          <div className="text-center mb-8">
            {isSubmitted ? (
              <div className="space-y-4">
                <div className="flex justify-center">
                  <CheckCircle className="h-16 w-16 text-green-500" />
                </div>
                <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
                  Thank You!
                </h1>
                <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                  Your feedback has been successfully submitted. Your insights will help us create a more impactful Web3 platform for the formerly incarcerated community.
                </p>
                <div className="mt-6">
                  <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4 max-w-md mx-auto">
                    <p className="text-sm text-green-800 dark:text-green-200">
                      Survey ID: {sessionId.split('_')[1]}
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <>
                <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
                  Help Shape the Future
                </h1>
                <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                  Your input will help us design the most impactful Web3 platform for formerly incarcerated individuals. Take our comprehensive survey to share your insights.
                </p>
                <div className="mt-6 flex flex-col items-center">
                  <Progress value={progress} className="w-full max-w-md mx-auto" />
                  <p className="text-sm text-gray-500 mt-2">Step {currentStep} of {TOTAL_STEPS}</p>
                </div>
              </>
            )}
          </div>

          {/* Survey Content */}
          {!isSubmitted && (
          <Card className="mb-8">
            <CardContent className="p-8">
              {currentStep === 1 && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <CardHeader className="px-0 pt-0">
                    <CardTitle>Background Information</CardTitle>
                    <CardDescription>Tell us about your relationship to the formerly incarcerated community</CardDescription>
                  </CardHeader>
                  
                  <div className="space-y-6">
                    <div>
                      <Label className="text-base font-medium mb-4 block">
                        What is your relationship to the formerly incarcerated community?
                      </Label>
                      <RadioGroup
                        value={surveyData.relationship}
                        onValueChange={(value) => updateSurveyData("relationship", value)}
                        className="space-y-3"
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="formerly_incarcerated" id="formerly_incarcerated" />
                          <Label htmlFor="formerly_incarcerated">I am formerly incarcerated</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="family_friend" id="family_friend" />
                          <Label htmlFor="family_friend">Family member or friend of someone formerly incarcerated</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="advocate" id="advocate" />
                          <Label htmlFor="advocate">Advocate or service provider</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="investor" id="investor" />
                          <Label htmlFor="investor">Potential investor or partner</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="other" id="other" />
                          <Label htmlFor="other">Other/Prefer not to say</Label>
                        </div>
                      </RadioGroup>
                    </div>

                    <div>
                      <Label className="text-base font-medium mb-4 block">
                        How familiar are you with cryptocurrency and Web3 technology?
                      </Label>
                      <div className="space-y-4">
                        <Slider
                          value={surveyData.cryptoFamiliarity}
                          onValueChange={(value) => updateSurveyData("cryptoFamiliarity", value)}
                          max={10}
                          min={1}
                          step={1}
                          className="w-full"
                        />
                        <div className="flex justify-between text-sm text-gray-500">
                          <span>Not familiar at all</span>
                          <span>Expert level</span>
                        </div>
                        <p className="text-center text-sm">Current: {surveyData.cryptoFamiliarity[0]}/10</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {currentStep === 2 && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <CardHeader className="px-0 pt-0">
                    <CardTitle>Priority Ranking</CardTitle>
                    <CardDescription>Rank these categories by importance for formerly incarcerated individuals</CardDescription>
                  </CardHeader>

                  <div className="space-y-6">
                    <div>
                      <Label className="text-base font-medium mb-4 block">
                        Which utility token concepts do you find most compelling? (Select up to 5)
                      </Label>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {[
                          { value: "governance_token", label: "Community Governance Token - Vote on funding decisions and program development" },
                          { value: "job_marketplace", label: "Decentralized Job Marketplace - Skills-based hiring without background discrimination" },
                          { value: "micro_lending", label: "Peer-to-Peer Lending Protocol - Community-backed loans for entrepreneurs" },
                          { value: "skill_nfts", label: "Skill Verification NFTs - Blockchain certificates for completed training" },
                          { value: "investment_dao", label: "Micro-Investment DAO - Collective investment in formerly incarcerated businesses" },
                          { value: "credit_building", label: "Credit Building System - Alternative credit scoring and financial reputation" },
                          { value: "mentorship_platform", label: "Mentorship Rewards Protocol - Incentivized guidance and career support" },
                          { value: "real_estate", label: "Real Estate Investment Syndication - Fractional property ownership" }
                        ].map((concept) => (
                          <div key={concept.value} className="flex items-start space-x-2 p-3 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800">
                            <Checkbox
                              id={concept.value}
                              checked={surveyData.concepts.includes(concept.value)}
                              onCheckedChange={() => toggleArrayValue("concepts", concept.value)}
                              disabled={surveyData.concepts.length >= 5 && !surveyData.concepts.includes(concept.value)}
                            />
                            <Label htmlFor={concept.value} className="text-sm leading-relaxed cursor-pointer">
                              {concept.label}
                            </Label>
                          </div>
                        ))}
                      </div>
                      <p className="text-sm text-gray-500 mt-2">
                        Selected: {surveyData.concepts.length}/5
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}

              {currentStep === 3 && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <CardHeader className="px-0 pt-0">
                    <CardTitle>Real-World Test Scenarios</CardTitle>
                    <CardDescription>Help us understand how these concepts would work in practice</CardDescription>
                  </CardHeader>

                  <div className="space-y-8">
                    <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-6">
                      <h4 className="font-semibold text-yellow-800 dark:text-yellow-200 mb-3">
                        Scenario A: Marcus - Recent Release, Entrepreneurial Goals
                      </h4>
                      <div className="bg-green-50 dark:bg-green-900/20 border-l-4 border-green-400 p-4 mb-4">
                        <p className="text-sm text-green-800 dark:text-green-200">
                          Marcus was released 6 months ago after 8 years incarcerated. He learned carpentry in prison and wants to start a furniture business but has no credit, limited savings ($500), and struggles with employment due to his record. He's tech-savvy and motivated to learn.
                        </p>
                      </div>

                      <div>
                        <Label className="text-base font-medium mb-4 block">
                          Which combination of token utilities would best help Marcus? (Select up to 3)
                        </Label>
                        <div className="space-y-3">
                          {[
                            { value: "skill_verification_microlending", label: "Skill Verification NFTs + Micro-Lending Protocol" },
                            { value: "mentorship_investment", label: "Mentorship Platform + Investment DAO" },
                            { value: "job_marketplace_credit", label: "Job Marketplace + Credit Building System" },
                            { value: "governance_resources", label: "Governance Token + Resource Access Platform" }
                          ].map((option) => (
                            <div key={option.value} className="flex items-center space-x-2">
                              <Checkbox
                                id={option.value}
                                checked={surveyData.marcusHelp.includes(option.value)}
                                onCheckedChange={() => toggleArrayValue("marcusHelp", option.value)}
                                disabled={surveyData.marcusHelp.length >= 3 && !surveyData.marcusHelp.includes(option.value)}
                              />
                              <Label htmlFor={option.value} className="cursor-pointer">
                                {option.label}
                              </Label>
                            </div>
                          ))}
                        </div>
                        <p className="text-sm text-gray-500 mt-2">
                          Selected: {surveyData.marcusHelp.length}/3
                        </p>
                      </div>
                    </div>

                    <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6">
                      <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-3">
                        Scenario B: Sarah - Established but Limited Growth
                      </h4>
                      <div className="bg-green-50 dark:bg-green-900/20 border-l-4 border-green-400 p-4 mb-4">
                        <p className="text-sm text-green-800 dark:text-green-200">
                          Sarah has been out for 3 years and runs a small catering business. It's profitable but growth is limited by lack of access to capital, difficulty getting contracts with larger clients, and limited business network. She's not familiar with cryptocurrency.
                        </p>
                      </div>

                      <div>
                        <Label className="text-base font-medium mb-4 block">
                          What would be Sarah's biggest barrier to using a Web3 platform?
                        </Label>
                        <RadioGroup
                          value={surveyData.sarahBarrier}
                          onValueChange={(value) => updateSurveyData("sarahBarrier", value)}
                          className="space-y-3"
                        >
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="tech_complexity" id="tech_complexity" />
                            <Label htmlFor="tech_complexity">Technology complexity and learning curve</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="trust_concerns" id="trust_concerns" />
                            <Label htmlFor="trust_concerns">Trust and security concerns</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="time_investment" id="time_investment" />
                            <Label htmlFor="time_investment">Time investment required to participate</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="network_effects" id="network_effects" />
                            <Label htmlFor="network_effects">Need for others to also adopt the platform</Label>
                          </div>
                        </RadioGroup>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {currentStep === 4 && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <CardHeader className="px-0 pt-0">
                    <CardTitle>Community Integration</CardTitle>
                    <CardDescription>Understanding the importance of traditional organization partnerships</CardDescription>
                  </CardHeader>

                  <div className="space-y-6">
                    <div className="bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 rounded-lg p-6">
                      <h4 className="font-semibold text-purple-800 dark:text-purple-200 mb-3">
                        Scenario C: Community Organization Partnership
                      </h4>
                      <div className="bg-green-50 dark:bg-green-900/20 border-l-4 border-green-400 p-4 mb-4">
                        <p className="text-sm text-green-800 dark:text-green-200">
                          A local reentry nonprofit wants to integrate with the Web3 platform to better serve their 200+ clients. They provide job training, housing assistance, and mentorship but struggle with funding and measuring long-term impact.
                        </p>
                      </div>

                      <div>
                        <Label className="text-base font-medium mb-4 block">
                          How important is it that traditional organizations can easily integrate? (1-10 scale)
                        </Label>
                        <div className="space-y-4">
                          <Slider
                            value={surveyData.integrationImportance}
                            onValueChange={(value) => updateSurveyData("integrationImportance", value)}
                            max={10}
                            min={1}
                            step={1}
                            className="w-full"
                          />
                          <div className="flex justify-between text-sm text-gray-500">
                            <span>Not important</span>
                            <span>Critical for success</span>
                          </div>
                          <p className="text-center text-sm">Current: {surveyData.integrationImportance[0]}/10</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {currentStep === 5 && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <CardHeader className="px-0 pt-0">
                    <CardTitle>Implementation Strategy</CardTitle>
                    <CardDescription>Your thoughts on how to make this platform successful</CardDescription>
                  </CardHeader>

                  <div className="space-y-6">
                    <div>
                      <Label className="text-base font-medium mb-4 block">
                        What's the most important factor for initial platform success?
                      </Label>
                      <RadioGroup
                        value={surveyData.successFactor}
                        onValueChange={(value) => updateSurveyData("successFactor", value)}
                        className="space-y-3"
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="simple_interface" id="simple_interface" />
                          <Label htmlFor="simple_interface">Simple, easy-to-use interface</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="real_partners" id="real_partners" />
                          <Label htmlFor="real_partners">Strong partnerships with employers and service providers</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="community_trust" id="community_trust" />
                          <Label htmlFor="community_trust">Trust and endorsement from community leaders</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="proven_results" id="proven_results" />
                          <Label htmlFor="proven_results">Demonstrated results and success stories</Label>
                        </div>
                      </RadioGroup>
                    </div>

                    <div>
                      <Label className="text-base font-medium mb-4 block">
                        How should the platform handle the learning curve for Web3 technology?
                      </Label>
                      <div className="space-y-3">
                        {[
                          { value: "hide_complexity", label: "Hide blockchain complexity behind simple interface" },
                          { value: "education_program", label: "Provide comprehensive Web3 education program" },
                          { value: "hybrid_approach", label: "Offer both traditional and Web3 versions initially" },
                          { value: "peer_mentoring", label: "Peer-to-peer tech mentoring and support" }
                        ].map((option) => (
                          <div key={option.value} className="flex items-center space-x-2">
                            <Checkbox
                              id={option.value}
                              checked={surveyData.learningSupport.includes(option.value)}
                              onCheckedChange={() => toggleArrayValue("learningSupport", option.value)}
                            />
                            <Label htmlFor={option.value} className="cursor-pointer">
                              {option.label}
                            </Label>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {currentStep === 6 && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <CardHeader className="px-0 pt-0">
                    <CardTitle>Additional Feedback</CardTitle>
                    <CardDescription>Share your thoughts and suggestions</CardDescription>
                  </CardHeader>

                  <div className="space-y-6">
                    <div>
                      <Label htmlFor="concerns" className="text-base font-medium mb-4 block">
                        What concerns or challenges do you see with a Web3 approach to empowering formerly incarcerated individuals?
                      </Label>
                      <Textarea
                        id="concerns"
                        placeholder="Share your thoughts on potential challenges, barriers, or concerns..."
                        value={surveyData.concerns}
                        onChange={(e) => updateSurveyData("concerns", e.target.value)}
                        className="min-h-[100px]"
                      />
                    </div>

                    <div>
                      <Label htmlFor="additionalFeatures" className="text-base font-medium mb-4 block">
                        What additional features or utilities would make this platform most valuable?
                      </Label>
                      <Textarea
                        id="additionalFeatures"
                        placeholder="Describe any missing features or improvements you'd suggest..."
                        value={surveyData.additionalFeatures}
                        onChange={(e) => updateSurveyData("additionalFeatures", e.target.value)}
                        className="min-h-[100px]"
                      />
                    </div>

                    <div>
                      <Label htmlFor="otherComments" className="text-base font-medium mb-4 block">
                        Any other comments or suggestions?
                      </Label>
                      <Textarea
                        id="otherComments"
                        placeholder="Share any other thoughts or ideas..."
                        value={surveyData.otherComments}
                        onChange={(e) => updateSurveyData("otherComments", e.target.value)}
                        className="min-h-[100px]"
                      />
                    </div>
                  </div>
                </motion.div>
              )}
            </CardContent>
          </Card>
          )}

          {/* Navigation */}
          {!isSubmitted && (
          <div className="flex justify-between items-center">
            <Button
              variant="outline"
              onClick={prevStep}
              disabled={currentStep === 1}
              className="flex items-center gap-2"
            >
              <ChevronLeft className="h-4 w-4" />
              Previous
            </Button>

            {currentStep === TOTAL_STEPS ? (
              <div className="flex flex-col items-end gap-2">
                {submitError && (
                  <p className="text-sm text-red-600 dark:text-red-400">
                    {submitError}
                  </p>
                )}
                <Button
                  onClick={handleSubmit}
                  disabled={isSubmitting || isSubmitted}
                  className="flex items-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Submitting...
                    </>
                  ) : isSubmitted ? (
                    <>
                      <CheckCircle className="h-4 w-4" />
                      Submitted
                    </>
                  ) : (
                    <>
                      Submit Survey
                      <Send className="h-4 w-4" />
                    </>
                  )}
                </Button>
              </div>
            ) : (
              <Button onClick={nextStep} className="flex items-center gap-2">
                Next
                <ChevronRight className="h-4 w-4" />
              </Button>
            )}
          </div>
          )}
        </motion.div>
        </div>
    </div>
  )
}
