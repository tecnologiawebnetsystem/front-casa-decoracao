export interface User {
  id: string
  name: string
  email: string
  role: "admin" | "customer"
  avatar?: string
  createdAt: Date
  lastLogin?: Date
}

export interface Product {
  id: string
  name: string
  description: string
  price: number
  originalPrice?: number
  category: "papel-de-parede" | "cortinas" | "decoracao"
  subcategory: string
  brand: string
  images: string[]
  stock: number
  // Específico para papel de parede
  pattern?: string
  texture?: string
  rollWidth?: number // largura do rolo em cm
  rollLength?: number // comprimento do rolo em metros
  coverage?: number // cobertura em m²
  washable?: boolean
  removable?: boolean
  // Específico para cortinas
  fabricType?: string
  opacity?: "blackout" | "semi-blackout" | "translucido" | "transparente"
  width?: number // largura em cm
  height?: number // altura em cm
  installationType?: "varão" | "trilho" | "ilhós" | "presilha"
  // Específico para decoração
  material?: string
  dimensions?: {
    width: number
    height: number
    depth?: number
  }
  weight?: number
  color: string
  style: string // moderno, clássico, vintage, minimalista, etc.
  room: string[] // sala, quarto, cozinha, banheiro, etc.
  rating: number
  reviews: number
  featured: boolean
  tags: string[]
  createdAt: Date
}

export interface Category {
  id: string
  name: string
  slug: string
  description: string
  image: string
  parentId?: string
  subcategories?: Category[]
  // Específico para cada categoria
  specifications?: string[]
}

export interface Order {
  id: string
  customerId: string
  items: OrderItem[]
  total: number
  subtotal: number
  shipping: number
  tax: number
  discount: number
  status: "pending" | "confirmed" | "measuring" | "production" | "shipped" | "delivered" | "cancelled"
  paymentMethod: string
  paymentStatus: "pending" | "paid" | "failed" | "refunded"
  shippingAddress: Address
  billingAddress: Address
  // Específico para cortinas e papel de parede
  measurementRequired: boolean
  measurementDate?: Date
  installationRequired: boolean
  installationDate?: Date
  createdAt: Date
  updatedAt: Date
  deliveryDate?: Date
}

export interface OrderItem {
  productId: string
  product: Product
  quantity: number
  price: number
  total: number
  // Específico para papel de parede e cortinas
  customMeasurements?: {
    width: number
    height: number
    area?: number
    rolls?: number
  }
  installationNotes?: string
}

export interface Address {
  id: string
  street: string
  number: string
  complement?: string
  neighborhood: string
  city: string
  state: string
  zipCode: string
  country: string
  isDefault: boolean
}

export interface Customer extends User {
  cpf?: string
  phone?: string
  birthDate?: Date
  addresses: Address[]
  orders: Order[]
  wishlist: string[]
  loyaltyPoints: number
  totalSpent: number
  preferredStyle?: string
  preferredRooms?: string[]
}

export interface Employee {
  id: string
  name: string
  email: string
  role: string
  department: string
  salary: number
  hireDate: Date
  status: "active" | "inactive"
  permissions: string[]
  // Específico para decoração
  specialties?: string[] // medição, instalação, consultoria, vendas
}

export interface Supplier {
  id: string
  name: string
  cnpj: string
  email: string
  phone: string
  address: Address
  products: string[]
  paymentTerms: string
  status: "active" | "inactive"
  // Específico para o nicho
  specialty: "papel-de-parede" | "cortinas" | "decoracao" | "todos"
  leadTime: number // prazo de entrega em dias
  minimumOrder?: number
}

export interface MeasurementService {
  id: string
  customerId: string
  address: Address
  scheduledDate: Date
  status: "scheduled" | "completed" | "cancelled"
  rooms: {
    name: string
    measurements: {
      walls?: { width: number; height: number }[]
      windows?: { width: number; height: number }[]
    }
  }[]
  notes?: string
  technician?: string
}

export interface InstallationService {
  id: string
  orderId: string
  customerId: string
  address: Address
  scheduledDate: Date
  status: "scheduled" | "in-progress" | "completed" | "cancelled"
  serviceType: "papel-de-parede" | "cortinas" | "decoracao"
  technician?: string
  estimatedDuration: number // em horas
  notes?: string
}

export interface DesignConsultation {
  id: string
  customerId: string
  type: "virtual" | "presencial"
  scheduledDate: Date
  status: "scheduled" | "completed" | "cancelled"
  consultant: string
  rooms: string[]
  style: string
  budget: number
  notes?: string
  recommendations?: string[]
}

// Novos tipos para o Blog
export interface BlogPost {
  id: string
  title: string
  slug: string
  excerpt: string
  content: string
  featuredImage: string
  images: string[]
  categoryId: string
  category: BlogCategory
  tags: string[]
  keywords: string[]
  author: {
    id: string
    name: string
    avatar?: string
    bio?: string
  }
  status: "draft" | "published" | "scheduled"
  publishedAt?: Date
  scheduledAt?: Date
  views: number
  likes: number
  comments: BlogComment[]
  seo: {
    metaTitle: string
    metaDescription: string
    metaKeywords: string[]
    canonicalUrl?: string
  }
  readingTime: number // em minutos
  featured: boolean
  createdAt: Date
  updatedAt: Date
}

export interface BlogCategory {
  id: string
  name: string
  slug: string
  description: string
  color: string
  icon?: string
  parentId?: string
  subcategories?: BlogCategory[]
  postCount: number
  createdAt: Date
}

export interface BlogComment {
  id: string
  postId: string
  parentId?: string // para respostas
  author: {
    name: string
    email: string
    avatar?: string
  }
  content: string
  status: "pending" | "approved" | "rejected"
  createdAt: Date
  replies?: BlogComment[]
}

export interface BlogTag {
  id: string
  name: string
  slug: string
  color: string
  postCount: number
  createdAt: Date
}
