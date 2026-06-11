const rateLimitMap = new Map();

export function rateLimit(request, limit = 5, windowMs = 60000) {
  // Try to get IP from headers
  const ip = request.headers.get("x-forwarded-for") ?? 
             request.headers.get("x-real-ip") ?? 
             "127.0.0.1";
             
  const now = Date.now();
  const windowStart = now - windowMs;

  let requestData = rateLimitMap.get(ip);

  if (!requestData) {
    requestData = { count: 0, startTime: now };
    rateLimitMap.set(ip, requestData);
  }

  // Reset window if time passed
  if (requestData.startTime < windowStart) {
    requestData.count = 0;
    requestData.startTime = now;
  }

  requestData.count++;

  if (requestData.count > limit) {
    return false; // Rate limited
  }

  return true; // Allowed
}
