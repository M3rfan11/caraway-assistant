'use client'

import { Card } from '@/components/ui/card'
import { AlertCircle, Heart, Stethoscope, Pill, Clock } from 'lucide-react'

interface ResultsDisplayProps {
  data: {
    message: string
    chat_done: boolean
    symptoms?: string[]
    summary?: string
    diagnoses?: string[]
    specialties?: string[]
    medical_history_summary?: string
  } | null
}

export function ResultsDisplay({ data }: ResultsDisplayProps) {
  if (!data || !data.chat_done) {
    return null
  }

  return (
    <div className="space-y-6 p-4 sm:p-6">
      {/* Summary Section */}
      {data.summary && (
        <Card className="border border-gray-200 bg-white p-4 sm:p-6">
          <div className="mb-4 flex items-start gap-3">
            <AlertCircle className="mt-1 h-5 w-5 flex-shrink-0 text-primary" />
            <div>
              <h2 className="text-lg font-semibold text-foreground">Medical Summary</h2>
              <p className="text-sm text-muted-foreground">Based on your symptoms and medical history</p>
            </div>
          </div>
          <div className="rounded-lg bg-secondary p-4">
            <p className="whitespace-pre-wrap text-sm leading-relaxed text-foreground">{data.summary}</p>
          </div>
        </Card>
      )}

      {/* Symptoms Section */}
      {data.symptoms && data.symptoms.length > 0 && (
        <Card className="border border-gray-200 bg-white p-4 sm:p-6">
          <div className="mb-4 flex items-start gap-3">
            <Heart className="mt-1 h-5 w-5 flex-shrink-0 text-primary" />
            <div>
              <h2 className="text-lg font-semibold text-foreground">Identified Symptoms</h2>
              <p className="text-sm text-muted-foreground">{data.symptoms.length} symptom(s) detected</p>
            </div>
          </div>
          <div className="space-y-2">
            {data.symptoms.map((symptom, index) => (
              <div key={index} className="flex items-center gap-3 rounded-lg bg-secondary px-3 py-2">
                <div className="h-2 w-2 rounded-full bg-primary"></div>
                <span className="text-sm text-foreground">{symptom}</span>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* Diagnoses Section */}
      {data.diagnoses && data.diagnoses.length > 0 && (
        <Card className="border border-gray-200 bg-white p-4 sm:p-6">
          <div className="mb-4 flex items-start gap-3">
            <Stethoscope className="mt-1 h-5 w-5 flex-shrink-0 text-primary" />
            <div>
              <h2 className="text-lg font-semibold text-foreground">Possible Diagnoses</h2>
              <p className="text-sm text-muted-foreground">
                For professional evaluation (not a medical diagnosis)
              </p>
            </div>
          </div>
          <div className="space-y-2">
            {data.diagnoses.map((diagnosis, index) => (
              <div
                key={index}
                className="flex items-center gap-3 rounded-lg border border-primary/20 bg-primary/5 px-3 py-2"
              >
                <div className="h-2 w-2 rounded-full bg-primary"></div>
                <span className="text-sm font-medium text-primary">{diagnosis}</span>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* Specialties Section */}
      {data.specialties && data.specialties.length > 0 && (
        <Card className="border border-gray-200 bg-white p-4 sm:p-6">
          <div className="mb-4 flex items-start gap-3">
            <Pill className="mt-1 h-5 w-5 flex-shrink-0 text-primary" />
            <div>
              <h2 className="text-lg font-semibold text-foreground">Recommended Specialties</h2>
              <p className="text-sm text-muted-foreground">Consider consulting these specialists</p>
            </div>
          </div>
          <div className="grid gap-2 sm:grid-cols-2">
            {data.specialties.map((specialty, index) => (
              <div key={index} className="flex items-center gap-3 rounded-lg bg-secondary px-3 py-2">
                <div className="h-2 w-2 rounded-full bg-primary"></div>
                <span className="text-sm text-foreground">{specialty}</span>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* Medical History Section */}
      {data.medical_history_summary && (
        <Card className="border border-gray-200 bg-white p-4 sm:p-6">
          <div className="mb-4 flex items-start gap-3">
            <Clock className="mt-1 h-5 w-5 flex-shrink-0 text-primary" />
            <div>
              <h2 className="text-lg font-semibold text-foreground">Medical History</h2>
              <p className="text-sm text-muted-foreground">Patient records summary</p>
            </div>
          </div>
          <div className="overflow-x-auto rounded-lg bg-secondary p-4">
            <pre className="whitespace-pre-wrap break-words text-xs leading-relaxed text-foreground/80">
              {data.medical_history_summary}
            </pre>
          </div>
        </Card>
      )}

      {/* Disclaimer */}
      <div className="rounded-lg border border-yellow-200 bg-yellow-50 p-4">
        <p className="text-xs leading-relaxed text-yellow-900">
          <strong>Disclaimer:</strong> This assessment is for informational purposes only and should not be considered
          a substitute for professional medical advice, diagnosis, or treatment. Always consult with a qualified
          healthcare provider for any health concerns.
        </p>
      </div>
    </div>
  )
}
