function encodeURLSearchParam(str) {
  const encoder = new TextEncoder();
  return Array.from(str).map(char => {
    const code = char.charCodeAt(0);
    // Characters not percent-encoded (except space → +)
    if (/^[a-zA-Z0-9\-._*]$/.test(char)) {
      return char;
    }
    if (char === ' ') {
      return '+';
    }

    // Encode the full character to UTF-8 bytes
    const bytes = encoder.encode(char);
    return [...bytes].map(b => `%${b.toString(16).toUpperCase().padStart(2, '0')}`).join('');
  }).join('');
}