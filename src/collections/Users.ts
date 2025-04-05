// collections/Users.ts
import type { CollectionConfig } from 'payload'

export const Users: CollectionConfig = {
  slug: 'users',
  admin: {
    useAsTitle: 'email',
  },
  auth: true,
  fields: [
    // Email добавляется по умолчанию
    {
      name: 'name',
      type: 'text',
      label: 'Имя пользователя',
    },
    {
      name: 'role',
      type: 'select',
      options: [
        { label: 'Администратор', value: 'admin' },
        { label: 'Пользователь', value: 'user' },
      ],
      defaultValue: 'user',
      required: true,
      label: 'Роль пользователя',
    },
  ],
  // Настройки доступа
  access: {
    // Доступ к админ-панели (это ключевое отличие)
    admin: ({ req: { user } }) => {
      return user?.role === 'admin'
    },
    // По умолчанию чтение доступно только админам и самому пользователю
    read: ({ req: { user } }) => {
      if (user?.role === 'admin') return true
      return { id: { equals: user?.id } } // Обычные пользователи видят только себя
    },
    // Обновлять пользователей может только администратор и сам пользователь
    update: ({ req: { user } }) => {
      if (user?.role === 'admin') return true
      return { id: { equals: user?.id } } // Пользователи могут обновлять только себя
    },
    // Удалять пользователей может только администратор
    delete: ({ req: { user } }) => {
      return user?.role === 'admin'
    },
  },
}
