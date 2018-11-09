---
path: "/async-java-javascript"
date: "2018-09-03T11:12:33.962Z"
title: "Async javascript from Java perspective"
label: ["javascript", "java", "js", "async", "thread", "promise"]
author: "Michal Gebauer"
type: "blog"
image: ""
draft: true
---

```java
BufferedReader reader = new BufferedReader(new FileReader (file));
String line = null;
line = reader.readLine();
// following line of code is executed synchronously
// after the line is read but by the same thread
if (line != null) {
  System.out.println(line);
}
```
