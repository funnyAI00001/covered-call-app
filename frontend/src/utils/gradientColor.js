// Function to generate a continuous color scale
function generateColorScale(startColor, endColor, steps) {
    const colorScale = [];
    const startRGB = hexToRGB(startColor);
    const endRGB = hexToRGB(endColor);
  
    for (let i = 0; i <= steps; i++) {
      const ratio = i / steps;
      const newColor = interpolateColor(startRGB, endRGB, ratio);
      colorScale.push(rgbToHex(newColor));
    }
  
    return colorScale;
  }
  
  // Function to interpolate between two colors
  function interpolateColor(start, end, ratio) {
    return [
      start[0] + Math.floor((end[0] - start[0]) * ratio),
      start[1] + Math.floor((end[1] - start[1]) * ratio),
      start[2] + Math.floor((end[2] - start[2]) * ratio),
    ];
  }
  
  // Function to convert hex color to RGB
  function hexToRGB(hex) {
    const bigint = parseInt(hex.slice(1), 16);
    return [(bigint >> 16) & 255, (bigint >> 8) & 255, bigint & 255];
  }
  
  // Function to convert RGB color to hex
  function rgbToHex(rgb) {
    return `#${((1 << 24) | (rgb[0] << 16) | (rgb[1] << 8) | rgb[2]).toString(16).slice(1)}`;
  }
  
  // Example: Generate a color scale from red to green with 10 steps
export const colorScale = generateColorScale('#FF0000', '#00FF00', 10);
export const courtActiveBackground = generateColorScale('#570670', '#076b10', 5);
    