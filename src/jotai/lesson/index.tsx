/* eslint-disable @typescript-eslint/no-explicit-any */
import { atom } from "jotai";

export const lessonListAtom = atom<any[]>([]);
export const selectedLessonAtom = atom<any | null>(null);
