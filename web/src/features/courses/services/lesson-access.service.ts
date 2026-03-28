export type LessonAccessParams = {
  isPreview: boolean;
  hasPurchased: boolean;
};

/**
 * Preview lessons are public; full access requires purchase (enforced server-side in production).
 */
export function canAccessLessonContent(params: LessonAccessParams): boolean {
  return params.isPreview || params.hasPurchased;
}

export function lessonAccessLabel(params: LessonAccessParams): "preview" | "locked" | "purchased" {
  if (params.isPreview) {
    return "preview";
  }
  if (params.hasPurchased) {
    return "purchased";
  }
  return "locked";
}
