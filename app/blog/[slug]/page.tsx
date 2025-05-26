import { mockBlogPosts } from "@/lib/blog-data"
import type { BlogPost } from "@/lib/types"
import BlogPostPageClient from "./BlogPostPageClient"

interface BlogPostPageProps {
  params: Promise<{ slug: string }>
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params
  return <BlogPostPageClient slug={slug} />
}

// Função para gerar metadata (compatível com Next.js 15)
export async function generateMetadata({ params }: BlogPostPageProps) {
  const { slug } = await params
  const post: BlogPost | undefined = mockBlogPosts.find((p: BlogPost) => p.slug === slug)

  if (!post) {
    return {
      title: "Post não encontrado",
    }
  }

  return {
    title: post.seo.metaTitle || post.title,
    description: post.seo.metaDescription || post.excerpt,
    keywords: post.seo.metaKeywords,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: [post.featuredImage],
    },
  }
}

// Função para gerar parâmetros estáticos
export async function generateStaticParams() {
  return mockBlogPosts.map((post: BlogPost) => ({
    slug: post.slug,
  }))
}
