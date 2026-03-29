import type { ReactElement } from "react";

type LessonVideoEmbedProps = {
  videoUrl: string;
};

export function LessonVideoEmbed({ videoUrl }: LessonVideoEmbedProps): ReactElement {
  const trimmed = videoUrl.trim();
  const ytMatch = trimmed.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([\w-]{11})/);
  if (ytMatch) {
    const id = ytMatch[1];
    return (
      <div className="aspect-video w-full max-w-4xl overflow-hidden rounded-2xl bg-neutral-900">
        <iframe
          title="Lesson video"
          className="h-full w-full"
          src={`https://www.youtube.com/embed/${id}`}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    );
  }

  return (
    <p>
      <a
        href={trimmed}
        className="text-sm font-semibold text-orange-700 underline"
        target="_blank"
        rel="noopener noreferrer"
      >
        Open video
      </a>
    </p>
  );
}
