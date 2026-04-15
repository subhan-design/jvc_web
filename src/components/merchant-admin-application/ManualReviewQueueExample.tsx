/**
 * EXAMPLE IMPLEMENTATION: Manual Review Queue Page with Accurint Reports
 * 
 * This file demonstrates how to integrate Accurint report functionality
 * into a manual review queue or admin dashboard.
 * 
 * Features demonstrated:
 * - Displaying applications in a queue/table
 * - Quick access to Accurint reports via button
 * - Risk status badges for at-a-glance assessment
 * - Integration with AccurintReportModal
 */

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Eye, FileBarChart } from 'lucide-react';
import { getManualReviewOnboardingSessions } from '@/lib/api';
import { AccurintReportButton } from './AccurintReportButton';
import { RiskStatusBadge } from './RiskStatusBadge';
import type { RiskStatus } from '@/lib/api';

interface QueueItem {
  id: string;
  date: string;
  name: string;
  reason: string;
  evidenceRisk?: RiskStatus;
  businessRisk?: RiskStatus;
}

/**
 * Example: Manual Review Queue Component
 * Shows how to integrate Accurint report viewing in a table/list view
 */
export const ManualReviewQueueExample: React.FC = () => {
  const navigate = useNavigate();
  const [applications, setApplications] = useState<QueueItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      const response = await getManualReviewOnboardingSessions();
      
      // Map the response to include mock risk data (replace with actual data from your API)
      const mappedData = response.sessions.map(session => ({
        ...session,
        // These would come from your actual API response
        evidenceRisk: 'M' as RiskStatus, // Mock data
        businessRisk: 'H' as RiskStatus,  // Mock data
      }));
      
      setApplications(mappedData);
    } catch (error) {
      console.error('Failed to fetch applications:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleReviewApplication = (id: string) => {
    // Navigate to full review page
    navigate(`/merchant-admin-application/review/${id}`);
  };

  const formatDate = (dateString: string) => {
    try {
      return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      });
    } catch {
      return dateString;
    }
  };

  return (
    <div className="bg-jvc-blue-950 min-h-screen pt-24">
      <div className="border-t border-white/20 w-full" />

      {/* Hero Section */}
      <section className="bg-jvc-blue-950 text-white py-20 px-4 md:px-16">
        <div className="max-w-7xl mx-auto">
          <nav className="text-sm text-gray-300 mb-6">
            <span className="text-gray-400">Home</span> › 
            <span className="text-white font-medium ml-2">Manual Review Queue</span>
          </nav>
          <h1 className="text-4xl md:text-6xl font-bold leading-tight">Manual Review Queue</h1>
          <p className="mt-4 text-xl text-gray-300">
            Applications requiring manual review and approval
          </p>
        </div>
      </section>

      {/* Content */}
      <div className="bg-white min-h-screen">
        <div className="max-w-7xl mx-auto px-6 py-10">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Pending Applications</CardTitle>
              <CardDescription>
                Review applications, check Accurint reports, and make approval decisions
              </CardDescription>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="text-center py-8">
                  <p className="text-gray-500">Loading applications...</p>
                </div>
              ) : applications.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-gray-500">No applications pending review</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Application ID</TableHead>
                        <TableHead>Merchant Name</TableHead>
                        <TableHead>Date Received</TableHead>
                        <TableHead>Reason</TableHead>
                        <TableHead>Evidence Risk</TableHead>
                        <TableHead>Business Risk</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {applications.map((app) => (
                        <TableRow key={app.id}>
                          <TableCell className="font-mono text-sm">
                            #{app.id}
                          </TableCell>
                          <TableCell className="font-medium">{app.name}</TableCell>
                          <TableCell>{formatDate(app.date)}</TableCell>
                          <TableCell>
                            <span className="text-sm text-gray-600">{app.reason}</span>
                          </TableCell>
                          <TableCell>
                            {app.evidenceRisk ? (
                              <RiskStatusBadge status={app.evidenceRisk} />
                            ) : (
                              <span className="text-gray-400">—</span>
                            )}
                          </TableCell>
                          <TableCell>
                            {app.businessRisk ? (
                              <RiskStatusBadge status={app.businessRisk} />
                            ) : (
                              <span className="text-gray-400">—</span>
                            )}
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex items-center justify-end gap-2">
                              {/* Accurint Report Button */}
                              <AccurintReportButton
                                queryParams={{ applicationId: Number(app.id) }}
                                buttonText="Report"
                                buttonSize="sm"
                                buttonVariant="outline"
                                modalTitle={`Accurint Report - ${app.name}`}
                              />
                              
                              {/* Review Button */}
                              <Button
                                onClick={() => handleReviewApplication(app.id)}
                                size="sm"
                                variant="default"
                              >
                                <Eye className="h-4 w-4 mr-2" />
                                Review
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Additional Info Card */}
          <Card className="mt-6">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <FileBarChart className="h-5 w-5 text-blue-600" />
                About Accurint Reports
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm text-gray-600">
                <p>
                  <strong>Risk Status Levels:</strong>
                </p>
                <ul className="list-disc list-inside space-y-1 ml-2">
                  <li><strong className="text-red-600">High (H):</strong> Significant risk indicators found - requires careful review</li>
                  <li><strong className="text-orange-500">Moderate (M):</strong> Some risk factors present - review recommended</li>
                  <li><strong className="text-yellow-500">Low (L):</strong> Minor concerns identified - standard review</li>
                  <li><strong className="text-green-600">Pass (P):</strong> No significant risk factors detected</li>
                </ul>
                <p className="mt-4">
                  Click "Report" to view the full Accurint business verification report including 
                  detailed risk analysis, business information, and downloadable PDF documentation.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ManualReviewQueueExample;
