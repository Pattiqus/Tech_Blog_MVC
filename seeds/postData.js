/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable max-len */
const { Post } = require("../dist/models");

const postData = [
    {
        "title": "How to Start Using React?",
        "content": "Familiarity with the core HTML, CSS, and JavaScript languages, knowledge of the terminal/command line. React uses an HTML-in-JavaScript syntax called JSX (JavaScript and XML). Familiarity with both HTML and JavaScript will help you to learn JSX, and better identify whether bugs in your application are related to JavaScript or to the more specific domain of React. Objective is to set up a local React development environment, create a start app, and understand the basics of how it works"
    },
    {
        "title": "Hello React",
        "content": "As its official tagline states, React is a library for building user interfaces. React is not a framework: it's not even exclusive to the web. It's used with other libraries to render to certain environments. For instance, React Native can be used to build mobile applications.To build for the web, developers use React in tandem with ReactDOM. React and ReactDOM are often discussed in the same spaces as — and utilized to solve the same problems as — other true web development frameworks. When we refer to React as a framework, we're working with that colloquial understanding. React's primary goal is to minimize the bugs that occur when developers are building UIs. It does this through the use of components — self-contained, logical pieces of code that describe a portion of the user interface. These components can be composed together to create a full UI, and React abstracts away much of the rendering work, leaving you to concentrate on the UI design."
    },
    {
        "title": "Use Cases of React",
        "content": "Unlike the other frameworks covered in this module, React does not enforce strict rules around code conventions or file organization. This allows teams to set conventions that work best for them, and to adopt React in any way they would like to. React can handle a single button, a few pieces of an interface, or an app's entire user interface. While React can be used for small pieces of an interface, it's not as easy to drop into an application as a library like jQuery, or even a framework like Vue, it is more approachable when you build your entire app with React. In addition, many of the developer-experience benefits of a React app, such as writing interfaces with JSX, require a compilation process. Adding a compiler like Babel to a website makes the code on it run slowly, so developers often set up such tooling with a build step. React arguably has a heavy tooling requirement, but it can be learned.This article is going to focus on the use case of using React to render the entire user interface of an application, using tooling provided by Facebook's own create-react-app tool."
    },
    {
        "title": "Rubber Duck Debugging",
        "content": "In software engineering, rubber duck debugging is a method of debugging code by articulating a problem in spoken or written natural language. The name is a reference to a story in the book The Pragmatic Programmer in which a programmer would carry around a rubber duck and debug their code by forcing themselves to explain it, line-by-line, to the duck. Many other terms exist for this technique, often involving different (usually) inanimate objects, or pets such as a dog or a cat. Many programmers have had the experience of explaining a problem to someone else, possibly even to someone who knows nothing about programming, and then hitting upon the solution in the process of explaining the problem. In describing what the code is supposed to do and observing what it actually does, any incongruity between these two becomes apparent. More generally, teaching a subject forces its evaluation from different perspectives and can provide a deeper understanding. By using an inanimate object, the programmer can try to accomplish this without having to interrupt anyone else. This approach has been taught in computer science and software engineering courses."
    }
];

const postSeed = () => Post.bulkCreate(postData);

module.exports = postSeed;