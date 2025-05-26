"use client"

import { useState, useRef, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  RotateCcw,
  ZoomIn,
  ZoomOut,
  Palette,
  Lightbulb,
  Camera,
  Download,
  Share2,
  Play,
  Pause,
  Eye,
  Layers,
  Sparkles,
  Home,
  Maximize,
} from "lucide-react"

interface RoomConfig {
  wallColor: string
  floorType: string
  wallpaper: string | null
  curtains: string | null
  furniture: string[]
  lighting: string
  decorations: string[]
}

export default function RoomVisualizer3D() {
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [currentView, setCurrentView] = useState("perspective")
  const [isAnimating, setIsAnimating] = useState(false)
  const [roomConfig, setRoomConfig] = useState<RoomConfig>({
    wallColor: "#f5f5f5",
    floorType: "wood",
    wallpaper: null,
    curtains: null,
    furniture: [],
    lighting: "natural",
    decorations: [],
  })
  const [selectedProduct, setSelectedProduct] = useState<string | null>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const wallpaperOptions = [
    { id: "floral", name: "Floral Vintage", preview: "/images/papel-floral-vintage.png", price: 89.9 },
    { id: "geometric", name: "Geométrico 3D", preview: "/images/papel-geometrico-3d.png", price: 159.9 },
    { id: "modern", name: "Listras Modernas", preview: "/images/papel-listras.png", price: 129.9 },
  ]

  const curtainOptions = [
    { id: "blackout", name: "Blackout Elegance", preview: "/images/cortina-blackout.png", price: 299.9 },
    { id: "linen", name: "Linho Natural", preview: "/images/cortina-linho.png", price: 189.9 },
    { id: "sheer", name: "Voil Translúcido", preview: "/images/cortina-voil.png", price: 149.9 },
  ]

  const roomPresets = [
    { id: "modern", name: "Moderno", icon: "🏢" },
    { id: "classic", name: "Clássico", icon: "🏛️" },
    { id: "boho", name: "Boho Chic", icon: "🌿" },
    { id: "minimalist", name: "Minimalista", icon: "⚪" },
    { id: "industrial", name: "Industrial", icon: "🏭" },
  ]

  useEffect(() => {
    // Simular renderização 3D
    const canvas = canvasRef.current
    if (canvas) {
      const ctx = canvas.getContext("2d")
      if (ctx) {
        renderRoom(ctx)
      }
    }
  }, [roomConfig, currentView])

  const renderRoom = (ctx: CanvasRenderingContext2D) => {
    const width = ctx.canvas.width
    const height = ctx.canvas.height

    // Limpar canvas
    ctx.clearRect(0, 0, width, height)

    // Desenhar perspectiva da sala
    ctx.fillStyle = "#f0f0f0"
    ctx.fillRect(0, 0, width, height)

    // Parede de fundo
    ctx.fillStyle = roomConfig.wallColor
    ctx.fillRect(100, 50, width - 200, height - 200)

    // Chão
    ctx.fillStyle = roomConfig.floorType === "wood" ? "#8B4513" : "#D3D3D3"
    ctx.fillRect(50, height - 150, width - 100, 100)

    // Papel de parede (se selecionado)
    if (roomConfig.wallpaper) {
      ctx.fillStyle = "#FFB6C1"
      ctx.fillRect(120, 70, width - 240, height - 240)
      ctx.fillStyle = "#000"
      ctx.font = "12px Arial"
      ctx.fillText("Papel de Parede", 130, 90)
    }

    // Cortinas (se selecionadas)
    if (roomConfig.curtains) {
      ctx.fillStyle = "#4169E1"
      ctx.fillRect(width - 180, 60, 60, height - 220)
      ctx.fillStyle = "#000"
      ctx.font = "10px Arial"
      ctx.fillText("Cortina", width - 175, 80)
    }

    // Móveis básicos
    ctx.fillStyle = "#8B4513"
    ctx.fillRect(200, height - 120, 100, 40) // Sofá
    ctx.fillRect(320, height - 100, 60, 20) // Mesa

    // Iluminação
    if (roomConfig.lighting === "warm") {
      ctx.fillStyle = "rgba(255, 215, 0, 0.3)"
      ctx.fillRect(0, 0, width, height)
    }

    // Adicionar texto informativo
    ctx.fillStyle = "#000"
    ctx.font = "14px Arial"
    ctx.fillText("Visualização 3D - Casa Decoração", 10, 25)
  }

  const applyWallpaper = (wallpaper: any) => {
    setRoomConfig((prev) => ({ ...prev, wallpaper: wallpaper.id }))
    setSelectedProduct(wallpaper.id)
  }

  const applyCurtains = (curtain: any) => {
    setRoomConfig((prev) => ({ ...prev, curtains: curtain.id }))
    setSelectedProduct(curtain.id)
  }

  const changeView = (view: string) => {
    setCurrentView(view)
    setIsAnimating(true)
    setTimeout(() => setIsAnimating(false), 1000)
  }

  const toggleAnimation = () => {
    setIsAnimating(!isAnimating)
  }

  const saveConfiguration = () => {
    const config = {
      ...roomConfig,
      timestamp: new Date().toISOString(),
    }
    localStorage.setItem("roomConfig", JSON.stringify(config))
    alert("Configuração salva! Você pode continuar editando depois.")
  }

  const shareConfiguration = () => {
    const shareData = {
      title: "Meu Projeto de Decoração",
      text: "Veja como ficou meu ambiente com a Casa Decoração!",
      url: window.location.href,
    }

    if (navigator.share) {
      navigator.share(shareData)
    } else {
      navigator.clipboard.writeText(window.location.href)
      alert("Link copiado para a área de transferência!")
    }
  }

  return (
    <div className={`${isFullscreen ? "fixed inset-0 z-50 bg-white" : ""}`}>
      <Card className="border-0 shadow-2xl overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-primary-600 via-purple-600 to-secondary-600 text-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                <Eye className="h-6 w-6" />
              </div>
              <div>
                <CardTitle className="text-xl">Visualizador 3D</CardTitle>
                <p className="text-sm text-white/80">Veja como ficará seu ambiente</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsFullscreen(!isFullscreen)}
                className="text-white hover:bg-white/20"
              >
                <Maximize className="h-4 w-4" />
              </Button>
              <Badge variant="secondary" className="bg-white/20 text-white border-0">
                Beta
              </Badge>
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-0">
          <div className="grid grid-cols-1 lg:grid-cols-4 h-[600px]">
            {/* Painel de Controles */}
            <div className="bg-neutral-50 p-6 space-y-6 overflow-y-auto">
              {/* Presets de Ambiente */}
              <div>
                <h3 className="font-bold text-neutral-800 mb-3 flex items-center gap-2">
                  <Home className="h-4 w-4" />
                  Estilos Predefinidos
                </h3>
                <div className="grid grid-cols-2 gap-2">
                  {roomPresets.map((preset) => (
                    <Button
                      key={preset.id}
                      variant="outline"
                      size="sm"
                      className="flex flex-col gap-1 h-auto py-3 hover:bg-primary-50"
                    >
                      <span className="text-lg">{preset.icon}</span>
                      <span className="text-xs">{preset.name}</span>
                    </Button>
                  ))}
                </div>
              </div>

              {/* Papel de Parede */}
              <div>
                <h3 className="font-bold text-neutral-800 mb-3 flex items-center gap-2">
                  <Palette className="h-4 w-4" />
                  Papel de Parede
                </h3>
                <div className="space-y-2">
                  {wallpaperOptions.map((wallpaper) => (
                    <div
                      key={wallpaper.id}
                      className={`border rounded-lg p-3 cursor-pointer transition-all hover:shadow-md ${
                        selectedProduct === wallpaper.id ? "border-primary-500 bg-primary-50" : "border-neutral-200"
                      }`}
                      onClick={() => applyWallpaper(wallpaper)}
                    >
                      <div className="flex items-center gap-3">
                        <img
                          src={wallpaper.preview || "/placeholder.svg"}
                          alt={wallpaper.name}
                          className="w-12 h-12 object-cover rounded-lg"
                        />
                        <div className="flex-1">
                          <h4 className="font-medium text-sm">{wallpaper.name}</h4>
                          <p className="text-primary-600 font-bold text-sm">R$ {wallpaper.price}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Cortinas */}
              <div>
                <h3 className="font-bold text-neutral-800 mb-3 flex items-center gap-2">
                  <Layers className="h-4 w-4" />
                  Cortinas
                </h3>
                <div className="space-y-2">
                  {curtainOptions.map((curtain) => (
                    <div
                      key={curtain.id}
                      className={`border rounded-lg p-3 cursor-pointer transition-all hover:shadow-md ${
                        selectedProduct === curtain.id ? "border-primary-500 bg-primary-50" : "border-neutral-200"
                      }`}
                      onClick={() => applyCurtains(curtain)}
                    >
                      <div className="flex items-center gap-3">
                        <img
                          src={curtain.preview || "/placeholder.svg"}
                          alt={curtain.name}
                          className="w-12 h-12 object-cover rounded-lg"
                        />
                        <div className="flex-1">
                          <h4 className="font-medium text-sm">{curtain.name}</h4>
                          <p className="text-primary-600 font-bold text-sm">R$ {curtain.price}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Iluminação */}
              <div>
                <h3 className="font-bold text-neutral-800 mb-3 flex items-center gap-2">
                  <Lightbulb className="h-4 w-4" />
                  Iluminação
                </h3>
                <div className="space-y-2">
                  <Button
                    variant={roomConfig.lighting === "natural" ? "default" : "outline"}
                    size="sm"
                    className="w-full justify-start"
                    onClick={() => setRoomConfig((prev) => ({ ...prev, lighting: "natural" }))}
                  >
                    ☀️ Natural
                  </Button>
                  <Button
                    variant={roomConfig.lighting === "warm" ? "default" : "outline"}
                    size="sm"
                    className="w-full justify-start"
                    onClick={() => setRoomConfig((prev) => ({ ...prev, lighting: "warm" }))}
                  >
                    💡 Quente
                  </Button>
                  <Button
                    variant={roomConfig.lighting === "cool" ? "default" : "outline"}
                    size="sm"
                    className="w-full justify-start"
                    onClick={() => setRoomConfig((prev) => ({ ...prev, lighting: "cool" }))}
                  >
                    ❄️ Fria
                  </Button>
                </div>
              </div>
            </div>

            {/* Visualizador 3D */}
            <div className="lg:col-span-3 relative bg-gradient-to-br from-neutral-100 to-neutral-200">
              {/* Controles de Visualização */}
              <div className="absolute top-4 left-4 z-10 flex gap-2">
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => changeView("perspective")}
                  className={currentView === "perspective" ? "bg-primary-600 text-white" : ""}
                >
                  3D
                </Button>
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => changeView("top")}
                  className={currentView === "top" ? "bg-primary-600 text-white" : ""}
                >
                  Planta
                </Button>
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => changeView("front")}
                  className={currentView === "front" ? "bg-primary-600 text-white" : ""}
                >
                  Frontal
                </Button>
              </div>

              {/* Controles de Ação */}
              <div className="absolute top-4 right-4 z-10 flex gap-2">
                <Button variant="secondary" size="sm" onClick={toggleAnimation}>
                  {isAnimating ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                </Button>
                <Button variant="secondary" size="sm">
                  <ZoomIn className="h-4 w-4" />
                </Button>
                <Button variant="secondary" size="sm">
                  <ZoomOut className="h-4 w-4" />
                </Button>
                <Button variant="secondary" size="sm">
                  <RotateCcw className="h-4 w-4" />
                </Button>
              </div>

              {/* Canvas 3D */}
              <canvas
                ref={canvasRef}
                width={800}
                height={600}
                className={`w-full h-full transition-all duration-1000 ${isAnimating ? "animate-pulse" : ""}`}
              />

              {/* Overlay de Loading */}
              {isAnimating && (
                <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                  <div className="bg-white rounded-lg p-4 flex items-center gap-3">
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary-600"></div>
                    <span className="text-sm font-medium">Renderizando ambiente...</span>
                  </div>
                </div>
              )}

              {/* Informações do Produto Selecionado */}
              {selectedProduct && (
                <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-sm rounded-lg p-4 shadow-lg">
                  <div className="flex items-center gap-3">
                    <Sparkles className="h-5 w-5 text-primary-600" />
                    <div>
                      <h4 className="font-medium text-sm">Produto Aplicado</h4>
                      <p className="text-xs text-neutral-600">Clique em outros produtos para comparar</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Barra de Ações Inferior */}
          <div className="border-t bg-white p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="text-sm text-neutral-600">
                  <span className="font-medium">Valor estimado:</span>
                  <span className="text-primary-600 font-bold ml-2">R$ 1.247,80</span>
                </div>
                <Badge variant="secondary" className="bg-green-100 text-green-800">
                  Economia de 15%
                </Badge>
              </div>

              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" onClick={saveConfiguration}>
                  <Download className="h-4 w-4 mr-2" />
                  Salvar
                </Button>
                <Button variant="outline" size="sm" onClick={shareConfiguration}>
                  <Share2 className="h-4 w-4 mr-2" />
                  Compartilhar
                </Button>
                <Button className="bg-gradient-to-r from-primary-600 to-secondary-600">
                  <Camera className="h-4 w-4 mr-2" />
                  Solicitar Orçamento
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
