import type { ReactElement } from "react";

import { pageLead, pageShell, pageTitle } from "@/components/layout/page-container";
import { AdminMockUploadTrigger } from "@/features/admin/components/admin-mock-upload-trigger";

const mockAssets = [
  { id: "a-1", name: "welcome-loop.mp4", type: "video", size: "12 MB" },
  { id: "a-2", name: "tray-hero.jpg", type: "image", size: "2.1 MB" }
];

export default function AdminMediaPage(): ReactElement {
  return (
    <main className={`${pageShell} flex flex-col gap-6 sm:gap-8`}>
      <header className="space-y-2">
        <h1 className={pageTitle}>Media library (mock)</h1>
        <p className={pageLead}>
          Placeholder list for uploads and hosted assets. Wire S3, Cloudinary, or Mux in production;
          use the button to simulate an upload dialog.
        </p>
        <AdminMockUploadTrigger
          buttonLabel="Simulate upload"
          modalTitle="Mock upload"
          modalBody="Real file uploads are not enabled. This dialog demonstrates the Modal primitive and a future upload flow."
        />
      </header>

      <div className="overflow-x-auto rounded-2xl border border-orange-100 bg-white shadow-sm sm:rounded-3xl">
        <table className="w-full min-w-[520px] text-left text-sm">
          <thead className="bg-orange-50">
            <tr>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Type</th>
              <th className="px-4 py-3">Size</th>
            </tr>
          </thead>
          <tbody>
            {mockAssets.map((row) => (
              <tr key={row.id} className="border-t border-orange-100">
                <td className="px-4 py-3 font-medium">{row.name}</td>
                <td className="px-4 py-3">{row.type}</td>
                <td className="px-4 py-3">{row.size}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}
