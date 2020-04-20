import request from "@/utils/request";


export function commonPost(url, data, extra = {}) {
  return request(url, {
    method: 'POST',
    data,
    ...extra
  });
}

export function commonGet(url) {
  return request(url, {
    method: 'GET',
  });
}

