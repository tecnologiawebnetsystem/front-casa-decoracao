"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  MessageCircle,
  X,
  Send,
  User,
  Bot,
  Camera,
  Palette,
  Ruler,
  Sparkles,
  Mic,
  MicOff,
  ImageIcon,
  Lightbulb,
  ShoppingCart,
  Calendar,
} from "lucide-react"

interface Message {
  id: string
  text: string
  sender: "user" | "bot"
  timestamp: Date
  type?: "text" | "image" | "product" | "suggestion" | "appointment"
  data?: any
}

interface ProductSuggestion {
  id: string
  name: string
  price: number
  image: string
  category: string
  match: number
}

export default function AIDecoratorChatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Olá! Sou a Luna, sua consultora virtual de decoração! 🎨 Posso ajudar você a transformar sua casa. Que tal começarmos?",
      sender: "bot",
      timestamp: new Date(),
      type: "text",
    },
  ])
  const [inputMessage, setInputMessage] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [isListening, setIsListening] = useState(false)
  const [currentStep, setCurrentStep] = useState("greeting")
  const [userProfile, setUserProfile] = useState({
    style: "",
    budget: "",
    room: "",
    preferences: [] as string[],
  })
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const quickActions = [
    { icon: Palette, label: "Escolher Cores", action: "colors" },
    { icon: Ruler, label: "Medir Ambiente", action: "measure" },
    { icon: Camera, label: "Analisar Foto", action: "photo" },
    { icon: Lightbulb, label: "Ideias Criativas", action: "ideas" },
    { icon: ShoppingCart, label: "Ver Produtos", action: "products" },
    { icon: Calendar, label: "Agendar Visita", action: "appointment" },
  ]

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputMessage,
      sender: "user",
      timestamp: new Date(),
      type: "text",
    }

    setMessages((prev) => [...prev, userMessage])
    setInputMessage("")
    setIsTyping(true)

    // Simular processamento de IA
    setTimeout(() => {
      const botResponse = generateAIResponse(inputMessage, currentStep)
      setMessages((prev) => [...prev, botResponse])
      setIsTyping(false)
    }, 1500)
  }

  const generateAIResponse = (message: string, step: string): Message => {
    const lowerMessage = message.toLowerCase()

    // Análise inteligente da mensagem
    if (lowerMessage.includes("sala") || lowerMessage.includes("living")) {
      setCurrentStep("room_analysis")
      return {
        id: (Date.now() + 1).toString(),
        text: "Perfeito! Vamos trabalhar na sua sala! 🛋️ Para criar o projeto ideal, preciso saber: qual é o estilo que você mais gosta?",
        sender: "bot",
        timestamp: new Date(),
        type: "suggestion",
        data: {
          suggestions: ["Moderno", "Clássico", "Minimalista", "Boho", "Industrial", "Escandinavo"],
          type: "style",
        },
      }
    }

    if (lowerMessage.includes("quarto") || lowerMessage.includes("bedroom")) {
      return {
        id: (Date.now() + 1).toString(),
        text: "Que maravilha! O quarto é um espaço muito especial! 🌙 Vou sugerir algumas opções incríveis para você:",
        sender: "bot",
        timestamp: new Date(),
        type: "product",
        data: {
          products: [
            {
              id: "1",
              name: "Papel de Parede Floral Vintage",
              price: 89.9,
              image: "/images/papel-floral-vintage.png",
              category: "Papel de Parede",
              match: 95,
            },
            {
              id: "6",
              name: "Cortina Blackout Elegance",
              price: 299.9,
              image: "/images/cortina-blackout-elegance.png",
              category: "Cortinas",
              match: 88,
            },
          ],
        },
      }
    }

    if (lowerMessage.includes("cor") || lowerMessage.includes("color")) {
      return {
        id: (Date.now() + 1).toString(),
        text: "Cores são fundamentais! 🎨 Baseado na psicologia das cores e tendências 2024, aqui estão minhas sugestões:",
        sender: "bot",
        timestamp: new Date(),
        type: "suggestion",
        data: {
          suggestions: [
            "Sage Green + Bege (Calma e natureza)",
            "Terracota + Creme (Aconchego)",
            "Azul Petróleo + Dourado (Elegância)",
            "Rosa Millennial + Cinza (Modernidade)",
          ],
          type: "colors",
        },
      }
    }

    if (lowerMessage.includes("preço") || lowerMessage.includes("valor") || lowerMessage.includes("orçamento")) {
      return {
        id: (Date.now() + 1).toString(),
        text: "Vamos falar de investimento! 💰 Qual é o seu orçamento aproximado para este projeto?",
        sender: "bot",
        timestamp: new Date(),
        type: "suggestion",
        data: {
          suggestions: ["Até R$ 1.000", "R$ 1.000 - R$ 3.000", "R$ 3.000 - R$ 5.000", "Acima de R$ 5.000"],
          type: "budget",
        },
      }
    }

    if (lowerMessage.includes("medição") || lowerMessage.includes("medir")) {
      return {
        id: (Date.now() + 1).toString(),
        text: "Excelente! A medição é fundamental para um projeto perfeito! 📏 Posso agendar uma visita gratuita para você:",
        sender: "bot",
        timestamp: new Date(),
        type: "appointment",
        data: {
          service: "measurement",
          availableDates: ["Amanhã 14h", "Quinta 10h", "Sexta 16h"],
        },
      }
    }

    // Resposta padrão inteligente
    const responses = [
      "Que interessante! Conte-me mais sobre suas preferências de estilo. Você prefere ambientes mais modernos ou clássicos?",
      "Perfeito! Para criar a melhor solução, preciso entender melhor seu espaço. Que tal me enviar uma foto do ambiente?",
      "Ótima escolha! Vou analisar as melhores opções para você. Qual é o ambiente que você quer transformar?",
      "Entendi! Baseado na minha experiência, tenho algumas sugestões incríveis. Quer ver produtos específicos ou prefere dicas gerais?",
    ]

    return {
      id: (Date.now() + 1).toString(),
      text: responses[Math.floor(Math.random() * responses.length)],
      sender: "bot",
      timestamp: new Date(),
      type: "text",
    }
  }

  const handleQuickAction = (action: string) => {
    let message = ""
    switch (action) {
      case "colors":
        message = "Quero ajuda para escolher cores para meu ambiente"
        break
      case "measure":
        message = "Preciso agendar uma medição"
        break
      case "photo":
        message = "Quero enviar uma foto para análise"
        break
      case "ideas":
        message = "Preciso de ideias criativas para decorar"
        break
      case "products":
        message = "Quero ver produtos para minha casa"
        break
      case "appointment":
        message = "Quero agendar uma consultoria"
        break
    }
    setInputMessage(message)
  }

  const handleSuggestionClick = (suggestion: string, type: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      text: suggestion,
      sender: "user",
      timestamp: new Date(),
      type: "text",
    }

    setMessages((prev) => [...prev, userMessage])

    // Atualizar perfil do usuário
    if (type === "style") {
      setUserProfile((prev) => ({ ...prev, style: suggestion }))
    } else if (type === "budget") {
      setUserProfile((prev) => ({ ...prev, budget: suggestion }))
    }

    // Resposta contextual
    setTimeout(() => {
      let response = ""
      if (type === "style") {
        response = `Excelente escolha! O estilo ${suggestion} é perfeito! Agora me conte: qual ambiente você quer transformar primeiro?`
      } else if (type === "budget") {
        response = `Perfeito! Com esse orçamento posso criar algo incrível para você! Vou buscar as melhores opções.`
      } else if (type === "colors") {
        response = `Que combinação linda! ${suggestion} vai criar um ambiente incrível! Quer ver produtos nessas cores?`
      }

      const botResponse: Message = {
        id: (Date.now() + 2).toString(),
        text: response,
        sender: "bot",
        timestamp: new Date(),
        type: "text",
      }

      setMessages((prev) => [...prev, botResponse])
    }, 1000)
  }

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const userMessage: Message = {
        id: Date.now().toString(),
        text: "Foto enviada para análise",
        sender: "user",
        timestamp: new Date(),
        type: "image",
        data: { fileName: file.name },
      }

      setMessages((prev) => [...prev, userMessage])

      // Simular análise de IA da imagem
      setTimeout(() => {
        const botResponse: Message = {
          id: (Date.now() + 1).toString(),
          text: "Analisei sua foto! 📸 Vejo um ambiente com muito potencial! Baseado na análise, sugiro:",
          sender: "bot",
          timestamp: new Date(),
          type: "suggestion",
          data: {
            suggestions: [
              "Papel de parede geométrico na parede principal",
              "Cortinas em tom neutro para ampliar o espaço",
              "Quadros decorativos para dar personalidade",
              "Plantas para trazer vida ao ambiente",
            ],
            type: "analysis",
          },
        }
        setMessages((prev) => [...prev, botResponse])
      }, 2000)
    }
  }

  const startVoiceRecognition = () => {
    setIsListening(true)
    // Simular reconhecimento de voz
    setTimeout(() => {
      setIsListening(false)
      setInputMessage("Quero decorar minha sala com estilo moderno")
    }, 3000)
  }

  if (!isOpen) {
    return (
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          onClick={() => setIsOpen(true)}
          className="h-16 w-16 rounded-full bg-gradient-to-r from-primary-600 via-purple-600 to-secondary-600 hover:from-primary-700 hover:via-purple-700 hover:to-secondary-700 shadow-2xl animate-pulse-slow group"
        >
          <div className="relative">
            <MessageCircle className="h-7 w-7 group-hover:scale-110 transition-transform" />
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full animate-bounce">
              <Sparkles className="h-3 w-3 text-white" />
            </div>
          </div>
        </Button>
        <div className="absolute -top-12 right-0 bg-black/80 text-white px-3 py-1 rounded-lg text-sm whitespace-nowrap animate-bounce">
          Luna IA - Sua consultora virtual! 🎨
        </div>
      </div>
    )
  }

  return (
    <Card className="fixed bottom-6 right-6 w-96 h-[600px] shadow-2xl z-50 border-0 overflow-hidden">
      {/* Header com gradiente */}
      <CardHeader className="bg-gradient-to-r from-primary-600 via-purple-600 to-secondary-600 text-white p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
              <Bot className="h-6 w-6" />
            </div>
            <div>
              <CardTitle className="text-lg">Luna IA</CardTitle>
              <p className="text-xs text-white/80">Consultora Virtual de Decoração</p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsOpen(false)}
            className="text-white hover:bg-white/20 h-8 w-8 p-0"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>

      <CardContent className="p-0 flex flex-col h-[520px]">
        {/* Quick Actions */}
        <div className="p-4 border-b bg-gradient-to-r from-primary-50 to-secondary-50">
          <div className="grid grid-cols-3 gap-2">
            {quickActions.map((action, index) => (
              <Button
                key={index}
                variant="ghost"
                size="sm"
                onClick={() => handleQuickAction(action.action)}
                className="flex flex-col gap-1 h-auto py-2 hover:bg-white/80"
              >
                <action.icon className="h-4 w-4 text-primary-600" />
                <span className="text-xs">{action.label}</span>
              </Button>
            ))}
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gradient-to-b from-white to-neutral-50">
          {messages.map((message) => (
            <div key={message.id} className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}>
              <div
                className={`flex items-start gap-2 max-w-[85%] ${
                  message.sender === "user" ? "flex-row-reverse" : "flex-row"
                }`}
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                    message.sender === "user" ? "bg-primary-600" : "bg-gradient-to-r from-purple-500 to-pink-500"
                  }`}
                >
                  {message.sender === "user" ? (
                    <User className="h-4 w-4 text-white" />
                  ) : (
                    <Bot className="h-4 w-4 text-white" />
                  )}
                </div>

                <div
                  className={`p-3 rounded-2xl ${
                    message.sender === "user"
                      ? "bg-primary-600 text-white"
                      : "bg-white border shadow-sm text-neutral-800"
                  }`}
                >
                  {message.type === "image" ? (
                    <div className="flex items-center gap-2">
                      <ImageIcon className="h-4 w-4" />
                      <span className="text-sm">{message.data?.fileName}</span>
                    </div>
                  ) : (
                    <p className="text-sm">{message.text}</p>
                  )}

                  {/* Suggestions */}
                  {message.type === "suggestion" && message.data?.suggestions && (
                    <div className="mt-3 space-y-2">
                      {message.data.suggestions.map((suggestion: string, index: number) => (
                        <Button
                          key={index}
                          variant="outline"
                          size="sm"
                          onClick={() => handleSuggestionClick(suggestion, message.data.type)}
                          className="w-full text-left justify-start text-xs hover:bg-primary-50"
                        >
                          {suggestion}
                        </Button>
                      ))}
                    </div>
                  )}

                  {/* Product Suggestions */}
                  {message.type === "product" && message.data?.products && (
                    <div className="mt-3 space-y-3">
                      {message.data.products.map((product: ProductSuggestion) => (
                        <div key={product.id} className="border rounded-lg p-3 bg-neutral-50">
                          <div className="flex items-center gap-3">
                            <img
                              src={product.image || "/placeholder.svg"}
                              alt={product.name}
                              className="w-12 h-12 object-cover rounded-lg"
                            />
                            <div className="flex-1">
                              <h4 className="font-medium text-sm">{product.name}</h4>
                              <p className="text-xs text-neutral-600">{product.category}</p>
                              <div className="flex items-center justify-between mt-1">
                                <span className="font-bold text-primary-600">R$ {product.price.toFixed(2)}</span>
                                <Badge variant="secondary" className="text-xs">
                                  {product.match}% match
                                </Badge>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Appointment */}
                  {message.type === "appointment" && message.data?.availableDates && (
                    <div className="mt-3 space-y-2">
                      {message.data.availableDates.map((date: string, index: number) => (
                        <Button
                          key={index}
                          variant="outline"
                          size="sm"
                          className="w-full text-left justify-start text-xs hover:bg-green-50"
                        >
                          <Calendar className="h-3 w-3 mr-2" />
                          {date}
                        </Button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex justify-start">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
                  <Bot className="h-4 w-4 text-white" />
                </div>
                <div className="bg-white border shadow-sm p-3 rounded-2xl">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-neutral-400 rounded-full animate-bounce"></div>
                    <div
                      className="w-2 h-2 bg-neutral-400 rounded-full animate-bounce"
                      style={{ animationDelay: "0.1s" }}
                    ></div>
                    <div
                      className="w-2 h-2 bg-neutral-400 rounded-full animate-bounce"
                      style={{ animationDelay: "0.2s" }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="p-4 border-t bg-white">
          <div className="flex gap-2">
            <input type="file" ref={fileInputRef} onChange={handleImageUpload} accept="image/*" className="hidden" />

            <Button
              variant="ghost"
              size="sm"
              onClick={() => fileInputRef.current?.click()}
              className="h-10 w-10 p-0 hover:bg-primary-50"
            >
              <Camera className="h-4 w-4 text-primary-600" />
            </Button>

            <Button
              variant="ghost"
              size="sm"
              onClick={startVoiceRecognition}
              className={`h-10 w-10 p-0 ${isListening ? "bg-red-50 text-red-600" : "hover:bg-primary-50"}`}
            >
              {isListening ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4 text-primary-600" />}
            </Button>

            <Input
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="Digite sua mensagem..."
              onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
              className="flex-1 border-primary-200 focus:border-primary-500"
            />

            <Button
              onClick={handleSendMessage}
              disabled={!inputMessage.trim()}
              className="h-10 w-10 p-0 bg-gradient-to-r from-primary-600 to-secondary-600"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
