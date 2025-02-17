export class ColorThief {
  constructor() {
    this.getColor = this.getColor.bind(this);
  }

  getColor(image : HTMLImageElement) {
    const combinedPixelCount: { [key: string]: number } = {};

    try {
        const pixelCounts = this.getPixelCounts(image);
        for (const key in pixelCounts) {
          combinedPixelCount[key] = (combinedPixelCount[key] || 0) + pixelCounts[key];
        }
    } catch (error) {
        console.error("Failed to extract colors:", error);
    }

    let brightestColor = { r: 255, g: 255, b: 255 };
    let highestBrightness = 0;

    for (const color in combinedPixelCount) {
      const [r, g, b] = color.split(",").map(Number);
      const brightness = 0.299 * r + 0.587 * g + 0.114 * b;

      if (brightness > highestBrightness && brightness < 220) {
        highestBrightness = brightness;
        brightestColor = { r, g, b };
      }
    }

    return brightestColor;
  }

  getPixelCounts(image: HTMLImageElement) {
    if (!image.complete || image.naturalWidth === 0 || image.naturalHeight === 0) {
      throw new Error("Image is not loaded properly");
    }

    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");

    canvas.width = image.naturalWidth;
    canvas.height = image.naturalHeight;

    if (!context) throw new Error("Failed to get 2D context");

    context.drawImage(image, 0, 0, canvas.width, canvas.height);
    const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
    const pixels = imageData.data;

    const pixelCounts: { [key: string]: number } = {};

    for (let i = 0; i < pixels.length; i += 4) {
      const r = pixels[i];
      const g = pixels[i + 1];
      const b = pixels[i + 2];
      const a = pixels[i + 3];

      if (a !== 0) {
        const key = `${r},${g},${b}`;
        pixelCounts[key] = (pixelCounts[key] || 0) + 1;
      }
    }

    return pixelCounts;
  }
}
