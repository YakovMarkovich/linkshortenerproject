import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { getUserLinks } from "@/data/links";
import { CreateLinkDialog } from "./components/create-link-dialog";
import { EditLinkDialog } from "./components/edit-link-dialog";
import { DeleteLinkDialog } from "./components/delete-link-dialog";

export default async function DashboardPage() {
  const { userId } = await auth();

  if (!userId) {
    redirect("/sign-in");
  }

  const userLinks = await getUserLinks(userId);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Your Links</h1>
          <p className="text-gray-600 mt-2">
            Manage and track all your shortened links
          </p>
        </div>
        <CreateLinkDialog />
      </div>

      {userLinks.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500">
            No links created yet. Create your first shortened link to get
            started!
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {userLinks.map((link) => (
            <div
              key={link.id}
              className="border rounded-lg p-4 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <p className="font-mono text-sm font-semibold text-blue-600">
                    /{link.shortCode}
                  </p>
                  <p className="text-sm text-gray-600 mt-1 break-all">
                    {link.originalUrl}
                  </p>
                  <p className="text-xs text-gray-400 mt-2">
                    Created {new Date(link.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <div className="flex gap-2">
                  <EditLinkDialog
                    linkId={link.id}
                    originalUrl={link.originalUrl}
                    shortCode={link.shortCode}
                  />
                  <DeleteLinkDialog
                    linkId={link.id}
                    shortCode={link.shortCode}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
