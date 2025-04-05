import type { Field } from 'payload'
import slugify from 'slugify'

export const formatSlug = (val: string): string =>
  slugify(val, {
    lower: true,
    strict: true,
    remove: /[*+~.()'"!:@]/g,
    replacement: '-',
    locale: 'ru', // Поддержка русского языка
  })

// Формирование slug из другого поля (например, title)
export const generateSlugField = (fieldToUse: string): Field => ({
  name: 'slug',
  type: 'text',
  admin: {
    position: 'sidebar',
  },
  required: true,
  unique: true,
  hooks: {
    beforeValidate: [
      ({ value, data, siblingData }) => {
        // Если значение уже есть, просто форматируем его
        if (value) {
          return formatSlug(value)
        }

        // Иначе берем значение из связанного поля
        if (siblingData && siblingData[fieldToUse]) {
          return formatSlug(siblingData[fieldToUse])
        }

        // Если нет связанного поля, возвращаем пустую строку
        return ''
      },
    ],
  },
})
