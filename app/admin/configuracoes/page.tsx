"use client"

import { useState } from "react"
import ProfessionalAdminLayout from "@/components/admin/professional-admin-layout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import {
  Settings,
  Save,
  Upload,
  Download,
  Bell,
  Mail,
  Shield,
  Palette,
  Globe,
  CreditCard,
  Truck,
  Users,
  Database,
  Zap,
  Eye,
  EyeOff,
  Check,
  AlertTriangle,
  Info,
} from "lucide-react"

export default function AdminConfiguracoes() {
  const [activeTab, setActiveTab] = useState("geral")
  const [showApiKey, setShowApiKey] = useState(false)

  const configTabs = [
    { id: "geral", label: "Geral", icon: Settings },
    { id: "notificacoes", label: "Notificações", icon: Bell },
    { id: "pagamentos", label: "Pagamentos", icon: CreditCard },
    { id: "entrega", label: "Entrega", icon: Truck },
    { id: "usuarios", label: "Usuários", icon: Users },
    { id: "integracao", label: "Integrações", icon: Zap },
    { id: "seguranca", label: "Segurança", icon: Shield },
    { id: "backup", label: "Backup", icon: Database },
  ]

  return (
    <ProfessionalAdminLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
              Configurações do Sistema
            </h1>
            <p className="text-neutral-600 mt-1">Personalize e configure seu ERP de decoração</p>
          </div>

          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Exportar Config
            </Button>
            <Button className="bg-gradient-to-r from-primary-600 to-secondary-600">
              <Save className="h-4 w-4 mr-2" />
              Salvar Alterações
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar Navigation */}
          <div className="lg:col-span-1">
            <Card className="border-0 shadow-lg">
              <CardContent className="p-4">
                <nav className="space-y-2">
                  {configTabs.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${
                        activeTab === tab.id
                          ? "bg-gradient-to-r from-primary-100 to-secondary-100 text-primary-700"
                          : "text-neutral-700 hover:bg-neutral-100"
                      }`}
                    >
                      <tab.icon className="h-5 w-5" />
                      <span className="font-medium">{tab.label}</span>
                    </button>
                  ))}
                </nav>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-6">
            {/* Configurações Gerais */}
            {activeTab === "geral" && (
              <div className="space-y-6">
                <Card className="border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Settings className="h-5 w-5 text-primary-600" />
                      Informações da Empresa
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-neutral-700 mb-2">Nome da Empresa</label>
                        <Input defaultValue="Casa Decoração Ltda" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-neutral-700 mb-2">CNPJ</label>
                        <Input defaultValue="12.345.678/0001-90" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-neutral-700 mb-2">Endereço Completo</label>
                      <Textarea
                        defaultValue="Rua das Decorações, 123 - Centro - São Paulo/SP - CEP: 01234-567"
                        rows={3}
                      />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-neutral-700 mb-2">Telefone</label>
                        <Input defaultValue="(11) 3456-7890" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-neutral-700 mb-2">Email</label>
                        <Input defaultValue="contato@casadecoracaoerp.com" />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Palette className="h-5 w-5 text-primary-600" />
                      Personalização Visual
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-neutral-700 mb-2">Logo da Empresa</label>
                      <div className="flex items-center gap-4">
                        <div className="w-20 h-20 bg-gradient-to-r from-primary-100 to-secondary-100 rounded-xl flex items-center justify-center">
                          <Palette className="h-8 w-8 text-primary-600" />
                        </div>
                        <Button variant="outline">
                          <Upload className="h-4 w-4 mr-2" />
                          Alterar Logo
                        </Button>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-neutral-700 mb-2">Cor Primária</label>
                        <div className="flex items-center gap-2">
                          <div className="w-10 h-10 bg-primary-600 rounded-lg border"></div>
                          <Input defaultValue="#3B82F6" />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-neutral-700 mb-2">Cor Secundária</label>
                        <div className="flex items-center gap-2">
                          <div className="w-10 h-10 bg-secondary-600 rounded-lg border"></div>
                          <Input defaultValue="#8B5CF6" />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Notificações */}
            {activeTab === "notificacoes" && (
              <div className="space-y-6">
                <Card className="border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Bell className="h-5 w-5 text-primary-600" />
                      Configurações de Notificações
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-4 bg-neutral-50 rounded-xl">
                        <div>
                          <h4 className="font-medium text-neutral-800">Novos Pedidos</h4>
                          <p className="text-sm text-neutral-600">
                            Receber notificação quando um novo pedido for criado
                          </p>
                        </div>
                        <Switch defaultChecked />
                      </div>

                      <div className="flex items-center justify-between p-4 bg-neutral-50 rounded-xl">
                        <div>
                          <h4 className="font-medium text-neutral-800">Estoque Baixo</h4>
                          <p className="text-sm text-neutral-600">
                            Alertas quando produtos estiverem com estoque baixo
                          </p>
                        </div>
                        <Switch defaultChecked />
                      </div>

                      <div className="flex items-center justify-between p-4 bg-neutral-50 rounded-xl">
                        <div>
                          <h4 className="font-medium text-neutral-800">Pagamentos Recebidos</h4>
                          <p className="text-sm text-neutral-600">Confirmação de pagamentos processados</p>
                        </div>
                        <Switch defaultChecked />
                      </div>

                      <div className="flex items-center justify-between p-4 bg-neutral-50 rounded-xl">
                        <div>
                          <h4 className="font-medium text-neutral-800">Relatórios Semanais</h4>
                          <p className="text-sm text-neutral-600">Resumo semanal de performance</p>
                        </div>
                        <Switch />
                      </div>
                    </div>

                    <div className="border-t pt-6">
                      <h4 className="font-medium text-neutral-800 mb-4">Configurações de Email</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-neutral-700 mb-2">Servidor SMTP</label>
                          <Input defaultValue="smtp.gmail.com" />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-neutral-700 mb-2">Porta</label>
                          <Input defaultValue="587" />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Integrações */}
            {activeTab === "integracao" && (
              <div className="space-y-6">
                <Card className="border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Zap className="h-5 w-5 text-primary-600" />
                      Integrações Disponíveis
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="p-4 border rounded-xl">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                              <Check className="h-5 w-5 text-green-600" />
                            </div>
                            <div>
                              <h4 className="font-medium">WhatsApp Business</h4>
                              <p className="text-sm text-neutral-600">Conectado</p>
                            </div>
                          </div>
                          <Badge className="bg-green-100 text-green-800">Ativo</Badge>
                        </div>
                        <p className="text-sm text-neutral-600 mb-3">Envie atualizações de pedidos via WhatsApp</p>
                        <Button variant="outline" size="sm" className="w-full">
                          Configurar
                        </Button>
                      </div>

                      <div className="p-4 border rounded-xl">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                              <Globe className="h-5 w-5 text-blue-600" />
                            </div>
                            <div>
                              <h4 className="font-medium">Google Analytics</h4>
                              <p className="text-sm text-neutral-600">Não conectado</p>
                            </div>
                          </div>
                          <Badge variant="secondary">Inativo</Badge>
                        </div>
                        <p className="text-sm text-neutral-600 mb-3">Acompanhe o tráfego do seu site</p>
                        <Button variant="outline" size="sm" className="w-full">
                          Conectar
                        </Button>
                      </div>

                      <div className="p-4 border rounded-xl">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                              <Mail className="h-5 w-5 text-purple-600" />
                            </div>
                            <div>
                              <h4 className="font-medium">Mailchimp</h4>
                              <p className="text-sm text-neutral-600">Conectado</p>
                            </div>
                          </div>
                          <Badge className="bg-green-100 text-green-800">Ativo</Badge>
                        </div>
                        <p className="text-sm text-neutral-600 mb-3">Automação de email marketing</p>
                        <Button variant="outline" size="sm" className="w-full">
                          Configurar
                        </Button>
                      </div>

                      <div className="p-4 border rounded-xl">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                              <CreditCard className="h-5 w-5 text-orange-600" />
                            </div>
                            <div>
                              <h4 className="font-medium">Mercado Pago</h4>
                              <p className="text-sm text-neutral-600">Conectado</p>
                            </div>
                          </div>
                          <Badge className="bg-green-100 text-green-800">Ativo</Badge>
                        </div>
                        <p className="text-sm text-neutral-600 mb-3">Gateway de pagamentos</p>
                        <Button variant="outline" size="sm" className="w-full">
                          Configurar
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle>API Keys</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-neutral-700 mb-2">Chave da API Pública</label>
                      <div className="flex items-center gap-2">
                        <Input
                          type={showApiKey ? "text" : "password"}
                          defaultValue="pk_live_51234567890abcdef"
                          readOnly
                        />
                        <Button variant="outline" size="sm" onClick={() => setShowApiKey(!showApiKey)}>
                          {showApiKey ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </Button>
                      </div>
                    </div>

                    <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-xl">
                      <div className="flex items-start gap-3">
                        <AlertTriangle className="h-5 w-5 text-yellow-600 mt-0.5" />
                        <div>
                          <h4 className="font-medium text-yellow-800">Importante</h4>
                          <p className="text-sm text-yellow-700">
                            Mantenha suas chaves de API seguras e nunca as compartilhe publicamente.
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Segurança */}
            {activeTab === "seguranca" && (
              <div className="space-y-6">
                <Card className="border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Shield className="h-5 w-5 text-primary-600" />
                      Configurações de Segurança
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-4 bg-neutral-50 rounded-xl">
                        <div>
                          <h4 className="font-medium text-neutral-800">Autenticação de Dois Fatores</h4>
                          <p className="text-sm text-neutral-600">Adicione uma camada extra de segurança</p>
                        </div>
                        <Switch />
                      </div>

                      <div className="flex items-center justify-between p-4 bg-neutral-50 rounded-xl">
                        <div>
                          <h4 className="font-medium text-neutral-800">Login por IP</h4>
                          <p className="text-sm text-neutral-600">Restringir acesso por endereços IP específicos</p>
                        </div>
                        <Switch />
                      </div>

                      <div className="flex items-center justify-between p-4 bg-neutral-50 rounded-xl">
                        <div>
                          <h4 className="font-medium text-neutral-800">Sessão Automática</h4>
                          <p className="text-sm text-neutral-600">Logout automático após inatividade</p>
                        </div>
                        <Switch defaultChecked />
                      </div>
                    </div>

                    <div className="border-t pt-6">
                      <h4 className="font-medium text-neutral-800 mb-4">Políticas de Senha</h4>
                      <div className="space-y-3">
                        <div className="flex items-center gap-3">
                          <Check className="h-4 w-4 text-green-600" />
                          <span className="text-sm text-neutral-700">Mínimo de 8 caracteres</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <Check className="h-4 w-4 text-green-600" />
                          <span className="text-sm text-neutral-700">Pelo menos uma letra maiúscula</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <Check className="h-4 w-4 text-green-600" />
                          <span className="text-sm text-neutral-700">Pelo menos um número</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <Check className="h-4 w-4 text-green-600" />
                          <span className="text-sm text-neutral-700">Pelo menos um caractere especial</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Backup */}
            {activeTab === "backup" && (
              <div className="space-y-6">
                <Card className="border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Database className="h-5 w-5 text-primary-600" />
                      Backup e Restauração
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="p-4 bg-blue-50 border border-blue-200 rounded-xl">
                      <div className="flex items-start gap-3">
                        <Info className="h-5 w-5 text-blue-600 mt-0.5" />
                        <div>
                          <h4 className="font-medium text-blue-800">Backup Automático Ativo</h4>
                          <p className="text-sm text-blue-700">Último backup realizado em 18/01/2024 às 03:00</p>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-4 bg-neutral-50 rounded-xl">
                        <div>
                          <h4 className="font-medium text-neutral-800">Backup Diário</h4>
                          <p className="text-sm text-neutral-600">Backup automático todos os dias às 03:00</p>
                        </div>
                        <Switch defaultChecked />
                      </div>

                      <div className="flex items-center justify-between p-4 bg-neutral-50 rounded-xl">
                        <div>
                          <h4 className="font-medium text-neutral-800">Backup na Nuvem</h4>
                          <p className="text-sm text-neutral-600">Armazenar backups no Google Drive</p>
                        </div>
                        <Switch defaultChecked />
                      </div>
                    </div>

                    <div className="border-t pt-6">
                      <h4 className="font-medium text-neutral-800 mb-4">Ações de Backup</h4>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <Button variant="outline" className="h-20 flex-col gap-2">
                          <Download className="h-6 w-6" />
                          <span>Backup Manual</span>
                        </Button>
                        <Button variant="outline" className="h-20 flex-col gap-2">
                          <Upload className="h-6 w-6" />
                          <span>Restaurar Backup</span>
                        </Button>
                        <Button variant="outline" className="h-20 flex-col gap-2">
                          <Database className="h-6 w-6" />
                          <span>Histórico</span>
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>
        </div>
      </div>
    </ProfessionalAdminLayout>
  )
}
