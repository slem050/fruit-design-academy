import { randomUUID } from "node:crypto";

import { readCoursesFromFile, writeCoursesToFile } from "@/features/courses/repositories/courses-file";
import type { Course, CreateCourseInput, UpdateCourseInput } from "@/features/courses/types/course";

const normalizeSlug = (value: string): string => value.trim().toLowerCase().replace(/\s+/g, "-");

export const listCourses = async (): Promise<Course[]> => {
  const courses = await readCoursesFromFile();
  return [...courses].sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1));
};

export const findCourseById = async (id: string): Promise<Course | null> => {
  const courses = await readCoursesFromFile();
  return courses.find((item) => item.id === id) ?? null;
};

export const findCourseBySlug = async (slug: string): Promise<Course | null> => {
  const normalized = normalizeSlug(slug);
  const courses = await readCoursesFromFile();
  const course = courses.find((item) => item.slug === normalized);
  return course ?? null;
};

export const createCourse = async (input: CreateCourseInput): Promise<Course> => {
  const courses = await readCoursesFromFile();
  const normalizedSlug = normalizeSlug(input.slug);

  if (courses.some((item) => item.slug === normalizedSlug)) {
    throw new Error("A course with this slug already exists.");
  }

  const timestamp = new Date().toISOString();
  const course: Course = {
    id: randomUUID(),
    ...input,
    slug: normalizedSlug,
    createdAt: timestamp,
    updatedAt: timestamp
  };

  courses.push(course);
  await writeCoursesToFile(courses);
  return course;
};

export const updateCourse = async (id: string, input: UpdateCourseInput): Promise<Course> => {
  const courses = await readCoursesFromFile();
  const index = courses.findIndex((item) => item.id === id);

  if (index === -1) {
    throw new Error("Course not found.");
  }

  const normalizedSlug = normalizeSlug(input.slug);
  const slugConflict = courses.some((item, i) => i !== index && item.slug === normalizedSlug);

  if (slugConflict) {
    throw new Error("A course with this slug already exists.");
  }

  const existing = courses[index];
  const updated: Course = {
    ...existing,
    ...input,
    slug: normalizedSlug,
    updatedAt: new Date().toISOString()
  };

  courses[index] = updated;
  await writeCoursesToFile(courses);
  return updated;
};
