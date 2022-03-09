import { machineName, userName } from "@env";

var hello: string = `Hello, ${userName()}! You are running on ${machineName()}`;

document.$("#hello")!.innerText = hello;