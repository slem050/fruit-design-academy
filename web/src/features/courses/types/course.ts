import type { Language } from "@/features/i18n/types/language";

export type CourseStatus = "draft" | "published";

export type LocalizedLessonStrings = {
  title?: string;
  description?: string;
};

export type LocalizedModuleStrings = {
  title?: string;
  lessons?: Record<string, LocalizedLessonStrings>;
};

export type CourseLanguageStrings = {
  title?: string;
  subtitle?: string;
  description?: string;
  marketingText?: string;
  modules?: Record<string, LocalizedModuleStrings>;
};

export type CourseLocalization = Partial<Record<Language, CourseLanguageStrings>>;

export type Lesson = {
  id: string;
  moduleId: string;
  title: string;
  description: string;
  videoUrl: string;
  isPreview: boolean;
  order: number;
  duration: number;
};

export type CourseModule = {
  id: string;
  courseId: string;
  title: string;
  order: number;
  lessons: Lesson[];
};

export type Course = {
  id: string;
  title: string;
  slug: string;
  subtitle: string;
  description: string;
  marketingText: string;
  price: number;
  status: CourseStatus;
  thumbnailUrl: string;
  isFeatured: boolean;
  createdAt: string;
  updatedAt: string;
  modules: CourseModule[];
  localization?: CourseLocalization;
};

export type CreateCourseInput = {
  title: string;
  slug: string;
  subtitle: string;
  description: string;
  marketingText: string;
  price: number;
  status: CourseStatus;
  thumbnailUrl: string;
  isFeatured: boolean;
};

export type UpdateCourseInput = CreateCourseInput;
