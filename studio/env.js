export const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2023-09-11'

export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'
export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'j7ljhbbr'

export const useCdn = false

export const vimeoAccessToken =
  process.env.SANITY_STUDIO_VIMEO_ACCESS_TOKEN ||
  '9f53fbf5c39329de5ea4517536a84895'
