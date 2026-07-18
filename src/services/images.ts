export const cloudinaryImage = (url: string, width: number, quality = "auto") => {
  if (!url || !url.includes("res.cloudinary.com") || !url.includes("/upload/")) return url;
  return url.replace("/upload/", `/upload/f_auto,q_${quality},c_limit,w_${Math.round(width)}/`);
};

export const cloudinarySrcSet = (url: string) =>
  [320, 480, 640, 800, 1200]
    .map((width) => `${cloudinaryImage(url, width)} ${width}w`)
    .join(", ");
