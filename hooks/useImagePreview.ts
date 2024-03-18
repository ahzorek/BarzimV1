import { useState } from 'react'

/**
 * Gera um hook para lidar com a visualização de imagem com um limite máximo de tamanho.
 *
 * @param {number} maxImageSizeKB - O tamanho máximo em kilobytes para a imagem
 * @return {Array} Um array contendo a URL da visualização da imagem e a função para lidar com a visualização da imagem
 */
export const useImagePreview = (
  maxImageSizeKB: number = 500,
  defaultImagePath: string = '/images/logo-placeholder.png'
) => {
  const [imagePreview, setImagePreview] = useState<string>(defaultImagePath)

  const handleImagePreview = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event?.target?.files?.[0]
    if (file) {
      if (file.size > maxImageSizeKB * 1024) {
        alert(`Escolha uma imagem menor que ${maxImageSizeKB} KB.`)
        return
      }
      setImagePreview(URL.createObjectURL(file))
    }
  }

  return { imagePreview, handleImagePreview }
}
