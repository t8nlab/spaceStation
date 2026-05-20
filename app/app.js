import t from "@titanpl/route";


t.ws("/chat").action("chat");
t.get("/").action("ui")
t.get("/image").action("stream")
t.get("/test").reply("huihuihui!")
t.start(5100, "Titan Running!");
