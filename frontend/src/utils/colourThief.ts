export class ColorThief {
  constructor() {
    // Binding functions
    this.getColor = this.getColor.bind(this);
    this.getPalette = this.getPalette.bind(this);
  }

  // Simple function to calculate the brightness (luminosity) of an RGB color
  calculateBrightness(r: number, g: number, b: number) {
    return 0.299 * r + 0.587 * g + 0.114 * b;
  }

  // Function to extract the dominant color from an image
  getColor(image : HTMLImageElement) {
    const palette = this.getPalette(image, 5);
    const dominantColor = palette[0];  // Use the first color in the palette
    return dominantColor;
  }

  // Get the palette of the image with the most common colors
  getPalette(image: HTMLImageElement, colorCount = 5) {
    // Ensure the image is fully loaded before processing
    if (image.complete === false || image.naturalWidth === 0 || image.naturalHeight === 0) {
      throw new Error("Image is not loaded properly");
    }

    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");

    // Set canvas size based on image size
    canvas.width = image.naturalWidth;
    canvas.height = image.naturalHeight;

    if (!context) {
      throw new Error("Failed to get 2D context");
    }

    // Draw the image on the canvas
    context.drawImage(image, 0, 0, canvas.width, canvas.height);

    // Get image data
    const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
    const pixels = imageData.data;

    // Process the pixel data to get the color palette
    const pixelArray = [];
    for (let i = 0; i < pixels.length; i += 4) {
      const r = pixels[i];
      const g = pixels[i + 1];
      const b = pixels[i + 2];
      pixelArray.push([r, g, b]);
    }

    const palette = this.quantize(pixelArray, colorCount);

    return palette; // Return your color palette
  }

  // A simple quantization method to get the most common colors (simplified)
  quantize(pixels: number[][], colorCount: number) {
    const colorMap: { [key: string]: number } = {};

    pixels.forEach(([r, g, b]) => {
      const key = `${r},${g},${b}`;
      if (!colorMap[key]) {
        colorMap[key] = 0;
      }
      colorMap[key] += 1;
    });

    // Sort colors by frequency
    const sortedColors = Object.keys(colorMap)
      .sort((a, b) => colorMap[b] - colorMap[a])
      .slice(0, colorCount);

    // Convert to { r, g, b } objects
    return sortedColors.map((color) => {
      const [r, g, b] = color.split(",").map(Number);
      return { r, g, b };
    });
  }
}
