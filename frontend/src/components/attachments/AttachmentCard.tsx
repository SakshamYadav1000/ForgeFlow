import {
  Download,
  FileText,
  Trash2,
} from "lucide-react";

import {
  downloadAttachment,
} from "../../services/attachmentService";

import type {
  Attachment,
} from "../../types/attachment";

interface Props {
  attachment: Attachment;
  onDelete: (attachmentId: number) => void;
  deleting: boolean;
}

const formatFileSize = (bytes: number) => {
  if (bytes < 1024) {
    return `${bytes} B`;
  }

  if (bytes < 1024 * 1024) {
    return `${(bytes / 1024).toFixed(1)} KB`;
  }

  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
};

export default function AttachmentCard({
  attachment,
  onDelete,
  deleting,
}: Props) {
  const handleDownload = async () => {
    try {
      const file = await downloadAttachment(
        attachment.id
      );

      const url = window.URL.createObjectURL(file);

      const link = document.createElement("a");

      link.href = url;
      link.download = attachment.file_name;

      document.body.appendChild(link);

      link.click();

      link.remove();

      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error(error);

      alert("Failed to download attachment.");
    }
  };

  const handleDelete = () => {
    const confirmed = window.confirm(
      `Delete "${attachment.file_name}"?`
    );

    if (confirmed) {
      onDelete(attachment.id);
    }
  };

  return (
    <div className="flex items-center justify-between gap-4 rounded-lg border bg-white p-4 shadow-sm">
      <div className="flex min-w-0 items-center gap-3">
        <FileText
          className="shrink-0 text-blue-600"
          size={22}
        />

        <div className="min-w-0">
          <p className="truncate font-medium">
            {attachment.file_name}
          </p>

          <p className="mt-1 text-sm text-gray-500">
            {formatFileSize(attachment.file_size)}
            {" · "}
            {new Date(
              attachment.created_at
            ).toLocaleString()}
          </p>
        </div>
      </div>

      <div className="flex shrink-0 gap-2">
        <button
          type="button"
          onClick={handleDownload}
          className="rounded-md p-2 text-blue-600 hover:bg-blue-50"
          title="Download attachment"
        >
          <Download size={18} />
        </button>

        <button
          type="button"
          onClick={handleDelete}
          disabled={deleting}
          className="rounded-md p-2 text-red-600 hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50"
          title="Delete attachment"
        >
          <Trash2 size={18} />
        </button>
      </div>
    </div>
  );
}