import http from "k6/http";
import { check } from "k6";
import { Rate } from "k6/metrics";

export let errorRate = new Rate("errors");

export default function () {
  var url = "http://localhost:3000/api/posts/dimitri@stackonfire.dev";

  check(http.get(url), {
    "status is 200": (r) => r.status == 200,
  }) || errorRate.add(1);
}
