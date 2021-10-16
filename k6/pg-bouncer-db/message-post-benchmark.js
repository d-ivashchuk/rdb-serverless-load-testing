import http from "k6/http";
import { check } from "k6";
import { Rate } from "k6/metrics";

export let errorRate = new Rate("errors");

export const options = {
  vus: 80,
  duration: "40s",
  thresholds: {
    errors: ["rate<0.1"],
    http_req_duration: ["p(95)<400"],
  },
};

export default function () {
  const date = new Date();
  var url = `https://rdb-serverless-load-testing-pg-bouncer.vercel.app/api/post/${date.toTimeString()}-test`;

  check(http.get(url), {
    "status is 200": (r) => r.status == 200,
  }) || errorRate.add(1);
}
