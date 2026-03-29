"use client";

import type { ReactElement } from "react";
import { useState } from "react";

import { Modal } from "@/components/ui/modal";

type AdminMockUploadTriggerProps = {
  buttonLabel: string;
  modalTitle: string;
  modalBody: string;
};

export function AdminMockUploadTrigger({
  buttonLabel,
  modalTitle,
  modalBody
}: AdminMockUploadTriggerProps): ReactElement {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="inline-flex min-h-10 items-center justify-center rounded-full bg-orange-500 px-5 py-2.5 text-sm font-semibold text-white hover:bg-orange-600"
      >
        {buttonLabel}
      </button>
      <Modal open={open} onClose={() => setOpen(false)} title={modalTitle}>
        <p>{modalBody}</p>
      </Modal>
    </>
  );
}
