export type CourseStatus = "draft" | "published";

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
