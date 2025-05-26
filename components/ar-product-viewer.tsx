"use client"

import { useState, useRef, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Camera,
  Smartphone,
  Scan,
  Target,
  RotateCcw,
  Move,
  ZoomIn,
  Share2,
  ShoppingCart,
  Sparkles,
  Eye,
  Info,
} from "lucide-react"

interface ARProduct {
  id: string
  name: string
  category: string
  price: number
  image: string
  arModel: string
  dimensions: { width: number; height: number; depth?: number }
}

export default function ARProductViewer() {
  const [isARActive, setIsARActive] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState<ARProduct | null>(null)
  const [arSupported, setArSupported] = useState(false)
  const [isScanning, setIsScanning] = useState(false)
  const [placedProducts, setPlacedProducts] = useState<ARProduct[]>([])
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const arProducts: ARProduct[] = [
    {
      id: "1",
      name: "Papel de Parede Floral",
      category: "Papel de Parede",
      price: 89.9,
      image: "/images/papel-floral-vintage.png",
      arModel: "wallpaper_floral.glb",
      dimensions: { width: 53, height: 280 },
    },
    {
      id: "2",
      name: "Cortina Blackout",
      category: "Cortinas",
      price: 299.9,
      image: "/images/cortina-blackout.png",
      arModel: "curtain_blackout.glb",
      dimensions: { width: 200, height: 250 },
    },
    {
      id: "3",
      name: "Quadro Abstrato",
      category: "Decoração",
      price: 249.9,
      image: "/images/quadro-abstrato.png",
      arModel: "frame_abstract.glb",
      dimensions: { width: 80, height: 60, depth: 3 },
    },
  ]

  useEffect(() => {
    // Verificação simplificada de suporte a AR baseada no dispositivo
    const checkARSupport = () => {
      // Verificar se é um dispositivo móvel
      const isMobile = /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)

      // Verificar se tem acesso à câmera
      const hasCamera = !!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia)

      // AR é suportado se for mobile E tiver câmera
      setArSupported(isMobile && hasCamera)
    }

    checkARSupport()
  }, [])

  const startARSession = async () => {
    try {
      setIsARActive(true)
      setIsScanning(true)

      // Verificar se getUserMedia está disponível
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        throw new Error("Câmera não disponível neste dispositivo")
      }

      // Solicitar acesso à câmera
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: "environment",
          width: { ideal: 1280 },
          height: { ideal: 720 },
        },
      })

      if (videoRef.current) {
        videoRef.current.srcObject = stream
        await videoRef.current.play()
      }

      // Simular detecção de superfície
      setTimeout(() => {
        setIsScanning(false)
      }, 3000)
    } catch (error) {
      console.error("Erro ao iniciar AR:", error)
      setIsARActive(false)
      setIsScanning(false)

      if (error instanceof Error) {
        if (error.name === "NotAllowedError") {
          alert("Permissão de câmera negada. Por favor, permita o acesso à câmera para usar o AR.")
        } else if (error.name === "NotFoundError") {
          alert("Câmera não encontrada. Verifique se seu dispositivo possui uma câmera.")
        } else {
          alert("Erro ao acessar a câmera: " + error.message)
        }
      } else {
        alert("Erro desconhecido ao iniciar AR.")
      }
    }
  }

  const stopARSession = () => {
    setIsARActive(false)
    setIsScanning(false)
    setPlacedProducts([])

    if (videoRef.current?.srcObject) {
      const tracks = (videoRef.current.srcObject as MediaStream).getTracks()
      tracks.forEach((track) => track.stop())
    }
  }

  const placeProduct = (product: ARProduct) => {
    if (!isARActive) {
      startARSession()
    }
    setSelectedProduct(product)
    setPlacedProducts((prev) => [...prev, product])
  }

  const removeProduct = (productId: string) => {
    setPlacedProducts((prev) => prev.filter((p) => p.id !== productId))
  }

  const captureARPhoto = () => {
    if (canvasRef.current && videoRef.current) {
      const canvas = canvasRef.current
      const video = videoRef.current
      const ctx = canvas.getContext("2d")

      if (ctx) {
        canvas.width = video.videoWidth
        canvas.height = video.videoHeight
        ctx.drawImage(video, 0, 0)

        // Adicionar overlay dos produtos
        placedProducts.forEach((product, index) => {
          ctx.fillStyle = "rgba(255, 255, 255, 0.9)"
          ctx.fillRect(50 + index * 120, 50, 100, 80)
          ctx.fillStyle = "#000"
          ctx.font = "12px Arial"
          ctx.fillText(product.name, 55 + index * 120, 70)
          ctx.fillText(`R$ ${product.price}`, 55 + index * 120, 90)
        })

        // Download da imagem
        const link = document.createElement("a")
        link.download = "ar-preview.png"
        link.href = canvas.toDataURL()
        link.click()
      }
    }
  }

  if (!arSupported) {
    return (
      <Card className="border-0 shadow-lg">
        <CardContent className="p-8 text-center">
          <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Smartphone className="h-8 w-8 text-orange-600" />
          </div>
          <h3 className="text-xl font-bold text-neutral-800 mb-2">AR não suportado</h3>
          <p className="text-neutral-600 mb-4">
            Para usar a Realidade Aumentada, acesse pelo seu smartphone ou tablet.
          </p>
          <Button className="bg-gradient-to-r from-primary-600 to-secondary-600">Abrir no Celular</Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="border-0 shadow-lg overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 text-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                <Eye className="h-6 w-6" />
              </div>
              <div>
                <CardTitle className="text-xl">Realidade Aumentada</CardTitle>
                <p className="text-sm text-white/80">Veja como fica na sua casa</p>
              </div>
            </div>
            <Badge variant="secondary" className="bg-white/20 text-white border-0">
              Beta AR
            </Badge>
          </div>
        </CardHeader>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Produtos AR */}
        <div className="space-y-4">
          <h3 className="font-bold text-neutral-800 flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-purple-600" />
            Produtos com AR
          </h3>

          {arProducts.map((product) => (
            <Card
              key={product.id}
              className={`cursor-pointer transition-all hover:shadow-lg ${
                selectedProduct?.id === product.id ? "border-purple-500 bg-purple-50" : "border-neutral-200"
              }`}
              onClick={() => placeProduct(product)}
            >
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <img
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    className="w-16 h-16 object-cover rounded-lg"
                  />
                  <div className="flex-1">
                    <h4 className="font-medium text-sm">{product.name}</h4>
                    <p className="text-xs text-neutral-600">{product.category}</p>
                    <p className="text-purple-600 font-bold">R$ {product.price}</p>
                  </div>
                  <div className="text-center">
                    <Target className="h-6 w-6 text-purple-600 mx-auto" />
                    <span className="text-xs text-purple-600">AR</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}

          {/* Instruções */}
          <Card className="bg-gradient-to-r from-purple-50 to-pink-50 border-purple-200">
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <Info className="h-5 w-5 text-purple-600 mt-0.5" />
                <div>
                  <h4 className="font-medium text-sm text-purple-800 mb-1">Como usar:</h4>
                  <ol className="text-xs text-purple-700 space-y-1">
                    <li>1. Selecione um produto</li>
                    <li>2. Aponte a câmera para a parede</li>
                    <li>3. Toque para posicionar</li>
                    <li>4. Ajuste o tamanho e posição</li>
                  </ol>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Visualizador AR */}
        <div className="lg:col-span-2">
          <Card className="border-0 shadow-lg overflow-hidden">
            <CardContent className="p-0">
              <div className="relative bg-black aspect-video">
                {!isARActive ? (
                  // Tela inicial
                  <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-purple-900 to-pink-900">
                    <div className="text-center text-white">
                      <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Camera className="h-10 w-10" />
                      </div>
                      <h3 className="text-xl font-bold mb-2">Realidade Aumentada</h3>
                      <p className="text-white/80 mb-6">Veja como os produtos ficam na sua casa</p>
                      <Button onClick={startARSession} className="bg-white text-purple-600 hover:bg-white/90">
                        <Camera className="h-4 w-4 mr-2" />
                        Iniciar AR
                      </Button>
                    </div>
                  </div>
                ) : (
                  // Câmera AR ativa
                  <>
                    <video ref={videoRef} className="w-full h-full object-cover" playsInline muted />

                    {/* Overlay de scanning */}
                    {isScanning && (
                      <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                        <div className="text-center text-white">
                          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
                          <p>Detectando superfícies...</p>
                        </div>
                      </div>
                    )}

                    {/* Produtos colocados */}
                    {placedProducts.map((product, index) => (
                      <div
                        key={`${product.id}-${index}`}
                        className="absolute bg-white/90 rounded-lg p-2 shadow-lg"
                        style={{
                          left: `${20 + index * 15}%`,
                          top: `${30 + index * 10}%`,
                        }}
                      >
                        <div className="flex items-center gap-2">
                          <img
                            src={product.image || "/placeholder.svg"}
                            alt={product.name}
                            className="w-8 h-8 object-cover rounded"
                          />
                          <div>
                            <p className="text-xs font-medium">{product.name}</p>
                            <p className="text-xs text-purple-600">R$ {product.price}</p>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeProduct(product.id)}
                            className="h-6 w-6 p-0"
                          >
                            ×
                          </Button>
                        </div>
                      </div>
                    ))}

                    {/* Controles AR */}
                    <div className="absolute top-4 right-4 flex flex-col gap-2">
                      <Button variant="secondary" size="sm" className="bg-white/80 backdrop-blur-sm">
                        <RotateCcw className="h-4 w-4" />
                      </Button>
                      <Button variant="secondary" size="sm" className="bg-white/80 backdrop-blur-sm">
                        <Move className="h-4 w-4" />
                      </Button>
                      <Button variant="secondary" size="sm" className="bg-white/80 backdrop-blur-sm">
                        <ZoomIn className="h-4 w-4" />
                      </Button>
                    </div>

                    {/* Barra inferior */}
                    <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Badge className="bg-green-500 text-white">
                          <Scan className="h-3 w-3 mr-1" />
                          AR Ativo
                        </Badge>
                        {placedProducts.length > 0 && (
                          <Badge variant="secondary">{placedProducts.length} produto(s)</Badge>
                        )}
                      </div>

                      <div className="flex items-center gap-2">
                        <Button
                          variant="secondary"
                          size="sm"
                          onClick={captureARPhoto}
                          className="bg-white/80 backdrop-blur-sm"
                        >
                          <Camera className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="secondary"
                          size="sm"
                          onClick={stopARSession}
                          className="bg-red-500 text-white hover:bg-red-600"
                        >
                          Parar AR
                        </Button>
                      </div>
                    </div>
                  </>
                )}

                {/* Canvas oculto para captura */}
                <canvas ref={canvasRef} className="hidden" />
              </div>
            </CardContent>
          </Card>

          {/* Ações */}
          {placedProducts.length > 0 && (
            <Card className="mt-4 border-0 shadow-lg">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium text-neutral-800">Produtos selecionados</h4>
                    <p className="text-sm text-neutral-600">
                      Total: R$ {placedProducts.reduce((sum, p) => sum + p.price, 0).toFixed(2)}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm">
                      <Share2 className="h-4 w-4 mr-2" />
                      Compartilhar
                    </Button>
                    <Button className="bg-gradient-to-r from-purple-600 to-pink-600">
                      <ShoppingCart className="h-4 w-4 mr-2" />
                      Adicionar ao Carrinho
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
