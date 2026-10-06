import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ChapterFiveReader from "../../components/chapter-five-reader";
import { chapterMeditations } from "../../../lib/chapter-five";

export const dynamicParams = false;
export function generateStaticParams() {
  return chapterMeditations.map(({ slug }) => ({ slug }));
}
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const entry = chapterMeditations.find(item => item.slug === slug);
  return { title: entry ? `${entry.title} | AI Yoga Masters` : "Practice not found", description: entry ? `Read the original ${entry.title} from Chapter 5, with book references and a separate contemporary AI application.` : undefined };
}
export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const entry = chapterMeditations.find(item => item.slug === slug);
  if (!entry) notFound();
  return <ChapterFiveReader entry={entry} />;
}
