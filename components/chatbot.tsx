"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MessageCircle, X, Send, User, Bot } from "lucide-react"

interface Message {
  id: string
  text: string
  sender: "user" | "bot"
  timestamp: Date
}

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Olá! Sou o assistente virtual da Casa Decoração. Como posso ajudá-lo hoje?",
      sender: "bot",
      timestamp: new Date(),
    },
  ])
  const [inputMessage, setInputMessage] = useState("")

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputMessage,
      sender: "user",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputMessage("")

    // Simular resposta do bot
    setTimeout(() => {
      const botResponse = getBotResponse(inputMessage)
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: botResponse,
        sender: "bot",
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, botMessage])
    }, 1000)
  }

  const getBotResponse = (message: string): string => {
    const lowerMessage = message.toLowerCase()

    if (lowerMessage.includes("preço") || lowerMessage.includes("valor")) {
      return "Nossos preços são muito competitivos! Você pode ver os valores de todos os produtos em nosso site. Há algum produto específico que você gostaria de saber o preço?"
    }

    if (lowerMessage.includes("entrega") || lowerMessage.includes("frete")) {
      return "Oferecemos frete grátis para compras acima de R$ 299! O prazo de entrega varia de 3 a 15 dias úteis dependendo da sua região. Posso ajudar com mais alguma coisa?"
    }

    if (lowerMessage.includes("produto") || lowerMessage.includes("móvel")) {
      return "Temos uma grande variedade de móveis e decoração! Você pode navegar por nossas categorias: Móveis, Decoração e Iluminação. Está procurando algo específico?"
    }

    if (lowerMessage.includes("pagamento")) {
      return "Aceitamos cartão de crédito, débito, PIX e boleto bancário. Também oferecemos parcelamento em até 12x sem juros! Como prefere pagar?"
    }

    return "Entendi! Para mais informações detalhadas, recomendo que entre em contato com nosso atendimento pelo telefone (11) 3000-0000 ou navegue pelo nosso site. Posso ajudar com mais alguma coisa?"
  }

  if (!isOpen) {
    return (
      <Button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 h-14 w-14 rounded-full bg-primary-600 hover:bg-primary-700 shadow-lg z-50"
      >
        <MessageCircle className="h-6 w-6" />
      </Button>
    )
  }

  return (
    <Card className="fixed bottom-6 right-6 w-80 h-96 shadow-xl z-50">
      <CardHeader className="bg-primary-600 text-white rounded-t-lg">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm">Assistente Virtual</CardTitle>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsOpen(false)}
            className="text-white hover:bg-primary-700"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>

      <CardContent className="p-0 flex flex-col h-80">
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message) => (
            <div key={message.id} className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}>
              <div
                className={`flex items-start gap-2 max-w-[80%] ${
                  message.sender === "user" ? "flex-row-reverse" : "flex-row"
                }`}
              >
                <div
                  className={`w-6 h-6 rounded-full flex items-center justify-center ${
                    message.sender === "user" ? "bg-primary-600" : "bg-neutral-200"
                  }`}
                >
                  {message.sender === "user" ? (
                    <User className="h-3 w-3 text-white" />
                  ) : (
                    <Bot className="h-3 w-3 text-neutral-600" />
                  )}
                </div>
                <div
                  className={`p-3 rounded-lg text-sm ${
                    message.sender === "user" ? "bg-primary-600 text-white" : "bg-neutral-100 text-neutral-800"
                  }`}
                >
                  {message.text}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="p-4 border-t">
          <div className="flex gap-2">
            <Input
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="Digite sua mensagem..."
              onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
              className="flex-1"
            />
            <Button onClick={handleSendMessage} size="sm">
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
