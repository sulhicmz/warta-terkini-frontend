
const WORDPRESS_API_URL = 'https://warta-terkini.com/wp-json/wp/v2';

export async function getPosts() {
  try {
    const response = await fetch(`${WORDPRESS_API_URL}/posts?_embed&per_page=10`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const posts = await response.json();
    return posts.map(post => ({
      id: post.id,
      slug: post.slug,
      title: post.title.rendered,
      excerpt: post.excerpt.rendered,
      content: post.content.rendered,
      date: post.date,
      featuredImage: post._embedded?.['wp:featuredmedia']?.[0]?.source_url || null,
      author: post._embedded?.author?.[0]?.name || 'Unknown',
      categories: post._embedded?.['wp:term']?.[0]?.map(term => term.name) || [],
    }));
  } catch (error) {
    console.error("Error fetching posts:", error);
    return [];
  }
}

export async function getPostBySlug(slug) {
    try {
        const response = await fetch(`${WORDPRESS_API_URL}/posts?slug=${slug}&_embed`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const posts = await response.json();
        if (posts.length > 0) {
            const post = posts[0];
            return {
                id: post.id,
                slug: post.slug,
                title: post.title.rendered,
                excerpt: post.excerpt.rendered,
                content: post.content.rendered,
                date: post.date,
                featuredImage: post._embedded?.['wp:featuredmedia']?.[0]?.source_url || null,
                author: post._embedded?.author?.[0]?.name || 'Unknown',
                categories: post._embedded?.['wp:term']?.[0]?.map(term => term.name) || [],
            };
        }
        return null;
    } catch (error) {
        console.error(`Error fetching post by slug ${slug}:`, error);
        return null;
    }
}
