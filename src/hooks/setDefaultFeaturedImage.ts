import { CollectionAfterReadHook } from 'payload'

// ID вашего изображения по умолчанию, которое уже загружено в медиа-библиотеку
// Замените на реальный ID вашего изображения
// const DEFAULT_IMAGE_ID = '64f8a12b1d72b91234567890'

export const addDefaultFeaturedImage: CollectionAfterReadHook = async ({ doc, req }) => {
  // Если нет изображения, загружаем данные по умолчанию
  if (!doc.featuredImage) {
    try {
      // Находим изображение по умолчанию
      const defaultImage = await req.payload.findByID({
        collection: 'media',
        id: process.env.DEFAULT_IMAGE_ID!,
      })

      if (defaultImage) {
        doc.featuredImage = defaultImage
      }
    } catch (error) {
      console.error('Ошибка при загрузке изображения по умолчанию:', error)
    }
  }

  return doc
}
