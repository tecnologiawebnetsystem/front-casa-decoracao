"use client"
import ProfessionalAdminLayout from "@/components/admin/professional-admin-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import {
  Package,
  CreditCard,
  Truck,
  Wrench,
  Calendar,
  CheckCircle,
  User,
  MapPin,
  Phone,
  Eye,
  Edit,
  ArrowRight,
} from "lucide-react"
import { useNotifications } from "@/contexts/notifications-context"

export default function WorkflowPage() {
  const { notifications } = useNotifications()

  // Dados simulados de pedidos em workflow
  const workflowOrders = [
    {
      id: "#12349",
      customer: "Maria Silva",
      phone: "(11) 99999-9999",
      address: "Rua das Flores, 123 - São Paulo/SP",
      total: 2599.9,
      currentStep: 2,
      steps: [
        { id: 1, name: "Pedido Recebido", status: "completed", date: "15/01 10:30", icon: Package },
        { id: 2, name: "Pagamento Aprovado", status: "completed", date: "15/01 10:45", icon: CreditCard },
        { id: 3, name: "Medição Agendada", status: "current", date: "18/01 14:00", icon: Calendar },
        { id: 4, name: "Produção", status: "pending", date: "", icon: Wrench },
        { id: 5, name: "Entrega", status: "pending", date: "", icon: Truck },
        { id: 6, name: "Instalação", status: "pending", date: "", icon: Wrench },
        { id: 7, name: "Concluído", status: "pending", date: "", icon: CheckCircle },
      ],
      priority: "high",
      technician: "Carlos Oliveira",
      notes: "Cliente prefere instalação pela manhã",
    },
    {
      id: "#12350",
      customer: "João Santos",
      phone: "(11) 88888-8888",
      address: "Av. Paulista, 456 - São Paulo/SP",
      total: 1899.9,
      currentStep: 4,
      steps: [
        { id: 1, name: "Pedido Recebido", status: "completed", date: "14/01 09:15", icon: Package },
        { id: 2, name: "Pagamento Aprovado", status: "completed", date: "14/01 09:30", icon: CreditCard },
        { id: 3, name: "Medição Realizada", status: "completed", date: "16/01 10:00", icon: Calendar },
        { id: 4, name: "Em Produção", status: "current", date: "17/01", icon: Wrench },
        { id: 5, name: "Entrega", status: "pending", date: "", icon: Truck },
        { id: 6, name: "Instalação", status: "pending", date: "", icon: Wrench },
        { id: 7, name: "Concluído", status: "pending", date: "", icon: CheckCircle },
      ],
      priority: "medium",
      technician: "Fernanda Lima",
      notes: "Cortinas para sala e quartos",
    },
    {
      id: "#12351",
      customer: "Ana Costa",
      phone: "(11) 77777-7777",
      address: "Rua Augusta, 789 - São Paulo/SP",
      total: 3299.9,
      currentStep: 6,
      steps: [
        { id: 1, name: "Pedido Recebido", status: "completed", date: "10/01 14:20", icon: Package },
        { id: 2, name: "Pagamento Aprovado", status: "completed", date: "10/01 14:35", icon: CreditCard },
        { id: 3, name: "Medição Realizada", status: "completed", date: "12/01 09:00", icon: Calendar },
        { id: 4, name: "Produção Concluída", status: "completed", date: "16/01", icon: Wrench },
        { id: 5, name: "Entregue", status: "completed", date: "17/01 15:30", icon: Truck },
        { id: 6, name: "Instalação Hoje", status: "current", date: "18/01 14:00", icon: Wrench },
        { id: 7, name: "Concluído", status: "pending", date: "", icon: CheckCircle },
      ],
      priority: "urgent",
      technician: "Roberto Silva",
      notes: "Projeto completo - sala e quarto",
    },
  ]

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(price)
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "urgent":
        return "border-l-red-500 bg-red-50"
      case "high":
        return "border-l-orange-500 bg-orange-50"
      case "medium":
        return "border-l-blue-500 bg-blue-50"
      case "low":
        return "border-l-green-500 bg-green-50"
      default:
        return "border-l-neutral-300 bg-neutral-50"
    }
  }

  const getStepStatus = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-500 text-white"
      case "current":
        return "bg-blue-500 text-white animate-pulse"
      case "pending":
        return "bg-neutral-200 text-neutral-500"
      default:
        return "bg-neutral-200 text-neutral-500"
    }
  }

  return (
    <ProfessionalAdminLayout>
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
            Workflow de Vendas
          </h1>
          <p className="text-neutral-600 mt-1">Acompanhe o progresso de cada pedido em tempo real</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-neutral-600">Aguardando Medição</p>
                  <p className="text-3xl font-bold text-orange-600">3</p>
                </div>
                <div className="p-3 bg-orange-50 rounded-xl">
                  <Calendar className="h-6 w-6 text-orange-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-neutral-600">Em Produção</p>
                  <p className="text-3xl font-bold text-blue-600">5</p>
                </div>
                <div className="p-3 bg-blue-50 rounded-xl">
                  <Wrench className="h-6 w-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-neutral-600">Instalações Hoje</p>
                  <p className="text-3xl font-bold text-purple-600">2</p>
                </div>
                <div className="p-3 bg-purple-50 rounded-xl">
                  <Wrench className="h-6 w-6 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-neutral-600">Concluídos Hoje</p>
                  <p className="text-3xl font-bold text-green-600">4</p>
                </div>
                <div className="p-3 bg-green-50 rounded-xl">
                  <CheckCircle className="h-6 w-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Workflow Orders */}
        <div className="space-y-6">
          {workflowOrders.map((order) => (
            <Card key={order.id} className={`border-l-4 ${getPriorityColor(order.priority)} shadow-lg`}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div>
                      <CardTitle className="text-xl">{order.id}</CardTitle>
                      <p className="text-neutral-600">{order.customer}</p>
                    </div>
                    <Badge
                      className={
                        order.priority === "urgent"
                          ? "bg-red-100 text-red-800"
                          : order.priority === "high"
                            ? "bg-orange-100 text-orange-800"
                            : "bg-blue-100 text-blue-800"
                      }
                    >
                      {order.priority === "urgent"
                        ? "Urgente"
                        : order.priority === "high"
                          ? "Alta Prioridade"
                          : "Prioridade Normal"}
                    </Badge>
                  </div>

                  <div className="text-right">
                    <p className="text-2xl font-bold text-primary-600">{formatPrice(order.total)}</p>
                    <p className="text-sm text-neutral-600">Técnico: {order.technician}</p>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="space-y-6">
                {/* Customer Info */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-neutral-50 rounded-lg">
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4 text-neutral-500" />
                    <span className="text-sm">{order.customer}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-neutral-500" />
                    <span className="text-sm">{order.phone}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-neutral-500" />
                    <span className="text-sm">{order.address}</span>
                  </div>
                </div>

                {/* Progress Bar */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">Progresso do Pedido</span>
                    <span className="text-sm text-neutral-600">
                      {order.currentStep} de {order.steps.length} etapas
                    </span>
                  </div>
                  <Progress value={(order.currentStep / order.steps.length) * 100} className="h-2" />
                </div>

                {/* Workflow Steps */}
                <div className="space-y-4">
                  <h4 className="font-semibold">Timeline do Pedido</h4>
                  <div className="grid grid-cols-1 lg:grid-cols-7 gap-4">
                    {order.steps.map((step, index) => {
                      const Icon = step.icon
                      const isLast = index === order.steps.length - 1

                      return (
                        <div key={step.id} className="flex flex-col items-center">
                          <div
                            className={`w-12 h-12 rounded-full flex items-center justify-center ${getStepStatus(step.status)}`}
                          >
                            <Icon className="h-6 w-6" />
                          </div>
                          <div className="text-center mt-2">
                            <p className="text-xs font-medium">{step.name}</p>
                            {step.date && <p className="text-xs text-neutral-500 mt-1">{step.date}</p>}
                          </div>
                          {!isLast && (
                            <div className="hidden lg:block absolute top-6 left-full w-full h-0.5 bg-neutral-200 transform translate-x-2" />
                          )}
                        </div>
                      )
                    })}
                  </div>
                </div>

                {/* Notes */}
                {order.notes && (
                  <div className="p-3 bg-blue-50 rounded-lg">
                    <p className="text-sm text-blue-800">
                      <strong>Observações:</strong> {order.notes}
                    </p>
                  </div>
                )}

                {/* Actions */}
                <div className="flex items-center gap-2 pt-4 border-t">
                  <Button size="sm" variant="outline">
                    <Eye className="h-4 w-4 mr-2" />
                    Ver Detalhes
                  </Button>
                  <Button size="sm" variant="outline">
                    <Edit className="h-4 w-4 mr-2" />
                    Editar
                  </Button>
                  <Button size="sm" className="bg-primary-600 hover:bg-primary-700">
                    <ArrowRight className="h-4 w-4 mr-2" />
                    Avançar Etapa
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </ProfessionalAdminLayout>
  )
}
