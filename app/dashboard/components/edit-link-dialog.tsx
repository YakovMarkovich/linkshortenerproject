"use client";

import { useState } from "react";
import { updateLinkAction } from "../actions";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface EditLinkDialogProps {
  linkId: number;
  originalUrl: string;
  shortCode: string;
}

export function EditLinkDialog({
  linkId,
  originalUrl,
  shortCode,
}: EditLinkDialogProps) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>("");
  const [newOriginalUrl, setNewOriginalUrl] = useState(originalUrl);
  const [newShortCode, setNewShortCode] = useState(shortCode);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const result = await updateLinkAction({
        linkId,
        originalUrl: newOriginalUrl,
        shortCode: newShortCode,
      });

      if ("error" in result) {
        setError(result.error);
        return;
      }

      // Close dialog and reload page
      setOpen(false);
      window.location.reload();
    } catch (err) {
      setError("An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger render={<Button variant="outline" size="sm" />}>
        Edit
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Link</DialogTitle>
          <DialogDescription>
            Update the original URL or short code for this link.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="edit-original-url">Original URL *</Label>
              <Input
                id="edit-original-url"
                type="url"
                placeholder="https://example.com"
                value={newOriginalUrl}
                onChange={(e) => setNewOriginalUrl(e.target.value)}
                required
                disabled={loading}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-short-code">Short Code *</Label>
              <Input
                id="edit-short-code"
                placeholder="mycode"
                value={newShortCode}
                onChange={(e) => setNewShortCode(e.target.value)}
                disabled={loading}
                required
              />
            </div>
            {error && (
              <div className="rounded-md bg-red-50 p-3">
                <p className="text-sm text-red-800">{error}</p>
              </div>
            )}
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
              disabled={loading}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? "Updating..." : "Update Link"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
