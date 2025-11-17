function encodeURLSearchParam(str) {
  const encoder = new TextEncoder();
  return str.replace(/./gu, char => {
    if (/^[a-zA-Z0-9\-._*]$/.test(char)) {
      return char;
    }
    if (char === ' ') {
      return '+';
    }
    const bytes = encoder.encode(char);
    return [...bytes].map(b =>
      `%${b.toString(16).toUpperCase().padStart(2, '0')}`
    ).join('');
  });
}