import { machineName, userName, OS } from "@env";

var elem = <a>Hello, {userName()}! You are running on {machineName()} with {OS}</a>;

document.body.append(elem);