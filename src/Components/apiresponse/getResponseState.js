export function getResponseState() {
    const Response = sessionStorage.getItem('ApiResponse');
    return {Response};
  }