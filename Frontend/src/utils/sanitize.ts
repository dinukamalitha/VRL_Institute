import DOMPurify from 'dompurify';
   
export const sanitizeHTML = (dirty: string): string => {
    return DOMPurify.sanitize(dirty, {
    ALLOWED_TAGS: ['p', 'br', 'strong', 'em', 'u', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'ul', 'ol', 'li', 'a', 'img', 'blockquote', 'pre', 'code', 'table', 'thead', 'tbody', 'tr', 'th', 'td'],
    ALLOWED_ATTR: ['href', 'target', 'rel', 'src', 'alt', 'width', 'height', 'style', 'class', 'loading', 'title'],
    // Allow data URIs and common image sources
    ALLOW_DATA_ATTR: false,
    // Allow images from any source (you can restrict this if needed)
    ALLOW_UNKNOWN_PROTOCOLS: false,
 });
};