# Verificar se há imports do aspect-ratio em outros arquivos
grep -r "aspect-ratio" components/ app/ --include="*.tsx" --include="*.ts" || echo "Nenhum import encontrado"

# Verificar se há imports do @radix-ui/react-aspect-ratio
grep -r "@radix-ui/react-aspect-ratio" components/ app/ --include="*.tsx" --include="*.ts" || echo "Nenhum import do radix encontrado"

# Listar arquivos na pasta components/ui
ls -la components/ui/
