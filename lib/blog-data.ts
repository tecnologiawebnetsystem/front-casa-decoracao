import type { BlogPost, BlogCategory } from "./types"

export const mockBlogCategories: BlogCategory[] = [
  {
    id: "1",
    name: "Decoração",
    slug: "decoracao",
    description: "Dicas e tendências de decoração para sua casa",
    color: "#8B5CF6",
    postCount: 15,
    createdAt: new Date("2024-01-01"),
  },
  {
    id: "2",
    name: "Papel de Parede",
    slug: "papel-de-parede",
    description: "Tudo sobre papel de parede: instalação, cuidados e tendências",
    color: "#3B82F6",
    postCount: 8,
    createdAt: new Date("2024-01-01"),
  },
  {
    id: "3",
    name: "Cortinas",
    slug: "cortinas",
    description: "Guias completos sobre cortinas e persianas",
    color: "#10B981",
    postCount: 12,
    createdAt: new Date("2024-01-01"),
  },
  {
    id: "4",
    name: "DIY",
    slug: "diy",
    description: "Projetos faça você mesmo para decorar sua casa",
    color: "#F59E0B",
    postCount: 6,
    createdAt: new Date("2024-01-01"),
  },
]

export const mockBlogPosts: BlogPost[] = [
  {
    id: "1",
    title: "10 Tendências de Decoração para 2024",
    slug: "10-tendencias-decoracao-2024",
    excerpt: "Descubra as principais tendências que vão dominar a decoração este ano e como aplicá-las em sua casa.",
    content: `
      <h2>As Principais Tendências de 2024</h2>
      <p>Este ano promete trazer novidades incríveis para o mundo da decoração. Desde cores vibrantes até texturas naturais, vamos explorar as 10 principais tendências que vão transformar os ambientes.</p>
      
      <h3>1. Cores Terrosas</h3>
      <p>As cores terrosas continuam em alta, trazendo aconchego e conexão com a natureza para os ambientes internos.</p>
      
      <h3>2. Papel de Parede Texturizado</h3>
      <p>Papéis de parede com texturas marcantes são a nova sensação, criando pontos focais únicos nos ambientes.</p>
      
      <h3>3. Móveis Curvos</h3>
      <p>Linhas orgânicas e formas curvas dominam o design de móveis, suavizando os ambientes.</p>
    `,
    featuredImage: "/images/blog/tendencias-2024.jpg",
    images: ["/images/blog/tendencias-2024.jpg", "/images/blog/cores-terrosas.jpg"],
    categoryId: "1",
    category: mockBlogCategories[0],
    tags: ["tendências", "2024", "decoração", "cores"],
    keywords: ["decoração 2024", "tendências decoração", "cores terrosas", "papel de parede"],
    author: {
      id: "1",
      name: "Marina Silva",
      avatar: "/images/authors/marina.jpg",
      bio: "Designer de interiores com 10 anos de experiência",
    },
    status: "published",
    publishedAt: new Date("2024-01-15"),
    views: 1250,
    likes: 89,
    comments: [],
    seo: {
      metaTitle: "10 Tendências de Decoração para 2024 | MS Decor Blog",
      metaDescription:
        "Descubra as principais tendências de decoração para 2024. Cores terrosas, papel de parede texturizado e muito mais!",
      metaKeywords: ["decoração 2024", "tendências", "design de interiores"],
    },
    readingTime: 5,
    featured: true,
    createdAt: new Date("2024-01-10"),
    updatedAt: new Date("2024-01-15"),
  },
  {
    id: "2",
    title: "Como Escolher o Papel de Parede Perfeito",
    slug: "como-escolher-papel-de-parede-perfeito",
    excerpt: "Guia completo para escolher o papel de parede ideal para cada ambiente da sua casa.",
    content: `
      <h2>Escolhendo o Papel de Parede Ideal</h2>
      <p>A escolha do papel de parede pode transformar completamente um ambiente. Vamos te ajudar a fazer a escolha perfeita!</p>
      
      <h3>Considere o Ambiente</h3>
      <p>Cada ambiente tem suas particularidades. Quartos pedem padrões mais suaves, enquanto salas podem ousar mais.</p>
      
      <h3>Tamanho do Ambiente</h3>
      <p>Ambientes pequenos se beneficiam de cores claras e padrões pequenos, enquanto espaços grandes podem usar padrões maiores.</p>
    `,
    featuredImage: "/images/blog/papel-parede-guia.jpg",
    images: ["/images/blog/papel-parede-guia.jpg"],
    categoryId: "2",
    category: mockBlogCategories[1],
    tags: ["papel de parede", "guia", "decoração"],
    keywords: ["papel de parede", "como escolher", "decoração parede"],
    author: {
      id: "2",
      name: "Carlos Mendes",
      avatar: "/images/authors/carlos.jpg",
      bio: "Especialista em revestimentos e papel de parede",
    },
    status: "published",
    publishedAt: new Date("2024-01-20"),
    views: 890,
    likes: 67,
    comments: [],
    seo: {
      metaTitle: "Como Escolher o Papel de Parede Perfeito | MS Decor",
      metaDescription:
        "Guia completo para escolher o papel de parede ideal. Dicas de especialista para acertar na decoração.",
      metaKeywords: ["papel de parede", "decoração", "guia"],
    },
    readingTime: 7,
    featured: false,
    createdAt: new Date("2024-01-18"),
    updatedAt: new Date("2024-01-20"),
  },
  {
    id: "3",
    title: "Cortinas Blackout: Guia Completo",
    slug: "cortinas-blackout-guia-completo",
    excerpt: "Tudo que você precisa saber sobre cortinas blackout: benefícios, instalação e manutenção.",
    content: `
      <h2>O Que São Cortinas Blackout?</h2>
      <p>As cortinas blackout são especialmente desenvolvidas para bloquear completamente a entrada de luz, proporcionando escuridão total no ambiente.</p>
      
      <h3>Benefícios das Cortinas Blackout</h3>
      <ul>
        <li>Bloqueio total da luz</li>
        <li>Melhor qualidade do sono</li>
        <li>Economia de energia</li>
        <li>Privacidade total</li>
      </ul>
      
      <h3>Como Instalar</h3>
      <p>A instalação correta é fundamental para garantir a eficiência do bloqueio de luz.</p>
    `,
    featuredImage: "/images/blog/cortinas-blackout.jpg",
    images: ["/images/blog/cortinas-blackout.jpg"],
    categoryId: "3",
    category: mockBlogCategories[2],
    tags: ["cortinas", "blackout", "sono", "instalação"],
    keywords: ["cortinas blackout", "bloqueio luz", "cortinas quarto"],
    author: {
      id: "1",
      name: "Marina Silva",
      avatar: "/images/authors/marina.jpg",
      bio: "Designer de interiores com 10 anos de experiência",
    },
    status: "published",
    publishedAt: new Date("2024-01-25"),
    views: 654,
    likes: 45,
    comments: [],
    seo: {
      metaTitle: "Cortinas Blackout: Guia Completo | MS Decor Blog",
      metaDescription: "Guia completo sobre cortinas blackout. Benefícios, instalação e dicas de especialista.",
      metaKeywords: ["cortinas blackout", "cortinas", "decoração"],
    },
    readingTime: 6,
    featured: true,
    createdAt: new Date("2024-01-23"),
    updatedAt: new Date("2024-01-25"),
  },
]
