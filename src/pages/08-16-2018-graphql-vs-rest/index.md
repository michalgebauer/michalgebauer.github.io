---
path: "/how-graphql-beats-rest"
date: "2018-08-16T17:12:33.962Z"
title: "How GraphQL beats REST when I am hungry"
label: ["GraphQL", "REST", "comparison", "javascript", "java", "front-end", "Spring"]
author: "Michal Gebauer"
type: "blog"
image: "./food.png"
---

REST web services proved to be solid standard for communication and became easy way to expose server interfaces to clients. To introduce them into project is as easy as googling Spring Data Rest (which generates all web services for you). Likewise, exploring and consuming REST web services does not cost you much effort as well.

So then, what in the world there happens to be some '_GraphQL_'?

## How cooking looks like with REST

To show you how GraphQL may save your life we'll make some cooking. Provided healthy is the new sexy I made up the following recipe:

```javascript
class HealthyRecipe {
  constructor() {
    this.ingredients = [
      bacon,
      broccoli // yes, the healthy part
    ];
  }

  cook() {
    this.ingredients.splice(1, 1); // no one is watching
    fry(this.ingredients);
  }
}
```

Man! I am already starving but before we can start real cooking we need to _GET_ the ingredients. Looks like simple task, however, we must follow some rules of the REST imaginary world:

* there is no supermarket where we can buy all what we need in one stop, every item has its own shop (endpoint)
* one person can visit only one shop

Let's have a look at the map to have a better picture:

<br />

![](/map.png)

<br />

OK, since I am hungry and also a bit clever, I will send Frodo Baggins to butcher shop and at the same time Sam Gamgee to buy the broccoli:

```javascript
const frodo = fetch('/rest/meat?type=pork')
  .then(response => response.json());

const sam = fetch('/rest/veggies?type=cabbage')
  .then(response => response.json());

// this promise will be resolved after both hobbits come back
Promise.all([frodo, sam])
  .then(data => ... hurray! we can cook! ...);
```

And this was the moment when I died of hunger waiting for the ingredients.
It turned out Frodo was not allowed to buy only the bacon, he had to take the entire pig. And now imagine how fast you can run with 300 kilos (661.386787 pounds) of meat while watching out for riders of Rohan.

<br />

![](/onedoesnotsimply.jpg)

<br />

In parallel GraphQL world this, what happened, is called _over-fetching_.

```javascript
data = [
  {
    bacon: ..., // I only needed this,
    ribs: ..., // but got also this
    ham: ..., // and this
    leg: ... // and this
  },
  {
    broccoli: ..., // you only had one job
    cabbage: ...,
    cauliflower: ...,
    kale: ...
  }
];
```

To sum it up, REST services split business model among several url endpoints. In consequence you need to do more requests to the server if data from one endpoint are not sufficient for you. In this case, the process takes as long as long lasts the slowest response.

Additionally, REST services strictly define which attributes of model are sent back to client. In most cases this means client downloads more data than is necessary which in turn means the response is slower.

## How cooking looks like with GraphQL

As you are probably expecting, GraphQL shines in this chapter. Long story short, GraphQL service is a shopping mall which allows you to buy whatever you need on the spot (there is only one endpoint). Additionally, you can explicitly list which items you want to buy and therefore it is faster and _beats REST when I am hungry_.

```javascript
fetch('/graphql', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    // I ask only for bacon and broccoli
    query: `
      {
        ingredients {
          pork {
            bacon
          }
          cabbage {
            broccoli
          }
        }
      }
    `
  })
    .then(response => response.json())
    .then(response => ... hurray! we can cook! ...)
})
```

And the result is that I made only one request to the server and I got exactly what I asked for:

```javascript
{
  ingredients: {
    pork: {
      beacon: ... // yummy
    },
    cabbage: {
      broccoli: ... // can't find appropriate interjection
    }
  }
};
```

## Should we throw away REST?

GraphQL wins in situations where the network connection is in question such as front-end to back-end communication. Interaction among systems placed in the same data center will not get that much of benefits and there is the room were good old REST might survive. I personally like both of them but prefer GraphQL for the front-end.

Thanks for reading, stay tunned for more posts to come.
