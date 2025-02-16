export const StatusCode = {
  BadRequest: 400,
  Unauthorized: 401,
  Forbidden: 403,
  NotFound: 404,
  RateLimited: 429,
  InternalError: 500,
  BadGateway: 502,
  ServiceUnavailable: 503,
  GatewayTimeout: 504,
};

export const StatusMessage = {
  [StatusCode.BadRequest]: "Bad request. Please check request parameters.",
  [StatusCode.Unauthorized]: "Unauthorized. Invalid or expired token.",
  [StatusCode.Forbidden]: "Forbidden. You may not have permission for this request.",
  [StatusCode.NotFound]: "Not found. The requested resource could not be found.",
  [StatusCode.RateLimited]: "Rate limited. Too many requests. Please try again later.",
  [StatusCode.InternalError]: "Internal server error. Try again later.",
  [StatusCode.BadGateway]: "Bad gateway. The server received an invalid response.",
  [StatusCode.ServiceUnavailable]: "Service unavailable. Please try again later.",
  [StatusCode.GatewayTimeout]: "Gateway timeout. Please try again later.",
};
