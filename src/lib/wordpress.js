const WORDPRESS_API_URL = 'https://warta-terkini.com/wp-json/wp/v2'; // Placeholder, akan dikonfigurasi

export async function getPosts(per_page = 10, page = 1) {
    try {
        const response = await fetch(`${WORDPRESS_API_URL}/posts?_embed&per_page=${per_page}&page=${page}`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const posts = await response.json();
        return posts;
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
        const post = await response.json();
        return post.length > 0 ? post[0] : null;
    } catch (error) {
        console.error("Error fetching post by slug:", error);
        return null;
    }
}

export async function getCategories() {
    try {
        const response = await fetch(`${WORDPRESS_API_URL}/categories`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const categories = await response.json();
        return categories;
    } catch (error) {
        console.error("Error fetching categories:", error);
        return [];
    }
}
