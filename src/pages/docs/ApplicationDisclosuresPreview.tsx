import React from "react";
import { Card } from "@/components/ui/card";
import { useParams, useSearchParams } from "react-router-dom";
import { useApplicationDisclosures } from "@/hooks/useApplicationDisclosures";
import { Loader2, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

const ApplicationDisclosuresPreview: React.FC = () => {
  const { state } = useParams<{ state: string }>();
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get('sessionId');

  // Fetch dynamic disclosures from API
  const { data, isLoading, isError, error, refetch } = useApplicationDisclosures({
    applicationId: sessionId || null,
    enabled: !!sessionId, // Only fetch if sessionId is available
  });


  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <Card className="bg-white p-8">
          {/* Loading State */}
          {isLoading && (
            <div className="flex flex-col items-center justify-center py-12 space-y-4">
              <Loader2 className="h-12 w-12 animate-spin text-[#043C6B]" />
              <p className="text-gray-600">Loading disclosures...</p>
            </div>
          )}

          {/* Error State */}
          {isError && (
            <div className="flex flex-col items-center justify-center py-12 space-y-4">
              <div className="flex items-center justify-center h-16 w-16 rounded-full bg-red-100">
                <AlertCircle className="h-8 w-8 text-red-600" />
              </div>
              <div className="text-center space-y-2">
                <h3 className="text-lg font-semibold text-gray-900">
                  Failed to Load Disclosures
                </h3>
                <p className="text-sm text-gray-600 max-w-md">
                  {error?.message || 'An error occurred while loading the disclosures. Please try again.'}
                </p>
              </div>
              <Button
                onClick={() => refetch()}
                className="bg-[#043C6B] hover:bg-[#032a52] text-white"
              >
                Retry
              </Button>
            </div>
          )}

          {/* No Session ID - Show Message */}
          {!sessionId && !isLoading && !isError && (
            <div className="text-center py-12">
              <AlertCircle className="h-12 w-12 text-amber-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Session ID Required
              </h3>
              <p className="text-sm text-gray-600 max-w-md mx-auto">
                Please provide a valid session ID to view the application disclosures.
              </p>
            </div>
          )}

          {/* Success State - Display Dynamic Disclosures */}
          {data?.data && !isLoading && !isError && (
            <div className="prose prose-lg max-w-none">
              <div className="text-center mb-8">
                <h2 className="text-xl font-semibold text-gray-900 mb-2">
                  {data.data.title || 'Application Disclosures'}
                </h2>
                {data.data.effectiveDate && (
                  <p className="text-sm text-gray-600">
                    Effective Date: {new Date(data.data.effectiveDate).toLocaleDateString()}
                  </p>
                )}
              </div>

              {/* Dynamic Sections */}
              <div className="space-y-6 text-sm text-gray-700">
                {data.data.sections.map((section, sectionIndex) => (
                  <div
                    key={sectionIndex}
                    className="border rounded-md overflow-hidden"
                  >
                    {/* Section Header */}
                    <div className="bg-gray-100 px-3 py-2 text-xs sm:text-sm font-medium text-gray-700">
                      {section.name}
                    </div>

                    {/* Section Rows */}
                    <div className="divide-y">
                      {section.rows.map((row, rowIndex) => (
                        <div
                          key={rowIndex}
                          className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-3 text-sm"
                        >
                          {/* Label Column */}
                          <div className="font-semibold text-[#043C6B]">
                            {row.label}
                          </div>

                          {/* Value Column */}
                          <div className="sm:col-span-2">
                            {typeof row.value === 'string' ? (
                              <div
                                dangerouslySetInnerHTML={{ __html: row.value }}
                                className="prose prose-sm max-w-none"
                              />
                            ) : (
                              row.value
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
};

export default ApplicationDisclosuresPreview;
