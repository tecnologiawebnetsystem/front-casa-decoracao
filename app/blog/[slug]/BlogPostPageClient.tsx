"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { ArrowLeft, Calendar, Eye, Heart, Share2, Tag, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { mockBlogPosts } from "@/lib/blog-data"
import type { BlogPost } from "@/lib/types"
import OptimizedImage from "@/components/optimized-image"

interface BlogPostPageClientProps {
  slug: string
}

export default function BlogPostPageClient({ slug }: BlogPostPageClientProps) {
  const [liked, setLiked] = useState(false)
  const [post, setPost] = useState<BlogPost | null>(null)
  const [relatedPosts, setRelatedPosts] = useState<BlogPost[]>([])

  useEffect(() => {
    // Encontrar o post pelo slug
    const foundPost = mockBlogPosts.find((p: BlogPost) => p.slug === slug)
    setPost(foundPost || null)

    if (foundPost) {
      // Posts relacionados (mesma categoria)
      const related = mockBlogPosts
        .filter((p: BlogPost) => p.categoryId === foundPost.categoryId && p.id !== foundPost.id)
        .slice(0, 3)
      setRelatedPosts(related)
    }
  }, [slug])

  if (!post) {
    return (
      <div className="min-h-screen bg-neutral-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Post não encontrado</h1>
          <Link href="/blog">
            <Button>Voltar ao Blog</Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <Link href="/blog">
            <Button variant="ghost" className="mb-4">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Voltar ao Blog
            </Button>
          </Link>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <article className="lg:col-span-3">
            <Card>
              <CardContent className="p-0">
                {/* Featured Image */}
                <OptimizedImage
                  src={post.featuredImage}
                  alt={post.title}
                  width={800}
                  height={400}
                  className="w-full h-64 md:h-80 object-cover rounded-t-lg"
                />

                <div className="p-6 md:p-8">
                  {/* Category and Reading Time */}
                  <div className="flex items-center gap-4 mb-4">
                    <Badge
                      variant="secondary"
                      style={{ backgroundColor: `${post.category.color}20`, color: post.category.color }}
                    >
                      {post.category.name}
                    </Badge>
                    <div className="flex items-center gap-1 text-sm text-neutral-500">
                      <Clock className="h-4 w-4" />
                      {post.readingTime} min de leitura
                    </div>
                  </div>

                  {/* Title */}
                  <h1 className="text-3xl md:text-4xl font-bold mb-6 leading-tight">{post.title}</h1>

                  {/* Author and Date */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-4">
                      <OptimizedImage
                        src={post.author.avatar || "/placeholder.svg?height=40&width=40"}
                        alt={post.author.name}
                        width={40}
                        height={40}
                        className="rounded-full"
                      />
                      <div>
                        <p className="font-medium">{post.author.name}</p>
                        <div className="flex items-center gap-4 text-sm text-neutral-500">
                          <div className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            {post.publishedAt?.toLocaleDateString("pt-BR")}
                          </div>
                          <div className="flex items-center gap-1">
                            <Eye className="h-4 w-4" />
                            {post.views} visualizações
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setLiked(!liked)}
                        className={liked ? "text-red-500 border-red-500" : ""}
                      >
                        <Heart className={`h-4 w-4 mr-1 ${liked ? "fill-current" : ""}`} />
                        {post.likes + (liked ? 1 : 0)}
                      </Button>
                      <Button variant="outline" size="sm">
                        <Share2 className="h-4 w-4 mr-1" />
                        Compartilhar
                      </Button>
                    </div>
                  </div>

                  <Separator className="mb-6" />

                  {/* Content */}
                  <div className="prose prose-lg max-w-none" dangerouslySetInnerHTML={{ __html: post.content }} />

                  {/* Tags */}
                  <div className="mt-8 pt-6 border-t">
                    <h3 className="text-lg font-semibold mb-4">Tags</h3>
                    <div className="flex flex-wrap gap-2">
                      {post.tags.map((tag: string) => (
                        <Badge key={tag} variant="outline">
                          <Tag className="h-3 w-3 mr-1" />
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Author Bio */}
                  <div className="mt-8 pt-6 border-t">
                    <div className="flex gap-4">
                      <OptimizedImage
                        src={post.author.avatar || "/placeholder.svg?height=60&width=60"}
                        alt={post.author.name}
                        width={60}
                        height={60}
                        className="rounded-full"
                      />
                      <div>
                        <h3 className="text-lg font-semibold">{post.author.name}</h3>
                        <p className="text-neutral-600">{post.author.bio}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </article>

          {/* Sidebar */}
          <aside className="lg:col-span-1">
            {/* Related Posts */}
            {relatedPosts.length > 0 && (
              <Card>
                <CardHeader>
                  <h3 className="text-lg font-semibold">Posts Relacionados</h3>
                </CardHeader>
                <CardContent className="space-y-4">
                  {relatedPosts.map((relatedPost: BlogPost) => (
                    <Link key={relatedPost.id} href={`/blog/${relatedPost.slug}`}>
                      <div className="flex gap-3 hover:bg-neutral-50 p-2 rounded-lg transition-colors">
                        <OptimizedImage
                          src={relatedPost.featuredImage}
                          alt={relatedPost.title}
                          width={60}
                          height={60}
                          className="rounded-lg object-cover"
                        />
                        <div className="flex-1">
                          <h4 className="font-medium text-sm line-clamp-2">{relatedPost.title}</h4>
                          <div className="flex items-center gap-2 mt-1 text-xs text-neutral-500">
                            <Eye className="h-3 w-3" />
                            {relatedPost.views}
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </CardContent>
              </Card>
            )}

            {/* Newsletter */}
            <Card className="mt-6">
              <CardHeader>
                <h3 className="text-lg font-semibold">Newsletter</h3>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-neutral-600 mb-4">
                  Receba as últimas dicas de decoração diretamente no seu email!
                </p>
                <div className="space-y-2">
                  <input
                    type="email"
                    placeholder="Seu email"
                    className="w-full px-3 py-2 border border-neutral-300 rounded-lg text-sm"
                  />
                  <Button className="w-full" size="sm">
                    Assinar Newsletter
                  </Button>
                </div>
              </CardContent>
            </Card>
          </aside>
        </div>
      </div>
    </div>
  )
}
