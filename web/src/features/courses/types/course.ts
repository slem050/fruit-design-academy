export type CourseStatus = "draft" | "published";

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
