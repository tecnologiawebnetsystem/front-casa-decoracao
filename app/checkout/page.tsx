"use client"

import { useState } from "react"
import { CreditCard, MapPin, User, Lock, ArrowLeft, Check, Truck } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { useCart } from "@/contexts/cart-context"
import { useAuth } from "@/contexts/auth-context"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function CheckoutPage() {
  const { items, total, clearCart } = useCart()
  const { user } = useAuth()
  const router = useRouter()

  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    // Dados pessoais
    name: user?.name || "",
    email: user?.email || "",
    phone: "",
    cpf: "",

    // Endereço
    zipCode: "",
    street: "",
    number: "",
    complement: "",
    neighborhood: "",
    city: "",
    state: "",

    // Pagamento
    paymentMethod: "credit",
    cardNumber: "",
    cardName: "",
    cardExpiry: "",
    cardCvv: "",
    installments: "1",

    // Observações
    notes: "",

    // Serviços
    needsMeasurement: false,
    needsInstallation: false,
    measurementDate: "",
    installationDate: "",
  })

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(price)
  }

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const validateStep = (step: number) => {
    switch (step) {
      case 1:
        return formData.name && formData.email && formData.phone && formData.cpf
      case 2:
        return (
          formData.zipCode &&
          formData.street &&
          formData.number &&
          formData.neighborhood &&
          formData.city &&
          formData.state
        )
      case 3:
        if (formData.paymentMethod === "credit") {
          return formData.cardNumber && formData.cardName && formData.cardExpiry && formData.cardCvv
        }
        return true
      default:
        return true
    }
  }

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep((prev) => Math.min(prev + 1, 4))
    }
  }

  const prevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1))
  }

  const handleSubmit = async () => {
    // Simular processamento do pedido
    await new Promise((resolve) => setTimeout(resolve, 2000))
    clearCart()
    router.push("/pedido-confirmado")
  }

  const subtotal = total
  const shipping = subtotal > 299 ? 0 : 29.9
  const finalTotal = subtotal + shipping

  const steps = [
    { number: 1, title: "Dados Pessoais", icon: User },
    { number: 2, title: "Endereço", icon: MapPin },
    { number: 3, title: "Pagamento", icon: CreditCard },
    { number: 4, title: "Confirmação", icon: Check },
  ]

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-neutral-50">
        <Header />
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-md mx-auto text-center">
            <h1 className="text-2xl font-bold text-neutral-800 mb-4">Carrinho vazio</h1>
            <p className="text-neutral-600 mb-6">Adicione produtos ao carrinho para continuar</p>
            <Link href="/produtos">
              <Button className="bg-primary-600 hover:bg-primary-700">Ver Produtos</Button>
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  const CurrentStepIcon = steps[currentStep - 1].icon

  return (
    <div className="min-h-screen bg-neutral-50">
      <Header />

      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Link href="/carrinho">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Voltar ao Carrinho
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-neutral-800">Finalizar Compra</h1>
            <p className="text-neutral-600">Complete seus dados para finalizar o pedido</p>
          </div>
        </div>

        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-between max-w-2xl mx-auto">
            {steps.map((step, index) => (
              <div key={step.number} className="flex items-center">
                <div
                  className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
                    currentStep >= step.number
                      ? "bg-primary-600 border-primary-600 text-white"
                      : "border-neutral-300 text-neutral-400"
                  }`}
                >
                  {currentStep > step.number ? <Check className="h-5 w-5" /> : <step.icon className="h-5 w-5" />}
                </div>
                <div className="ml-3 hidden sm:block">
                  <p
                    className={`text-sm font-medium ${
                      currentStep >= step.number ? "text-primary-600" : "text-neutral-400"
                    }`}
                  >
                    {step.title}
                  </p>
                </div>
                {index < steps.length - 1 && (
                  <div
                    className={`w-12 h-0.5 mx-4 ${currentStep > step.number ? "bg-primary-600" : "bg-neutral-300"}`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Formulário */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CurrentStepIcon className="h-5 w-5" />
                  {steps[currentStep - 1].title}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Etapa 1: Dados Pessoais */}
                {currentStep === 1 && (
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="name">Nome Completo *</Label>
                        <Input
                          id="name"
                          value={formData.name}
                          onChange={(e) => handleInputChange("name", e.target.value)}
                          placeholder="Seu nome completo"
                        />
                      </div>
                      <div>
                        <Label htmlFor="email">E-mail *</Label>
                        <Input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={(e) => handleInputChange("email", e.target.value)}
                          placeholder="seu@email.com"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="phone">Telefone *</Label>
                        <Input
                          id="phone"
                          value={formData.phone}
                          onChange={(e) => handleInputChange("phone", e.target.value)}
                          placeholder="(11) 99999-9999"
                        />
                      </div>
                      <div>
                        <Label htmlFor="cpf">CPF *</Label>
                        <Input
                          id="cpf"
                          value={formData.cpf}
                          onChange={(e) => handleInputChange("cpf", e.target.value)}
                          placeholder="000.000.000-00"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Etapa 2: Endereço */}
                {currentStep === 2 && (
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <Label htmlFor="zipCode">CEP *</Label>
                        <Input
                          id="zipCode"
                          value={formData.zipCode}
                          onChange={(e) => handleInputChange("zipCode", e.target.value)}
                          placeholder="00000-000"
                        />
                      </div>
                      <div className="md:col-span-2">
                        <Label htmlFor="street">Rua *</Label>
                        <Input
                          id="street"
                          value={formData.street}
                          onChange={(e) => handleInputChange("street", e.target.value)}
                          placeholder="Nome da rua"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <Label htmlFor="number">Número *</Label>
                        <Input
                          id="number"
                          value={formData.number}
                          onChange={(e) => handleInputChange("number", e.target.value)}
                          placeholder="123"
                        />
                      </div>
                      <div className="md:col-span-2">
                        <Label htmlFor="complement">Complemento</Label>
                        <Input
                          id="complement"
                          value={formData.complement}
                          onChange={(e) => handleInputChange("complement", e.target.value)}
                          placeholder="Apto, bloco, etc."
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <Label htmlFor="neighborhood">Bairro *</Label>
                        <Input
                          id="neighborhood"
                          value={formData.neighborhood}
                          onChange={(e) => handleInputChange("neighborhood", e.target.value)}
                          placeholder="Nome do bairro"
                        />
                      </div>
                      <div>
                        <Label htmlFor="city">Cidade *</Label>
                        <Input
                          id="city"
                          value={formData.city}
                          onChange={(e) => handleInputChange("city", e.target.value)}
                          placeholder="Nome da cidade"
                        />
                      </div>
                      <div>
                        <Label htmlFor="state">Estado *</Label>
                        <Select value={formData.state} onValueChange={(value) => handleInputChange("state", value)}>
                          <SelectTrigger>
                            <SelectValue placeholder="UF" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="SP">São Paulo</SelectItem>
                            <SelectItem value="RJ">Rio de Janeiro</SelectItem>
                            <SelectItem value="MG">Minas Gerais</SelectItem>
                            <SelectItem value="RS">Rio Grande do Sul</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    {/* Serviços adicionais */}
                    <div className="space-y-4 pt-4 border-t">
                      <h3 className="font-semibold">Serviços Adicionais</h3>

                      <div className="space-y-3">
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="measurement"
                            checked={formData.needsMeasurement}
                            onCheckedChange={(checked) => handleInputChange("needsMeasurement", checked as boolean)}
                          />
                          <Label htmlFor="measurement" className="text-sm">
                            Preciso de medição profissional (Gratuito)
                          </Label>
                        </div>

                        {formData.needsMeasurement && (
                          <div>
                            <Label htmlFor="measurementDate">Data preferida para medição</Label>
                            <Input
                              id="measurementDate"
                              type="date"
                              value={formData.measurementDate}
                              onChange={(e) => handleInputChange("measurementDate", e.target.value)}
                            />
                          </div>
                        )}

                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="installation"
                            checked={formData.needsInstallation}
                            onCheckedChange={(checked) => handleInputChange("needsInstallation", checked as boolean)}
                          />
                          <Label htmlFor="installation" className="text-sm">
                            Preciso de instalação profissional (+R$ 150,00)
                          </Label>
                        </div>

                        {formData.needsInstallation && (
                          <div>
                            <Label htmlFor="installationDate">Data preferida para instalação</Label>
                            <Input
                              id="installationDate"
                              type="date"
                              value={formData.installationDate}
                              onChange={(e) => handleInputChange("installationDate", e.target.value)}
                            />
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {/* Etapa 3: Pagamento */}
                {currentStep === 3 && (
                  <div className="space-y-6">
                    <div>
                      <Label className="text-base font-medium mb-4 block">Forma de Pagamento</Label>
                      <RadioGroup
                        value={formData.paymentMethod}
                        onValueChange={(value) => handleInputChange("paymentMethod", value)}
                      >
                        <div className="flex items-center space-x-2 p-4 border rounded-lg">
                          <RadioGroupItem value="credit" id="credit" />
                          <Label htmlFor="credit" className="flex-1 cursor-pointer">
                            <div className="flex items-center justify-between">
                              <span>Cartão de Crédito</span>
                            </div>
                          </Label>
                        </div>

                        <div className="flex items-center space-x-2 p-4 border rounded-lg">
                          <RadioGroupItem value="debit" id="debit" />
                          <Label htmlFor="debit" className="flex-1 cursor-pointer">
                            Cartão de Débito
                          </Label>
                        </div>

                        <div className="flex items-center space-x-2 p-4 border rounded-lg">
                          <RadioGroupItem value="pix" id="pix" />
                          <Label htmlFor="pix" className="flex-1 cursor-pointer">
                            <div className="flex items-center justify-between">
                              <span>PIX (5% de desconto)</span>
                              <Badge variant="secondary">-5%</Badge>
                            </div>
                          </Label>
                        </div>
                      </RadioGroup>
                    </div>

                    {formData.paymentMethod === "credit" && (
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="cardNumber">Número do Cartão *</Label>
                          <Input
                            id="cardNumber"
                            value={formData.cardNumber}
                            onChange={(e) => handleInputChange("cardNumber", e.target.value)}
                            placeholder="0000 0000 0000 0000"
                          />
                        </div>

                        <div>
                          <Label htmlFor="cardName">Nome no Cartão *</Label>
                          <Input
                            id="cardName"
                            value={formData.cardName}
                            onChange={(e) => handleInputChange("cardName", e.target.value)}
                            placeholder="Nome como está no cartão"
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="cardExpiry">Validade *</Label>
                            <Input
                              id="cardExpiry"
                              value={formData.cardExpiry}
                              onChange={(e) => handleInputChange("cardExpiry", e.target.value)}
                              placeholder="MM/AA"
                            />
                          </div>
                          <div>
                            <Label htmlFor="cardCvv">CVV *</Label>
                            <Input
                              id="cardCvv"
                              value={formData.cardCvv}
                              onChange={(e) => handleInputChange("cardCvv", e.target.value)}
                              placeholder="123"
                            />
                          </div>
                        </div>

                        <div>
                          <Label htmlFor="installments">Parcelas</Label>
                          <Select
                            value={formData.installments}
                            onValueChange={(value) => handleInputChange("installments", value)}
                          >
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="1">1x de {formatPrice(finalTotal)} sem juros</SelectItem>
                              <SelectItem value="2">2x de {formatPrice(finalTotal / 2)} sem juros</SelectItem>
                              <SelectItem value="3">3x de {formatPrice(finalTotal / 3)} sem juros</SelectItem>
                              <SelectItem value="6">6x de {formatPrice(finalTotal / 6)} sem juros</SelectItem>
                              <SelectItem value="12">12x de {formatPrice(finalTotal / 12)} sem juros</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    )}

                    {formData.paymentMethod === "pix" && (
                      <div className="p-4 bg-green-50 rounded-lg">
                        <h4 className="font-medium text-green-800 mb-2">Pagamento via PIX</h4>
                        <p className="text-sm text-green-700">
                          Após confirmar o pedido, você receberá o código PIX para pagamento. O desconto de 5% será
                          aplicado automaticamente.
                        </p>
                      </div>
                    )}
                  </div>
                )}

                {/* Etapa 4: Confirmação */}
                {currentStep === 4 && (
                  <div className="space-y-6">
                    <div>
                      <h3 className="font-semibold mb-4">Confirme seus dados</h3>

                      <div className="space-y-4">
                        <div className="p-4 bg-neutral-50 rounded-lg">
                          <h4 className="font-medium mb-2">Dados Pessoais</h4>
                          <p className="text-sm text-neutral-600">
                            {formData.name} • {formData.email} • {formData.phone}
                          </p>
                        </div>

                        <div className="p-4 bg-neutral-50 rounded-lg">
                          <h4 className="font-medium mb-2">Endereço de Entrega</h4>
                          <p className="text-sm text-neutral-600">
                            {formData.street}, {formData.number} {formData.complement && `- ${formData.complement}`}
                            <br />
                            {formData.neighborhood}, {formData.city} - {formData.state}
                            <br />
                            CEP: {formData.zipCode}
                          </p>
                        </div>

                        <div className="p-4 bg-neutral-50 rounded-lg">
                          <h4 className="font-medium mb-2">Forma de Pagamento</h4>
                          <p className="text-sm text-neutral-600">
                            {formData.paymentMethod === "credit" && `Cartão de Crédito - ${formData.installments}x`}
                            {formData.paymentMethod === "debit" && "Cartão de Débito"}
                            {formData.paymentMethod === "pix" && "PIX (5% desconto)"}
                          </p>
                        </div>

                        {(formData.needsMeasurement || formData.needsInstallation) && (
                          <div className="p-4 bg-neutral-50 rounded-lg">
                            <h4 className="font-medium mb-2">Serviços Adicionais</h4>
                            {formData.needsMeasurement && (
                              <p className="text-sm text-neutral-600">
                                • Medição profissional {formData.measurementDate && `em ${formData.measurementDate}`}
                              </p>
                            )}
                            {formData.needsInstallation && (
                              <p className="text-sm text-neutral-600">
                                • Instalação profissional{" "}
                                {formData.installationDate && `em ${formData.installationDate}`}
                              </p>
                            )}
                          </div>
                        )}
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="notes">Observações (opcional)</Label>
                      <Textarea
                        id="notes"
                        value={formData.notes}
                        onChange={(e) => handleInputChange("notes", e.target.value)}
                        placeholder="Alguma observação especial sobre o pedido..."
                        rows={3}
                      />
                    </div>
                  </div>
                )}

                {/* Botões de navegação */}
                <div className="flex justify-between pt-6 border-t">
                  {currentStep > 1 && (
                    <Button variant="outline" onClick={prevStep}>
                      Voltar
                    </Button>
                  )}

                  <div className="ml-auto">
                    {currentStep < 4 ? (
                      <Button
                        onClick={nextStep}
                        disabled={!validateStep(currentStep)}
                        className="bg-primary-600 hover:bg-primary-700"
                      >
                        Continuar
                      </Button>
                    ) : (
                      <Button onClick={handleSubmit} className="bg-green-600 hover:bg-green-700">
                        <Lock className="h-4 w-4 mr-2" />
                        Finalizar Pedido
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Resumo do pedido */}
          <div>
            <Card className="sticky top-4">
              <CardHeader>
                <CardTitle>Resumo do Pedido</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Produtos */}
                <div className="space-y-3">
                  {items.map((item) => (
                    <div key={item.product.id} className="flex gap-3">
                      <img
                        src={item.product.images[0] || "/placeholder.svg?height=60&width=60"}
                        alt={item.product.name}
                        className="w-15 h-15 object-cover rounded"
                      />
                      <div className="flex-1">
                        <h4 className="font-medium text-sm line-clamp-2">{item.product.name}</h4>
                        <p className="text-xs text-neutral-600">Qtd: {item.quantity}</p>
                        <p className="text-sm font-medium">{formatPrice(item.product.price * item.quantity)}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <Separator />

                {/* Valores */}
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Subtotal</span>
                    <span>{formatPrice(subtotal)}</span>
                  </div>

                  {formData.needsInstallation && (
                    <div className="flex justify-between text-sm">
                      <span>Instalação</span>
                      <span>{formatPrice(150)}</span>
                    </div>
                  )}

                  <div className="flex justify-between text-sm">
                    <span>Frete</span>
                    <span>{shipping === 0 ? "Grátis" : formatPrice(shipping)}</span>
                  </div>

                  {formData.paymentMethod === "pix" && (
                    <div className="flex justify-between text-sm text-green-600">
                      <span>Desconto PIX (5%)</span>
                      <span>-{formatPrice((subtotal + (formData.needsInstallation ? 150 : 0) + shipping) * 0.05)}</span>
                    </div>
                  )}

                  <Separator />

                  <div className="flex justify-between font-bold">
                    <span>Total</span>
                    <span className="text-primary-600">
                      {formatPrice(
                        formData.paymentMethod === "pix"
                          ? (subtotal + (formData.needsInstallation ? 150 : 0) + shipping) * 0.95
                          : subtotal + (formData.needsInstallation ? 150 : 0) + shipping,
                      )}
                    </span>
                  </div>
                </div>

                {/* Informações de segurança */}
                <div className="pt-4 border-t">
                  <div className="flex items-center gap-2 text-sm text-neutral-600">
                    <Lock className="h-4 w-4" />
                    <span>Pagamento 100% seguro</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-neutral-600 mt-1">
                    <Truck className="h-4 w-4" />
                    <span>Entrega em 5-7 dias úteis</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
