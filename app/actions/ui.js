import stream from "@t8n/stream";
import { defineAction } from "@titanpl/native";

export default defineAction((req)=> {
   return stream.client("../public", req, "app.html")
})