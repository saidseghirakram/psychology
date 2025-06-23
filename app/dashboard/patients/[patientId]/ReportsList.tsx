import { jsPDF } from "jspdf";

interface Message {
  date: string;
  text: string;
}
interface HistoryReport {
  id: number;
  doctor_id: number;
  patient_id: number;
  messages: Message[];
  created_at: string;
  updated_at: string;
}

export default function ReportsList({
  patientName,
  historyReports,
}: {
  patientName: string;
  historyReports: HistoryReport[];
}) {
  // Sort reports by created_at descending (latest first)
  const sortedReports = (historyReports || [])
    .slice()
    .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());

  const hasReports = sortedReports.length > 0;

  const handleDownloadSinglePDF = (report: HistoryReport, idx: number) => {
    const doc = new jsPDF();
    const leftMargin = 10;
    const rightMargin = 200;
    const lineHeight = 8;
    let y = 20;

    // Use created_at for the report date
    const dateStr = new Date(report.created_at).toLocaleString();
    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.text(`Report Date: ${dateStr}`, leftMargin, y);
    y += lineHeight;

    doc.setFontSize(11);
    doc.setFont("helvetica", "normal");
    // Combine all messages' text for this report
    const fullText = report.messages.map((m) => m.text).join("\n\n");
    const lines = doc.splitTextToSize(fullText, rightMargin - leftMargin);
    (lines as string[]).forEach((line: string) => {
      doc.text(line, leftMargin, y);
      y += lineHeight;
      if (y > 280) {
        doc.addPage();
        y = 20;
      }
    });

    doc.save(
      `${patientName.replace(/\s+/g, '_')}_report_${dateStr.replace(/[^\d]/g, '')}_${idx + 1}.pdf`
    );
  };

  return (
    <div className="p-6 rounded-xl shadow bg-background border flex flex-col w-full">
      <div className="flex items-center gap-2 mb-3">
        <h3 className="text-base font-bold text-primary">Reports</h3>
      </div>
      {hasReports ? (
        <div className="flex flex-col gap-3">
          {sortedReports.map((report, idx) => (
            <button
              key={report.id}
              onClick={() => handleDownloadSinglePDF(report, idx)}
              className="btn btn-primary w-full py-2 rounded bg-primary text-white hover:bg-blue-700 transition"
            >
              Download Report PDF ({new Date(report.created_at).toLocaleString()})
            </button>
          ))}
        </div>
      ) : (
        <span className="text-muted-foreground">No reports available.</span>
      )}
    </div>
  );
} 