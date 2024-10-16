export const capitalize = (text: string) =>
  text[0].toUpperCase() + text.substr(1, text.length);
export const weightDescription = (weight: number) =>
  weight === 400 ? 'Regular' : weight === 500 ? 'Medium' : 'Bold';

export const generateRandomString = (length: number) => {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  
  return Array.from({ length }, () => characters.charAt(Math.floor(Math.random() * characters.length))).join('');
}

export const generateRandomClassName = (length = 8) => {
  const characters = 'abcdefghijklmnopqrstuvwxyz'; // Lowercase alphabet
  let result = '';

  for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      result += characters[randomIndex];
  }

  return result;
};