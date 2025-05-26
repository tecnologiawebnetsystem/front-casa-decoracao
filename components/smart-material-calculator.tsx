"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  Calculator,
  Ruler,
  Package,
  DollarSign,
  CheckCircle,
  Lightbulb,
  Download,
  Share2,
  Palette,
  Scissors,
  Home,
  Plus,
} from "lucide-react"

interface Room {
  id: string
  name: string
  walls: Wall[]
  windows: Window[]
  doors: Door[]
}

interface Wall {
  id: string
  width: number
  height: number
  hasWallpaper: boolean
}

interface Window {
  id: string
  width: number
  height: number
  hasCurtains: boolean
  curtainType: string
}

interface Door {
  id: string
  width: number
  height: number
}

interface MaterialCalculation {
  wallpaper: {
    totalArea: number
    rollsNeeded: number
    wastePercentage: number
    totalCost: number
  }
  curtains: {
    totalWidth: number
    totalHeight: number
    fabricMeters: number
    totalCost: number
  }
  installation: {
    wallpaperHours: number
    curtainHours: number
    totalCost: number
  }
}

export default function SmartMaterialCalculator() {
  const [rooms, setRooms] = useState<Room[]>([
    {
      id: "1",
      name: "Sala de Estar",
      walls: [
        { id: "w1", width: 4, height: 2.8, hasWallpaper: true },
        { id: "w2", width: 3.5, height: 2.8, hasWallpaper: false },
      ],
      windows: [{ id: "win1", width: 1.5, height: 1.2, hasCurtains: true, curtainType: "blackout" }],
      doors: [{ id: "d1", width: 0.8, height: 2.1 }],
    },
  ])

  const [selectedRoom, setSelectedRoom] = useState<string>("1")
  const [calculation, setCalculation] = useState<MaterialCalculation | null>(null)
  const [wallpaperPrice, setWallpaperPrice] = useState(89.9)
  const [curtainPrice, setCurtainPrice] = useState(45.0)
  const [installationRate, setInstallationRate] = useState(80.0)

  const wallpaperSpecs = {
    rollWidth: 0.53, // metros
    rollLength: 10, // metros
    coverage: 5.3, // m²
  }

  useEffect(() => {
    calculateMaterials()
  }, [rooms, selectedRoom, wallpaperPrice, curtainPrice, installationRate])

  const calculateMaterials = () => {
    const room = rooms.find((r) => r.id === selectedRoom)
    if (!room) return

    // Cálculo papel de parede
    const wallpaperWalls = room.walls.filter((w) => w.hasWallpaper)
    const totalWallArea = wallpaperWalls.reduce((sum, wall) => sum + wall.width * wall.height, 0)

    // Subtrair área de portas e janelas
    const doorArea = room.doors.reduce((sum, door) => sum + door.width * door.height, 0)
    const windowArea = room.windows.reduce((sum, window) => sum + window.width * window.height, 0)

    const netWallArea = Math.max(0, totalWallArea - doorArea - windowArea)
    const wastePercentage = 15 // 15% de desperdício
    const adjustedArea = netWallArea * (1 + wastePercentage / 100)
    const rollsNeeded = Math.ceil(adjustedArea / wallpaperSpecs.coverage)
    const wallpaperCost = rollsNeeded * wallpaperPrice

    // Cálculo cortinas
    const curtainWindows = room.windows.filter((w) => w.hasCurtains)
    const totalCurtainWidth = curtainWindows.reduce((sum, window) => sum + window.width * 2, 0) // 2x largura
    const maxCurtainHeight = Math.max(...curtainWindows.map((w) => w.height), 0)
    const fabricMeters = (totalCurtainWidth * maxCurtainHeight) / 1.4 // largura padrão do tecido
    const curtainCost = fabricMeters * curtainPrice

    // Cálculo instalação
    const wallpaperHours = rollsNeeded * 1.5 // 1.5h por rolo
    const curtainHours = curtainWindows.length * 2 // 2h por janela
    const installationCost = (wallpaperHours + curtainHours) * installationRate

    setCalculation({
      wallpaper: {
        totalArea: netWallArea,
        rollsNeeded,
        wastePercentage,
        totalCost: wallpaperCost,
      },
      curtains: {
        totalWidth: totalCurtainWidth,
        totalHeight: maxCurtainHeight,
        fabricMeters,
        totalCost: curtainCost,
      },
      installation: {
        wallpaperHours,
        curtainHours,
        totalCost: installationCost,
      },
    })
  }

  const addWall = () => {
    const room = rooms.find((r) => r.id === selectedRoom)
    if (!room) return

    const newWall: Wall = {
      id: `w${Date.now()}`,
      width: 3,
      height: 2.8,
      hasWallpaper: false,
    }

    setRooms((prev) => prev.map((r) => (r.id === selectedRoom ? { ...r, walls: [...r.walls, newWall] } : r)))
  }

  const addWindow = () => {
    const room = rooms.find((r) => r.id === selectedRoom)
    if (!room) return

    const newWindow: Window = {
      id: `win${Date.now()}`,
      width: 1.2,
      height: 1.0,
      hasCurtains: false,
      curtainType: "translucido",
    }

    setRooms((prev) => prev.map((r) => (r.id === selectedRoom ? { ...r, windows: [...r.windows, newWindow] } : r)))
  }

  const updateWall = (wallId: string, field: keyof Wall, value: any) => {
    setRooms((prev) =>
      prev.map((room) =>
        room.id === selectedRoom
          ? {
              ...room,
              walls: room.walls.map((wall) => (wall.id === wallId ? { ...wall, [field]: value } : wall)),
            }
          : room,
      ),
    )
  }

  const updateWindow = (windowId: string, field: keyof Window, value: any) => {
    setRooms((prev) =>
      prev.map((room) =>
        room.id === selectedRoom
          ? {
              ...room,
              windows: room.windows.map((window) => (window.id === windowId ? { ...window, [field]: value } : window)),
            }
          : room,
      ),
    )
  }

  const generateReport = () => {
    if (!calculation) return

    const report = {
      room: rooms.find((r) => r.id === selectedRoom)?.name,
      materials: calculation,
      totalCost: calculation.wallpaper.totalCost + calculation.curtains.totalCost + calculation.installation.totalCost,
      timestamp: new Date().toISOString(),
    }

    const blob = new Blob([JSON.stringify(report, null, 2)], { type: "application/json" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `orcamento-${report.room?.toLowerCase().replace(/\s+/g, "-")}.json`
    a.click()
  }

  const currentRoom = rooms.find((r) => r.id === selectedRoom)

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="border-0 shadow-lg overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-green-600 via-blue-600 to-purple-600 text-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                <Calculator className="h-6 w-6" />
              </div>
              <div>
                <CardTitle className="text-xl">Calculadora Inteligente</CardTitle>
                <p className="text-sm text-white/80">Cálculo preciso de materiais e custos</p>
              </div>
            </div>
            <Badge variant="secondary" className="bg-white/20 text-white border-0">
              IA Powered
            </Badge>
          </div>
        </CardHeader>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Configuração do Ambiente */}
        <div className="space-y-6">
          {/* Seleção de Ambiente */}
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Home className="h-5 w-5 text-blue-600" />
                Ambiente
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <select
                value={selectedRoom}
                onChange={(e) => setSelectedRoom(e.target.value)}
                className="w-full p-2 border rounded-lg focus:border-blue-500"
              >
                {rooms.map((room) => (
                  <option key={room.id} value={room.id}>
                    {room.name}
                  </option>
                ))}
              </select>
            </CardContent>
          </Card>

          {/* Paredes */}
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Palette className="h-5 w-5 text-primary-600" />
                  Paredes
                </CardTitle>
                <Button size="sm" onClick={addWall} className="h-8 w-8 p-0">
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {currentRoom?.walls.map((wall, index) => (
                <div key={wall.id} className="p-4 border rounded-lg space-y-3">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium">Parede {index + 1}</h4>
                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={wall.hasWallpaper}
                        onChange={(e) => updateWall(wall.id, "hasWallpaper", e.target.checked)}
                        className="rounded"
                      />
                      <span className="text-sm">Papel de parede</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-sm text-neutral-600">Largura (m)</label>
                      <Input
                        type="number"
                        step="0.1"
                        value={wall.width}
                        onChange={(e) => updateWall(wall.id, "width", Number.parseFloat(e.target.value) || 0)}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <label className="text-sm text-neutral-600">Altura (m)</label>
                      <Input
                        type="number"
                        step="0.1"
                        value={wall.height}
                        onChange={(e) => updateWall(wall.id, "height", Number.parseFloat(e.target.value) || 0)}
                        className="mt-1"
                      />
                    </div>
                  </div>

                  <div className="text-sm text-neutral-600">Área: {(wall.width * wall.height).toFixed(2)} m²</div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Janelas */}
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Scissors className="h-5 w-5 text-secondary-600" />
                  Janelas
                </CardTitle>
                <Button size="sm" onClick={addWindow} className="h-8 w-8 p-0">
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {currentRoom?.windows.map((window, index) => (
                <div key={window.id} className="p-4 border rounded-lg space-y-3">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium">Janela {index + 1}</h4>
                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={window.hasCurtains}
                        onChange={(e) => updateWindow(window.id, "hasCurtains", e.target.checked)}
                        className="rounded"
                      />
                      <span className="text-sm">Cortina</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-sm text-neutral-600">Largura (m)</label>
                      <Input
                        type="number"
                        step="0.1"
                        value={window.width}
                        onChange={(e) => updateWindow(window.id, "width", Number.parseFloat(e.target.value) || 0)}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <label className="text-sm text-neutral-600">Altura (m)</label>
                      <Input
                        type="number"
                        step="0.1"
                        value={window.height}
                        onChange={(e) => updateWindow(window.id, "height", Number.parseFloat(e.target.value) || 0)}
                        className="mt-1"
                      />
                    </div>
                  </div>

                  {window.hasCurtains && (
                    <div>
                      <label className="text-sm text-neutral-600">Tipo de cortina</label>
                      <select
                        value={window.curtainType}
                        onChange={(e) => updateWindow(window.id, "curtainType", e.target.value)}
                        className="w-full mt-1 p-2 border rounded-lg focus:border-secondary-500"
                      >
                        <option value="blackout">Blackout</option>
                        <option value="translucido">Translúcido</option>
                        <option value="voil">Voil</option>
                        <option value="linho">Linho</option>
                      </select>
                    </div>
                  )}
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Preços */}
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="h-5 w-5 text-green-600" />
                Preços
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm text-neutral-600">Papel de parede (por rolo)</label>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-sm">R$</span>
                  <Input
                    type="number"
                    step="0.01"
                    value={wallpaperPrice}
                    onChange={(e) => setWallpaperPrice(Number.parseFloat(e.target.value) || 0)}
                  />
                </div>
              </div>

              <div>
                <label className="text-sm text-neutral-600">Tecido cortina (por metro)</label>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-sm">R$</span>
                  <Input
                    type="number"
                    step="0.01"
                    value={curtainPrice}
                    onChange={(e) => setCurtainPrice(Number.parseFloat(e.target.value) || 0)}
                  />
                </div>
              </div>

              <div>
                <label className="text-sm text-neutral-600">Instalação (por hora)</label>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-sm">R$</span>
                  <Input
                    type="number"
                    step="0.01"
                    value={installationRate}
                    onChange={(e) => setInstallationRate(Number.parseFloat(e.target.value) || 0)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Resultados */}
        <div className="lg:col-span-2 space-y-6">
          {calculation && (
            <>
              {/* Resumo Geral */}
              <Card className="border-0 shadow-lg">
                <CardHeader className="bg-gradient-to-r from-green-50 to-blue-50">
                  <CardTitle className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    Resumo do Orçamento
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-primary-600">
                        R$ {calculation.wallpaper.totalCost.toFixed(2)}
                      </div>
                      <div className="text-sm text-neutral-600">Papel de Parede</div>
                      <div className="text-xs text-neutral-500 mt-1">{calculation.wallpaper.rollsNeeded} rolos</div>
                    </div>

                    <div className="text-center">
                      <div className="text-3xl font-bold text-secondary-600">
                        R$ {calculation.curtains.totalCost.toFixed(2)}
                      </div>
                      <div className="text-sm text-neutral-600">Cortinas</div>
                      <div className="text-xs text-neutral-500 mt-1">
                        {calculation.curtains.fabricMeters.toFixed(1)}m de tecido
                      </div>
                    </div>

                    <div className="text-center">
                      <div className="text-3xl font-bold text-green-600">
                        R$ {calculation.installation.totalCost.toFixed(2)}
                      </div>
                      <div className="text-sm text-neutral-600">Instalação</div>
                      <div className="text-xs text-neutral-500 mt-1">
                        {(calculation.installation.wallpaperHours + calculation.installation.curtainHours).toFixed(1)}h
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 pt-6 border-t">
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-medium">Total Geral:</span>
                      <span className="text-2xl font-bold text-green-600">
                        R${" "}
                        {(
                          calculation.wallpaper.totalCost +
                          calculation.curtains.totalCost +
                          calculation.installation.totalCost
                        ).toFixed(2)}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Detalhamento */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Papel de Parede */}
                <Card className="border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Palette className="h-5 w-5 text-primary-600" />
                      Papel de Parede
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-between">
                      <span>Área total:</span>
                      <span className="font-medium">{calculation.wallpaper.totalArea.toFixed(2)} m²</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Rolos necessários:</span>
                      <span className="font-medium">{calculation.wallpaper.rollsNeeded}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Desperdício:</span>
                      <span className="font-medium">{calculation.wallpaper.wastePercentage}%</span>
                    </div>
                    <div className="flex justify-between text-lg font-bold text-primary-600">
                      <span>Subtotal:</span>
                      <span>R$ {calculation.wallpaper.totalCost.toFixed(2)}</span>
                    </div>

                    <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                      <div className="flex items-start gap-2">
                        <Lightbulb className="h-4 w-4 text-blue-600 mt-0.5" />
                        <div className="text-sm text-blue-800">
                          <strong>Dica:</strong> Sempre compre 1-2 rolos extras para reparos futuros.
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Cortinas */}
                <Card className="border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Scissors className="h-5 w-5 text-secondary-600" />
                      Cortinas
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-between">
                      <span>Largura total:</span>
                      <span className="font-medium">{calculation.curtains.totalWidth.toFixed(2)} m</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Altura máxima:</span>
                      <span className="font-medium">{calculation.curtains.totalHeight.toFixed(2)} m</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Metros de tecido:</span>
                      <span className="font-medium">{calculation.curtains.fabricMeters.toFixed(1)} m</span>
                    </div>
                    <div className="flex justify-between text-lg font-bold text-secondary-600">
                      <span>Subtotal:</span>
                      <span>R$ {calculation.curtains.totalCost.toFixed(2)}</span>
                    </div>

                    <div className="mt-4 p-3 bg-purple-50 rounded-lg">
                      <div className="flex items-start gap-2">
                        <Lightbulb className="h-4 w-4 text-purple-600 mt-0.5" />
                        <div className="text-sm text-purple-800">
                          <strong>Dica:</strong> Cortinas com 2x a largura da janela ficam mais elegantes.
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Cronograma de Instalação */}
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Ruler className="h-5 w-5 text-orange-600" />
                    Cronograma de Instalação
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-orange-50 rounded-lg">
                      <div>
                        <h4 className="font-medium">Instalação de Papel de Parede</h4>
                        <p className="text-sm text-neutral-600">
                          {calculation.installation.wallpaperHours.toFixed(1)} horas estimadas
                        </p>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-orange-600">
                          R$ {(calculation.installation.wallpaperHours * installationRate).toFixed(2)}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
                      <div>
                        <h4 className="font-medium">Instalação de Cortinas</h4>
                        <p className="text-sm text-neutral-600">
                          {calculation.installation.curtainHours.toFixed(1)} horas estimadas
                        </p>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-blue-600">
                          R$ {(calculation.installation.curtainHours * installationRate).toFixed(2)}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg border-2 border-green-200">
                      <div>
                        <h4 className="font-medium">Total de Instalação</h4>
                        <p className="text-sm text-neutral-600">
                          {(calculation.installation.wallpaperHours + calculation.installation.curtainHours).toFixed(1)}{" "}
                          horas
                        </p>
                      </div>
                      <div className="text-right">
                        <div className="text-xl font-bold text-green-600">
                          R$ {calculation.installation.totalCost.toFixed(2)}
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Ações */}
              <Card className="border-0 shadow-lg">
                <CardContent className="p-6">
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button variant="outline" onClick={generateReport} className="flex items-center gap-2">
                      <Download className="h-4 w-4" />
                      Baixar Orçamento
                    </Button>
                    <Button variant="outline" className="flex items-center gap-2">
                      <Share2 className="h-4 w-4" />
                      Compartilhar
                    </Button>
                    <Button className="bg-gradient-to-r from-green-600 to-blue-600 flex items-center gap-2">
                      <Package className="h-4 w-4" />
                      Solicitar Orçamento Oficial
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
