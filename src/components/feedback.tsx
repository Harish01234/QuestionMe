'use client'

import React, { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'

interface CategoryScores {
  [key: string]: number
}

interface Feedback {
  _id: string
  interviewId: string
  finalAssessment: string
  totalScore: number
  strengths: string[]
  areasForImprovement: string[]
  categoryScores: CategoryScores
  createdAt: Date
}

const Feedbackall = () => {
  const { data: session, status } = useSession()
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([])
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    if (status === 'authenticated' && session?.user?.id) {
      const fetchFeedbacks = async () => {
        setLoading(true)
        try {
          const res = await fetch('/api/getfeedbackbyid', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id: session.user.id }),
          })

          const result = await res.json()
          if (result.success) {
            setFeedbacks(result.data)
          } else {
            console.error('API Error:', result.error)
          }
        } catch (err) {
          console.error('Fetch Error:', err)
        } finally {
          setLoading(false)
        }
      }

      fetchFeedbacks()
    }
  }, [session, status])

  if (status === 'loading' || loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-pulse text-center">
          <div className="h-4 bg-gray-300 rounded w-32 mb-4"></div>
          <div className="h-10 bg-gray-400 rounded w-48"></div>
        </div>
      </div>
    )
  }

  if (feedbacks.length === 0) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-center p-8 max-w-md bg-white rounded-xl shadow-md">
          <h2 className="text-2xl font-bold text-first mb-2">No Feedbacks Yet</h2>
          <p className="text-gray-500">No feedback records found for your account.</p>
        </div>
      </div>
    )
  }

  const formatDate = (dateString: string): string => {
    try {
      const date = new Date(dateString)
      const options: Intl.DateTimeFormatOptions = {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      }
      return date.toLocaleDateString(undefined, options)
    } catch (error) {
      return dateString
    }
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center text-first mb-10">
        Your Interview Feedback
      </h1>

      <div className="grid gap-8">
        {feedbacks.map((feedback) => (
          <div
            key={feedback._id}
            className="bg-white rounded-2xl shadow-lg border border-gray-200 transition hover:shadow-xl"
          >
            <div className="bg-forth text-white px-6 py-4 rounded-t-2xl">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold">
                  {feedback.interviewId || 'Interview Feedback'}
                </h2>
                <span className="bg-third text-sm px-3 py-1 rounded-full">
                  Score: {feedback.totalScore}/100
                </span>
              </div>
              <p className="text-sm opacity-80">{formatDate(feedback.createdAt)}</p>
            </div>

            <div className="p-6">
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Final Assessment</h3>
                <p className="bg-gray-100 p-4 rounded-lg text-gray-700">
                  {feedback.finalAssessment}
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">Strengths</h3>
                  {feedback.strengths.length > 0 ? (
                    <ul className="space-y-2">
                      {feedback.strengths.map((item, i) => (
                        <li key={i} className="flex items-start">
                          <span className="mr-2 text-third">✓</span>
                          <span className="text-gray-700">{item}</span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-gray-500 italic">No strengths recorded</p>
                  )}
                </div>

                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">Areas for Improvement</h3>
                  {feedback.areasForImprovement.length > 0 ? (
                    <ul className="space-y-2">
                      {feedback.areasForImprovement.map((item, i) => (
                        <li key={i} className="flex items-start">
                          <span className="mr-2 text-third">➤</span>
                          <span className="text-gray-700">{item}</span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-gray-500 italic">No improvement areas recorded</p>
                  )}
                </div>
              </div>

              {feedback.categoryScores && Object.keys(feedback.categoryScores).length > 0 && (
                <div className="mt-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-3">Category Scores</h3>
                  <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {Object.entries(feedback.categoryScores).map(([cat, score], i) => (
                      <div key={i} className="bg-gray-100 p-3 rounded-lg">
                        <div className="text-sm text-gray-600 mb-1">{cat}</div>
                        <div className="flex items-center">
                          <div className="w-full bg-gray-300 rounded-full h-2.5 mr-2">
                            <div
                              className="bg-third h-2.5 rounded-full"
                              style={{ width: `${score}%` }}
                            ></div>
                          </div>
                          <span className="text-sm font-medium text-gray-700">{score}/100</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Feedbackall
