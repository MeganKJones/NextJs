const slugify = (str: string) =>
    str
      .toLowerCase()
      .trim()
      .replace(/\s+/g, '-')
      .replace(/[^a-z0-9\-]/g, '')

const unslugify = (slug: string) => {
  const spaces = slug.replaceAll("-", " ")
  const capitalized = spaces.charAt(0).toUpperCase() + spaces.slice(1)
  return capitalized
}

export default {
  slugify,
  unslugify
}