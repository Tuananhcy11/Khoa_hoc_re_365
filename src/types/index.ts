export interface Course {
  id: string;
  slug: string;
  title: string;
  category: string;
  image: string;
  salePrice: string;
  regularPrice: string;
  discount: string;
  rating: number;
  reviewsCount: number;
  studentsCount: number;
  isFlashSale?: boolean;
  buttonText?: string;
  href?: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  icon: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  avatar: string;
  rating: number;
  content: string;
  course: string;
}

export interface MembershipPlan {
  id: string;
  name: string;
  price: string;
  period: string;
  popular?: boolean;
  badge?: string;
  description: string;
  features: string[];
  buttonText: string;
  buttonHref: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface ToolItem {
  title: string;
  category: string;
  image: string;
  price: string;
  tag: string;
}

export interface GoalItem {
  title: string;
  desc: string;
  icon: string;
  count: string;
}
