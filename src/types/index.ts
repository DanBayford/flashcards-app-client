// Auth types
export type TLoginRequest = { email: string; password: string };
export type TRegisterRequest = { email: string; password: string };
export type TAuthResponse = { accessToken: string; userInfo: TUser };
export type TUser = {
  id: string;
  email: string;
  createdAt: string;
  updatedAt: string;
};

// Question types
export type TQuestionFormValues = {
  prompt: string;
  hint: string;
  answer: string;
  categories: TCategory[];
};

export type TQuestion = {
  id: string;
  prompt: string;
  hint?: string;
  answer: string;
  confidence: number;
  categories: TCategory[];
};

export type TQuestionsRequest = {
  page?: number;
  categoryIds: string[];
  hideMastered?: boolean;
};

export type TPaginatedQuestions = {
  questions: TQuestion[];
} & TPaginationObject;

// Category types
export type TCategory = {
  id: string;
  name: string;
};

// Quiz types

// Misc
export type TPaginationObject = {
  page: number;
  pageSize: number;
  totalCount: number;
  totalPages: number;
};
