interface WordPressPost {
  id: number;
  date: string;
  slug: string;
  title: {
    rendered: string;
  };
  excerpt: {
    rendered: string;
  };
  content: {
    rendered: string;
  };
  _embedded?: {
    author?: {
      name: string;
    }[];
    'wp:featuredmedia'?: {
      source_url: string;
    }[];
  };
}

interface Post {
  id: number;
  date: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  featuredImage: string | null;
}

const API_URL = 'https://warta-terkini.com/wp-json/wp/v2';

export async function getPosts(): Promise<Post[]> {
  try {
    const response = await fetch(`${API_URL}/posts?_embed=author,wp:featuredmedia`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data: WordPressPost[] = await response.json();
    return data.map((wpPost) => ({
      id: wpPost.id,
      date: wpPost.date,
      slug: wpPost.slug,
      title: wpPost.title.rendered,
      excerpt: wpPost.excerpt.rendered,
      content: wpPost.content.rendered,
      author: wpPost._embedded?.author?.[0]?.name || 'Anonim',
      featuredImage: wpPost._embedded?.['wp:featuredmedia']?.[0]?.source_url || null,
    }));
  } catch (error) {
    console.error("Error fetching posts:", error);
    return [];
  }
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  try {
    const response = await fetch(`${API_URL}/posts?slug=${slug}&_embed=author,wp:featuredmedia`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data: WordPressPost[] = await response.json();
    if (data.length === 0) {
      return null;
    }
    const wpPost = data[0];
    return {
      id: wpPost.id,
      date: wpPost.date,
      slug: wpPost.slug,
      title: wpPost.title.rendered,
      excerpt: wpPost.excerpt.rendered,
      content: wpPost.content.rendered,
      author: wpPost._embedded?.author?.[0]?.name || 'Anonim',
      featuredImage: wpPost._embedded?.['wp:featuredmedia']?.[0]?.source_url || null,
    };
  } catch (error) {
    console.error(`Error fetching post with slug ${slug}:`, error);
    return null;
  }
}